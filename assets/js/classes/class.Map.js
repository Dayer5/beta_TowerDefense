

class Map{


    constructor(tilecount, tilesize){
        this.tilecount = tilecount
        this.tilesize = tilesize

    }


    __setLevel(matrix){
        
        let tmp_lvl = []
        for (let y = 0; y < tileamount; y++) {
            tmp_lvl.push([])
            for (let x = 0; x < tileamount; x++) {
                tmp_lvl[y].push(new Tile(x, y, this.tilesize, this.tilesize, matrix[y][x]))
            }
        }
        this.lvl = tmp_lvl
    }



    __renderlvl(ctx){
        for (let y = 0; y < this.tilecount; y++) {
            for (let x = 0; x < this.tilecount; x++) {
                const TILE = this.lvl[y][x];
                TILE.__render(ctx)
                
            }
        }
    }
    
}