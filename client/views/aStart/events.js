Template.aStart.events({
    "click #send-sample-data": function () {

        Meteor.call('pushActionsToClientB', actions, function(error, result){
           if (result){
                lg(result);
               Session.set('sendStatus','SENT');
           } else { // error
                lg (error);
               Session.set('sentStatus','ERROR');
           }
        });
    }
});

Template.aStart.onRendered(function(){
   Session.set('sendStatus', "NOT_SENT");
   lg(Session.get('sendStatus'));

   initClientA();
});