/*
 * define collections
 */
Meteor.startup(function() {
    ActionsKidA = new Meteor.Collection("actionskida"); // argument is MongoDB actual collection's name
    ChatMessages = new Meteor.Collection("chatmessages");
});