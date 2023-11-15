         var brickArray = [];
         var scene = new THREE.Scene();
         var ratioA = window.innerWidth / (window.innerHeight*4);
         var ratioB = window.innerHeight / (window.innerWidth*1.25);
var camera = new THREE.OrthographicCamera( -25*ratioA, 25*ratioA, 25*ratioB, -25*ratioB, 0, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/1.25);
document.body.appendChild( renderer.domElement );
renderer.domElement.addEventListener("mousemove", logMouse);
var paddleGeo = new THREE.BoxGeometry(5.9, 0.25, 0.001);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
         var paddle = new THREE.Mesh( paddleGeo, material );
         paddle.position.y = -9;
         class Physics{
             constructor(position, velocity, acceleration, impulse, mass){
                 this.position = {
                     x: 0,
                     y: 0
                 };
                 this.velocity = {
                     x: 0,
                     y: 0
                 };
                 this.acceleration = {
                     x: 0.0001,
                     y: 0
                 }
                 
                 this.mass = 0.5;
             }
             applyForce(x, y){
                 this.acceleration.x += x/this.mass;
                 this.acceleration.y += y/this.mass;
             }
             update() {
                 //gravity - may be tweaked
                 this.acceleration.y -= 0.00005;
                 //keep it interesting
                 this.acceleration.x += Math.random()*0.00001;
                 this.acceleration.y += Math.random()*0.00001;
                 this.velocity.x += this.acceleration.x;
                 this.velocity.y += this.acceleration.y;
                 this.position.x += this.velocity.x;
                 this.position.y += this.velocity.y; 
             }
         }
         class Ball {
             constructor(restitution, ballGeo, ballMat, ballObj, physProps){
                 this.restitution = restitution;
                 this.ballGeo = new THREE.SphereGeometry( 0.5, 64, 64 );
                 this.ballMat = new THREE.MeshBasicMaterial( {color: 0xffff00} );
                 this.ballObj = new THREE.Mesh( this.ballGeo, this.ballMat );
                 this.phys = new Physics();
             }
             bounce(restitutionIn) {
                 this.phys.acceleration.x *= -restitutionIn.x;
                 this.phys.acceleration.y *= -restitutionIn.y;
                 this.phys.velocity.x *= -restitutionIn.x;
                 this.phys.velocity.y *= -restitutionIn.y;
                 
             }
             update() {
                 this.phys.update();
                 this.ballObj.position.x = this.phys.position.x;
                 this.ballObj.position.y = this.phys.position.y;
                 this.ballObj.position.z = 0; 
             }
         }
         class Brick {
            constructor(color, position, brickGeo, brickMat, brickObj) {
                this.color = color;
                this.position = position;
                this.brickGeo = new THREE.BoxGeometry(2, 0.5, 0.1);
                this.brickMat = new THREE.MeshBasicMaterial({color: this.color});
                this.brickObj = new THREE.Mesh(this.brickGeo, this.brickMat);
                this.brickObj.position.x = position.x;
                this.brickObj.position.y = position.y;
            }
         }

var backWallGeo =  new THREE.BoxGeometry(25, 24, 0.1);
var materialWall = new THREE.MeshBasicMaterial( { color: 0x293033 } );
var backWall = new THREE.Mesh( backWallGeo, materialWall );
backWall.position.z = -0.2
var sphere = new Ball(1);
scene.add(backWall);
scene.add(sphere.ballObj);
buildBricks();
scene.add(paddle);
camera.position.z = 50;	
var animate = function () {
requestAnimationFrame( animate );
renderer.render( scene, camera );
doPhysics();
};

animate();
function buildBricks(){
for(let i=0; i<12; i++){
let newColor = (Math.round(Math.random()*65536));

let newPosition = {
    x: ((i%6)-2.5)*4,
    y: Math.floor(i/6)*2
};
console.log(newPosition);
let newBrick = new Brick(newColor, newPosition, 0.51);
console.log(newBrick);
scene.add(newBrick.brickObj)
brickArray.push(newBrick);
}

}
function logMouse(e) {
    var newPos = (e.clientX-window.innerWidth/4)*(12/(window.innerWidth/4));
    if(newPos>9.75) newPos = 9.75;
    else if (newPos<-9.75) newPos = -9.75;
    paddle.position.x = newPos;
}
function doPhysics() {
    wallPhysics();
    ballPhysics();
    brickPhysics();              
    sphere.update();
          }

function wallPhysics(){
    if(sphere.phys.position.x >= 12.25) {
        sphere.bounce({x: 1.005, y: -1});
        console.log("Rwallbounce");
    } 
    else if(sphere.phys.position.x <= -12.25) {
        sphere.bounce({x: 1.005, y: -1});
        console.log("Lwallbounce");
    }
              else if(sphere.phys.position.y >= 8.5){
              sphere.phys.position.y = 8;
              sphere.bounce({x: -1.001, y: 0.51});
              console.log("Uwallbounce");
          } 
}
function ballPhysics(){
    if(sphere.phys.position.y <= -8.25) {
        if ((sphere.phys.position.x<=(paddle.position.x+3.5))&&(sphere.phys.position.x>=(paddle.position.x-3.5))) {
           console.log("paddlebounce", (sphere.phys.position.x-paddle.position.x)/2)
           sphere.phys.position.y = -8;
           if((sphere.phys.position.x-paddle.position.x)>0){
               var xOffset = 1-(sphere.phys.position.x-paddle.position.x)/100;
           }
               else {
                var xOffset = -1-(sphere.phys.position.x-paddle.position.x)/100;
               }
           sphere.bounce({x: xOffset, y: 0.99});
        }
        else {
            window.alert('gameOver');
            console.log("gameOver");
            cancelAnimationFrame(animate);
        }
        }
}
function brickPhysics(){
brickArray.forEach(breakBricks);
function breakBricks(element, index, array){
if(((sphere.phys.position.x>(element.brickObj.position.x-1))&&(sphere.phys.position.x<(element.brickObj.position.x+1)))&&((sphere.phys.position.y>(element.brickObj.position.y-0.25))&&(sphere.phys.position.y<(element.brickObj.position.x+0.25)))){
    delete element;
    console.log("bang");
}

}
}
