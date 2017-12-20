/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 178);
/******/ })
/************************************************************************/
/******/ ({

/***/ 178:
/***/ (function(module, exports) {

let countries = [];

const app = function() {

  const select = document.querySelector('#countries');
  select.addEventListener('change', handleSelectChange);

  const button = document.querySelector('#add');
  button.addEventListener('click', handleButtonClick)

  const countriesUrl = 'https://restcountries.eu/rest/v2/all';
  makeRequest(countriesUrl, requestComplete);

  const displaySavedCountries = function() {
      const request = new XMLHttpRequest();
      request.open('GET', 'http://localhost:3000/api/countries');
      request.addEventListener('load', function(){
        if(this.status !== 200) {
          return;
        }
        const countries = JSON.parse(this.responseText);
        const list = document.querySelector('#country-wishlist');

        countries.forEach(function(country){
          const CountryLi = document.createElement('li');
          CountryLi.innerText = country.name;
          list.appendChild(CountryLi);
        })
      })
      request.send();
  }

    displaySavedCountries();
  // console.log('test');
}

const handleButtonClick = function() {
  const selectedIndex = document.querySelector('#countries').value;
  const selectedCountry = countries[selectedIndex];
  const request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3000/api/countries');
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function() {
    if(this.status!==201) {
      return;
    }
    const country = JSON.parse(this.responseText);
    console.log(country);

    const list = document.querySelector('#country-wishlist');
    const CountryLi = document.createElement('li');
    CountryLi.innerText = country.name;
    list.appendChild(CountryLi);
  })

  // const body = {
  //   countryName: selectedCountry
  // }
  request.send(JSON.stringify(selectedCountry));
}
// function myFunction() {
//     var x = document.getElementById("mySelect").value;
//     document.getElementById("demo").innerHTML = x;
// }

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest;
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback)
}

const requestComplete = function() {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  // console.log(jsonString);
  const data = JSON.parse(jsonString);
  countries = data;
  populateSelectDropDown(countries);
  // console.log(countries);
}

const populateSelectDropDown = function(countries){
  const select = document.querySelector('#countries');
  countries.forEach(function(country, index){
    const option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  })
}

const handleSelectChange = function() {

}

document.addEventListener('DOMContentLoaded', app);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map