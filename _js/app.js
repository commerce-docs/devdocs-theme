$(function() {

  $(window).on('load', function(){
    // Fix headers hiding behind nav when loading on anchor link
    if(window.location.hash) {
      $(document).scrollTop($(document).scrollTop() - 60);
    }
  });



  // Magento Glossary
  magento.glossary.init('https://magento.github.io/glossary/data/content-glossary.xml',function(term){return term.types.includes('glossary');},magento.glossary.tooltip.init);

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


  animatedAnchors.init();

});
// END document ready
