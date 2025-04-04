document.addEventListener('DOMContentLoaded', async () => {
  const reviewsContainer = document.querySelector('.reviews-swiper');
  const fallbackElement = document.querySelector('.reviews-fallback');
  const errorNotification = document.querySelector('.error-notification');

  try {
    // 1. Загрузка данных
    const reviews = await loadReviews();

    // 2. Проверка наличия данных
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
      showFallback();
      return;
    }

    // 3. Отрисовка отзывов
    renderReviews(reviews);
    initSwiper();
  } catch (error) {
    console.error('Ошибка при загрузке отзывов:', error);
    showError('Failed to load reviews. Please try again later.');
    showFallback();
  }

  // Функция загрузки данных
  async function loadReviews() {
    // Ваши данные
    return [
      {
        _id: 1,
        author: 'Natalia',
        avatar_url: 'https://ftp.goit.study/img/avatars/4.jpg',
        review:
          'Work with was extraordinary! He turned out to be a very competent and responsible specialist. The projects were completed on time and the result exceeded my expectations.',
      },
      {
        _id: 2,
        author: 'Dmytro',
        avatar_url: 'https://ftp.goit.study/img/avatars/5.jpg',
        review:
          'I have the honor to recommend him as an exceptional professional in his field. His knowledge and expertise are undeniable. Cooperation with him always brings impressive results.',
      },
      {
        _id: 3,
        author: 'Anna',
        avatar_url: 'https://ftp.goit.study/img/avatars/6.jpg',
        review:
          'The developed project impresses with its quality and efficiency. The code is cleanly written and the functionality exceeds expectations. Extremely satisfied with the cooperation!',
      },
      {
        _id: 4,
        author: 'Ivetta',
        avatar_url: 'https://ftp.goit.study/img/avatars/8.jpg',
        review:
          "It's not the will to win that matters—everyone has that. It's the will to prepare to win that matters.",
      },
      {
        _id: 5,
        author: 'Andriy',
        avatar_url: 'https://ftp.goit.study/img/avatars/9.jpg',
        review:
          'Working with him was an absolute pleasure. He demonstrated exceptional professionalism and skill in handling our project. Not only did he meet all deadlines, but he also went above and beyond to ensure the final product was flawless. Highly recommend his services.',
      },
      {
        _id: 6,
        author: 'Eduard',
        avatar_url: 'https://ftp.goit.study/img/avatars/11.jpg',
        review:
          "I couldn't be happier with the outcome of our collaboration. He proved to be a reliable and proficient expert. The results speak for themselves - impeccable work delivered in a timely manner. Looking forward to future projects together!",
      },
    ];
  }

  // Рендер отзывов
  function renderReviews(reviews) {
    const listElement = document.querySelector('.reviews-list');

    listElement.innerHTML = reviews
      .map(
        review => `
      <li class="swiper-slide" tabindex="0" role="listitem">
        <div class="review-avatar">
          <img src="${review.avatar_url}" 
               alt="${review.author} avatar" 
               width="48" 
               height="48"
               loading="lazy">
        </div>
        <h3 class="review-author">${review.author}</h3>
        <p class="review-text">${review.review}</p>
      </li>
    `
      )
      .join('');
  }

  // Инициализация Swiper
  function initSwiper() {
    const swiper = new Swiper('.reviews-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous review',
        nextSlideMessage: 'Next review',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      },
    });

    // Настройка навигации с клавиатуры
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach((slide, index) => {
      slide.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') {
          swiper.slideNext();
        } else if (e.key === 'ArrowLeft') {
          swiper.slidePrev();
        }
      });
    });
  }

  function showFallback() {
    reviewsContainer.style.display = 'none';
    fallbackElement.style.display = 'block';
  }

  function showError(message) {
    errorNotification.textContent = message;
    errorNotification.style.display = 'block';

    setTimeout(() => {
      errorNotification.style.display = 'none';
    }, 5000);
  }
});
