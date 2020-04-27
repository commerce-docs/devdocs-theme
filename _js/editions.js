//var editionElements = document.getElementsByClassName("ee-only");

function editionMarkers() {
  var defaults = {
    editionClassNames: ["ee-only", "ce-only", "b2b-only"],
    editions: {
      "ee-only": "Magento Commerce only",
      "ce-only": "Magento Open Source only",
      "b2b-only": "B2B feature"
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
    textEE: 'Magento Commerce only',
    textCE: 'Magento Open Source only',
    textB2B: 'B2B feature',
  };

  var tooltip;


  var init = function () {

    // Add edition markers to sidebar
    var sidenavItems = document.querySelectorAll('.sidebar .ee-only');
    if (sidenavItems.length) {
      createSidebarMarkers(sidenavItems)
    }


    // Get all the edition-specific items in content
    // Build a query for multiple editons
    var contentItemsSelector = Object.entries(defaults.editionClassNames).map(function (edition) {
      return '.content main .' + edition[1];
    })
    var contentItems = document.querySelectorAll(contentItemsSelector);
    
    if (contentItems.length) {
      createContentMarkers(contentItems)
    }

    // Create tooltip and place it in the body tag for future use
    tooltip = createTooltip( defaults.textEE, 'ee-only' );
    document.getElementsByTagName('body')[0].appendChild(tooltip);

  };

  
  var createSidebarMarkers = function (items) {
    Array.from(items).forEach(function (element) {
      var marker = createIconMarker();
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
        var marker = createIconMarker(text, edition);
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
  var createIconMarker = function (text, edition) {
    var marker = document.createElement("div");
    marker.className = defaults.markerIconClassName;
    marker.classList.add(defaults.markerClassName);
    marker.innerHTML = '<i class="' + defaults.iconClassName +'"></i>';

    // Attach events
    marker.addEventListener('mouseover', handleMarkerMouseOver);
    marker.addEventListener('mouseout', handleMarkerMouseOut);
    return marker;
  }

  // Tag with icon

  var createTagMarker = function (text,className) {
    var tag = document.createElement("div");
    tag.className = defaults.markerTagClassName;
    tag.classList.add(defaults.markerClassName);
    tag.classList.add(className);

    tag.innerHTML =
      '<span class="' + defaults.iconClassName + '"></span> <span class="' + defaults.tagLabelClassName + '">' +
      text +
      "</span>";

    return tag;
  }


  var createTooltip = function (text, className) {
    var tooltip = document.createElement("div");
    tooltip.className = defaults.tooltipClassName;

    tooltip.innerHTML =
      '<div class="' + defaults.tooltipLabelClassName + '">' +
      text +
      '</div><div class="' + defaults.tooltipTipClassName + '"></div>';

    return tooltip;
  };

  // Hovering on the marker shows tooltip
  var handleMarkerMouseOver = function (event) {
    // Position tooltip to the top center of marker:
    var markerOffset = event.target.getBoundingClientRect();
    var tooltipOffset = tooltip.getBoundingClientRect();
    tooltip.style.top = (markerOffset.top - tooltipOffset.height ) + 'px';
    tooltip.style.left = (markerOffset.left - tooltipOffset.width / 2 + markerOffset.width / 2 ) + 'px';
    tooltip.classList.add(defaults.tooltipVisibleClassName);
  }

  // Hide tooltip on mouse out
  var handleMarkerMouseOut = function (event) {
    tooltip.classList.remove(defaults.tooltipVisibleClassName);
  }

  init();
}

editionMarkers();
