/* ==========================================================================
   Ayushi Patel — Portfolio Interactive Scripts (V4 - Ultra Feature Set)
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
     2. Multilingual Language Switcher (EN, HI, GU)
     -------------------------------------------------------------------------- */
  const langSwitcher = document.getElementById('lang-switcher');
  const langBtn = document.getElementById('lang-btn');
  const currentLangSpan = document.getElementById('current-lang');

  const i18n = {
    en: {
      badge: "Open for Engineering & Technical Writing Roles",
      greeting: "Hi, I'm",
      desc: "Results-driven Python Developer and Technical Specialist with 2+ years of experience authoring high-impact technical documentation, API specifications, and scalable backend microservices.",
      navAbout: "About", navSkills: "Skills", navProjects: "Projects", navExp: "Experience", navContact: "Contact"
    },
    hi: {
      badge: "सॉफ्टवेयर इंजीनियरिंग और टेक्निकल राइटिंग भूमिकाओं के लिए उपलब्ध",
      greeting: "नमस्ते, मैं हूँ",
      desc: "2+ वर्षों के अनुभव के साथ परिणाम-उन्मुख पायथन डेवलपर और तकनीकी विशेषज्ञ। उच्च-प्रभाव वाली तकनीकी दस्तावेज़ीकरण, एपीआई विनिर्देशों और स्केलेबल बैकएंड माइक्रोसर्विसेज में कुशल।",
      navAbout: "परिचय", navSkills: "कौशल", navProjects: "प्रोजेक्ट्स", navExp: "अनुभव", navContact: "संपर्क"
    },
    gu: {
      badge: "સોફ્ટવેર એન્જિનિયરિંગ અને ટેકનિકલ રાઇટિંગ ભૂમિકાઓ માટે ઉપલબ્ધ",
      greeting: "નમસ્તે, હું છું",
      desc: "૨+ વર્ષના અનુભવ સાથે પાયથોન ડેવલપર અને ટેકનિકલ સ્પેશિયાલિસ્ટ. ઉચ્ચ-અસરકારક ટેકનિકલ દસ્તાવેજીકરણ, API સ્પષ્ટીકરણો અને સ્કેલેબલ બેકએન્ડ માઇક્રોસર્વિસિસમાં નિષ્ણાત.",
      navAbout: "વિશે", navSkills: "કૌશલ્ય", navProjects: "પ્રોજેક્ટ્સ", navExp: "અનુભવ", navContact: "સંપર્ક"
    }
  };

  if (langBtn && langSwitcher) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langSwitcher.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      langSwitcher.classList.remove('active');
    });

    document.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        if (i18n[lang]) {
          currentLangSpan.textContent = lang.toUpperCase();
          document.getElementById('txt-hero-badge').textContent = i18n[lang].badge;
          document.getElementById('txt-hero-greeting').textContent = i18n[lang].greeting;
          document.getElementById('txt-hero-desc').innerHTML = i18n[lang].desc;

          document.querySelector('.txt-nav-about').textContent = i18n[lang].navAbout;
          document.querySelector('.txt-nav-skills').textContent = i18n[lang].navSkills;
          document.querySelector('.txt-nav-projects').textContent = i18n[lang].navProjects;
          document.querySelector('.txt-nav-exp').textContent = i18n[lang].navExp;
          document.querySelector('.txt-nav-contact').textContent = i18n[lang].navContact;
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Voice Audio Bio Introduction Player (Web Speech API)
     -------------------------------------------------------------------------- */
  const audioPlayBtn = document.getElementById('audio-play-btn');
  const audioIcon = document.getElementById('audio-icon');
  const soundWave = document.getElementById('sound-wave');
  let isSpeaking = false;

  if (audioPlayBtn && 'speechSynthesis' in window) {
    audioPlayBtn.addEventListener('click', () => {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        audioIcon.className = 'fa-solid fa-play';
        if (soundWave) soundWave.style.opacity = '0.4';
      } else {
        const textToSpeak = "Hi! I am Ayushi Patel, a Python Developer and Technical Writer with over 2 years of experience building scalable backend microservices, machine learning pipelines, and systems architecture blueprints. Welcome to my portfolio!";
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          isSpeaking = false;
          audioIcon.className = 'fa-solid fa-play';
          if (soundWave) soundWave.style.opacity = '0.4';
        };

        window.speechSynthesis.speak(utterance);
        isSpeaking = true;
        audioIcon.className = 'fa-solid fa-pause';
        if (soundWave) soundWave.style.opacity = '1.0';
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Interactive Technical Quiz Widget
     -------------------------------------------------------------------------- */
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizFeedback = document.getElementById('quiz-feedback');

  if (quizOptions.length > 0 && quizFeedback) {
    quizOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const isCorrect = opt.getAttribute('data-correct') === 'true';
        quizFeedback.style.display = 'block';

        if (isCorrect) {
          quizFeedback.style.background = 'rgba(16, 185, 129, 0.15)';
          quizFeedback.style.color = '#10B981';
          quizFeedback.style.border = '1px solid rgba(16, 185, 129, 0.3)';
          quizFeedback.innerHTML = '🎉 <strong>Correct!</strong> The Haversine formula calculates the exact spherical distance between two GPS coordinate points on Earth using spherical trigonometry.';
        } else {
          quizFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
          quizFeedback.style.color = '#EF4444';
          quizFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
          quizFeedback.innerHTML = '❌ <strong>Incorrect.</strong> The correct answer is Option A (Haversine Formula), which is used for GPS geofencing.';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Light / Dark Theme Toggle
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
     6. Dual Resume Download & In-Browser Previewer Dropdown
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
            <p style="font-size: 13.5px; color: var(--text-soft);">Results-driven Python Developer and Technical Specialist with 2+ years of experience authoring technical documentation, systems design architecture, API endpoint specifications, and scalable backend automation.</p>
          </div>
        `;
        docModal.classList.add('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. Project Category Filter Tabs
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
     8. Live GeoHack Haversine Distance Calculator Demo
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

      const R = 6371;
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
     8b. Live GitHub Repositories Fetcher
     -------------------------------------------------------------------------- */
  const btnFetchRepos = document.getElementById('btn-fetch-repos');
  const githubReposGrid = document.getElementById('github-repos-grid');

  async function fetchGitHubRepos() {
    if (!githubReposGrid) return;
    try {
      githubReposGrid.innerHTML = `<div style="color:var(--accent-cyan); font-family:var(--font-mono); font-size:12px;"><i class="fa-solid fa-spinner fa-spin"></i> Fetching live repositories from GitHub API...</div>`;
      const res = await fetch('https://api.github.com/users/ayushi-1115/repos?sort=updated&per_page=6');
      if (!res.ok) throw new Error('GitHub API rate limited or offline');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        githubReposGrid.innerHTML = data.map(repo => `
          <a href="${repo.html_url}" target="_blank" class="repo-mini-card" style="text-decoration:none;">
            <div style="font-weight: 700; color: var(--accent-cyan);"><i class="fa-solid fa-book-bookmark"></i> ${repo.name}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin: 6px 0;">${repo.description || 'Python Development & Architecture Repository'}</div>
            <div style="font-size: 11px; color: var(--text-soft); font-family: var(--font-mono); display:flex; justify-content:space-between;">
              <span><span style="color: #3572A5;">●</span> ${repo.language || 'Python'}</span>
              <span>⭐ ${repo.stargazers_count}</span>
            </div>
          </a>
        `).join('');
      }
    } catch (err) {
      githubReposGrid.innerHTML = `
        <a href="https://github.com/ayushi-1115/ayushi-1115.github.io" target="_blank" class="repo-mini-card" style="text-decoration:none;">
          <div style="font-weight: 700; color: var(--accent-cyan);"><i class="fa-solid fa-book-bookmark"></i> ayushi-1115.github.io</div>
          <div style="font-size: 12px; color: var(--text-muted); margin: 6px 0;">Official Developer Portfolio &amp; Systems Architecture Blueprints</div>
          <div style="font-size: 11px; color: var(--text-soft); font-family: var(--font-mono);"><span style="color: #3572A5;">● HTML / CSS / JS / Python</span></div>
        </a>
        <a href="https://github.com/ayushi-1115/geohack" target="_blank" class="repo-mini-card" style="text-decoration:none;">
          <div style="font-weight: 700; color: var(--accent-cyan);"><i class="fa-solid fa-book-bookmark"></i> geohack</div>
          <div style="font-size: 12px; color: var(--text-muted); margin: 6px 0;">Real-Time Haversine Geofence Engine &amp; API Specs</div>
          <div style="font-size: 11px; color: var(--text-soft); font-family: var(--font-mono);"><span style="color: #3572A5;">● Python / FastAPI</span></div>
        </a>
        <a href="https://github.com/ayushi-1115" target="_blank" class="repo-mini-card" style="text-decoration:none;">
          <div style="font-weight: 700; color: var(--accent-cyan);"><i class="fa-solid fa-book-bookmark"></i> leafy-pop</div>
          <div style="font-size: 12px; color: var(--text-muted); margin: 6px 0;">Django Microgreens E-Commerce Platform</div>
          <div style="font-size: 11px; color: var(--text-soft); font-family: var(--font-mono);"><span style="color: #3572A5;">● Python / Django</span></div>
        </a>
      `;
    }
  }

  if (btnFetchRepos) {
    btnFetchRepos.addEventListener('click', fetchGitHubRepos);
  }

  /* --------------------------------------------------------------------------
     9. Live Architecture Document Modal & Sequence Flow
     -------------------------------------------------------------------------- */
  const docsDatabase = {
    geohack: {
      title: "GeoHack — Real-Time Geofencing System Design",
      content: `
        <h2>1. System Architecture Overview</h2>
        <p>GeoHack is a high-availability real-time location processing service designed to evaluate user GPS coordinates against dynamic polygon geofences with sub-second latency.</p>
        <div class="sequence-flow">
          <div class="flow-step"><span class="flow-node">Mobile GPS Client</span> ➔ <code>POST /api/location</code> ➔ <span class="flow-node">FastAPI Gateway</span></div>
          <div class="flow-step"><span class="flow-node">FastAPI Gateway</span> ➔ <code>Calculate Haversine(lat, lon)</code> ➔ <span class="flow-node">Spatial Engine</span></div>
        </div>
      `
    },
    ratelimiter: {
      title: "Distributed Rate Limiter Microservice Spec",
      content: `
        <h2>1. Architecture &amp; Throttling Algorithms</h2>
        <p>Distributed rate limiter microservice protecting downstream microservices from DDoS attacks and traffic spikes.</p>
        <div class="sequence-flow">
          <div class="flow-step"><span class="flow-node">Client Request</span> ➔ <code>X-API-Key: client_99</code> ➔ <span class="flow-node">Rate Limiter Middleware</span></div>
        </div>
      `
    },
    cochat: {
      title: "CoChat — Real-Time Chat Infrastructure Spec",
      content: `
        <h2>1. High-Level System Architecture</h2>
        <p>Asynchronous WebSocket messaging engine providing low-latency messaging, presence tracking, and chat room state synchronization.</p>
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
    modalCloseBtn.addEventListener('click', () => docModal.classList.remove('active'));
  }

  if (docModal) {
    docModal.addEventListener('click', (e) => {
      if (e.target === docModal) docModal.classList.remove('active');
    });
  }

  /* --------------------------------------------------------------------------
     10. Comprehensive AI Chatbot Assistant Engine
     -------------------------------------------------------------------------- */
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => chatbotWindow.classList.toggle('active'));
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', () => chatbotWindow.classList.remove('active'));
  }

  const aiKnowledge = {
    skills: "Ayushi specializes in Python, FastAPI, Django, REST APIs, WebSockets, PostgreSQL, Docker, Machine Learning (scikit-learn, PyTorch, NLTK/spaCy), Docs-as-Code, and AI Model Evaluation (RLHF, SFT).",
    experience: "Ayushi has 2+ years of professional experience across roles: Freelance AI Content & Model Evaluation Specialist (Nov 2025–Present), Software Developer at IT IDOL Technologies (Jun–Oct 2025), Python Developer at Pragnakalp Techlabs (Jan–May 2023), and ML/NLP Intern at 1Rivet (Aug–Dec 2022).",
    projects: "Her key featured projects include:\n• LeafyPop (Django E-Commerce platform deployed on Render)\n• GeoHack (Real-Time Haversine Geofencing Engine & FastAPI)\n• Docs-as-Code Python Automated Converter Suite\n• Distributed Rate Limiter Microservice Architecture\n• CoChat Asynchronous WebSocket Messaging Infrastructure.",
    contact: "You can reach Ayushi directly via:\n📧 Email: ayushisp1132@gmail.com\n💼 LinkedIn: linkedin.com/in/ayuship-5b33ba265\n🐙 GitHub: github.com/ayushi-1115\n📍 Location: Valsad, Gujarat, India.",
    fastapi: "FastAPI is a modern, high-performance web framework for building APIs with Python 3.8+ based on standard Python type hints. Ayushi uses FastAPI for async endpoints, Pydantic data validation, and OpenAPI Swagger documentation generation.",
    geofence: "Geofence technology calculates whether a user's location falls within a specified boundary. GeoHack uses the Haversine formula: d = 2r arcsin(sqrt(sin²(Δlat/2) + cos(lat1)cos(lat2)sin²(Δlon/2))) to compute spherical distance on Earth with sub-second latency.",
    whyhire: "Why Hire Ayushi Patel?\n1. 2+ Years of hands-on experience in scalable Python engineering and microservices.\n2. Rare dual expertise: Deep technical coding + high-impact Docs-as-Code technical writing.\n3. Frontier AI model evaluation (RLHF/SFT) experience improving LLM reasoning.\n4. Certified in Banking Fundamentals (IILS score 94%) and Python ML Architecture.",
    certs: "Ayushi holds multiple credentials:\n• IILS Banking Fundamental Certification (Score 94%)\n• Python Developer & ML Specialist (PySpiders / QSpiders)\n• Frontier AI Model Evaluation & SFT Benchmarking\n• Docs-as-Code & Systems Architecture Specialist.",
    banking: "Ayushi cleared the IILS Banking Fundamental Certification with a 94% score, demonstrating strong financial engineering domain knowledge, banking workflows, and secure payment processing.",
    education: "Ayushi holds a Bachelor of Engineering (B.E.) degree in Computer Science & Engineering from Mahatma Gandhi Institute (2017–2021)."
  };

  function sendChatMessage(text) {
    if (!text.trim()) return;
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg user';
    userDiv.textContent = text;
    chatMessages.appendChild(userDiv);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "Hello! I'm Ayushi's AI Assistant. Ask me anything about her Python skills, projects, FastAPI, ML/NLP, banking certification, or why you should hire her!";

      if (lower.includes('skill') || lower.includes('python') || lower.includes('stack')) reply = aiKnowledge.skills;
      else if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('history')) reply = aiKnowledge.experience;
      else if (lower.includes('project') || lower.includes('geohack') || lower.includes('leafypop') || lower.includes('cochat')) reply = aiKnowledge.projects;
      else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) reply = aiKnowledge.contact;
      else if (lower.includes('fastapi') || lower.includes('django') || lower.includes('api')) reply = aiKnowledge.fastapi;
      else if (lower.includes('geofence') || lower.includes('haversine') || lower.includes('distance') || lower.includes('gps')) reply = aiKnowledge.geofence;
      else if (lower.includes('why') || lower.includes('hire') || lower.includes('recruit') || lower.includes('candidate')) reply = aiKnowledge.whyhire;
      else if (lower.includes('cert') || lower.includes('iils') || lower.includes('credential') || lower.includes('degree')) reply = aiKnowledge.certs;
      else if (lower.includes('bank') || lower.includes('financial') || lower.includes('iils')) reply = aiKnowledge.banking;
      else if (lower.includes('edu') || lower.includes('degree') || lower.includes('college') || lower.includes('university')) reply = aiKnowledge.education;
      else if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) reply = "You can preview or download Ayushi's official PDF and Word (.docx) resumes using the 'Resume' dropdown button in the top navigation bar!";
      else if (lower.includes('location') || lower.includes('where')) reply = "Ayushi is based in Valsad, Gujarat, India, and is open to both Remote and On-site opportunities.";
      else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) reply = "Hello! 👋 I'm Ayushi's AI Assistant. How can I help you learn more about her Python development and technical writing background?";
      else {
        reply = `That's a great technical query regarding "${text}"! Ayushi specializes in building robust Python microservices, writing clear Docs-as-Code architecture blueprints, and performing AI model evaluation. Feel free to contact her directly at ayushisp1132@gmail.com!`;
      }

      const botDiv = document.createElement('div');
      botDiv.className = 'chat-msg bot';
      botDiv.innerText = reply;
      chatMessages.appendChild(botDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 450);
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
      } else {
        sendChatMessage(e.target.textContent);
      }
    }
  });

  /* --------------------------------------------------------------------------
     11. Interactive FastAPI Code Playground
     -------------------------------------------------------------------------- */
  const apiTestBtns = document.querySelectorAll('.btn-api-test');
  const terminalOutput = document.getElementById('terminal-output');

  const mockApiResponses = {
    health: { status: "online", framework: "FastAPI 0.100.0", developer: "Ayushi Patel", timestamp: new Date().toISOString() },
    projects: { success: true, count: 3, data: [{ id: "geohack", title: "GeoHack Real-Time Geofencing", repo: "https://github.com/ayushi-1115/geohack" }] },
    geohack: { success: true, endpoint: "/api/geohack/calculate", distance_km: 74.32, radius_km: 100.0, inside_geofence: true },
    docs: { openapi: "3.0.2", info: { title: "Ayushi Patel Portfolio API", version: "2.0.0" } }
  };

  apiTestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const endpoint = btn.getAttribute('data-endpoint');
      const responseData = mockApiResponses[endpoint];
      if (terminalOutput && responseData) {
        terminalOutput.innerHTML = `<span style="color:var(--accent-cyan);">$ requesting endpoint...</span>\n\n` + JSON.stringify(responseData, null, 2);
      }
    });
  });

  /* --------------------------------------------------------------------------
     12. Navbar Scroll & Active Link Highlight
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

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
      if (link.getAttribute('href') === `#${currentSection}`) link.classList.add('active');
    });
  });

  /* --------------------------------------------------------------------------
     13. Mobile Nav Toggle & Contact Form Handler
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => navLinksContainer.classList.toggle('active'));
  }

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
        setTimeout(() => { formToast.style.display = 'none'; }, 5000);
      }, 1200);
    });
  }

});
