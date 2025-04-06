const form = document.getElementById('contact-form');
const emailInput = form.querySelector('input[name="email"]');
const commentsInput = form.querySelector('textarea[name="comments"]');
const messageBox = document.getElementById('message');
const spinner = document.getElementById('spinner');

const modal = document.getElementById('modal');
const backdrop = document.querySelector('.backdrop');
const closeModalBtn = document.querySelector('.close-modal');


function isValidEmail(email) {
  const pattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return pattern.test(email);
}

function showMessage(msg, type = 'error') {
  messageBox.textContent = msg;
  messageBox.classList.remove('success');
  if (type === 'success') {
    messageBox.classList.add('success');
  }
}


function openModal() {
  modal.classList.remove('hidden');
  backdrop.classList.add('is-open');
}

function closeModal() {
  modal.classList.add('hidden');
  backdrop.classList.remove('is-open');
}


closeModalBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', e => {
  if (e.target === backdrop) {
    closeModal();
  }
});


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  messageBox.textContent = '';

  const email = emailInput.value.trim();
  const comments = commentsInput.value.trim();

  const emailValid = isValidEmail(email);
  const commentsValid = comments.length > 0;


  emailInput.classList.remove('valid', 'invalid');
  commentsInput.classList.remove('valid', 'invalid');

  if (!emailValid || !commentsValid) {
    showMessage('Please enter a valid email and comment.');
    if (!emailValid) emailInput.classList.add('invalid');
    else emailInput.classList.add('valid');

    if (!commentsValid) commentsInput.classList.add('invalid');
    else commentsInput.classList.add('valid');
    return;
  }

 
  emailInput.classList.add('valid');
  commentsInput.classList.add('valid');


  spinner.classList.remove('hidden');


 try {
  const response = await fetch('https://portfolio-js.b.goit.study/api-docs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, message: comments }),
  });

  if (!response.ok) {
    const text = await response.text(); // прочитати текст помилки (HTML)
    throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
  }

  const result = await response.json();

  spinner.classList.add('hidden');
  showMessage('Message sent successfully!', 'success');
  form.reset();
  openModal();
} catch (error) {
  spinner.classList.add('hidden');
  console.error('Submission error:', error);
  showMessage('Something went wrong. Check console.', 'error');
}

});

