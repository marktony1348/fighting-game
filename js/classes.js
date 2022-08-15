
// creating classes for the background
class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {
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
        this.framesHold= 15,
        this.offset = offset
       
    }

    // define what our background will look like using draw method within constructor
    draw() {
        context.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,

            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale 
            )
     }

     animateFrames() {
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

    
     // new method which update the background properties as we go along
    update() {
        this.draw()
        this.animateFrames()
    }
}


// creating classes for players with their individual properties
class Fighter  extends Sprite {
    constructor({position, 
        velocity,                              //note: anytime u update here always remeber to update property below
        colour = 'red', 
        imageSrc, 
        scale = 1, 
        framesMax = 1,   
        offset = {x: 0, y: 0}, 
        sprites}) {

        super ({                        //super used to inherite the parent constructor above 
            position,
            imageSrc,
            scale,
            framesMax,
            offset
          
        })

        // properties
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
        this.framesCurrent = 0
        // to slow the animation
        this.framesElapsed = 0,
        this.framesHold= 5

        this.sprites = sprites
        // to be able to loop through our sprites eg idle run etc
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image(),
            sprites[sprite].image.src = sprites[sprite].imageSrc

        }
       console.log(this.sprites);

    }

    // define what our players will look like using draw method within constructor
   

    // new method which update the properties as we go along
    update() {
        this.draw()
        this.animateFrames()

        this.attackBox.position.x =this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        // gravity fucntion
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y= 0
            this.position.y = 330
        } 
        else   this.velocity.y += gravity
    };

    attack () {
        this.switchSprite('attack1')
        this.isAttacking = true
        // time for attack
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }     

    switchSprite (sprite) {
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax -1 ) return
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                this.framesCurrent = 0
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                this.image = this.sprites.run.image
                this.framesMax = this.sprites.run.framesMax
                this.framesCurrent = 0
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
                }
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                this.image = this.sprites.fall.image
                this.framesMax = this.sprites.fall.framesMax
                this.framesCurrent = 0
                }
                break;
            case 'attack1':
                    if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                    }
                break;
        }
    }
};