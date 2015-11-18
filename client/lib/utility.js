var resetCollections = function(){
    Meteor.call('resetDbCollections', function(result,error){
       if (result){
           lg('result');
           location.reload();
       }

        if (error){
            lg('error');
        }
    });
};

var resetApp = function(){

    //Db
    Meteor.call('resetApp', function(result,error){
        if (result){
            lg('result');

            // session vars (from enterAs)
            Session.set('playerName', null);
            Session.set('playerRole', null);
            Session.set('returningPlayer', null);

            // reload page (main view
            Router.go('/');
        }

        if (error){
            lg('error');
        }
    });
};

window.resetCollections = resetCollections;
window.resetApp = resetApp;