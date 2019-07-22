// Search with autocomplete in the header of each page
// Uses algolia.js and autocomplete.jquery.js

$(function() {
  
  quickSearch();

  function quickSearch () {

    // Do nothing if no indices defined
    if (typeof indices === "undefined") return false;
    
    var $quickSearchInput = $(".quick-search input");

    // Initialize the Algola search autocomplete
    var client = algoliasearch(algolia.id, algolia.key);
    var quickSearchQuery = '';

    // Set up the search objects for each index
    var searchObjects = indices.map(function(item) {
      var searchOptions = {
        hitsPerPage: 5,
        facetFilters: item.facetFilters ? item.facetFilters : null
      };

      return {
        source: $.fn.autocomplete.sources.hits(
          client.initIndex(item.name),
          searchOptions
        ),
        templates: {
          suggestion: function(suggestion) {
            var url = suggestion.url;

            if (!url) {
              return false;
            }

            var baseUrl = item.baseUrl ? item.baseUrl : "";
            var title = suggestion._highlightResult.title
              ? suggestion._highlightResult.title.value
              : baseUrl + suggestion.url;

            // Generate tracker part of the URL
            var tracker = '?itm_source=' + encodeURIComponent(algolia.index) + '&itm_medium=quick_search&itm_campaign=federated_search&itm_term=' + encodeURIComponent(quickSearchQuery);

            return '<a href="' + baseUrl + url + tracker + '">' + title + "</a>";
          },
          header: '<div class="suggestion-category">' + item.label + "</div>"
        }
      };
    });

    // Assign autocomplete to input field
    $(".quick-search input, .search-form .search-field")
      .autocomplete(
        {
          minLength: 3,
          hint: true,
          debug: false
        },
        searchObjects
      )
      .on("autocomplete:selected", function(event, suggestion, dataset) {
        if (typeof suggestion.url != "undefined") {
          window.location.href = suggestion.url;
        }
      })
      .on("keypress", function(event) {
        var value = $.fn.autocomplete.escapeHighlightedString(
          event.target.value
        );

        // Store query for later use in tracking
        quickSearchQuery = value;

        // Pressing "return" will navigate to a search results page
        if (event.which == 13) {
          //return;
          if (value) {
            window.location =
              $("form.quick-search").attr("action") + "?query=" + value;
          }
        }
      });

    // Pressing ESC key closes the quick-search
    $(document).keyup(function(event) {
      if (event.which == 27) {
        $("body").removeClass("search-active");
        $quickSearchInput.blur();
      }
    });

    // Clicking seach icon focuses the input
    $(".search-trigger").on("click", function(event) {
      event.preventDefault();
      $("body").toggleClass("search-active");
      $quickSearchInput.trigger("focus");
    });

    // Clicking close icon
    $(".quick-search-close").on("click", function(event) {
      event.preventDefault();
      $("body").removeClass("search-active");
      $quickSearchInput.blur();
    });
  };

});
