document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var $ = window.jQuery;

  svg4everybody();
  $.fancybox.defaults.animationEffect = "zoom-in-out";

  window.addEventListener('scroll', function () {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 0) {
      document.body.classList.add('is-main-header-sticky');
    } else {
      document.body.classList.remove('is-main-header-sticky');
    }
  });

  if ($('.common-page__feature-picture').length === 0) {
    document.body.classList.add('is-not-featured-picture');
  }

  // $('.js-index-slider').flickity({
  //   cellSelector: '.index-slider__item',
  //   wrapAround: true,
  //   prevNextButtons: false,
  // });

  $('.js-index-slider').slick({
    autoplay: true,
    pauseOnHover: false,
    speed: 1200,
    // fade: true,
    arrows: false,
    dots: true,
    slide: '.index-slider__item'
  });

  // $('.js-index-partners-slider').flickity({
  //   autoPlay: true,
  //   pageDots: false,
  //   wrapAround: true,
  //   prevNextButtons: true,
  //   // contain: true,
  // });

  $('.js-index-partners-slider').slick({
    // arrows: false,
    dots: false,
    slidesToShow: 3,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: true
      }
    }]
  });

  $('[data-tilt]').tilt({
    maxTilt: 15,
    perspective: 980,
    speed: 800
  });

  $('.index-partners [data-tilt]').tilt({
    maxTilt: 17,
    scale: 1.25,
    speed: 1000
  });

  $('.index-tabs-about').tabslet();
  $('.common-tabs').tabslet();

  var timelineElem = document.querySelector('.timeline');
  if (timelineElem) {
    new Timeline({
      timeline: timelineElem,
      buttonTextToExpand: 'Подробнее',
      buttonTextToCut: 'Скрыть',
    });
  }

  if (window.matchMedia('(min-width: 1024px)').matches) {
    $('[data-sticky-target]').stick_in_parent({
      // parent: '[data-sticky-parent]',
      offset_top: document.querySelector('.main-header').offsetHeight
    });
  }
});
