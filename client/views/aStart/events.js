Template.aStart.events({
});

Template.aStart.onRendered(function(){
   Session.set('sendStatus', "NOT_SENT");

   initClientA();

    // test
    // Meteor.setTimeout(function(){ lg('trigger'); $("#send-sample-data").trigger('click'); }, 5000);
});
