'use strict';
const MONTH_NUMBER_TO_WORD = {
    0: "Январь",
    1: "Февраль",
    2: "Март",
    3: "Апрель",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Август",
    8: "Сентябрь",
    9: "Октябрь",
    10: "Ноябрь",
    11: "Декабрь"
}
// function convertNumberToMonth(number = 0){
//     if(number>11)
//         return false;
//     return MONTH_NUMBER_TO_WORD[number];
// }
function appendYearPicker(start, end, parentElement){
    let yearPicker = document.querySelector('.' + parentElement);
    for (let i = start; i <= end; i++){
        let element = document.createElement('option');
        element.classList.add(`${parentElement}-option`);
        element.innerHTML = i;
        element.setAttribute('value', i);
        element.setAttribute('name', 'year');
        yearPicker.appendChild(element);
    }
}
function appendMonthPicker(parentElement){
    let monthPicker = document.querySelector('.' + parentElement);
    Object.keys(MONTH_NUMBER_TO_WORD).forEach(el => {
        let element = document.createElement('option');
        element.classList.add(`${parentElement}-option`);
        element.innerHTML = MONTH_NUMBER_TO_WORD[el];
		element.setAttribute('value', el);
		element.setAttribute('name', 'month');
		monthPicker.appendChild(element);
    });
}
function appendDayPicker(parentElement){
	let dayPicker = document.querySelector('.' + parentElement);
	for (let i = 1; i<=31; i++){
		let element = document.createElement('option');
		element.classList.add(`${parentElement}-option`);
		element.innerHTML = i;
		element.setAttribute('value', i);
		element.setAttribute('name', 'day');
		dayPicker.appendChild(element);
	}
}
function hideExtraDays(year, month){
	let daysInMonth = daysInMonth(year, month);
	let extraDaysNumber = 31 - daysInMonth;
	for (let i = 0; i <= extraDaysNumber; i++){
		hideElement('.day-of-birth-option');
	}
}
function daysInMonth (month, year) {
	return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
}
function hideElement(selector){
	document.querySelector(selector).style.display = 'none';
}
function showElement(selector){
	document.querySelector(selector).style.display = '';
}
appendYearPicker(1900, 2050, 'year-of-birth');
appendMonthPicker('month-of-birth');
appendDayPicker('day-of-birth');