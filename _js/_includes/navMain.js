/*!
 * Main Navigation
 * author: ybannykh@magento.com
*/
;( function( $, window, document, undefined ) {
	'use strict';

	var pluginName = 'mainNavigation',
		defaults = {
			menuActiveClass: 'active',
			menuDelay: 40,
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
		this._defaults = defaults;
		this._name = pluginName;

		this.handleMenuMouseEnter = function ( event ) {
			event.stopPropagation();
			event.preventDefault();

			var currentItem = $(this),
					popup = currentItem.find( plugin.options.popupSelector );

			// Center the flyout menu on desktop/tablet landscape
			if ( !$('body').hasClass( plugin.options.offcanvasClass ) && popup.find( plugin.options.sectionSelector ).length ) {
				var windowWidth = $(window).width(),
						popupWidth = popup.width();

				// Adjust the popup position relative to the menu item
				var popupPosition = ( windowWidth - popupWidth ) / 2;
				if ( popupPosition < currentItem.offset().left ) {
					popup.offset({ left: popupPosition });
				} else {
					popup.offset({ left: 'auto' });
				}

			} else {
				popup.css({ left: 'auto' });
			}

			// Delay the appearance of the popup menu
			clearTimeout( window.navTimer );
			window.navTimer = window.setTimeout( function () {
				plugin.showPopup( currentItem );
			}, plugin.options.menuDelay );

		}


		this.handleMenuMouseLeave = function ( event ) {
			event.stopPropagation();
			event.preventDefault();
			var currentItem = $(this);

			plugin.hidePopup( currentItem );
			clearTimeout( window.navTimer );
		}

		this.handleMenuFocusOut = function ( event ) {
			var menuItem = $(this);
			setTimeout( function () {
				if (	menuItem.find(':focus').length == 0 ) {
					plugin.hidePopup( menuItem );
					menuItem.find( plugin.options.popupSelector ).css({ left: 'auto ' });
				}
			}, plugin.options.menuDelay);
		}

		// These functions handle the popup appearance
		this.showPopup = function ( menuItem ) {
			var popup = menuItem.find( plugin.options.popupSelector );

			plugin.hidePopup( plugin.topLevelItems.not( menuItem ) );

			menuItem.addClass( plugin.options.menuActiveClass );
			popup.attr('aria-hidden', 'false');
			popup.find('a').attr('tabindex', 0);
		}

		this.hidePopup = function ( menuItem ) {
			var popup = menuItem.find( plugin.options.popupSelector );
			menuItem.removeClass( plugin.options.menuActiveClass );
			popup.attr('aria-hidden', 'true');
			popup.find('a').attr('tabindex', -1);
		}

		this.init();
	}


	Plugin.prototype.init = function () {
		var plugin = this;
		plugin.topLevelItems = plugin.$element.find( plugin.options.topLevelItemsSelector );

		// Assign Events
		$(document).on('touchstart', function( event ) {
			if ( !$(event.target).closest( plugin.topLevelItems ).length ) {
				plugin.hidePopup( plugin.topLevelItems );
			}
		});

		plugin.topLevelItems
			.on('mouseenter focusin', plugin.handleMenuMouseEnter)
			.on('mouseleave', plugin.handleMenuMouseLeave )
			.on('focusout', plugin.handleMenuFocusOut);

		plugin.$element.on('focusout', function () {
			setTimeout( function () {
				if (	plugin.$element.find(':focus').length == 0 ) {
					plugin.hidePopup( plugin.topLevelItems.filter( '.' + plugin.options.menuActiveClass ) );
					plugin.$element.find( plugin.options.popupSelector ).css({ left: 'auto ' });
				}
			}, plugin.options.menuDelay);
		});

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
