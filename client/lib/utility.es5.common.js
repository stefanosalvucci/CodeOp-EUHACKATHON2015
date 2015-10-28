var lg  = function(message, logType){
    console.log(message);

    logType = (typeof logType == 'undefined' ? 'info' : logType);
};


window.lg = lg;