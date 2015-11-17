Template.chat.events({
    "submit .chat": function(evt){
        evt.preventDefault();
        var newMessage = $("#new-message").val(),
        // playRole: 'alice' = player, 'bob' = player who reviews the code thereafter
            playerName = Session.get('playerName'),
            playerRole = Session.get('playerRole');

        lg(newMessage);

        // create user by real name, unless it already exists
        Meteor.call('sendNewMessage', newMessage, playerName, playerRole, function(error, result){
            if (result){ lg (result); $("#new-message").val(''); }
            if (error){ lg (error); }
        });
    }
});