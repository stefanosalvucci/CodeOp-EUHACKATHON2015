Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'common'
});

// define routes

Router.route('/cA_start', {
    name:'cA_start',
    template:'cA_start'/*,
    waitOn: function(){
        return Meteor.subscribe('ActionsKidA'); // TODO: complete
    }*/
});

Router.route('/cB_start', {
    name:'cB_start',
    template:'cB_start'
});