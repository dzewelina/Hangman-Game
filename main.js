var Fruits = ['apple', 'banana', 'orange'];
var Games = ['football', 'basketball', 'tennis'];
var Vegetables = ['carrot', 'cucumber', 'tomato']

var categoryList = ['Fruits', 'Games', 'Vegetables'];
var categoryElements = [Fruits, Games, Vegetables];

//get random word from array
Array.prototype.getWord = function() {
  return this[Math.floor(Math.random() * this.length)];
}

var categoryDiv = document.getElementById('categories');
var choiceSpan = document.getElementById('choice');
var wordToGuess = '';
var wordToGuessDiv = document.getElementById('word-to-guess');

var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lettersDiv = document.getElementById('letters');

//block(true) or unblock(false) all buttons in chosen Element
Object.prototype.block = function(x) {
  for (var y = 0; y < this.length; y++) {
    this[y].disabled = x;
  }
}

var gallowsDiv = document.getElementsByTagName('img')[0];
var resultDiv = document.getElementById('result');
var answerDiv = document.getElementById('answer');
var againDiv = document.getElementById('new');

var images = ['hang1.img', 'hang2.img', 'hang3.img', 'hang4.img', 'hang5.img', 'hang6.img'];
var position = 0;

var gaps = document.getElementById('word-to-guess').childNodes;

for (var i = 0; i < categoryList.length; i++) {
  var category = categoryList[i];
  var categoryButton = document.createElement('button');

  categoryButton.innerText = category;
  categoryButton.id = category;

  categoryDiv.appendChild(categoryButton);

  categoryButton.addEventListener('click', function (event) {
    //empty choiceDive for new category
    while (choiceSpan.hasChildNodes()) {
      choiceSpan.removeChild(choiceSpan.lastChild);
    }
    //print category
    var space = document.createElement('span');
    space.innerText = event.srcElement.innerText;
    choiceSpan.appendChild(space);

    //find wordToGuess
    var index = categoryList.indexOf(event.srcElement.innerText);
    wordToGuess = categoryElements[index].getWord().toUpperCase();
  
    //remove all placeholders from wordToGuessDiv -> prepare empty div for new word
    while (wordToGuessDiv.hasChildNodes()) {
      wordToGuessDiv.removeChild(wordToGuessDiv.lastChild);
    }    
    //create placeholder for each letter in the word
    for (var i = 0; i < wordToGuess.length; i++) {
      var placeholder = document.createElement('span');
      placeholder.innerText = '_ ';
     
      wordToGuessDiv.appendChild(placeholder);
    }
    //unblock all letter buttons
    lettersDiv.childNodes.block(false);   
  });
}

for (var i = 0; i < alphabet.length; i++) {
  var letter = alphabet[i];
  var button = document.createElement('button');
  button.id = letter;
  button.innerText = letter;
  button.disabled = true;

  lettersDiv.appendChild(button);

  button.addEventListener('click', function (event) {
    //block all category buttons
    categoryDiv.childNodes.block(true);
    
    var clickedButton = document.getElementById(event.srcElement.innerText);
    //if button was clicked block it and change colour for red
    clickedButton.disabled = true;
    clickedButton.style.color = 'red';

    //letter occurs in the word
    var marker = false;
    //word is complete
    var complete = true;

    for (var j = 0; j < wordToGuess.length; j++) {
      //if letter occurs in the word
      if (event.srcElement.innerText === wordToGuess[j]) {
        gaps[j].innerText = event.srcElement.innerText + ' ';
        marker = true;
        clickedButton.style.color = 'green';
      }
      //check if word is complete
      if (gaps[j].textContent === '_ ') {
        complete = false;        
      }
    }
    // if word is completed (complete = true) -> return information and block all buttons
    if (complete === true) {
      resultDiv.innerText = 'Good!';
      againDiv.innerText = 'Try Again';
      //blockLetters;
      lettersDiv.childNodes.block(true);          
    }
    //if letter not occurs in the word (marker = false) -> upload next image
    if (marker === false) {
      gallowsDiv.src = images[position];
      position++;
      //if last image was uploaded -> return information and block all buttons
      if (position === images.length) {
        resultDiv.innerText = 'Sorry, you have been hanged! The answer was:';
        var correctAnswer = document.createTextNode(wordToGuess);
        answerDiv.appendChild(correctAnswer);
        againDiv.innerText = 'Try Again';
        //blockLetters;
        lettersDiv.childNodes.block(true);        
      }
    }
  });  
}





