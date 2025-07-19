//get elements
const form = document.querySelector("form");
const input = document.querySelector("input");
const p = document.querySelector(".text");
const temp = document.querySelector(".temp");

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

  const data = await getData(url);
  const filteredData = await requiredData(data);
  printData(filteredData);
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
    temp.innerHTML = "";
    p.innerHTML = "";
    p.innerHTML = "Invalid input!";

    return;
  }
}

function printData(data) {
  console.log("Temperature:", data.temperature + " °C");
  console.log("Feels Like:", data.feelsLike + " °C");
  console.log("Humidity:", data.humidity + " %");
  console.log("Wind Speed:", data.windSpeed + " km/h");
  console.log("Precipitation:", data.rain);
  console.log("Rain Chance:", data.rainChance + " %");
  console.log("Conditions:", data.conditions);
  console.log("Icon:", data.icon);

  const date = new Date(data.datetime); // now it's a full YYYY-MM-DD string
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  temp.innerHTML = `${data.temperature}<span>°C </span>`;
  p.innerHTML = `
  Date: ${formattedDate} <br>
  Feels like: ${data.feelsLike} °C<br>
  Humidity: ${data.humidity} %<br>
  Wind Speed: ${data.windSpeed} km/h<br>
  Precipitation: ${data.rain} %<br>
  Rain Chance: ${data.rainChance} %<br>
  Conditions: ${data.conditions}<br>
  Icon: ${data.icon}
`;
}

function requiredData(data) {
  const filteredData = {
    temperature: data.currentConditions.temp,
    feelsLike: data.currentConditions.feelslike,
    humidity: data.currentConditions.humidity,
    windSpeed: data.currentConditions.windspeed,
    rainChance: data.currentConditions.precipprob,
    rain: data.currentConditions.precip,
    conditions: data.currentConditions.conditions,
    icon: data.currentConditions.icon,
    datetime: data.days[0].datetime,
  };
  return filteredData;
}
