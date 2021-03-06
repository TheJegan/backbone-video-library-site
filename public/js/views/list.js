/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'compiled_templates'
], function ($, _, Backbone, Templates) {
    var ListView = Backbone.View.extend({
        el: '#video-body',
        template: Templates['list-video.hbs'],
        events: {
            'click #next': 'next'
        },
        initialize: function() {
            this.Page = 1;
            this.Limit = 10;

            if(this.model){
                this.model.fetch({
                    data: {
                        page: this.Page,
                        limit: this.Limit
                    }
                });

                this.listenTo(this.model, 'add', this.render);
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'reset', this.render);                
            }
            this.render();
        },
        next: function(e) {
            this.Page += 1;

            this.model.fetch({
                data: {
                    page: this.Page,
                    limit: this.Limit
                }
            });
        },
        render: function() {
            var self = this;
            var videos = this.model.toJSON();

            $(this.el).html(this.template({
                videos: videos,
                limit: self.Page
            }));
        },
        renderSearch: function() {            
            var omdb = []; 

            _.each(app.OMDB.toJSON(), function(data) {
                    omdb.push({cover: data.Poster});
                });

            $(this.el).html(
                this.template({videos: omdb})
            );
        },
        close: function() {
            $(this.el).undelegate('#AddVid', 'click');
            
            this.stopListening(this.model);
        }

    });

    return ListView;
});