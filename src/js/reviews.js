import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import { getReviews } from './rew.js';

const reviewsList = document.querySelector('.reviews-list');
const nextButton = document.querySelector('.swiper-button-next');
const prevButton = document.querySelector('.swiper-button-prev');
const swiperContainer = document.querySelector('.swiper');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await getReviews();

    if (!response || !response.data || response.data.length === 0) {
      throw new Error('No reviews data received');
    }

    renderReviewsCards(response.data);
    initSwiper(); // инициализируем только после вставки
  } catch (error) {
    console.error('Error loading reviews:', error);
    showErrorNotification();
    renderFallbackMessage();
  }
});

function renderReviewsCards(cards) {
  const markup = cards
    .map(
      ({ author, avatar_url, review }) => `
      <li class="swiper-slide" role="group" aria-label="Відгук">
        <div class="reviews-slide-content">
          <img src="${avatar_url}" alt="${author}" width="48" height="48" loading="lazy">
          <h3>${author}</h3>
          <p>${review}</p>
        </div>
      </li>
    `
    )
    .join('');
  reviewsList.innerHTML = markup;
}

function initSwiper() {
  const swiper = new Swiper('.reviews-swiper', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      prevSlideMessage: 'Попередній відгук',
      nextSlideMessage: 'Наступний відгук',
      firstSlideMessage: 'Це перший відгук',
      lastSlideMessage: 'Це останній відгук',
      paginationBulletMessage: 'Перейти до відгуку {{index}}',
    },
    on: {
      init: function () {
        updateButtonStates(this);
      },
      slideChange: function () {
        updateButtonStates(this);
      },
    },
    breakpoints: {
      375: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1440: {
        slidesPerView: 4,
      },
    },
  });

  document.addEventListener('keydown', e => {
    if (
      document.activeElement === nextButton ||
      document.activeElement === prevButton
    ) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (document.activeElement === nextButton && !nextButton.disabled) {
          swiper.slideNext();
        } else if (
          document.activeElement === prevButton &&
          !prevButton.disabled
        ) {
          swiper.slidePrev();
        }
      }
    }
  });
}

function renderFallbackMessage() {
  swiperContainer.style.display = 'none';

  const fallbackContainer = document.createElement('div');
  fallbackContainer.className = 'reviews-fallback';
  fallbackContainer.textContent = 'Not found';
  fallbackContainer.setAttribute('aria-live', 'polite');

  document.querySelector('.reviews-section').appendChild(fallbackContainer);
}

function showErrorNotification() {
  const notification = document.createElement('div');
  notification.className = 'error-notification';
  notification.textContent =
    'Помилка завантаження відгуків. Будь ласка, спробуйте пізніше.';
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'assertive');

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 500);
  }, 5000);
}

function updateButtonStates(swiper) {
  if (swiper.isBeginning) {
    prevButton.disabled = true;
    prevButton.setAttribute('aria-disabled', 'true');
    prevButton.classList.add('swiper-button-disabled');
  } else {
    prevButton.disabled = false;
    prevButton.setAttribute('aria-disabled', 'false');
    prevButton.classList.remove('swiper-button-disabled');
  }

  if (swiper.isEnd) {
    nextButton.disabled = true;
    nextButton.setAttribute('aria-disabled', 'true');
    nextButton.classList.add('swiper-button-disabled');
  } else {
    nextButton.disabled = false;
    nextButton.setAttribute('aria-disabled', 'false');
    nextButton.classList.remove('swiper-button-disabled');
  }
}
