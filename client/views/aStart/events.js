Template.aStart.events({
    "click #send-sample-data": function (evt) {
        evt.preventDefault();

        Meteor.call('pushActionsToClientB', sampleActions, function(error, result){
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

Template.aStart.onCreated(function(){
    // sample data
    var sampleActions = new Array();

    for (var i=0; i<10; i++){
        sampleActions[i] = "action " + i+1;
    }

    window.sampleActions = sampleActions;
});

Template.aStart.onRendered(function(){
   Session.set('sendStatus', "NOT_SENT");

   initClientA();

    // test
    Meteor.setTimeout(function(){ lg('trigger'); $("#send-sample-data").trigger('click'); }, 5000);
});