const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const themeLabel = themeToggle.querySelector('span');
const languageButtons = document.querySelectorAll('.language-button');
const assistantAnswer = document.querySelector('#assistant-answer');
const questionChips = document.querySelectorAll('.question-chip');

const translations = {
  en: {
    navAbout: 'About', navExperience: 'Experience', navProjects: 'Projects', navAiChat: 'AI Chat', navContact: "Let's talk",
    heroEyebrow: 'Computer Science Engineering · ENSA Tetouan', heroTitle: 'Building useful<br><em>digital systems.</em>',
    heroIntro: "I'm <strong>Zakaria Ayad</strong>, a fifth-year Computer Science Engineering student at ENSA Tetouan, focused on Full-Stack development, AI, and DevOps.",
    heroWork: 'Explore my work', heroResume: 'View résumé', heroProjects: 'production-minded projects', heroEnglish: 'English proficiency'
  },
  fr: {
    navAbout: 'À propos', navExperience: 'Expérience', navProjects: 'Projets', navAiChat: 'Chat IA', navContact: 'Contact',
    heroEyebrow: 'Ingénierie informatique · ENSA Tétouan', heroTitle: 'Créer des <em>systèmes numériques</em><br>utiles.',
    heroIntro: "Je suis <strong>Zakaria Ayad</strong>, étudiant en cinquième année d'ingénierie informatique à l'ENSA de Tétouan, spécialisé en développement Full-Stack, IA et DevOps.",
    heroWork: 'Découvrir mes projets', heroResume: 'Voir le CV', heroProjects: 'projets réalisés', heroEnglish: 'niveau d’anglais'
  }
};

const localizedContent = {
  en: {
    aboutLabel: 'About me', aboutTitle: 'A curious engineer who enjoys making complex things feel <em>clear.</em>',
    aboutParagraphs: [
      'At ENSA Tetouan, I study Information and Decision Support Systems. I bring a practical, systems-minded approach to every project—from thoughtful interfaces to reliable APIs and scalable services.',
      'AI and intelligent systems have been a personal ambition since childhood. As a freelance developer, I am committed to growing into an expert in this field, continuously learning and building reliable, useful products with ambitious teams.'
    ],
    experienceLabel: 'Selected experience', workLabel: 'Featured work', workDescription: 'A selection of academic projects exploring intelligent systems, robust backends, and seamless user experiences.', languageFact: 'Darija · Arabic C2 · English C1 · French B2 · Spanish A1',
    aiLabel: 'AI-inspired assistant', aiEyebrow: 'Local knowledge interface', aiTitle: 'Ask the portfolio<br><em>without typing.</em>', aiPrivacy: 'Private by design · Predefined answers only',
    toolkitLabel: 'Toolkit', toolkitTitle: 'Technologies I use to take ideas from sketch to <em>shipping.</em>', contactEyebrow: 'Open to thoughtful collaborations', contactTitle: "Let's build something<br><em>that matters.</em>", footer: '© 2026 Zakaria Ayad. Built with intention.', backTop: 'Back to top'
  },
  fr: {
    aboutLabel: 'À propos', aboutTitle: 'Un ingénieur curieux qui rend les sujets complexes <em>plus clairs.</em>',
    aboutParagraphs: [
      "À l’ENSA de Tétouan, j’étudie les systèmes d’information et d’aide à la décision. J’apporte une approche pragmatique et orientée systèmes à chaque projet, des interfaces soignées aux API fiables et services évolutifs.",
      'L’IA et les systèmes intelligents sont une ambition personnelle depuis mon enfance. En tant que développeur freelance, je suis déterminé à devenir expert dans ce domaine, en apprenant continuellement et en créant des produits utiles et fiables avec des équipes ambitieuses.'
    ],
    experienceLabel: 'Expériences sélectionnées', workLabel: 'Projets phares', workDescription: 'Une sélection de projets académiques autour des systèmes intelligents, des backends robustes et des expériences fluides.', languageFact: 'Darija · Arabe C2 · Anglais C1 · Français B2 · Espagnol A1',
    aiLabel: 'Assistant inspiré par l’IA', aiEyebrow: 'Interface de connaissances locale', aiTitle: 'Explorez le portfolio<br><em>sans rien saisir.</em>', aiPrivacy: 'Privé par conception · Réponses prédéfinies uniquement',
    toolkitLabel: 'Compétences', toolkitTitle: 'Les technologies que j’utilise pour passer d’une idée à <em>un produit livré.</em>', contactEyebrow: 'Ouvert aux collaborations', contactTitle: 'Construisons quelque chose<br><em>qui compte.</em>', footer: '© 2026 Zakaria Ayad. Créé avec intention.', backTop: 'Haut de page'
  }
};

const frenchQuestions = [
  ['Qui est Zakaria ?', "Zakaria est étudiant en cinquième année d’ingénierie informatique à l’ENSA de Tétouan, spécialisé dans les systèmes d’information et d’aide à la décision. Il combine développement Full-Stack, concepts d’IA et bases DevOps."],
  ['Quelle est sa spécialité ?', "Ses principaux centres d’intérêt sont les applications Full-Stack robustes, les workflows intelligents avec des agents IA et le RAG, ainsi que les services évolutifs basés sur le cloud et les conteneurs."],
  ['Quels projets a-t-il réalisés ?', "Parmi ses projets : un framework de déploiement d’agents IA autonomes, un système de gestion de patients, une plateforme de messagerie temps réel et un modèle de prédiction de revenu annuel."],
  ['Quels outils utilise-t-il ?', "Il travaille notamment avec Java, Spring Boot, Angular, Python, JavaScript, Docker, PostgreSQL, MongoDB, Apache Kafka, AWS et de nombreux outils de qualité et de déploiement."],
  ['Comment le contacter ?', "Vous pouvez contacter Zakaria à l’adresse zakariaayad27@gmail.com ou au +212 639389058. Il est basé à Tétouan, au Maroc."]
];

const englishQuestions = [...questionChips].map((chip) => [chip.textContent, chip.dataset.answer]);

function setTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-theme', isLight);
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  themeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  themeLabel.textContent = isLight ? 'Dark' : 'Light';
  localStorage.setItem('portfolio-theme', theme);
}

function setText(selector, content, html = false) {
  const element = document.querySelector(selector);
  if (element) {
    if (html) element.innerHTML = content;
    else element.textContent = content;
  }
}

function setLanguage(language) {
  const copy = translations[language];
  const content = localizedContent[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    element.innerHTML = copy[element.dataset.i18nHtml];
  });

  setText('.about-section .section-label', `<span>01</span> ${content.aboutLabel}`, true);
  setText('.about-section h2', content.aboutTitle, true);
  document.querySelectorAll('.about-copy > p').forEach((paragraph, index) => { paragraph.textContent = content.aboutParagraphs[index]; });
  setText('.quick-facts div:nth-child(2) dd', content.languageFact);
  setText('.experience-section .section-label', `<span>02</span> ${content.experienceLabel}`, true);
  setText('.work-section .section-label', `<span>03</span> ${content.workLabel}`, true);
  setText('.section-heading > p', content.workDescription);
  setText('.ai-chat-intro .section-label', `<span>04</span> ${content.aiLabel}`, true);
  setText('.ai-chat-intro .eyebrow', `<span class="status-dot"></span> ${content.aiEyebrow}`, true);
  setText('#ai-chat-title', content.aiTitle, true);
  setText('.assistant-privacy', content.aiPrivacy);
  setText('.skills-section .section-label', `<span>05</span> ${content.toolkitLabel}`, true);
  setText('.skills-layout h2', content.toolkitTitle, true);
  setText('.contact-section .eyebrow', content.contactEyebrow);
  setText('.contact-section h2', content.contactTitle, true);
  setText('footer p', content.footer);
  setText('footer > a:last-child', content.backTop);

  const questions = language === 'fr' ? frenchQuestions : englishQuestions;
  questionChips.forEach((chip, index) => {
    chip.textContent = questions[index][0];
    chip.dataset.answer = questions[index][1];
  });
  assistantAnswer.querySelector('p').textContent = language === 'fr'
    ? 'Sélectionnez une question ci-dessous pour découvrir le profil.'
    : 'Select a question below to get a quick introduction.';

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  localStorage.setItem('portfolio-language', language);
}

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) setTheme(savedTheme);

const savedLanguage = localStorage.getItem('portfolio-language');
if (savedLanguage === 'fr') setLanguage('fr');

themeToggle.addEventListener('click', () => {
  setTheme(document.body.classList.contains('light-theme') ? 'dark' : 'light');
});

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

questionChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    questionChips.forEach((question) => question.classList.remove('active'));
    chip.classList.add('active');
    assistantAnswer.classList.add('is-changing');
    window.setTimeout(() => {
      assistantAnswer.querySelector('p').textContent = chip.dataset.answer;
      assistantAnswer.classList.remove('is-changing');
    }, 160);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const motionTargets = document.querySelectorAll('.project, .credential, .logo-badge');
motionTargets.forEach((target) => {
  target.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = target.getBoundingClientRect();
    const rotateY = ((event.clientX - bounds.left) / bounds.width - .5) * 5;
    const rotateX = ((event.clientY - bounds.top) / bounds.height - .5) * -5;
    target.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  target.addEventListener('pointerleave', () => {
    target.style.transform = '';
  });
});
