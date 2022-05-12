import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const debounce = require('lodash.debounce');

const refs = {
  inputEl: document.querySelector('#search-box'),
  cauntryListEl: document.querySelector('.country-list'),
};

refs.inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  let inputChenge = refs.inputEl.value.trim();
  if (e) {
    refs.cauntryListEl.innerHTML = '';
  }
  if (refs.inputEl.value === '') {
    return;
  }
  fetchCountries(inputChenge)
    .then(dataPromise)
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
}
function dataPromise(data) {
  if (data.length === 1) {
    return renderOneHtml(data[0]);
  }
  if (data.length > 10) {
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
  }
  data.map(d => renderArryHtml(d));
}

function renderArryHtml(data) {
  const { flags, name } = data;
  refs.cauntryListEl.innerHTML += `<li class="country-list__item"><img class="country-list__image" src="${flags.svg}" alt="${name.official}"><h2 class="country-list__title">${name.official}</h2></li>`;
}
function renderOneHtml(data) {
  const { flags, name, capital, population, languages } = data;
  const languagesStr = Object.values(languages).join(', ');
  const capitalStr = capital.join(', ');
  refs.cauntryListEl.innerHTML += `<li class="country-list__item"><img class="country-list__image" src="${flags.svg}" alt="${name.official}"><h2 class="country-list__title--one">${name.official}</h2><li><ul><li><span>Capital:</span>${capitalStr}</li><li><span>Population:</span>${population}</li><li><span>Languages:</span>${languagesStr}</li></ul></li>`;
}
