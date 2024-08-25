'use strict';
// let date = new Date()
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
function convertNumberToMonth(number = 0){
    if(number>11)
        return false;
    return MONTH_NUMBER_TO_WORD[number];
}
// function getYear(){
//     return date.getFullYear();
// }
// function getMonth(){
//     return convertNumberToMonth(date.getMonth());
// }
// function getDay(){
//     return date.getDate();
// }
function appendYearPicker(start, end, parentClass){
    let yearPicker = document.querySelector('.' + parentClass);
    for(let i = start; i <= end; i++){
        let element = document.createElement('option');
        element.classList.add(`${parentClass}-option`);
        element.innerHTML = i;
        element.setAttribute('value', i);
        yearPicker.appendChild(element);
    }
}
function appendMonthPicker(parentClass){
    let monthPicker = document.querySelector(parentClass);
    Object.keys(MONTH_NUMBER_TO_WORD).forEach(el => {
        let element = document.createElement('option');
        element.classList.add(`${parentClass}-option`);
        element.innerHTML = el;
    });
}
appendYearPicker(1950, 2050, 'year-of-birth');