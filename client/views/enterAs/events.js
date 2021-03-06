Template.enterAs.events({
    "click .player": function(evt){
        evt.preventDefault();
        var playerName = $("#playerName").val(),
        // playRole: 'alice' = player, 'bob' = player who reviews the code thereafter
            playerRole = evt.target.dataset.role, // $($('.player')[0]).data('role')
            routeName = (playerRole == 'alice' ? 'aStart' : 'bStart');

        lg('a >>' + playerName);
        lg('b >>' + playerRole);
        lg('c >>' + routeName);

        lg(playerName.trim());
        lg(typeof playerName);

        if (typeof playerName === 'undefined' || playerName.trim() == ''){
            $("#modalUsernameNotSet").openModal();
        } else {
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
                        }
                    });
                    Session.set('returningPlayer', false);
                }
            });
        }
    }
});