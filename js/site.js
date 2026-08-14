/* Brook Truck Services Ltd — site script */
(function () {
  'use strict';

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Opening animation
  --------------------------------------------------------------- */
  var intro = document.getElementById('intro');
  if (intro) {
    if (reduce) {
      intro.parentNode.removeChild(intro);
    } else {
      var kill = function () {
        intro.classList.add('done');
        window.setTimeout(function () {
          if (intro.parentNode) intro.parentNode.removeChild(intro);
        }, 700);
      };
      window.setTimeout(kill, 1450);
      window.addEventListener('load', function () {
        window.setTimeout(kill, 400);
      });
    }
  }

  /* ---------------------------------------------------------------
     Mobile drawer
  --------------------------------------------------------------- */
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        drawer.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------------------------------------
     Rolling hero
  --------------------------------------------------------------- */
  var slides = document.querySelectorAll('.hero-slides .slide');
  if (slides.length > 1 && !reduce) {
    var i = 0;
    window.setInterval(function () {
      slides[i].classList.remove('on');
      i = (i + 1) % slides.length;
      slides[i].classList.add('on');
    }, 5600);
  }

  /* ---------------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------------- */
  var rises = document.querySelectorAll('.rise');
  if (!rises.length) return void gmail();
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(rises, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    Array.prototype.forEach.call(rises, function (el) { io.observe(el); });
  }

  gmail();

  /* ---------------------------------------------------------------
     Build the Gmail compose links at runtime.
     The address is never present in the HTML source.
  --------------------------------------------------------------- */
  function gmail() {
    document.querySelectorAll('a[data-gmail]').forEach(function (a) {
      var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
      a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' +
        encodeURIComponent(to) +
        '&su=' + (a.getAttribute('data-su') || '') +
        '&body=' + (a.getAttribute('data-body') || '');
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }
})();
