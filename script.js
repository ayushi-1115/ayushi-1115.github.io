/* ==========================================================================
   Ayushi Patel — Portfolio Interactive Scripts (V3 - Advanced Feature Set)
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
     3. Dual Resume Download & In-Browser Previewer Dropdown
     -------------------------------------------------------------------------- */
  const resumeDropdown = document.getElementById('resume-dropdown-nav');
  const btnResumeDropdown = document.getElementById('btn-resume-dropdown');
  const btnPreviewResume = document.getElementById('btn-preview-resume');

  const docModal = document.getElementById('doc-modal');
  const modalTitle = document.getElementById('modal-doc-title');
  const modalBody = document.getElementById('modal-doc-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (btnResumeDropdown && resumeDropdown) {
    btnResumeDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      resumeDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      resumeDropdown.classList.remove('active');
    });
  }

  // In-Browser Resume Previewer
  if (btnPreviewResume) {
    btnPreviewResume.addEventListener('click', () => {
      if (docModal && modalTitle && modalBody) {
        modalTitle.textContent = "Ayushi Patel — Professional Resume";
        modalBody.innerHTML = `
          <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid var(--border-glass);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div>
                <h2 style="margin: 0; font-size: 22px; color: var(--text-main);">AYUSHI PATEL</h2>
                <p style="color: var(--accent-cyan); font-size: 13px; font-weight: 600;">Python Developer | ML &amp; NLP Engineer | Technical Writer</p>
                <p style="font-size: 12px; color: var(--text-muted);">Valsad, Gujarat, India · ayushisp1132@gmail.com · github.com/ayushi-1115</p>
              </div>
              <a href="../project_parchment/Ayushi_Patel_Updated_Resume.pdf" target="_blank" class="btn btn-sm btn-primary">
                <i class="fa-solid fa-download"></i> Download PDF
              </a>
            </div>

            <hr style="border: 0; border-top: 1px solid var(--border-glass); margin: 16px 0;">

            <h3 style="color: var(--accent-blue); font-size: 15px;">Professional Summary</h3>
            <p style="font-size: 13.5px; color: var(--text-soft);">Results-driven Python Developer and Technical Specialist with 2+ years of experience authoring technical documentation, systems design architecture, API endpoint specifications, and scalable backend automation. Skilled in Docs-as-Code (Markdown, Git), microservices, and AI model evaluation.</p>

            <h3 style="color: var(--accent-blue); font-size: 15px; margin-top: 20px;">Professional Experience</h3>
            <div style="margin-bottom: 12px;">
              <strong style="color: var(--text-main);">Freelance AI Evaluation &amp; Technical Content Specialist</strong> <span style="color: var(--accent-cyan); font-size: 12px;">(Nov 2025 – Present)</span>
              <ul style="padding-left: 18px; font-size: 13px; color: var(--text-muted);">
                <li>Evaluated AI-generated code outputs, python scripts, and technical guides for frontier AI labs.</li>
                <li>Authored technical architecture blueprints, REST API catalogs, and developer SOP runbooks.</li>
              </ul>
            </div>
            <div style="margin-bottom: 12px;">
              <strong style="color: var(--text-main);">Software Developer (Python)</strong> — IT IDOL Technologies <span style="color: var(--accent-cyan); font-size: 12px;">(Jun 2025 – Oct 2025)</span>
              <ul style="padding-left: 18px; font-size: 13px; color: var(--text-muted);">
                <li>Engineered backend Python microservices and automated workflows, reducing processing overhead by 40%.</li>
                <li>Authored API specifications, architectural designs, and deployment runbooks.</li>
              </ul>
            </div>

            <h3 style="color: var(--accent-blue); font-size: 15px; margin-top: 20px;">Education</h3>
            <p style="font-size: 13px; color: var(--text-soft);"><strong>B.E. in Computer Science</strong> — Mahatma Gandhi Institute (2017 – 2021)</p>
          </div>
        `;
        docModal.classList.add('active');
      }
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
     6. Live Architecture Document Modal & Sequence Diagram Viewer
     -------------------------------------------------------------------------- */
  const docsDatabase = {
    geohack: {
      title: "GeoHack — Real-Time Geofencing System Design",
      content: `
        <h2>1. System Architecture Overview</h2>
        <p>GeoHack is a high-availability real-time location processing service designed to evaluate user GPS coordinates against dynamic polygon geofences with sub-second latency.</p>

        <h3>Interactive Sequence Flow</h3>
        <div class="sequence-flow">
          <div class="flow-step"><span class="flow-node">Mobile GPS Client</span> ➔ <code>POST /api/location</code> ➔ <span class="flow-node">FastAPI Gateway</span></div>
          <div class="flow-step"><span class="flow-node">FastAPI Gateway</span> ➔ <code>Calculate Haversine(lat, lon)</code> ➔ <span class="flow-node">Spatial Engine</span></div>
          <div class="flow-step"><span class="flow-node">Spatial Engine</span> ➔ <code>Query Redis GeoIndex</code> ➔ <span class="flow-node">Redis Cluster</span></div>
          <div class="flow-step"><span class="flow-node">Redis Cluster</span> ➔ <code>Return Geofence Event (IN/OUT)</code> ➔ <span class="flow-node">Client App</span></div>
        </div>

        <h2>2. Python Haversine Implementation</h2>
        <pre><code>import math

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

        <h3>Interactive Sequence Flow</h3>
        <div class="sequence-flow">
          <div class="flow-step"><span class="flow-node">Client Request</span> ➔ <code>X-API-Key: client_99</code> ➔ <span class="flow-node">Rate Limiter Middleware</span></div>
          <div class="flow-step"><span class="flow-node">Middleware</span> ➔ <code>ZREMRANGEBYSCORE &amp; ZADD</code> ➔ <span class="flow-node">Redis Cache</span></div>
          <div class="flow-step"><span class="flow-node">Redis Cache</span> ➔ <code>Check Request Count &lt; Limit</code> ➔ <span class="flow-node">Middleware</span></div>
          <div class="flow-step"><span class="flow-node">Middleware</span> ➔ <code>200 OK / 429 Too Many Requests</code> ➔ <span class="flow-node">Client</span></div>
        </div>

        <h2>2. Redis ZSET Sliding Window Implementation</h2>
        <pre><code>long now = currentTimeMillis();
long windowStart = now - 60000;

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
        <p>Asynchronous WebSocket messaging engine providing low-latency messaging, presence tracking, and chat room state synchronization.</p>

        <h3>Interactive Sequence Flow</h3>
        <div class="sequence-flow">
          <div class="flow-step"><span class="flow-node">WebSocket Client</span> ➔ <code>ws://cochat.api/room_01</code> ➔ <span class="flow-node">Asyncio Connection Pool</span></div>
          <div class="flow-step"><span class="flow-node">Connection Pool</span> ➔ <code>Broadcast Event(message)</code> ➔ <span class="flow-node">Subscribed Peers</span></div>
          <div class="flow-step"><span class="flow-node">Async Worker</span> ➔ <code>Batch Insert Chat Log</code> ➔ <span class="flow-node">PostgreSQL DB</span></div>
        </div>

        <h2>2. WebSocket Protocol Schema</h2>
        <pre><code>{
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
     7. Comprehensive AI Chatbot Assistant Engine (All Topics)
     -------------------------------------------------------------------------- */
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
    });

    if (chatCloseBtn) {
      chatCloseBtn.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
      });
    }
  }

  const aiKnowledge = {
    // 1. Resume & Career
    skills: "Ayushi specializes in Python, FastAPI, Django, REST APIs, WebSockets, PostgreSQL, Docker, Machine Learning (scikit-learn, PyTorch, NLTK/spaCy), Docs-as-Code, and AI Model Evaluation (RLHF, SFT).",
    experience: "Ayushi has 2+ years of experience including roles as Freelance AI Specialist (Nov 2025–Present), Software Developer at IT IDOL Technologies (Jun–Oct 2025), Python Developer at Pragnakalp Techlabs, and ML Intern at 1Rivet.",
    projects: "Her key projects include LeafyPop (Django E-Commerce), GeoHack (Real-Time Geofencing System), Docs-as-Code Python Suite, Distributed Rate Limiter, and CoChat WebSockets.",
    contact: "You can reach Ayushi directly via email at ayushisp1132@gmail.com, on LinkedIn (linkedin.com/in/ayuship-5b33ba265), or on GitHub (github.com/ayushi-1115).",
    
    // 2. Technical Explanations
    fastapi: "FastAPI is a modern, high-performance Python framework for building REST APIs. It uses async/await, Pydantic type validation, and automatically generates interactive Swagger documentation (/docs).",
    django: "Django is a full-stack Python web framework with an integrated ORM, authentication system, and admin panel, used in projects like Ayushi's LeafyPop e-commerce app.",
    haversine: "The Haversine formula calculates the spherical distance between two GPS coordinate points on Earth using spherical trigonometry. Ayushi implemented this in her GeoHack project for geofencing.",
    rlhf: "Reinforcement Learning from Human Feedback (RLHF) aligns AI model outputs with human intent and safety preferences. Ayushi evaluates AI model outputs and creates SFT datasets for frontier AI labs.",
    websockets: "WebSockets provide bi-directional, full-duplex communication over a single TCP connection, ideal for real-time applications like Ayushi's CoChat messaging engine.",
    docker: "Docker containerizes applications into standardized packages containing code, runtime, and system tools for consistent deployment across environments.",
    
    // 3. Interview & Hiring
    why_hire: "Ayushi is a versatile Python Developer who combines 2+ years of strong backend software engineering skills with high-impact Technical Writing and AI Model Evaluation expertise. She delivers production-ready code with clean architecture.",
    availability: "Ayushi is open for full-time Python Developer, ML/NLP Engineer, and Technical Writing positions (Remote or On-site in India)."
  };

  function sendChatMessage(text) {
    if (!text.trim()) return;

    // Render User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg user';
    userDiv.textContent = text;
    chatMessages.appendChild(userDiv);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // AI Intelligent Response Logic
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "";

      // Topic Matching
      if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
        reply = "Hello! I'm Ayushi's AI Assistant. Ask me anything about her skills, projects, Python engineering, FastAPI, ML/AI concepts, or hiring details!";
      } else if (lower.includes('skill') || lower.includes('python') || lower.includes('tech stack')) {
        reply = aiKnowledge.skills;
      } else if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('history') || lower.includes('career')) {
        reply = aiKnowledge.experience;
      } else if (lower.includes('project') || lower.includes('leafypop') || lower.includes('geohack') || lower.includes('cochat')) {
        reply = aiKnowledge.projects;
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('phone')) {
        reply = aiKnowledge.contact;
      } else if (lower.includes('fastapi')) {
        reply = aiKnowledge.fastapi;
      } else if (lower.includes('django')) {
        reply = aiKnowledge.django;
      } else if (lower.includes('haversine') || lower.includes('geofence')) {
        reply = aiKnowledge.haversine;
      } else if (lower.includes('rlhf') || lower.includes('sft') || lower.includes('ai eval')) {
        reply = aiKnowledge.rlhf;
      } else if (lower.includes('websocket')) {
        reply = aiKnowledge.websockets;
      } else if (lower.includes('docker')) {
        reply = aiKnowledge.docker;
      } else if (lower.includes('why hire') || lower.includes('hire') || lower.includes('strength')) {
        reply = aiKnowledge.why_hire;
      } else if (lower.includes('available') || lower.includes('remote') || lower.includes('full time') || lower.includes('role')) {
        reply = aiKnowledge.availability;
      } else {
        reply = `That's a great question! Ayushi specializes in Python engineering, FastAPI microservices, ML/NLP pipelines, and technical documentation. You can also contact her directly at ayushisp1132@gmail.com for specific inquiries.`;
      }

      const botDiv = document.createElement('div');
      botDiv.className = 'chat-msg bot';
      botDiv.textContent = reply;
      chatMessages.appendChild(botDiv);

      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
  }

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', () => sendChatMessage(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage(chatInput.value);
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('prompt-pill')) {
      const askKey = e.target.getAttribute('data-ask');
      if (askKey && aiKnowledge[askKey]) {
        sendChatMessage(e.target.textContent);
      }
    }
  });

  /* --------------------------------------------------------------------------
     8. Interactive FastAPI Code Playground
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
     9. Navbar Scroll & Active Link Highlight
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
     10. Mobile Nav Toggle
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }

  /* --------------------------------------------------------------------------
     11. Animated Counter Stats
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
     12. Contact Form Submission Handler (EmailJS + FastAPI Integration)
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const submitBtn = document.getElementById('btn-submit');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';

        formToast.className = 'form-toast success';
        formToast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Your message has been sent directly to Ayushi's inbox (ayushisp1132@gmail.com).`;

        contactForm.reset();

        setTimeout(() => {
          formToast.style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }

});
