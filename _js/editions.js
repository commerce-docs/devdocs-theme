// var editionElements = document.getElementsByClassName("ee-only");

function editionMarkers () {
  const defaults = {
    editionClassNames: ['ee-only', 'ce-only', 'b2b-only', 'pwa-only'],
    editions: {
      'ee-only': 'Adobe Commerce only',
      'ce-only': 'Magento Open Source only',
      'pwa-only': 'PWA Studio only',
      'b2b-only': 'B2B feature'
    },
    markerClassName: 'edition-marker',
    markerIconClassName: 'edition-marker-icon',
    markerTagClassName: 'edition-Tags edition-Tags-item',
    labelClassName: 'edition-Label',
    iconClassName: 'edition-marker-icon-image spectrum-Icon spectrum-Icon--sizeS',
    tooltipClassName: 'spectrum-Tooltip spectrum-Tooltip--top edition-tooltip',
    tooltipVisibleClassName: 'is-open',
    tooltipLabelClassName: 'spectrum-Tooltip-label',
    tooltipTipClassName: 'spectrum-Tooltip-tip',
    tagLabelClassName: 'spectrum-Tags-itemLabel edition-marker-tag'
  }

  let currentTooltip
  const tooltips = []

  const init = function () {
    // Add edition markers to sidebar
    const sidebarItemsSelector = Object.entries(defaults.editionClassNames).map(function (edition) {
      return '.sidebar .' + edition[1]
    })
    const sidenavItems = document.querySelectorAll(sidebarItemsSelector)
    if (sidenavItems.length) {
      createSidebarMarkers(sidenavItems)
    }

    // Get all the edition-specific items in content
    // Build a query for multiple editons
    const contentItemsSelector = Object.entries(defaults.editionClassNames).map(function (edition) {
      return '.content main .' + edition[1]
    })
    const contentItems = document.querySelectorAll(contentItemsSelector)
    if (contentItems.length) {
      createContentMarkers(contentItems)
    }

    // Create tooltips for each edition:
    Object.entries(defaults.editions).map(function (edition) {
      const editionTooltip = createTooltip(edition[1], edition[0])
      tooltips.push(editionTooltip)
      document.getElementsByTagName('body')[0].appendChild(editionTooltip)
      return true
    })
  }

  const createSidebarMarkers = function (items) {
    Array.from(items).forEach(function (element) {
      let edition
      defaults.editionClassNames.map(function (editionClass) {
        console.log(editionClass)
        if (element.classList.contains(editionClass)) {
          edition = editionClass
        }
        return true
      })
      console.log(edition)
      const marker = createIconMarker(edition)
      // Append marker to element
      element.appendChild(marker)
    })
  }

  const createContentMarkers = function (items) {
    Array.from(items).forEach(function (element) {
      // Get the edition value
      const edition = element.className
      const editionText = defaults.editions[edition]

      // Check the parent node of an item:
      const parentNode = element.parentNode.nodeName.toLowerCase()

      // Items inside tables and lists get an icon treatment
      if (parentNode === 'td' || parentNode === 'ul' || parentNode === 'ol') {
        const marker = createIconMarker(edition)
        element.prepend(marker)
      } else {
        // Create marker
        const marker = createTagMarker(editionText, edition)
        // Append marker to element
        element.appendChild(marker)
      }
    })
  }

  // ---- Inline Icon Markers ---- //

  // Icon with the tooltip
  const createIconMarker = function (edition) {
    const marker = document.createElement('div')
    marker.className = defaults.markerIconClassName
    marker.setAttribute('data-edition', edition)
    marker.classList.add(defaults.markerClassName)
    marker.innerHTML = '<i class="' + defaults.iconClassName + '"></i>'

    // Attach events
    marker.addEventListener('mouseover', handleMarkerMouseOver)
    marker.addEventListener('mouseout', handleMarkerMouseOut)
    return marker
  }

  const createTagMarker = function (editionText, edition) {
    const tag = document.createElement('div')
    const item = document.createElement('div')
    const icon = document.createElement('i')
    const content = document.createElement('span')

    tag.appendChild(item)
    item.appendChild(icon)
    item.appendChild(content)

    tag.className = 'spectrum-Tags'
    tag.classList.add(edition)
    item.className = 'spectrum-Tags-item'
    icon.classList.add('edition-spectrum-icon', edition + '-icon')
    content.className = 'spectrum-Tags-itemLabel'
    content.innerText = `${editionText}`

    return tag
  }

  const createTooltip = function (editionText, className) {
    const tooltip = document.createElement('div')
    tooltip.setAttribute('id', 'edition-tooltip-' + className)
    tooltip.className = defaults.tooltipClassName + ' ' + className

    tooltip.innerHTML =
      '<div class="' + defaults.tooltipLabelClassName + '">' +
      editionText +
      '</div><div class="' + defaults.tooltipTipClassName + '"></div>'

    return tooltip
  }

  // Hovering on the marker shows tooltip
  const handleMarkerMouseOver = function (event) {
    // Decide which tooltip to show:
    const edition = event.target.getAttribute('data-edition')
    // console.log(edition)
    currentTooltip = document.getElementById('edition-tooltip-' + edition)
    // Position tooltip to the top center of marker:
    const markerOffset = event.target.getBoundingClientRect()
    const tooltipOffset = currentTooltip.getBoundingClientRect()
    currentTooltip.style.top = (markerOffset.top - tooltipOffset.height) + 'px'
    currentTooltip.style.left = (markerOffset.left - tooltipOffset.width / 2 + markerOffset.width / 2) + 'px'
    currentTooltip.classList.add(defaults.tooltipVisibleClassName)
  }

  // Hide tooltip on mouse out
  const handleMarkerMouseOut = function (event) {
    currentTooltip.classList.remove(defaults.tooltipVisibleClassName)
  }

  init()
}

window.addEventListener('load', function (event) {
  editionMarkers()
})
