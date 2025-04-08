let players={
    
    bot:{
        points:1000,
        turn:false,
        setPoint:0,
        triple:0
    },
    player:{
        points:1000,
        turn:true,
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
//varibles used to shorten object paths
player= players.player
bot= players.bot

roll()  


//starts the timer
// setTimeout(function(){
//     timeVar=setInterval(timer,1000)
// },3000)


//this function rolls the dice and starts the game
function roll(){

    // let displayDice=document.getElementById('dice')
    
    //segment 1: roll
    dice.d1=Math.floor(1+Math.random()*6)
    dice.d2=Math.floor(1+Math.random()*6)
    dice.d3=Math.floor(1+Math.random()*6)

    // displayDice.textContent= `${dice.d1} ${dice.d2} ${dice.d3}`
    //end of segment 1
    
    //checks for the instant win and instant lost
    instants()

    //runs the function that checks if any player gotten a triple
    triple()

    //runs the function that checks for set point values
    setPointCheck()

   //calls the function that changes who turn it is
    turnSwitch()
}//end of roll function



function instants(){
    let roll=Object.values(dice)
    console.log(roll)
    let outcome=''
    //a 4-5-6 is an instant win condition
        if(roll.includes(4) && roll.includes(5) && roll.includes(6)){
            outcome='win'
        }else if(roll.includes(1) && roll.includes(2) && roll.includes(3)){
            outcome='lose'
        }else{
            return false
        }

//checks who won or lost
            switch(outcome){
        case 'win':
            if(bot.turn){
                //awards points to the bot
                bot.points+=game.pot
                game.pot=0
                break
            }
            else{
                //awards points to the player
                player.points+=game.pot
                game.pot=0
                break
            }


        case 'lose':
            //checks if it is the bot's turn
            if(bot.turn){
                //awards points to other player
                player.points+=game.pot
                game.pot=0
                break
            } else{
                bot.points+=game.pot
                game.pot=0
                break
}
}//end of switch case
}

//checks for a triple
function triple(){

    if(dice.d1==dice.d2==dice.d3){
        if(bot.turn){
            bot.triple=dice.d1+dice.d2+dice.d3
        }
        else{
            player.triple=dice.d1+dice.d2+dice.d3
        }
    }else{
        return false
    }

    //checks if both players even have a triple
    if(bot.triple>0 && player.triple>0){
           //if both players gotten a triple, this if statement checks who has the larger value
    if(bot.triple>player.triple){
        bot.points+=game.pot
        game.pot=0
    }else{
        player.points+=game.pot
        game.pot=0
    }
    }else{
        return false
    }//end of if statement
}//end of triple() function


//checks for set point values
function setPointCheck(){
    //converts the values in dice into an array
    let roll=Object.values(dice)
    // extracts the number that doesn't repeat, retrieving the set point value
    let setPoint=roll.filter((value) => roll.indexOf(value) === roll.lastIndexOf(value));

    //checks if there even is a setpoint
    if(setPoint>0){
        //checks who gets the set point
        if(bot.turn){
            bot.setPoint=setPoint
        }else{
            player.setPoint=setPoint
        }

        //checks if both players even have a set point
        if(bot.setPoint>0 && player.setPoint>0){
            //checks who has the larger setPoint
            if(bot.setPoint>player.setPoint){
                bot.points+=game.pot
                game.pot=0
            }else{
                player.points+=game.pot
                game.pot=0
            }
        }
    }//end of if statment
}//end of setPointCheck function

//controls the timer
function timer(){
    let timeDisplay=document.getElementById('timer')
    //updates the time display
    timeDisplay.textContent=`${game.time.minutes}:${game.time.seconds}`
    game.time.seconds-=1

    //adds a 0 when seconds is less than 10. If second is 1 then displays it as 01
    if(game.time.seconds<10){
        timeDisplay.textContent=`${game.time.minutes}:0${game.time.seconds}`
    }

    //updates the minutes once a minute passes
    if(game.time.minutes>0 && game.time.seconds==0){
        game.time.minutes-=1
        game.time.seconds+=59
        
    }
    //stops the timer when it reaches zero
    if(game.time.minutes==0 && game.time.seconds==0){
        clearInterval(timeVar)
    }
}

function turnSwitch(){
     //turn checker
     if(bot.turn){
        player.turn=true
        bot.turn=false
    }else{
        bot.turn=true
        player.turn=false
    }
}
