// Version switcher retains query "search" parameter.

var versionSwitcherQuery = {
  // Defaults
  config : {
    searchParam: 'search',
    versionSwitcherSelector: '.version-switcher a'
  },

  init: function () {

    // Check if URLSearchParams is supported (for IE)
    if ('URLSearchParams' in window) { 

      // Get search query from URL
      var urlParams = new URLSearchParams(window.location.search);
      var searchQuery = urlParams.get(versionSwitcherQuery.config.searchParam);

      // If it exists, add it to version switcher links
      if (searchQuery) {
        var versionSwitcherLinks = document.querySelectorAll(versionSwitcherQuery.config.versionSwitcherSelector);

        versionSwitcherLinks.forEach( function (link) {

          // Construct a url and parameters of a version link
          var versionUrl = new URL(link.href);
          console.log(versionUrl.URLSearchParams);
          var versionUrlParams = new URLSearchParams(versionUrl.search);
          versionUrlParams.set(versionSwitcherQuery.config.searchParam, searchQuery);
          versionUrl.search = versionUrlParams.toString();

          link.href = versionUrl.href;
        });
      }
    }
  }
}

versionSwitcherQuery.init();