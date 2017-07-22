let microInterval = 600000; // Hard-coded @ 10 mins
let restInterval = 1800000; // Hard-set @ 30 mins
let reps = 3;
let totalTime = 0;
let timerVar;


// Startups
console.log(70 / 60 % 60);


function startClock() {

    timerVar = setInterval(function () {
        totalTime++;

        if (totalTime == 600) {
            checkReps();
        }
        reloadPage();
    }, 1000);
}


function stopClock() {
    clearInterval(timerVar);
}


function checkReps() {
    if (reps != 0) {
        reps--;
    } else {
        alert("else condition reached");
    }
}


function reloadPage_dep() {
    document.getElementById("micro-break-time-left").innerHTML = getTimeString();
}

function reloadPage() {

    // Create time objects
    let secs = totalTime % 60;
    let mins = Math.floor(totalTime / 60);
    // Hours code to be implemented later
    // let hrs = Math.floor(mins / 60);

    // Create and update popup page
    document.getElementById("total-time-elapsed").innerHTML = String(mins) + ":" + (secs < 10 ? "0" + String(secs) : String(secs));
    document.getElementById("micro-break-time-left").innerHTML = String(9 - mins) + ":" + (String(60 - secs) < 10 ? "0" + String(60 - secs) : String(60 - secs));
    document.getElementById("rest-break-time-left").innerHTML = String((10 * reps - 1) - mins) + ":" + (String(60 - secs) < 10 ? "0" + String(60 - secs) : String(60 - secs));
}