import { SITE_TEXT, PHOTOS } from './content.js';
import { saveVoteToFirebase } from './firebase.js';

const state = {
  activeScreen: 'intro',
  ladderSlots: Array(10).fill(null),
  poolOrder: PHOTOS.map((photo) => photo.id),
  messageTimeout: null,
};

const elements = {
  screenIntro: document.querySelector('#screen-intro'),
  screenPool: document.querySelector('#screen-pool'),
  screenLadder: document.querySelector('#screen-ladder'),
  photoPool: document.querySelector('#photo-pool'),
  ladderList: document.querySelector('#ladder-list'),
  rankedCount: document.querySelector('#ranked-count'),
  scorePreview: document.querySelector('#score-preview'),
  startVoteBtn: document.querySelector('#start-vote-btn'),
  goToLadderBtn: document.querySelector('#go-to-ladder-btn'),
  backToPoolBtn: document.querySelector('#back-to-pool-btn'),
  submitVoteBtn: document.querySelector('#submit-vote-btn'),
};

function getPhotoById(photoId) {
  return PHOTOS.find((photo) => photo.id === photoId);
}

function setScreen(screenId) {
  state.activeScreen = screenId;
  elements.screenIntro.classList.toggle('active', screenId === 'intro');
  elements.screenPool.classList.toggle('active', screenId === 'pool');
  elements.screenLadder.classList.toggle('active', screenId === 'ladder');
}

function renderPhotoPool() {
  const poolIds = state.poolOrder.filter((photoId) => !state.ladderSlots.includes(photoId));
  elements.photoPool.innerHTML = poolIds
    .map((photoId) => {
      const photo = getPhotoById(photoId);
      return `
        <article class='photo-card relative overflow-hidden rounded-[1.75rem] border border-[#e8d1a8] bg-white shadow-glow transition hover:-translate-y-1 hover:shadow-xl' data-id='${photo.id}' draggable='true'>
          <img src='${photo.imageUrl}' alt='${photo.title}' class='h-52 w-full object-cover' />
          <div class='p-4'>
            <p class='text-xs uppercase tracking-[0.22em] text-[#b47912]'>${photo.year}</p>
            <h3 class='mt-3 text-lg font-bold text-[#2c2017]'>${photo.title}</h3>
            <p class='mt-2 text-sm leading-6 text-[#5c5147]'>${photo.description}</p>
          </div>
          <div class='pointer-events-none absolute bottom-4 left-4 rounded-full bg-[#fbf1dc] px-3 py-1 text-xs font-semibold text-[#7a5f2e]'>${photo.photographer}</div>
        </article>
      `;
    })
    .join('');
}

function renderLadderSlots() {
  elements.ladderList.innerHTML = state.ladderSlots
    .map((photoId, index) => {
      const slotNumber = index + 1;
      const photo = photoId ? getPhotoById(photoId) : null;
      return `
        <section class='rounded-[1.75rem] border border-[#e8d1a8] bg-white p-4 shadow-glow'>
          <div class='flex items-center justify-between gap-3'>
            <div>
              <p class='text-xs uppercase tracking-[0.2em] text-[#b4760f] font-bold'>מקום ${slotNumber}</p>
              <p class='mt-1 text-sm text-[#5c5147]'>${slotNumber === 1 ? 'הכי חשוב' : slotNumber === 10 ? 'חשוב פחות' : 'דרגת דירוג'}</p>
            </div>
            <span class='rounded-full bg-[#f8ecd4] px-3 py-1 text-xs font-semibold text-[#7a5f2e]'>${11 - slotNumber} נקודות</span>
          </div>
          <div class='slot-dropzone mt-4 min-h-[12rem] rounded-[1.5rem] border border-dashed border-[#dcc79f] bg-[#fffbf3] p-3 ${photo ? '' : 'slot-empty'}' data-slot-index='${index}'>
            ${photo ? `
              <article class='photo-card relative overflow-hidden rounded-[1.5rem] border border-[#e8d1a8] bg-white shadow-sm' data-id='${photo.id}'>
                <img src='${photo.imageUrl}' alt='${photo.title}' class='h-48 w-full object-cover' />
                <div class='p-3'>
                  <h3 class='text-base font-bold text-[#2c2017]'>${photo.title}</h3>
                  <p class='mt-2 text-sm leading-6 text-[#5c5147]'>${photo.description}</p>
                </div>
              </article>
            ` : '<p class="text-sm text-[#7a6343]">גררו לכאן תמונה מהמאגר</p>'}
          </div>
        </section>
      `;
    })
    .join('');
}

function updateRankedCount() {
  const count = state.ladderSlots.filter(Boolean).length;
  elements.rankedCount.textContent = `${count}/10`;
}

function updateScorePreview() {
  const items = state.ladderSlots
    .map((photoId, index) => {
      if (!photoId) {
        return '';
      }
      const photo = getPhotoById(photoId);
      const points = 10 - index;
      return `<p class='rounded-3xl bg-[#f6edda] px-4 py-3 text-sm text-[#5b4e3e]'>מקום ${index + 1}: ${photo.title} — ${points} נקודות</p>`;
    })
    .filter(Boolean);

  elements.scorePreview.innerHTML = items.length > 0 ? items.join('') : `<p class='text-sm text-[#6b5a4f]'>הגרר תמונה לסולם כדי לראות את הניקוד.</p>`;
}

function displayMessage(text) {
  clearTimeout(state.messageTimeout);
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 left-1/2 z-50 max-w-md -translate-x-1/2 rounded-[2rem] border border-[#d7ba7f] bg-[#fff3d4] px-6 py-4 text-sm font-semibold text-[#6a4e29] shadow-glow';
  toast.textContent = text;
  document.body.appendChild(toast);
  state.messageTimeout = setTimeout(() => toast.remove(), 2600);
}

function getPoolIdsFromDom() {
  return Array.from(elements.photoPool.querySelectorAll('[data-id]')).map((card) => card.dataset.id);
}

function getLadderSlotsFromDom() {
  return Array.from(elements.ladderList.querySelectorAll('.slot-dropzone')).map((zone) => {
    const card = zone.querySelector('[data-id]');
    return card ? card.dataset.id : null;
  });
}

function syncStateFromDom() {
  state.ladderSlots = getLadderSlotsFromDom();
  const allocatedIds = state.ladderSlots.filter(Boolean);
  state.poolOrder = PHOTOS.map((photo) => photo.id).filter((id) => !allocatedIds.includes(id));
  updateRankedCount();
  updateScorePreview();
}

function handleSubmitVote() {
  const result = {
    scoreMap: {},
    ranking: state.ladderSlots.filter(Boolean),
    timestamp: new Date().toISOString(),
  };

  state.ladderSlots.forEach((photoId, index) => {
    if (!photoId) {
      return;
    }
    result.scoreMap[photoId] = 10 - index;
  });

  saveVoteToFirebase(result).then((response) => {
    if (response.success) {
      displayMessage('הצבעה נשלחה בהצלחה!');
    } else {
      displayMessage('אירעה שגיאה בשמירה. נסו שנית.');
    }
  });
}

function handleSwipeStart(event) {
  state.swipeStartX = event.touches ? event.touches[0].clientX : event.clientX;
  state.swipeStartY = event.touches ? event.touches[0].clientY : event.clientY;
}

function handleSwipeEnd(event) {
  if (!state.swipeStartX || !state.swipeStartY) {
    return;
  }
  const endX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
  const endY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
  const deltaX = endX - state.swipeStartX;
  const deltaY = endY - state.swipeStartY;

  if (Math.abs(deltaX) > 80 && Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX < 0 && state.activeScreen === 'pool') {
      setScreen('ladder');
      displayMessage('הגעתם לסולם הדירוג');
    }
    if (deltaX > 0 && state.activeScreen === 'ladder') {
      setScreen('pool');
      displayMessage('חזרתם למאגר התמונות');
    }
  }

  state.swipeStartX = null;
  state.swipeStartY = null;
}

let photoPoolSortable = null;
let slotSortables = [];

function initializeDragAndDrop() {
  photoPoolSortable = Sortable.create(elements.photoPool, {
    group: 'shared',
    animation: 220,
    swap: true,
    swapClass: 'swap-highlight',
    ghostClass: 'opacity-70',
    fallbackOnBody: true,
    onChoose() {
      if (state.activeScreen === 'pool') {
        setTimeout(() => setScreen('ladder'), 280);
      }
    },
    onEnd() {
      syncStateFromDom();
    },
  });

  const zones = Array.from(document.querySelectorAll('.slot-dropzone'));
  slotSortables = zones.map((zone) => {
    return Sortable.create(zone, {
      group: 'shared',
      animation: 220,
      swap: true,
      swapClass: 'swap-highlight',
      ghostClass: 'opacity-70',
      fallbackOnBody: true,
      onEnd() {
        syncStateFromDom();
      },
    });
  });
}

function initializeApp() {
  setScreen('intro');
  renderPhotoPool();
  renderLadderSlots();
  initializeDragAndDrop();
  updateRankedCount();
  updateScorePreview();

  elements.startVoteBtn.addEventListener('click', () => setScreen('pool'));
  elements.goToLadderBtn.addEventListener('click', () => setScreen('ladder'));
  elements.backToPoolBtn.addEventListener('click', () => setScreen('pool'));
  elements.submitVoteBtn.addEventListener('click', handleSubmitVote);
  document.addEventListener('touchstart', handleSwipeStart, { passive: true });
  document.addEventListener('touchend', handleSwipeEnd, { passive: true });
  document.addEventListener('mousedown', handleSwipeStart);
  document.addEventListener('mouseup', handleSwipeEnd);
}

initializeApp();
