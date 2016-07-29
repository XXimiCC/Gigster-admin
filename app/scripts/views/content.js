/*global GigAdmin, Backbone, JST*/

GigAdmin.Views = GigAdmin.Views || {};

(function () {
    'use strict';

    GigAdmin.Views.Content = Backbone.View.extend({

        template: JST['app/scripts/templates/content.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
