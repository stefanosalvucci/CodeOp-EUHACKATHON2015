Template.chat.helpers({
    'chatMessages': function(){
        lg(ChatMessages.find().fetch());
        return ChatMessages.find({}, {sort: {sentAt: -1}}).fetch();
    }
});