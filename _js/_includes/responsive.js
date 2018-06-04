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
    $(this).parent().toggleClass('expanded');
  });

});
