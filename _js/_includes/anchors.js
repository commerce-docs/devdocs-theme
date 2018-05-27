// Animate the anchor link scrolling
var animatedAnchors = {
  init: function ( settings ) {
    animatedAnchors.config = {
      items: $('.main-container a[href^="#"]'),
      root:  $('html, body'),
      speed:  500,
      headerHeight: 60
    };
    $.extend( animatedAnchors.config, settings );
    animatedAnchors.setup();
  },

  setup: function () {
    animatedAnchors.config.items.on('click', animatedAnchors.handleClick );
  },

  handleClick: function ( event ) {
    var $this = $(this),
        url = $this.attr('href'),
        hash = url.split('#')[1]
        $target = $( '#' + hash );
        
    if ( $target.length ) {
      event.preventDefault();
      animatedAnchors.config.root.stop().animate({
        scrollTop: $target.offset().top - animatedAnchors.config.headerHeight
      }, animatedAnchors.config.speed );
    }

  }

};
