Template.enterAs.events({
    "click .player": function(evt){
        evt.preventDefault();
        var playerName = $("[name=playerName]").val(),
            // playRole: 'alice' = player, 'bob' = player who reviews the code thereafter
            playerRole = evt.target.getAttribute('data-role'),
            routeName = (playerRole == 'alice' ? 'aStart' : 'bStart');

        // create user by real name, unless it already exists
        Meteor.call('playerExists', playerName, function(error, result){
            // set session vars to be used in other views
            Session.set('playerName', playerName);
            Session.set('playerRole', playerRole);

            if (result){
                Session.set('returningPlayer', true);
                Router.go(routeName);
            } else {
                lg("create new user");
                Meteor.call('createPlayer', playerName, playerRole, function (error, result) {
                    if (result) {
                        // newly create user id
                        lg(result);
                        Router.go(routeName);
                    }

                    if (error){
                        lg(error);
                        // show error
                        $('#modalUsernameNotSet').openModal();
                    }
                });
                Session.set('returningPlayer', false);
            }
        });
    }
});