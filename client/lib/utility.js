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
    // reset app
    Meteor.call('resetApp', function(result,error){
        if (result){
            lg('result');
        }

        if (error){
            lg('error');
        }

        lg('reset session vars');
        // session vars (from enterAs)
        Session.set('playerName', null);
        Session.set('playerRole', null);
        Session.set('returningPlayer', null);

        // reload page (main view
        Router.go('/');
    });
};

window.resetCollections = resetCollections;
window.resetApp = resetApp;