/*global GigAdmin, Backbone, JST*/

GigAdmin.Views = GigAdmin.Views || {};

(function () {
    'use strict';

    GigAdmin.Views.TopNavigation = Backbone.View.extend({

        template: JST['app/scripts/templates/top-navigation.ejs'],

        tagName: 'div',

        id: '',

        className: 'nav_menu',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
