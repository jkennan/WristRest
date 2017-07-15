let microInterval = 600000; // Hard-coded @ 10 mins
let restInterval  = 1800000; // Hard-set @ 30 mins
let reps          = 0;
let totalTime     = 0;

function startClock() {

    setInterval(function() {
       totalTime++;
    }, 1000);
}


function checkReps() {
    if (reps != 3) {
        reps++;
    } else {

    }
}


function reloadPage() {
    document.getElementById("micro-break-time-left").innerHTML = getTimeString(); 
}

function getTimeString(time) {
    let min = (time / 60) % 60;
    return min + ":" + totalTime;
}