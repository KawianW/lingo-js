var speelbord = document.getElementById("speelbord");
var inRow = 1;
var inColumn = 1;
var randomWord, keysWord = '';
var isTyping = true;
var hasWon = false;

function start(){
	//met deze code zorg ik ervoor dat je elke keer een randomword krijgt.
	randomWord = words[Math.floor(Math.random() * words.length)];
	console.log(randomWord);
	//deze code zorgt ervoor dat de rondjes op het speelbord zichtbaar zijn.
	for( row=1; row<6; row++){
		var divRow = document.createElement("div");
			divRow.id = ("r_" + row);
			speelbord.appendChild(divRow);
	for(colomn=1; colomn<6; colomn++){
		var divColomn = document.createElement("div");
			divColomn.id = ("c_" + row + "." + colomn);
			divRow.appendChild(divColomn);
			//dit stukje zorft ervoor dat als je typt mijn speelbord niet verplaatst.
			var paragraph = document.createElement("p");
			paragraph.style.position = "absolute";
			paragraph.style.margin = "0";
			paragraph.style.lineHeight = "50px";
			paragraph.style.textAlign = "center";
			paragraph.style.width = "50px";
			if (colomn == 1){
				paragraph.innerHTML = randomWord.charAt(0).toUpperCase();
				paragraph.style.opacity = "0.5";
			}
			divColomn.appendChild(paragraph);
		}	
	}	
}
start();
//deze code zorgt ervoor dat je kunt typen en dat het zichtbaar word.
document.onkeypress = function(event){
    var key_press = String.fromCharCode(event.keyCode);
    if (key_press.match(/[a-z]/i) && inRow <= 5 && isTyping == true) {
        var click = document.getElementById("c_" + inRow + "." + inColumn++).firstChild;
        click.innerHTML = key_press.toUpperCase();
        click.style.opacity = "1.0";
        keysWord += key_press.toLowerCase();
		if(inColumn > 5){
			check(keysWord);
			inRow++;
			//dit stukje zorgt ervoor dat elke keer dat je een regel hebt getypt er een kleine pauze komt.
			if(inRow > 5 && hasWon == false){
				setTimeout(function(){
					alert("Helaas. het woord is " + randomWord);
					window.location.reload();
				}, 500);
			}
			inColumn = 1;
			keysWord = "";
			isTyping = false;
			setTimeout(function(){
				isTyping = true;
			}, 1000);
		}
    }
}
// deze code zorgt ervoor dat de woorden die de speler typt gechecked worden.
function check(guessWord){
	var goodWord = randomWord.split("");
	var myWord = guessWord.split("");

	for (var i = 0; i < goodWord.length; i++){
		if (myWord[i] == goodWord[i]){
			var column = document.getElementById("c_" + inRow + "." + (i+1));
			column.style.backgroundColor = "green";

			goodWord[i] = "";
			myWord[i] = "*";
		} 
	}
	if(checkAllValues(myWord) == true){
		hasWon = true;
		setTimeout(function(){
			alert("goed gedaan!");
		window.location.reload();
		}, 500);
	}
	for (var i = 0; i < goodWord.length; i++){
		for (var j = 0; j < goodWord.length; j++){
			if (myWord[i] == goodWord[j]){
				var column = document.getElementById("c_" + inRow + "." + (i+1));
				column.style.backgroundColor = "yellow";
				column.style.borderRadius = "0px";

				goodWord[j] = "";
				myWord[i] = "*";
			}
		}
	}
}
 //deze code checked of alles gelijk is aan sterretje *. hij checked de woorden die je moet typen met de worden die je moet raden.
function checkAllValues(myArray){
    for (var i = 0; i < myArray.length; i++){
    	if(myArray[i] != "*"){
    		return false;
    	}
    }
    return true;
}
