/**
* If Google Analytics has loaded successfully
* and has not been shimmed apply link click tracking.
* https://davidwalsh.name/detecting-google-analytics
*/

$(function () {
    /**
     Track onbound links click (for GitHub links)
     */
    setHandlers('.improve-page', {
        eventCategory: 'Outbound Link',
        eventLabel: 'Edit this page on GitHub'
    });

    /**
     Track "Give us Feedback" link click
     */
    setHandlers('.new-issue a', {
        eventCategory: 'Outbound Link',
        eventLabel: 'Give us feedback'
    });

    /**
     Track "Become Contributor" home page button
     */
    setHandlers('.home-contributors .btn-primary', {
        eventCategory: 'Internal Link',
        eventLabel: 'Become Contributor on home page'
    });

    function setHandlers(selector, config) {
        $(selector).on('click', function (e) {
            if (! window.ga || ! window.ga.create) {
                return true;
            }

            var $this = $(this),
                url = $this.attr('href'),
                isTargetBlank = $this.attr('target') === '_blank';

            if (!isTargetBlank) {
                e.preventDefault();
            }

            config = $.extend({}, config, {
                eventAction: 'click',
                transport: 'beacon',
                hitCallback: function(){
                    if (!isTargetBlank) {
                        document.location = url;
                    }
                }
            });

            ga('send', 'event', config);
        });
    }
});
