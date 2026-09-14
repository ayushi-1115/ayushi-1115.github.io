/* ==========================================================================
   Ayushi Patel — Portfolio Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Typing Text Effect
     -------------------------------------------------------------------------- */
  const typingTextEl = document.getElementById('typing-text');
  const phrases = [
    'Scalable Python Microservices',
    'Machine Learning & NLP Pipelines',
    'Docs-as-Code & System Architecture',
    'AI Model Evaluations & SFT Datasets'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2200; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before new phrase
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typingTextEl) {
    typeEffect();
  }

  /* --------------------------------------------------------------------------
     2. Navbar Scroll Effect & Active Link Highlight
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Navbar glass blur on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight current section in navbar
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     3. Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinksContainer.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Animated Counter Stats
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let count = 0;
      const speed = Math.ceil(target / 40);

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.textContent = count + (stat.textContent.includes('%') ? '%' : '+');
          setTimeout(updateCount, 40);
        } else {
          stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
        }
      };
      updateCount();
    });
  }

  // Trigger animation on load or scroll
  animateCounters();

  /* --------------------------------------------------------------------------
     5. Interactive Contact Form Handler
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const submitBtn = document.getElementById('btn-submit');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        
        formToast.className = 'form-toast success';
        formToast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Your message has been sent successfully. I will get back to you shortly.`;
        
        contactForm.reset();

        setTimeout(() => {
          formToast.style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }

});
