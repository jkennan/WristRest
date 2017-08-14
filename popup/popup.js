'use strict'

let totalTime = 0;
let breakTimer;


// Startups
document.addEventListener("DOMContentLoaded", () => {
   alarmClock.setup();
});


function startClock(time) {
    console.log("starting clock with time " + time);
    breakTimer = setInterval( () => {
        totalTime++;

        if (totalTime == time) {
            stopClock();
        }
        reloadPage(time == 30 ? true : false);
    }, 1000);
}


function stopClock(e) {
    clearInterval(breakTimer);
}


function checkReps() {
    if (reps != 0) {
        reps--;
        alert("It's time for a micro-break.");
    } else {
        alert("It's time for a rest-break.");
        reps = 3;
    }
}


function reloadPage(isMicroBreak) {

    // Create time objects
    let secs = totalTime % 60;
    let mins = Math.floor(totalTime / 60);
    // Hours code to be implemented later
    // let hrs = Math.floor(mins / 60);

    // Create and update popup page
    document.getElementById("break-type").innerHTML = isMicroBreak ? "micro" : "rest";
    document.getElementById("break-time-left").innerHTML = String(9 - mins) + ":" + (String(60 - secs) < 10 ? "0" + String(60 - secs) : String(60 - secs));
}


const alarmClock = {
    onHandler : function(e) {
        chrome.alarms.create("timerAlarm", 
        {
            periodInMinutes : 0.1 // For debugging - change to 10 for release. Currently 6 seconds
        });
    },

    offHandler : function(e) {
        chrome.alarms.clear("timerAlarm");
    },

    setup : function() {
        document.getElementById("startButton").addEventListener("click", alarmClock.onHandler);
        document.getElementById("stopButton").addEventListener("click", alarmClock.offHandler);
    },
}