const dayInput = document.getElementById("day")
const monthInput = document.querySelector("#month")
const yearInput = document.querySelector("#year")
const allInputs = document.querySelectorAll("input")
const btn = document.querySelector("button")
const calcYears = document.querySelector(".calc-years")
const calcMonths = document.querySelector(".calc-months")
const calcDays = document.querySelector(".calc-days")
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const todayDate = new Date()
let day = todayDate.getDate()
let month = todayDate.getMonth()
let year = todayDate.getFullYear()

const getDay = () => {
    return +dayInput.value
}

const getMonth = () => {
    return +monthInput.value - 1
}

const getYear = () => {
    return +yearInput.value
}

const checkYear = (birthYear) => {
    // const birthYear = getYear()
    if (birthYear > year || birthYear <= 0) {
        addError(yearInput, "Invalid Year")
    }
    else if (birthYear.length < 4) {
        addError(yearInput, "Insert Full Year")
    }
    else {
        removeError(yearInput)
    }
}

const checkMonth = (birthMonth) => {
    // const birthMonth = getMonth()
    const maxMonth = 11
    const minMonth = 0
    birthMonth > maxMonth || birthMonth < minMonth ? addError(monthInput, "Invalid Month") : removeError(monthInput);
}

const checkDay = (birthDay) => {
    // const birthDay = getDay()
    const maxDay = monthDays[getMonth()]
    const minDay = 1
    if (birthDay > maxDay) {
        addError(dayInput, `This month has only ${monthDays[getMonth()]} days`)
    }
    else if (birthDay < minDay) {
        addError(dayInput, "Invalid Day")
    }
    else {
        removeError(dayInput)
    }
}

const checkBirthDate = () => {
    const birthDay = getDay()
    const birthMonth = getMonth()
    const birthYear = getYear()
    checkDay(birthDay)
    checkMonth(birthMonth)
    checkYear(birthYear)
    let error = false;
    allInputs.forEach(input => {
        if (input.classList.contains("error"))
            error = true;
    })

    if (error == false) {
        calculateAge(birthDay, birthMonth, birthYear)
        animaNumbers()
        resetDate()
    }
}

const calculateAge = (birthDay, birthMonth, birthYear) => {
    // const birthDay = getDay()
    // const birthMonth = getMonth()
    // const birthYear = getYear()

    if (birthDay > day) {
        day += monthDays[getMonth()]
        month -= 1
    }

    if (birthMonth > month) {
        month += 12
        year -= 1
    }

    calcDays.innerText = day - birthDay
    calcMonths.innerText = month - birthMonth
    calcYears.innerText = year - birthYear
}

const animaNumbers = () => {
    const toAnimate = document.querySelectorAll(".app-data span")
    toAnimate.forEach((number) => {
        const total = number.innerText;
        let start = 0;
        const timer = setInterval(() => {
            start++
            number.innerText = start
            if (start >= total) {
                clearInterval(timer)
            }
        }, 100 * Math.random())
    })
}

btn.addEventListener("click", (e) => {
    e.preventDefault()
    checkBirthDate()
})


//reset todayDate
const resetDate = () => {
    day = todayDate.getDate()
    month = todayDate.getMonth()
    year = todayDate.getFullYear()
}

//Handle input lenght
allInputs.forEach(input => {
    input.oninput = () => {
        if (input.value.length > input.maxLength) {
            input.value = input.value.slice(0, input.maxLength)
        }
    }
})

//Handle error fuctions
const addError = function (input, error) {
    input.classList.add("error");
    input.nextElementSibling.classList.add("error")
    input.nextElementSibling.innerHTML = error
    input.previousElementSibling.classList.add("error")
}
const removeError = function (input) {
    input.classList.remove("error");
    input.nextElementSibling.classList.remove("error")
    input.previousElementSibling.classList.remove("error")
}
