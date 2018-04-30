// TODO: Refactor this
// This script copies markdown toc into the .page-info

$(function() {

  $('#markdown-toc').hide();

  // Prepend link anchor to content headers
  var $toc = $('<div>',{
    class: 'page-toc',
  });
  $toc.appendTo('.page-info');
  $toc.append('<ul class="nav"></ul>');

  // Loop through each h2..h3 and build a TOC
  $(".content-wrap :header:not(h1)").each(function(){
      var $this = $(this),
          id = $this.attr('id'),
          no_toc = $this.hasClass('no_toc'),
          inside_collapsible = $this.parents('.collapsible').length,
          collapsible_title = $this.hasClass('collapsible-title'),
          anchor_text = '',
          show = true;

      // check if we need to process the link. do not process links that are hidden inside collapsible blocks
      if ( inside_collapsible ) {
        show = false;
        if ( collapsible_title) {
          show = true;
        }
      }
      if ( no_toc ) {
        show = false;
      }


      if ( show ) {

        // check if we have id on heading already
        if ( id ) {
          // use that id for the anchor
          anchor_text = id;
        } else {
          // generate id from the heading text
          var text = $this.text();
          anchor_text = text;
        }
        // clean up the anchor
        anchor_text = anchor_text.replace(/\s/g, '-').replace(/[`~!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');

        // prepend anhor to title
        var $link = $('<a>',{
          href: '#' + anchor_text,
          class: 'anchor'
        });
        // Add link to the header
        $this.prepend( $link );
        // Add id to the header if needed
        if ( !id ) {
          $this.attr('id', anchor_text);
        }

        // Allow only h2 and h3 tags in page toc
        var tag_name = $this.prop('tagName').toLowerCase();

        if ( tag_name == 'h2' || tag_name == 'h3' ) {
          var $li = $('<li class="nav-item ' + tag_name + '"><a class="nav-link" href="#' + anchor_text + '"></a></li>');
          $li.find('a').text( $this.text() );
          $toc.find('ul').append($li);
        }

      }

  });

  // do not show toc for less than 2 headings
  if ( $toc.find('li').length <= 1 ) {
    $toc.hide();
  }

  // Page toc on right side sticks to the browser window
  $('body').scrollspy({
    target: '.page-toc',
    offset: 65
  });

  // This event fires on activation of the toc item
  $(window).on('activate.bs.scrollspy', function (event) {
    if ( $toc.length ) {
      var tocHeight = Math.floor( $toc.height() ),
          tocNavHeight = Math.floor( $toc.find('.nav').height() );

      // For long TOCs, scroll the toc as page scrolls
      if (tocNavHeight > tocHeight ) {
        var $item = $toc.find('.active').parent(),
            itemTop = Math.floor( $item[0].offsetTop );

        // Determine how much of the TOC is currently scrolled
        var percentage = Math.floor( ( (itemTop) / ( tocNavHeight - 25) ) * 100 );
        var scroll = ( (percentage * tocNavHeight) / 100 ) - (percentage * tocHeight) / 100;

        if ($item.is(':last-child')) {
          scroll = tocNavHeight;
        }

        $toc.scrollTop( scroll );
      }
    }
  });

});
