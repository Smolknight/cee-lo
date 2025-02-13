let players={

    bot:{
        points:1000,
        turn:true,
        setPoint:0
    },
    player:{
        points:1000,
        turn:false,
        setPoint:0
    }
}

let dice={
    d1:0,
    d2:0,
    d3:0
}

let game={
    pot:0
}
roll()

//this function rolls the dice and starts the game
function roll(){
    dice.d1=Math.floor(1+Math.random()*6)
    dice.d2=Math.floor(1+Math.random()*6)
    dice.d3=Math.floor(1+Math.random()*6)

    instants()
}


function instants(){
    let roll=Object.values(dice)
    console.log(roll)

    //a 4-5-6 is an instant win condition
        if(roll.includes(4) && roll.includes(5) && roll.includes(6)){
            console.log('insta win')
        }
        else{
            console.log('no')
        }

        if(roll.includes(1) && roll.includes(2) && roll.includes()) 
}