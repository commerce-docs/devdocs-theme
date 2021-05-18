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
    markerTagClassName: 'edition-Tags edition-Tags-item',
    labelClassName: 'edition-Label',
    iconClassName: 'edition-marker-icon-image spectrum-Icon spectrum-Icon--sizeS',
    iconSrc: '../assets/i/a-logo.svg',
    tooltipClassName: 'spectrum-Tooltip spectrum-Tooltip--top edition-tooltip',
    tooltipVisibleClassName: 'is-open',
    tooltipLabelClassName: 'spectrum-Tooltip-label',
    tooltipTipClassName: 'spectrum-Tooltip-tip',
    tagLabelClassName: 'spectrum-Tags-itemLabel edition-marker-tag',
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
    Object.entries(defaults.editions).map(function (edition) {
      var editionTooltip = createTooltip(edition[1], edition[0]);
      tooltips.push(editionTooltip);
      document.getElementsByTagName('body')[0].appendChild(editionTooltip);
    });
  };


  var createSidebarMarkers = function (items) {
    Array.from(items).forEach(function (element) {
      var edition;
      defaults.editionClassNames.map(function (editionClass) {
        console.log(editionClass);
        if (element.classList.contains(editionClass)) {
          edition = editionClass;
        }
      });
      console.log(edition)
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
      if (parentNode === 'td' || parentNode === 'ul' || parentNode === 'ol') {
        var marker = createIconMarker(edition);
        element.prepend(marker);
      } else {
        // Create marker
        var marker = createTagMarker(text, edition);
        // Append marker to element
        element.appendChild(marker);
      }
    });
  }

  // ---- Inline Icon Markers ---- //

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

  // ---- Inline Label Markers ---- //

  // Label - No Icon
  // var createTagMarker = function (text, editionClassName) {
  //   var label = document.createElement('span');
  //   label.className = defaults.labelClassName;
  //   label.classList.add(editionClassName);
  //   label.innerHTML = text;
  //   return label;
  // }

  // <div class="spectrum-Tags-item" role="listitem">
  //   <span class="spectrum-Tags-itemLabel">Tag 1</span>
  // </div>

  // TODO: Discuss and modify as needed.
  //
  // Tag with Icon -- Against Branding Guidelines
  //
  var createTagMarker = function (text, edition) {
  console.log("🚀 ~ createTagMarker ~ text", text);
    var tag = document.createElement('div');
    var item = document.createElement('div');
    var icon = document.createElement('img');
    var content = document.createElement('span');

    tag.appendChild(item);
    item.appendChild(icon);
    item.appendChild(content);

    tag.className = 'spectrum-Tags';
    tag.classList.add(edition);
    item.className = 'spectrum-Tags-item';
    icon.className = 'spectrum-Icon';
    content.className = 'spectrum-Tags-itemLabel';

    icon.setAttribute('src', './../assets/i/' + edition + '.svg');
    content.innerText = '' + text + '';

    return tag;
  }

  var createTooltip = function (text, className) {
    var tooltip = document.createElement("div");
    tooltip.setAttribute('id', 'edition-tooltip-' + className);
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
    currentTooltip.style.top = (markerOffset.top - tooltipOffset.height) + 'px';
    currentTooltip.style.left = (markerOffset.left - tooltipOffset.width / 2 + markerOffset.width / 2) + 'px';
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
