

class Tower extends Entity{


    constructor(x, y, width, height, type){
        super(x, y, width, height)
        this.damage = 1
        this.range = 1
        this.__towerSprite(type)

    }




    __updateTower(enemies){

        const cX = this.x
        const cY = this.y
        const r = this.range

        for (let index = 0; index < enemies.length; index++) {
            const e = enemies[index];
            
            //check top left
            if( 
                    (cX-r) <= e.x 
                    && (cX+r) >= e.x
                    && (cY-r) <= e.y
                    && (cY+r) >= e.y 
                ){
                    
                return { status:true, index:index }

            }
            
        }
        return {status:false}
    }



    __towerSprite(type){
        var img = new Image()

        switch (type) {
            case 'pistol':
                img.src = 'assets/image/TowerPistol-TowerDefense.png'
                this.settings.sprite = img
                this.settings.is_sprite=true
                this.damage = 1
                this.range = 2
            break;
            case 'hunter':
                img.src = 'assets/image/TowerHunter-TowerDefense.png'
                this.settings.sprite = img
                this.settings.is_sprite=true
                this.damage = 1
                this.range = 5
            break;
            case 'minigunner':
                img.src = 'assets/image/TowerMinigunner-TowerDefense.png'
                this.settings.sprite = img
                this.settings.is_sprite=true
                this.damage = 7
                this.range = 2
            break;
            case 'raygunner':
                img.src = 'assets/image/TowerRaygunner-TowerDefense.png'
                this.settings.sprite = img
                this.settings.is_sprite=true
                this.damage = 5
                this.range = 10
            break;
            case 'assassin':
                img.src = 'assets/image/TowerAssassin-TowerDefense.png'
                this.settings.sprite = img
                this.settings.is_sprite=true
                this.damage = 12
                this.range = 1
            break;
            case 'TEST':
                img.src = 'assets/image/TowerAssassin-TowerDefense.png'
                this.settings.sprite = img
                this.settings.is_sprite=false
                this.damage = 50
                this.range = 3
            break;
        }
    }
}