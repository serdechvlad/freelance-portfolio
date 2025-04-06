import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import Swiper from 'swiper';
Swiper.use([Keyboard]);
import { Navigation, Autoplay, Keyboard, EffectCreative } from 'swiper/modules';
import 'swiper/css';
//import 'swiper/css/navigation';
import 'swiper/css/effect-creative';

document.addEventListener('DOMContentLoaded', () => {
  new Accordion('#accordion-about', {
    duration: 300,
    showMultiple: false,
    openOnInit: [0],
  });

  const swiper = new Swiper('#swiper-about', {
    modules: [Navigation, Autoplay, Keyboard, EffectCreative],
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
    effect: 'creative',
    creativeEffect: {
      limitProgress: 6,
      prev: {
        translate: ['-100%', 0, 0],
        rotate: [0, 0, -360],
      },
      next: {
        translate: ['100%', 0, 0],
        rotate: [0, 0, 360],
      },
    },
    speed: 1400,
    autoplay: {
      delay: 2500,
    },
    grabCursor: true,
  });
});
