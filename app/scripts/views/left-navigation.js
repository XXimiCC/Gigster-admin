/*global GigAdmin, Backbone, JST*/

GigAdmin.Views = GigAdmin.Views || {};

(function () {
    'use strict';

    GigAdmin.Views.LeftNavigation = Backbone.View.extend({

        template: JST['app/scripts/templates/left-navigation.ejs'],

        tagName: 'aside',

        id: '',

        className: 'navbar',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
