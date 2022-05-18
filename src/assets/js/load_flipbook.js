function setArrows() {
    setTimeout(function () {
        var width = $(window).width();
        var bookWidth = $(".flipbook").width();
        var magaLeft = $(".flipbook").offset().left;
        var nextLeft = (width - bookWidth - magaLeft - 60) / 2;
        $('.next-button').animate({ "right": nextLeft }, 300);
        $('.previous-button').animate({ "left": nextLeft }, 300);
    }, 1);
}

function closeBook() {
    RevealLoad();
    $('#canvas').fadeOut(1000);
}

function loadBook(book) {
    HideLoad();
    setArrows();

    $('#canvas').fadeIn(1000);
    var flipbook = $('.flipbook');

    // Check if the CSS was already loaded	
    if (flipbook.width() == 0 || flipbook.height() == 0) {
        setTimeout(loadBook, 10, book);
        return;
    }

    console.log('加载书籍 ' + book.name);

    // 创建flipbook
    var flipbook = $('.flipbook');

    if (flipbook.turn('is'))
        flipbook.turn('destroy');

    flipbook.turn({
        width: 1200,
        height: 800,
        duration: 1000,   // 翻页速度，值越小越快
        // Hardware acceleration
        acceleration: !isChrome(),
        // Enables gradients
        gradients: true,
        // Auto center this flipbook
        autoCenter: true,
        // Elevation from the edge of the flipbook when turning a page
        elevation: 50,
        // The number of pages
        pages: book.pages,
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
            return 1.5;
        },
        when: {
            swipeLeft: function () {
                $(this).zoom('flipbook').turn('next');
            },

            swipeRight: function () {
                $(this).zoom('flipbook').turn('previous');
            },

            resize: function (event, scale, page, pageElement) {
                // loadSmallPage(page, pageElement);
                // if (scale == 1)
                //     loadSmallPage(page, pageElement);
                // else
                //     loadLargePage(page, pageElement);
            },

            zoomIn: function () {
                // $('.made').hide();
                $('.flipbook').removeClass('animated').addClass('zoom-in');
                $('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');
                // if (!window.escTip && !$.isTouch) {
                //     // escTip = true;
                //     $('<div />', { 'class': 'exit-message' }).
                //         html('<div>Press ESC to exit</div>').
                //         appendTo($('body')).
                //         delay(2000).
                //         animate({ opacity: 0 }, 500, function () {
                //             $(this).remove();
                //         });
                // }
            },

            zoomOut: function () {
                // $('.exit-message').hide();
                // $('.thumbnails').fadeIn();
                // $('.made').fadeIn();
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

    Hash.go('page/1').update();

    resizeViewport();

    $('.flipbook').addClass('animated');
}

var initTurnjs = () => {

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

    // // Using arrow keys to turn the page
    // $(document).keydown(function (e) {
    //     var previous = 37, next = 39, esc = 27;
    //     switch (e.keyCode) {
    //         case previous:
    //             // left arrow
    //             $('.flipbook').turn('previous');
    //             e.preventDefault();
    //             break;
    //         case next:
    //             //right arrow
    //             $('.flipbook').turn('next');
    //             e.preventDefault();
    //             break;
    //         case esc:
    //             $('.flipbook-viewport').zoom('zoomOut');
    //             e.preventDefault();
    //             break;
    //     }
    // });

    $(window).resize(function () {
        resizeViewport();
    }).bind('orientationchange', function () {
        resizeViewport();
    });

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
        setArrows();
    });

    // Events for the previous button	

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
        setArrows();
    });

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
}

// http://code.google.com/p/chromium/issues/detail?id=128488
function isChrome() {
    return navigator.userAgent.indexOf('Chrome') != -1;
}

// Load the HTML4 version if there's not CSS transform

export { initFlipbook, loadBook, closeBook }

var initFlipbook = () => {
    yepnope({
        test: Modernizr.csstransforms,
        yep: ['/assets/js/turnjs/turn.min.js'],
        nope: ['/assets/js/turnjs/turn.html4.min.js'],
        both: ['/assets/js/turnjs/zoom.min.js', '/assets/js/turnjs/flipbook.js', '/assets/css/flipbook.css'],
        complete: initTurnjs,
    });
}
