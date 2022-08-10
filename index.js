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

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 130
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

// player1 left side of the screen 
const player1 = new Fighter ({
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
const player2 = new Fighter ({
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

// 
decreaseTimer()

// add player animation/velocity/speed
function animate (){
    window.requestAnimationFrame(animate),
    context.fillStyle= 'black'
    context.fillRect(0,0, canvas.width, canvas.height),
    background.update(),
    shop.update(),
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

    // end game based on health
    if (player1.health <= 0 || player2.health <= 0) {
        determineWinner({player1, player2, timerId})
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