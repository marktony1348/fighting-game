// create the canvas variable 
const canvas = document.querySelector('canvas');
// create variable for the actualisation of a 2d game
const context = canvas.getContext('2d');

// define the canvas width and height (16:9) ratio
canvas.width = 1024;
canvas.height = 576;


// define global variable called gravity
const gravity = 0.7;

// define the background colour for the canvas using a method called for drawing
context.fillRect(0, 0, canvas.width, canvas.height);

// creating classes for players with their individual properties
class Sprite {
    constructor({position, velocity, colour = 'red', offset}) {
        this.position = position,
        this.velocity = velocity,
        this.width = 50
        this.height= 150
        this.lastKey
        this.attackBox = {
            position: {
              x: this.position.x,
              y: this.position.y
            },
            offset,     
            width: 100,
            height: 50
        }
        // colour props
        this.colour = colour
        // attacking props
        this.isAttacking 
        // health props
        this.health = 100
    }

    // define what our players will look like using draw method within constructor
    draw() {
      context.fillStyle = this.colour,    // player1 colour 
      context.fillRect(this.position.x, this.position.y, this.width, this.height)  

    //   attack mechanism
    if (this.isAttacking) {
    context.fillStyle = 'green'
    context.fillRect(
        this.attackBox.position.x, 
        this.attackBox.position.y, 
        this.attackBox.width, 
        this.attackBox.height
        )
      }
    }

    // new method which update the properties as we go along
    update() {
        this.draw()

        this.attackBox.position.x =this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y= 0
        } 
        else   this.velocity.y += gravity
    };

    attack () {
        this.isAttacking = true
        // time for attack
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
       

};

// player1 left side of the screen 
const player1 = new Sprite({
   position: {         //first sprite = position
    x:0,
    y:0
},
 velocity:{           //second sprite = velocity
    x:0,
    y:0 
 },

 offset: {
    x: 0,
    y: 0
  },
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
  },

//   enemy colour
  colour: 'blue',

  offset: {
    x: -50,
    y: 0
  }
 });

// create the keys for  players movement variable
const keys =  {
    // player 1
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed: false
    },

    // player2
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

// rectangle collision (atack weapons)
function rectanglarCollision ({ rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
         &&  rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width 
         && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
         &&  rectangle1.attackBox.position.y <= rectangle2.position.y + player2.height
    )
}

// add player animation/velocity/speed
function animate (){
    window.requestAnimationFrame(animate),
    context.fillStyle= 'black'
    context.fillRect(0,0, canvas.width, canvas.height),
    player1.update(),
    player2.update()
    
    player1.velocity.x = 0;
    player2.velocity.x = 0;
    

    // player1 movement
    if ( keys.d.pressed && player1.lastKey === "d") {
        player1.velocity.x =+ 5
    } else if (keys.a.pressed && player1.lastKey === "a") {
        player1.velocity.x =+ -5
    }

    // player2 movement
    if ( keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
        player2.velocity.x =+ -5
    } else if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
        player2.velocity.x =+ 5
    }

    //detect for collision within fighters on x and y axis 
    // use a conditional statement to determine that
    if (
        rectanglarCollision({
            rectangle1: player1,
            rectangle2: player2
        })
        && player1.isAttacking
         ) {
        player1.isAttacking = false
        player2.health -= 10
        document.querySelector('#player2Health').style.width = player2.health + '%'
    }  

    if (
        rectanglarCollision({
            rectangle1: player2,
            rectangle2: player1
        })
        && player2.isAttacking
         ) {
        player2.isAttacking = false
        player1.health -= 10
        document.querySelector('#player1Health').style.width = player1.health + '%'
    }  
};
animate();

// add event listeners
window.addEventListener('keydown', (event)=>{
    switch (event.key){
        case 'd':                       // player1 moves forward
          keys.d.pressed = true
          player1.lastKey= "d"
          break
        case 'a':                       // player1 moves backwards
          keys.a.pressed = true
          player1.lastKey= "a"
          break
        case 'w':                       // player1 jumps
          keys.w.pressed = true
          player1.velocity.y = -20
          break
        case ' ':                       // player1 attacks
           player1.attack()
          break
          
        // player2
        case 'ArrowLeft':                       // player2 moves forward
          keys.ArrowLeft.pressed = true
          player2.lastKey = "ArrowLeft"
          break
        case 'ArrowRight':                       // player2 moves backward
          keys.ArrowRight.pressed = true
          player2.lastKey = "ArrowRight"
          break
        case 'ArrowUp':                       // player2 jumps
          keys.ArrowUp.pressed = true
          player2.velocity.y = -20
          break
        case 'Enter':                       // player2 attacks
          player2.attack()
          break

        
        
    }


});
window.addEventListener('keyup', (event)=>{  //stops the player from moving outside the screen on the x axis
    // player1
    switch (event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
            case 'w':
            keys.w.pressed = false
            break

        // player2
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
            case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }


});