//set up scene
function load(){
//Global constants
const gravity = 0.000001;

const ctx = new AudioContext();
var rWidth = window.innerWidth/2;
var rHeight = window.innerHeight/1.25;
var ratioA = window.innerWidth / (window.innerHeight*4);
var ratioB = window.innerHeight / (window.innerWidth*1.25);
var disablePhys = true;
var scale = 25;
var bHeight = (rHeight*ratioB)/scale;
var bWidth = (rWidth*ratioA)/(scale*1.25);
console.log(rHeight, rWidth, ratioA, ratioB);



var panner = ctx.createPanner();
panner.panningModel = 'HRTF';
panner.distanceModel = 'inverse';
panner.refDistance = 1;
panner.maxDistance = 10000;
panner.rolloffFactor = 0.1;
panner.coneInnerAngle = 30;
panner.coneOuterAngle = 0;
panner.coneOuterGain = 0.1;

  panner.orientationX.setValueAtTime(1, ctx.currentTime);
  panner.orientationY.setValueAtTime(0, ctx.currentTime);
  panner.orientationZ.setValueAtTime(0, ctx.currentTime);


var listener = ctx.listener;

  listener.forwardX.setValueAtTime(0, ctx.currentTime);
  listener.forwardY.setValueAtTime(0, ctx.currentTime);
  listener.forwardZ.setValueAtTime(-1, ctx.currentTime);
  listener.upX.setValueAtTime(0, ctx.currentTime);
  listener.upY.setValueAtTime(0, ctx.currentTime);
  listener.upZ.setValueAtTime(0, ctx.currentTime);


//sound classes
class NodeChain{
    constructor(initNode, nodes, outPan, outGain) {
        this.initNode = initNode;
        this.nodes = [];
        if(initNode) this.nodes.push(initNode);
        else initNode = ctx.createOscillator();
        if(outPan) this.outPan = outPan;
        else this.outPan = ctx.createStereoPanner();
        if(outGain) this.outGain = outGain;
        else this.outGain = ctx.createGain();
    }
    connectChain() {
        this.nodes.forEach((node, index, array) => {
            if(array.length>index+1) {
            node.connect(array[index+1]);
            }
            else {
            node.connect(this.outPan);
        }});
            this.outPan.connect(this.outGain);
            this.outGain.connect(ctx.destination);
            this.initNode.start();
    }
}
//Object classes
class GamePiece {
    constructor(dims, color, geo, mat, obj){
        this.dims = dims;
        this.color = color;
        this.geo = geo;
        if(this.dims.x) this.geo = new THREE.BoxGeometry(this.dims.x, this.dims.y, this.dims.z);
        else if (this.dims.r) this.geo = new THREE.SphereGeometry(this.dims.r, 64, 64);
        this.mat = new THREE.MeshBasicMaterial({color: this.color});
        this.obj = new THREE.Mesh(this.geo, this.mat);
    }
}

class Paddle extends GamePiece {
constructor(dims, color, sensitivity) {
super(dims, color);
this.sensitivity = sensitivity;
this.obj.position.x = 0;
this.obj.position.y = -(((rHeight*ratioB)/scale)-this.dims.y/2);
}

}
class Ball extends GamePiece {
      constructor(dims, color, phys, interfaceNode, nodeChain){
        super(dims, color);
        this.phys = new Physics();
        this.interfaceNode = ctx.createOscillator();
        this.interfaceNode.frequency.value = 220;
        this.interfaceNode.type = 'square';
        this.nodeChain = new NodeChain(this.interfaceNode);
        this.obj.position.y = -(((rHeight*ratioB)/scale)+this.dims.r);
        this.phys.position.y = -(((rHeight*ratioB)/scale)+this.dims.r);
}
    paddleCollisionCheck(paddle) {
    if(this.phys.position.y <= (paddle.obj.position.y+paddle.dims.y+this.dims.r)) {
        if ((this.phys.position.x<=(paddle.obj.position.x+paddle.dims.x+this.dims.r))&&(this.phys.position.x>=(paddle.obj.position.x-(paddle.dims.x+this.dims.r)))) {
           this.phys.position.y = paddle.obj.position.y+paddle.dims.y+this.dims.r;
           this.phys.bounce("h");
}
        else {
            window.alert('gameOver');
            return "gameOver";
        }
    }
}
    wallCollisionCheck() {
    if(this.phys.position.x >= (bWidth+this.dims.r)) {
        this.phys.bounce("v");
    } 
    else if(this.phys.position.x <= -(bWidth+this.dims.r)) {
        
        this.phys.bounce("v");
    }
              else if(this.phys.position.y >= (bHeight+this.dims.r)){
              this.phys.position.y = (bHeight+this.dims.r);
              this.phys.bounce("h");
          }
    }
    sound(){
        var initP = this.interfaceNode.frequency.value;
        var hypot = Math.hypot(this.phys.acceleration.x, this.phys.acceleration.y);
        var sourceVel = Math.cos(this.phys.acceleration.x/hypot)*hypot*Math.sign(this.phys.velocity.y);
        var pChange = initP*sourceVel*10;
        //then frequencyShifts 
        this.interfaceNode.frequency.value -= pChange;
        
        this.nodeChain.outPan.pan.value = (this.phys.position.x)/bWidth;
        this.nodeChain.outGain.value = (this.phys.position.y+(0.5*bHeight))/bHeight;
    }
    update(paddle) {
        this.phys.update();
        this.paddleCollisionCheck(paddle);
        this.wallCollisionCheck();
        this.sound();
        this.obj.position.x = this.phys.position.x;
        this.obj.position.y = this.phys.position.y;
    }
}


class Brick extends GamePiece {
    constructor(dims, color, params, interfaceNode, nodeChain) {
        super(dims, color);
        if(!params) this.params = {frequency: 440, type: "sine"};
        else this.params = params;
        if(!interfaceNode) this.interfaceNode = ctx.createOscillator();
        else this.interfaceNode = interfaceNode;
        this.interfaceNode.frequency.value = this.params.frequency;
        this.interfaceNode.type = 'sine';
        if (!nodeChain) this.nodeChain = new NodeChain(this.interfaceNode);
        else this.nodeChain = nodeChain;        
}
    break(ballPhys)
    { 
} 
sound() {
    var hypot = Math.hypot(this.phys.acceleration.x, this.phys.acceleration.y);
    //then frequencyShifts 
    console.log(hypot);
    this.nodeChain.outGain.linearRampToValueAtTime(0, ctx.currentTime+1000/(hypot+0.01));
    }
}
    
//interface classes
class Physics {
    constructor(mass, restitution, position, velocity, acceleration, g){
        this.position = {
            x: 0,
            y: 0
        };
        this.velocity = {
            x: 0.001,
            y: 0.001
        };
        this.acceleration = {
            x: 0.0001,
            y: 0
        };
        if(mass) this.mass = mass;
        else this.mass = 5;
        if(mass) this.restitution = restitution;
        else this.restitution = 0.9;
        this.g = gravity;
    }
    get direction(){
        var direction;
        if(this.velocity.x>0) {
            if(this.velocity.y>0) {
            direction = "NE";
            }
            else {
            direction = "SE";
            }
        }
           else {
            if(this.velocity.y>0){
            direction = "NW";
            }
            else {
            direction = "NE";
            }
        }
        return direction;
}
    
    bounce(POI){ 
        if(POI=="v"){
        this.acceleration.x *= -this.restitution;
        this.velocity.x *= -1;
        } 
        else if (POI=="h") {
        this.acceleration.y *= -this.restitution;
        this.velocity.y *= -1;
        }
    }
    update() {
        //gravity - may be tweaked
        this.acceleration.y -= this.g;
        //friction
        this.acceleration.x *= 0.99999;
        this.acceleration.y *= 0.99999;
        //kinematics
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Production {
    constructor(scene, camera, renderer, studio, paddle, mouseLog, ball, brickArray){
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera( -scale*ratioA, scale*ratioA, scale*ratioB, -scale*ratioB, 0, 1000 );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( rWidth, rHeight);
    document.body.appendChild(this.renderer.domElement);
    this.studio = {
        nodeChains: []
    };
    this.camera.position.z = 50;	
    this.paddle = new Paddle({x: 2.4, y: 0.2, z:0}, 60000, 1);
    this.mouseLog = [];
    this.ball = new Ball({r: 0.2}, 250);
    this.brickArray = [];
    this.brickFactory(2);
    }
    //call this last
    build() {
        //build scene
        this.scene.add(this.paddle.obj);
        this.scene.add(this.ball.obj);
        this.brickArray.forEach(brick => this.scene.add(brick.obj));
        //build audio
        // this.brickArray.forEach(brick => brick.nodeChain.connectChain());
        this.ball.nodeChain.connectChain();
    }
    brickFactory(n) {
        for(let i=0; i<n; i++){
            let newColor = 65535;
            let itom = ((i+24)*2)-72;
            let mtof = 440*Math.pow(2,(itom/12)); // make this into a class with seperate components
            let newBrick = new Brick({x: 1.6, y: 0.4, z: 0}, newColor, {frequency: mtof, type:"sine"});
            newBrick.obj.position.x = -bWidth+(bWidth/((n+1)/2))*(i+1);
            
            newBrick.obj.position.y = bHeight-(Math.abs((bHeight/2)-(bHeight/n)*i)*2);
            newBrick.obj.position.z = 0;
            this.brickArray.push(newBrick);
        };
    }
    brickCollisionCheck() {
        for(var i=0; i<this.brickArray.length; i++) {
            checker.call(this, i, this.brickArray[i], this.ball);
        }
        function checker(index, brick, ball) {
            var brickPos = brick.obj.position;
            var ballPos = ball.obj.position;
            var rX = ball.dims.r+brick.dims.x;
            var rY = ball.dims.r+brick.dims.y;
        if(((ballPos.x<brickPos.x+rX)&&(ballPos.x>brickPos.x-rX))&&((ballPos.y<brickPos.y+rY)&&(ballPos.y>brickPos.y-rY))) 
        {
        if(Math.abs(ballPos.x-(brickPos.x+rX))<Math.abs(ballPos.y-(brickPos.y+rY))) ball.phys.bounce("v");
        else ball.phys.bounce("h");
        brick.break(ball.phys);
        this.scene.remove(brick.obj);
        this.brickArray.splice(index, 1);
        }
    }
}
    logMouse = (e) => {
        var newPos = (e.clientX-window.innerWidth/4)/(window.innerWidth/64);
        if(newPos>(bWidth-this.ball.dims.r)) newPos = bWidth-this.ball.dims.r;
        else if (newPos<-(bWidth-this.ball.dims.r)) newPos = -(bWidth-this.ball.dims.r);
        this.paddle.obj.position.x = newPos;
    }
    uiPhys(){
        if(this.mouseLog.length==0) this.mouseLog.push(this.ball.paddle.obj.position.x);
        else {
            let vel = (this.mouseLog[0]-this.mouseLog[1]);
            this.mouseLog.pop();
            this.mouseLog.push(this.ball.paddle.obj.position.x);
            return vel;
        } 
    }
    
    update() {
        this.brickCollisionCheck();
        this.ball.update(this.paddle);
    }
    
}

var myScene = new Production();
myScene.build();
myScene.renderer.domElement.addEventListener("mousemove", myScene.logMouse);
window.addEventListener("keydown", logKey);
var animate = function() {
window.setTimeout(requestAnimationFrame, 20, animate);
myScene.renderer.render(myScene.scene, myScene.camera);
myScene.update();
}
animate();


function logKey(evt){
    if(evt.key=="ArrowUp") myScene.ball.phys.velocity.y += 0.01;
    else if(evt.key=="ArrowDown") myScene.ball.phys.velocity.y -= 0.01;
    else if(evt.key=="ArrowLeft") myScene.ball.phys.velocity.x -= 0.01;
    else if(evt.key=="ArrowRight") myScene.ball.phys.velocity.x += 0.01;
}

}