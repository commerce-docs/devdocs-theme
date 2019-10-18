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


  $('.app-launcher-trigger').on('click', function (event) {
    $('.app-launcher .dropdown').toggleClass('show');
    $('.app-launcher .dropdown a:first').focus();
  });

  $(document).on('click', function (event) {
    var contains = $.contains($('.app-launcher')[0], event.target);
    console.log(contains)
    if ( ! contains ) {
      $('.app-launcher .dropdown').removeClass('show');
    }
  })

  $('.app-launcher .tab-item').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).siblings().removeClass('is-selected');
   
    $(this).addClass('is-selected');
    $('.app-launcher .tab-conent').hide();

    console.log(  $(this).attr('aria-controls') );

    $('#' + $(this).attr('aria-controls') ).show();
    $('#' + $(this).attr('aria-controls') ).find('a:first').focus();
    
  }); 
  


});
// END document ready
