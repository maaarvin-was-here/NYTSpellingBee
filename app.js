//          VALUES TO INITIALIZE        //

var stringOfLetters = "EAUXCNT";

var scoringGuidelines = 
`Beginner (0)
Good Start (5)
Moving Up (11)
Good (18)
Solid (34)
Nice (57)
Great (92)
Amazing (115)
Genius (160) `;

var editor = "Sam Ezersky";

//          GENERAL VARIABLES          //

// Elements
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var credits = document.getElementById("credits");
var date = document.getElementById("todaysDate");
var title = document.getElementById("spellingBeeTitle");
var wordDisplay = document.getElementById("wordDisplay");
var wordSubmission = document.getElementById("wordBank");
var notification = document.getElementById("notification");

var boxArray = [];
var shuffleBoxArray = [];

var firstBox = document.getElementById("firstBox");
var secondBox = document.getElementById("secondBox");
var thirdBox = document.getElementById("thirdBox");
var fourthBox = document.getElementById("fourthBox");
var fifthBox = document.getElementById("fifthBox");
var sixthBox = document.getElementById("sixthBox");
var seventhBox = document.getElementById("seventhBox");

boxArray.push(firstBox);
boxArray.push(secondBox);
boxArray.push(thirdBox);
boxArray.push(fourthBox);
boxArray.push(fifthBox);
boxArray.push(sixthBox);
boxArray.push(seventhBox);
shuffleBoxArray.push(firstBox);
shuffleBoxArray.push(secondBox);
shuffleBoxArray.push(thirdBox);
shuffleBoxArray.push(fifthBox);
shuffleBoxArray.push(sixthBox);
shuffleBoxArray.push(seventhBox);



//Letters
var letterArray = stringOfLetters.split("");
/*var shuffleLetters = [];
for (var i = 0; i < letterArray.length; i++) {
    if (i != 3) {
        shuffleLetters.push(letterArray[i]);
    }
}*/

//Word
var string = '';
var firstWord = 0;

// Checks
var requiredLetter = letterArray[3];
var possibleWords = [];
var checkPangram = false;

// Display
var foundWordsString = '';
var foundWords = [];

// Points
var points = 0;
var pointCounter = document.getElementById("pointCounter");
  



//              JAVASCRIPT                //



init();

//Adds a new letter to the current guess
function input(letter) {
    string += letter;
    console.log(wordDisplay);
    wordDisplay.innerHTML = string;
}

//Checks to see if submitted word contains more than 3 letters. 
//Notifies user if no word has been typed or if the word is less
//than four letters
function checkLength() {
    if (string.length == 0) {
        notification.innerHTML = "Type a word";
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    } else if (string.length < 4) {
        alert("Word is too short");
        string = '';
        wordDisplay.innerHTML = string;
    } else {
        checkRequiredLetter();        
    }
}

//Checks to see if submitted word includes the required letter. 
//Notifies user if word does not include required letter.
function checkRequiredLetter() {
    if (!string.includes(requiredLetter)) {
        notification.innerHTML = "Does not include center letter";
        string = '';
        wordDisplay.innerHTML = string;
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    } else {
        checkWord();
    }
}

//Checks if submitted word is legitimate, comparing it to dictionary
//passed in by user. Notifies user if word has already been found or
//if the word is not in the dictionary
function checkWord() {
    if (foundWords.includes(string)) {
        notification.innerHTML = "Already been found";
        string = '';
        wordDisplay.innerHTML = string;
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    } else if(possibleWords.includes(string)) {
        submitWord();
    } else {
        notification.innerHTML = "Not in word list";
        string = '';
        wordDisplay.innerHTML = string;
        setTimeout(function(){ notification.innerHTML = "";}, 1000);
    }  
}

//Calculates and adds score of a word, and adds word to found
//words bank
function submitWord() {
    if (firstWord != 0) {
        foundWordsString += ', ';
    }
    calculateScore();
    checkPangram = false;
    foundWords.push(string);
    foundWordsString += string;
    wordBank.innerHTML = foundWordsString;
    string = '';
    wordDisplay.innerHTML = string;
    firstWord++;
}

//Calculates a score for a submitted word
//      1 point if the word is 4 letters long
//      Points equal to word length if word is longer than 4 letters
//      Points equal to 7 plus word length if word is a pangram
function calculateScore() {
    isPangram();
    
    if (string.length == 4) {
        alert(`+1`);
        points += 1;
    } else if (checkPangram == true){
        alert(`Pangram! +${string.length + 7}`);
        points += string.length + 7;
    } else if (string.length > 4) {
        alert(`+${string.length}`);
        points += string.length; 
    }
    pointCounter.innerHTML = points.toString();
}

//Checks whether current word is a pangram
function isPangram() {
    if (letterArray.every(letter => string.includes(letter))) {
        checkPangram = true;
    } else {
        checkPangram = false;
    }
}

//Removes a letter from the end of the current string
function deleteLetter() {
    string = string.slice(0, -1);
    wordDisplay.innerHTML = string;
}

//Creates an alert that shows the scoring threshholds 
function showScoringGuidelines() {
    alert(scoringGuidelines);
}



function init() {
    getLetters('https://www.nytimes.com/puzzles/spelling-bee');

    var letters = letterArray;
    console.log(boxArray);
    
    for (var i = 0; i < boxArray.length; i++) {
        boxArray[i].innerHTML = letters[i];
        boxArray[i].style.backgroundColor = 'white';
        if (letters[i] == requiredLetter) {
            boxArray[i].style.backgroundColor = "gold";
        }
    }   
    getDate();
    credits.innerHTML = "Edited by " + editor;
}

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(monthNames[today.getMonth()]);
    var yyyy = today.getFullYear();
    
    todaysDate = mm + ' ' + dd + ', ' + yyyy;
    
    date.innerHTML = todaysDate;
}

function shuffle() {
    var arrayNumber = 0;
    //var letters = shuffleLetters.slice();
    var boxValues = boxArray.slice();
    var letters = letterArray.slice();
    
    for (var i = 0; i < boxValues.length; i++) {
        arrayNumber = Math.floor(Math.random() * (letters.length));
        boxValues[i].innerHTML = letters[arrayNumber];
        
        boxValues[i].style.backgroundColor = 'white';
        if (letters[arrayNumber] == requiredLetter) {
            boxValues[i].style.backgroundColor = "gold";
        }
        letters.splice(arrayNumber, 1);
    }
}

//Takes dictionary file and prunes it to smaller dictionary with 
//onlywords possible with the letter combination
var req = new XMLHttpRequest();
req.onload = function(){
    var letters = letterArray;
    console.log("I've loaded!");
    console.log(this.responseText);
    console.log(typeof this.responseText);
    var lines = this.responseText.split('\n');
    console.log(lines);
        for(var line = 0; line < lines.length; line++){
            var temp = lines[line].toUpperCase();
            for(var letterCount = 0; letterCount < temp.length; letterCount++) {
                if(temp.charAt(letterCount) != letters[0] &&
                   temp.charAt(letterCount) != letters[1] &&
                   temp.charAt(letterCount) != letters[2] &&
                   temp.charAt(letterCount) != letters[3] &&
                   temp.charAt(letterCount) != letters[4] &&
                   temp.charAt(letterCount) != letters[5] &&
                   temp.charAt(letterCount) != letters[6]
                  ) {
                    letterCount = 99;
                } else if (letterCount == temp.length - 2) {
                    possibleWords.push(temp.slice(0, temp.length - 1));
                }
            }
        }
    console.log(possibleWords);
};
req.open('GET', './newdict.txt');
req.send();


/*async function getLetters(url) {
        try {
            const browser = await puppeteer.launch();

            const page = await browser.newPage();
            await page.setExtraHTTPHeaders({
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
            });
            await page.goto(url);

            await page.waitForSelector('#pz-game-root > div > div.sb-controls-box > div > div.sb-hive > div > svg.hive-cell.center > text');

            const body = await page.evaluate(() => {
                var letterCollection = 'Letters: ';
                var letters = document.querySelectorAll('text.cell-letter');
                letters.forEach((letter) => {
                    var character = letter.textContent;
                    letterCollection += character;
                })
                return letterCollection;
            });

            console.log(body);

            await browser.close();
        } catch (err) {
            console.log(err);
        }
    
} */
