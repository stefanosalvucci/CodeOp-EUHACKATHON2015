Meteor.startup(function(){
    // client-independent init code
    Template.registerHelper("equals", function (a,b){
        return a==b;
    })
});