Template.commonTemplate.helpers({
    'loggedIn': function(){
        return Meteor.userId() != null;
    },
   'returningPlayer': function(){
       return Session.get('returningPlayer');
   },
    'playerName': function(){
        return Session.get('playerName');
    }
});