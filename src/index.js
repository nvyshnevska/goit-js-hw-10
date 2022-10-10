import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const inputSearchRef = document.querySelector('#search-box');
const countryInfoRef = document.querySelector('.country-info');
const countryListRef = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

inputSearchRef.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(event) {
  clearMarkup(countryInfoRef);
  clearMarkup(countryListRef);

  const name = inputSearchRef.value.trim();

  if (!name) {
    return;
  }

  fetchCountries(name).then(onSearchSuccess).catch(onSearchError);
}

function onSearchSuccess(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
      { position: 'center-top' }
    );
    return;
  }
  if (data.length >= 2 && data.length <= 10) {
    appendCountryListMarkup(data);
  } else if (data.length === 1) {
    appendCountryInfoMarkup(data);
  }
}

function onSearchError(error) {
  console.log(error);
  Notiflix.Notify.failure('Oops, there is no country with that name', {
    position: 'center-top',
  });
}

function clearMarkup(element) {
  element.innerHTML = '';
}

function appendCountryInfoMarkup(data) {
  const markup = data.map(country => {
    return `<img src="${country.flags.svg}" alt="country flag" width=40/>
  <span class="country-name">${country.name.official}</span>
  <p><span class="country-data">Capital: </span>${country.capital}</p>
  <p><span class="country-data">Population: </span>${country.population}</p>
  <p><span class="country-data">Languages: </span>${Object.values(
    country.languages
  )}</p>`;
  });
  countryInfoRef.insertAdjacentHTML('beforeend', markup);
}

function appendCountryListMarkup(data) {
  const markup = data
    .map(country => {
      return `<li><img src="${country.flags.svg}" alt="country flag" width=25>  ${country.name.official}</li>`;
    })
    .join('');
  countryListRef.insertAdjacentHTML('beforeend', markup);
}
