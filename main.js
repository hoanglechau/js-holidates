// Free personal API Key for Holiday API
const API_KEY = "f64883f0-51a1-4ff0-8873-945f680c5a44";

// Selectors
const search = document.getElementById("search-query");
const year = document.getElementById("year-query");
const month = document.getElementById("month-query");
const day = document.getElementById("day-query");
const country = document.getElementById("country-query");
const language = document.getElementById("language-query");

// Functions
const getCountries = async () => {
  try {
    const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("error", err.message);
  }
};

const renderCountries = async () => {
  try {
    const data = await getCountries();
    const countriesList = document.getElementById("countries-list");
    const ulCountriesList = countriesList.children[2];
    ulCountriesList.innerHTML = "";
    data.countries.forEach((country, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
          <div class="li-wrapper">
              <div class="li-title">${country.name}</div>
              <div>Code: ${country.code}</div>
          </div>`;
      ulCountriesList.appendChild(x);
    });
  } catch (err) {
    console.log("error", err.message);
  }
};

const getLanguages = async () => {
  try {
    const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("error", err.message);
  }
};

const renderLanguages = async () => {
  try {
    const data = await getLanguages();
    const languagesList = document.getElementById("languages-list");
    const ulLanguagesList = languagesList.children[2];
    ulLanguagesList.innerHTML = "";
    data.languages.forEach((language, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
          <div class="li-wrapper">
              <div class="li-title">${language.name}</div>
              <div>Code: ${language.code}</div>
          </div>`;
      ulLanguagesList.appendChild(x);
    });
  } catch (err) {
    console.log("error", err.message);
  }
};

const getHolidays = async () => {
  try {
    let query = "";
    if (search.value) {
      query += `&search=${search.value}`;
    }
    if (year.value) {
      query += `&year=${year.value}`;
    } else {
      query += `&year=2022`; // Free personal API Key can only get holidays in the previous year
    }
    if (month.value) {
      query += `&month=${month.value}`;
    }
    if (day.value) {
      query += `&day=${day.value}`;
    }
    if (country.value) {
      query += `&country=${country.value}`;
    } else {
      query += `&country=VN`; // Default country is Vietnam if all input boxes are empty
    }
    if (language.value) {
      query += `&language=${language.value}`;
    }
    const url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}${query}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("error", err.message);
  }
};

const renderHolidays = async () => {
  try {
    const data = await getHolidays();
    const holidaysList = document.getElementById("holidays-list");
    const ulHolidaysList = holidaysList.children[1];
    ulHolidaysList.innerHTML = "";
    data.holidays.forEach((holiday, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
          <div class="li-wrapper">
              <div class="li-title">${holiday.name}</div>
              <div>${holiday.weekday.date.name} - ${holiday.date}</div>
          </div>`;
      ulHolidaysList.appendChild(x);
    });
  } catch (err) {
    console.log("error", err.message);
  }
};

// Event Listeners
document
  .getElementById("countries-list-btn")
  .addEventListener("click", renderCountries);

document
  .getElementById("languages-list-btn")
  .addEventListener("click", renderLanguages);

document
  .getElementById("holidays-btn")
  .addEventListener("click", renderHolidays);
