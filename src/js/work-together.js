document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const emailInput = document.getElementById('email');
  const commentsInput = document.getElementById('comments');
  const messageElement = document.getElementById('message');
  const modal = document.getElementById('modal');
  const backdrop = document.querySelector('.backdrop');
  const closeModalBtn = document.querySelector('.close-modal');
  const spinner = document.getElementById('spinner');

  // Функція для валідації email
  function validateEmail() {
    const emailValue = emailInput.value;
    const emailPattern = new RegExp(emailInput.pattern);
    if (emailPattern.test(emailValue)) {
      emailInput.classList.remove('invalid');
      emailInput.classList.add('valid');
      messageElement.textContent = 'Success!';
      messageElement.classList.remove('error');
      messageElement.classList.add('success');
    } else {
      emailInput.classList.remove('valid');
      emailInput.classList.add('invalid');
      messageElement.textContent = 'Invalid email, try again.';
      messageElement.classList.remove('success');
      messageElement.classList.add('error');
    }
  }

  // Валідація під час введення
  emailInput.addEventListener('input', validateEmail);

  // Валідація при відправленні форми
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Валідація email
    validateEmail();

    if (emailInput.classList.contains('valid')) {
      // Показуємо спінер і відправляємо форму
      spinner.classList.remove('hidden');

      // Симулюємо асинхронний запит
      setTimeout(function () {
        spinner.classList.add('hidden');

        // Відкриваємо модальне вікно при успіху
        backdrop.classList.add('is-open');
        form.reset();
      }, 2000); // Час затримки для демонстрації
    }
  });

  // Закриття модального вікна
  closeModalBtn.addEventListener('click', function () {
    backdrop.classList.remove('is-open');
  });

  backdrop.addEventListener('click', function (event) {
    if (event.target === backdrop) {
      backdrop.classList.remove('is-open');
    }
  });

  // Закриття модального вікна за допомогою клавіші Escape
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      backdrop.classList.remove('is-open');
    }
  });
});


