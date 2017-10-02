/*
 * Dropdown menu, uses bootstrap html syntax
 * Simplifyed version of bootstrap v4 dropdown.
 * Uses popper.js for posistioning


var Dropdown = function ($) {

  var ESCAPE_KEYCODE           = 27 // KeyboardEvent.which value for Escape (Esc) key
  var SPACE_KEYCODE            = 32 // KeyboardEvent.which value for space key
  var TAB_KEYCODE              = 9 // KeyboardEvent.which value for tab key
  var ARROW_UP_KEYCODE         = 38 // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE       = 40 // KeyboardEvent.which value for down arrow key

  var className = {
    DISABLED  : 'disabled',
    SHOW      : 'open'
  }

  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap dropdown require Popper.js (https://popper.js.org)');
  }

  var init = function ( options, element ) {


  };

  var show = function () {


  };

  var hide = function () {


  };

  return init;

}( jQuery );


$(function() {

  $('.dropdown .dropdown-toggle').on('click', function () {
    var $toggle = $(this),
      $dropdown = $toggle.parent();
      $menu = $dropdown.find('.dropdown-menu');

    var popper = new Popper( $toggle, $menu, {
      placement: 'bottom',
      modifiers: {
        flip: {
            behavior: ['left', 'bottom', 'top']
        }
      },
    });

    $dropdown.toggleClass('open');

  });

});
*/
