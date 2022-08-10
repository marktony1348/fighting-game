
// creating classes for the background
class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1}) {
        this.position = position,
        this.width = 50
        this.height= 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        // to slow the animation down ON THE SHOP IMAGE
        this.framesElapsed = 0,
        this.framesHold= 15
       
    }

    // define what our background will look like using draw method within constructor
    draw() {
        context.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,

            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale 
            )
     }

    // new method which update the background properties as we go along
    update() {
        this.draw()
        this.framesElapsed++
            if (this.framesElapsed % this.framesHold === 0) {
                // frame animation using a loop CALLING THE IF STATEMENTS
            if (this.framesCurrent < this.framesMax -1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }

        }   
    }
}


// creating classes for players with their individual properties
class Fighter {
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

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
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