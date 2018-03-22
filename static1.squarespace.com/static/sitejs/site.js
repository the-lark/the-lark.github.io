/**
 * Main script for The Lark gallery.
 *
 * This script is a super quick 'n' dirty replacement for Squarespace
 * gallery functionality.
 */
(function () { // Begin Immediately-invoked Function Expression (IIFE).
    /**
     * Main function for invoking The Lark's gallery template.
     */
    function theLarkGallery () {
        var gallery = document.getElementById('the-lark-gallery-container');
        if (gallery) {
            initGallery(gallery);
        }
    }

    /**
     * Watches for changes in the DOM and runs the main function
     * (`theLarkGallery()`) when it notices something relevant.
     *
     * We use the `MutationObserver` API here because, evidently, when
     * a user loads a new page, Squarespace intercepts the click and,
     * rather than simply loading a new page, runs JavaScript that
     * performs an XHR (XMLHttpRequest) to retrieve the entire content
     * of the loaded page, then updates the page's DOM in-place.
     *
     * Due to this absurdity, simply attaching an event handler to a
     * relevent event will not be sufficient to invoke the needed
     * functionality. Instead, we must constantly watch for changes.
     */
    function watchForLarkGallery () {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes) {
                    theLarkGallery();
                }
            });
        });
        observer.observe(document.body, {
            'childList': true,
            'subtree': true
        });
    }


    /**
     * Initializes the gallery view.
     *
     * This function styles the images in the gallery, which are
     * expected to be marked up using a simple ordered list (`<ol>`),
     * and attaches the necessary event handlers for users' clicks.
     *
     * @param {HTMLElement} el The list element containing the images.
     */
    function initGallery (el) {
        el.setAttribute('style', 'list-style-type: none;');
        var images = el.querySelectorAll('img');
        images.forEach(function (el) {
            el.setAttribute('width', '100%');
            el.setAttribute('style', 'display:none;');
            el.addEventListener('click', function () {
                nextSlide(el);
            });
        });
        showImage(images[0]);
    }

    /**
     * Shows the next image and hides the current one, progressing
     * through the gallery sequence as ordered in the HTML source.
     *
     * @param {HTMLElement} el The `<img>` element that was clicked.
     */
    function nextSlide (el) {
        hideImage(el);
        if (el.parentElement.nextElementSibling) {
            showImage(el.parentElement.nextElementSibling.querySelector('img'));
        } else {
            showImage(el.parentElement.parentElement.querySelector('li:first-child img'));
        }
    }

    /**
     * Shows the given image.
     *
     * @param {HTMLElement} el The image (`<img>` element) to show.
     */
    function showImage (el) {
        el.setAttribute('style', 'display:block;');
    }

    /**
     * Hides the given image.
     *
     * @param {HTMLElement} el The image (`<img>` element) to hide.
     */
    function hideImage (el) {
        el.setAttribute('style', 'display:none;');
    }

    document.addEventListener('DOMContentLoaded', function () {
        watchForLarkGallery();
        theLarkGallery();
    });
})(); // End IIFE.
