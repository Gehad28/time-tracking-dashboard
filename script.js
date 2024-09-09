// import data from './data.json' assert { type: 'json' };


let container = document.getElementById("container");

let titles = document.querySelectorAll(".title");
let currentTimes = document.querySelectorAll(".current");
let previousTimes = document.querySelectorAll(".previous");
let listItems = document.querySelectorAll("li");

let data = [];

const perviousText = {
    "daily": "Yasterday",
    "weekly": "Last Week",
    "monthly": "Last Month"
}

fetch("/data.json").then((request) => {
    if(!request.ok){
        console.log("Failed to fetch data!");
        return null;
    }

    return request.json();
}).then((fetchedData) => {
    console.log(fetchedData);
    fetchedData.forEach((item, index) => {
        titles[index].innerHTML = item.title;
        currentTimes[index].innerHTML = `${item.timeframes.weekly.current}hrs`;
        previousTimes[index].innerHTML = `Last Week - ${item.timeframes.weekly.previous}hrs`;
    });
    data = fetchedData;
});

// data.forEach((item, index) => {
//     titles[index].innerHTML = item.title;
//     currentTimes[index].innerHTML = `${item.timeframes.weekly.current}hrs`;
//     previousTimes[index].innerHTML = `Last Week - ${item.timeframes.weekly.previous}hrs`;
// });

const update = (timeframe) => {
    data.forEach((item, index) => {
        currentTimes[index].innerHTML = `${item.timeframes[timeframe.toLowerCase()].current}hrs`;
        previousTimes[index].innerHTML = `${perviousText[timeframe.toLowerCase()]} - ${item.timeframes[timeframe.toLowerCase()].previous}hrs`;
    });
}

const deactivateItems = () => {
    listItems.forEach(item => {
        item.classList.remove("active");
    });
}


listItems.forEach((item) => {
    item.addEventListener("click", e => {
        deactivateItems();
        e.target.classList.add("active");
        update(e.target.innerHTML);
    })
});