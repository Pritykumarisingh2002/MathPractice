let sound = new Audio('sound.mp3');
sound.volume = 0.1;

let pointsValue = 0;

let points = document.querySelector('.points');
points.innerHTML = pointsValue;

let startButton = document.querySelector('.start');
startButton.addEventListener('click', start);

let answerInput = document.querySelector('.answer');
// Allow enter key to submit answer
answerInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13) {
        event.preventDefault();
        submit.click();
    }
});

let submit = document.querySelector('.submit');
let problem = document.querySelector('.problem');
let operator = "+";

let popup = document.querySelector('.popup');
popup.addEventListener('click', popupPoints);

function addPoint(operator) {
    switch(operator) {
        case '+':
        pointsValue += 1;
        break;
        case '-':
        pointsValue += 2;
        break;
        case 'x':
        pointsValue += 3;
        break;
        case '÷':
        pointsValue += 10;
        break;
    }
}

function subtractPoint() {
    if (pointsValue > 0) {
        pointsValue -= 1;
    }
}

function updatePoints() {
    points.innerHTML = pointsValue;
}

function resetPoints() {
    pointsValue = 0;
    updatePoints();
}

function generateAdditionProblem() {
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    let answer = num1 + num2;
    problem.innerHTML = `${num1} + ${num2}`;
    return answer;
}

function generateSubtractionProblem() {
    let num1 = 0;
    let num2 = 0;

    while(num1 - num2 < 0 || num1 == num2) {
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * 100);
    }

    let answer = num1 - num2;
    problem.innerHTML = `${num1} - ${num2}`;
    return answer;
}

function generateMultiplicationProblem() {
    
    let num1 = 0;
    let num2 = 0;

    while(num1 == 0 || num2 == 0 || num1 == num2 || num1 == 1 || num2 == 1) {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
    }

    let answer = num1 * num2;
    problem.innerHTML = `${num1} x ${num2}`;
    return answer;
}

function generateDivisionProblem() {
    let num1 = 0;
    let num2 = 0;

    while(num1 % num2 != 0 || num1 == 0 || num2 == 0 || num1 == num2 || num1 == 1 || num2 == 1) {
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * 10);
    }

    let answer = Math.floor(num1 / num2);
    problem.innerHTML = `${num1} ÷ ${num2}`;
    return answer;
}

function generateMathProblem(operator) {
    switch(operator) {
        case '+':
        return generateAdditionProblem();
        case '-':
        return generateSubtractionProblem();
        case 'x':
        return generateMultiplicationProblem();
        case '÷':
        return generateDivisionProblem();
    }
}

function checkAnswer(userAnswer, answer) {
    return userAnswer === answer ? true : false;
}

function setOperator(newOperator) {
    operator = newOperator;
}

function createOperators() {

    // Assign the operator buttons to their respective functions
    let add = document.querySelector('.add');
    add.addEventListener('click', () => {
        setOperator('+');
        answer = generateMathProblem(operator);
    });

    let subtract = document.querySelector('.subtract');
    subtract.addEventListener('click', () => {
        setOperator('-');
        answer = generateMathProblem(operator);
    });

    let multiply = document.querySelector('.multiply');
    multiply.addEventListener('click', () => {
        setOperator('x');
        answer = generateMathProblem(operator);
    });

    let divide = document.querySelector('.divide');
    divide.addEventListener('click', () => {
        setOperator('÷');
        answer = generateMathProblem(operator);
    });

}

function start() {

    // Delete the start button
    startButton.remove();

    // Allow the user to type in the answer box
    answerInput.disabled = false;

    // Create the operator buttons
    createOperators();

    submit.addEventListener('click', () => {
        let userAnswer = answerInput.value;
        answerInput.value = "";
        userAnswer = parseInt(userAnswer);
        if(checkAnswer(userAnswer, answer)) {
            addPoint(operator);
            sound.play();
            updatePoints();
            answerInput.value = "";
            answer = generateMathProblem(operator);
        } else {
            subtractPoint();
            updatePoints();
        }
    });
}

function popupPoints() {
    alert(`You are at ${pointsValue} points!`);
}

let answer = generateMathProblem(operator);

 