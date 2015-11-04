Template.chat.events({
    "submit .chat": function(evt){
        evt.preventDefault();
        var newMessage = $("[name=playerName]").val(),
        // playRole: 'alice' = player, 'bob' = player who reviews the code thereafter
            playerName = Session.get('playerName'),
            playerRole = Session.get('playerRole');

        // create user by real name, unless it already exists
        Meteor.call('sendNewMessage', newMessage, playerName, playerRole, function(error, result){
            if (result){ lg (result); }
            if (error){ lg (error); }
        });
    }
});