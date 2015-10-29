lg  = function(message, logType){
        console.log(message);

    };

// make functions global on client
if (Meteor.isClient){window.lg = lg;}