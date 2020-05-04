let buttonEl = document.getElementById('button');
let buttonSigns = document.getElementById('button--signs');
let inputAreaEl = document.getElementById('input-text');
let resultEl = document.querySelector('.result');

let text = [];
let signs = [".", ",", ":", ";", "!", "?", " ", "/"];

const spanBeginSign = `<span class="signs">`;
const spanEmptyInOpen = `<span class="`
const spanEmptyInClose = `">`
const spanExit = `</span>`;

buttonEl.addEventListener('click', function () {
    text = [];
    makeArray(inputAreaEl.value);
    randomSentensPart();
    console.log(text);
    showText();
});

buttonSigns.addEventListener('click', function () {
    let showsigns = "";
    
    for (let i = 0; i < signs.length; i++) {
        if (signs[i] === " ") {
            showsigns += spanBeginSign + "&nbsp;" + spanExit + " ";
        } else {
            showsigns += spanBeginSign + signs[i] + spanExit + " ";
        }
    }

    resultEl.innerHTML = showsigns;
});


function showText() {
    let outputString = "";
    
    for (let i = 0; i < text.length; i++) {
        switch (text[i].type) {
            case "word":
                let classlist = "";

                if (text[i].value.length < 4) {
                    classlist += "short" + " ";
                }

                if (text[i].part) {
                    classlist += text[i].part + " ";
                }

                if (classlist) {
                    outputString += spanEmptyInOpen +
                                    classlist +
                                    spanEmptyInClose +
                                    text[i].value +
                                    spanExit + " ";
                } else {
                    outputString += text[i].value + " ";
                }
            break;
            
            case "sign":
                outputString += spanBeginSign + text[i].value + spanExit + " ";
            break;
        }
    }

    resultEl.innerHTML = outputString;
}

function makeArray(str) {
    
    let tempArrOfChars = str.split('');
    let word = "";

    for (let i = 0; i < tempArrOfChars.length; i++) {

        if (isSign(tempArrOfChars[i])) {
            
            if (word) {
                text.push({type: "word", value: word});
                word = "";
            }

            if (tempArrOfChars[i] !== " ") {
                text.push({type: "sign", value: tempArrOfChars[i]});
            }
           
        } else {
            word += tempArrOfChars[i];
        }
    }

    if (word) {
        text.push({type: "word", value: word});
    }
}

function randomSentensPart() {  
    for (let i = 0; i < text.length; i++) {
        if (text[i].type === "word") {
            let rnd = Math.floor(Math.random() * 5);
            
            switch (rnd) {
                case 0:
                    text[i].part = "subject";
                    break;
                case 1:
                    text[i].part = "predicate";
                    break;
                case 2:
                    text[i].part = "defenition";
                    break;
            }
        }
    }
}

function isSign(char) {
    for (let i = 0; i < signs.length; i++) {
        if (char === signs[i]) {
            return true;
        }
    }

    return false;
}