import Accordion from 'accordion-js';
import "accordion-js/dist/accordion.min.css";
//import Swiper from 'swiper';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

document.addEventListener("DOMContentLoaded", () => {
  new Accordion(".accordion-container", {
    duration: 400,
    showMultiple: false,
    openOnInit: [0],
  });

    const swiper = new Swiper('.swiper', {
    modules: [Navigation],
    // Default parameters
    slidesPerView: 2,
        spaceBetween: 0,
    autoplay: {
   delay: 5000,},
    centeredSlides: false,
    slideToClickedSlide: true,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 768
      768: {
        slidesPerView: 3
      
      },
      // when window width is >= 1440px
      1440: {
        slidesPerView: 6
      }
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next"
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    grabCursor: true,
  });
});
