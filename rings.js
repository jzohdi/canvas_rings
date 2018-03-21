var canvas = document.getElementById('map-canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cb = canvas.getContext('2d');

// var mouse = {
//   x: undefined,
//   y: undefined
// }


function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// window.addEventListener("mousemove", function(){
//   mouse.x = event.clientX;
//   mouse.y = event.clientY;
// });

function eightDeci(x) {
  return parseFloat(Number.parseFloat(x).toFixed(8));
}
var twoPi = eightDeci(Math.PI*2);

function Ring(radius, width, start, length){
  this.dStart = Math.random()/100
  this.x = innerWidth/2;
  this.y = innerHeight/2;
  this.radius = radius;
  this.width = width;
  this.start = start;
  this.length = length;
  this.direction = getRndInteger(5, 10);

  this.draw = function(){
    cb.beginPath();
    cb.arc(this.x, this.y, this.radius, this.start % (2*Math.PI), (this.start %(2*Math.PI)) + this.length*Math.PI);
    cb.lineCap = 'round';
    cb.lineWidth = this.width;
    // cb.strokeStyle = 'black';
    cb.stroke();
  }

  this.reverse = function(){
    this.dStart = -this.dStart;
  }

  this.update = function(){
    if (this.direction < 8){
    this.start += this.dStart;
    }
    else if (this.direction >=8) {
      this.start -= this.dStart;
    }
    // if (mouse.x >= (innerHeight/2)-600 && mouse.x <= (innerWidth/2)+600 && mouse.y >= (innerHeight/2)-400 && mouse.y <= (innerHeight/2)+400){
    //   this.x = mouse.x;
    //   this.y = mouse.y;
    // }
    // else {
    //   this.x = innerWidth/2;
    //   this.y = innerHeight/2;
    // }
    this.draw();
  }
}

var ringArray = []
for ( var i = 60; i < 600; i=i+10){

  ringArray.push(new Ring(i, 15, (Math.random()*2)*Math.PI, Math.random()*2));
}
// var rings = new Ring(200, 20, (Math.random()*2)*Math.PI, Math.random()*2);
window.addEventListener("click", function(){
  for (var x = 0; x < ringArray.length; x++){
  ringArray[x].reverse();
  }
});
function animate(){
  requestAnimationFrame(animate);
  cb.clearRect(0, 0, innerWidth, innerHeight);

  for (var x = 0; x < ringArray.length; x++){
  ringArray[x].update();
  }
}

animate();
// cb.beginPath();
// cb.arc(0, 0, 100, 1.5*Math.PI, Math.PI, false);
// cb.lineCap = 'round';
// cb.lineWidth = 30;
// cb.strokeStyle = 'black';
// cb.stroke();
