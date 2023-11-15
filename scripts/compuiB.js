$(document).ready(function() {
  var canvas = document.getElementById('genres');
canvas.setAttribute('height', Math.floor(window.innerHeight*0.95));
canvas.setAttribute('width', Math.floor(window.innerWidth*1));
var ctxH = canvas.getAttribute('height');
var ctxW = canvas.getAttribute('width');
var pieceArray = [
  {genre: 'none',
  work: 'none'},
  { genre: 'Piano',
  work: {
  collectionTitle: "Piano Sonata",
  collectionContents: [
  {title: '<small>I:</small> <i>Strained Light</i>',
  filename: "InStrainedLight.wav"},
  {title: '<small>II:</small> <i>Inner Movement</i>',
  filename: "inner_movement.wav"},
  {title: '<small>III:</small> <i>Interlude</i>',
    filename: "Interlude.wav"},
  {title: '<small>IV:</small> <i>Keep Up</i>',
  filename: "minuet-tm.wav"}
  ]}
  },
  {genre: 'Chamber',
  work: {
  collectionTitle: "Three Paintings by Edvard Munch",
  collectionContents: [
  {title: '<i>The Sun</i><br><b>(for String Quartet)</b>',
  filename: "string_quartet.wav"
   },
  {title: '<i>Golgotha</i><br><b>(for Wind Octet)</b>',
  filename: "wind_octet.wav"},
  {title: '<i>The Scream</i><br><b>(for Two Pianos)</b>',
  filename: "piano_duet.wav"}]}
  },
  {genre: 'Orchestral',
  work: {
  collectionTitle: "Little Fugal Symmetry Games",
  collectionContents: [
  {title: '<small>I:</small> <i>Agitato</i>',
  filename: "fugue1.wav"},
  {title: '<small>II:</small> <i>Scherzando</i>',
  filename: "fugue2.wav"},
  {title: '<small>III:</small> <i>Allegretto</i>',
  filename: "fugue3.wav"}
  ]}},
  {genre: "Electronic",
  work: {
    collectionTitle: "Adventures in Overloading",
    collectionContents: [
  {title: "<i>Fast March</i>",
  filename: "NocturnalShenanigans.wav"
  },
  {title: '<i>Slow March</i>',
  filename: "The_Long_Trek.wav"
  }
  ]}}, 
  {genre: 'Trance',
  work: {
  collectionTitle: "mind states",
  collectionContents: [
  {title: '<i>Sudden Clarity</i>',
  filename: "clarity.wav"},
  {title: '<i>robots_want_peace</i>',
  filename: "desiringmachines.wav"},
  {title: '<i>LateralLatticing</i>',
  filename: "LateralLattice.wav"}  
  ]}
  },
  {genre: 'Contemporary',
  work: {
  collectionTitle: "songsforhoping",
  collectionContents: [
  {title: '<i>set_sail</i>',
  filename: "set_sail.wav"
   },
  {title: '<i>sorry...</i>',
  filename: "Sorry_CMW.wav"},
  {title: '<i>quiet firework</i>',
  filename: "quietfirework.wav"}]}
  },
  {genre: 'Chill',
  work: {
  collectionTitle: "For Winter",
  collectionContents: [
  {title: '<i>Icicle Worship</i>',
  filename: "Cold.wav"},
  {title: '<i>Critter Culture</i>',
  filename: "Critter.wav"},
  {title: '<i>Won\'t Remember</i>',
  filename: "Memory.wav"}
  ]}} 
  ]

  
  
  
  var nodeCount = 7;
  var firstTime = true;
  var anim;
  let start;
  var returnToList;
  var genreArray = [];
  var gradArray = [['#000000ff', '#00000000'], ['#000000ff', '#00004fff', '#000000ff', '#00002aff'], ['#d2691eff', '#8b4513ff'], ['#b22222ff', '#8b0000ff'], ['#fff5feff', '#f0ffffff', '#fff0f5ff', '#f0ffffff', '#fff5feff'], ['#00bfffff', '#98FB98ff', '#00bfffff'], ['#708090', '#008080','#708090'], ['#F8F8F8', '#FAFAFA', '#dddddd', '#F0F0F0', '#F8F8F8', '#FFFFFF','#FAFAFA', '#eeeeee', '#FFFFFF','#cccccc', '#F8F8F8', '#bbbbbb', '#FbFbFb','#aaaaaa','#F5F5F5', '#eeeeee','#FFFFff', '#F0F0F0'], ['#fff5feff', '#f0ffffff', '#fff0f5ff', '#f0ffffff', '#fff5feff']];
  var textColorArray = ['white', 'ivory', 'whitesmoke', 'gold', 'navy', 'mediumorchid', 'thistle', 'turquoise', 'black'];
  var fontArray = ['serif', 'cursive', 'cursive', 'cursive', 'sans-serif', 'serif', 'serif', 'monospace', 'monospace'];
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    
    class animationInterface {
      constructor(time) {
        this.time = time;
        this.time = {
            frameRate: 5,
            durationD: 500,
            durationR: 750
        };
      }
    }
    class Gradient {
  constructor(node, dim, cArray) {
    this.node = node;
    this.dim = dim;
    this.cArray = cArray;
    this.dim = {
      x0: 1,
      y0: 1,
      r0: 0.1,
      x1: 1,
      y1: 1,
      r1: 0.9,
    }
  }
  build() {
    var grad = ctx.createRadialGradient(
      (this.dim.x0*this.node.dim.x), (this.dim.y0*this.node.dim.y), (this.dim.r0*this.node.dim.radiusX),
      (this.dim.x1*this.node.dim.x), (this.dim.y1*this.node.dim.y), (this.dim.r1*this.node.dim.radiusX));
   this.cArray.forEach(addColor);
   return grad;
   function addColor(element, index, array){
    grad.addColorStop(((1/array.length)*(index+1)), element);
   }
  }
  }
  
    class GenreNode {
      constructor(index, name, design, dim) {
        this.index = index;
        this.name = name;
        this.design = design;
        this.dim = dim;
        this.design = {
          background: 'pink',
          textSize: 25,
          textColor: textColorArray[this.index],
          font: fontArray[this.index]
        };
        this.dim = {
          radiusX: Math.floor(ctxW / 16),
          radiusY: Math.floor(ctxH / 28),
          x: 0,
          y: 0,
          rotation: this.index,
        };
      }
      style() {
        ctx.font = this.design.textSize + 'px ' + this.design.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
      }
      buildHitRegions() {
        var hitRegion = new Path2D();
        hitRegion.moveTo(this.dim.x, this.dim.y);
        hitRegion.arc((this.dim.x + this.dim.radiusX), this.dim.y, this.dim.radiusY, (Math.PI * 3) / 2, Math.PI / 2, false);
        hitRegion.lineTo((this.dim.x - this.dim.radiusX), (this.dim.y + this.dim.radiusY));
        hitRegion.arc((this.dim.x - this.dim.radiusX), this.dim.y, this.dim.radiusY, Math.PI / 2, (Math.PI * 3) / 2, false);
        hitRegion.lineTo((this.dim.x + this.dim.radiusX), (this.dim.y - this.dim.radiusY));
        return hitRegion;
      }
      draw() {
        this.style();
        ctx.fillStyle = this.design.background.build();
        ctx.beginPath();
        ctx.arc((this.dim.x + this.dim.radiusX), this.dim.y, this.dim.radiusY, (Math.PI * 3) / 2, Math.PI / 2, false); // right side semi-circle
        ctx.lineTo((this.dim.x - this.dim.radiusX), (this.dim.y + this.dim.radiusY));
        ctx.arc((this.dim.x - this.dim.radiusX), this.dim.y, this.dim.radiusY, Math.PI / 2, (Math.PI * 3) / 2, false); // left side semi-circle
        ctx.lineTo((this.dim.x + this.dim.radiusX), (this.dim.y - this.dim.radiusY));
        ctx.fill();
        ctx.fillStyle = this.design.textColor;
        ctx.fillText(this.name, this.dim.x, this.dim.y, (this.dim.radiusX * 2.5));
      }
      position(direction, time){
        var listX = (ctxW*1.5)/(nodeCount*2);
        var listY = this.index*(ctxH/(nodeCount+1));
        var destX = ctxW/1.75;
        var destY = ctxH/7.5;
        if(direction=="on") {
        this.dim.x = (destX*time)+(listX*(1-time));
        this.dim.y = (destY*time)+(listY*(1-time));
        
      this.dim.radiusX = Math.floor((ctxW/20)+(ctxW/20)*(time));
      this.dim.radiusY = Math.floor((ctxH/30)+(ctxH/40)*(time));
      this.design.textSize = Math.floor(50/(2-time));     
        }
        else if (direction=="off") {
        this.dim.x = (listX*time)+(destX*(1-time));
        this.dim.y = (listY*time)+(destY*(1-time));
        
      this.dim.radiusX = Math.floor((ctxW/20)+(ctxW/20)*(1-time));
      this.dim.radiusY = Math.floor((ctxH/30)+(ctxH/40)*(1-time));
      this.design.textSize = Math.floor(50/(1+time));
      console.log("shrinking"+" "+this.dim.radiusX+" "+this.dim.radiusY+" "+this.design.textSize);
      }
      else {
      this.dim.x = listX;
      this.dim.y = listY;
      }
      }
    }
    var anim = new animationInterface();
    window.onload = init();
    canvas.addEventListener("click", interaction);
  
    function init() {
      for (let i = 1; i <= nodeCount; i++) {
        let g = pieceArray[i].genre;
        let newGenre = new GenreNode(i, g);
        let newGradient = new Gradient(newGenre);
        newGradient.cArray=gradArray[i];
        newGenre.design.background = newGradient;
        newGenre.position('stay', 1);
        newGenre.draw();
        genreArray.push(newGenre);
      }
    }
    function interaction(evt) {
      selectFromList = genreArray.map(node => ctx.isPointInPath(node.buildHitRegions(), evt.offsetX, evt.offsetY)).indexOf(true);
      if (selectFromList != -1) {
      if (firstTime){
      displayOff();
      returnToList = -1;
      }
      selectFromList += 1;
      firstTime = false;
      console.log("selectFromList "+selectFromList+" returnToList: "+returnToList); 
      genreArray.forEach(node => node.design.background.cArray = gradArray[node.index]);
      genreArray.forEach(node => {     
        if(node.index==selectFromList){
          node.design.font = 'fantasy';
          window.setTimeout(displayOn, anim.time.durationR*0.9, node);
          }
          else {
            node.design.font = fontArray[node.index];
          }
        })
      window.requestAnimationFrame(animateNodes);
    
      }
    }
  
    function animateNodes(timestamp) {
      if (start === undefined || start === 0) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      const timeIn = Math.min(elapsed / anim.time.durationR, 1);
      ctx.clearRect(0, 0, ctxW, ctxH);
      genreArray.forEach((node) => {
      if (node.index==selectFromList) {
      node.position('on', timeIn);
     
    }   
      else if (node.index==returnToList){
        node.position('off', timeIn);
        console.log('off');
      }
      else {
        node.position('stay', timeIn);
      }
      node.draw();
      });
      if (elapsed < anim.time.durationR) {
      window.setTimeout(window.requestAnimationFrame, anim.time.frameRate, animateNodes);
      } else {
        window.cancelAnimationFrame(animateNodes);
        start = 0;
        returnToList = selectFromList;
        };
        return;
      }
    
  function displayOn(node) {
   var index = node.index;
   $("#displayHeader").html(pieceArray[index].work.collectionTitle);
   $("table").css({
     "background-image": `radial-gradient(closest-side, ${gradArray[node.index].toString()})`,
     color: node.design.textColor
   });
   
  $("#displayBody").html("");
   for (let piece of pieceArray[index].work.collectionContents){
   let htmlString = `<tr><td style="width: ${ctxW/10}">${piece.title}</td><td><audio src='../media/audio/${piece.filename}' controls></audio></td></tr>`;
   $("#displayBody").append(htmlString);
   }
   $("#display").animate({
    opacity: 0.9,
   }, anim.time.durationD);
   }
   
   function displayOff(){
   $("#display").animate({
   opacity: 0,
   }, anim.time.durationD);
   }
  }
  else {
    console.log(":(");
  }
  })