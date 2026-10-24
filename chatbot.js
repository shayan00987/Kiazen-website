/* ==========================================================================
   Kaizen Health & Wellness — Natural Concierge Chatbot (chatbot.js)
   Free, browser-only, keyword-based FAQ concierge. NOT an AI / API chatbot.
   Works with chatbot.css. Edit the KNOWLEDGE_BASE array to change answers.
   Rules: only facts listed on the website are used. No prices, opening hours
   or medical advice are invented — those questions are sent to the team.
   ========================================================================== */
(function () {
  'use strict';
  if (document.getElementById('kaizen-faq-launcher')) return;

  /* ---------------- Verified business details (from the website) ---------------- */
  var PHONE_DISPLAY = '0326 8666 884';
  var PHONE_TEL = '+923268666884';
  var WA_NUMBER = '923268666884';
  var EMAIL = 'info@kaizenwellness.pk';

  /* ---------------- Reusable action buttons ---------------- */
  function bookAction(service) { return { type: 'modal', label: '📅 Book Consultation', service: service || '' }; }
  function waAction(text) {
    return { type: 'whatsapp', label: '💬 WhatsApp Care Team',
      text: text || 'Hello Kaizen Health and Wellness, I would like to ask about a consultation.' };
  }
  var CALL = { type: 'tel', label: '📞 Call Clinic' };
  var LOCATIONS = { type: 'scroll', label: '📍 Clinic Locations', target: '#locations' };
  var SERVICES = { type: 'scroll', label: '✦ View Services', target: '#services' };

  var DEFAULT_CHIPS = ['Our services', 'Book a consultation', 'Peptide therapy', 'Locations', 'Contact details'];

  /* ---------------- Knowledge base ---------------- */
  var KNOWLEDGE_BASE = [
    {
      id: 'greeting', words: ['hi', 'hello', 'hey', 'salam', 'assalamualaikum', 'aoa', 'hola'],
      phrases: ['good morning', 'good afternoon', 'good evening', 'as salam', 'assalam o alaikum'],
      reply: { text: ['Hello, and welcome to **Kaizen Health & Wellness**. 🌿 I can help with our listed programs, booking a consultation, locations and contact details. What would you like to know?'] },
      chips: DEFAULT_CHIPS
    },
    {
      id: 'thanks', words: ['thanks', 'thank', 'thankyou', 'shukriya', 'jazakallah', 'appreciated'],
      phrases: ['thank you'],
      reply: { text: ['You are most welcome! Is there anything else about Kaizen\'s programs or contact details I can help with?'] },
      chips: ['Book a consultation', 'Locations', 'Contact details']
    },
    {
      id: 'bye', words: ['bye', 'goodbye', 'khuda', 'allahhafiz'],
      phrases: ['see you', 'allah hafiz'],
      reply: { text: ['Take care! Whenever you are ready, the Kaizen team is happy to help. Better Health Today. Longer Tomorrow.'] },
      chips: ['Book a consultation']
    },
    {
      id: 'services', words: ['service', 'services', 'offer', 'treatment', 'treatments', 'program', 'programs', 'programme', 'programmes', 'solutions'],
      phrases: ['what do you do', 'what do you provide'],
      reply: {
        text: ['Kaizen\'s website lists these programs:'],
        list: ['Peptide Therapy', 'Hormone Optimization', 'Longevity Program', 'Weight Management', 'Performance & Recovery', 'Wellness Consultation'],
        text2: ['Which one would you like to know more about? Please confirm current availability and suitability with the team.'],
        actions: [SERVICES, bookAction()]
      },
      chips: ['Peptide therapy', 'Hormone optimization', 'Longevity program', 'Weight management']
    },
    {
      id: 'peptide', words: ['peptide', 'peptides', 'regeneration', 'repair'],
      phrases: ['peptide therapy'],
      reply: {
        text: ['**Peptide Therapy** is one of Kaizen\'s core programs, described on the site as supporting cellular repair and regeneration.',
          'I can\'t say whether it is right for you — that is a decision for a qualified healthcare professional after a consultation.'],
        actions: [bookAction('Peptide Therapy'), waAction('Hello Kaizen, I would like to know more about Peptide Therapy.')]
      },
      chips: ['Book a consultation', 'Is it safe?', 'Our services']
    },
    {
      id: 'hormone', words: ['hormone', 'hormones', 'hormonal', 'testosterone', 'thyroid', 'vitality'],
      phrases: ['hormone optimization', 'hormone optimisation'],
      reply: {
        text: ['**Hormone Optimization** is listed as a Kaizen program focused on balance and vitality.',
          'Questions about testing, risks or suitability are best discussed directly with a qualified healthcare professional at the clinic.'],
        actions: [bookAction('Hormone Optimization'), waAction('Hello Kaizen, I would like to know more about Hormone Optimization.')]
      },
      chips: ['Book a consultation', 'Is it safe?', 'Our services']
    },
    {
      id: 'longevity', words: ['longevity', 'healthspan', 'ageing', 'aging', 'lifespan', 'anti-aging'],
      phrases: ['live longer', 'longer tomorrow', 'longevity program'],
      reply: {
        text: ['The **Longevity Program** is built around extending healthspan — living healthier for longer — and reflects Kaizen\'s message: *Better Health Today. Longer Tomorrow.*',
          'The team can explain how a plan would be tailored to you during a consultation.'],
        actions: [bookAction('Longevity Program')]
      },
      chips: ['Book a consultation', 'Performance & recovery', 'Our services']
    },
    {
      id: 'weight', words: ['weight', 'overweight', 'obesity', 'fat', 'slim', 'metabolic', 'metabolism', 'diet'],
      phrases: ['lose weight', 'weight loss', 'weight management'],
      reply: {
        text: ['**Weight Management** is listed as a program focused on metabolic health.',
          'For personalised advice, please speak with the clinic\'s qualified healthcare professionals.'],
        actions: [bookAction('Weight Management'), waAction('Hello Kaizen, I would like to ask about Weight Management.')]
      },
      chips: ['Book a consultation', 'Our services', 'Contact details']
    },
    {
      id: 'performance', words: ['performance', 'recovery', 'endurance', 'athlete', 'athletes', 'sports', 'gym', 'training', 'muscle'],
      phrases: ['performance and recovery', 'performance & recovery'],
      reply: {
        text: ['**Performance & Recovery** is aimed at energy and endurance, helping you recover and perform at your best.',
          'The team can discuss your goals and what may suit you during a consultation.'],
        actions: [bookAction('Performance & Recovery')]
      },
      chips: ['Book a consultation', 'Longevity program', 'Our services']
    },
    {
      id: 'symptoms', words: ['tired', 'fatigue', 'exhausted', 'energy', 'sleep', 'insomnia', 'stress', 'fog', 'low', 'weak', 'weakness', 'pain'],
      phrases: ['brain fog', 'low energy', 'feeling tired'],
      reply: {
        text: ['I am sorry you are not feeling your best. I can\'t diagnose or suggest treatment in chat, but Kaizen\'s team can look at your situation and goals in a **Wellness Consultation**.',
          'If you feel seriously unwell, please see a doctor or visit your nearest hospital.'],
        actions: [bookAction('Wellness Consultation'), waAction('Hello Kaizen, I would like a wellness consultation.')]
      },
      chips: ['Book a consultation', 'Our services', 'Contact details']
    },
    {
      id: 'consult', words: ['book', 'booking', 'appointment', 'apointment', 'consultation', 'consult', 'schedule', 'reserve', 'visit', 'register'],
      phrases: ['make an appointment', 'see a doctor', 'get started', 'start your journey'],
      reply: {
        text: ['Happy to help you get started. Tap **Book Consultation** to open the request form and choose a program.',
          'For the quickest reply you can also message or call the team on **' + PHONE_DISPLAY + '**.'],
        actions: [bookAction(), waAction(), CALL]
      },
      chips: ['Locations', 'Fees', 'Opening hours']
    },
    {
      id: 'price', words: ['price', 'prices', 'fee', 'fees', 'cost', 'costs', 'charges', 'charge', 'rate', 'rates', 'expensive', 'package', 'packages', 'afford'],
      phrases: ['how much', 'kitna', 'consultation fee'],
      reply: {
        text: ['I don\'t have confirmed pricing, and I don\'t want to guess. The team can share current fees — please call or message **' + PHONE_DISPLAY + '** or email ' + EMAIL + '.'],
        actions: [waAction('Hello Kaizen, could you please share the current consultation fees?'), CALL]
      },
      chips: ['Book a consultation', 'Opening hours', 'Locations']
    },
    {
      id: 'hours', words: ['hours', 'timing', 'timings', 'timetable', 'opening', 'closing', 'open', 'closed', 'time', 'weekend', 'sunday'],
      phrases: ['working hours', 'opening hours', 'working time', 'when are you open'],
      reply: {
        text: ['I don\'t have confirmed opening hours to share. Please contact the team on **' + PHONE_DISPLAY + '** or ' + EMAIL + ' and they will confirm the best time to visit.'],
        actions: [waAction('Hello Kaizen, could you please confirm your clinic timings?'), CALL]
      },
      chips: ['Locations', 'Book a consultation', 'Fees']
    },
    {
      id: 'online', words: ['online', 'virtual', 'remote', 'video', 'zoom', 'telehealth'],
      phrases: ['online consultation', 'phone consultation'],
      reply: {
        text: ['I don\'t have confirmed information about online consultations. Please ask the team directly — they can tell you what options are available.'],
        actions: [waAction('Hello Kaizen, do you offer online consultations?'), CALL]
      },
      chips: ['Book a consultation', 'Locations', 'Contact details']
    },
    {
      id: 'lahore', words: ['lahore', 'dha', 'primal', 'punjab'],
      phrases: [],
      reply: {
        text: ['📍 **Lahore** — DHA 6 · Official Partner @primal_strength_studio.',
          'Please confirm availability and appointment details with the team before visiting.'],
        actions: [LOCATIONS, waAction('Hello Kaizen, I would like an appointment in Lahore.'), CALL]
      },
      chips: ['Islamabad location', 'Book a consultation', 'Contact details']
    },
    {
      id: 'islamabad', words: ['islamabad', 'f8', 'f-8', 'pakland', 'isb'],
      phrases: ['f8 markaz'],
      reply: {
        text: ['📍 **Islamabad** — Pakland Medical Center, F8 Markaz, Islamabad, Pakistan 44000.',
          'Please confirm availability and appointment details with the team before visiting.'],
        actions: [LOCATIONS, waAction('Hello Kaizen, I would like an appointment in Islamabad.'), CALL]
      },
      chips: ['Lahore location', 'Book a consultation', 'Contact details']
    },
    {
      id: 'location', words: ['location', 'locations', 'address', 'where', 'branch', 'branches', 'clinic', 'map', 'directions', 'city', 'cities', 'near'],
      phrases: ['find you', 'where are you'],
      reply: {
        text: ['Kaizen has two locations listed:'],
        list: ['Lahore — DHA 6 · Official Partner @primal_strength_studio', 'Islamabad — Pakland Medical Center, F8 Markaz'],
        text2: ['Which city is closer to you?'],
        actions: [LOCATIONS, CALL]
      },
      chips: ['Lahore location', 'Islamabad location', 'Book a consultation']
    },
    {
      id: 'contact', words: ['phone', 'call', 'contact', 'number', 'whatsapp', 'email', 'mail', 'reach', 'message', 'talk', 'speak'],
      phrases: ['get in touch', 'contact details'],
      reply: {
        text: ['You can reach the Kaizen team here:'],
        list: ['Consultation line: ' + PHONE_DISPLAY, 'Email: ' + EMAIL],
        actions: [waAction(), CALL]
      },
      chips: ['Book a consultation', 'Locations', 'Opening hours']
    },
    {
      id: 'safety', words: ['safe', 'safety', 'risk', 'risks', 'dose', 'dosage', 'dosing', 'legit', 'legal', 'approved', 'harmful', 'danger', 'dangerous', 'effects'],
      phrases: ['side effect', 'side effects', 'is it safe'],
      reply: {
        text: ['That is an important question. I can\'t give medical advice, dosing or risk information in chat — it depends on your health and needs a qualified professional.',
          'Kaizen describes its approach as evidence-aware and personalised, and the team can discuss safety and suitability with you in a consultation.'],
        actions: [bookAction(), waAction('Hello Kaizen, I have a safety question before booking.')]
      },
      chips: ['Book a consultation', 'Contact details']
    },
    {
      id: 'about', words: ['about', 'kaizen', 'who', 'philosophy', 'mission', 'story', 'team', 'doctor', 'doctors', 'expert', 'experts'],
      phrases: ['about kaizen', 'who are you', 'why kaizen', 'why choose'],
      reply: {
        text: ['**Kaizen Health & Wellness** offers personalised longevity, performance and wellness programs — *Better Health Today. Longer Tomorrow.*',
          'The approach is evidence-aware, goal-focused and built around your individual journey, with ongoing support from an expert medical team.'],
        actions: [{ type: 'scroll', label: 'ℹ️ About Kaizen', target: '#about' }, bookAction()]
      },
      chips: ['Our services', 'Locations', 'Book a consultation']
    },
    {
      id: 'insights', words: ['article', 'articles', 'blog', 'insights', 'learn', 'read', 'guide', 'knowledge'],
      phrases: [],
      reply: {
        text: ['The **Insights** section shares educational ideas on science, longevity and nutrition, such as "What are Peptides?" and "Recovery Starts Now".'],
        actions: [{ type: 'scroll', label: '📖 View Insights', target: '#insights' }]
      },
      chips: ['Our services', 'Book a consultation']
    }
  ];

  var EMERGENCY = /(chest pain|can'?t breathe|cannot breathe|heart attack|stroke|overdose|suicid|severe bleeding|unconscious|emergency)/i;

  var FALLBACK = {
    text: ['I don\'t have a confirmed answer to that yet. The Kaizen team can help directly on **' + PHONE_DISPLAY + '** or ' + EMAIL + '.',
      'You can also ask me about services, booking, locations or contact details.'],
    actions: [waAction(), CALL],
    chips: DEFAULT_CHIPS
  };

  /* ---------------- Matching engine ---------------- */
  function lev(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) { d[i] = [i]; }
    for (j = 1; j <= n; j++) { d[0][j] = j; }
    for (i = 1; i <= m; i++) {
      for (j = 1; j <= n; j++) {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
    }
    return d[m][n];
  }

  function wordScore(token, word) {
    if (token === word) return 2;
    if (word.length >= 5 && token.length > word.length && token.indexOf(word) === 0) return 1.6;
    if (word.length >= 5 && token.length >= 5) {
      var allowed = word.length >= 8 ? 2 : 1;
      if (Math.abs(token.length - word.length) <= allowed && lev(token, word) <= allowed) return 1.5;
    }
    return 0;
  }

  function matchIntent(raw) {
    var text = raw.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff\s&-]/g, ' ').replace(/\s+/g, ' ').trim();
    var tokens = text.split(' ');
    var best = null, bestScore = 0;
    KNOWLEDGE_BASE.forEach(function (it) {
      var score = 0;
      it.phrases.forEach(function (p) { if (text.indexOf(p) !== -1) score += 3; });
      it.words.forEach(function (w) {
        var top = 0;
        tokens.forEach(function (t) { var s = wordScore(t, w); if (s > top) top = s; });
        score += top;
      });
      if (score > bestScore) { bestScore = score; best = it; }
    });
    return bestScore >= 1.5 ? best : null;
  }

  function respond(raw) {
    if (EMERGENCY.test(raw)) {
      return {
        text: ['If this is a medical emergency, please contact your local emergency services or go to the nearest hospital **right now**. I am only an automated FAQ assistant and cannot help with emergencies.'],
        actions: [], chips: ['Contact details']
      };
    }
    var it = matchIntent(raw);
    if (!it) return FALLBACK;
    var r = JSON.parse(JSON.stringify(it.reply));
    r.chips = it.chips || DEFAULT_CHIPS;
    return r;
  }

  /* ---------------- UI construction ---------------- */
  var AVATAR_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.4-9.3-8.9C1 8.7 3 5 6.6 5c2 0 3.5 1 5.4 3 1.9-2 3.4-3 5.4-3 3.6 0 5.6 3.7 3.9 7.1C19 16.6 12 21 12 21z"/></svg>';

  var container = document.createElement('div');
  container.id = 'kaizen-faq-launcher-container';
  container.innerHTML =
    '<div class="kaizen-faq-teaser" role="status"><span>👋 Questions about our programs? Ask our concierge.</span>' +
    '<button id="kaizen-faq-teaser-close" type="button" aria-label="Dismiss">×</button></div>' +
    '<button id="kaizen-faq-launcher" type="button" aria-controls="kaizen-faq-panel" aria-expanded="false">' +
    '<span class="kaizen-launcher-avatar">' + AVATAR_SVG + '<span class="kaizen-online-dot"></span></span>' +
    '<span class="kaizen-launcher-text">Chat with Kaizen</span></button>';

  var panel = document.createElement('section');
  panel.id = 'kaizen-faq-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Kaizen concierge chat');
  panel.innerHTML =
    '<div id="kaizen-faq-head"><div class="kaizen-head-info"><div class="kaizen-avatar">' + AVATAR_SVG +
    '<span class="kaizen-online-badge"></span></div><div><strong>Kaizen Concierge</strong>' +
    '<small><span class="kaizen-status-pulse"></span>Instant replies · FAQ assistant</small></div></div>' +
    '<div class="kaizen-head-actions">' +
    '<button id="kaizen-faq-mute" type="button" aria-label="Mute sound" title="Mute sound">🔊</button>' +
    '<button id="kaizen-faq-reset" type="button" aria-label="Restart chat" title="Restart chat">↺</button>' +
    '<button id="kaizen-faq-close" type="button" aria-label="Close chat">✕</button></div></div>' +
    '<div id="kaizen-faq-messages" role="log" aria-live="polite"></div>' +
    '<div id="kaizen-faq-chips"></div>' +
    '<form id="kaizen-faq-form" autocomplete="off"><input id="kaizen-faq-input" maxlength="300" required placeholder="Type your question…" aria-label="Type your question">' +
    '<button type="submit" aria-label="Send message">➤</button></form>' +
    '<p id="kaizen-faq-note">Automated FAQ assistant · Not medical advice</p>';

  document.body.appendChild(container);
  document.body.appendChild(panel);

  var launcher = document.getElementById('kaizen-faq-launcher');
  var teaser = container.querySelector('.kaizen-faq-teaser');
  var teaserClose = document.getElementById('kaizen-faq-teaser-close');
  var messages = document.getElementById('kaizen-faq-messages');
  var chipsBox = document.getElementById('kaizen-faq-chips');
  var form = document.getElementById('kaizen-faq-form');
  var input = document.getElementById('kaizen-faq-input');
  var muteBtn = document.getElementById('kaizen-faq-mute');
  var resetBtn = document.getElementById('kaizen-faq-reset');
  var closeBtn = document.getElementById('kaizen-faq-close');

  /* ---------------- Sound (Web Audio, no files) ---------------- */
  var muted = false, audioCtx = null;
  try { muted = sessionStorage.getItem('kaizenMuted') === '1'; } catch (e) {}
  muteBtn.textContent = muted ? '🔇' : '🔊';

  function pop(freq) {
    if (muted) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain(), t = audioCtx.currentTime;
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, t);
      o.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.08);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.08, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t); o.stop(t + 0.18);
    } catch (e) {}
  }
  muteBtn.addEventListener('click', function () {
    muted = !muted;
    muteBtn.textContent = muted ? '🔇' : '🔊';
    muteBtn.setAttribute('aria-label', muted ? 'Unmute sound' : 'Mute sound');
    try { sessionStorage.setItem('kaizenMuted', muted ? '1' : '0'); } catch (e) {}
    if (!muted) pop(520);
  });

  /* ---------------- Rendering helpers ---------------- */
  function addInline(el, str) {
    str.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).forEach(function (p) {
      if (!p) return;
      var node;
      if (/^\*\*[^*]+\*\*$/.test(p)) { node = document.createElement('strong'); node.textContent = p.slice(2, -2); }
      else if (/^\*[^*]+\*$/.test(p)) { node = document.createElement('em'); node.textContent = p.slice(1, -1); }
      else { node = document.createTextNode(p); }
      el.appendChild(node);
    });
  }
  function scrollDown() { messages.scrollTop = messages.scrollHeight; }

  function addTimeLabel(label) {
    var t = document.createElement('div');
    t.className = 'kaizen-faq-time';
    t.textContent = label;
    messages.appendChild(t);
  }

  function addUser(text) {
    var row = document.createElement('div');
    row.className = 'kaizen-faq-row user';
    var b = document.createElement('div');
    b.className = 'kaizen-faq-bubble kaizen-faq-user';
    b.textContent = text;
    row.appendChild(b);
    messages.appendChild(row);
    pop(430);
    scrollDown();
  }

  function paragraph(parent, str, first) {
    var d = document.createElement('div');
    if (!first) d.style.marginTop = '8px';
    addInline(d, str);
    parent.appendChild(d);
  }

  function runAction(a) {
    if (a.type === 'whatsapp') {
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(a.text), '_blank', 'noopener');
    } else if (a.type === 'tel') {
      window.location.href = 'tel:' + PHONE_TEL;
    } else if (a.type === 'modal') {
      togglePanel(false);                       // modal sits below the chat window, so close chat first
      if (window.KaizenSite && window.KaizenSite.openBooking) window.KaizenSite.openBooking(a.service);
      else { var btn = document.querySelector('.open-booking'); if (btn) btn.click(); }
    } else if (a.type === 'scroll') {
      if (window.innerWidth <= 900) togglePanel(false);
      setTimeout(function () {
        if (window.KaizenSite && window.KaizenSite.scrollTo) window.KaizenSite.scrollTo(a.target);
        else { var el = document.querySelector(a.target); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
      }, 150);
    }
  }

  function addBot(reply) {
    var row = document.createElement('div');
    row.className = 'kaizen-faq-row bot';
    var icon = document.createElement('div');
    icon.className = 'kaizen-bot-icon';
    icon.textContent = '🌿';
    var bubble = document.createElement('div');
    bubble.className = 'kaizen-faq-bubble kaizen-faq-bot';

    reply.text.forEach(function (p, i) { paragraph(bubble, p, i === 0); });
    if (reply.list) {
      var ul = document.createElement('ul');
      ul.className = 'kaizen-faq-list';
      reply.list.forEach(function (li) { var l = document.createElement('li'); l.textContent = li; ul.appendChild(l); });
      bubble.appendChild(ul);
    }
    if (reply.text2) reply.text2.forEach(function (p) { paragraph(bubble, p, false); });

    if (reply.actions && reply.actions.length) {
      var box = document.createElement('div');
      box.className = 'kaizen-faq-actions';
      reply.actions.forEach(function (a) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'kaizen-action-btn kaizen-action-' + ({ modal: 'modal', whatsapp: 'whatsapp', tel: 'tel', scroll: 'scroll' }[a.type]);
        btn.textContent = a.label;
        btn.addEventListener('click', function () { runAction(a); });
        box.appendChild(btn);
      });
      bubble.appendChild(box);
    }
    row.appendChild(icon);
    row.appendChild(bubble);
    messages.appendChild(row);
    pop(620);
    scrollDown();
  }

  function showTyping() {
    var row = document.createElement('div');
    row.className = 'kaizen-faq-row bot';
    row.innerHTML = '<div class="kaizen-bot-icon">🌿</div><div class="kaizen-faq-bubble kaizen-faq-bot kaizen-typing-bubble" aria-label="Concierge is typing">' +
      '<span class="kaizen-dot"></span><span class="kaizen-dot"></span><span class="kaizen-dot"></span></div>';
    messages.appendChild(row);
    scrollDown();
    return row;
  }

  function setChips(list) {
    chipsBox.innerHTML = '';
    list.forEach(function (label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.addEventListener('click', function () { ask(label); });
      chipsBox.appendChild(b);
    });
    chipsBox.scrollLeft = 0;
  }

  /* ---------------- Conversation flow ---------------- */
  var queue = [], busy = false, session = 0;

  function delayFor(reply) {
    var len = reply.text.join(' ').length;
    return Math.min(1700, 550 + len * 6);
  }

  function ask(text) {
    text = String(text || '').trim();
    if (!text) return;
    addUser(text);
    queue.push({ text: text, s: session });
    next();
  }

  function next() {
    if (busy || !queue.length) return;
    busy = true;
    var job = queue.shift();
    var reply = respond(job.text);
    var typing = showTyping();
    setTimeout(function () {
      if (job.s !== session) return;             // chat was restarted meanwhile
      typing.remove();
      addBot(reply);
      setChips(reply.chips || DEFAULT_CHIPS);
      busy = false;
      next();
    }, delayFor(reply));
  }

  function greet() {
    session++;
    queue = []; busy = true;
    messages.innerHTML = '';
    addTimeLabel('Today');
    var typing = showTyping();
    var my = session;
    setTimeout(function () {
      if (my !== session) return;
      typing.remove();
      addBot({
        text: ['Assalamualaikum! Welcome to **Kaizen Health & Wellness**. 🌿',
          'I can help with our listed programs, booking a consultation, locations and contact details. How can I help you today?']
      });
      setChips(DEFAULT_CHIPS);
      busy = false;
      next();
    }, 800);
  }

  /* ---------------- Panel open / close ---------------- */
  var opened = false, greeted = false, teaserDismissed = false;

  function hideTeaser() { teaser.classList.remove('show'); }

  function togglePanel(open) {
    panel.classList.toggle('kaizen-faq-open', open);
    launcher.setAttribute('aria-expanded', String(open));
    if (open) {
      opened = true;
      hideTeaser();
      if (!greeted) { greeted = true; greet(); }
      setTimeout(function () { input.focus(); }, 250);
      pop(560);
    }
  }

  launcher.addEventListener('click', function () { togglePanel(!panel.classList.contains('kaizen-faq-open')); });
  closeBtn.addEventListener('click', function () { togglePanel(false); launcher.focus(); });
  resetBtn.addEventListener('click', function () { greet(); });
  teaser.addEventListener('click', function (e) {
    if (e.target === teaserClose) return;
    togglePanel(true);
  });
  teaserClose.addEventListener('click', function (e) {
    e.stopPropagation();
    teaserDismissed = true;
    hideTeaser();
    try { sessionStorage.setItem('kaizenTeaser', '1'); } catch (er) {}
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('kaizen-faq-open')) togglePanel(false);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = '';
    ask(v);
    input.focus();
  });

  /* Proactive teaser after 3 seconds (once per visit) */
  try { teaserDismissed = sessionStorage.getItem('kaizenTeaser') === '1'; } catch (e) {}
  setTimeout(function () {
    if (!opened && !teaserDismissed) teaser.classList.add('show');
  }, 3000);
})();
