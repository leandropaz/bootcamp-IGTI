import { promises as fs} from "fs";

const mapping = [];
const MIN_INITIAL_LENGTH = 0;
const MAX_INITIAL_LENGTH = 1000;

async function loadFiles() {
  try {
    const states = JSON.parse(await fs.readFile("resources/Estados.json"));
    const cities = JSON.parse(await fs.readFile("resources/Cidades.json"));

    for (const state of states) {
      const element = {};
      const towns = [];
      element.state = state.Sigla;
      for (const city of cities) {
        if (state.ID === city.Estado) {
          towns.push(city.Nome);
        }
      }
      element.towns = towns;
      mapping.push(element);
    }
    return mapping;
  } catch (error) {
    console.error(error);
  }
}

async function dumpFiles(obj) {
  try {
    for (const element of obj) {
      await fs.writeFile(
        `./dumps/${element.state}.json`,
        JSON.stringify(element.towns, null, 2)
      );
    }
  } catch (error) {
    console.error(error);
  }
}

async function getTotalCities(state) {
  try {
    const cities = JSON.parse(await fs.readFile(`dumps/${state}.json`));
    return cities.length;
  } catch (error) {
    console.error(error);
  }
}

async function setTotalCities(data) {
  for (const item of data) {
    const total = await getTotalCities(item.state);
    data[data.indexOf(item)].total = total;
  }
}

function getStatesWithMostCities(data) {
  let mostCities = data.sort((a, b) => {
    return b.total - a.total;
  });

  mostCities = mostCities.map((item) => `${item.state} - ${item.total}`);
  console.log(mostCities.slice(0, 5));
}

function getStatesWithLeastCities(data) {
  let leastCities = data.sort((a, b) => {
    return a.total - b.total;
  });

  leastCities = leastCities.map((item) => `${item.state} - ${item.total}`);
  console.log(leastCities.slice(0, 5));
}

function getBiggestCityNameForEachState(data) {
  const biggestNames = [];
  data.forEach((state) => {
    let length = MIN_INITIAL_LENGTH;
    let town = "";
    state.towns.forEach((city) => {
      if (city.length > length) {
        town = city;
        length = city.length;
      }
      if (city.length === length && town.localeCompare(city) === 1) {
        town = city;
      }
    });
    biggestNames.push(`${town} - ${state.state}`);
  });

  console.log(biggestNames);
}

function getShortestCityNameForEachState(data) {
  const shortestNames = [];
  data.forEach((state) => {
    let length = MAX_INITIAL_LENGTH;
    let town = "";
    state.towns.forEach((city) => {
      if (city.length < length) {
        town = city;
        length = city.length;
      }
      if (city.length === length && town.localeCompare(city) === 1) {
        town = city;
      }
    });
    shortestNames.push(`${town} - ${state.state}`);
  });

  console.log(shortestNames);
}

function getBiggestName(data) {
  let biggestName = "";
  let length = MIN_INITIAL_LENGTH;
  data.forEach((state) => {
    state.towns.forEach((city) => {
      if (city.length > length) {
        biggestName = `${city} - ${state.state}`;
        length = city.length;
      }
      if (city.length === length && biggestName.localeCompare(city) === 1) {
        biggestName = `${city} - ${state.state}`;
      }
    });
  });
  console.log(biggestName);
}

function getShortestName(data) {
  let shortestName = "";
  let length = MAX_INITIAL_LENGTH;
  data.forEach((state) => {
    state.towns.forEach((city) => {
      if (city.length < length) {
        shortestName = `${city} - ${state.state}`;
        length = city.length;
      }
      if (city.length === length && shortestName.localeCompare(city) === 1) {
        shortestName = `${city} - ${state.state}`;
      }
    });
  });
  console.log(shortestName);
}

async function start() {
  console.log("Starting...");
  const result = await loadFiles();
  await dumpFiles(result);
  await setTotalCities(mapping);
  getStatesWithMostCities(mapping);
  getStatesWithLeastCities(mapping);
  getBiggestCityNameForEachState(mapping);
  getShortestCityNameForEachState(mapping);
  getBiggestName(mapping);
  getShortestName(mapping);
  console.log("Finished.");
}

start();
