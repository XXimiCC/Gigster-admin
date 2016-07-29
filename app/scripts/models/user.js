/*global Gig, Backbone*/

GigAdmin.Models = GigAdmin.Models || {};

(function () {
    'use strict';

    GigAdmin.Models.User = GigAdmin.Models.BaseModel.extend({

        urlRoot: '/users',

        // url: '',

        // initialize: function() {
        // },

        defaults: {
            type: 'users',
            role: 'user'
        },

        // validate: function(attrs, options) {
        // },

        // parse: function(response, options)  {
        //     return response;
        // }
    });

})();
