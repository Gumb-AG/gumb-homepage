/*jQuery(document).ready(function () {
    
    // Scrollmenu
    fixedNav();
    jQuery(window).scroll(function () {
        fixedNav();
    });

});

function fixedNav() {
    if (jQuery(window).scrollTop() >= 1275) {
        jQuery('.nav').addClass('nav--fixed');
        jQuery('.nav__brand').hide();
        jQuery('nav .btn').addClass('btn--inverted');
    } else {
        jQuery('.nav').removeClass('nav--fixed');
        jQuery('.nav__brand').show();
        jQuery('nav .btn').removeClass('btn--inverted');
    }
}*/

// Mobile Nav
$(function() {
    $('#mobileNav').change(function() {
        window.location.replace( $("#mobileNav option:selected").val() );
    });
});