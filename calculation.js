const numBtn = document.querySelectorAll('.icons .num');
const signBtn = document.querySelectorAll('.icons .sign');
const deleteBtn = document.querySelector('.icons .delete');
const resetBtn = document.querySelector('.icons .reset');
const equalBtn = document.querySelector('.icons .equal');

const textBox = document.querySelector('.text-box');
const errSound = document.querySelector('.audio');
const mainBody = document.querySelector('.calculator');

// set of ascii codes of all legal values that can be entered
const legalValsNum = new Set([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
const legalValsSign = new Set([42, 43, 45, 46, 47]);

var lastSign = '';


function checkSignError() {
    var lastChar = textBox.value[textBox.value.length - 1];

    if (typeof (lastChar) == 'undefined' || lastChar == '+' || lastChar == '-' || lastChar == '*' || lastChar == '/' || lastChar == '.')
        return true;
    return false;
}

function errorCaught() {
    errSound.currentTime = 0;
    errSound.play();

    mainBody.style.animation = 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both';
    mainBody.addEventListener('animationend', () => {
        mainBody.style.animation = '';
    });
}

function equalPress() {
    var stat = textBox.value;
    //if last character is sign then remove it
    if (checkSignError()) {
        stat = stat.slice(0, -1)
    }
    // checking if num/0 exist in the expression
    for(var i =0;i<stat.length;i++){
        if(stat[i]=='/')
        {
            if(stat[i+1] == '0')
            {
                if (typeof (stat[i+2]) == 'undefined' || stat[i+2] == '+' || stat[i+2] == '-' || stat[i+2] == '*' || stat[i+2] == '/' || i+2 >=stat.length){
                    errorCaught();
                    document.querySelector('.zero-error').classList.add('error');
                    return;
                }
            }
        }
    } 
    var ans = eval(stat).toString();
    var ans = ans.includes(".") ? parseFloat(ans).toFixed(2) : ans;
    textBox.value = ans ;
}
// no two dot in a number

// play error audio when anything except the 15 characters is entered
//call function to display output when = is pressed
textBox.addEventListener('keypress', event => {
    document.querySelector('.zero-error').classList.remove('error');
    if (event.keyCode == 61) {
        equalPress();
    }
    else if (event.keyCode == 46) {
        if (event.key == lastSign) {
            event.preventDefault();
            errorCaught();
        }
        else
            event.key;
    }
    else if (!(legalValsNum.has(event.keyCode) || legalValsSign.has(event.keyCode))) {
        event.preventDefault();
        errorCaught();
    }
    else {
        if ((legalValsSign.has(event.keyCode))) {
            if (checkSignError()) {
                event.preventDefault();
                errorCaught();
            }
            else
                lastSign = event.key;
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
        document.querySelector('.zero-error').classList.remove('error');
        textBox.value = textBox.value.concat(btn.textContent);
    });
});

//play error sound if trying to enter sign 2 times 
signBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.zero-error').classList.remove('error');
        if (checkSignError()) {
            errorCaught();
        }
        else if (btn.textContent == '.') {
            if (btn.textContent == lastSign) {
                errorCaught();
            }
            else {
                textBox.value = textBox.value.concat('.');
                lastSign = '.';
            }
        }
        else {
            if (btn.textContent == 'x') {
                textBox.value = textBox.value.concat('*');
                lastSign = '*';
            }
            else {

                textBox.value = textBox.value.concat(btn.textContent);
                lastSign = btn.textContent;
            }
        }
    });
});

deleteBtn.addEventListener('click', () => {
    document.querySelector('.zero-error').classList.remove('error');
    textBox.value = textBox.value.slice(0, -1);
});

resetBtn.addEventListener('click', () => {
    document.querySelector('.zero-error').classList.remove('error');
    textBox.value = '';
});

//check for empty 
equalBtn.addEventListener('click', () => { equalPress() });
