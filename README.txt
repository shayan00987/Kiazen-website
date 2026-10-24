# Kaizen Health & Wellness — Natural Concierge Chatbot

A high-naturality, doctor-guided medical concierge chatbot designed specifically for Kaizen Health & Wellness. It runs entirely in the browser with **zero external API costs**, zero latency, and verified clinical guidance.

## What's New ("Naturality" Improvements):
1. **Conversational Concierge Voice**: Replaced cold, robotic "database-style" answers with warm, empathetic concierge dialogue representing Kaizen's philosophy ("Better Health Today. Longer Tomorrow.").
2. **Realistic Typing Cadence**: Natural variable typing simulation with animated bouncing dots (`...`) instead of 0ms instant robotic text dumps.
3. **Smart Intent Recognition**: Multi-intent scoring engine with fuzzy typo tolerance (handles common misspellings like "peptid", "lahor", "apointment") and symptom mapping (fatigue, low energy, stubborn weight, brain fog).
4. **Dynamic Context-Aware Chips**: Suggested question chips evolve organically after every conversation turn rather than remaining static.
5. **Interactive In-Message Action Buttons**:
   - `📅 Book Consultation` — Automatically opens the website's booking modal and pre-selects the discussed service.
   - `💬 WhatsApp Care Team` — Instant one-tap message to the clinical coordinator at 0326 8666 884.
   - `📞 Call Clinic` — Instant dial to 0326 8666 884.
   - `📍 Clinic Locations` — Direct smooth scroll and guidance for Lahore (DHA 6) & Islamabad (F-8).
6. **Built-in Audio Feedback**: Soft, modern concierge pop synthesized directly with the Web Audio API (no external MP3/audio files needed), with an intuitive mute/unmute button in the header.
7. **Proactive Teaser Pill**: A floating greeting badge appears gracefully after 3 seconds to welcome new visitors.
8. **Luxury Organic Aesthetic**: Deep navy glassmorphism, rounded corners, spring-like easing curves, and mobile-friendly responsiveness.

## Files
- `chatbot.css` — Isolated, self-contained styles.
- `chatbot.js` — Natural conversational engine and UI components.

## How to add to your website:
1. Copy `chatbot.css` and `chatbot.js` into your website root directory.
2. In your `index.html`, add this line inside `<head>`:
   ```html
   <link rel="stylesheet" href="chatbot.css">
   ```
3. Add this line immediately before the closing `</body>`:
   ```html
   <script src="chatbot.js"></script>
   ```
4. Save and deploy.

## Customizing Knowledge:
To adjust clinic details, hours, or protocols, simply edit the `KNOWLEDGE_BASE` object in `chatbot.js`.
