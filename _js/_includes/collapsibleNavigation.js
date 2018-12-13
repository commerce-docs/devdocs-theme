/*!
 * Collapsible Navigation
 * author: ybannykh@magento.com
*/

;( function( $, window, document, undefined ) {

	'use strict';

	var pluginName = 'collapsibleNavigation',
		defaults = {
      itemSelector: 'li',
      itemActiveClass: 'active',
      submenuSelector: '> ul',
      hasChildrenClass: 'has-children',
			toggleClass: 'toggle',
      itemToggleClass: 'item-toggle',
      openClass: 'open',
      closedClass:'closed',
      speed: 200
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			this.options = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {

			init: function() {
        this.items = $( this.element ).find( this.options.itemSelector );
				$( this.element ).find('> ul').attr('role','menu');
        this.initMenuItems( this.items );

				// Add Expand toggle button if menu has submenus
				if ( this.items.hasClass(this.options.hasChildrenClass) ) {
					this.addExpandAllToggle();
				}

				// Scroll the sidebar to the active element
				var activeItem = this.items.filter( '.' + this.options.itemActiveClass).first();
				if ( activeItem.length ) {
					var itemTop = activeItem.offset().top,
							itemBottom = itemTop + activeItem.height(),
							sidebarTop = $('.sidebar').offset().top,
							windowHeight = $(window).height() - sidebarTop;
						
					// Active item is below the viewport
					if ( windowHeight < itemBottom ) {

						var parentSection = activeItem.parents(this.options.itemSelector),
								parentSectionTop = 0;

						if ( parentSection.length ) {
							parentSectionTop = parentSection.offset().top;
						}

						if ( windowHeight < parentSectionTop && itemBottom - parentSectionTop < windowHeight ) {
							$('.sidebar').scrollTop( parentSectionTop - sidebarTop );
						} else {
							$('.sidebar').scrollTop( itemTop - sidebarTop );
						}

					}
				}
			},

      initMenuItems: function( items ) {

        var plugin = this;
        var options = plugin.options;
        var n = 0;

        items.each ( function () {

          var item = $(this);
					item.attr('role', 'menuitem');

          var submenu = item.find( options.submenuSelector );


          // If this item is active, traverse the tree up and open each parent
          if ( item.hasClass ( options.itemActiveClass ) ) {

            var parents = item.parents( options.itemSelector );
            plugin.openSubmenu( item, undefined, 0 );
            parents.each( function () {
              plugin.openSubmenu( $(this), undefined, 0 );
            });
          }

          // check if item is clickable, if not, make it
          if ( item.find('> a').length === 0 ) {

            item
              .addClass(options.itemToggleClass)
              .find('> span')
              .on('click',
                { item: item,
                  submenu: undefined,
                  plugin: plugin
                },
                plugin.handleToggleClick
              );
          }

          // Item has submenu
          if ( submenu.length ) {

            n++;
            var submenuId = 'collapsible-menu-' + n,
								submenuLabel = 'collapsible-menu-label-' + n;

						item.find('> a, > span').attr('id', submenuLabel);

            var toggle = $('<button />')
              .addClass( options.toggleClass)
							.attr('aria-labelledby', submenuLabel)
              .attr('aria-controls', submenuId)
							.attr('aria-expanded', false)
							.insertBefore( $( submenu ) );

            // Assign attributes
            $( submenu )
							.attr('id', submenuId)
              .attr('role', 'menu')
							.attr('aria-labelledby', submenuLabel)
							.attr('tabindex', '-1');

            $( item ).addClass( options.hasChildrenClass );

              //Assign events
            toggle.on('click',
              {
                item: item,
                submenu: submenu,
                plugin: plugin
              },
              plugin.handleToggleClick
            );

          }

        });
      },


			handleToggleClick: function( event ) {
        event.preventDefault();
        event.stopPropagation();

        var toggle = $(this),
					item = event.data.item,
          submenu = event.data.submenu,
          plugin = event.data.plugin;

        if ( item.hasClass( plugin.options.openClass ) ) {
					toggle.attr('aria-expanded', false);
          plugin.closeSubmenu( item, submenu );
        } else {
					toggle.attr('aria-expanded', true);
          plugin.openSubmenu( item, submenu );
					//submenu.focus();
        }

			},

      openSubmenu: function ( item, submenu, speed ) {

        item.removeClass( this.options.closedClass ).
          addClass(this.options.openClass);

        if( typeof submenu === "undefined" ) {
          submenu = item.find( this.options.submenuSelector );
        }

        if (typeof speed === "undefined" ) {
          speed = this.options.speed;
        }

				item.
					attr('aria-expanded', true);

        submenu
					.slideDown( speed )
					.attr('aria-hidden', false)
					.attr('aria-expanded', true);

      },

      closeSubmenu: function ( item, submenu, speed ) {

        item.removeClass( this.options.openClass ).
          addClass(this.options.closedClass);

        if( typeof submenu === "undefined" ) {
          submenu = item.find( this.options.submenuSelector );
        }

        if (typeof speed === "undefined" ) {
          speed = this.options.speed;
        }

				item.
					attr('aria-expanded', false);

        submenu
					.slideUp( speed )
					.attr('aria-hidden', true)
					.attr('aria-expanded', false);
      },


			addExpandAllToggle: function () {
				this.expandAllToggle = $('<button class="expand-all">Expand</button>');
				this.expanded = false;
				this.expandAllToggle.on('click',
					{
						plugin: this
					},
					this.handleExpandAllClick );

				$(this.element).prepend( this.expandAllToggle );
			},

			handleExpandAllClick: function (event) {
				var plugin = event.data.plugin;

				if ( plugin.expanded ) {
					plugin.expandAllToggle.text('Expand');
					plugin.items.each( function () {
						var $item = $(this);
						plugin.closeSubmenu($item, undefined, 0);
					})
				} else {
					plugin.expandAllToggle.text('Collapse');
					plugin.items.each( function () {
						var $item = $(this);
						plugin.openSubmenu($item, undefined, 0);
					})
				}

				plugin.expanded = !plugin.expanded;

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
