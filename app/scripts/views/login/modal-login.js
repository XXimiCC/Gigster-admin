/*global Gig, Backbone, JST*/

GigAdmin.Views = GigAdmin.Views || {};

(function () {
    'use strict';

    GigAdmin.Views.ModalLogin = Backbone.View.extend({
        template: JST['app/scripts/templates/login/modal-login.ejs'],

        tagName: 'div',

        id: 'modal-block',

        defaultView: '.email-sign-in',

        next: null,

        redirectTo: null,

        isRendered:false,

        className: 'hero-unit',

        events: {
            'click .sign-in-btn': 'login',
            'click .sign-up-btn': 'register',
            'click .forgot-pass-btn': 'forgot',
            'click .reset-password-email-sent': 'close_login_form',

            'click .facebook-btn': 'fb_login',
            'click .google_btn': 'google_login',

            'click .show-sign-in': 'show_sign_in',
            'click .show-email-sign-up': 'show_sign_up',
            'click .show-sign-up': 'show_sign_up',
            'click .show-forgot-form': 'show_forgot',

            'keydown input': 'text_change',

            'hidden.bs.modal #modal-item': 'hidden'
        },

        initialize: function () {
        },

        afterRender: function(){
            this.show_form(this.defaultView);
            this.$('#modal-item').modal('show');
        },

        show: function(is_sign_up){
            if(!this.isRendered){
                if(is_sign_up) {
                    this.defaultView = '.sign-in-start-form';
                }
                GigAdmin.Layout.insertView('.modal-windows', GigAdmin.LoginView).render();
                this.isRendered = true;
            } else {
                if(is_sign_up) {
                    this.show_form('.sign-in-start-form');
                } else {
                    this.show_form('.email-sign-in');
                }
                this.$('#modal-item').modal('show');
            }
        },

        showForgot: function(is_sign_up){
            var that = this;
            if(!this.isRendered){
                GigAdmin.Layout.insertView('.modal-windows', GigAdmin.LoginView).render().promise().done(function(v){
                    that.show_form('.request-new-password');
                });
                this.isRendered = true;
            } else {
                that.show_form('.request-new-password');
                this.$('#modal-item').modal('show');
            }
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

        show_sign_up: function(e) {
            e.preventDefault();
            this.show_form('.email-sign-up');
        },

        show_forgot:  function(e) {
            e.preventDefault();
            this.show_form('.request-new-password');
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
                        if (xhr.responseJSON && xhr.responseJSON.error) {
                            $(".facebook-login-form .has-error--text").html(xhr.responseJSON.error);
                            $('.facebook-login-form ').addClass('has-error');
                        } else {
                            $(".facebook-login-form .has-error--text").html("Something going wrong.");
                            $('.facebook-login-form ').addClass('has-error');
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
        register: function(e){
            var that = this;
            e.preventDefault();
            if (! $('.sign-up-form-container form').valid()) {
                return;
            }
            var data = {
                email: $('.sign-up-email').val().trim(),
                password: $('.sign-up-password').val()
            };

            var user = new GigAdmin.Models.User();
            user.save(data,{
                success: function(model){
                    $(".sign-up-form-container").removeClass('has-error');
                    that.dologin(data);
                },
                error:function(model, xhr, options){
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        $(".sign-up-form-container .has-error--text").html(xhr.responseJSON.error);
                    } else {
                        $(".sign-up-form-container .has-error--text").html("Something going wrong.");
                    }
                    $(".sign-up-form-container").addClass('has-error');
                }
            });
        },
        forgot: function(e){
            var that = this;
            e.preventDefault();

            if (! $('.sign-up-form-container form').valid()) {
                return;
            }

            var data = {
                email: $('.request-newpassword-email').val().trim()
                //password: $('.login-password').val()
            };

            var user = new GigAdmin.Models.User();
            user.urlRoot = "/user/forgotpass";


            user.save(data,{
                success: function(model){
                    $('.user-email-confirmation-message').html(data.email);
                    that.show_form('.reset-email-sent');
                },
                error:function(model, xhr, options){
                    //TODO: show correct error message
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        $(".request-new-password-form-container .has-error--text").html(xhr.responseJSON.error);
                    } else {
                        $(".request-new-password-form-container .has-error--text").html("Something going wrong.");
                    }
                    $(".request-new-password-form-container").addClass('has-error');
                }
            });
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
