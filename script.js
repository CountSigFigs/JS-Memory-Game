const cards = document.querySelectorAll('.memory-card');
const button= document.getElementById('resetButton')
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {

  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {

   //same as saying hasFlippedCard=false, lockBoard=false
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


//imediately invoked function due to parenthesis around function and at end ()
(function shuffle(){
   cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order= randomPos
   })
})()

function resetGame(){

   
  cards.forEach(card =>card.classList.remove('flip'))
  cards.forEach(card => card.addEventListener('click', flipCard));
  setTimeout(() => {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order= randomPos
   })
  }, 1500);
  
  hasFlippedCard=false;
  lockedBoard=false;
  firstCard;
  secondCard;
}

cards.forEach(card => card.addEventListener('click', flipCard));

button.addEventListener('click',resetGame)
