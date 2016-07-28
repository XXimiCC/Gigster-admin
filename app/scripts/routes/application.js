/*global GigAdmin, Backbone*/

GigAdmin.Routers = GigAdmin.Routers || {};

(function () {
    'use strict';

    GigAdmin.Routers.Application = Backbone.Router.extend({
        routes: {
            '': 'index',
            'login': 'login',
            '*all': 'all'
        },

        index: function () {
            GigAdmin.Layout.setView('.wrapper .container', new GigAdmin.Views.LoginPage({redirectTo: ''})).render();
        },

        login: function () {
            console.log("Login");
        },

        all: function () {
            console.log("All");
        },
        _getRouteUrl: function () {
            return '/';
        }
    });

})();
