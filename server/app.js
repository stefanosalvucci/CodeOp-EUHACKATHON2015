Meteor.startup(function() {

    // publish collections
    Meteor.publish('ActionsKidA', function(){
        return ActionsKidA.find();
    });

    // reset chat history
    if (Meteor.isServer) {ChatMessages.remove({});}
});