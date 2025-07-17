//get elements
const form = document.querySelector("form");
const input = document.querySelector("input");

function getCity(){
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

//main();


async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
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
  };
  return filteredData;
}
