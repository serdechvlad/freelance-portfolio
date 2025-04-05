import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
//import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', () => {
  new Accordion('#accordion-about', {
    duration: 300,
    showMultiple: false,
    openOnInit: [0],
  });

  const swiper = new Swiper('#swiper-about', {
    modules: [Navigation],
    // Default parameters
    slidesPerView: 2,
    spaceBetween: 0,
    slideToClickedSlide: true,
    // Responsive breakpoints
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 6,
      },
    },
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    autoplay: {
      delay: 5000,
    },
    grabCursor: true,
  });
});
