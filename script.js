// get the input
const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');

// get the result
const resultYears = document.getElementById('years');
const resultMonths = document.getElementById('months');
const resultDays = document.getElementById('days');

// get the button
const calcButton = document.getElementById('calculate');

function showFieldError(inputEl, message) {
    const container = inputEl.parentElement;
    container.classList.add('error');
    container.querySelector('.error-text').textContent = message;
}

function clearFieldError(inputEl) {
    const container = inputEl.parentElement;
    container.classList.remove('error');
    container.querySelector('.error-text').textContent = '';
}

calcButton.addEventListener('click', () => {
    const day = parseInt(inputDay.value);
    const month = parseInt(inputMonth.value);
    const year = parseInt(inputYear.value);
    const currentYear = new Date().getFullYear();

    let hasError = false;

    // 验证 day
    if (!inputDay.value) {
        showFieldError(inputDay, 'This field is required');
        hasError = true;
    } else if (day <= 0 || day > 31) {
        showFieldError(inputDay, 'Must be a valid day');
        hasError = true;
    } else {
        clearFieldError(inputDay);
    }

    // 验证 month
    if (!inputMonth.value) {
        showFieldError(inputMonth, 'This field is required');
        hasError = true;
    } else if (month <= 0 || month > 12) {
        showFieldError(inputMonth, 'Must be a valid month');
        hasError = true;
    } else {
        clearFieldError(inputMonth);
    }

    // 验证 year
    if (!inputYear.value) {
        showFieldError(inputYear, 'This field is required');
        hasError = true;
    } else if (year > currentYear) {
        showFieldError(inputYear, 'Must be in the past');
        hasError = true;
    } else if (year < 1000) {
        showFieldError(inputYear, 'Must be a valid year');
        hasError = true;
    } else {
        clearFieldError(inputYear);
    }

    // 验证日期是否真实
    if (!hasError) {
        const birthDate = new Date(year, month - 1, day);
        if (
            birthDate.getFullYear() !== year ||
            birthDate.getMonth() !== month - 1 ||
            birthDate.getDate() !== day
        ) {
            showFieldError(inputDay, 'Must be a valid date');
            hasError = true;
        } else {
            clearFieldError(inputDay);
        }
    }

    // 有错误则不计算
    if (hasError) return;

    // 年龄计算逻辑
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += prevMonth.getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    resultYears.textContent = ageYears;
    resultMonths.textContent = ageMonths;
    resultDays.textContent = ageDays;
});
