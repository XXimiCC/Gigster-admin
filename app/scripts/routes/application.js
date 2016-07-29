/*global GigAdmin, Backbone*/

GigAdmin.Routers = GigAdmin.Routers || {};

(function () {
    'use strict';

    GigAdmin.Routers.Application = GigAdmin.Routers.BaseRouter.extend({
        routes: {
            '': 'index',
            'login': 'login',
            '*all': 'all'
        },

        before : function(fragment, params, next){
            var isAuth = GigAdmin.session.authenticated(),
                path = Backbone.history.location.hash,
                isLoginPage = fragment === 'login';

            if (!isAuth && !isLoginPage) {
                GigAdmin.session.redirectFrom = path;
                Backbone.history.navigate('login', { trigger : true });

                return false;
            } else if (isAuth && isLoginPage) {
                Backbone.history.navigate('/', { trigger : true });

                return false;
            }

            return next();
        },

        after : function(){
        },

        index: function () {
            GigAdmin.Layout.setView('.wrapper .container', new GigAdmin.Views.Dashboard()).render();
        },

        login: function () {
            GigAdmin.Layout.setView('.wrapper .container', new GigAdmin.Views.LoginPage({redirectTo: GigAdmin.session.redirectFrom})).render();
        },

        all: function () {
            console.log("All");
        },

        _getRouteUrl: function(route, args){
            var url = '',
                routes = {};

            _.each(GigAdmin.Routers, function (router) {
                _.extend(routes, router.prototype.routes);
            });

            _.each(routes, function (routeHandlerName, routePattern) {
                if (routeHandlerName === route) {
                    url = routePattern;
                }
            });


            if(typeof args == 'undefined' || args == null){
                return url;
            }

            var routeRe = Backbone.Router.prototype._routeToRegExp(url),
                argNames = Backbone.Router.prototype._extractParameters(routeRe, url),
                namedArgs = {};


            for (var i in argNames) {
                if(argNames[i] != null){
                    if(argNames[i] == '*queryString'){
                        if(args.hasOwnProperty('*queryString') &&  args['*queryString']){
                            namedArgs[argNames[i]] = args['*queryString'];
                        } else {
                            namedArgs['?'+argNames[i]] = '';
                        }
                    } else if(args.hasOwnProperty(argNames[i])) {
                        namedArgs[argNames[i]] = args[argNames[i]];
                    }
                    else {
                        namedArgs[argNames[i]] = args;
                    }
                }
            }

            for (var argName in namedArgs) {
                var arg = namedArgs[argName];
                url = url.replace(argName, arg);
            }

            //remove last slash
            url = url.replace(/\/$/, '');

            return url;
        }
    });

})();
