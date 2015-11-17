Meteor.methods({
    'pushActionsToClientB': function(actionsArray){
        lg("Actions being pushed:");
        lg(actionsArray);

        // clean up collection
        ActionsKidA.remove({});

        actionsArray.forEach(function(value, key, thisArray){
            ActionsKidA.insert({action_name: value});
        });

        return "ok_insert";
    },
    'createPlayer': function(username, role){
        check(username, String);
        check(role, String);

        lg(username);

        return Accounts.createUser({
            username: username,
            password: 'no_password', // needed for login itself
            profile: {
                role: role
            }
        });
    },
    'playerExists': function(username){
        check(username, String);

        var userId = Meteor.users.findOne({"username": username});

        return userId;
    },
    'sendNewMessage': function(newMessage, playerName, playerRole){
        check(newMessage, String);
        check(playerName, String);
        check(playerRole, String);

        lg(newMessage);

        return ChatMessages.insert({
            username: playerName,
            role: playerRole,
            message:newMessage,
            sentAt: Date.now()
        });
    }
});