let totalTime = 0;
let breakTimer;


// Startups
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startButton").addEventListener("click", () => {
        if (chrome.alarms.get("timerAlarm") == null) {
            chrome.runtime.sendMessage({ method: "startAlarm" });
        }
    });

    document.getElementById("stopButton").addEventListener("click", () => {
        chrome.runtime.sendMessage({ method: "stopAlarm" });
        stopClock();
    });
});

chrome.runtime.onMessage.addListener((request, sender, response) => {
    if (request.method != null && request.method == 'reloadPage') {
        reloadPage(request.isMicroBreak, request.time);
    }
})


function reloadPage(isMicroBreak, time) {

    // Create time objects
    let secs = time % 60;
    let mins = Math.floor(time / 60);
    // Hours code to be implemented later
    // let hrs = Math.floor(mins / 60);


    let s;
    if (isMicroBreak) {
        s = String(30 - secs) + " seconds";
    } else {
        s = "0" + String(5 - mins) + ":" + (secs < 10 ? "0" : "") + String(60 - secs);
    }

    // Create and update popup page
    document.getElementById("break-info").innerHTML = "You're on a " + (isMicroBreak ? "micro break." : "rest break.");
    document.getElementById("break-time-left").innerHTML = s;
}

