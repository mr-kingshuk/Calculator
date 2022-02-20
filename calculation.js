const numBtn = document.querySelectorAll('.icons .num');
const signBtn = document.querySelectorAll('.icons .sign');
const deleteBtn = document.querySelector('.icons .delete');
const resetBtn = document.querySelector('.icons .reset');
const equalBtn = document.querySelector('.icons .equal');

const textBox = document.querySelector('.text-box');
const errSound = document.querySelector('.audio');

// set of ascii codes of all legal values that can be entered
const legalValsNum = new Set([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
const legalValsSign = new Set([42, 43, 45, 46, 47]);


function checkSignError() {
    var lastChar = textBox.value[textBox.value.length - 1];

    if (typeof (lastChar) == 'undefined' || lastChar == '+' || lastChar == '-' || lastChar == '*' || lastChar == '/' || lastChar == '.')
        return true;
    return false;
}

function errorCaught(){
    errSound.currentTime = 0;
    errSound.play();
    
}


function calc()
{
    console.log('calculate');
}

function equalPress()
{
    // trying to press equal after sign or at beging
    if (checkSignError()) {
        errorCaught()
    }
    else {
       calc();
    }
}


// play error audio when anything except the 15 characters is entered
//call function to display output when = is pressed
textBox.addEventListener('keypress', event => {
    if (event.keyCode == 61) {
        equalPress();
    }
    else if (!(legalValsNum.has(event.keyCode) || legalValsSign.has(event.keyCode))) {
        event.preventDefault();
        errorCaught()
    }
    else {
        if ((legalValsSign.has(event.keyCode))) {
            if (checkSignError()) {
                event.preventDefault();
                errorCaught()
            }
        }
        else {
            var lastChar = textBox.value[textBox.value.length - 1];
            if (lastChar == '/' && event.key == '0') {
                event.preventDefault();
                errorCaught()
            }

        }

    }

});


// play error sound if try to divide with 0
numBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        var lastChar = textBox.value[textBox.value.length - 1];

        if (lastChar == '/' && btn.textContent == '0') {
            errorCaught()
        }
        else {
            textBox.value = textBox.value.concat(btn.textContent);
        }
    });
});

//play error sound if trying to enter sign 2 times 
signBtn.forEach(btn => {
    btn.addEventListener('click', () => {

        if (checkSignError()) {
            errorCaught()

        }
        else {
            if (btn.textContent == 'x') {
                textBox.value = textBox.value.concat('*');
            }
            else
                textBox.value = textBox.value.concat(btn.textContent);
        }
    });
});

deleteBtn.addEventListener('click', () => {
    textBox.value = textBox.value.slice(0, -1);
});

resetBtn.addEventListener('click', () => {
    textBox.value = '';
});

//check for empty 
equalBtn.addEventListener('click', () => {equalPress()});
