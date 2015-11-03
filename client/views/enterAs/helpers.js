Template.enterAs.helpers({
   'defaultName': function(){
       return Session.get('debugMode') ? 'Manuel' : '';
   }
});