let time = "daily";
let previousTime = time;
let oldColour;

document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("daily").addEventListener("click",() => {selectTime("daily")});
    document.getElementById("weekly").addEventListener("click",() => {selectTime("weekly")});
    document.getElementById("monthly").addEventListener("click",() => {selectTime("monthly")});
    oldColour = document.getElementById("daily").style.color;
    document.getElementById(time).style="color:rgb(255,255,255);";
    reloadTime(time)
})


function selectTime(newTime){
    document.getElementById(time).style.color = oldColour;
    time = newTime;
    document.getElementById(time).style="color:rgb(255,255,255);";
    reloadTime(time)
}

async function reloadTime(time){
    let activitiesArr = ["workHours","playHours","studyHours","exerciseHours","socialHours","selfCareHours"];
    let currentHours = [];
    let previousHours = [];
    let data = await fetch("http://localhost:8000/activities").then(response => {
        return response.json();
    });
    if (time != ""){
        data.forEach(activity => {
            currentHours.push(activity.timeframes[time].current);
            previousHours.push(activity.timeframes[time].previous);
        });
    }
    let activityNr = 0;
    activitiesArr.forEach(activity =>{
        let currentText = document.getElementById(activity);
        currentText.innerHTML = currentHours[activityNr]+"hrs";
        let previousText = document.getElementById("prev"+activity);
        previousText.innerHTML = "Last week - "+previousHours[activityNr]+"hrs";
        activityNr += 1;
    });
}