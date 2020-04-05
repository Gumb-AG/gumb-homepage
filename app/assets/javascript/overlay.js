// Overlay logic

$(function () {

    // Login Overlay
    $('#login').click(function () {
        $('.overlay').removeClass('flex');
        $('#loginOverlay').addClass('flex');
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

    // Original Login & Register code from teamplanbuch.ch (modified)
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
                        Beacon('show-message', 'd2682787-58df-4a42-8fe5-c7064d02c496');

                        // Transfer credentials (email)
                        $('#input__username').val( $('#input__email').val() );

                        // Open Login
                        $('#login').click();
                    }
                    else {
                        console.log('Ein Fehler bei der Erstellung des Probeabos ist aufgetreten!');

                        // Fire failure message
                        Beacon('show-message', '244f0dfc-3b51-4b26-ae07-06004c6ec4c7');
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