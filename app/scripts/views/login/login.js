/*global Gig, Backbone, JST*/

GigAdmin.Views = GigAdmin.Views || {};

(function () {
    'use strict';

    GigAdmin.Views.LoginPage = Backbone.View.extend({
        template: JST['app/scripts/templates/login/login.ejs'],

        tagName: 'div',

        defaultView: '.email-sign-in',

        next: null,

        redirectTo: null,

        isRendered:false,

        className: 'hero-unit',

        events: {
            'click .sign-in-btn': 'login',

            'click .facebook-btn': 'fb_login',
            'click .google_btn': 'google_login',

            'click .show-sign-in': 'show_sign_in',

            'keydown input': 'text_change',

            'hidden.bs.modal #modal-item': 'hidden'
        },

        initialize: function () {
        },

        afterRender: function(){
            this.show_form(this.defaultView);
            this.$('#modal-item').modal('show');
        },



        hide: function(){
            this.$('#modal-item').modal('hide');
        },

        hidden: function(){
            this.next = null;
        },

        show_sign_in: function(e){
            e.preventDefault();
            this.show_form('.email-sign-in');
        },


        show_form: function(selector){
            $('.sign-up .has-error').removeClass('has-error');
            $('.sign-up').hide();
            $(selector).show();
        },

        close_login_form:function(){
            this.hide();
            Backbone.history.navigate("", { trigger : true });
        },

        dologin: function(data){
            var that = this;
            GigAdmin.session.login(data, {success: function(){
                $(".sign-in-form-container").removeClass('has-error');
                that.$('#modal-item').modal('hide');
                if(that.next) {
                    that.next();
                } else if(that.redirectTo != null) {
                    Backbone.history.navigate(that.redirectTo, { trigger : true });
                }
            },
                error: function(xhr, op)
                {
                    $('.sign-up .has-error').removeClass('has-error');
                    if (data.email) {
                        if (xhr.responseJSON && xhr.responseJSON.error) {
                            $(".sign-in-form-container .has-error--text").html(xhr.responseJSON.error);
                            $(".sign-in-form-container").addClass('has-error');
                        } else {
                            $(".sign-in-form-container .has-error--text").html("Something going wrong.");
                            $(".sign-in-form-container").addClass('has-error');
                        }
                    } else if (data.social_network == 'fb'){
                        var $fbFrom = $('.facebook-login-form');

                        if (xhr.responseJSON && xhr.responseJSON.error) {
                            $fbFrom.find('.has-error--text').html(xhr.responseJSON.error);
                            $fbFrom.addClass('has-error');
                        } else {
                            $fbFrom.find('.has-error--text').html("Something going wrong.");
                            $fbFrom.addClass('has-error');
                        }
                    } else if (data.social_network == 'g+') {
                        if (xhr.responseJSON && xhr.responseJSON.error) {
                            $(".gp-login-form .has-error--text").html(xhr.responseJSON.error);
                            $('.gp-login-form ').addClass('has-error');
                        } else {
                            $(".gp-login-form .has-error--text").html("Something going wrong.");
                            $('.gp-login-form ').addClass('has-error');
                        }
                    }
                }});

        },
        login: function(e){
            var that = this;
            e.preventDefault();

            if (! $('.sign-in-form-container form').valid()) {
                return;
            }
            var data = {
                type :"users",
                email: $('.sign-in-email').val().trim(),
                password: $('.sign-in-password').val()
                //_remember_me: $('#_remember_me').is(':checked')
            };

            this.dologin(data);
        },

        fb_login: function(e){
            var that = this;
            e.preventDefault();
            FB.login(function(response) {
                if (response.authResponse) {
                    var access_token = response.authResponse.accessToken; //get access token
                    var data = {'token': access_token, 'social_network':'fb'};
                    that.dologin(data)
                    //GigAdmin.session.loginFB({token:access_token});

                } else {
                    //user hit cancel button
                    console.log('User cancelled login or did not fully authorize.');

                }
            }, {
                scope:'public_profile,email,user_friends'
            });
        },

        google_login: function(e){
            var that = this;
            e.preventDefault();
            //TODO: show error message
            if (auth2.signIn) {
                auth2.signIn().then(function (googleUser) {
                    var id_token = googleUser.getAuthResponse().id_token +"|@@@|"+ googleUser.getAuthResponse().access_token;
                    var data = {'token': id_token, 'social_network': 'g+'};
                    that.dologin(data)
                }, function () {

                });
            }
        },
        
        text_change: function(){
            $('.sing-up-holder .has-error--text').html('');
        }

    });

})();
