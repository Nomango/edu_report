/*
 * Magazine sample
*/

function setArrows() {
    setTimeout(function () {
        var width = $(window).width();
        var bookWidth = $(".flipbook").width();
        var magaLeft = $(".flipbook").offset().left;
        var nextLeft = (width - bookWidth - magaLeft - 60) / 2;
        $('.next-button').animate({ "right": nextLeft }, 300);
        $('.previous-button').animate({ "left": nextLeft }, 300);
    }, 100);
}

function addPage(page, book) {
    var id, pages = book.turn('pages');
    // Create a new element for this page
    var element = $('<div />', {});

    // Add the page to the flipbook
    if (book.turn('addPage', element, page)) {
        // Add the initial HTML
        // It will contain a loader indicator and a gradient
        element.html('<div class="gradient"></div><div class="loader"></div>');
        // Load the page
        loadPage(page, element);
    }
}

function loadPage(page, pageElement) {
    // Create an image element
    var img = $('<img />');
    img.mousedown(function (e) {
        e.preventDefault();
    });
    img.on('load', function () {
        // Set the size
        $(this).css({
            width: '100%',
            height: '100%'
        });
        // Add the image to the page after loaded
        $(this).appendTo(pageElement);
        // Remove the loader indicator
        pageElement.find('.loader').remove();
    });
    // Load the page
    img.attr('src', '/assets/img/book/' + page + '.png');
}

// Zoom in / Zoom out
function zoomTo(event) {
    setTimeout(function () {
        if ($('.flipbook-viewport').data().regionClicked) {
            $('.flipbook-viewport').data().regionClicked = false;
        } else {
            if ($('.flipbook-viewport').zoom('value') == 1) {
                $('.flipbook-viewport').zoom('zoomIn', event);
            } else {
                $('.flipbook-viewport').zoom('zoomOut');
            }
        }
    }, 1);
}

// // Load large page
// function loadLargePage(page, pageElement) {
//     var img = $('<img />');
//     img.load(function () {
//         var prevImg = pageElement.find('img');
//         $(this).css({
//             width: '100%',
//             height: '100%'
//         });
//         $(this).appendTo(pageElement);
//         prevImg.remove();
//     });

//     // Loadnew page
//     img.attr('src', '/assets/img/book/' + page + '.png');
// }

// // Load small page
// function loadSmallPage(page, pageElement) {
//     var img = pageElement.find('img');
//     img.css({
//         width: '100%',
//         height: '100%'
//     });
//     img.unbind('load');
//     // Loadnew page
//     img.attr('src', '/assets/img/book/' + page + '.png');
// }


function disableControls(page) {
    if (page == 1) $('.previous-button').hide();
    else $('.previous-button').show();

    if (page == $('.flipbook').turn('pages')) $('.next-button').hide();
    else $('.next-button').show();
}

// Set the width and height for the viewport
function resizeViewport() {

    if (!$('.flipbook').turn('is'))
        return;

    var width = $(window).width(),
        height = $(window).height(),
        options = $('.flipbook').turn('options');

    $('.flipbook').removeClass('animated');

    $('.flipbook-viewport').css({
        width: width,
        height: height
    }).zoom('resize');
    setArrows();

    if ($('.flipbook').turn('zoom') == 1) {
        var bound = calculateBound({
            width: options.width,
            height: options.height,
            boundWidth: Math.min(options.width, width),
            boundHeight: Math.min(options.height, height)
        });

        if (bound.width % 2 !== 0)
            bound.width -= 1;

        if (bound.width != $('.flipbook').width() || bound.height != $('.flipbook').height()) {
            $('.flipbook').turn('size', bound.width, bound.height);
            if ($('.flipbook').turn('page') == 1)
                $('.flipbook').turn('peel', 'br');
        }

        $('.flipbook').css({
            top: -bound.height / 2,
            left: -bound.width / 2
        });
    }

    $('.flipbook').addClass('animated');
}

// Calculate the width and height of a square within another square
function calculateBound(d) {
    var bound = {
        width: d.width,
        height: d.height
    };
    if (bound.width > d.boundWidth || bound.height > d.boundHeight) {
        var rel = bound.width / bound.height;
        if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {
            bound.width = Math.round(d.boundHeight * rel);
            bound.height = d.boundHeight;
        } else {
            bound.width = d.boundWidth;
            bound.height = Math.round(d.boundWidth / rel);
        }
    }
    return bound;
}
