Template.chat.helpers({
    'chatMessages': function(){
        return ChatMessages.find({}, {sort: {sentAt: -1}}).fetch();
    }
});