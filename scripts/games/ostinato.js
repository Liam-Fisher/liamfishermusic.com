$(document).ready(function() {
	$("#audioOn").click(function() {
//contexts
var canvas = document.getElementById('gameZone');
    if (!canvas.getContext) {
      alert("your Browser does not support this game :(")
    }
const ctx = canvas.getContext('2d');		
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
var time = audioCtx.currentTime;
//game globals   
const newSize = 512;
const pixelSize = 8;
const pallet = ['rgb(0, 0, 0)', 'rgb(255, 255, 255)', 
'rgb(255, 0, 0)', 'rgb(255, 125, 0)',  'rgb(255, 125,125)','rgb(255, 255, 0)','rgb(255, 0, 255)','rgb(255, 0,125)',
'rgb(125, 255, 0)',	'rgb(125, 255, 125)','rgb(125, 0, 255)', 'rgb(125,125, 255)','rgb(125, 0, 125)',
'rgb(0, 255, 0)','rgb(0, 255, 125)','rgb(0, 255, 255)',
 'rgb(0, 125, 255)', 'rgb(0, 125, 125)', 'rgb(0, 125, 0)',
 'rgb(0, 0, 255)',
  'rgb(0, 0, 125)'];
//game arrays
var snakePixels = [];
var fruitPixels = [];
var fruitCoords =[];
//game process vars
var direction = "ArrowRight";
var magnitude = 1;
var level = 1;
//game outcome vars
var winner = true;
var score = 0;
var keepGoing;
//audio vars
const rootNote = 24;
var timeUnit = 0.8;
var noteCount = 0;
var on = true;
var noteArray = [36, 48];
var timerID;
let isPlaying = false;
let lookahead = 25;
let nextNoteTime = 0;
//game classes	
    class Pixel {
      constructor(x, y, c) {
        this.x = x;
        this.y = y;
        this.color = pallet[c];
      }
      fill() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, pixelSize, pixelSize);
      }
      clear() {
        ctx.clearRect(this.x-1, this.y-1, pixelSize+2, pixelSize+2);
    }
}      
class Fruit extends Pixel {
	constructor(x, y, c) {
		super(x, y, c);
  }
  grow() {
	super.fill();
	fruitPixels.push(this);
  }
  eat() {
  super.clear();
  let which = fruitPixels.indexOf(this);
  fruitPixels.splice(which, 1);
  		let mouth = new Pixel(this.x, this.y, 1);
			mouth.fill();
			snakePixels.push(mouth);
  }
}
//audio classes
class Note {
	constructor(midiValue, baseAmp, baseTime) {
	this.midiValue = midiValue;
	this.baseAmp = baseAmp;
    this.baseTime = baseTime;
//this.ampArray = ampArray;
//this.timeArray = timeArray;
	this.gainNode = audioCtx.createGain();
	this.oscNode = audioCtx.createOscillator();
	}	   
	makeNote (noteTime) {
		let freq = Math.pow(2, (this.midiValue-69)/12) * 440;
		this.oscNode.frequency.setValueAtTime(freq, noteTime); 
		this.oscNode.connect(this.gainNode).connect(audioCtx.destination);
		this.gainNode.gain.setValueAtTime(0, noteTime);
		this.oscNode.start();
		noteTime += this.baseTime/2;
		this.gainNode.gain.linearRampToValueAtTime(this.baseAmp, noteTime);
	    noteTime += (this.baseTime/2);
		this.gainNode.gain.linearRampToValueAtTime(0, noteTime);
		this.oscNode.stop(noteTime);
	}
}
	//game eventListeners
    var newCount;

    $("#fruitCount").change(function() {
      newCount	= Number($("#fruitCount").val());
      }); 
    $("#newGame").click(startGame);
    $("#fruitCount").change();
    $(document).keydown(function() {
      direction = event.code;
    }) 

   //create game
    function startGame() {
    $("#gameZone").animate({opacity: 1}, 100);
	isPlaying = !isPlaying;
		if (isPlaying) {
			this.dataset.playing = 'true';
      } else {
			on = false;
			this.dataset.playing = 'false';
      }
     build();
     window.requestAnimationFrame(update);
    }
    function build() {
        for (let i = 0; i < 32; i++) {
		let body = new Pixel(i, 256, 1);
        body.fill();
        snakePixels.push(body);
        }
        for (let i = 0; i < newCount; i++) {
		let fruit= plant();
        fruit.grow();
        }
}
    //update the game
    function update() {
    keepGoing = true;
    if (nextNoteTime < audioCtx.currentTime) {
    nextNoteTime += ostinato(audioCtx.currentTime);
	}
      move(direction, magnitude);
      for (let yum of fruitPixels){
      if	(((yum.x < snakePixels[0].x + pixelSize) && (yum.x > snakePixels[0].x - pixelSize))	&& ((yum.y < snakePixels[0].y + pixelSize)	&& (yum.y > snakePixels[0].y - pixelSize))){
      yum.eat();
	  let noted = note(yum.color);
	  noteArray.push(noted);
	  score += 1;
	  if (score > 5 ){
		score += Math.floor((level*level*level/8));
	  level = Math.ceil(Math.sqrt(Math.floor(Math.sqrt(score))));
	  console.log(level);
	  magnitude += 0.003;
      timeUnit -= 0.0006;
		  }
	  }  
      }
      
    if (fruitPixels.length < newCount) {
    let fruit = plant();
    fruit.grow();
    }
    if (keepGoing){
      window.requestAnimationFrame(update);
      }
    else {
    stopGame();
    }
    }

function move(direction, magnitude) {
        var diffX;
        var diffY;
        var destX;
        var destY;
        let newHead = new Pixel();
        switch (direction) {
          case "ArrowUp":
            diffX = 0;
            diffY = -1;
            break;
          case "ArrowDown":
            diffX = 0;
            diffY = 1;
            break;
          case "ArrowLeft":
            diffX = -1;
            diffY = 0;
            break;
          case "ArrowRight":
            diffX = 1;
            diffY = 0;
            break;
          default: 
            break;
        }
        diffX *= magnitude;
        diffY *= magnitude;
        //loop at edges
        destX = snakePixels[0].x + diffX;
        if (destX < 0) {
          destX = newSize;
        } else if (destX > newSize) {
          destX = 0;
        }
        newHead.x = destX;
        destY = snakePixels[0].y + diffY;
        if (destY < 0) {
          destY = newSize;
        } else if (destY > newSize) {
          destY = 0;
        }
      if (score>3){  
      for (let	part of snakePixels){
      if	((part.x == destX)	
      &&
      (part.y == destY)){
      keepGoing = false;
      }
}
}
        
       newHead.y = destY;
       newHead.color = pallet[1];
       newHead.fill();
       snakePixels.pop().clear();
       snakePixels.unshift(newHead);
     }
 
function plant() {
  var seed = new Fruit();
  seed.x = Math.floor(Math.random()*510);
  seed.y  = Math.floor(Math.random()*510);
  let n =((Math.floor(Math.random()*(level+2)))%pallet.length)+2;
  seed.color = pallet[n];
  return seed;
  }
  
//fix gameover animation  
function stopGame() {
$("#gameZone").animate({
opacity: 0.001
}, 2000, function() {
ctx.clearRect(0, 0, newSize, newSize);
$("#gameZone").css("opacity", 1);
ctx.fillStyle = pallet[1];
ctx.font = "20px serif";
ctx.fillText("GAME OVER", Math.sqrt(newSize), Math.sqrt(newSize));
let mess = "Level " + level + " HIGH SCORE " + score;
ctx.fillText(mess, 256, 256);
}
)
}

function ostinato(timeToPlay) {
	while(on)	{
		if (noteCount < (noteArray.length-1)) {
		noteCount++;
		}
		else {
			noteCount = 0;
	}
	let nextNote = noteArray[(noteCount+1)%noteArray.length];
	let thisNote = noteArray[noteCount];
	let prevNote = noteArray[(noteCount-1)%noteArray.length];
	var noteVal;
	if ((Math.floor(thisNote/3) == Math.floor(prevNote/3)) || (Math.floor(thisNote/3) == Math.floor(nextNote/3)))
	{
		noteVal = timeUnit/2;
	}
	else {
		noteVal = timeUnit;
	}
	let currentNote = new Note(noteArray[noteCount], 0.5, noteVal);
		currentNote.makeNote(timeToPlay);
		return currentNote.baseTime;
} 
} 

function note(color) {
//this function is a series of conditional statements that coerce the ostinato to fit a more familiar musical contour - this is technically where the "composition" takes place, if you'd like to think of it that way 
	let newIntA;
	let newIntB;
	let cIndex = pallet.indexOf(color);
	let pIndex;
	
//scale constructor that approximates the major scale for the first few notes, then gradually adds notes from increasingly foreign keys. i.e. C, D, E, F, G, A, Bb, C, D, Eb, F, G, Ab, Bb, C. Basically a cheap trick to avoid the leading tone while maintaining tonality
	pIndex = ((cIndex-2)*2)-Math.floor((cIndex-2)/3);
	pIndex += 36;
		newIntA = Math.abs(noteArray[noteArray.length-1] - (pIndex+12));
		newIntB = Math.abs(noteArray[noteArray.length-1] - pIndex);
	if (newIntA<newIntB) {
		pIndex += 12;
	}
	return pIndex;
	}	
function end() {
window.clearTimeout(timerID);
//you win!!
}

})
})