let reps = 0;

chrome.alarms.onAlarm.addListener(alarm => {
    reps++;
    if (reps >= 3) {
        $.getScript("popup/popup.js", function (script, textStatus, jqXHR) {
            startClock(300);
        });
        reps = 0;
    } else {
        $.getScript("popup/popup.js", function (script, textStatus, jqXHR) {
           startClock(30); 
        });
    }

});

let microBreak = function() {
    alert("Time for a micro-break");
}

let restBreak = function() {
    alert("Time for a rest-break!");
}