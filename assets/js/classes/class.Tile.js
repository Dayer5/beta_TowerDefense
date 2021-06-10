

class Tile extends Entity{


    constructor(x, y, width, height, type){
        super(x, y, width, height)
        this.__tileSprite(type)
    }

    __tileRender(ctx){
        var tileX = this.x*this.width
        var tileY = this.y*this.width
        ctx.fillRect(tileX, tileY, this.width, this.height)
        ctx.strokeRect(tileX, tileY, this.width, this.height)
    }


    __tileSprite(type){

        let img = new Image()

        switch (type) {
            case 'grass': 
                img.src = 'assets/image/TileGrass-TowerDefense.png'
                this.settings.sprite = img
                this.settings.is_sprite = true
            break;
            case 'road':
                img.src = 'assets/image/TileRoad-TowerDefense.png'
                this.settings.sprite = img
                this.settings.is_sprite = true
            break;
            case 'base':
                img.src = 'assets/image/TileBase-TowerDefense.png'
                this.settings.sprite = img
                this.settings.is_sprite = true
            break;
            case 'bush':
                img.src = 'assets/image/TileBush-TowerDefense.png'
                this.settings.sprite = img
                this.settings.is_sprite = true
            break;
        }
    }
}