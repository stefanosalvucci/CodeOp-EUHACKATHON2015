// publish collections
Meteor.publish('ActionsKidA', function(){
    return ActionsKidA.find();
});