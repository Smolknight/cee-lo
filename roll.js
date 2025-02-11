let pot=document.getElementById('pot')
pot.innerHTML=`<h1>Pot: 0</h1>`
potValue=0

let players={

    bot:{
        points:1000,
        turn:true,
        rolled:false,
        setPoint:0
    },
    player:{
        points:1000,
        turn:false,
        rolled:true,
        setPoint:0
    }
}

let dice={
    d1:4,
    d2:5,
    d3:4
    // d1:'',
    // d2:'',
    // d3:''
}

console.log(dice.d1, dice.d2, dice.d3)
document.getElementById("dice").innerHTML=`${dice.d1} ${dice.d2} ${dice.d3}`

//this function checks the results of the dice roll
function checkVal(){

    // dice.d1=Math.floor(1+Math.random()*6)
    // dice.d2=Math.floor(1+Math.random()*6)
    // dice.d3=Math.floor(1+Math.random()*6)

    document.getElementById("dice").innerHTML=`${dice.d1} ${dice.d2} ${dice.d3}`

    //checks if there is a 4-5-6 sequence
        let roll=Object.values(dice)//converts dice object into an array

    if(roll.includes(4) && roll.includes(5) && roll.includes(6)){
        console.log("yatta")
    }
    //checking if there is a triple
    else if(dice.d1==dice.d2 && dice.d2 == dice.d3){
        console.log('Oh bady a triple')
    }

    else{
        setPointVal()
    }



// }

function setPointVal(){
    //Object.values is a built in method that turns object values into an array
    let roll=Object.values(dice)
    let result = roll.filter((value) => roll.indexOf(value) === roll.lastIndexOf(value));
    return result.toString()
}
}
