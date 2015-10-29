Meteor.methods({
    'pushActionsToClientB': function(actionsArray){
        lg("Actions being pushed:");
        lg(actionsArray);

        // clean up collection
        lg('reset');
        ActionsKidA.remove({});

        actionsArray.forEach(function(value, key, thisArray){
            ActionsKidA.insert({action_name: value});
        });
        return "ok_insert";
    },
    'pullActionsFromClientA': function(){ // from client A to B
        return false; // TODO: remove
        // TODO
    }
});