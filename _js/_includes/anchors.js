// Animate the anchor link scrolling
var animatedAnchors = {
  init: function ( settings ) {
    animatedAnchors.config = {
      items: $('.main-container a[href^="#"], .main-container .anchor'),
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
      var y = $target[0].getBoundingClientRect().top + window.pageYOffset - animatedAnchors.config.headerHeight;
      
      history.pushState({}, '', '#' + hash);
      window.scrollTo({top: y, behavior: 'smooth'});

    }
  }

};
