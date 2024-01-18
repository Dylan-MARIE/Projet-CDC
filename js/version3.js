function LaunchDice(){
  return Math.floor(Math.random() * 6) + 1;
}

//Fonction game
function game(){
    let dice1 = LaunchDice();
    let dice2 = LaunchDice();
    let dice3 = LaunchDice();
    console.log(`\n${dice1}\n\n${dice2}\n\n${dice3}`);
    let comb=combinaison(dice1, dice2, dice3);
    console.log("Nom : "+comb.name);
    console.log("Score : "+comb.score);
    if (typeof comb.value !== 'undefined') {
        console.log("Valeur : "+comb.value);
    }
}
//Fonction du Cul de Chouette
function CuldeChouette(dice1, dice2, dice3){
  let result = new Object();
  result.name="Cul de Chouette";
  result.score=40+10*dice1;
  result.value=dice1;
  return dice1==dice2 && dice2==dice3 ? result : false;
}

 //Fonction de la Chouette
function Chouette(dice1, dice2, dice3){
  let combination = (dice1==dice2 && dice1!=dice3) ? dice1 : (dice2==dice3 && dice2 !=dice1) ? dice2 : (dice1==dice3 && dice1!=dice2) ? dice1 : 0;
  let result = new Object();
  result.name="Chouette";
  result.score=combination**2;
  result.value=combination;
  return (dice1==dice2 && dice1!=dice3) || (dice2==dice3 && dice2 !=dice1) || (dice1==dice3 && dice1!=dice2) ? result : false;
}

//Fonction de la Velute
function Velute(dice1, dice2, dice3){
    let result = new Object();
    result.name="Velute";
    result.score=2*Math.max(dice1, dice2, dice3)**2;
    result.value=Math.max(dice1, dice2, dice3);
    return (dice1 + dice2 === dice3) || (dice2 + dice3 === dice1) || (dice1 + dice3 === dice2) ? result : false;
  }

//Fonction de la Chouette-Velute
function ChouetteVelute(dice1, dice2, dice3){
  let result = new Object();
  result.name="Chouette-Velute";
  result.score=2*Math.max(dice1, dice2, dice3)**2;
  result.value=Math.max(dice1, dice2, dice3);
  return Chouette(dice1, dice2, dice3) && Velute(dice1, dice2, dice3) ? result : false;
}

//Fonction de la Suite
function Suite(dice1, dice2, dice3){
  let dices = [dice1, dice2, dice3];
  dices.sort((a, b) => a - b);

  let result = new Object();
  result.name="Suite";
  result.score=0;
  return dices[1]==dices[0]+1 && dices[2]==dices[1]+1 ? result : false;
}

//Fonction du Néant
function Neant(dice1, dice2, dice3){
  let result = new Object();
  result.name="Néant";
  result.score=0;
  return result;
}

function combinaison(dice1, dice2, dice3){
  if(ChouetteVelute(dice1, dice2, dice3)){
    return ChouetteVelute(dice1, dice2, dice3);
  }
  else if(Chouette(dice1, dice2, dice3)){
    return Chouette(dice1, dice2, dice3);
  }else if(Velute(dice1, dice2, dice3)){
    return Velute(dice1, dice2, dice3);
  }else if(CuldeChouette(dice1, dice2, dice3)){
    return CuldeChouette(dice1, dice2, dice3);
  }else if(Suite(dice1, dice2, dice3)){
    return Suite(dice1, dice2, dice3);
  }else{
    return Neant(dice1, dice2, dice3);
  }
}

game();