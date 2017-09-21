// TODO: Get rid of the jquery-ui dependency
// All divs with classname "collapsible" will have jquery-ui accordion functionality
$(function() {

  $('.collapsible').on('click', '.collapsible-title', function (e) {
    $(this).next('.collapsible-content').toggle(200);
    $(this).parents('.collapsible').toggleClass('active');
  });
 
});
