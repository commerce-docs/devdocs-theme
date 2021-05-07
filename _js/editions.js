//var editionElements = document.getElementsByClassName("ee-only");
 
function editionMarkers() {
  var defaults = {
    editionClassNames: ['ee-only', 'ce-only', 'b2b-only'],
    editions: {
      'ee-only': 'Adobe Commerce only',
      'ce-only': 'Magento Open Source only',
      'b2b-only': 'B2B feature'
    },
    markerClassName: 'edition-marker',
    markerIconClassName: 'edition-marker-icon',
    markerTagClassName: 'edition-marker-tag spectrum-Tags-item',
    iconClassName: 'edition-marker-icon-image spectrum-Icon spectrum-Icon--sizeS',
    tooltipClassName: 'edition-tooltip spectrum-Tooltip spectrum-Tooltip--top',
    tooltipVisibleClassName: 'is-open',
    tooltipLabelClassName: 'spectrum-Tooltip-label',
    tooltipTipClassName: 'spectrum-Tooltip-tip',
    tagLabelClassName: 'spectrum-Tags-itemLabel',
  };

  var currentTooltip;
  var tooltips = [];


  var init = function () {

    // Add edition markers to sidebar
    var sidebarItemsSelector = Object.entries(defaults.editionClassNames).map(function (edition) {
      return '.sidebar .' + edition[1];
    });
    var sidenavItems = document.querySelectorAll(sidebarItemsSelector);
    if (sidenavItems.length) {
      createSidebarMarkers(sidenavItems)
    }

    // Get all the edition-specific items in content
    // Build a query for multiple editons
    var contentItemsSelector = Object.entries(defaults.editionClassNames).map(function (edition) {
      return '.content main .' + edition[1];
    });
    var contentItems = document.querySelectorAll(contentItemsSelector);
    if (contentItems.length) {
      createContentMarkers(contentItems)
    }

    // Create tooltips for each edition:
    Object.entries(defaults.editions).map( function (edition) {
      var editionTooltip = createTooltip( edition[1], edition[0] );
      tooltips.push(editionTooltip);
      document.getElementsByTagName('body')[0].appendChild(editionTooltip);
    });
   
    // TODO: remove this
    // Create tooltip and place it in the body tag for future use
    //tooltip = createTooltip( defaults.editions['ee-only'], 'ee-only' );
    //document.getElementsByTagName('body')[0].appendChild(tooltip);

  };

  
  var createSidebarMarkers = function (items) {
    Array.from(items).forEach(function (element) {
      var edition;
      defaults.editionClassNames.map( function (editionClass) {
        //console.log(editionClass);
        if (element.classList.contains(editionClass)) {
          edition = editionClass;
        }
      });
      //console.log(edition)
      var marker = createIconMarker(edition);
      // Append marker to element
      element.appendChild(marker);
    });
  }

  var createContentMarkers = function (items) {
    Array.from(items).forEach(function (element) {
      // Get the edition value
      var edition = element.className;
      var text = defaults.editions[edition];

      // Check the parent node of an item: 
      var parentNode = element.parentNode.nodeName.toLowerCase();

      // Items inside tables and lists get an icon treatment
      if (parentNode === 'td' || parentNode === 'ul' || parentNode === 'ol' ) {
        var marker = createIconMarker(edition);
        element.prepend(marker);
      } 
      else {
        // Create marker
        var marker = createTagMarker(text, edition);
        // Append marker to element
        element.appendChild(marker);
      }
      
    });

  }

  // ---- Markers ---- //

  // Icon with the tooltip
  var createIconMarker = function (edition) {
    var marker = document.createElement('div');
    marker.className = defaults.markerIconClassName;
    marker.setAttribute('data-edition', edition);
    marker.classList.add(defaults.markerClassName);
    marker.innerHTML = '<i class="' + defaults.iconClassName +'"></i>';

    // Attach events
    marker.addEventListener('mouseover', handleMarkerMouseOver);
    marker.addEventListener('mouseout', handleMarkerMouseOut);
    return marker;
  }

  // Tag with icon
  var createTagMarker = function (text,className) {
    var tag = document.createElement('div');
    tag.className = defaults.markerTagClassName;
    tag.classList.add(defaults.markerClassName);
    tag.classList.add(className);

    tag.innerHTML =
      '<span class="' + defaults.iconClassName + '"></span> <span class="' + defaults.tagLabelClassName + '">' +
      text +
      '</span>';

    return tag;
  }


  var createTooltip = function (text, className) {
    var tooltip = document.createElement("div");
    tooltip.setAttribute('id', 'edition-tooltip-' + className );
    tooltip.className = defaults.tooltipClassName + ' ' + className;

    tooltip.innerHTML =
      '<div class="' + defaults.tooltipLabelClassName + '">' +
      text +
      '</div><div class="' + defaults.tooltipTipClassName + '"></div>';

    return tooltip;
  };

  // Hovering on the marker shows tooltip
  var handleMarkerMouseOver = function (event) {
    // Decide which tooltip to show:
    var edition = event.target.getAttribute('data-edition');
    //console.log(edition)
    currentTooltip = document.getElementById('edition-tooltip-' + edition);
    // Position tooltip to the top center of marker:
    var markerOffset = event.target.getBoundingClientRect();
    var tooltipOffset = currentTooltip.getBoundingClientRect();
    currentTooltip.style.top = (markerOffset.top - tooltipOffset.height ) + 'px';
    currentTooltip.style.left = (markerOffset.left - tooltipOffset.width / 2 + markerOffset.width / 2 ) + 'px';
    currentTooltip.classList.add(defaults.tooltipVisibleClassName);
  }

  // Hide tooltip on mouse out
  var handleMarkerMouseOut = function (event) {
    currentTooltip.classList.remove(defaults.tooltipVisibleClassName);
  }

  init();
}

window.addEventListener('load', function (event) {
  editionMarkers();
});

