// TODO : refactor to use window.addEventListener

window.onload = function() {

  // Initialize the search with parameters
  searchApp({
    appId: algolia.id,
    apiKey: algolia.key,
    indexName: algolia.index
  });

  function searchApp(opts) {

    if ( typeof(indices) === 'undefined' ) return false;

    var defaults = {
      hitsPerPage: 20,
      refinementListLimit: 40,
      hiddenClassName: "hide",
      searchInputId: "#search-input",
      resultsClassName: "search-results",
      noResultsClassName: "no-results",
      hitsClassName: "search-results-main",
      statsClassName: "search-results-stats",
      paginationClassName: "search-results-pagination",
      refinementsClassName: "search-results-refinements",
      navContainerId: "index-navigation",
      navListClassName: "spectrum-Tabs spectrum-Tabs--horizontal",
      navItemClassName: "spectrum-Tabs-item",
      navItemLabelClassName: "spectrum-Tabs-itemLabel",
      navItemClassNameSelected: "is-selected"
    };

    // Variables to store all the data
    var mainIndex;
    var searchIndices = [];
    var subIndices = [];
    var navItems = [];
    var selectionIndicator = document.createElement('div');
    var query = '';

    var algoliaClient = algoliasearch(opts.appId, opts.apiKey);
    // Create a custom Search Client to handle empty queries:
    var searchClient = {
      search: function(requests) {

        if (requests.every(isEmptyQuery)) {
          return Promise.resolve({
            results: requests.map(function() {
              return {
                hits: [],
                nbHits: 0,
                processingTimeMS: 0,
                facets: []
              };
            })
          });
        }

        return algoliaClient.search(requests);
      }
    };
    var isEmptyQuery = function(request) {
      return !request.params.query;
    };

    // Initialize all the search indices
    var init = function() {
      // Sub indices
      for (var i = 1; i < indices.length; i++) {
        var subIndex = initSearchIndex(indices[i], searchClient);
        subIndices.push(subIndex);
      }

      // Main index. Passing the searchFunction with the list of subIndices to sync the searches
      mainIndex = initSearchIndex(indices[0], searchClient, function(helper) {
        // Store query to use later for tracking
        query = helper.state.query;

        // Search each sub index
        for (var i = 0; i < subIndices.length; i++) {
          subIndices[i].helper.setQuery(helper.state.query).search();
        }

        // Search main index
        helper.search();
      },true);

      searchIndices = [mainIndex].concat(subIndices);
    }

    // Create the navigation between indices
    var buildNav = function() {
      // Nav container
      var navList = document.createElement("div");
      selectionIndicator.classList.add('spectrum-Tabs-selectionIndicator');
      navList.className = defaults.navListClassName;
      navList.setAttribute("role", "tablist");

      // Build each item
      navItems = indices.map(function(item, index) {
        var className = [
          defaults.navItemClassName,
          !index ? defaults.navItemClassNameSelected : null // first item is selected
        ].join(" ");

        var navItem = document.createElement("div");

        navItem.className = className;
        navItem.id = item.name + "-tab";
        navItem.setAttribute("role", "tab");
        navItem.setAttribute("tabindex", "0");
        navItem.setAttribute("aria-controls", item.name);
        navItem.setAttribute("aria-selected", !index ? true : false);

        navItem.innerHTML =
          '<span class="' + defaults.navItemLabelClassName + '">' + item.label + "</span>";
        navItem.onclick = function(event) {
          handleIndexClick(event, item.name);
        };
        navList.appendChild(navItem);

        return navItem;
      });

      navList.appendChild(selectionIndicator);

      // Output the HTML
      document.getElementById(defaults.navContainerId).appendChild(navList);

      moveSelectionIndicator(navItems[0]);
    };

    var moveSelectionIndicator = function (currentItem) {
      // Move the selection indicator
      selectionIndicator.style.transform = 'translateX(' + currentItem.offsetLeft + 'px)';
      selectionIndicator.style.width = currentItem.offsetWidth + 'px';

    };

    var handleIndexClick = function(event, indexName) {
      // Get all the tab content items and hide them
      var tabcontent = document.getElementsByClassName(defaults.resultsClassName);

      // First hide all the tab content
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.add(defaults.hiddenClassName);
      }

      // Remove the active class
      for (i = 0; i < navItems.length; i++) {
        navItems[i].setAttribute("aria-selected", false);
        navItems[i].classList.remove(defaults.navItemClassNameSelected);
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(indexName).classList.remove(defaults.hiddenClassName);

      moveSelectionIndicator(event.currentTarget);

      event.currentTarget.blur();
      event.currentTarget.setAttribute("aria-selected", true);
      event.currentTarget.classList.add(defaults.navItemClassNameSelected);
    };

    var initSearchIndex = function(indexConfig, searchClient, searchFunction, routing) {
      var searchIndex = instantsearch({
        indexName: indexConfig.name,
        searchClient: searchClient,
        searchFunction: searchFunction,
        searchParameters: {
          hitsPerPage: defaults.hitsPerPage,
          facetFilters: indexConfig.facetFilters
        },
        routing: routing
      });

      searchIndex.baseUrl = indexConfig.baseUrl;
      searchIndex.refinements = indexConfig.refinements;
      return searchIndex;
    };

    // Add the search widgets UI for given index
    var addSearchWidgets = function(searchIndex) {
      // Hits
      searchIndex.addWidget(
        instantsearch.widgets.hits({
          container: searchIndex.hitsContainer,
          hitsPerPage: defaults.hitsPerPage,
          escapeHTML: true,
          transformItems: function(items) {
            // Disable index tab item if no items found
            var navItem = document.getElementById(searchIndex.indexName + '-tab');
            if (navItem) {
              if (!items.length) {
                navItem.disabled = true;
                document.getElementById(searchIndex.indexName).classList.add(defaults.noResultsClassName);
              } else {
                navItem.disabled = false;
                document.getElementById(searchIndex.indexName).classList.remove(defaults.noResultsClassName);
              }
            }
            return items;
          },
          templates: {
            item: function(item) {
              var title_highlighted = item._highlightResult.title;
              var title_plain = item.title;
              var title = "";
              var baseUrl = searchIndex.baseUrl;
              var url = item.url;
              var content = "";
              // Check if we can show title, if not - at least show URL
              if (typeof title_highlighted !== "undefined") {
                title = title_highlighted.value;
              } else if (typeof title_plain !== "undefined") {
                title = title_plain;
              } else {
                title = url;
              }

              // Check if we have the description of the hit
              if (typeof item._highlightResult.content !== "undefined") {
                content = item._highlightResult.content.value;
              }

              // Generate tracker part of the URL
              var tracker = '?itm_source=' + encodeURIComponent(algolia.index) + '&itm_medium=search_page&itm_campaign=federated_search&itm_term=' + encodeURIComponent(query);

              var link = '<a href="' + baseUrl + url + tracker + '">' + title + "</a>";

              var hitUrl = baseUrl + url;
              // Test if hitUrl is relative, and display the absolute URL
              var re = new RegExp("^(http|https)://", "i");
              if ( !re.test(baseUrl) ) {
                hitUrl = window.location.protocol + '//' + window.location.hostname + ( window.location.port? ':' + window.location.port : '' ) + hitUrl;
              }

              return (
                '<div class="hit"><h2 class="hit-name">' +
                link +
                '</h2><div class="hit-url">' +
                hitUrl +
                '</div><div class="hit-content">' +
                content +
                "</div></div>"
              );
            },
            empty:
              '<div class="no-results-message"><h2>No results found</h2><p>Try different keywords or check spelling.</p></div>'
          }
        })
      );

      // Stats widget
      searchIndex.addWidget(
        instantsearch.widgets.stats({
          container: searchIndex.statsContainer,
          templates: {
            text: '{{#hasNoResults}}No results{{/hasNoResults}}{{#hasOneResult}}1 result{{/hasOneResult}}{{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}} found',
          },
        })
      );

      // Pagination widget
      searchIndex.addWidget(
        instantsearch.widgets.pagination({
          container: searchIndex.paginationContainer,
          scrollTo: defaults.searchInputId
        })
      );

      // Refinements widget
      if (searchIndex.refinements && searchIndex.refinements instanceof Array) {
        // Iterate through array of attribute names and generate the panels
        for (var i = 0; i < searchIndex.refinements.length; i++) {
          var refinement = searchIndex.refinements[i];
          var container = document.createElement("div");
          searchIndex.refinementsContainer.appendChild(container);

          var refinementListWithPanel = instantsearch.widgets.panel({
            templates: {
              header: refinement.label
            },
            cssClasses: {
              header: [
                'spectrum-Detail spectrum-Detail--sizeS spectrum-Detail--light'
              ]
            }
          })(instantsearch.widgets.refinementList);

          searchIndex.addWidget(
            refinementListWithPanel({
              container: container,
              attribute: refinement.attribute,
              limit: defaults.refinementListLimit,
              sortBy: ["name:asc"],
              operator: "or"
            })
          );
        }
      }
    };

    var render = function() {
      buildNav();

      // Create containers for each index
      for (var i = 0; i < searchIndices.length; i++) {

        // Create main container for index
        var container = document.createElement("div");
        container.classList.add(defaults.resultsClassName);
        container.setAttribute("role", "tabpanel");
        container.setAttribute(
          "aria-labelledby",
          searchIndices[i].indexName + "-tab"
        );

        container.id = searchIndices[i].indexName;

        // Create additional containers for the index
        var statsContainer = document.createElement("div");
        var hitsContainer = document.createElement("div");
        var refinementsContainer = document.createElement("div");
        var paginationContainer = document.createElement("div");
        hitsContainer.classList.add(defaults.hitsClassName);
        statsContainer.classList.add(defaults.statsClassName);
        paginationContainer.classList.add(defaults.paginationClassName);
        refinementsContainer.classList.add(defaults.refinementsClassName);

        container.appendChild(statsContainer);
        container.appendChild(hitsContainer);
        container.appendChild(refinementsContainer);
        container.appendChild(paginationContainer);

        // Hide all but the first containers
        if (i) {
          container.classList.add(defaults.hiddenClassName);
        }

        // Store references to containers in the index object
        searchIndices[i].hitsContainer = hitsContainer;
        searchIndices[i].statsContainer = statsContainer;
        searchIndices[i].paginationContainer = paginationContainer;
        searchIndices[i].refinementsContainer = refinementsContainer;

        document.getElementById("hits").appendChild(container);
      }

      // Search Box
      mainIndex.addWidget(
        instantsearch.widgets.searchBox({
          container: defaults.searchInputId,
          placeholder: "Search",
          showSubmit: false,
          autofocus: true,
          showLoadingIndicator: false,
          cssClasses: {
            form: [
              'spectrum-Search'
            ],
            input: [
              'spectrum-Textfield',
              'spectrum-Textfield-input',
              'spectrum-Search-input'
            ],
            reset: [
              ''
            ]
          }
        })
      );

      addSearchWidgets(mainIndex);

      // Sub indexes
      for (var i = 1; i < searchIndices.length; i++) {
        var search = searchIndices[i];
        addSearchWidgets(search);
        search.start();
      }

      mainIndex.start();
    };

    init();
    render();
  }
};
