const openMenu = document.querySelector('.js-nav-list-open');
const navList = document.querySelector('.nav-list');
openMenu.addEventListener(`click`, () => {
  navList.classList.toggle('is-open');
});
