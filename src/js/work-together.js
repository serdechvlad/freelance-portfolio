document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const emailInput = document.getElementById('email');
  const emailWrapper = document.querySelector('.email-wrapper');
  const emailMessage = document.querySelector('.email-message');
  const commentsInput = document.getElementById('comments');
  const commentsWrapper = document.querySelector('.comments-wrapper');
const commentsMessage = document.querySelector('.comments-message');
  const messageElement = document.getElementById('message');
  const modal = document.getElementById('modal');
  const backdrop = document.querySelector('.backdrop');
  const closeModalBtn = document.querySelector('.close-modal');
  const spinner = document.getElementById('spinner');


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

  emailInput.addEventListener('input', validateEmail);

  
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    
    validateEmail();

    if (emailInput.classList.contains('valid')) {
      
      spinner.classList.remove('hidden');

     
      setTimeout(function () {
        spinner.classList.add('hidden');

        
        backdrop.classList.add('is-open');
        form.reset();
      }, 2000);
    }
  });

 
  closeModalBtn.addEventListener('click', function () {
    backdrop.classList.remove('is-open');
  });

  backdrop.addEventListener('click', function (event) {
    if (event.target === backdrop) {
      backdrop.classList.remove('is-open');
    }
  });


  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      backdrop.classList.remove('is-open');
    }
  });
});


