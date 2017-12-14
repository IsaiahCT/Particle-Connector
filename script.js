
window.onload = function (){

window.requestAnimFrame = (function(){
return  window.requestAnimationFrame||
    function( callback ){
    window.setTimeout(callback,1000 / 60);
    };
})();


var canvas = document.getElementById("c");


var ctx = canvas.getContext("2d");

var W = window.innerWidth, H = window.innerHeight;
canvas.width = W;
canvas.height = H;


let ask = prompt('how many particles would you like?\nPlease Note this will be limited to 200')
if (parseInt(ask) > 201) {
  alert('nope, can\'t do that')
  ask= 200;
}
var particleCount = ask,
particles = [],
minDist = 70,
dist;


function paintCanvas() {
// Set the fill color to black
ctx.fillStyle = "rgba(0,0,0,1)";


ctx.fillRect(0,0,W,H);
}

function Particle() {

this.x = Math.random() * W;
this.y = Math.random() * H;



this.vx = -1 + Math.random() * 2;
this.vy = -1 + Math.random() * 2;

this.radius = 4;

this.draw = function() {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);


  ctx.fill();
}
}


for(var i = 0; i < particleCount; i++) {
particles.push(new Particle());
}

function draw() {

paintCanvas();


for (var i = 0; i < particles.length; i++) {
  p = particles[i];
  p.draw();
}


update();
}


function update() {


for (var i = 0; i < particles.length; i++) {
  p = particles[i];

  p.x += p.vx;
  p.y += p.vy


  if(p.x + p.radius > W)
    p.x = p.radius;

  else if(p.x - p.radius < 0) {
    p.x = W - p.radius;
  }

  if(p.y + p.radius > H)
    p.y = p.radius;

  else if(p.y - p.radius < 0) {
    p.y = H - p.radius;
  }

  for(var j = i + 1; j < particles.length; j++) {
    p2 = particles[j];
    distance(p, p2);
  }

}
}

function distance(p1, p2) {
var dist,
  dx = p1.x - p2.x,
  dy = p1.y - p2.y;

dist = Math.sqrt(dx*dx + dy*dy);


if(dist <= minDist) {

  // Draw the line
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,255,255,"+ (1.2-dist/minDist) +")";
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.closePath();

  var ax = dx/5000,
    ay = dy/5000;

  p1.vx -= ax;
  p1.vy -= ay;

  p2.vx += ax;
  p2.vy += ay;
}
}


function animloop() {
draw();
requestAnimFrame(animloop);
}

animloop();
};
