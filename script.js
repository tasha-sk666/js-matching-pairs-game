(() => {
  const cardsList = document.querySelector('.cards__list');
  const startBtn = document.querySelector('.btn-start');

  const cardsArr = [];
  const cardsLenght = 8;

  function createArr(arr, lenght) {
    for (let i = 1; i <= lenght; i++) {
      arr.push(i);
      arr.push(i);
    }
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function displayCards(arr) {
    let displayCardsString = '';

    arr.forEach((i) => {
      displayCardsString += `
            <li class="card" data-value="${i}">
              <div class="card__face card__face--front"></div>
              <div class="card__face card__face--back">${i}</div>
            </li>
          `;

      cardsList.innerHTML = displayCardsString;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    createArr(cardsArr, cardsLenght);
    shuffle(cardsArr);
    displayCards(cardsArr);

    const cards = document.querySelectorAll('.card');
    const minutesItem = document.getElementById('minutes');
    const secondsItem = document.getElementById('seconds');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard;
    let secondCard;

    let moves = 0;
    let timer;
    let timeMinut = 1 * 60;
    let isTimer = false;

    function movesItem() {
      moves = ++moves;
      document.querySelector('.moves__value').textContent = moves;
    }

    function removeMovesItem() {
      moves = 0;
      document.querySelector('.moves__value').textContent = moves;
    }

    function clearTimer() {
      isTimer = false;
      clearInterval(timer);
      cards.forEach((card) => card.removeEventListener('click', flipCard));
      startBtn.classList.remove('visually-hidden');
    }

    function displayTimer() {
      const seconds = timeMinut % 60;
      const minutes = (timeMinut / 60) % 60;

      const strTimerMinute = `${Math.trunc(minutes)}`;
      const strTimerSeconds = `${seconds}`;

      minutesItem.textContent = `0${strTimerMinute}`;
      secondsItem.textContent = (strTimerSeconds < 10) ? `0${strTimerSeconds}` : strTimerSeconds;

      if (strTimerMinute <= 0 && strTimerSeconds <= 0) {
        clearTimer();
      }
    }

    function startTimer() {
      timer = setInterval(() => {
        displayTimer();
        --timeMinut;
      }, 1000);
    }

    function restartTimer() {
      isTimer = false;
      timeMinut = 1 * 60;
      displayTimer();
    }

    function shuffleCards(arr) {
      arr.forEach(() => {
        cards.forEach((item, i) => {
          const itemChild = item.querySelector('.card__face--back');
          item.dataset.value = arr[i];
          itemChild.textContent = item.dataset.value;
        });
      });
    }

    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }

    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      firstCard.classList.add('success');
      secondCard.classList.add('success');
      resetBoard();
    }

    function unflipCards() {
      lockBoard = true;

      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
      }, 1500);
    }

    function checkForMatch() {
      const isMatch = firstCard.dataset.value === secondCard.dataset.value;
      isMatch ? disableCards() : unflipCards();
    }

    function flipCard(e) {
      if (lockBoard) return;
      const currentItem = e.currentTarget;
      if (currentItem === firstCard) return;
      currentItem.classList.add('flipped');
      movesItem();

      if (!isTimer) {
        isTimer = true;
        startTimer();
      }

      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = currentItem;
        return;
      }

      secondCard = currentItem;

      checkForMatch();

      if (document.querySelectorAll('.card').length === document.querySelectorAll('.card.success').length) {
        setTimeout(() => {
          startBtn.classList.remove('visually-hidden');
        }, 500);

        clearTimer();
      }
    }

    function restartCard() {
      shuffle(cardsArr);
      shuffleCards(cardsArr);
      cards.forEach((card) => card.addEventListener('click', flipCard));
      cards.forEach((card) => {
        card.classList.remove('flipped');
        card.classList.remove('success');
      });
    }

    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      restartCard();
      removeMovesItem();
      restartTimer();
      setTimeout(() => {
        startBtn.classList.add('visually-hidden');
      }, 500);
    });

    if (cards) {
      cards.forEach((card) => card.addEventListener('click', flipCard));
    }
  });
})();
