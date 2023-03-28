const cards = document.querySelectorAll('.memory-card');

let hasFlipppedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    this.classList.toggle('flip');

    if (this === firstCard) return;

    if (!hasFlipppedCard) {
        //first card
        hasFlipppedCard = true;
        firstCard = this;

        return;
    }
    //second card
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    // check for match

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
    [hasFlipppedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Immediately invoked function
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

//setting eventListeners for all the cards.
cards.forEach(card => card.addEventListener('click', flipCard));