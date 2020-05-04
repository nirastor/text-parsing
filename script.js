let buttonEl = document.getElementById('button');
let inputAreaEl = document.getElementById('input-text');
let resultEl = document.querySelector('.result');
let text = [];

buttonEl.addEventListener('click', function () {
    text = [];
    makeArray(inputAreaEl.value);
    randomSentensPart();
    console.log(text);
    showText();
});


function showText() {
    let outputString = "";
    let spanBeginSign = `<span class="signs">`;
    let spanBeginShort = `<span class="short">`;
    let spanExit = `</span>`;

    for (let i = 0; i < text.length; i++) {
        if (text[i].type === "word") {

            let tmpWord = text[i].value;

            if (text[i].value.length < 4) {
                tmpWord = spanBeginShort + tmpWord + spanExit;
            }

            if (text[i].part) {
                tmpWord = `<span class="${text[i].part}">` + tmpWord + spanExit;
            }
            
            outputString += tmpWord + " "
        
        } else if (text[i].type === "sign") {
            outputString += spanBeginSign + text[i].value + spanExit + " ";
        }
    }

    resultEl.innerHTML = outputString;
}

function makeArray(str) {
    
    let tempArrOfChars = str.split('');
    
    let word = "";

    for (let i = 0; i < tempArrOfChars.length; i++) {

        if (tempArrOfChars[i] === "." ||
            tempArrOfChars[i] === "," ||
            tempArrOfChars[i] === ":" ||
            tempArrOfChars[i] === "!" ||
            tempArrOfChars[i] === "?" ||
            tempArrOfChars[i] === ";" ||
            tempArrOfChars[i] === " ") {
            
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