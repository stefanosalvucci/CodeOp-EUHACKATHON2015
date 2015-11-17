Meteor.startup(function() {

    // publish collections
    Meteor.publish('ChatMessages', function(){
        return ChatMessages.find();
    });

    Meteor.publish('Actions', function(){
        return Actions.find();
    });

    Meteor.publish('CallTrace', function(){
        return CallTrace.find();
    });

    // reset collections
    if (Meteor.isServer) {
        ChatMessages.remove({});
        Actions.remove({});
        CallTrace.remove({});
    }
});