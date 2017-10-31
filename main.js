var Fruits = ['apple', 'banana', 'orange'];
var Games = ['football', 'basketball', 'tennis'];

var categoryList = ['Fruits', 'Games'];
var categoryElements = [Fruits, Games];

//get random word from array
Array.prototype.word = function(){
  return this[Math.floor(Math.random() * this.length)];
}

var categoryDiv = document.getElementById('categories');
var wordToGuess = '';
var wordToGuessDiv = document.getElementById('word-to-guess');

for (var i = 0; i < categoryList.length; i++) {
  var category = categoryList[i];
  var categoryButton = document.createElement('button');

  categoryButton.innerText = category;
  categoryButton.id = category;

  categoryDiv.appendChild(categoryButton);

  categoryButton.addEventListener('click', function (event) {

    var index = categoryList.indexOf(event.srcElement.innerText);
    wordToGuess = categoryElements[index].word().toUpperCase();
  
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

  });
}

var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lettersDiv = document.getElementById('letters');
var gallowsDiv = document.getElementsByTagName('img')[0];
var resultDiv = document.getElementById('result');
var againDiv = document.getElementById('new');

var images = ['hang1.img', 'hang2.img', 'hang3.img', 'hang4.img', 'hang5.img', 'hang6.img'];
var position = 0;



var gaps = document.getElementById('word-to-guess').childNodes;

for (var i = 0; i < alphabet.length; i++) {
  var letter = alphabet[i];
  var button = document.createElement('button');
  button.id = letter;
  button.innerText = letter;
  button.style.margin = '5px';

  lettersDiv.appendChild(button);

  button.addEventListener('click', function (event) {

    //if button was clicked block it and change colour for red
    document.getElementById(event.srcElement.innerText).disabled = true;
    document.getElementById(event.srcElement.innerText).style.color = 'red';

    //variable marker tells us if letter occurs in the word
    var marker = false;
    //variable complete tells us if word was completed
    var complete = true;

    for (var j = 0; j < wordToGuess.length; j++) {
      if (event.srcElement.innerText === wordToGuess[j]) {
        gaps[j].innerText = event.srcElement.innerText + ' ';
        marker = true;
        document.getElementById(event.srcElement.innerText).style.color = 'green';
      }
      if (gaps[j].textContent === '_ ') {
        complete = false;        
      }
    }

    // if word is completed (complete = true) -> return information and block all buttons
    if (complete === true) {
      resultDiv.innerText = 'Good!';
      againDiv.innerText = 'Try Again';
      //block all letter buttons
      for (var x = 0; x < lettersDiv.childNodes.length; x++) {
        lettersDiv.childNodes[x].disabled = true;
      }
      //block all category buttons
      for (var y = 0; y < categoryList.length; y++) {
        categoryDiv.childNodes[y].disabled = true;
      }
    }

    //if letter not occurs in the word (marker = false) -> upload next image
    if (marker === false) {
      gallowsDiv.src = images[position];
      position++;
      //if last image was uploaded -> return information and block all buttons
      if (position === images.length) {
        resultDiv.innerText = 'Failed!';
        againDiv.innerText = 'Try Again';
        //block all letter buttons
        for (var x = 0; x < lettersDiv.childNodes.length; x++) {
          lettersDiv.childNodes[x].disabled = true;
        }
        //block all category buttons
        for (var y = 0; y < categoryList.length; y++) {
          categoryDiv.childNodes[y].disabled = true;
        }
      }
    }

  });  

}

