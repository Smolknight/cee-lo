let players={

    bot:{
        points:19999,
        turn:false,
        setPoint:0,
        triple:0,
        bet:false
    },
    player:{
        points:1000,
        turn:true,
        setPoint:0,
        triple:0,
        bet:false
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

let currentDate=new Date
let TermText=document.getElementById('textDisplay')

let displayDice=document.getElementById('dieDisplay')
        displayDice.textContent= `${dice.d1} ${dice.d2} ${dice.d3}`

updateDisplay()

setTimeout(function(){
    timeVar=setInterval(timer,1000)
},22500)

let rollBtn=document.getElementById('rollBtn')
rollBtn.addEventListener('click',roll)


//this function rolls the dice and starts the game
function roll(){

    if((player.bet && player.turn) || (bot.bet && bot.turn)){
    let displayDice=document.getElementById('dieDisplay')
    
    //segment 1: roll
    dice.d1=Math.floor(1+Math.random()*6)
    dice.d2=Math.floor(1+Math.random()*6)
    dice.d3=Math.floor(1+Math.random()*6)

    displayDice.textContent= `${dice.d1} ${dice.d2} ${dice.d3}`
    if(player.turn){
        sendMsg(`Anonymous rolled ${dice.d1}-${dice.d2}-${dice.d3}`)
    }else{
        sendMsg(`Shinigami rolled ${dice.d1}-${dice.d2}-${dice.d3}`)
    }
    //end of segment 1
    
    //checks for the instant win and instant lost
    instants()

    //runs the function that checks if any player gotten a triple
    triple()

    //runs the function that checks for set point values
    setPointCheck()

   //calls the function that changes who turn it is
    turnSwitch()
    }else{
        sendMsg(`ERROR: must place bet before rolling`)
    }
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
        }

//checks who won or lost
            switch(outcome){
        case 'win':
            if(bot.turn){
                //awards points to the bot
                bot.points+=game.pot
                sendMsg(`Shinigami has rolled a 4-5-6, Shinigami has won ${game.pot} points`)
                game.pot=0
                resetBet()
                break
            }
            else{
                //awards points to the player
                player.points+=game.pot
                sendMsg(`Anonymous has rolled a 4-5-6, Shinigami has won ${game.pot} points`)
                game.pot=0
                resetBet()
                break
            }


        case 'lose':
            //checks if it is the bot's turn
            if(bot.turn){
                //awards points to other player
                player.points+=game.pot
                sendMsg(`Shinigami has rolled a 1-2-3, Anonymous has won ${game.pot} points`)
                game.pot=0
                resetBet()
                break
            } else{
                bot.points+=game.pot
                sendMsg(`Anonymous has rolled a 1-2-3, Shinigami has won ${game.pot} points`)
                game.pot=0
                resetBet()
                break
}
}//end of switch case
updateDisplay()
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
    }

    //checks if both players even have a triple
    if(bot.triple>0 && player.triple>0){
           //if both players gotten a triple, this if statement checks who has the larger value
    if(bot.triple>player.triple){
        bot.points+=game.pot
        sendMsg(`Shinigami has the higher triple, Shinigami has won ${game.pot} points`)
        game.pot=0
        player.triple=0
        bot.triple=0
        resetBet()
    }else{
        player.points+=game.pot
        sendMsg(`Anonymous has the higher triple, Anonymous has won ${game.pot} points`)
        game.pot=0
        player.triple=0
        bot.triple=0
        resetBet()
    }
    }//end of if statement
    updateDisplay()
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
                sendMsg(`Shinigami had the higher set point, Shinigami won ${game.pot} points`)
                game.pot=0
                player.setPoint=0
                bot.setPoint=0
                resetBet()
            }else{
                player.points+=game.pot
                sendMsg(`Anonymous had the higher set point, Anonymous won ${game.pot} points`)
                game.pot=0
                player.setPoint=0
                bot.setPoint=0
                resetBet()
            }
        }
    }//end of if statment
    updateDisplay()
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
        sessionStorage.setItem('point',player.points)
        window.location='ending.html'
    }

    if(player.points==0){
        window.location='ending.html'
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

    if(bot.turn){
        let botBet=Math.floor(1+Math.random()*(bot.points*0.7))
    setTimeout(function(){
            botBetPlace(botBet)
    },500)

    setTimeout(roll,1000)
}
}






let betInput=document.getElementById('betInput')
let betButton=document.getElementById('better')

betButton.addEventListener('click',betPlace)

function betPlace(){
    let currentBet=parseInt(betInput.value)

    if(player.turn){ //checks if it is the player's turn

        if(currentBet>0){ //checks if playerm is trying to bet negative numbers

            if((player.points-currentBet)<0){ //checks if the player is betting more points than they have
                //runs if the player doesn't have enough to cover the bet
                sendMsg('ERROR: not enough points')
            }else{ //runs if the player has points to cover the bet
                game.pot+=currentBet
                player.points=parseInt(player.points)-parseInt(currentBet)
                player.bet=true
                sendMsg(`Anonymous has bet ${currentBet} points`)
                updateDisplay()
            }
        }else{ //runs if the player tries to send a negative number
            sendMsg('ERROR: can not bet negative points')
        }
    }

    betInput.value=""
    currentBet=0
}

function updateDisplay(){
    let balanceDisplay=document.getElementById('balanceTxt')
    let potDisplay=document.getElementById('pot')

    balanceDisplay.innerText=`${player.points} points`
    potDisplay.innerText=`${game.pot} points`
}



function resetBet(){
    if(player.bet && bot.bet){
        player.bet=false
        bot.bet=false
    }
}


function botBetPlace(bet){
    if(!bot.bet){
        game.pot+=bet
        bot.points-=bet
        sendMsg(`Shinigami has bet ${bet} points`)
        bot.bet=true
    }
    updateDisplay()
}

function sendMsg(msg){
    let outMsg= document.createElement('p')
    if(currentDate.getMinutes()<10){
    outMsg.innerText=`${currentDate.getHours()}:0${currentDate.getMinutes()} [system] ${msg}`
    }else{
    outMsg.innerText=`${currentDate.getHours()}:${currentDate.getMinutes()} [system] ${msg}`
    }
                if(TermText.childElementCount==5){
                    TermText.removeChild(TermText.children[0])
                    TermText.appendChild(outMsg)
                }else{
                    TermText.appendChild(outMsg)
                }
}
