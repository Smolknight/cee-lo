  //used to check which lines have been displayed
  const flag={
    eraseFlag:0    
}
//stores the text that needs to be displayed
const storyChange={
    //first line to be displayed
    text:`It's the year 20XX, you recently been layed off from your corporate job`
}
    //grabs where text is to be displayed
        const story=document.getElementById('insertHere')

//starts i at 0
    let i=0
    //interval that calls typer() every 50ms, starts the first cycle
    lol=setInterval(typer,45)

function typer(){
    //grabs the current line
    switch(flag.eraseFlag){
        case 1:
            storyChange.text=`timing couldn't be worse`
        break;
        case 2:
            storyChange.text=`rent is due in two weeks and you're $2000 short`
            break;
        case 3:
            storyChange.text=`Out of options, you took out a loan of $1000 from a local yakuza family`
            break;
        case 4:
            storyChange.text=`You came up with a desperate idea`
            break;
        case 5:
            storyChange.text=`you remembered seeing posts about a dark web cee-lo website on a few forums you browse`
            break;
        case 6:
            storyChange.text=`They don't ask questions. They don't ask for personal details. No taxes, only a 5% cut`
            break;
        case 7:
            storyChange.text=`You decide to risk it all in one game`
            break;
        case 8: 
            storyChange.text=`The next five minutes of your life will determine your life's trajectory`
            break;
        case 9:
            storyChange.text=`Worst case....you'll end up homeless with the yakuza hounding you for payments. Stuck with a loan impossible to pay off due to the Yakuza's insane interest rates`
            break;
        case 10:
            storyChange.text=`A more mild outcome would be having enough money to pay off your loan but still be short on rent`
            break;
        case 11:storyChange.text=`you'll still end up homeless but at least the Yakuza won't be chasing after you`
            break;
        case 12:
        storyChange.text=`The most mild case is being able to pay off your loan but only be able to pay off this month's rent`
        break;
        case 13:
            storyChange.text=`This buys you time so you can get a job but you'll be skipping meals for awhile`
            break;
        case 14: storyChange.text=`The best case is making out thousands of dollars richer than you were before`
        break;
        case 15: storyChange.text=`five minutes`
        break;
        case 16: storyChange.text=`every point gained is a dollar earned`
        break;
        case 17: storyChange.text=`Good luck`
        break;
}//end of switch
    //sets the story text to the current line to display
            let storyText=storyChange.text
    

    //breaks up the text and inserts the characters into an array
    let storyArray=storyText.split("")

    //inserts every character into the display area
    //i is used to cycle through every character
    story.innerHTML+=`${storyArray[i]}`
    //tells the program to move to the next letter
    i++
    //once the entire line is displayed, tells the program to stop writing
    if(i==storyArray.length){
        clearInterval(lol)

    //gives the player time to read the text before calling the functiont that erases the text, triggers after 2.5s
        setTimeout(function(){
            erase=setInterval(eraser,30)
        },2500)
    }
}



function eraser(){
    //grabs the current text displayed
    let story=document.getElementById('insertHere')
    //stores the text in a new variable
    let newText=story.textContent
    //every cycle it removes one character from the end of the line
    let finalText=newText.substr(0,i-1)
    //displays the modified text, creating an erasing effect
    story.textContent=finalText
    //i is used to keep track of remaning characters
    i--

    //once there are no more characters to erase, it stops the eraser()
    if(i==0){
        clearInterval(erase)
        console.log(flag.eraseFlag,'erased')
        flag.eraseFlag+=1

        if(flag.eraseFlag<18){
            lol=setInterval(typer,45)
        }else{
            document.getElementById('fader').style.display='none'
            story.innerHTML=`<button onclick='changeScreen()'>Play</button>`
        }
    }
}

function changeScreen(){
    window.location='protoUi.html'
}
