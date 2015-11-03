Meteor.startup(function() {
    Router.configure({
        layoutTemplate: 'commonTemplate',
        loadingTemplate: 'loadingApp'
    });

    Router.route('/', {
        name:'enterAs',
        template: 'enterAs',
        onBeforeAction: function(){
            this.layout(null);
            this.render('enterAs');
        }
    });

    Router.route('/aStart', {
        waitOn: function(){
            return Meteor.subscribe('ActionsKidA');
        },
        onStop: function(){
            Meteor.logout()
        }
    });

    Router.route('/bStart', {
        waitOn: function(){
            return Meteor.subscribe('ActionsKidA');
        },
        onStop: function(){
            Meteor.logout()
        }
    });
});