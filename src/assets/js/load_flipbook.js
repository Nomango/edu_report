function loadApp() {

    $('#canvas').fadeIn(1000);

    var flipbook = $('.flipbook');

    // Check if the CSS was already loaded	

    if (flipbook.width() == 0 || flipbook.height() == 0) {

        setTimeout(loadApp, 10);

        return;

    }

    // 创建flipbook

    flipbook.turn({

        width: 1200,

        height: 781,

        duration: 1000,   //翻页速度，值越小越快

        // Hardware acceleration

        acceleration: !isChrome(),

        // Enables gradients

        gradients: true,

        // Auto center this flipbook

        autoCenter: true,

        // Elevation from the edge of the flipbook when turning a page

        elevation: 50,

        // The number of pages

        pages: 7,

        // Events

        when: {

            turning: function (event, page, view) {

                var book = $(this),

                    currentPage = book.turn('page'),

                    pages = book.turn('pages');

                // Update the current URI

                Hash.go('page/' + page).update();

                // Show and hide navigation buttons

                disableControls(page);

            },

            turned: function (event, page, view) {

                disableControls(page);

                $(this).turn('center');

                if (page == 1) {

                    $(this).turn('peel', 'br');

                }

            },

            missing: function (event, pages) {

                // Add pages that aren't in the flipbook

                for (var i = 0; i < pages.length; i++)

                    addPage(pages[i], $(this));

            }

        }

    });



    // Zoom.js

    $('.flipbook-viewport').zoom({

        flipbook: $('.flipbook'),

        max: function () {

            return largeMagazineWidth() / $('.flipbook').width();

        },

        when: {

            swipeLeft: function () {

                $(this).zoom('flipbook').turn('next');

            },

            swipeRight: function () {

                $(this).zoom('flipbook').turn('previous');

            },



            resize: function (event, scale, page, pageElement) {

                if (scale == 1)

                    loadSmallPage(page, pageElement);

                else

                    loadLargePage(page, pageElement);

            },

            zoomIn: function () {

                $('.made').hide();

                $('.flipbook').removeClass('animated').addClass('zoom-in');

                $('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');

                if (!window.escTip && !$.isTouch) {

                    escTip = true;

                    $('<div />', { 'class': 'exit-message' }).

                        html('<div>Press ESC to exit</div>').

                        appendTo($('body')).

                        delay(2000).

                        animate({ opacity: 0 }, 500, function () {

                            $(this).remove();

                        });

                }

            },

            zoomOut: function () {

                $('.exit-message').hide();

                $('.thumbnails').fadeIn();

                $('.made').fadeIn();

                $('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');

                setTimeout(function () {

                    $('.flipbook').addClass('animated').removeClass('zoom-in');

                    resizeViewport();

                }, 0);

            }

        }

    });



    // Zoom event

    if ($.isTouch)
        $('.flipbook-viewport').bind('zoom.doubleTap', zoomTo);
    else
        $('.flipbook-viewport').bind('zoom.tap', zoomTo);

    // Using arrow keys to turn the page

    $(document).keydown(function (e) {

        var previous = 37, next = 39, esc = 27;

        switch (e.keyCode) {

            case previous:

                // left arrow

                $('.flipbook').turn('previous');

                e.preventDefault();

                break;

            case next:

                //right arrow

                $('.flipbook').turn('next');

                e.preventDefault();

                break;

            case esc:

                $('.flipbook-viewport').zoom('zoomOut');

                e.preventDefault();

                break;

        }

    });



    // URIs - Format #/page/1 

    Hash.on('^page\/([0-9]*)$', {

        yep: function (path, parts) {

            var page = parts[1];

            if (page !== undefined) {

                if ($('.flipbook').turn('is'))

                    $('.flipbook').turn('page', page);

            }

        },

        nop: function (path) {

            if ($('.flipbook').turn('is'))

                $('.flipbook').turn('page', 1);

        }

    });

    $(window).resize(function () {

        resizeViewport();

    }).bind('orientationchange', function () {

        resizeViewport();

    });



    // Events for thumbnails

    $('.thumbnails').click(function (event) {

        var page;

        if (event.target && (page = /page-([0-9]+)/.exec($(event.target).attr('class')))) {

            $('.flipbook').turn('page', page[1]);

        }

    });

    $('.thumbnails li').

        bind($.mouseEvents.over, function () {

            $(this).addClass('thumb-hover');



        }).bind($.mouseEvents.out, function () {



            $(this).removeClass('thumb-hover');



        });



    if ($.isTouch) {

        $('.thumbnails').

            addClass('thumbanils-touch').

            bind($.mouseEvents.move, function (event) {

                event.preventDefault();

            });

    } else {

        $('.thumbnails ul').mouseover(function () {

            $('.thumbnails').addClass('thumbnails-hover');

        }).mousedown(function () {

            return false;

        }).mouseout(function () {

            $('.thumbnails').removeClass('thumbnails-hover');

        });

    }



    // Regions

    if ($.isTouch) {

        $('.flipbook').bind('touchstart', regionClick);

    } else {

        $('.flipbook').click(regionClick);

    }



    // Events for the next button

    $('.next-button').bind($.mouseEvents.over, function () {

        $(this).addClass('next-button-hover');

    }).bind($.mouseEvents.out, function () {

        $(this).removeClass('next-button-hover');

    }).bind($.mouseEvents.down, function () {

        $(this).addClass('next-button-down');

    }).bind($.mouseEvents.up, function () {

        $(this).removeClass('next-button-down');

    }).click(function () {

        $('.flipbook').turn('next');

        setTimeout(function () {

            setArrows();

        }, 300);

    });



    // Events for the next button	

    $('.previous-button').bind($.mouseEvents.over, function () {

        $(this).addClass('previous-button-hover');

    }).bind($.mouseEvents.out, function () {

        $(this).removeClass('previous-button-hover');

    }).bind($.mouseEvents.down, function () {

        $(this).addClass('previous-button-down');

    }).bind($.mouseEvents.up, function () {

        $(this).removeClass('previous-button-down');

    }).click(function () {

        $('.flipbook').turn('previous');

        setTimeout(function () {

            setArrows();

        }, 300);



    });

    resizeViewport();

    $('.flipbook').addClass('animated');

}



// Zoom icon

$('.zoom-icon').bind('mouseover', function () {

    if ($(this).hasClass('zoom-icon-in'))

        $(this).addClass('zoom-icon-in-hover');

    if ($(this).hasClass('zoom-icon-out'))

        $(this).addClass('zoom-icon-out-hover');

}).bind('mouseout', function () {

    if ($(this).hasClass('zoom-icon-in'))

        $(this).removeClass('zoom-icon-in-hover');

    if ($(this).hasClass('zoom-icon-out'))

        $(this).removeClass('zoom-icon-out-hover');

}).bind('click', function () {

    if ($(this).hasClass('zoom-icon-in'))

        $('.flipbook-viewport').zoom('zoomIn');

    else if ($(this).hasClass('zoom-icon-out'))

        $('.flipbook-viewport').zoom('zoomOut');

});

$('#canvas').hide();

// Load the HTML4 version if there's not CSS transform


function setArrows() {
    /*var width = $(window).width();

    //alert("chushihua"+width);		
    var height = $(window).height();
    var bookWidth = $(".flipbook").width();
    var bookHeight = $(".flipbook").height();
    //alert("chushihua"+bookWidth);		
    var arrowSize = $(".next-button").width();
    //alert(arrowSize);
   alert($(".flipbook").offset().left+"\n"+$('.next-button').offset().left);

    var LeftArrowLeft = - ( width - bookWidth ) / 4 + 'px' ;
    //alert(LeftArrowLeft);
    var RightArrowLeft = - ( width - bookWidth+ arrowSize*2) / 4 + 'px' ;
    //alert(RightArrowLeft); 
    //alert(RightArrowLeft);
        //alert("zhihou"+bookWidth);	
    	
    $('.next-button').css( "right",RightArrowLeft );
    $('.previous-button').css( "left", LeftArrowLeft );*/
    setTimeout(function () {
        var width = $(window).width();
        var bookWidth = $(".flipbook").width();
        var arrowSize = $(".next-button").width();
        var magaLeft = $(".flipbook").offset().left;
        var nextLeft = (width - bookWidth - magaLeft - 60) / 2;
        //alert("width "+width +"\nbookWidth :"+bookWidth +"\nmagaLeft:"+magaLeft+"\nnextLeft:"+nextLeft);
        $('.next-button').animate({ "right": nextLeft }, 300);
        $('.previous-button').animate({ "left": nextLeft }, 300);
    }, 100);
}

export { initFlipbook }

var initFlipbook = () => {
    $(function () {
        setArrows();

        yepnope({
            test: Modernizr.csstransforms,
            yep: ['/assets/js/turnjs/turn.min.js'],
            nope: ['/assets/js/turnjs/turn.html4.min.js'],
            both: ['/assets/js/turnjs/zoom.min.js', '/assets/js/turnjs/flipbook.js', '/assets/css/flipbook.css'],
            complete: loadApp
        });
    });
}
