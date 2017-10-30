var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var wordToGuess = 'APPLE';

var lettersDiv = document.getElementById('letters');
var wordToGuessDiv = document.getElementById('word-to-guess');
var gallows = document.getElementsByTagName('img')[0];
var result = document.getElementById('result');
var again = document.getElementById('new');

var images = ['hang1.img', 'hang2.img', 'hang3.img', 'hang4.img', 'hang5.img', 'hang6.img'];
var position = 0;

for (var i = 0; i < wordToGuess.length; i++) {
 var placeholder = document.createElement('span');
 placeholder.innerText = '_ ';
 
 wordToGuessDiv.appendChild(placeholder);
}

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

    //marker tells us if letter occurs in the word
    var marker = false;

    for (var j = 0; j < wordToGuess.length; j++) {
      if (event.srcElement.innerText === wordToGuess[j]) {
        gaps[j].innerText = event.srcElement.innerText + ' ';
        marker = true;
        document.getElementById(event.srcElement.innerText).style.color = 'green';
      }
    }

    //if letter not occurs in the word (marker = false) -> upload next image
    if (marker === false) {
      gallows.src = images[position];
      position++;
      //if last image was uploaded - return information and block all buttons
      if (position === images.length) {
        result.innerText = 'Failed!';
        again.innerText = 'Try Again';
        //block all buttons
        for (var x = 0; x < lettersDiv.childNodes.length; x++) {
          lettersDiv.childNodes[x].disabled = true;
        }
      }
    }

  });  

}

