//Logging wrapper for regular logs. Warnings and errors shoudl be displayed in regular way
//to activate via browser console enter: window.debugMode = true
window.debugMode = true;
var log = function(){
    if(window.debugMode){
        console.log.apply(console, arguments);
    }
}
var logGroupCollapsed = function(){
    if(window.debugMode){
        console.groupCollapsed.apply(console, arguments);
    }
}
var logGroupEnd = function(){
    if(window.debugMode){
        console.groupEnd.apply(console, arguments);
    }
}

export {log, logGroupCollapsed, logGroupEnd };