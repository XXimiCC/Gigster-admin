var auth2 = {};

function initGooglePlus() {
    gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
            client_id: GigAdmin.ConfigHandler.getValue('google_key'),
            scope: "email https://www.googleapis.com/auth/contacts.readonly"
        })
    });
}
