/*
 * define collections
 */
Meteor.startup(function() {
    Actions = new Meteor.Collection("actions"); // argument is MongoDB actual collection's name
    CallTrace = new Meteor.Collection("calltrace");
    ChatMessages = new Meteor.Collection("chatmessages");
});