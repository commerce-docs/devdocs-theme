// Copy to clipboard
// Requires clipboard.min.js
$(function() {
  // Create buttons
  var $highlightBtn = $('<div class="btn btn-copy">Copy</div>');
  var $noCopyBtn = $('<div class="btn btn-no-copy">Not for copy</div>');
  // Get all pre tags
  var $preTags = $('.highlight');

  // Iterate each pre tag
  $preTags.each( function () {
    var $this = $(this),
        noCopy = $this.parents().hasClass('no-copy');

    var $preWrap = $this.wrap('<div class="pre-wrap"></div>').parent();

    // Check if should be copied or not
    if ( noCopy ) {
      $noCopyBtn.clone().appendTo($preWrap);
    } else {

      $highlightBtn.clone().appendTo($preWrap);

      // Create clipboard object
      var clipboard = new ClipboardJS( $preWrap.find('.btn-copy')[ 0 ] , {
        target: function(trigger) {
          return trigger.previousElementSibling;
        }
      });

      // Attach clipboard events
      clipboard.on('success', function(e) {
        e.trigger.innerText = 'Copied';
        var timerId = setTimeout( function () { e.trigger.innerText='Copy'; }, 3000);
      });
      clipboard.on('error', function(e) {
        
      });
      $this.data('clipboard', clipboard);

    }

  });
});
