/*!
 * Main Navigation
 * author: ybannykh@magento.com
*/
;( function( $, window, document, undefined ) {
	'use strict';

	var pluginName = 'mainNavigation',
		defaults = {
			menuActiveClass: 'active',
			mobileTreshold: 1024,
			offcanvasClass: 'offcanvas-active',
			sectionSelector: '.nav-section',
			popupSelector: '.nav-popup',
			topLevelItemsSelector: '.nav-main-item',
		};

	// The actual plugin constructor
	function Plugin ( element, options ) {
		var plugin = this;
		this.element = element;
		this.$element = $(element);
		this.options = $.extend( {}, defaults, options );
		this.$popups = this.$element.find( this.options.popupSelector )
		this._defaults = defaults;
		this._name = pluginName;
		this._desktopMode = false;

		this.handleMenuItemMouseEnter = function ( event ) {
			event.stopPropagation();
			event.preventDefault();
			var currentItem = $(this);

			plugin.showPopup( currentItem );
		}

		this.handleMenuItemMouseLeave = function ( event ) {
			event.stopPropagation();
			event.preventDefault();
			var currentItem = $(this);

			plugin.hidePopup( currentItem );
		}

		this.handleMenuItemFocusOut = function ( event ) {
			var menuItem = $(this);
			plugin.hidePopup( menuItem );
		}

		this.handleMenuItemFocusIn = function ( event ) {
			var menuItem = $(this);
			plugin.showPopup( menuItem );
		}

		// These functions handle the popup appearance
		this.showPopup = function ( menuItem ) {
			var popup = menuItem.find( plugin.options.popupSelector );
			plugin.hidePopup( plugin.topLevelItems.not( menuItem ) );

			// Center the flyout menu on desktop mode if popup has sections
			if ( plugin._desktopMode && popup.find( plugin.options.sectionSelector ).length ) {
				var windowWidth = $(window).width(),
						popupWidth = popup.width();
				// Adjust the popup position relative to the menu item
				var popupPosition = ( windowWidth - popupWidth ) / 2;
				if ( popupPosition < menuItem.offset().left ) {
					popup.offset({ left: popupPosition });
				}
			}

			menuItem.addClass( plugin.options.menuActiveClass );
			popup.attr('aria-hidden', 'false');
		}

		this.hidePopup = function ( menuItem ) {
			var popup = menuItem.find( plugin.options.popupSelector );
			menuItem.removeClass( plugin.options.menuActiveClass );
			popup.attr('aria-hidden', 'true');
		}

		this.handleLabelClick = function ( event ) {
			var label = $(this),
					menuItem = label.closest( plugin.options.topLevelItemsSelector ),
					popup = menuItem.find( plugin.options.popupSelector );

			popup.focus();
		}

		// Determine if the browser is in mobile view or not
		this.handleWindowResize = function () {
			if ( $(window).width() >= plugin.options.mobileTreshold ) {
				if ( !plugin._desktopMode ) {
					plugin.desktopViewOn();
				}
			} else {
				if ( plugin._desktopMode ) {
					plugin.desktopViewOff();
				}
			}
		}

		this.handleClickOutside = function (event) {
			if ( !$(event.target).closest( plugin.topLevelItems ).length ) {
				plugin.hidePopup( plugin.topLevelItems );
			}
		}

		// Switch to the Desktop view
		this.desktopViewOn = function () {
			plugin._desktopMode = true;

			plugin.topLevelItems
				.on('mouseenter', plugin.handleMenuItemMouseEnter)
				.on('mouseleave', plugin.handleMenuItemMouseLeave)
				.on('focusin', plugin.handleMenuItemFocusIn)
				.on('focusout', plugin.handleMenuItemFocusOut);

			$(document).on('touchstart', plugin.handleClickOutside);

			plugin.$popups.each(function () {
				var popup = $(this);

				popup
					.attr('aria-hidden', true);
			});

		}

		// Switch to the Mobile view
		this.desktopViewOff = function () {
			plugin._desktopMode = false;

			plugin.topLevelItems
				.off('mouseenter', plugin.handleMenuItemMouseEnter)
				.off('mouseleave', plugin.handleMenuItemMouseLeave)
				.off('focusin', plugin.handleMenuItemFocusIn)
				.off('focusout', plugin.handleMenuItemFocusOut);

			// Hide popups if clicked outside of the popup
			$(document).off('touchstart', plugin.handleClickOutside);

			plugin.$popups.each(function () {
				var popup = $(this);

				popup.closest( plugin.options.topLevelItemsSelector ).
					attr('aria-haspopup', false);

				popup
					.css('left', 'auto')
					.attr('aria-hidden', false);
			});

		}

		this.init();
	}

	Plugin.prototype.init = function () {
		var plugin = this;
		plugin.topLevelItems = plugin.$element.find( plugin.options.topLevelItemsSelector );

		// Assign Events
		$(window).on('resize', plugin.handleWindowResize);
		plugin.handleWindowResize();

		// Assign attributes to popups
		var popupN = 0;
		plugin.$popups.each(function () {
			popupN++;
			var popup = $(this),
				popupId = 'main-nav-popup-' + popupN,
				popupLabel = 'main-nav-popupLabel-' + popupN,
				label = $(this).closest( plugin.options.topLevelItemsSelector ).find('> a, > span');

			label
				.attr('id', popupLabel)
				.on('click', plugin.handleLabelClick );

			popup
				.attr('tabindex', -1)
				.attr('role', 'menu')
				.attr('aria-labelledby', popupLabel);
		})

	}

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

})( jQuery, window, document );
