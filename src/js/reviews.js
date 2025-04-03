document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Load reviews data
    const reviews = await loadReviews();

    // Render reviews
    renderReviews(reviews);

    // Initialize slider
    initSlider();
  } catch (error) {
    console.error('Error:', error);
    showFallback();
    showError(error.message);
  }
});

// Mock API call (replace with real fetch)
async function loadReviews() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      name: 'Natalia',
      text: 'Work with was extraordinary! He turned out to be a very competent and responsible specialist. The projects were completed on time and the result exceeded my expectations.',
    },
    {
      name: 'Dmytro',
      text: 'I have the honor to recommend him as an exceptional professional in his field. His knowledge and expertise are undeniable. Cooperation with him always brings impressive results.',
    },
    {
      name: 'Anna',
      text: 'The developed project impresses with its quality and efficiency. The code is cleanly written and the functionality exceeds expectations. Extremely satisfied with the cooperation!',
    },
    {
      name: 'Ivetta',
      text: 'Thanks for the excellent work on the project! His talent and professionalism deserve recognition. I recommend it to everyone who is looking for an expert in the field of software development.',
    },
  ];
}

function renderReviews(reviews) {
  const list = document.querySelector('.reviews-list');

  if (!reviews || reviews.length === 0) {
    showFallback();
    return;
  }

  list.innerHTML = reviews
    .map(
      review => `
    <li class="review-item">
      <h3 class="review-author">${review.name}</h3>
      <p class="review-text">${review.text}</p>
    </li>
  `
    )
    .join('');
}

function initSlider() {
  const list = document.querySelector('.reviews-list');
  const prevBtn = document.querySelector('.reviews-prev');
  const nextBtn = document.querySelector('.reviews-next');
  let currentIndex = 0;

  function updateSlider() {
    const itemWidth = document.querySelector('.review-item').offsetWidth + 20;
    list.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    updateButtons();
  }

  function updateButtons() {
    const visibleItems = getVisibleItemsCount();
    const totalItems = document.querySelectorAll('.review-item').length;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalItems - visibleItems;
  }

  function getVisibleItemsCount() {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // Event listeners
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    const visibleItems = getVisibleItemsCount();
    const totalItems = document.querySelectorAll('.review-item').length;

    if (currentIndex < totalItems - visibleItems) {
      currentIndex++;
      updateSlider();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    currentIndex = 0;
    list.style.transform = 'translateX(0)';
    updateButtons();
  });

  // Initial update
  updateButtons();
}

function showFallback() {
  document.querySelector('.reviews-container').style.display = 'none';
  document.querySelector('.reviews-fallback').style.display = 'block';
}

function showError(message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-notification';
  errorElement.textContent = `Error: ${message}`;
  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
}
