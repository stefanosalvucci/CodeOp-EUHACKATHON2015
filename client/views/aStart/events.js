Template.aStart.events({
    "click #send-data": function (evt) {
        evt.preventDefault();

        var dataToSend = Session.get('actionsToSend');

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

Template.aStart.onCreated(function(){ // before rendered
    // sample data
    /*var sampleActions = new Array();

    for (var i=0; i<10; i++){
        sampleActions[i] = "action " + (i+1) + "_" + Math.random();
    }

    window.sampleActions = sampleActions;*/


    // call view port engine
    initViewportEngine();
});

Template.aStart.onRendered(function(){
   Session.set('sendStatus', "NOT_SENT");

   initClientA();

    // test
    // Meteor.setTimeout(function(){ lg('trigger'); $("#send-sample-data").trigger('click'); }, 5000);
});
