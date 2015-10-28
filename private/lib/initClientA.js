Meteor.startup(function() {
    var initClientA = function(){
        // sample data
        var sampleActions = new Array();

        for (var i=0; i<10; i++){
            sampleActions[i] = "action " + i+1;
        }

        window.sampleActions = sampleActions;

        /*
         * load game
         */
        // TODO

        /*
         * load env variables
         */
        // TODO

        // ....
    };
});