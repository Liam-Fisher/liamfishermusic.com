$(document).ready(function(){
  var winH = window.innerHeight;
  var winW = window.innerWidth;
var colorArray = 
["red", "blue"];
var rectSquad = [];

let targetDiv = $("#svgHere");
var svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
targetDiv.append(svgNode);

class Rectangle {
constructor(index, W, H, filterA, filterB, filterT, filterDM, rect) {
  this.index = index;
  this.W = W;
  this.H = H;
  this.filterA = filterA;
  this.filterB = filterB;
  this.filterT = filterT;
  this.filterDM = filterDM;
  this.rect = rect;
  this.filterA = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  this.filterA.setAttributeNS(null, 'id', 'noise'+this.index);
  svgNode.appendChild(this.filterA);
  this.filterT =  document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
        this.filterT.setAttributeNS(null, 'type', 'turbulence');
        this.filterT.setAttributeNS(null, 'baseFrequency', 0.0006);
        this.filterT.setAttributeNS(null, 'numOctaves', 32);
        this.filterT.setAttributeNS(null, 'seed', 2);
        this.filterT.setAttributeNS(null, 'result', 'turbulence');
        this.filterA.appendChild(this.filterT);
    
        this.filterDM =  document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
        this.filterDM.setAttributeNS(null, 'in2', 'turbulence');
        this.filterDM.setAttributeNS(null, 'in1', 'SourceGraphic');
        this.filterDM.setAttributeNS(null, 'scale', 0.1);
        this.filterDM.setAttributeNS(null, 'xChannelSelector', 'R');
        this.filterDM.setAttributeNS(null, 'yChannelSelector', 'B');
        this.filterA.appendChild(this.filterDM);

        this.filterG =  document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        this.filterG.setAttributeNS(null, 'in1', 'SourceGraphic');
        this.filterG.setAttributeNS(null, 'stdDeviation', 10);
        this.filterA.appendChild(this.filterG);
  this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  this.rect.setAttributeNS(null, 'id', 'rect'+this.index);
  this.rect.setAttributeNS(null, 'filter', `url(#noise${this.index})`);
  this.rect.setAttributeNS(null, 'fill', colorArray[(this.index%2)]);
  svgNode.appendChild(this.rect);
  this.W = winW;
  this.H = winH;
}
coords(scale) {
let x, y, z;
      x = (this.W*-1)/(scale*scale)-this.W/25;
      y = (this.H)/(scale*2)-this.H/25;
      z = (scale/100)+0.01;
    return [x, y, z];
}
dims(scale) {
let w, h;
      w = (this.W*2.5)/(scale);
      h = (this.H*2.5)/(scale)-this.H/12.5;
    return [w, h];
}
filter(scale) {
let f, o, s, d;
    f = 1/(Math.pow(Math.sin(Math.round((scale/4)*Math.PI))+1, 1.5)*12);
    o = Math.round(((Math.sin(scale*4)+2)*4));
    d = Math.pow(scale, 1.5);
    s = scale;
  return [f, o, d, s];
}
find(scale) {
let dimx, dimy, dimz;
  [dimx, dimy, dimz] =  this.coords(scale);
   this.rect.setAttributeNS(null, 'x', dimx);
   this.rect.setAttributeNS(null, 'y', dimy);
   this.rect.setAttributeNS(null, 'opacity', dimz);
}
size(scale) {
  let dimw, dimh;
  [dimw, dimh] =  this.dims(scale);
  this.rect.setAttributeNS(null, 'width', dimw+'px');
  this.rect.setAttributeNS(null, 'height', dimh+'px');
}
distort(scale) {
  let dimf, dimo, dimd, dims;
  [dimf, dimo, dimd, dims] =  this.filter(scale);
  this.filterDM.setAttributeNS(null, 'scale', dims);
  this.filterT.setAttributeNS(null, 'numOctaves', dimo);
  this.filterT.setAttributeNS(null, 'baseFrequency', dimf);
  this.filterG.setAttributeNS(null, 'stdDeviation', dimd);
}
reshape(scale) {
this.find(scale);
this.size(scale);
this.distort(scale);
}
}

window.onload = init();

function init() {
    var VB = '0 0 ' + winW + ' ' + winH;
    svgNode.setAttributeNS(null, 'width', winW + 'px');
    svgNode.setAttributeNS(null, 'height', winH + 'px');
    svgNode.setAttributeNS(null, 'viewBox', VB);
    center = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    center.setAttributeNS(null, 'x', 0);
    center.setAttributeNS(null, 'y', 0);
    center.setAttributeNS(null, 'width', winW);
    center.setAttributeNS(null, 'height', winH);
    center.setAttributeNS(null, 'fill', '#2D383A');
    svgNode.appendChild(center);
    for (let i = 0; i<256; i++) {
      rectSquad[i] = new Rectangle(i);
      let newSize =16/(Math.log2(i+1)+1)+0.5;
      rectSquad[i].reshape(newSize);
    }
  }
}) 
