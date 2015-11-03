Template.commonTemplate.onCreated(function(){
   // login if not logged in
    if (Meteor.userId() == null){
        Meteor.loginWithPassword(Session.get('playerName'), 'no_password', function(error){
            if (error){
                throw new Meteor.Error('invalid-user', "User doesn't exist");
            }
        });
    } else {
        lg("user already logged in");
    }
});