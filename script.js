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

function appendYearPicker(start, end, parentElement){
    let yearPicker = document.querySelector('.' + parentElement);
    for (let i = start; i <= end; i++){
        let element = document.createElement('option');
        element.classList.add(`${parentElement}-option`);
        element.innerHTML = i;
        element.setAttribute('value', i);
        element.setAttribute('name', 'year');
		setMonthYearPickListener(element);
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
		setMonthYearPickListener(element);
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
function setMonthYearPickListener(element){
	element.addEventListener('click', ()=>{
		showDays(document.getElementsByName('year-of-birth').item(0).value, 
		document.getElementsByName('month-of-birth').item(0).value)
	});
}
function showDays(year, month){
	hideExtraDays(year, month);
	showMissingDays(year, month);
}
function hideExtraDays(year, month){
	let daysInMonthNumber = daysInMonth(year, month);
	let extraDays = document.querySelectorAll('.day-of-birth-option');
	for (let i = 30; i >= daysInMonthNumber; i--){
		if (extraDays.item(i).classList.contains('day-of-birth-hidden'))
			continue;
		extraDays.item(i).classList.add('day-of-birth-hidden'); 
	}
}
function showMissingDays(year, month){
	let hiddenDays = document.querySelectorAll('.day-of-birth-hidden');
	for (let i = 0; i < hiddenDays.length; i++){
		hiddenDays.item(i).classList.remove('day-of-birth-hidden');
	}
	hideExtraDays(year, month);	
}
function daysInMonth (year, month) {
	return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
}
async function sendForm(form, e){
	e.preventDefault();
	console.log(form);
	let formdata = new FormData(form);
	console.log(JSON.stringify(Object.fromEntries(formdata)));
}
appendYearPicker(1900, 2050, 'year-of-birth');
appendMonthPicker('month-of-birth');
appendDayPicker('day-of-birth',);
hideExtraDays(1900, 0);