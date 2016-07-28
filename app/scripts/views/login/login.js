/*global Gig, Backbone, JST*/

GigAdmin.Views = GigAdmin.Views || {};

(function () {
    'use strict';

    GigAdmin.Views.LoginPage = GigAdmin.Views.ModalLogin.extend({
        //
        //el: '.gig-main',

        template: JST['app/scripts/templates/login/login.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        afterRender: function(){
            this.show_form(this.defaultView);
        }

    });

})();
