Meteor.startup(function(){
    Template.registerHelper("equals", function (a,b){
        return a==b;
    })
});