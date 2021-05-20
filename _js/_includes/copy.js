// Copy to clipboard
// Requires clipboard.min.js
$(function() {
  // Create buttons
  var $highlightBtn = $('<button class="spectrum-ActionButton spectrum-ActionButton--quiet btn-copy"><span class="spectrum-ActionButton-label">Copy<span></button>');
  var $noCopyBtn = $('<button class="spectrum-ActionButton spectrum-ActionButton--quiet btn-no-copy" disabled><span class="spectrum-ActionButton-label">Not for copy</span></button>');
  // Get all pre tags
  var $preTags = $('.highlight:not(:has(.highlight))');

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
