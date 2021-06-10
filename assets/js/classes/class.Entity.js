

class Entity{


    constructor(x, y, width, height, settings = {}){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.settings = Object.assign({ is_sprite:false, sprite:'', color:'red' }, settings)
    }


    __render(cxt){

        const X = this.x * this.width
        const Y = this.y * this.height

        if(this.settings.is_sprite){
            ctx.drawImage(this.settings.sprite, X, Y, this.width, this.height)
            return
        }

        ctx.fillStyle = this.settings.color;
        ctx.fillRect( X, Y, this.width, this.height)

    }


}