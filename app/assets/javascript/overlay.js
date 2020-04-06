// Overlay logic

$(function () {

    // Login Overlay
    $('#login').click(function () {
        $('.overlay').removeClass('flex');
        $('#loginOverlay').addClass('flex');
    });

    // Password-Reset Overlay
    $('#passReset').click(function () {
        $('.overlay').removeClass('flex');
        $('#resetOverlay').addClass('flex');
    });

    // Probeabo Overlay
    $('#try').click(function () {
        $('.overlay').removeClass('flex');
        $('#tryOverlay').addClass('flex');

        // Hide 2nd step
        $('#register2').hide();
    });

    // Go directly to register step 2 when signing up via the header
    $('#registerNext').click(function () {
        $('#tryOverlay').addClass('flex');

        // Hide 1st step
        $('#register').hide();
        
        // Show 2nd step
        $('#register2').show();
    });

    // Close (all) Overlay(s)
    $('.close').click(function () {
        $('.overlay').removeClass('flex');
    });

    $('#loginForm').bind('submit', function () {
        // Show iFrame
        $('#tpbProxy').show();
    });

    // Original Password-Reset code from "view-source:https://www.teamplanbuch.ch/passwort/" (slightly modified)
    $('#resetOverlay form').bind('submit', function (e) {
        e.preventDefault();
        send();
    });

    function send() {
        var email = document.getElementById('reset__email').value;
        
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function load() {
            if (this.status === 204)
                Beacon('show-message', '33682164-dd55-4ac1-b013-da891dbdfa08', { force: true, delay: 1 } );
            else
                Beacon('show-message', 'fd237a2e-48ca-4480-b697-9c50b2096d7c', { force: true, delay: 1 } );
        });
        xhr.open('POST', 'https://app.teamplanbuch.ch/api/recover');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({email: email}));

        // Close Overlay
        $('.close').click();
    }

    // Original Register code from teamplanbuch.ch (modified)
    var sending = false;
    $('#register form, #registerInline form').bind('submit', function (e) {
        e.preventDefault();

        // Hide 1st step
        $('#register').hide();
        
        // Show 2nd step
        $('#register2').show();

        if (!sending) {
            sending = true;
            $.ajax({
                type: "POST",
                url: $(this).attr('action'),
                data: $(this).serialize(),
                success: function (data) {
                    if (data['success'])
                        console.log('sucess');
                    else
                        alert(data['error']);
                    sending = false;
                },
                dataType: 'json',
                crossDomain: false,
                xhrFields: {
                    withCredentials: true
                }
            });
        }

        return false;
    });

    $('#register2 form').bind('submit', function (e) {
        e.preventDefault();

        if (!sending) {
            sending = true;
            $.ajax({
                type: "POST",
                url: $(this).attr('action'),
                data: $(this).serialize(),
                success: function (data) {
                    if (data == "1") {
                        console.log('Probeabo erfolgreich erstellt. Du kannst dich nun anmelden!');

                        // Fire success message
                        Beacon('show-message', 'd2682787-58df-4a42-8fe5-c7064d02c496', { force: true, delay: 1 });

                        // Transfer credentials (email)
                        $('#input__username').val( $('#input__email').val() );

                        // Open Login
                        $('#login').click();
                    }
                    else {
                        console.log('Ein Fehler bei der Erstellung des Probeabos ist aufgetreten!');

                        // Fire failure message
                        Beacon('show-message', '244f0dfc-3b51-4b26-ae07-06004c6ec4c7', { force: true, delay: 1 });
                    }
                },
                dataType: 'html',
                crossDomain: false,
                xhrFields: {
                    withCredentials: true
                }
            });
        }

        return false;
    });
});