/*global Gig, Backbone, JST*/

GigAdmin.Views = GigAdmin.Views || {};

(function () {
    'use strict';

    GigAdmin.Views.ResetPasswordPage = Backbone.View.extend({
        template: JST['app/scripts/templates/login/set-new-password.ejs'],

        tagName: 'div',

        id: '',

        key: '',

        user_id:'',

        className: '',

        events: {
            'click .update-password': 'update_password'
        },

        initialize: function () {
        },

        afterRender: function(){
            $('.set-new-password-container form').validate({
                rules: {
                    password_confirm: {
                        equalTo: "#password"
                    }
                }
            });
        },


        update_password: function(e){
            var that = this;
            e.preventDefault();

            if (! $('.set-new-password-container form').valid()) {
                return;
            }

            var new_pass = $('.new-password').val();
            var data = {
                type :"users",
                password: new_pass,
                token: this.key,
                id: this.user_id
                //_remember_me: $('#_remember_me').is(':checked')
            };

            var user = new GigAdmin.Models.User();
            user.url = "/user/resetpass";
            user.save(data, {
                success: function (model) {
                    $(".set-new-password-container").removeClass('has-error');
                    GigAdmin.session.redirectFrom = GigAdmin.Router._getRouteUrl('mylocations', {':tab': 'active', ':page': 1});
                    Backbone.history.navigate(GigAdmin.Router._getRouteUrl('login',null), { trigger : true });
                },
                error: function (model, xhr, options) {
                    //TODO: show correct error message
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        $(".set-new-password-container .has-error--text").html(xhr.responseJSON.error);
                    } else {
                        $(".set-new-password-container .has-error--text").html("Something going wrong.");
                    }
                    $(".set-new-password-container").addClass('has-error');
                }
            })
        }

    });

})();
