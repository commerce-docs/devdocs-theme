$(function() {

  $(window).on('load', function(){
    // Fix headers hiding behind nav when loading on anchor link
    if(window.location.hash) {
      $(document).scrollTop($(document).scrollTop() - 60);
    }
  });

  // jquery modal settings
  $.modal.defaults = {
    closeExisting: true,
    escapeClose: true,
    clickClose: true,
    closeText: '×',
    closeClass: '',
    modalClass: 'modal',
    blockerClass: 'jquery-modal',
    spinnerHtml: null,
    showSpinner: true,
    showClose: true,
    fadeDuration: 100,   // Number of milliseconds the fade animation takes.
    fadeDelay: 1.0        // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
  };

  // Initialize navigations
  var navMain = $('.site-header .nav-main');
  navMain.mainNavigation();

  var navSide = $('.collapsible-navigation');
  navSide.collapsibleNavigation();

  // Initialize and generate toc
  var pageInfo = $('.page-info');
  pageInfo.tableOfContents();

  // Initialize smooth scrolling for anchor links
  animatedAnchors.init();

  // Initialize the image zoom
  $('.content').zoom();

  // Focus on the first dropdown item on showing the dropdown
  $('.app-switcher .dropdown').on('show.bs.dropdown', function (event) {
    window.setTimeout(function() {  $('.app-switcher a').filter(':first').focus(); }, 50);
  });


});
// END document ready
