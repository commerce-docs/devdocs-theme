
$(function() {

  $('.collapsible').on('click', '.collapsible-title', function (e) {
    $(this).next('.collapsible-content').toggle(200);
    $(this).parents('.collapsible').toggleClass('active');
  });

});
