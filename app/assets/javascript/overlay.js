// Overlay logic

$(function() {

    // Login Overlay
    $('#login').click(function(){
        $('#loginOverlay').addClass('flex');
    });

    // Close Overlay
    $('.close').click(function(){
        $('#loginOverlay').removeClass('flex');
    });
    
});