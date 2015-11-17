Meteor.startup(function() {

    // publish collections
    Meteor.publish('ActionsKidA', function(){
        return ActionsKidA.find();
    });

    Meteor.publish('ChatMessages', function(){
        return ChatMessages.find();
    });

    // reset chat history
    if (Meteor.isServer) {ChatMessages.remove({});}
});