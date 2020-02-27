jQuery(document).ready(function () {
    
    // Scrollmenu
    fixedNav();
    jQuery(window).scroll(function () {
        fixedNav();
    });

});

function fixedNav() {
    if (jQuery(window).scrollTop() >= 775) {
        jQuery('.nav').addClass('nav--fixed');
        jQuery('.nav__brand').hide();
        //jQuery('.nav__brand--wordmark').show();
        jQuery('nav .btn').addClass('btn--inverted');
    } else {
        jQuery('.nav').removeClass('nav--fixed');
        jQuery('.nav__brand').show();
        //jQuery('.nav__brand--wordmark').hide();
        jQuery('nav .btn').removeClass('btn--inverted');
    }
}