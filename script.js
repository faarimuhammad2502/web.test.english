// script.js - EduTest Pro Elegant Logic
let activeTest = 'toefl';
let currentLang = 'id'; 
let isDarkMode = false;
let questions = [];
let currentIndex = 0;
let userAnswers = {};
let timerInterval;
let timeLeft = 0;
let speechUtterance = null;
let isTestActive = false; 

const translations = {
    id: {
        heroPre: "Official Assessment Platform",
        heroTitle: "Ujian Standar Internasional",
        heroSubtitle: "Evaluasi skor kemampuan Bahasa Inggris Anda dengan format, waktu, dan standar otentik.",
        questionsCount: "Soal", minutesCount: "Menit",
        testNotice: "Mode Ujian Ketat Diaktifkan. Jangan tutup halaman saat ujian berlangsung.",
        startBtn: "Mulai Ujian", question: "Question", gridBtn: "Navigasi", questionPalette: "Peta Soal",
        listeningAudio: "Listening Section", audioInstruct: "Dengarkan klip suara berikut",
        playAudio: "Putar Audio", stopAudio: "Hentikan", showTranscript: "Transkrip Teks",
        prevBtn: "Kembali", nextBtn: "Lanjut", finishBtn: "Selesai",
        resultTitle: "Official Test Report", overallEval: "Assessment Score",
        confirmTitle: "Konfirmasi Ujian",
        confirmDesc: "Ujian ini bersifat tertutup (strict). Setelah dimulai, ujian tidak dapat dibatalkan, dijeda, atau ditutup hingga Anda menyelesaikannya secara penuh.",
        cancelBtn: "Batal", confirmBtn: "Mulai Ujian", backBtn: "Kembali Ke Beranda"
    },
    en: {
        heroPre: "Official Assessment Platform",
        heroTitle: "International Standard Test",
        heroSubtitle: "Evaluate your English proficiency score with authentic formatting and timing.",
        questionsCount: "Questions", minutesCount: "Minutes",
        testNotice: "Strict Test Mode Active. Do not close this page during the exam.",
        startBtn: "Start Test", question: "Question", gridBtn: "Navigation", questionPalette: "Question Map",
        listeningAudio: "Listening Section", audioInstruct: "Listen to the following audio clip",
        playAudio: "Play Audio", stopAudio: "Stop", showTranscript: "Text Transcript",
        prevBtn: "Back", nextBtn: "Next", finishBtn: "Submit",
        resultTitle: "Official Test Report", overallEval: "Assessment Score",
        confirmTitle: "Test Confirmation",
        confirmDesc: "This is a strict examination. Once started, it cannot be canceled, paused, or closed until fully completed.",
        cancelBtn: "Cancel", confirmBtn: "Start Test", backBtn: "Return to Home"
    }
};

function updateLanguageUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if(el.tagName === 'BUTTON' && el.querySelector('i')) {
                let icon = el.querySelector('i').outerHTML;
                if(el.id === 'next-btn' || el.id === 'submit-btn') {
                    el.innerHTML = `<span>${translations[currentLang][key]}</span> ${icon}`;
                } else if(el.id === 'prev-btn' || el.id === 'start-btn') {
                    el.innerHTML = `${icon} <span>${translations[currentLang][key]}</span>`;
                } else {
                    el.innerHTML = `${icon} ${translations[currentLang][key]}`;
                }
            } else {
                el.innerHTML = translations[currentLang][key];
            }
        }
    });
    document.getElementById('lang-label').innerText = currentLang === 'id' ? 'ID-EN' : 'EN-ID';
    
    let dt = db[activeTest].desc[currentLang];
    dt = dt.replace(/simulasi /gi, '');
    document.getElementById('test-desc').innerHTML = dt;
}

function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    updateLanguageUI();
    if (!document.getElementById('quiz-screen').classList.contains('hidden')) renderQuestion();
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark');
    document.getElementById('dark-icon').className = isDarkMode ? 'fas fa-sun text-sm text-zinc-100' : 'fas fa-moon text-sm text-zinc-900';
}

function formatTime(sec) {
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return h > 0 ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function switchTab(testId) {
    if(isTestActive) return;
    activeTest = testId;
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('border-zinc-900', 'dark:border-zinc-100', 'text-zinc-900', 'dark:text-zinc-100');
        b.classList.add('border-transparent', 'text-zinc-400');
    });
    const aBtn = document.getElementById(`tab-${testId}`);
    if(aBtn) {
        aBtn.classList.remove('border-transparent', 'text-zinc-400');
        aBtn.classList.add('border-zinc-900', 'dark:border-zinc-100', 'text-zinc-900', 'dark:text-zinc-100');
    }
    resetApp();
}

function resetApp() {
    if(isTestActive) return;
    clearInterval(timerInterval); stopQuestionSpeech();
    userAnswers = {}; currentIndex = 0;
    const data = db[activeTest];
    document.getElementById('test-icon').className = `fas ${data.icon} text-4xl text-zinc-800 dark:text-zinc-200 opacity-80`;
    
    let titleStr = data.title.replace(/Simulation/gi, '').replace(/Simulasi/gi, '');
    document.getElementById('test-title').innerText = titleStr;
    
    let dt = data.desc[currentLang].replace(/simulasi /gi, '');
    document.getElementById('test-desc').innerHTML = dt;
    
    document.getElementById('test-total-q').innerText = data.questions.length;
    document.getElementById('test-time-limit').innerText = Math.round(data.timeLimit / 60);
    
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('grid-palette').classList.add('hidden');
    
    enableNavUI();
}

function openConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    const box = document.getElementById('confirm-modal-box');
    modal.classList.remove('hidden');
    setTimeout(() => { box.classList.remove('scale-95'); box.classList.add('scale-100'); }, 10);
}

function closeConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    const box = document.getElementById('confirm-modal-box');
    box.classList.remove('scale-100'); box.classList.add('scale-95');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

function disableNavUI() {
    document.getElementById('tabs-nav').classList.add('opacity-30', 'pointer-events-none');
    document.getElementById('main-header').classList.add('hidden');
    document.getElementById('logo-nav').classList.remove('cursor-pointer');
    document.getElementById('utility-nav').classList.add('hidden');
}

function enableNavUI() {
    document.getElementById('tabs-nav').classList.remove('opacity-30', 'pointer-events-none');
    document.getElementById('main-header').classList.remove('hidden');
    document.getElementById('logo-nav').classList.add('cursor-pointer');
    document.getElementById('utility-nav').classList.remove('hidden');
}

function startTestConfirmed() {
    closeConfirmModal();
    isTestActive = true;
    disableNavUI();
    
    questions = db[activeTest].questions; timeLeft = db[activeTest].timeLimit;
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('total-q').innerText = questions.length;
    startTimer(); renderQuestion();
    
    window.onbeforeunload = function() {
        return "Anda sedang berada di tengah ujian. Jika halaman ditutup, progress Anda akan hilang. Yakin ingin keluar?";
    };
}

function startTimer() {
    const tEl = document.getElementById('timer'); tEl.innerText = formatTime(timeLeft);
    timerInterval = setInterval(() => {
        timeLeft--; tEl.innerText = formatTime(timeLeft);
        if (timeLeft <= 0) { clearInterval(timerInterval); finishTest(); }
    }, 1000);
}

function renderQuestion() {
    stopQuestionSpeech();
    const qData = questions[currentIndex];
    document.getElementById('current-q').innerText = currentIndex + 1;
    
    const sData = db[activeTest].sections.find(s => s.id === qData.section);
    document.getElementById('section-badge').innerText = sData ? sData.name : "SECTION";

    const rCont = document.getElementById('reading-container'), aCont = document.getElementById('audio-container');
    rCont.classList.add('hidden'); aCont.classList.add('hidden');

    if (sData && sData.type === 'reading' && qData.passageText) {
        rCont.classList.remove('hidden');
        document.getElementById('passage-title').innerText = qData.passageTitle || "Reading Passage";
        document.getElementById('passage-text').innerHTML = qData.passageText;
    } else if (sData && sData.type === 'listening' && qData.audioTranscript) {
        aCont.classList.remove('hidden');
        document.getElementById('audio-transcript-text').innerHTML = qData.audioTranscript.replace(/\n/g, '<br>');
    }

    let qTextClean = qData.q.replace(/Simulasi Ketahanan - /gi, '').replace(/Simulasi/gi, '');
    document.getElementById('question-text').innerText = qTextClean;
    
    const oCont = document.getElementById('options-container'); oCont.innerHTML = '';
    
    qData.options.forEach((opt, idx) => {
        const isSel = userAnswers[currentIndex] === idx;
        const btn = document.createElement('button');
        // Elegant radio button design
        btn.className = `w-full text-left p-4 sm:p-5 rounded-none border-b border-zinc-200 dark:border-zinc-800 transition-all text-sm sm:text-base font-medium flex items-center group ${isSel ? 'bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white' : 'bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100'}`;
        btn.innerHTML = `
            <div class="w-5 h-5 rounded-full border flex-shrink-0 mr-4 flex items-center justify-center transition-colors ${isSel ? 'border-zinc-900 dark:border-zinc-100' : 'border-zinc-400 dark:border-zinc-600'}">
                <div class="w-2.5 h-2.5 rounded-full ${isSel ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-transparent group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700'} transition-colors"></div>
            </div>
            <span class="flex-grow leading-relaxed font-sans">${opt}</span>
        `;
        btn.onclick = () => { userAnswers[currentIndex] = idx; renderQuestion(); };
        oCont.appendChild(btn);
    });

    document.getElementById('prev-btn').classList.toggle('hidden', currentIndex === 0);
    if (currentIndex === questions.length - 1) { 
        document.getElementById('next-btn').classList.add('hidden'); 
        document.getElementById('submit-btn').classList.remove('hidden'); 
    } else { 
        document.getElementById('next-btn').classList.remove('hidden'); 
        document.getElementById('submit-btn').classList.add('hidden'); 
    }
    renderGridPalette();
}

function nextQuestion() { if(currentIndex < questions.length-1) { currentIndex++; renderQuestion(); } }
function prevQuestion() { if(currentIndex > 0) { currentIndex--; renderQuestion(); } }

function toggleGridPalette() {
    const p = document.getElementById('grid-palette'); p.classList.toggle('hidden');
    if (!p.classList.contains('hidden')) renderGridPalette();
}

function renderGridPalette() {
    const c = document.getElementById('grid-buttons-container'); c.innerHTML = '';
    questions.forEach((q, idx) => {
        const btn = document.createElement('button');
        // Elegant square grid
        btn.className = `h-9 w-full border text-xs font-sans font-semibold flex items-center justify-center transition-all ${idx===currentIndex ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : userAnswers[idx]!==undefined ? 'border-zinc-900 dark:border-zinc-500 text-zinc-900 dark:text-zinc-200' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 hover:border-zinc-400'}`;
        btn.innerText = idx + 1;
        btn.onclick = () => { currentIndex = idx; renderQuestion(); };
        c.appendChild(btn);
    });
}

function playQuestionSpeech() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        let txt = questions[currentIndex].audioTranscript || questions[currentIndex].q;
        speechUtterance = new SpeechSynthesisUtterance(txt.replace(/<[^>]*>?/gm, ''));
        speechUtterance.lang = 'en-US';
        window.speechSynthesis.speak(speechUtterance);
    }
}
function stopQuestionSpeech() { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }

function finishTest() {
    clearInterval(timerInterval); stopQuestionSpeech();
    isTestActive = false; 
    window.onbeforeunload = null; 
    
    document.getElementById('quiz-screen').classList.add('hidden'); 
    document.getElementById('result-screen').classList.remove('hidden');
    let r = 0; questions.forEach((q, i) => { if(userAnswers[i] === q.answer) r++; });
    const pct = (r/questions.length)*100;
    
    if (activeTest === 'cefr') {
        document.getElementById('final-score-main').innerText = `Score: ${Math.round(pct)}%`;
        document.getElementById('score-description').innerText = "Tingkat CEFR estimasi (Full Set)";
    } else if (activeTest === 'toefl') {
        const est = Math.round(310 + ((pct/100)*367));
        document.getElementById('final-score-main').innerText = `ITP ${est}`;
        document.getElementById('score-description').innerText = "Estimasi skor konversi TOEFL PBT (Skala 310-677) dari pengujian ketahanan penuh (Full Endurance).";
    } else {
        let band = (pct/100)*9.0; band = Math.round(band*2)/2; if(band<1) band=1;
        document.getElementById('final-score-main').innerText = `Band ${band.toFixed(1)}`;
        document.getElementById('score-description').innerText = "Estimasi Skala Band IELTS (Overall) dari pengujian ketahanan penuh (Full Endurance).";
    }
}

window.onload = () => { switchTab('toefl'); updateLanguageUI(); };
