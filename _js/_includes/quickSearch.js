// Search with autocomplete in the header of each page
// Uses algolia.js and autocomplete.jquery.js

$(function() {
  
  var $quickSearchInput = $(".quick-search input");

  // Algola autocomplete:
  var client = algoliasearch(algolia.id, algolia.key);

  var searchObjects = indices.map(function(item) {
    var searchOptions = {
      hitsPerPage: 5
    };

    if (item.facets) {
      searchOptions.facetFilters = item.facets;
    }

    return {
      source: $.fn.autocomplete.sources.hits(
        client.initIndex(item.name),
        searchOptions
      ),
      templates: {
        suggestion: function(suggestion) {
          var baseUrl = item.baseUrl ? item.baseUrl : "";
          return (
            '<a href="' +
            baseUrl +
            suggestion.url +
            '">' +
            suggestion._highlightResult.title.value +
            "</a>"
          );
        },
        header: '<div class="suggestion-category">' + item.label + "</div>"
      }
    };
  });

  $(".quick-search input, .search-form .search-field")
    .autocomplete(
      {
        minLength: 3,
        hint: true,
        debug: false,
      },
      searchObjects
    )
    .on("autocomplete:selected", function(event, suggestion, dataset) {
      if (typeof suggestion.url != "undefined") {
        window.location.href = suggestion.url;
      }
    })
    .on("keypress", function(event) {
      // Pressing "return" will navigate to a search results page
      if (event.which == 13) {
        var value = $.fn.autocomplete.escapeHighlightedString(event.target.value);
        //return;
        if (value) {
          window.location =
            $("form.quick-search").attr("action") + "?query=" + value;
        }
      }
  });

  // Pressign ESC key closes the quick-search
  $(document).keyup(function(e) {
    if (e.which == 27) {
      $("body").removeClass("search-active");
      $quickSearchInput.blur();
    }
  });

  $(".search-trigger").on("click", function(e) {
    e.preventDefault();
    $("body").toggleClass("search-active");
    $quickSearchInput.trigger("focus");
  });

  $(".quick-search-close").on("click", function(e) {
    e.preventDefault();
    $("body").removeClass("search-active");
    $quickSearchInput.blur();
  });
});