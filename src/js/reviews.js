import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import { getReviews } from './rew.js';

const reviewsList = document.querySelector('.reviews-list');
// const nextButton = document.querySelector('.swiper-button-next');
// const prevButton = document.querySelector('.swiper-button-prev');
// const swiperContainer = document.querySelector('.swiper');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await getReviews();

    if (!response || !response.data || response.data.length === 0) {
      throw new Error('No reviews data received');
    }

    renderReviewsCards(response.data);
    // initSwiper(); // инициализируем только после вставки
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
      <li class="swiper-slide reviews-item" role="group" aria-label="Відгук">
        <div class="swiper-slide-content">
          <img class="reviews-img" src="${avatar_url}" alt="${author}" width="48" height="48" loading="lazy">
          <h3 class="swiper-reviews-title">${author}</h3>
          <p class="reviews-text">${review}</p>
        </div>
      </li>
    `
    )
    .join('');
  reviewsList.innerHTML = markup;
}
const reviewsSwiper = new Swiper('.reviews-swiper', {
  // spaceBetween: 16,
  navigation: {
    nextEl: '.reviews-btn-next',
    prevEl: '.reviews-btn-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  parallax: {
    enabled: true,
    speed: 2000,
  },
  a11y: {
    enabled: true,
  },

  breakpoints: {
    375: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
  },
  on: {
    slideChange: function () {
      // Перевірка на початок і кінець списку
      const prevButton = document.querySelector('.reviews-btn-prev');
      const nextButton = document.querySelector('.reviews-btn-next');

      if (this.isBeginning) {
        prevButton.classList.add('swiper-button-disabled');
      } else {
        prevButton.classList.remove('swiper-button-disabled');
      }

      if (this.isEnd) {
        nextButton.classList.add('swiper-button-disabled');
      } else {
        nextButton.classList.remove('swiper-button-disabled');
      }
    },
  },
});

// function initSwiper() {
//   const reviewsSwiper = new Swiper('reviews-swiper', {
//     loop: false,
//     slidesPerView: 1,
//     spaceBetween: 30,
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     keyboard: {
//       enabled: true,
//       onlyInViewport: true,
//     },
//     a11y: {
//       prevSlideMessage: 'Попередній відгук',
//       nextSlideMessage: 'Наступний відгук',
//       firstSlideMessage: 'Це перший відгук',
//       lastSlideMessage: 'Це останній відгук',
//       paginationBulletMessage: 'Перейти до відгуку {{index}}',
//     },
//     on: {
//       init: function () {
//         updateButtonStates(this);
//       },
//       slideChange: function () {
//         updateButtonStates(this);
//       },
//     },
//     breakpoints: {
//       375: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 2,
//       },
//       1440: {
//         slidesPerView: 4,
//       },
//     },
//   });
