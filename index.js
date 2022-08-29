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
  imageSrc: './img/player1/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
    
},
sprites: {
    idle:{
        imageSrc: './img/player1/Idle.png',
        framesMax: 8,
    },
    run:{
        imageSrc: './img/player1/Run.png',
        framesMax: 8,
    },
    jump:{
        imageSrc: './img/player1/Jump.png',
        framesMax: 2,
    },
    fall:{
        imageSrc: './img/player1/Fall.png',
        framesMax: 2,
    },
    attack1:{
        imageSrc: './img/player1/Attack1.png',
        framesMax: 6,
    },
    takeHit:{
        imageSrc: './img/player1/Take Hit - white silhouette.png',
        framesMax: 4,
    },
    death:{
        imageSrc: './img/player1/Death.png',
        framesMax: 6,
    },
    
},
attackBox: {
    offset: {
        x: 100,
        y: 50
    },
    width: 160,
    height: 50
}

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

//    colour
  colour: 'blue',

  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/player2/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
    
},
sprites: {
    idle:{
        imageSrc: './img/player2/Idle.png',
        framesMax: 4,
    },
    run:{
        imageSrc: './img/player2/Run.png',
        framesMax: 8,
    },
    jump:{
        imageSrc: './img/player2/Jump.png',
        framesMax: 2,
    },
    fall:{
        imageSrc: './img/player2/Fall.png',
        framesMax: 2,
    },
    attack1:{
        imageSrc: './img/player2/Attack1.png',
        framesMax: 4,
    },
    takeHit:{
        imageSrc: './img/player2/Take hit.png',
        framesMax: 3,
    },
    death:{
        imageSrc: './img/player2/Death.png',
        framesMax: 7,
    },
},
attackBox: {
    offset: {
        x: -170,
        y: 50
    },
    width: 170,
    height: 50
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
    context.fillStyle = 'rgba(255,255,255, 0.15)'
    context.fillRect(0,0, canvas.width, canvas.height),
    player1.update(),
    player2.update()
    
    player1.velocity.x = 0;
    player2.velocity.x = 0;
    

    // player1 movement
    if ( keys.a.pressed && player1.lastKey === "a") {
        player1.velocity.x =+ -5
        player1.switchSprite('run')
    } else if (keys.d.pressed && player1.lastKey === "d") {
        player1.velocity.x =+ 5
        player1.switchSprite('run')
    } else {
        player1.switchSprite('idle')
    }

    // player1 jump velocity (set using a conditional statement)
    if (player1.velocity.y < 0) {
        player1.switchSprite('jump')
    } else if (player1.velocity.y > 0) {
        player1.switchSprite('fall')
    }


    // player2 movement
    if ( keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
        player2.velocity.x =+ -5
        player2.switchSprite('run')
    } else if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
        player2.velocity.x =+ 5
        player2.switchSprite('run')
    } else {
        player2.switchSprite('idle')
    }

     // player2 jump velocity (set using a conditional statement)
     if (player2.velocity.y < 0) {
        player2.switchSprite('jump')
    } else if (player2.velocity.y > 0) {
        player2.switchSprite('fall')
    }

    //detect for collision within fighters on x and y axis 
    // use a conditional statement to determine that
    if (
        rectanglarCollision({
            rectangle1: player1,
            rectangle2: player2
        })
        && 
        player1.isAttacking && 
        player1.framesCurrent === 4
        ) {
        
        player2.takeHit()
        player1.isAttacking = false
        gsap.to('#player2Health', {
            width: player2.health + '%'
        })
    }  

    // player1 missing attack
    if (player1.isAttacking && player1.framesCurrent === 4) {
        player1.isAttacking = false
    }

    if (
        rectanglarCollision({
            rectangle1: player2,
            rectangle2: player1
        })
        && 
        player2.isAttacking && 
        player2.framesCurrent === 2
     ) {

        player1.takeHit()
        player2.isAttacking = false
        gsap.to('#player1Health', {
            width: player1.health + '%'
        })
    }  
    
    // player2 missing attack
    if (player2.isAttacking && player2.framesCurrent === 2) {
        player2.isAttacking = false
    }

    // end game based on health
    if (player1.health <= 0 || player2.health <= 0) {
        determineWinner({player1, player2, timerId})
    }
};
animate();

// add event listeners
window.addEventListener('keydown', (event) => {
        if(!player1.dead) {

        switch (event.key){
            case 'd':                       
              keys.d.pressed = true
              player1.lastKey= "d"
              break
            case 'a':                       
              keys.a.pressed = true
              player1.lastKey= "a"
              break
            case 'w':                       
              keys.w.pressed = true
              player1.velocity.y = -20
              break
            case ' ':                       
               player1.attack()
               break
        }
    }
     
     if(!player2.dead) {
     switch (event.key) {
        // player2
        case 'ArrowLeft':                       
          keys.ArrowLeft.pressed = true
          player2.lastKey = "ArrowLeft"
          break
        case 'ArrowRight':                       
          keys.ArrowRight.pressed = true
          player2.lastKey = "ArrowRight"
          break
        case 'ArrowUp':                       
          keys.ArrowUp.pressed = true
          player2.velocity.y = -20
          break
        case 'Enter':                       
          player2.attack()
          break
        }
    }

});


window.addEventListener('keyup', (event)=>{  
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