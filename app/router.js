define([
    "app",

    "modules/surface",
    "modules/story",
    "modules/marker",
    "modules/intro"
],

function( App, Surface, Story, Marker, Intro ) {
    var Router;

    // If this is the first visit, there will be no record of any
    // prior visits. For this visit, set "isFirst" to |true|.
    // Subsequent visits will see a valid "isFirst" record and will
    // therefore be set to false.
    // Session.set(
    //     "isFirst", Session.get("isFirst") === undefined ? true : false
    // );

    //window.Session = Session;

    Router = Backbone.Router.extend({
        initialize: function() {

            App.useLayout("main").setViews({
                // 1. Introductory Video (Pg.2)
                // Setup the introductory video, which displays
                // conditionally (first visit)

                // Or...

                // 1. Surfaces (Pg.3)
                // Surface Parameters:           domId, lat, lng, zoom
                 "#surface-la": new Surface.MainView( ),
                 "#surface-mx": new Surface.OriginView( )



                // 2. Instructions overlay (Pg.3)
                //
                //  See also: this.intro() & this.index()
                //
                //
                // 3. Navigation (Pg.4)
                //
                // 4. Markers (Pg.4)
                //
                //      http://alpha.zeega.org/api/items/73916/items
                //
                //      A. Clicking on a Marker will load a story by initializing a
                //          Zeega.Player with a URL:
                //
                //          eg. http://alpha.zeega.org/api/items/71690
                //
                //      B.
                //
                // 5. KCRW News, Features (Pg.4)
                //
                //
                //
                //
                //
                //
                //
                //
                //
                // Additional views here, not specifically these,
                // a placeholder only.
                //
                // ".stories": ...views from collection
                // ".contributors": ...views from collection
                // ""...

            }).render();
        },

        routes: {
            "": "index",
            "story/:id": "story"
            // routes to view specific story via URL
        },


        index: function() {

            $("body").scroll(function(){
                return false;
            });

            var introView = new Intro.View();
            $("body").append(introView.el);
            introView.render();

             console.log(introView.el);
        },

        story: function( id ){
            _.delay(function(){
                $(".ZEEGA-player").remove();
                var player = new Zeega.player({
                    controls: {
                        arrows: true,
                        playpause: true,
                        close: false
                    },
                    autoplay: true,
                    // data: story.attributes,
                
                    //
                    target: "#zeega-player",
                    //
                    //  TODO: Investigate why passing previously requested data
                    //  doesn't work.
                    url: localStorage.api + "/items/"+id
                });

                // we have to do this because the story collection may or may not be loaded
                player.on("sequence_enter", function(info) {
                    $(".player-title").text( player.project.get( "title" ) );

                    $(".share-twitter").attr("href", "https://twitter.com/intent/tweet?original_referer=http://sonictrace.org/%23story/" + id + "&text=Sonic%20Trace%3A%20" + player.project.get( "title" ) + "&url=http://sonictrace.org/%23story/" + id );
                    $(".share-fb").attr("href", "http://www.facebook.com/sharer.php?u=http://sonictrace.org/%23story/" + id );
                    $(".share-email").attr("href", "mailto:friend@example.com?subject=Check out this story on Sonic Trace!&body=http://sonictrace.org/%23story/" + id );
                });
                // TODO: Figure out how to get title
                $(".surface-player").addClass("center");
            },1000);
            
        },

        intro: function() {
            // render the intro view
            console.log( "Render the intro view" );
        }
    });

    
    // Required, return the module for AMD compliance.
    return Router;
});
