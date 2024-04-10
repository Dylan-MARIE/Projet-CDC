/*************************************
******** INTERFACE
*************************************/

window.onload = function(){
  window.location.href = "#cul-de-chouette";
};

/*************************************
******** WEB
*************************************/

let total = 0;
let stage = 0;

function RandomDice(){
return Math.ceil(Math.random() * 6);
}

function LaunchDices(){
  switch(stage){
      case 0:
          ResetDice();
          stage = 1;
          document.getElementById("launch").innerHTML = "Lancer les chouettes";
      break;
      case 1:
          LaunchDice1();
          LaunchDice2();
          stage = 2;
          document.getElementById("launch").innerHTML = "Lancer le cul";
      break;
      case 2:
          LaunchDice3();
          stage = 3;
          document.getElementById("launch").innerHTML = "Jet suivant";
      break;
      case 3:
          ResetDice();
          if(total < 343){
              stage = 1;
              document.getElementById("launch").innerHTML = "Lancer les chouettes";
          }else{
              document.getElementById("launch").innerHTML = "Vous avez gagné la partie !";
              document.getElementById("total").innerHTML = "0";
              setTimeout(() =>{
                  stage = 0;
                  total = 0;
                  document.getElementById("launch").innerHTML = "Commencer une partie";
                  document.getElementById("total").innerHTML = "0";
              }, 2000);
          }
      break;
  }
}

function LaunchDice1(){
  //Récupère une valeur aléatoire pour le dé 1 à partir de la fonction RandomDice
  let dice1 = RandomDice();

  //Utilise les valeurs récupérées par les chouettes pour les transposer au travers d'images de dés
  document.getElementById("Dé1").src = "assets/images/dice" + dice1 + ".png";
}

function LaunchDice2(){
  //Récupère une valeur aléatoire pour le dé 2 à partir de la fonction RandomDice
  let dice2 = RandomDice();

  //Utilise les valeurs récupérées par les dés 1 et 2 pour les transposer au travers d'images de dés
  document.getElementById("Dé2").src = "assets/images/dice" + dice2 + ".png";
}

function LaunchDice3(){
  let resultatCombinaison = document.getElementById("RealizedCombination");
  let dice3 = RandomDice();
  let comb = combinaison(parseInt(document.getElementById("Dé1").src.substr(-5, 1)),parseInt(document.getElementById("Dé2").src.substr(-5, 1)),dice3);
  let diceImage3 = document.getElementById("Dé3");
  
  diceImage3.src = "assets/images/dice" + dice3 + ".png";

  // Rendre les blocs correspondants cliquables
  let combBlocks = document.querySelectorAll(".comb");
  combBlocks.forEach(block => {
      block.classList.add("clickable");
      block.onclick = function() {
          if (comb.id === parseInt(block.id.replace("comb", ""))) {
              // Si l'utilisateur clique sur le bon bloc, ajoutez les points correspondants
              resultatCombinaison.innerHTML = `+ ${comb.score} points`;
              total += comb.score;
              document.getElementById("total").innerHTML = `Total : ${total} points`;
          }
      };
  });

  // Réinitialiser la couleur de tous les blocs
  let resetComb = document.querySelectorAll(".comb");
  resetComb.forEach(element => {element.style.backgroundColor = "#353535";});
  
  // Mettre en surbrillance la combinaison réalisée
  document.getElementById("comb"+comb.id).style.backgroundColor = '#6f9457';
 
  if(comb.value !== undefined){
      resultatCombinaison.innerHTML = `+ ${comb.score} points`;
      total += comb.score;      
  } else {
      resultatCombinaison.innerHTML = '';
  }

  let scoreElement = document.getElementById("points" + comb.id);
  scoreElement.innerHTML = `+ ${comb.score} points`;
  document.getElementById("total").innerHTML = `Total : ${total} points`;
}

function ResetDice(){
  //Réinitialise la valeur des trois dés en affichant des dés vierges
  document.getElementById("Dé1").src = "assets/images/empty.png";
  document.getElementById("Dé2").src = "assets/images/empty.png";
  document.getElementById("Dé3").src = "assets/images/empty.png";

  //Affiche des blocs vierges pour la combinaison effectuée et les points gagnés et réinitialise la couleur
  document.getElementById("combination").innerHTML = ``;
  document.getElementById("combination").style.backgroundColor = '';
  document.getElementById("points").innerHTML = ``;
  document.getElementById("points").style.backgroundColor = '';
}

/*************************************
******** FONCTIONNEMENT DU JEU
*************************************/

//Fonction Cul de Chouette
function CuldeChouette(dice1, dice2, dice3){
  let result = new Object();
  result.name="Cul de Chouette";
  result.score=40+10*dice1;
  result.value=dice1;
  return dice1===dice2 && dice2===dice3 ? result : false;
}

//Fonction Chouette
function Chouette(dice1, dice2, dice3){
  let combination = (dice1===dice2 && dice1!==dice3) ? dice1 : (dice2===dice3 && dice2 !==dice1) ? dice2 : (dice1===dice3 && dice1!==dice2) ? dice1 : 0;
  let result = new Object();
  result.name="Chouette";
  result.score=combination**2;
  result.value=combination;
  return (dice1===dice2 && dice1!==dice3) || (dice2===dice3 && dice2 !==dice1) || (dice1===dice3 && dice1!==dice2) ? result : false;
}

//Fonction Velute
function Velute(dice1, dice2, dice3){
  let result = new Object();
  result.name="Velute";
  result.score=2*Math.max(dice1, dice2, dice3)**2;
  result.value=Math.max(dice1, dice2, dice3);
  return (dice1 + dice2 === dice3) || (dice2 + dice3 === dice1) || (dice1 + dice3 === dice2) ? result : false;
}

//Fonction Chouette-Velute
function ChouetteVelute(dice1, dice2, dice3){
  let result = new Object();
  result.name="Chouette-Velute";
  result.score=2*Math.max(dice1, dice2, dice3)**2;
  result.value=Math.max(dice1, dice2, dice3);
  return Chouette(dice1, dice2, dice3) && Velute(dice1, dice2, dice3) ? result : false;
}

//Fonction Suite
function Suite(dice1, dice2, dice3){
  let dices = [dice1, dice2, dice3];
  dices.sort((a, b) => a - b);
  let result = new Object();
  result.name="Suite";
  result.score=0;
  return dices[1]===dices[0]+1 && dices[2]===dices[1]+1 ? result : false;
}

//Fonction Néant
function Neant(dice1, dice2, dice3){
  let result = new Object();
  result.name="Néant";
  result.score=0;
  return result;
}

function combination(dice1, dice2, dice3){
  if(ChouetteVelute(dice1, dice2, dice3)){
      return ChouetteVelute(dice1, dice2, dice3);
  }else if(Chouette(dice1, dice2, dice3)){
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