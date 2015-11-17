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

window.resetCollections = resetCollections;