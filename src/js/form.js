import intlTelInput from 'intl-tel-input/index.js';
import 'intl-tel-input/build/js/utils';
import 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';

let countries_served = ["az", "ua", "ge"];

function stringLimitationOnInput(element, regexExp) {
    element.addEventListener("input", function(e) {
        if (e.target.value === " ") {
            e.target.value = "";
        }
        let input = e.target.value;
        input = input.replace(regexExp, '');
        element.value = input;
        return element.value;
    })
}

function restrictKeyboardInput(element) {
    element.addEventListener("keydown", function(e) {
        if (e.keyCode === 13) {
            document.querySelector("#peopleCount").focus();
        } else if (e.keyCode === 9 || e.keyCode === 16) {
        } else {
            e.preventDefault();
        }
    })
}

function saveDates(element, checkIn, checkOut) {
    element.addEventListener("change", function() {
        checkInDateValue = checkIn.value;
        checkOutDateValue = checkOut.value;
        return checkInDateValue, checkOutDateValue;
    })
}

//First name validation
let firstName = document.querySelector("#firstName");
stringLimitationOnInput(firstName, /[^a-zA-Z\s]+/g);

//Last name validation
let lastName = document.querySelector("#lastName");
stringLimitationOnInput(lastName, /[^a-zA-Z\s]+/g);

//Email validation
let userEmail = document.querySelector("#userEmail");
userEmail.addEventListener("keydown", function(e) {
    if (e.keyCode === 32) {
        e.preventDefault();
    }
})

//Phone number validation
let countryCode = document.querySelector("#countryCode");
let phoneNumber = document.querySelector("#telNum");
let telephone, currentFormat;

let number = intlTelInput(phoneNumber, {
    preferredCountries: countries_served,
    formatOnDisplay: true,
    customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
        currentFormat = selectedCountryPlaceholder;
        return currentFormat, selectedCountryPlaceholder;
    },
    separateDialCode: true
});

stringLimitationOnInput(phoneNumber, /[^0-9\. \.-]+/g);

phoneNumber.addEventListener("countrychange", function(e) {
    e.target.value = "";
})

phoneNumber.addEventListener("change", function(e) {
    if (number.getValidationError() === 2) {
        alert("Seems the number is too short. The format is " + currentFormat + ".");
    } else if (number.getValidationError() === 3) {
        alert("Seems the number is too long. The format is " + currentFormat + ".");
    } else if (number.getValidationError() !== 0) {
        alert("Something is wrong with a number. The format is " + currentFormat + ".");
    } else {
        telephone = number.getNumber();
    }
})


//Calendar validation
let checkInDate = document.querySelector('#checkInDate');
let checkOutDate = document.querySelector('#checkOutDate');
let checkInDateValue, checkOutDateValue;
let delimiter = "/";

restrictKeyboardInput(checkInDate);
restrictKeyboardInput(checkOutDate);

flatpickr(checkInDate, {
    enableTime: false,
    dateFormat: "d" + delimiter + "m" + delimiter + "Y",
    minDate: "today",
    "locale": {
        "firstDayOfWeek": 1
    },
    "plugins": [new rangePlugin({input: checkOutDate})],
    allowInput: true
});

saveDates(checkInDate, checkInDate, checkOutDate);
saveDates(checkOutDate, checkInDate, checkOutDate);
