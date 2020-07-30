$(function() {
    // Mobile Nav
    $('#mobileNav').change(function() {
        window.location.replace( $("#mobileNav option:selected").val() );
    });

    // Fix nev when scrolling (or swiping) up
    var lastScrollTop = 0;
    $(window).scroll(function() {
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            //console.log('scroll down');

            hideFixedNav();
        } else {
            //console.log('scroll up');

            if ($(window).scrollTop() > 950)
                showFixedNav();
            else if ($(window).scrollTop() < 850)
                hideFixedNav();
        }
        lastScrollTop = st;
    });
});

function showFixedNav() {
    // Slide-in animation and fix Nav
    $('.nav').addClass('nav--fixed').parent().addClass('nav__wrapper--fixed').removeClass('nav__wrapper--fixed--remove');
}

function hideFixedNav() {
    // Slide-up animation
    $('.nav__wrapper').addClass('nav__wrapper--fixed--remove');

    // Remove fixed Nav state after 500ms (after Slide-up animation has finished)
    setTimeout(function(){ 
        $('.nav').removeClass('nav--fixed').parent().removeClass('nav__wrapper--fixed');
     }, 300);
}
