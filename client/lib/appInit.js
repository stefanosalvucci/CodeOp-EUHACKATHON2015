Meteor.startup(function(){
    // client-independent init code
    Template.registerHelper("equals", function (a,b){
        return a==b;
    });

    // some other code
    var debugMode = 1; // 0 = false, 1 = true
    Session.set('debugMode', (debugMode == 1));
});