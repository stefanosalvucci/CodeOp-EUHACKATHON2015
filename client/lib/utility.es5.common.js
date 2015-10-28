Meteor.startup(function() {
    var lg  = function(message, logType){
        console.log(message);

    };

    // make functions global
    window.lg = lg;

});