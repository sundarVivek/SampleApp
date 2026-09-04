const modal = document.querySelector('#authModal');
const authForm = document.querySelector('#authForm');
const confirmField = document.querySelector('.confirm-field');
const submitLabel = document.querySelector('.submit-label');
const authStatus = document.querySelector('.auth-status');

function setAuthTab(tab) {
  document.querySelectorAll('[data-tab]').forEach(button => button.classList.toggle('selected', button.dataset.tab === tab));
  const isRegistering = tab === 'register';
  confirmField.hidden = !isRegistering;
  confirmField.querySelector('input').required = isRegistering;
  submitLabel.textContent = isRegistering ? 'Create my account' : 'Continue to Northstar';
  authStatus.textContent = '';
}

function openAuth(tab) {
  modal.hidden = false;
  document.body.classList.add('modal-open');
  setAuthTab(tab);
  modal.querySelector('input').focus();
}

document.querySelectorAll('[data-auth]').forEach(button => button.addEventListener('click', () => openAuth(button.dataset.auth)));
document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => setAuthTab(button.dataset.tab)));
document.querySelector('.modal-close').addEventListener('click', () => { modal.hidden = true; document.body.classList.remove('modal-open'); });
modal.addEventListener('click', event => { if (event.target === modal) { modal.hidden = true; document.body.classList.remove('modal-open'); } });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) { modal.hidden = true; document.body.classList.remove('modal-open'); } });

authForm.addEventListener('submit', event => {
  event.preventDefault();
  const isRegistering = !confirmField.hidden;
  const password = authForm.querySelector('input[type="password"]');
  const confirmation = confirmField.querySelector('input');
  if (isRegistering && password.value !== confirmation.value) {
    authStatus.textContent = 'Your passwords do not match.';
    return;
  }
  authStatus.textContent = isRegistering ? 'Account created. Welcome to Northstar.' : 'You are signed in. Welcome back.';
  authForm.reset();
});

document.querySelector('#contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const status = event.currentTarget.querySelector('.form-status');
  status.textContent = 'Thanks for reaching out. We will be in touch soon.';
  event.currentTarget.reset();
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));