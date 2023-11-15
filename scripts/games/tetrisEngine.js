//set up scene
function load() {
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
    class GameSquare {
        constructor(dims, color, geo, mat, obj){
            this.dims = dims;
            this.color = color;
            this.geo = geo;
            this.geo = new THREE.BoxGeometry(this.dims.x, this.dims.y, this.dims.z);
            this.mat = new THREE.MeshBasicMaterial({color: this.color});
            this.obj = new THREE.Mesh(this.geo, this.mat);
        }
    }
    class GamePiece {
        constructor(type, pixels) {
            this.type = type;
            this.pixels = pixels;
            this.pixels = [];

        }
        build() {
            var color;
            var relativePx = [];
            var relativePy = [];
            switch(this.type) {
                case "T":
                    color = 0xFFAA00;
                relativePx = [-1, 0, 1, 0];
                relativePy = [0, 0, 0, 1];
                break;
                case "L":
                    color = 0x3B00FF;
                    relativePx = [0, 0, 0, 1];
                    relativePy = [0, 1, 2, 2];

                break;
                case "J":
                    color = 0xFFAD00;
                    relativePx = [0, 0, 0, -1];
                    relativePy = [0, 1, 2, 2];

                break;
                case "S":
                    color = 0x00FF00;
                    relativePx = [0, 1, -1, 0];
                    relativePy = [0, 0, 1, 1];

                break;
                case "Z":
                    color = 0xFF0000;
                    relativePx = [-1, 0, 0, 1];
                    relativePy = [0, 0, 1, 1];

                break;
                case "O":
                    color = 0xFFF000;
                    relativePx = [-1, 0, -1, 0];
                    relativePy = [0, 0, 1, 1];

                break;
                case "I":
                    color = 0x00FFF0;
                    relativePx = [0, 0, 0, 0];
                    relativePy = [0, 1, 2, 3];
                break;
                default:
                break;
            }
            for(let i=0; i<4; i++){
                let newPixel =  new GameSquare({x:1, y:1, z:0}, color);
                newPixel.position.x = relativePx[i];
                newPixel.position.y = relativePy[i];
                this.pixels[i] = newPixel;
            }
        }





        }

    
    
   
        

    class Production {
        constructor(scene, camera, renderer, studio, paddle, mouseLog, movingPiece, staticPieces){
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera( -scale*ratioA, scale*ratioA, scale*ratioB, -scale*ratioB, 0, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( rWidth, rHeight);
        document.body.appendChild(this.renderer.domElement);
        this.studio = {
            nodeChains: []
        };
        this.camera.position.z = 50;
        }
        //call this last
        build() {
        s
        }
        
       
        
    }
        
        
        
        
    
    
    var myScene = new Production();
    myScene.build();
    window.addEventListener("keydown", logKey);
    var animate = function() {
    window.setTimeout(requestAnimationFrame, 20, animate);
    myScene.renderer.render(myScene.scene, myScene.camera);
    myScene.update();
    }
    animate();
    
    
    function logKey(evt){
        if(evt.key=="ArrowUp"); //
        else if(evt.key=="ArrowDown") myScene.ball.phys.velocity.y -= 0.01;
        else if(evt.key=="ArrowLeft") myScene.ball.phys.velocity.x -= 0.01;
        else if(evt.key=="ArrowRight") myScene.ball.phys.velocity.x += 0.01;
    }
    
}