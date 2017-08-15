let reps = 0;
let totalTime;
let breakTimer;

console.log("event page loaded");

chrome.runtime.onMessage.addListener((request, sender, response) => {
    switch (request.method) {
        case "startAlarm":
            alarmClock.startHandler();
            break;
        case "stopAlarm":
            alarmClock.stopHandler();
            stopClock();
            break;
    }
});

chrome.alarms.onAlarm.addListener(alarm => {
    chrome.extension.getBackgroundPage().console.log("alarm rang");
    reps++;
    if (reps >= 3) {
        startClock(300);
        alarmClock.stopHandler();
        reps = 0;
    } else {
        startClock(30);
        alarmClock.stopHandler();
    }

});


const alarmClock = {
    startHandler : function(e) {
        chrome.extension.getBackgroundPage().console.log("starting alarm");
        chrome.alarms.create("timerAlarm", 
        {
            periodInMinutes : 0.1 // For debugging - change to 10 (mins) for release. Currently 6 seconds
        });
    },

    stopHandler : function(e) {
        chrome.alarms.clear("timerAlarm");
    },
}

function startClock(amountToCount) {
    chrome.extension.getBackgroundPage().console.log("starting clock with time " + amountToCount);
    totalTime = 0;
    breakTimer = setInterval(() => {
        totalTime++;

        if (totalTime == amountToCount) {
            stopClock();
            alarmClock.startHandler();

            // send message to start alarm clock
        }
        chrome.runtime.sendMessage({ method: "reloadPage", isMicroBreak: true, time: totalTime})
    }, 1000);
}


function stopClock() {
    clearInterval(breakTimer);
}


// MAIN
alarmClock.startHandler();