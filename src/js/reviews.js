class ReviewsSlider {
  constructor() {
    this.currentIndex = 0;
    this.reviews = [];
    this.slider = document.querySelector('.reviews__list');
    this.prevBtn = document.querySelector('.reviews__button--prev');
    this.nextBtn = document.querySelector('.reviews__button--next');
    this.fallback = document.querySelector('.reviews__fallback');

    this.init();
  }

  async init() {
    try {
      await this.loadReviews();
      this.renderReviews();
      this.setupEvents();
      this.updateButtons();
    } catch (error) {
      this.showError(error);
    }
  }

  async loadReviews() {
    // Замените на реальный API-запрос
    const mockReviews = [
      {
        name: 'Natalia',
        text: 'Work with was extraordinary! He turned out to be a very competent and responsible specialist...',
      },
      {
        name: 'Dmytro',
        text: 'I have the honor to recommend him as an exceptional professional in his field...',
      },
      {
        name: 'Anna',
        text: 'The developed project impresses with its quality and efficiency...',
      },
      {
        name: 'Ivetta',
        text: 'Thanks for the excellent work on the project! His talent and professionalism deserve recognition...',
      },
    ];

    // Имитация задержки загрузки
    await new Promise(resolve => setTimeout(resolve, 500));

    if (mockReviews.length === 0) {
      throw new Error('No reviews found');
    }

    this.reviews = mockReviews;
  }

  renderReviews() {
    if (this.reviews.length === 0) {
      this.showFallback();
      return;
    }

    this.slider.innerHTML = this.reviews
      .map(
        review => `
      <li class="reviews__item">
        <div class="review-card">
          <h3 class="review-card__name">${review.name}</h3>
          <p class="review-card__text">${review.text}</p>
        </div>
      </li>
    `
      )
      .join('');
  }

  setupEvents() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    // Клавиатурная навигация
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
      this.updateButtons();
    }
  }

  nextSlide() {
    if (this.currentIndex < this.reviews.length - 1) {
      this.currentIndex++;
      this.updateSlider();
      this.updateButtons();
    }
  }

  updateSlider() {
    const itemWidth = this.slider.children[0]?.offsetWidth || 0;
    this.slider.style.transform = `translateX(-${
      this.currentIndex * itemWidth
    }px)`;
  }

  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= this.reviews.length - 1;
  }

  showFallback() {
    this.slider.style.display = 'none';
    this.fallback.style.display = 'block';
  }

  showError(error) {
    console.error('Error loading reviews:', error);
    this.showFallback();

    // Показываем сообщение об ошибке
    const errorElement = document.createElement('div');
    errorElement.className = 'reviews__error';
    errorElement.textContent = 'Error loading reviews. Please try again later.';
    this.fallback.appendChild(errorElement);
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new ReviewsSlider();
});
