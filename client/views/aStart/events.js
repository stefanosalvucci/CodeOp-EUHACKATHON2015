Template.aStart.events({
    "click #send-data": function (evt) {
        evt.preventDefault();

        var dataToSend = Session.get('planList');

        Meteor.call('pushActionsToClientB', dataToSend, function(error, result){
           if (result){
                lg(result);
               Session.set('sendStatus','SENT');
           } else { // error
                lg (error);
               Session.set('sendStatus','ERROR');
           }
        });
    }
});

Template.aStart.onRendered(function(){
   Session.set('sendStatus', "NOT_SENT");

   initClientA();

    // test
    // Meteor.setTimeout(function(){ lg('trigger'); $("#send-sample-data").trigger('click'); }, 5000);
});
