// Responsive menu trigger
$(function() {

  $('.menu-trigger').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('offcanvas-active');
  });

  $('.nav-main-fader').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('offcanvas-active search-active');
  });

  // Responsive table of contents
  $('.toc-toggler').on('click', function (e) {
    e.preventDefault();
    
    // Toggle aria expanded attribute for accessibility 
    $(this).attr('aria-expanded', function(i, attr){
      return attr == 'true' ? 'false' : 'true'
    });
    $(this).parent().toggleClass('expanded');
  });

});
