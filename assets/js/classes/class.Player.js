

class Player{


    constructor(name,cash = 0){
        this.name = name
        this.base_health = 100
        this.cash = cash
    }


    __takeDamage(enemy_health){
        this.base_health -= enemy_health

        if(this.base_health <= 0){
            return false
        }

        return true
    }
}