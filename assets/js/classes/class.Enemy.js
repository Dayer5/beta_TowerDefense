

class Enemy extends Entity{


    constructor(x, y, width, height, type){
        super(x, y, width, height, name)
        this.previousX = 0
        this.previousY = 2
        this.lastX = x--
        this.lastY = y
        this.current_health = 0
        this.max_health = 0
        this.facing = 'right'
        this.type = type
        this.__enemySprite(type)
    }



    __takeDamage(damage){
        this.current_health -= damage
        if(this.current_health <= 0){
            return true
        }
    }



    __renderEnemy(ctx){

        //calculate X,Y and health percent
        const X = this.x * this.width
        const Y = this.y * this.height

        let health_percent = ( this.current_health * 100 ) / this.max_health
        health_percent = (this.width / 100) * health_percent

        this.__render(ctx)

        //render health bar
        ctx.fillStyle = 'white'
        ctx.fillRect(X, Y, this.width, 3)
        ctx.fillStyle = 'red'
        ctx.fillRect(X, Y, health_percent, 3)

        ctx.strokeStyle = 'black'
        ctx.strokeRect(X, Y, this.width, 3)
        
    }




    __updateEnemy(matrix){

        //set the local variables for the current x and t
        let currentX = this.x
        let currentY = this.y

            if(currentX < 0){
                this.x++
                return false;
            }
    
    
            // console.log(currentY, currentX)
            // console.log(this.lastY, this.lastX)
            let cant = [ 'grass', 'bush' ]

    
            //check if enemy is at the base
            if(matrix[currentY][currentX] == 'base'){
                return true
            }
            
            // check right
            if( !cant.includes( matrix[currentY][currentX+1] )  && this.lastX != currentX+1){
                this.lastX = this.x
                this.lastY = this.y
                this.x++
                this.facing = 'Right'
                this.__updateSprite()
                return false
            } 

    
            //check down
            if( !cant.includes( matrix[currentY+1][currentX])  && this.lastY != currentY+1){
                this.lastY = this.y
                this.lastX = this.x
                this.y++
                this.facing = 'Down'
                this.__updateSprite()
                return false
            }
    
    
            //Check left
            if( !cant.includes( matrix[currentY][currentX - 1]) && this.lastX != currentX - 1 ){
                this.lastX = this.x
                this.lastY = this.y
                this.x--
                this.facing = 'Left'
                this.__updateSprite()
                return false
            }


            //Check  Up
            if( !cant.includes( matrix[currentY-1][currentX]) && this.lastY != currentY-1){
                this.lastX = this.x
                this.lastY = this.y
                this.y--
                this.facing = "Up"
                this.__updateSprite()
                return false
            }

    }




    __updateSprite(){
        this.settings.sprite.src = `assets/image/Enemy${this.type+this.facing}-TowerDefense.png`
    }




    __enemySprite(type){
        let img = new Image()
        switch (type) {
            case 'normal':
                img.src = `assets/image/Enemy${this.type}Right-TowerDefense.png`
                this.settings.sprite = img
                this.settings.is_sprite=true
                this.max_health = 5
                this.current_health = this.max_health
            break;
            case 'strong':
                img.src = `assets/image/Enemy${this.type}Right-TowerDefense.png`
                this.settings.sprite = img
                this.settings.is_sprite=true
                this.max_health = 12
                this.current_health = this.max_health
            break;
            case 'normal_boss':
                img.src = `assets/image/Enemy${this.type}Right-TowerDefense.png`
                this.settings.sprite = img
                this.settings.is_sprite=true
                this.max_health = 50
                this.current_health = this.max_health
            break;
            case 'hard_boss':
                img.src = `assets/image/Enemy${this.type}Right-TowerDefense.png`
                this.settings.sprite = img
                this.settings.is_sprite=true
                this.max_health = 300
                this.current_health = this.max_health
            break;
        }
    }

}