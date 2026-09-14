/* ==========================================================================
   Ayushi Patel — Portfolio Interactive Scripts (V2 - Full Feature Set)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Typing Text Effect
     -------------------------------------------------------------------------- */
  const typingTextEl = document.getElementById('typing-text');
  const phrases = [
    'Scalable Python Microservices',
    'FastAPI & Async Rest Architectures',
    'Machine Learning & NLP Pipelines',
    'Docs-as-Code & System Blueprints',
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
      typeSpeed = 2200;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typingTextEl) {
    typeEffect();
  }

  /* --------------------------------------------------------------------------
     2. Light / Dark Theme Toggle
     -------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('portfolio-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('portfolio-theme', 'light');
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Dual Resume Download Dropdown
     -------------------------------------------------------------------------- */
  const resumeDropdown = document.getElementById('resume-dropdown-nav');
  const btnResumeDropdown = document.getElementById('btn-resume-dropdown');

  if (btnResumeDropdown && resumeDropdown) {
    btnResumeDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      resumeDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      resumeDropdown.classList.remove('active');
    });
  }

  /* --------------------------------------------------------------------------
     4. Project Category Filter Tabs
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. Live GeoHack Haversine Distance Calculator Demo
     -------------------------------------------------------------------------- */
  const btnCalcGeo = document.getElementById('btn-calc-geo');
  const geoResult = document.getElementById('geo-result');

  if (btnCalcGeo && geoResult) {
    btnCalcGeo.addEventListener('click', () => {
      const lat1 = parseFloat(document.getElementById('geo-lat1').value);
      const lon1 = parseFloat(document.getElementById('geo-lon1').value);
      const lat2 = parseFloat(document.getElementById('geo-lat2').value);
      const lon2 = parseFloat(document.getElementById('geo-lon2').value);

      if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
        geoResult.style.display = 'block';
        geoResult.innerHTML = `<span style="color:#EF4444;">⚠️ Please enter valid numeric coordinates.</span>`;
        return;
      }

      const R = 6371; // km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = (R * c).toFixed(2);
      const inFence = dist <= 100;

      geoResult.style.display = 'block';
      geoResult.innerHTML = `
        <div style="background: rgba(59,130,246,0.1); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(59,130,246,0.3);">
          ⚡ <strong>Calculated Distance:</strong> <span style="color:var(--accent-cyan); font-weight:bold;">${dist} km</span><br>
          📍 <strong>Geofence Status (100km radius):</strong> 
          <span style="color:${inFence ? '#10B981' : '#F59E0B'}; font-weight:bold;">
            ${inFence ? '✅ INSIDE GEOFENCE' : '⚠️ OUT OF BOUNDS'}
          </span>
        </div>
      `;
    });
  }

  /* --------------------------------------------------------------------------
     6. Live Architecture Document Modal Viewer
     -------------------------------------------------------------------------- */
  const docModal = document.getElementById('doc-modal');
  const modalTitle = document.getElementById('modal-doc-title');
  const modalBody = document.getElementById('modal-doc-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const docsDatabase = {
    geohack: {
      title: "GeoHack — Real-Time Geofencing System Design",
      content: `
        <h2>1. System Architecture Overview</h2>
        <p>GeoHack is a high-availability real-time location processing service designed to evaluate user GPS coordinates against dynamic polygon geofences with sub-second latency.</p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Haversine Spatial Calculation:</strong> Computes exact spherical distance between coordinate points.</li>
          <li><strong>GeoJSON Polygon Ingestion:</strong> Supports complex multi-point geofences for urban boundaries.</li>
          <li><strong>FastAPI &amp; Async I/O:</strong> High throughput REST endpoints serving 5,000+ requests per second.</li>
        </ul>

        <h2>2. Technical Specifications</h2>
        <pre><code># Python Haversine Implementation
import math

def haversine(lat1, lon1, lat2, lon2):
    R = 6371.0 # Radius of earth in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))</code></pre>
      `
    },
    ratelimiter: {
      title: "Distributed Rate Limiter Microservice Spec",
      content: `
        <h2>1. Architecture &amp; Throttling Algorithms</h2>
        <p>Distributed rate limiter microservice protecting downstream microservices from DDoS attacks and traffic spikes.</p>

        <h3>Algorithms Supported</h3>
        <ul>
          <li><strong>Token Bucket:</strong> Smooth burst traffic handling with configurable bucket capacity and refill rate.</li>
          <li><strong>Sliding Window Counter:</strong> Precision rate limiting using Redis Sorted Sets (ZSET).</li>
        </ul>

        <h2>2. Redis ZSET Sliding Window Implementation</h2>
        <pre><code>// Redis Rate Limiting Pseudo-code
long now = currentTimeMillis();
long windowStart = now - 60000; // 1 minute window

pipeline.zremrangebyscore(userKey, 0, windowStart);
pipeline.zadd(userKey, now, now);
pipeline.zcard(userKey);
pipeline.expire(userKey, 60);</code></pre>
      `
    },
    cochat: {
      title: "CoChat — Real-Time Chat Infrastructure Spec",
      content: `
        <h2>1. High-Level System Architecture</h2>
        <p>Asynchronous WebSocket event broadcast engine providing low-latency messaging, presence tracking, and chat room state synchronization.</p>

        <h3>Core Capabilities</h3>
        <ul>
          <li><strong>WebSocket Connection Pooling:</strong> Manages concurrent client sockets with ping/pong heartbeat.</li>
          <li><strong>Database Persistence:</strong> Asynchronous PostgreSQL batch writes for chat history log.</li>
        </ul>

        <h2>2. OpenAPI WebSocket Protocol Spec</h2>
        <pre><code>// Client WebSocket Message Schema
{
  "event": "message:send",
  "room_id": "room_python_devs",
  "sender": "Ayushi Patel",
  "content": "Hello team, deployment is complete!",
  "timestamp": "2026-09-14T10:00:00Z"
}</code></pre>
      `
    }
  };

  document.querySelectorAll('.btn-view-doc').forEach(btn => {
    btn.addEventListener('click', () => {
      const docKey = btn.getAttribute('data-doc');
      const docData = docsDatabase[docKey];
      if (docData && docModal) {
        modalTitle.textContent = docData.title;
        modalBody.innerHTML = docData.content;
        docModal.classList.add('active');
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      docModal.classList.remove('active');
    });
  }

  if (docModal) {
    docModal.addEventListener('click', (e) => {
      if (e.target === docModal) {
        docModal.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. Interactive FastAPI Code Playground
     -------------------------------------------------------------------------- */
  const apiTestBtns = document.querySelectorAll('.btn-api-test');
  const terminalOutput = document.getElementById('terminal-output');

  const mockApiResponses = {
    health: {
      status: "online",
      framework: "FastAPI 0.100.0",
      developer: "Ayushi Patel",
      environment: "production",
      timestamp: new Date().toISOString()
    },
    projects: {
      success: true,
      count: 3,
      data: [
        { id: "geohack", title: "GeoHack Real-Time Geofencing", repo: "https://github.com/ayushi-1115/geohack" },
        { id: "docs-as-code", title: "Docs-as-Code Python Suite", repo: "https://github.com/ayushi-1115/ayushi-1115.github.io" },
        { id: "leafypop", title: "LeafyPop E-Commerce Platform", demo: "https://leafypop.onrender.com" }
      ]
    },
    geohack: {
      success: true,
      endpoint: "/api/geohack/calculate",
      distance_km: 74.32,
      radius_km: 100.0,
      inside_geofence: true,
      status: "WITHIN_BOUNDS"
    },
    docs: {
      openapi: "3.0.2",
      info: {
        title: "Ayushi Patel Portfolio API",
        version: "2.0.0",
        description: "High-performance FastAPI backend with Pydantic validation & Swagger UI"
      },
      paths: ["/api/health", "/api/projects", "/api/contact", "/api/geohack/calculate", "/api/resume/download"]
    }
  };

  apiTestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const endpoint = btn.getAttribute('data-endpoint');
      const responseData = mockApiResponses[endpoint];

      if (terminalOutput && responseData) {
        terminalOutput.innerHTML = `<span style="color:var(--accent-cyan);">$ requesting endpoint...</span>\n\n` +
          JSON.stringify(responseData, null, 2);
      }
    });
  });

  /* --------------------------------------------------------------------------
     8. Navbar Scroll & Active Link Highlight
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

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
     9. Mobile Nav Toggle
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }

  /* --------------------------------------------------------------------------
     10. Animated Counter Stats
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');

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

  animateCounters();

  /* --------------------------------------------------------------------------
     11. Contact Form Submission Handler
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const submitBtn = document.getElementById('btn-submit');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing with FastAPI...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';

        formToast.className = 'form-toast success';
        formToast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Your message has been processed by Ayushi's FastAPI backend.`;

        contactForm.reset();

        setTimeout(() => {
          formToast.style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }

});
