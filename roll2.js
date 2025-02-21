let players={
    
    bot:{
        points:1000,
        turn:true,
        setPoint:0,
        triple:0
    },
    player:{
        points:1000,
        turn:false,
        setPoint:0,
        triple:0
    }
}

let dice={
    d1:0,
    d2:0,
    d3:0
}

let game={
    time:{
        minutes:4,
        seconds:59
    },
    pot:0,
}
roll()  


//starts the timer
timeVar=setInterval(timer,1000)


//this function rolls the dice and starts the game
function roll(){

    let displayDice=document.getElementById('dice')
    
    //segment 1: roll
    dice.d1=Math.floor(1+Math.random()*6)
    dice.d2=Math.floor(1+Math.random()*6)
    dice.d3=Math.floor(1+Math.random()*6)

    displayDice.innerHTML= `${dice.d1} ${dice.d2} ${dice.d3}`
    //end of segment 1
    
    //varible used as object shortcut, makes code more readable
    player= players.player
    bot= players.bot
    pot= game.pot

//code below only really works for instant win and lose conditions
    switch(instants()){
        case 'win':
            if(bot.turn){
                //awards points to the bot
                bot.points=pot
                pot=0
                bot.turn=false
                player.turn=true
            }
            else{
                //awards points to the player
                player.points=pot
                pot=0
                player.turn=false
                bot.turn=true
            }
            break

        case 'lose':
            //checks if it is the bot's turn
            if(bot.turn){
                //awards points to other player
                player.points=game.pot
                game.pot=0
                players.bot.turn=false
                players.player.turn=true
            } else{
                players.bot.points=game.pot
                game.pot=0
                players.bot.turn=true
                players.player.turn=false
            }
            break
} //end of switch case

}

function instants(){
    let roll=Object.values(dice)
    console.log(roll)

    //a 4-5-6 is an instant win condition
        if(roll.includes(4) && roll.includes(5) && roll.includes(6)){
            return 'win'
        }

        if(roll.includes(1) && roll.includes(2) && roll.includes(3)){
            return 'lose'
        }
}


//controls the timer
function timer(){
    let timeDisplay=document.getElementById('timer')

    

    timeDisplay.innerHTML=`<h1>${game.time.minutes}:${game.time.seconds}</h1>`
    game.time.seconds-=1

    
    if(game.time.seconds<10){
        timeDisplay.innerHTML=`<h1>${game.time.minutes}:0${game.time.seconds}</h1>`
    }

    if(game.time.minutes>0 && game.time.seconds==0){
        game.time.minutes-=1
        game.time.seconds+=59
        
    }
    if(game.time.minutes==0 && game.time.seconds==0){
        clearInterval(timeVar)
    }
}