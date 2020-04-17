/*!
 * Table of Contents
 * Depends on the Bootstrap ScrollSpy plugin
 * author: ybannykh@magento.com
*/

;( function( $, window, document, undefined ) {

	'use strict';

	var pluginName = 'tableOfContents',
		defaults = {
      itemSelector: 'h2,h3',
      titleText: 'On this page',
      contentSelector: '.content-wrap',
      containerClass: 'page-toc',
      menuClass: 'nav spectrum-Menu is-selectable',
      itemClass: 'spectrum-Menu-item nav-item',
      itemLabelClass: 'spectrum-Menu-itemLabel nav-link',
      itemActiveClass: 'is-selected',
      noTocClass: 'no_toc',
      topOffset: 65,
      minimumCount: 1,
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
      this.$element = $( this.element );

			this.options = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {

			init: function() {
        var plugin = this;
        var headers = $( plugin.options.contentSelector )
          .find( plugin.options.itemSelector )
          .not( '.' + plugin.options.noTocClass);
        var pageUrl = '//' + location.host + location.pathname;

        // Generate TOC only if there's enouhg data
        if ( headers.length > plugin.options.minimumCount ) {
          var tocHtml = plugin.generateToc( headers );
          plugin.$toc = $( tocHtml );
          plugin.$element.append( plugin.$toc );

          // Use Bootstrap ScrollSpy if available
          if ( typeof $('body').scrollspy == 'function' ) {
            $('body').scrollspy({
              target: $('.' + plugin.options.containerClass),
              offset: plugin.options.topOffset
            });
            // Watch for TOC changes
            $(window).on('activate.bs.scrollspy', function () {
              plugin.handleTocChange();
            });
          }
        }

        // Add an anchor icon to headers

        // We want the page title to have anchor icon as well:
        headers.push($('.page-heading'));
        
        headers.each(function () {
          var $header = $(this),
              id = $header.attr('id');

          var url = pageUrl + ( id ? '#' + id : '' );

          var anchorLink = '<a class="anchor" href="'+ url +'"></a>';
          $header.prepend( anchorLink );
        });

			},

      generateToc: function( headers ) {
        var plugin = this,
            headersHtml = '';

        headers.each( function () {
          var $header = $(this),
              id = $header.attr('id'),
              isInsideCollapsible = $header.parents('.collapsible').length,
              isCollapsibleTitle = $header.hasClass('collapsible-title'),
              anchor_text = '',
              show = true;

          // Do not show headers inside collapsible
          if ( isInsideCollapsible ) {
            show = false;
            if ( isCollapsibleTitle) {
              show = true;
            }
          }

          if ( show ) {
            // check if we have id on heading already
            if ( id ) {
              // use that id for the anchor
              anchor_text = id;
            } else {
              // generate id from the heading text
              var text = $header.text();
              anchor_text = text;
            }
            // clean up the anchor
            anchor_text = anchor_text.replace(/\s/g, '-').replace(/[`~!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');

            // Add id to the header if needed
            if ( !id ) {
              $header.attr('id', anchor_text);
            }

            var tag_name = $header.prop('tagName').toLowerCase();

            headersHtml += '<li class="'+  plugin.options.itemClass + ' ' + tag_name +'"><a href="#' + anchor_text + '" class="' +  plugin.options.itemLabelClass + '">' + $header.text() + '</a></li>'
          }

        });

        return '<div class="'+ plugin.options.containerClass +'"><ul class="'+ plugin.options.menuClass + '">' + headersHtml + '</ul></div>';

      },


			handleTocChange: function() {
        var plugin = this;

        if ( plugin.$toc ) {
          var tocHeight = Math.floor( plugin.$toc.height() ),
              tocNavHeight = Math.floor( plugin.$toc.find('ul').height() );

          // For long TOCs, scroll the toc as page scrolls
          if (tocNavHeight > tocHeight ) {
            var $item = plugin.$toc.find('.' + plugin.options.itemActiveClass ).parent(),
                itemTop = Math.floor( $item[0].offsetTop );

            // Determine how much of the TOC is currently scrolled
            var percentage = Math.floor( ( (itemTop) / ( tocNavHeight - 25) ) * 100 );
            var scroll = ( (percentage * tocNavHeight) / 100 ) - (percentage * tocHeight) / 100;

            if ($item.is(':last-child')) {
              scroll = tocNavHeight;
            }

            plugin.$toc.scrollTop( scroll );
          }
        }

			},

		});


		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
