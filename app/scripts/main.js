/*global GigAdmin, $*/
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    'use strict';
    options.url = GigAdmin.ConfigHandler.getValue('apiurl') + options.url;
    options.crossDomain = {
        crossDomain: true
    };
});

window.GigAdmin = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        Backbone.Layout.configure({
            manage: true
        });

        this.session = new GigAdmin.Models.Session();
        this.Router = new GigAdmin.Routers.Application();

        this.Layout = new Backbone.Layout({
            el: '.gig-main',
            views: {
                '.nav-container': new GigAdmin.Views.LeftNavigation(),
                '.top_nav': new GigAdmin.Views.TopNavigation(),
                '.content': new GigAdmin.Views.Content(),
            }
        });

        this.Layout.render();


        Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    GigAdmin.init();
});
