const theme1 = ['hsl(222, 26%, 31%)','hsl(223, 31%, 20%)','hsl(224, 36%, 15%)',
                'hsl(225, 21%, 49%)','hsl(224, 28%, 35%)',
                'hsl(6, 63%, 50%)','hsl(6, 70%, 34%)',
                'hsl(30, 25%, 89%)','hsl(28, 16%, 65%)',
                'hsl(221, 14%, 31%)','white','white','white'];

const theme2 = ['hsl(0, 0%, 90%)','hsl(0, 5%, 81%)','hsl(0, 0%, 93%)',
                'hsl(185, 42%, 37%)','hsl(185, 58%, 25%)',
                'hsl(25, 98%, 40%)','hsl(25, 99%, 27%)',
                'hsl(45, 7%, 89%)','hsl(35, 11%, 61%)',
                'hsl(60, 10%, 19%)','white','white','hsl(60, 10%, 19%)'];
                
const theme3 = ['hsl(268, 75%, 9%)','hsl(268, 71%, 12%)','hsl(268, 71%, 12%)',
                'hsl(281, 89%, 26%)','hsl(285, 91%, 52%)',
                'hsl(176, 100%, 44%)','hsl(177, 92%, 70%)',
                'hsl(268, 47%, 21%)','hsl(290, 70%, 36%)',
                'hsl(52, 100%, 62%)','hsl(198, 20%, 13%)','white','hsl(52, 100%, 62%)']; 
                
const theme1Box = document.querySelector('.theme1');
const theme2Box = document.querySelector('.theme2');
const theme3Box = document.querySelector('.theme3');

const theme1Text = theme1Box.querySelector('.text');
const theme2Text = theme2Box.querySelector('.text');
const theme3Text = theme3Box.querySelector('.text');

const dot = document.querySelector('.dot');  

var currTheme = 1;
                         
function changeTheme(theme)
{
    // Get the root element
    var r = document.querySelector(':root');

    r.style.setProperty('--bg1', theme[0]);
    r.style.setProperty('--bg2', theme[1]);
    r.style.setProperty('--bg3', theme[2]);       
    
    r.style.setProperty('--key1-bg', theme[3]);
    r.style.setProperty('--key1-shadow', theme[4]);

    r.style.setProperty('--key2-bg', theme[5]);
    r.style.setProperty('--key2-shadow', theme[6]);

    r.style.setProperty('--key3-bg', theme[7]);
    r.style.setProperty('--key3-shadow', theme[8]);

    r.style.setProperty('--text-colour1', theme[9]);
    r.style.setProperty('--equal', theme[10]);
    r.style.setProperty('--text-colour2', theme[11]); 
    r.style.setProperty('--text-colour3', theme[12]); 
}
   
function translateDot(percent)
{
    dot.style.left = `${percent}%`;
}

function changeTheme1()
{
    console.log('1');
    if(currTheme != 1)
    {
        changeTheme(theme1);
        translateDot(6);
        currTheme = 1;
    }
}

function changeTheme2()
{
    console.log('2');
    if(currTheme != 2)
    {
        changeTheme(theme2);
        translateDot(40);
        currTheme = 2;
    }
}

function changeTheme3()
{
    console.log('3');
    if(currTheme != 3)
    {
        changeTheme(theme3);
        translateDot(72);
        currTheme = 3;
    }
}

// Click event for Theme1
theme1Box.addEventListener('click', changeTheme1);
theme1Text.addEventListener('click', changeTheme1);

// Click Event for Theme2
theme2Box.addEventListener('click', changeTheme2);
theme2Text.addEventListener('click', changeTheme2);

// Click Event for Theme3
theme3Box.addEventListener('click', changeTheme3);
theme3Text.addEventListener('click', changeTheme3);