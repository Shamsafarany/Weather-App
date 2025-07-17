async function main() {
  const key = "K482S4YYGBPQEHZ292PLUAFN8";
  let city = getCity();
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${key}&contentType=json`;

  const data = await getData(url);
  printData(data);
}

main();

function getCity() {
  let city = prompt("Enter a city: ");
  return city;
}

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
  console.log("Temp: ", data.currentConditions.temp);
  console.log("Humidity: ", data.currentConditions.humidity);
  console.log("Conditions: ", data.currentConditions.conditions);
}
