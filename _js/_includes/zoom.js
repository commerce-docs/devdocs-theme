/*!
 * Zoom Images
 * author: ybannykh@adobe.com
 *
 * Depends on jQuery Modal plugin.
 *
 * Makes images marked with the "itemSelector" clickable.
 * Opens the jQuery modal with the fullsize image.
 *
 */

(function($, window, document, undefined) {
  "use strict";

  var pluginName = "zoom",
    defaults = {
      itemSelector: "img.zoom",
      wrapperClassName: "zoom-wrap",
      modalID: "image-zoom-modal"
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function() {
      var plugin = this;
      plugin.items = $(plugin.element).find(plugin.options.itemSelector);

      // Stop if there's no images to zoom
      if (plugin.items.length === undefined || plugin.items.length == 0) {
        return false;
      }

      // Store elements
      plugin.modal = $(
        '<div id="' +
          plugin.options.modalID +
          '" role="dialog" aria-modal="true" aria-hidden="true"><img alt="" /></div>'
      ).appendTo($("body"));
      plugin.modalImage = plugin.modal.find("img");
      plugin.modalTriggerEl = null;

      // Assign Events
      plugin.modal
        .on($.modal.OPEN, function(event, modal) {
          //console.log(modal);
          modal.$blocker.attr('tabindex',0);
          modal.$blocker.focus();
        })
        .on($.modal.AFTER_CLOSE, function(event, modal) {
          //console.log(modal);
          plugin.modalTriggerEl.focus();
        })
        .on("click", function() {
          plugin.hideModal(plugin);
        });

      // Iterate over all images and assign events
      plugin.items.map(function(index, item) {
        var src = item.getAttribute("src");
        // Work only if image has a source
        if (src) {
          // Create wrapper element around image
          var $wrapper = $(
            '<a aria-haspopup="true" role="button" aria-controls="' +
              plugin.options.modalID +
              '" />'
          )
            .addClass(plugin.options.wrapperClassName)
            .attr("href", $(item).attr("src"));

          $wrapper.on(
            "click",
            { plugin: plugin, src: src },
            plugin.hanldeImageClick
          );

          $(item).wrap($wrapper);
        }
      });
    },

    hanldeImageClick: function(event) {
      event.preventDefault();

      var src = event.data.src;
      var plugin = event.data.plugin;

      // Command or Ctrl click opens image in the new tab
      if (event.metaKey || event.ctrlKey) {
        return window.open(src, "_blank");
      }

      // Store the trigger element
      plugin.modalTriggerEl = event.currentTarget;
      // Assign src of the modal image
      plugin.modalImage.attr("src", src);
      // Finally, show the modal
      plugin.showModal(plugin);
    },

    showModal: function(plugin) {
      plugin.modal.attr("aria-hidden", false).modal({showClose:false});
    },

    hideModal: function(plugin) {
      $.modal.close();
      plugin.modal.attr("aria-hidden", true);
    }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
