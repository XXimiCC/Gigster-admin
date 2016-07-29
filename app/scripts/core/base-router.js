/*global GigAdmin, Backbone*/

GigAdmin.Routers = GigAdmin.Routers || {};

(function () {
    'use strict';

    GigAdmin.Routers.BaseRouter = Backbone.Router.extend({
        before: function () {
        },

        after: function () {
        },

        route: function (route, name, callback) {
            var realRoute = route,
                router = this;

            if (!_.isRegExp(route)) {
                route = this._routeToRegExp(route);
            }
            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if (!callback) {
                callback = this[name];
            }

            Backbone.history.route(route, function (fragment) {
                var args = router._extractParameters(route, fragment),
                    next = function () {
                        callback && callback.apply(router, args);
                        router.trigger.apply(router, ['route:' + name].concat(args));
                        router.trigger('route', name, args);
                        Backbone.history.trigger('route', router, name, args);
                        router.after.apply(router, args);
                    };

                router.before.apply(router, [realRoute, args, next]);
            });

            return this;
        }
    });
})();
