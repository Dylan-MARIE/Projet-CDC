// Fonction pour lancer les dés avec effet de vibration
function rollTheDice() {
    let total = 0;
  
    for (let compteur = 1; compteur <= 2; compteur++) {
      let nombre = Math.floor(Math.random() * 6) + 1;
      const imageElement = document.querySelector("img#des" + compteur);
      imageElement.classList.add("vibrating"); // Ajouter la classe vibrating
      setTimeout(() => {
        imageElement.classList.remove("vibrating"); // Supprimer la classe après un certain temps
        imageElement.setAttribute("src", "assets/images/dice" + nombre + ".png");
      }, 200); // Durée de la vibration en millisecondes (200 ms dans cet exemple)
      total += nombre;
    }
  }
  
  // Fonction pour lancer le troisième dé avec effet de vibration
  function rollThirdDie() {
    let nombre = Math.floor(Math.random() * 6) + 1;
    const imageElement = document.querySelector("img#des3");
    imageElement.classList.add("vibrating"); // Ajouter la classe vibrating
    setTimeout(() => {
      imageElement.classList.remove("vibrating"); // Supprimer la classe après un certain temps
      imageElement.setAttribute("src", "assets/images/dice" + nombre + ".png");
    }, 200); // Durée de la vibration en millisecondes (200 ms dans cet exemple)
  }