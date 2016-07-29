/*global Gig, Backbone*/

GigAdmin.Models = GigAdmin.Models || {};

(function () {
    'use strict';
    var getErrorWrapper = function (error){
        return function(model, resp) {
            if (error) error(model, resp);
            else GigAdmin.trigger('api:error', resp);
        };
    };

    GigAdmin.Models.BaseModel = Backbone.Model.extend({
        fetch: function(options){
            options = options ? _.clone(options) : {};
            var error = options.error;
            options.error = getErrorWrapper(error);

            return Backbone.Model.prototype.fetch.apply(this, [options]);
        },
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            var error = options.error;
            options.error = getErrorWrapper(error);

            return Backbone.Model.prototype.destroy.apply(this, [options]);
        },
        save: function(key, val, options) {

            // Handle both `"key", value` and `{key: value}` -style arguments.
            var attrs;
            if (key == null || typeof key === 'object') {
                val =  val ? _.clone( val) : {};
                var error =  val.error;
                val.error = getErrorWrapper(error);
                return Backbone.Model.prototype.save.apply(this, [key, val, options]);
            } else {
                options = options ? _.clone(options) : {};
                var error = options.error;
                options.error = getErrorWrapper(error);
                return Backbone.Model.prototype.save.apply(this, [key, val, options]);
            }
        }
    });


    GigAdmin.Models.BaseRelationalModel = Backbone.RelationalModel.extend({
        fetch: function(options){
            options = options ? _.clone(options) : {};
            var error = options.error;
            options.error = getErrorWrapper(error);

            return Backbone.RelationalModel.prototype.fetch.apply(this, [options]);
        },
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            var error = options.error;
            options.error = getErrorWrapper(error);

            return Backbone.RelationalModel.prototype.destroy.apply(this, [options]);
        },
        save: function(key, val, options) {

            // Handle both `"key", value` and `{key: value}` -style arguments.
            var attrs;
            if (key == null || typeof key === 'object') {
                val =  val ? _.clone( val) : {};
                var error =  val.error;
                val.error = getErrorWrapper(error);
                return Backbone.RelationalModel.prototype.save.apply(this, [key, val, options]);
            } else {
                options = options ? _.clone(options) : {};
                var error = options.error;
                options.error = getErrorWrapper(error);
                return Backbone.RelationalModel.prototype.save.apply(this, [key, val, options]);
            }
        }
    });

    GigAdmin.Models.BaseCollection = Backbone.Collection.extend({       

        setParams: function(options) {
            $.extend(this, options);
        },

        getExtraParams: function() {
            return {};
        },

        model:GigAdmin.Models.BaseModel,

        fetch: function(options){
            options = options ? _.clone(options) : {};
            var error = options.error;
            options.error = getErrorWrapper(error);

            this.trigger('fetch', this);

            return Backbone.Collection.prototype.fetch.apply(this, [options]);
        },

        parse: function(response){
            if(response.total) {
                this.pagination.total = response.total;
                this.pagination.pages = Math.ceil(this.pagination.total / this.pagination.perPage);
            }
            if(response.items){
                return response.items;
            }   
        },

        urlPagination: function(url){
            var paginationParams = {offset: this.pagination.offset, limit: this.pagination.perPage};

            if(this.pagination.page >= 1 ) {
                url += '?' + $.param($.extend(paginationParams, this.getExtraParams()));
            }
            
            return url;
        },

        initPagination: function(options) {
            this.pagination = _.extend({
                page: 1,
                perPage: 10,
                total: 0,
                pages: 0,
                offset: 0}, options);

            if(options && options.page) {
                this.pagination.page = parseInt(options.page);
            } else {
                this.pagination.page = 1;
            }

            this._calcOffset();
        },

        prevPage: function() {
            this.pagination.page--;
            this._calcOffset();

            return this.fetch();            
        },

        nextPage: function() {
            this.pagination.page++;
            this._calcOffset();
            
            return this.fetch();
        },

        goPage: function(page) {
            this.pagination.page = parseInt(page); 
            this._calcOffset();

            return this.fetch();
        },

        _calcOffset: function() {
            this.pagination.offset = (this.pagination.page - 1) * this.pagination.perPage;    
        }
    });

})();
