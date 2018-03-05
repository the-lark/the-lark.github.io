/**
 * Main script for The Lark gallery.
 *
 * This script is a super quick 'n' dirty replacement for Squarespace
 * gallery functionality.
 */
(function () { // Begin Immediately-invoked Function Expression (IIFE).
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

    function nextSlide (el) {
        hideImage(el);
        if (el.parentElement.nextElementSibling) {
            showImage(el.parentElement.nextElementSibling.querySelector('img'));
        } else {
            showImage(el.parentElement.parentElement.querySelector('li:first-child img'));
        }
    }

    function showImage (el) {
        el.setAttribute('style', 'display:block;');
    }

    function hideImage (el) {
        el.setAttribute('style', 'display:none;');
    }

    document.addEventListener('DOMContentLoaded', function () {
        var gallery = document.getElementById('the-lark-gallery-container');
        if (gallery) {
            initGallery(gallery);
        }
    });
})(); // End IIFE.
