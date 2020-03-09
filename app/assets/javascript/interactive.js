$(function() {
    // Our values UI logic
    $('.value').click(function(){
        // Define which value was clicked
        var v = $(this).data('value');

        // Set active h3
        $('.value').removeClass('gradient');
        $('#value' +v).addClass('gradient');

        // Set active Text
        $('.valueText').hide();
        $('#value' +v +'Text').show();
    });
});