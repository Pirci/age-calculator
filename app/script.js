const form = document.getElementById('form'),
      day = document.getElementById('dd'),
      month = document.getElementById('mm'),
      year = document.getElementById('yyyy');

form.addEventListener('submit', e => {
    e.preventDefault();
    var check = true;
    if(validateInputs(check)){

        displayAge(day, month, year);
    };

});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};


const validateInputs = () => {

    const dayValue = day.value.trim();
    const monthValue = month.value.trim();
    const yearValue = year.value.trim();

    var date = new Date();
    var d2 = date.getDate();
    var m2 = 1 + date.getMonth();
    var y2 = date.getFullYear();

    var d , y , m = '--';
    var cd, cm, cy = false;

    if(yearValue === '') {
        setError(year, 'This field is required');
    } else if(yearValue <= '0'){
        setError(year, 'Must be a valid year');
    } else if(yearValue > y2){
        setError(year, 'Must be in the past');
    } else {
        setSuccess(year);
        cy = true;
        y = Math.abs(y2 - year.value.trim())-1;
    }

    if(monthValue === '') {
        setError(month, 'This field is required');

    } else if (monthValue > '12'  || monthValue <= '0') {
        setError(month, 'Must be a valid month');

    } else {
        setSuccess(month);
        cm = true;
        m = Math.abs(m2 - month.value.trim());

    }

    if(dayValue === '') {
        setError(day, 'This field is required');

    } else if (dayValue >'31'  || dayValue <= '0') {
        setError(day, 'Must be a valid day');


    }else if (dayValue>'30' && (month === '04' || month === '06' || month === '09' ||month === '11')) {
        setError(day, 'Must be a valid day');


    }else if (dayValue >'28' && monthValue === '02') {
        if(dayValue === '29' && checkLeapYear(Number(yearValue))){
            setSuccess(day);
            d = Math.abs(d2 - day.value.trim());
            cd = true;
        }else{
            setError(day, 'Must be a valid day');

        }
    } else {
        setSuccess(day);
        d = Math.abs(d2 - day.value.trim());
        cd = true;
    }

    if(cd && cm && cy){
        document.getElementById('age-day').textContent = d;
        document.getElementById('age-month').textContent = m;
        document.getElementById('age-year').textContent = y;
    }


};

// program to check leap year
function checkLeapYear(year) {

    const leap = new Date(year, 1, 29).getDate() === 29;
    if (leap) {
        return true;
    } else {
        return false;
    }
}