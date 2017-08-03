
// This is what happens on document.ready
$(function() {

  $(window).on('load', function(){
    // Fix headers hiding behind nav when loading on anchor link
    if(window.location.hash) {
      $(document).scrollTop($(document).scrollTop() - 60);
    }
  });

  // Sticky header
  $(document).on('scroll', function(){
  	if( $(document).scrollTop() > 10 )
  		$('#global-nav').addClass('sticky-nav-main');
  	else
  		$('#global-nav').removeClass('sticky-nav-main');
  });

  animatedAnchors.init();


  $.modal.defaults = {
    closeExisting: true,
    escapeClose: true,
    clickClose: true,
    closeText: '×',
    closeClass: '',
    modalClass: "modal",
    blockerClass: "jquery-modal",
    spinnerHtml: null,
    showSpinner: true,
    showClose: true,
    fadeDuration: 100,   // Number of milliseconds the fade animation takes.
    fadeDelay: 1.0        // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
  };


});
// END document ready
