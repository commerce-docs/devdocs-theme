// Version switcher retains query "search" parameter.

var versionSwitcherQuery = {
  // Defaults
  config: {
    versionSwitcherLinks: [],
    searchParam: "query",
    versionSwitcherLinksSelector: ".version-switcher a",
    versionSwitcherToggleSelector: ".version-switcher .dropdown-toggle",
  },

  // Set search parameter to a link node
  setSearchParam: function (query) {
    var plugin = this;

    plugin.versionSwitcherLinks.forEach(function (link) {
      // Construct a url and parameters of a version link
      var versionUrl = new URL(link.href);
      var versionUrlParams = new URLSearchParams(versionUrl.search);

      if (query) {
        // If query exists, set it
        versionUrlParams.set(versionSwitcherQuery.config.searchParam, query);
      } else {
        // If not, delete the param
        versionUrlParams.delete(versionSwitcherQuery.config.searchParam);
      }
      versionUrl.search = versionUrlParams.toString();
      link.href = versionUrl.href;
    });
  },

  // Get search query from window URL
  getSearchQuery: function () {
    var plugin = this;
    var urlParams = new URLSearchParams(window.location.search);
    var searchQuery = urlParams.get(plugin.config.searchParam);

    return searchQuery;
  },


  // Toggle event on version switcher
  onToggle: function (plugin, event) {
    var query = plugin.getSearchQuery();
    plugin.setSearchParam(query);
  },

  init: function () {
    // Check if URLSearchParams is supported (for IE)
    if ("URLSearchParams" in window) {
      var plugin = this;

      // Store the version switcher links
      plugin.versionSwitcherLinks = document.querySelectorAll(
        plugin.config.versionSwitcherLinksSelector
      );

      // Set parameter to links
      var query = plugin.getSearchQuery();
      if (query) {
        plugin.setSearchParam(query);
      }

      // Watch for click events on version switcher and set parameter
      document.querySelectorAll(plugin.config.versionSwitcherToggleSelector).forEach(function (toggle) {
        toggle.addEventListener("click", function (event) {
          plugin.onToggle(plugin, event);
        });
      });
    }
  },
};


window.addEventListener('load', function () {
  versionSwitcherQuery.init();
})
