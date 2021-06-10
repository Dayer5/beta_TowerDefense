
        //Canvas DOM manipulation
        var canvas = document.getElementById('canvasID')
        var ctx = canvas.getContext('2d')


        // DOM manipulation
        var cash_element = document.getElementById("cash")
        var life_element = document.getElementById('Base HP')
        var tutorial_text = document.getElementById('tutorial_text')


        //variables
        let map
        let matrix
        let game_started = false
        let current_level = 1
        let tileamount
        var enemies = []
        var towers = []
        var tilesize
        var game_loop_interval
        var selected_tower
        var efbadb452739 = "coolgame"
        var name = prompt('Type your username:')
        var code = prompt('Inter Cheat Code: ')
        let purchased_tower = { status:false, type:'' }
        let start_offset = false

        //Player Data
        player = new Player(name,0)

        //Entry point of the game
        init()
        function init(){
            loadLevel()
        }

        //Function StopGame
        function stopGame(){
            game_started = false
            clearInterval(game_loop_interval)
        }

        //Function LoadLevel
        function loadLevel(){
            fetch(`assets/js/levels/lvl${current_level}.json`)
            .then( r => r.json() )
            .then(function(r){

                matrix = r.level
                tileamount = matrix.length
                tilesize = canvas.width/tileamount
                //Creating enemies
                for (let index = 0; index < r.enemies.length; index++) {
                    const e = r.enemies[index];
                    enemies.push( new Enemy(e.x, e.y, tilesize, tilesize, e.type) )
                }

                player.cash += r.cash
                // Start the game logic
                alert(`You have ${r.timeout/1000} seconds of headstart before the enemies`)
                setTimeout( function(){
                    start_offset = true
                }, r.timeout)
                gameSetup()
            })
        }
    


    
        //Function GameSetUp
        function gameSetup(){
        
            if(code == efbadb452739){
                player.cash = 99999999999999
                player.base_health = 99999999999999
            }
            if(name!=''){
                tutorial_text.innerHTML= 'Wellcome '+ name+ '! This is a Tower Defense game made by David!'
            }else{
                tutorial_text.innerHTML = 'Welcome, this is a Tower Defense game made by David!'
            }

            map = new Map(tileamount, tilesize)
            map.__setLevel(matrix)


            //Frames per second (fps) settup
            game_loop_interval = setInterval(function(){
                gameLoop(ctx)
            }, 1000/3)
            game_started = true


            

        }


        //Function Update

        function update(){

            //Stop the game when there are no enemies left
            if (enemies.length < 1) {
                stopGame()
                //If base HP is higher than 0 then ask to go to the next level
                if(player.base_health > 0){
                    let next = confirm(`You won this time ${player.name}, next level?`)
                    if(next){
                        current_level++
                        stopGame()
                        loadLevel()
                    }
                    
                }

            }


            //Use the remove_enemies array to remove the dead enemies
            let remove_enemies = []
            for (let index = 0; index < towers.length; index++) {
                const t = towers[index];
                let check = t.__updateTower(enemies)
                if(check.status){
                    if( enemies[check.index].__takeDamage(t.damage)){
                        enemies.splice(check.index, 1)
                    }
                }
            }

            //Update the base HP and remove the enemy when it reaches the base
            for (let index = 0; index < enemies.length; index++) {
                if(enemies[index].__updateEnemy(matrix)){
                    player.__takeDamage(enemies[index].current_health)
                    remove_enemies.push(index)
                }
            }

            for (let index = 0; index < remove_enemies.length; index++) {
                enemies.splice(remove_enemies[index], 1)
            }

            //If base HP is lower than 1 then alert "You Lost"
            if(player.base_health < 1){
                alert('You Lost')
            }

        }



        //Function Render
        function render(ctx){


            //Update player cash and base HP
            life_element.innerHTML = 'HP: '+player.base_health
            cash_element.innerHTML = 'Cash: $'+ player.cash


            //Save the current content
            ctx.save()

            //Clear the content and render the level
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            map.__renderlvl(ctx)

            //Render the enemies
            for (let index = 0; index < enemies.length; index++) {
                const ENEMY = enemies[index];
                ENEMY.__renderEnemy(ctx)
            }

            //Render the towers
            for (let index = 0; index < towers.length; index++) {
                towers[index].__render(ctx)
            }

            //Restore the content
            ctx.restore()
        }




        //Function GameLoop
        function gameLoop(ctx){
            

            if(start_offset){
                update()
            }

            render(ctx)

            

        }



        //Function BuyTower
        function buyTower(type){

            //If a tower is already purchased but not placed then Alert "You already have a tower ready to be placed"
            if (purchased_tower.status) {
                alert('You already have a tower ready to be placed')
                return false
            }

            //Check which tower was bought, if the player has enough money to buy
            //If the player has enough money removed that money and get ready to be place the tower
            switch (type) {
                case 'pistol':

                    if(player.cash >= 200){
                        player.cash -= 200
                        purchased_tower = { status:true, type:type }

                        tutorial_text.innerHTML = 'You purchased a pistol tower, click on the map to place it'
                    }

                break;
            
                case 'hunter':

                    if(player.cash >= 350){
                        player.cash -= 350
                        purchased_tower = { status:true, type:type }

                        tutorial_text.innerHTML = 'You purchased a hunter tower, click on the map to place it'

                    }

                break;
                case 'minigunner':

                    if(player.cash >= 1000){
                        player.cash -= 1000
                        purchased_tower = { status:true, type:type }

                        tutorial_text.innerHTML = 'You purchased a minigunner tower, click on the map to place it'
                    }

                break;
                case 'raygunner':

                    if(player.cash >= 1600){
                        player.cash -= 1600
                        purchased_tower = { status:true, type:type }

                        tutorial_text.innerHTML = 'You purchased a raygunner tower, click on the map to place it'
                    }

                break;
                case 'assassin':

                    if(player.cash >= 2000){
                        player.cash -= 2000
                        purchased_tower = { status:true, type:type }

                        tutorial_text.innerHTML = 'You purchased a assasin tower, click on the map to place it'
                    }

                break;
                case 'TEST':

                    if(player.cash >= 99999999){
                        player.cash -= 99999999
                        purchased_tower = { status:true, type:type }

                        tutorial_text.innerHTML = 'You purchased a TEST tower, click on the map to place it'
                    }

                break;
            }

        }   




        //Event Listener to check where the tower should be placed
        canvas.addEventListener('click', function(evt){

            //If the tower is bought and the game has started
            if(game_started && purchased_tower.status){
                
                //Check which tile the click was in
                let clickedX = Math.floor(( evt.offsetX / canvas.width ) * 10)
                let clickedY = Math.floor(( evt.offsetY / canvas.height ) * 10)

                //Variable to see if there is a tower on the clicked tile
                let existing = false

                //Check if there is a tower on the clicked tile
                towers.forEach( t => {
                    //If no then place the tower and set existing to true
                    if(t.x == clickedX && t.y == clickedY){
                        existing = true
                    }
                })
                //If yes then warn the player that there is already a tower there
                if(existing){
                    alert('cannot place a turret on top of an existing one')
                    return false
                }
                
                //If the tile is grass and existing is false then add the tower to the towers array
                if(matrix[clickedY][clickedX] == 'grass' && !existing){
                    towers.push(new Tower(clickedX, clickedY, tilesize, tilesize, purchased_tower.type))
                    purchased_tower = { status:false, type:'' }
                    tutorial_text.innerHTML = 'Welcome to a Tower Defense game made by David!'
                }

            }
        })
