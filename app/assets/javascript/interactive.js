$(document).ready(function () {

    $('.footer__more').one('mouseenter', function () {
        var resultElement = $('#sorep');
        $.ajax({
            url: 'https://api.stackexchange.com/2.2/users/4033913?order=desc&sort=reputation&site=stackoverflow',
            method: 'get',
            dataType: 'json',
            success: function (response) {
                resultElement.attr('title', 'Stack Overflow Reputation: ' + response.items[0].reputation);
            },
            error: function (err) {
                console.log('SO RESTget failed: ' + err);
            }
        });
    });

});
