Template.cA_start.helpers({
    "sendStatus": function(){
        return Session.get('sendStatus') || "";
    },
    "sampleActions": function(){
        return window.sampleActions;
    },
    "test": function(){
        return "qbcde";
    }
});