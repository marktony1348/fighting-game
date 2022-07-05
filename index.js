// create the canvas variable 
const canvas = document.querySelector('canvas');
// create variable for the actualisation of a 2d game
const context = canvas.getContext('2d');

// define the canvas width and height (16:9) ratio
canvas.width = 1024;
canvas.height = 576;


// define global variable called gravity
const gravity = 0.2;

// define the background colour for the canvas using a method called for drawing
context.fillRect(0, 0, canvas.width, canvas.height);

// creating classes for players with their individual properties
class Sprite {
    constructor({position, velocity}) {
        this.position = position,
        this.velocity = velocity,
        this.height= 150 
    }
    // define what our players will look like using draw method within constructor
    draw() {
      context.fillStyle = 'red',    // player1 colour 
      context.fillRect(this.position.x, this.position.y, 50, this.height)  
    }

    // new method which update the properties as we go along
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y= 0
        } 
        else   this.velocity.y += gravity
    };
};

// player1 left side of the screen 
const player1 = new Sprite({
   position: {             //first sprite = position
    x:0,
    y:0
},
 velocity:{                 //second sprite = velocity
    x:0,
    y:0 
 }
});

// player 2 right side of the screen
const player2 = new Sprite({
    position: {             
     x:500,
     y:100
 },
  velocity:{
     x:0,
     y:0  
  }
 });

// create the keys for  players movement variable
const keys =  {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
  
}
// add animation/velocity 
function animate (){
    window.requestAnimationFrame(animate),
    context.fillStyle= 'black'
    context.fillRect(0,0, canvas.width, canvas.height),
    player1.update(),
    player2.update()

    if ( keys.d.pressed) {
        player1.velocity.x =+ 1
    } else if (keys.a.pressed) {
        player1.velocity.x =+ -1
    }
};
animate();

// add event listeners
window.addEventListener('keydown', (event)=>{
    switch (event.key){
        case 'd':                       // player moves forward
          keys.d.pressed = true
          break
        case 'a':                       // player moves forward
          keys.a.pressed = true
          break
    }
    console.log(event.key)

});
window.addEventListener('keyup', (event)=>{  //stops the player from moving outside the screen on the x axis
    switch (event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    console.log(event.key)

});