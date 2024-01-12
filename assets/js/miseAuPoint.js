let total=0;

function maxDe(de1, de2, de3){
  return Math.max(de1, de2, de3);
} 
 
function culChouette(de1, de2, de3){
  if (de1 === de2 && de2 === de3){
    combinaison = maxDe(de1, de2, de3);
    valeur = 40 + 10 * combinaison;
    return ["Cul de chouette", valeur];
  }
}

function combinaison(de1, de2, de3){
  let nomCombinaison="";
  let tab=[];
  if(culChouette(de1, de2, de3)){
    tab=culChouette(de1, de2, de3); 
  }else if(chouette(de1, de2, de3)){
    tab=chouette(de1, de2, de3);
  }

  return tab;

 // total+=tab[1];
// nomCombinaison=tab[0];

  // Afficher total et nom
}


 
 
 