// ** Menu **

$.fn.mainNavigation = function(settings) {

	return this.each( function( settings ) {

		settings = jQuery.extend({
			menuActiveClass: 'active',
			menuDelay: 40,
			offcanvasClass: 'offcanvas-active',
			sectionSelector: '.nav-section',
			popupSelector: '.nav-popup',
			topLevelItemsSelector: '.nav-main-item',
		}, settings);


		var nav = $(this);
		var topLevelItems = $(this).find( settings.topLevelItemsSelector );


		var setupNavigation = function () {

			$(document).on('touchstart', function( event ) {

				if ( !$(event.target).closest( topLevelItems ).length ) {
					hidePopup( topLevelItems );
					console.log('outside');
				}
			});

			topLevelItems
				.on('mouseenter focusin', handleMenuMouseEnter)
				.on('mouseleave', handleMenuMouseLeave );

			/*
			topLevelItems.children('a').on('click' ,function (e) {
				e.preventDefault();
			});*/

			// Focusing out of the nav should close the last opened popup
			nav.on('focusout', function (){
				setTimeout( function () {
					if (	nav.find(':focus').length == 0 ) {
						hidePopup( topLevelItems.filter( '.' + settings.menuActiveClass ) );
						nav.find( settings.popupSelector ).css({ left: 'auto ' });
					}
				}, 40);
			});


		};

		// mouseover, focusin:
		var handleMenuMouseEnter = function (e) {
			e.stopPropagation();
			e.preventDefault();
			var currentItem = $(this),
					popup = currentItem.find( settings.popupSelector );
			//console.log('enter');

			// Center the flyout menu on desktop/tablet landscape
			if ( !$('body').hasClass( settings.offcanvasClass ) && popup.find( settings.sectionSelector ).length ) {
				var windowWidth = $(window).width(),
						subItemWidth = popup.width();
				popup.offset({ left: ( windowWidth - subItemWidth )/2 });
			} else {
				popup.css({ left: 'auto' });
			}

			// Delay the appearance of the popup menu
			clearTimeout( window.navTimer );
			window.navTimer = window.setTimeout( function () {
				showPopup( currentItem );
			}, settings.menuDelay );

		}


		// mouseover, focusout
		var handleMenuMouseLeave = function (e) {
			e.stopPropagation();
			e.preventDefault();
			//console.log('leave');
			var currentItem = $(this);

			hidePopup( currentItem );

			clearTimeout( window.navTimer );
		}

		var handleLastLinkFocusOut = function (e) {
			//console.log( $(this) );
			hidePopup ( $(this).closest( settings.popupSelector ) );
		}

		// These functions handle the popup appearance
		var showPopup = function ( menuItem ) {
			var popup = menuItem.find( settings.popupSelector );

			hidePopup( topLevelItems.not( menuItem ) );

			menuItem.addClass( settings.menuActiveClass );
			popup.attr('aria-hidden', 'false');
			popup.find('a').attr('tabindex', 0);
		}

		var hidePopup = function ( menuItem ) {
			var popup = menuItem.find( settings.popupSelector );
			menuItem.removeClass( settings.menuActiveClass );
			popup.attr('aria-hidden', 'true');
			popup.find('a').attr('tabindex', -1);
		}


		setupNavigation();
		return this;

	});

};

var navMain = $('.site-header .nav-main');
navMain.mainNavigation();
