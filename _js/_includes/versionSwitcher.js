// Version switcher retains query "search" parameter to allow switching and retain the search query.

var versionSwitcher = {
  init: function ( ) {
    
    if ("URLSearchParams" in window) { // check if URLSearchParams is supported (for IE)
      var params = new URLSearchParams(window.location.search);
      var search = params.get('search');
      console.log(search);

      if (search) {
        var versionSwitcherLinks = document.querySelectorAll('.version-switcher a');
        console.log(versionSwitcherLinks)
        versionSwitcherLinks.forEach( function (link) {
          link.href = link.href + '?search=' + search;
        });
      }
    }
  }
}

versionSwitcher.init();