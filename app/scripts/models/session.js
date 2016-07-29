/*global Gig, Backbone*/

GigAdmin.Models = GigAdmin.Models || {};

(function () {
    'use strict';

    GigAdmin.Models.Session = GigAdmin.Models.BaseModel.extend({

        url: '',

        initialize: function() {
            this.redirectFrom = "";
            if(this.authenticated()){
                
                Backbone.Events.trigger("changeuser");
            }
        },

        defaults: {
            session: null,
            redirectFrom: ""
        },

        currentUser : {},

        validate: function(attrs, options) {
        },

        authenticated: function(){
            //if($.cookie('session') != null){
            if(localStorage.getItem('token') != null){
                if($.isEmptyObject(this.currentUser)){
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));   
                    this.session     = localStorage.getItem('token');
                }

                return true;
            }

            return false;    
        },

        login: function(data, options){
            var that = this;

            var user = new GigAdmin.Models.User();
            user.urlRoot = "/user/login";

            user.save(data,{
                success:function (model, response, op) {
                    if (model.get('role') != 'admin') {
                        options.error({
                            responseJSON: {
                                error: 'Access is denied'
                            }
                        }, op);
                        return ;
                    }


                    GigAdmin.Models.Session.checkLSAvailable();
                    
                    that.session = model.get('session');
                    
                    GigAdmin.Models.Session.setCurrentUser(model);
                    localStorage.setItem('token', model.get('session'));

                    //TODO: use correct object to fire event
                    Backbone.Events.trigger("changeuser");
                    if(options && options.success) {
                        options.success();
                    }
                },
                error: function(model, xhr, op){
                    if(options && options.error) {
                        options.error(xhr, op);
                    }
                }
            });
        },

        logout: function() {
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');

            GigAdmin.session.session = null;
            GigAdmin.session.currentUser = {};
            
            Backbone.Events.trigger("changeuser");
        }

    },

    {
        //static methods
        setCurrentUser: function(model) {
            var mJSON = model.toJSON();

            GigAdmin.session.currentUser = {
                id:   mJSON.id,
                name: mJSON.name,
                role: mJSON.role,
                avatar_url: mJSON.profile.avatar_url
            };

            localStorage.setItem('currentUser', JSON.stringify(GigAdmin.session.currentUser));
        },

        clearCurrentUser: function(){
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            GigAdmin.session.currentUser = {};
            GigAdmin.session.session = '';
        },

        checkLSAvailable: function() {
            var uid = new Date;
            try {
                localStorage.setItem(uid, uid);
                localStorage.removeItem(uid);
            } catch (ex) {
                GigAdmin.notification('danger', "your browser doesn't support local storage", false);
            }
        },
    }
    
    );

})();
