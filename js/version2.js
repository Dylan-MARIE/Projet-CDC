function lancerDé() {
  return Math.floor(Math.random() * 6) + 1;
}

//Variables dés
let de1 = lancerDé();
let de2 = lancerDé();
let de3 = lancerDé();

//Variables
let total=0;

//Fonctions
function maxDe(de1, de2, de3){
  return Math.max(de1, de2, de3);
}

function checkCombinaisons(type){
  switch (type){
    case 'chouette' :
      return (de1 === de2 || de2 === de3 || de1 === de3) && (de1 !== de2 || de2 !== de3);
    case 'velute' :
      return (de1 + de2 === de3) || (de2 + de3 === de1) || (de1 + de3 === de2);
    case 'cdc' :
      return de1 === de2 && de2 === de3;
    case 'cv' :
      return Velute(de1, de2, de3) && Chouette(de1, de2, de3);
    case 'suite' :
      let des = [de1, de2, de3];
      des.sort((a, b) => a - b);
      return ((des[0] + 1 === des[1] && des[1] + 1 === des[2]) || (des[2] - 1 === des[1] && des[1] - 1 === des[0]));
    case 'neant' :
      return !CulDeChouette(de1, de2, de3)
          && !Chouette(de1, de2, de3)
          && !Velute(de1, de2, de3)
          && !ChouetteVelute(de1, de2, de3)
          && !Suite(de1, de2, de3);
    default:break
  }
}

function CulDeChouette(de1, de2, de3){
  if (checkCombinaisons('cdc')){
    let combinaison = maxDe(de1, de2, de3);
    valeur = 40 + 10 * combinaison;
    return ["Cul de chouette", `+ \x1b[36m${valeur}\x1b[0m points.`];
  }
}

function Chouette(de1, de2, de3){
  if (checkCombinaisons('chouette')){
    let combinaison = (de1 === de2) ? de1 : (de1 === de3) ? de1 : de2;
    valeur = combinaison**2; 
    return ["Chouette", `+ \x1b[36m${valeur}\x1b[0m points.`];
  }
}

function Velute(de1, de2, de3){
  if (checkCombinaisons('velute')){
    let combinaison = maxDe(de1, de2, de3);
    valeur = 2 * (combinaison ** 2);
    return ["Velute", `+ \x1b[36m${valeur}\x1b[0m points.`];
  }
}

function ChouetteVelute(de1, de2, de3){
  if (checkCombinaisons('cv')){
    let combinaison = maxDe(de1, de2, de3);
    valeur = 2 * (combinaison ** 2);
    return ["Chouette-Velute", `+ \x1b[36m${valeur}\x1b[0m points.`];
  }
}

function Suite(de1, de2, de3){
  if (checkCombinaisons('suite')){
    return ["Suite"];
  }
}

function Neant(de1, de2, de3){
  if (checkCombinaisons('neant')){
    return ["Néant"];
  }
  
}
console.log(`Dés: ${de1}, ${de2}, ${de3}`);

// Appel de la fonction combinaison

function combinaison(de1, de2, de3){
  let tab=[];
  if(CulDeChouette(de1, de2, de3)){
    tab=CulDeChouette(de1, de2, de3); 
  }else if(ChouetteVelute(de1, de2, de3)){
    tab=ChouetteVelute(de1, de2, de3);
  }else if(Chouette(de1, de2, de3)){
    tab=Chouette(de1, de2, de3);
  }else if(Velute(de1, de2, de3)){
    tab=Velute(de1, de2, de3);
  }else if(Suite(de1, de2, de3)){
    tab=Suite(de1, de2, de3);
  }else if(Neant(de1, de2, de3)){
    tab=Neant(de1, de2, de3);
    }

  return tab;
}

let resultats = combinaison(de1, de2, de3);
console.log(resultats[0], resultats[1] ? resultats[1] : "");

// total+=tab[1];
// nomCombinaison=tab[0];
// Afficher total et nom