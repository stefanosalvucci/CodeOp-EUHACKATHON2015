Router.configure({
    layoutTemplate: 'commonTemplate',
    loadingTemplate: 'loadingApp'
});

Router.route('/', {
    name:'home',
    template: 'home'
});

Router.route('/aStart', {
    waitOn: function(){
        return Meteor.subscribe('ActionsKidA');
    }
});

Router.route('/bStart');