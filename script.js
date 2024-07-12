// Récupération des différents éléments
const items = document.querySelectorAll(".item");
const lists = document.querySelectorAll(".list");

// Création de la variable currentItem
let currentItem = null;

// Déclaration de la fonction dragStart qui ve permettre à l'utilisateur de faire glisser un élément
const dragStart = (e) => {
  if (![...e.target.classList].includes("item")) {
    e.preventDefault();
    return;
  }
  currentItem = e.target;
  e.target.classList.add("drag-active");
  setTimeout(() => {
    e.target.style.display = "none";
  }, 0);
};

// Déclaration de la fonction dragEnd qui va permettre de mettre fin à l'opération de glissement
const dragEnd = (e) => {
  currentItem = null;
  e.target.classList.remove("drag-active");
  e.target.style.display = "flex";
};

// Déclaration de la fonction dragOver qui va permettre de glisser un élément vers une cible
const dragOver = (e) => {
  e.preventDefault();
};

// Déclaration de la fonction dragEnter qui va permettre à l'élement glissé d'entrer dans la zone de dépôt
const dragEnter = (e) => {
  e.preventDefault();
  e.target.classList.add("hovered");
};

// Déclaration de la fonction dragLeave qui va permettre à l'élément ciblé de quitter la zone de dépôt
const dragLeave = (e) => {
  e.preventDefault();
  e.target.classList.remove("hovered");
};

// Déclaration de la fonction drop qui va permettre de déposer un élément sur une cible de dépôt valide
const drop = (e) => {
  if (![...e.target.classList].includes("list")) {
    e.preventDefault();
    return;
  }
  e.target.classList.remove("hovered");
  e.target.append(currentItem);
  currentItem = null;
};

items.forEach((item) => {
  item.draggable = "true";
  // Ecoute de l'événement "dragstart" et appel de la fonction dragStart
  // L'événement dragstart est déclenché lorsque l'utilisateur glisse un élément ou une sélection de texte.
  item.addEventListener("dragstart", dragStart);
  // Ecoute de l'événement dragend et appel de la fonction dragEnd
  // L'événement dragend est déclenché lorsque une opération de glissement est terminée (en relâchant le bouton de la souris ou en appuyant sur la touche Echap).
  item.addEventListener("dragend", dragEnd);
});

lists.forEach((list) => {
  // Ecoute de l'événement "dragover" et appel de la fonction dragOver
  // L'événement dragover est déclenché lorsqu'un élément ou une sélection de texte est glissé jusqu'à une cible de dépôt valide (toutes les 100ms)
  list.addEventListener("dragover", dragOver);
  // Ecoute de l'événement "dragenter" et appel de la fonction dragEnter
  // L'événement dragenter est déclenché lorsqu'un élément glissé ou une sélection de texte entre dans une cible de drop valide.
  list.addEventListener("dragenter", dragEnter);
  // Ecoute de l'événement "dragleave" et appel de la fonction dragLeave
  // L'événement dragleave est déclenché lorsqu'un élément glissé ou une sélection de texte quitte une cible de dépôt valide.
  list.addEventListener("dragleave", dragLeave);
  // Ecoute de l'événement "drop" et appel de la fonction drop
  // L'événement drop est déclenché lorsqu'un élément ou une sélection de texte est déposé sur une cible de dépôt valide.
  list.addEventListener("drop", drop);
});
