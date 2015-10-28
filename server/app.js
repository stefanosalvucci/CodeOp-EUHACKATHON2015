Meteor.startup(function() {
    // publish collections
    Meteor.publish('ActionsKidA', function(){
        return ActionsKidA.find();
    });

});