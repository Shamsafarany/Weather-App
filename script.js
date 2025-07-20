//get elements
const form = document.querySelector("form");
const input = document.querySelector("input");
const loading = document.querySelector(".loader");
const dot = document.querySelector(".dots");
const displayContainer = document.querySelector(".displaycontainer");
let dotinterval;

function getCity() {
  let city = "";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    city = input.value.trim();
    main(city);
  });
}
getCity();

async function main(city) {
  const key = "K482S4YYGBPQEHZ292PLUAFN8";
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${key}&contentType=json`;
  loading.style.display = "block";
  startDotAnimation();

  const data = await getData(url);
  const weekData = await getDays(data);
  printData(weekData);
  loading.style.display = "none";
  stopAnimation();
}

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found or invalid input.");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    displayContainer.innerHTML = "";
    const errorDisplay = document.createElement("div");
    const text = document.createElement("p");
    text.classList.add("error");
    errorDisplay.appendChild(text);
    displayContainer.appendChild(errorDisplay);
    text.innerHTML = "Country/city not found!";
    loading.style.display = "none";
    return;
  }
}

function printData(weekData) {
  displayContainer.innerHTML = "";
  weekData.forEach((day, index) => {
    const display = document.createElement("div");
    display.classList.add("display");
    const temp = document.createElement("div");
    temp.classList.add("temp");
    const text = document.createElement("p");
    text.classList.add("text");
    display.appendChild(temp);
    display.appendChild(text);
    displayContainer.appendChild(display);

    if (index === 0) {
      display.classList.add("today");
    }

    console.log("Temperature:", day.temperature + " °C");
    console.log("Feels Like:", day.feelsLike + " °C");
    console.log("Humidity:", day.humidity + " %");
    console.log("Wind Speed:", day.windSpeed + " km/h");
    console.log("Precipitation:", day.rain);
    console.log("Rain Chance:", day.rainChance + " %");
    console.log("Conditions:", day.conditions);
    console.log("Icon:", day.icon);

    const iconImg = document.createElement("img");
    iconImg.src = `https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/${day.icon}.png?raw=true`;
    iconImg.style.width = "50px";
    display.appendChild(iconImg);
    iconImg.style.width = "50px";
    display.appendChild(iconImg);
    const date = new Date(day.datetime); // now it's a full YYYY-MM-DD string
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    if (index === 0) {
      temp.innerHTML = `${day.temperature}<span>°C </span>`;
      text.innerHTML = `
       TODAY <br>
  Date:<strong> ${formattedDate} </strong> <br>
  Feels like: ${day.feelsLike} °C<br>
  Humidity: ${day.humidity} %<br>
  Wind Speed: ${day.windSpeed} km/h<br>
  Rain Chance: ${day.rainChance} %<br>
  Conditions: ${day.conditions}<br>
`;
    } else {
      temp.innerHTML = `${day.temperature}<span>°C </span>`;
      text.innerHTML = `
  Date:<strong> ${formattedDate} </strong> <br>
  Feels like: ${day.feelsLike} °C<br>
  Humidity: ${day.humidity} %<br>
  Wind Speed: ${day.windSpeed} km/h<br>
  Rain Chance: ${day.rainChance} %<br>
  Conditions: ${day.conditions}<br>
`;
    }
  });
}

function requiredData(day) {
  return {
    temperature: day.temp,
    feelsLike: day.feelslike,
    humidity: day.humidity,
    windSpeed: day.windspeed,
    rainChance: day.precipprob,
    conditions: day.conditions,
    icon: day.icon,
    datetime: day.datetime,
  };
}

function getDays(data) {
  const weekData = [];
  const daysList = data.days;
  for (let i = 0; i < 7; i++) {
    weekData.push(requiredData(daysList[i]));
  }
  return weekData;
}

function startDotAnimation(){
  let count = 0;
  dotinterval = setInterval(()=>{
    count = (count + 1) % 4;
    if (count === 0) {
      count++;
    }
    dot.textContent = ".".repeat(count);
  }, 500);
}
function stopAnimation(){
  clearInterval(dotinterval);
  dot.textContent = "";
}