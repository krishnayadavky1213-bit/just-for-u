 (function(){
    "use strict";

    // ---------- STATE ----------
    let currentStep = 0;
    let userName = '';

    // DOM elements
    const mainMessage = document.getElementById('mainMessage');
    const inputSection = document.getElementById('inputSection');
    const actionButtons = document.getElementById('actionButtons');
    const extraNote = document.getElementById('extraNote');
    const audio = document.getElementById('loveMusic');
    const playBtn = document.getElementById('playMusicBtn');

    // ---------- MUSIC CONTROLS ----------
    let musicPlaying = false;
    playBtn.addEventListener('click', () => {
      if (!musicPlaying) {
        audio.play().then(() => {
          musicPlaying = true;
          playBtn.textContent = '⏸ Pause Music';
        }).catch(() => {
          // Many browsers block autoplay; user can tap again.
          alert('Tap again to play music ❤️ (browser may require interaction)');
        });
      } else {
        audio.pause();
        musicPlaying = false;
        playBtn.textContent = '🎵 Play Romantic Music';
      }
    });

    // Helper to add fade animation then remove
    function applyFade() {
      mainMessage.classList.add('fade-in');
      setTimeout(() => mainMessage.classList.remove('fade-in'), 400);
    }

    // ---------- RENDER STEP BASED ON currentStep ----------
    function renderStep() {
      // Clear dynamic sections
      inputSection.innerHTML = '';
      actionButtons.innerHTML = '';
      extraNote.innerHTML = '';
      
      applyFade();

      // ---------- STEP 0: NAME INPUT ----------
      if (currentStep === 0) {
        mainMessage.innerHTML = `✨ First, tell me your lovely name, beautiful? ✨`;
        inputSection.innerHTML = `
          <div class="input-group">
            <input type="text" id="nameInput" placeholder="Your sweet name..." autocomplete="off" />
          </div>
        `;
        actionButtons.innerHTML = `<button class="btn" id="nextBtn">Continue ❤️</button>`;
        
        document.getElementById('nextBtn').addEventListener('click', () => {
          const nameInput = document.getElementById('nameInput');
          const name = nameInput.value.trim();
          if (!name) {
            alert("Please write your beautiful name 🌸");
            return;
          }
          userName = name;
          currentStep = 1;
          renderStep();
        });
      } 
      
      // ---------- STEP 1: HAPPY NEW YEAR + SURPRISE TEASER ----------
      else if (currentStep === 1) {
        mainMessage.innerHTML = `
          🎉 <span class="sweet-words">${userName}, Happy New Year my dear!</span> 🎉<br><br>
          May this year fill your life with endless joy, success, and all the love your heart can hold.<br><br>
          <strong>And I have a little surprise for you...</strong> ❤️
        `;
        actionButtons.innerHTML = `<button class="btn" id="nextBtn">Show me the surprise ➡️</button>`;
        
        document.getElementById('nextBtn').addEventListener('click', () => {
          currentStep = 2;
          renderStep();
        });
      } 
      
      // ---------- STEP 2: BIRTHDAY + POETRY + CHARACTER TRAITS ----------
      else if (currentStep === 2) {
        mainMessage.innerHTML = `
          <div style="font-size:1.9rem;">📅 I remember...</div>
          <div class="birthday-highlight">🎂 Bhadra 29 🎂</div>
          <div style="margin:15px 0;">Yes ${userName}, your birthday is forever special to me.</div>

          <div class="poetry">
            In the quiet of my heart, I wrote these lines for you:<br><br>
            "Your smile is the first light of my morning,<br>
            Your voice — the softest melody I long to hear.<br>
            In your gentle ways, I found my peace,<br>
            In your kind soul, I found my home."
          </div>

          <div class="character-highlight">
            The way you behave — so graceful and warm, the kindness that naturally flows from you, 
            how you care for others without expecting anything in return, your beautiful character that shines even in silence... 
            These things made me fall deeply in love with you.
          </div>

          <div class="sweet-words" style="font-size:1.4rem;">
            I've been loving you from two years... quietly, truly, and with all my heart.
          </div>
        `;
        actionButtons.innerHTML = `<button class="btn" id="nextBtn">Continue to my feelings ➡️</button>`;
        
        document.getElementById('nextBtn').addEventListener('click', () => {
          currentStep = 3;
          renderStep();
        });
      } 
      
      // ---------- STEP 3: DEEP FEELINGS + THE QUESTION ----------
      else if (currentStep === 3) {
        mainMessage.innerHTML = `
          <div style="font-size:2.1rem; color:#ffd6f0;">${userName}, my heart wants to say...</div><br>
          
          <div class="poetry">
            You are the poetry I never knew I could write,<br>
            The calm in my chaos, the dream in my night.<br>
            Every little thing you do, every smile you share,<br>
            Makes this ordinary world feel beautifully rare.
          </div>

          <div class="character-highlight">
            Your behaviour is so pure and elegant, your character so strong yet soft — 
            you carry kindness like a crown, and grace like a gentle breeze. 
            That's what made me fall for you completely.
          </div>

          <div style="margin:22px 0; font-size:1.32rem;">
            I know the heart of a girl... You deserve to feel cherished, respected, and deeply loved every day.
          </div>

          <div style="font-size:1.9rem; margin:20px 0;">🌸 ${userName}, do you want me in your life? 🌸</div>
        `;

        actionButtons.innerHTML = `
          <button class="btn" id="yesBtn" style="background:#a5d6a5;">💖 Yes, I do</button>
          <button class="btn" id="noBtn" style="background:#d4a0b5;">🥀 Not right now</button>
        `;

        // YES BUTTON
        document.getElementById('yesBtn').addEventListener('click', () => {
          mainMessage.innerHTML = `
            <div style="font-size:2.4rem;">💞 ${userName}, you just made my world brighter! 💞</div><br>
            <div class="poetry">
              From today, I promise to love you the way you deserve —<br>
              with patience, respect, and endless affection.
            </div>
            <div style="margin-top:20px; font-size:1.3rem;">
              Happy New Year again, my love. Let's make this year ours ❤️
            </div>
          `;
          actionButtons.innerHTML = `<button class="btn" id="restartBtn">Read Again 🌸</button>`;
          document.getElementById('restartBtn').addEventListener('click', resetJourney);
        });

        // NO BUTTON
        document.getElementById('noBtn').addEventListener('click', () => {
          mainMessage.innerHTML = `
            <div style="font-size:2.3rem;">😊 I understand, my dear 😊</div><br>
            <div class="sweet-words">I'll still be here, waiting with the same love.</div>
            <div style="margin:18px 0;">Take all the time you need. My heart isn't going anywhere.</div>
          `;
          actionButtons.innerHTML = `<button class="btn" id="restartBtn">Read Again 🌸</button>`;
          document.getElementById('restartBtn').addEventListener('click', resetJourney);
        });
      }
    }

    // ---------- RESET JOURNEY ----------
    function resetJourney() {
      currentStep = 0;
      userName = '';
      renderStep();
      extraNote.innerHTML = '';
    }

    // ---------- INITIAL RENDER ----------
    renderStep();

    // ---------- KEYBOARD: ENTER ON STEP 0 ----------
    document.addEventListener('keypress', (e) => {
      if (currentStep === 0 && e.key === 'Enter') {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.click();
      }
    });

  })();

