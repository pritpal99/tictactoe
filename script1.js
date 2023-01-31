//initial array of grid positions
let position=[
    ["","",""],
    ["","",""],
    ["","",""],
]

//global variables for taking the id of selected div or box.
let idInt,id;

let player_score=0,comp_score=0,tie_score=0;

// function invoked when any box is clicked by player to take player move and then
// computer move
function player_computer_move(a)
{
    //for taking value of 'id' attribute of clicked div
    id=a.getAttribute('id');
    idInt =parseInt(id.substring(1));
    
    //playerTurn
    playerTurn();
    if(finished()){
        disable(); //for disabling the remaining boxes, when anyone won
        return;
    }
    //computerTurn
    setTimeout(computerTurn,500); 
}
// function sleepy(ms){
//     var start=new Date().getTime();
//     for(var i=0;i<1e7;i++){
//         if((new Date().getTime()-start>ms))
//           break;
//     }
// }

//logic for playerTurn ,firstly check valid move then place that move by assigning 'X'
function playerTurn(){
    document.getElementById("info").innerHTML="Turn of computer"
    while(true){
        if(validMove(idInt)){
            break;
        }
    }
    placeMove(idInt,"X");
    document.getElementById(id).innerHTML="X";
    
}
//computerMove by using random method, checking valid move then place that move
function computerTurn(){
    document.getElementById("info").innerHTML="Turn of player"
    let move;
    while(true){
        move=Math.floor(Math.random()*9)+1;
        if(validMove(move)){
            break;
        }
    }
    placeMove(move,"0");
    let m="b"+move;
    document.getElementById(m).innerHTML="0";
    if(finished()){
        disable(); //for disabling the remaining boxes, when anyone won
        return;
    }
    
}

//for checking the valid move or position
function validMove(pos)
{
    switch(pos){
        case 1:
             return position[0][0]=="";
        case 2:
            return position[0][1]=="";        
        case 3:
            return position[0][2]=="";       
        case 4:
            return position[1][0]=="";     
        case 5:
            return position[1][1]=="";    
        case 6:
            return position[1][2]=="";
        case 7:
            return position[2][0]=="";    
        case 8:
            return position[2][1]=="";   
        case 9:
            return position[2][2]=="";
           
    }
}

//for placing the symbol at position pos
function placeMove(pos,symbol)
{
    switch(pos){
        case 1:
            position[0][0]=symbol;
            break;
        case 2:
            position[0][1]=symbol;
             break;
        case 3:
            position[0][2]=symbol;
            break;
        case 4:
            position[1][0]=symbol;
            break;
        case 5:
            position[1][1]=symbol;
            break;
        case 6:
            position[1][2]=symbol;
            break;
        case 7:
            position[2][0]=symbol;
            break;
        case 8:
            position[2][1]=symbol;
            break;
        case 9:
            position[2][2]=symbol;
            break;       
    }
}

//to check, who is winner(player or computer) or match is tie or still continue
function finished(){
    if(wonConditions("X")){
        document.getElementById("info").innerHTML="Player won ! <br> Congratulations";
        document.getElementsByClassName("won-lossimg")[0].style.display="inline";
        player_score++;
        document.getElementById("player-score").innerHTML=player_score;

     return true;
    }
    if(wonConditions("0")){
        document.getElementById("info").innerHTML="Computer won! <br>Try again";
        document.getElementsByClassName("won-lossimg")[1].style.display="inline";
        comp_score++;
        document.getElementById("computer-score").innerHTML=comp_score;
        return true;
    }
    for(let i=0;i<position.length;i++){
        for(let j=0;j<position[i].length;j++){
            if(position[i][j]=="")
                return false;
        }
    }
    document.getElementById("info").innerHTML="Tie ! try again";
    document.getElementsByClassName("won-lossimg")[2].style.display="inline";
    tie_score++;
    document.getElementById("tie-score").innerHTML=tie_score;
    return true;
}

//disabling the all boxes after winning
function disable(){
    let count=1;
    for(let i=0;i<position.length;i++){
        for(let j=0;j<position[i].length;j++){
                document.getElementById("b"+count).style.pointerEvents='none';
                count++;
            }      
            }
    }

//checking the win conditions
function wonConditions(symbol){

            if((position[0][0]==symbol && position[0][1]==symbol && position[0][2]==symbol)){
                document.getElementById("row1").style.display="block";
                return true;
            } 
            else if(position[1][0]==symbol && position[1][1]==symbol && position[1][2]==symbol){
                document.getElementById("row2").style.display="block";
                return true;
            }
             else if(position[2][0]==symbol && position[2][1]==symbol && position[2][2]==symbol){
                document.getElementById("row3").style.display="block";
                return true;
             } 
             else if(position[0][0]==symbol && position[1][0]==symbol && position[2][0]==symbol){
                document.getElementById("col1").style.display="block";
                return true;
             }
             else if(position[0][1]==symbol && position[1][1]==symbol && position[2][1]==symbol){
                document.getElementById("col2").style.display="block";
                return true;
             }
             else if(position[0][2]==symbol && position[1][2]==symbol && position[2][2]==symbol){
                document.getElementById("col3").style.display="block";
                return true;
             }
             else if(position[0][0]==symbol && position[1][1]==symbol && position[2][2]==symbol){
                document.getElementById("diagonal-1").style.display="block";
                return true;
             }
             else if(position[0][2]==symbol && position[1][1]==symbol && position[2][0]==symbol){
                document.getElementById("diagonal-2").style.display="block";
                return true;
             }
            else{
                return false;
            }
}
function reset(){
    //resetting all elements of position 2d array
    for(let i=0;i<position.length;i++){
        for(let j=0;j<position[i].length;j++){
            position[i][j]="";
        }
    }
    //enabling all boxes for clicking
    for(let i=1;i<=9;i++){
        document.getElementById("b"+i).innerHTML="";
        document.getElementById("b"+i).style.pointerEvents='all';
    }
    document.getElementById("info").innerHTML="&nbspLet's Start";
    //hiding won-loss-tie images
    document.getElementsByClassName("won-lossimg")[0].style.display="none";
    document.getElementsByClassName("won-lossimg")[1].style.display="none";
    document.getElementsByClassName("won-lossimg")[2].style.display="none";

    //hiding all lines
    document.getElementById("row1").style.display="none";
    document.getElementById("row2").style.display="none";
    document.getElementById("row3").style.display="none";
    document.getElementById("col1").style.display="none";
    document.getElementById("col2").style.display="none";
    document.getElementById("col3").style.display="none";
    document.getElementById("diagonal-1").style.display="none";
    document.getElementById("diagonal-2").style.display="none";
   
    
}


