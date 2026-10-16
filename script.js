// script.js - EduTest Pro Strict Logic
let activeTest = 'toefl';
let currentLang = 'id'; 
let isDarkMode = false;
let questions = [];
let currentIndex = 0;
let userAnswers = {};
let timerInterval;
let timeLeft = 0;
let speechUtterance = null;
let isTestActive = false; // Flag for strict mode

const translations = {
    id: {
        heroTitle: "Ujian Standar Internasional",
        heroSubtitle: "Evaluasi & tingkatkan skor kemampuan Bahasa Inggris Anda dengan format, waktu, dan kisi-kisi soal yang otentik.",
        questionsCount: "Soal", minutesCount: "Menit",
        testNotice: "Perhatian: Ujian bersifat strict. Anda tidak bisa keluar dari halaman ini sebelum ujian selesai.",
        startBtn: "Mulai Ujian", question: "Soal", gridBtn: "Peta Soal", questionPalette: "Navigasi Soal",
        listeningAudio: "Sesi Listening Audio", audioInstruct: "Dengarkan klip suara berikut:",
        playAudio: "Putar Audio", stopAudio: "Hentikan", showTranscript: "Tampilkan Transkrip",
        prevBtn: "Sebelumnya", nextBtn: "Selanjutnya", finishBtn: "Selesaikan Ujian",
        resultTitle: "Hasil Laporan Ujian", overallEval: "Evaluasi Tingkat Kemampuan",
        confirmTitle: "Konfirmasi Ujian",
        confirmDesc: "Apakah Anda yakin sudah siap memulai ujian ini? Setelah dimulai, ujian tidak dapat dibatalkan, dijeda, atau ditutup hingga Anda menyelesaikannya.",
        cancelBtn: "Batal", confirmBtn: "Ya, Mulai Ujian", backBtn: "Kembali ke Beranda"
    },
    en: {
        heroTitle: "International Standard Test",
        heroSubtitle: "Evaluate your English proficiency score with authentic formatting and timing.",
        questionsCount: "Questions", minutesCount: "Minutes",
        testNotice: "Notice: This is a strict test. You cannot leave this page until the test is completed.",
        startBtn: "Start Test", question: "Question", gridBtn: "Question Map", questionPalette: "Question Navigation",
        listeningAudio: "Listening Audio Section", audioInstruct: "Listen carefully to the audio clip:",
        playAudio: "Play Audio", stopAudio: "Stop", showTranscript: "Show Transcript",
        prevBtn: "Previous", nextBtn: "Next", finishBtn: "Finish Exam",
        resultTitle: "Test Performance Report", overallEval: "Overall Assessment",
        confirmTitle: "Test Confirmation",
        confirmDesc: "Are you sure you are ready to start this test? Once started, the test cannot be canceled, paused, or closed until you finish it.",
        cancelBtn: "Cancel", confirmBtn: "Yes, Start Test", backBtn: "Back to Home"
    }
};

function updateLanguageUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if(el.tagName === 'BUTTON' && el.querySelector('i')) {
                // preserve icon if exists
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
    document.getElementById('lang-label').innerText = currentLang === 'id' ? 'ID | EN' : 'EN | ID';
    
    // specifically update the dynamic desc from db
    let dt = db[activeTest].desc[currentLang];
    // remove the word 'simulasi' from description dynamically
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
    document.getElementById('dark-icon').className = isDarkMode ? 'fas fa-sun text-amber-400' : 'fas fa-moon text-slate-700';
}

function formatTime(sec) {
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return h > 0 ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function switchTab(testId) {
    if(isTestActive) return; // Prevent switching if test is running
    activeTest = testId;
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('border-blue-600', 'text-blue-600', 'dark:text-blue-400');
        b.classList.add('border-transparent', 'text-slate-500', 'dark:text-slate-400');
    });
    const aBtn = document.getElementById(`tab-${testId}`);
    if(aBtn) {
        aBtn.classList.remove('border-transparent', 'text-slate-500');
        aBtn.classList.add('border-blue-600', 'text-blue-600', 'dark:text-blue-400');
    }
    resetApp();
}

function resetApp() {
    if(isTestActive) return; // Prevent reset if test is running
    clearInterval(timerInterval); stopQuestionSpeech();
    userAnswers = {}; currentIndex = 0;
    const data = db[activeTest];
    document.getElementById('test-icon').className = `fas ${data.icon} text-3xl`;
    
    // Remove "Simulation" word from title if present
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
    
    // Enable UI elements
    enableNavUI();
}

function openConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    const box = document.getElementById('confirm-modal-box');
    modal.classList.remove('hidden');
    setTimeout(() => {
        box.classList.remove('scale-95');
        box.classList.add('scale-100');
    }, 10);
}

function closeConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    const box = document.getElementById('confirm-modal-box');
    box.classList.remove('scale-100');
    box.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function disableNavUI() {
    // Hide tabs, logo click, utility buttons
    document.getElementById('tabs-nav').classList.add('opacity-50', 'pointer-events-none');
    document.getElementById('main-header').classList.add('hidden');
    document.getElementById('logo-nav').classList.remove('cursor-pointer');
    document.getElementById('utility-nav').classList.add('hidden');
}

function enableNavUI() {
    document.getElementById('tabs-nav').classList.remove('opacity-50', 'pointer-events-none');
    document.getElementById('main-header').classList.remove('hidden');
    document.getElementById('logo-nav').classList.add('cursor-pointer');
    document.getElementById('utility-nav').classList.remove('hidden');
}

function startTestConfirmed() {
    closeConfirmModal();
    isTestActive = true;
    disableNavUI(); // Strict mode active
    
    questions = db[activeTest].questions; timeLeft = db[activeTest].timeLimit;
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('total-q').innerText = questions.length;
    startTimer(); renderQuestion();
    
    // Warn user before reload/close tab
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
    document.getElementById('q-number-badge').innerText = currentIndex + 1;
    
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

    // Clean up "Simulasi" text from questions
    let qTextClean = qData.q.replace(/Simulasi Ketahanan - /gi, '').replace(/Simulasi/gi, '');
    document.getElementById('question-text').innerText = qTextClean;
    
    const oCont = document.getElementById('options-container'); oCont.innerHTML = '';
    
    qData.options.forEach((opt, idx) => {
        const isSel = userAnswers[currentIndex] === idx;
        const btn = document.createElement('button');
        btn.className = `w-full text-left p-4 rounded-xl border-2 transition text-sm font-medium flex items-center group ${isSel ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 shadow-sm' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'}`;
        btn.innerHTML = `<span class="flex items-center justify-center w-7 h-7 rounded-lg border text-xs font-bold mr-3.5 ${isSel ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 text-slate-500'}">${String.fromCharCode(65+idx)}</span><span class="flex-grow">${opt}</span>`;
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
        btn.className = `h-9 w-full rounded-lg font-bold text-xs flex items-center justify-center border ${idx===currentIndex ? 'border-blue-600 bg-blue-600 text-white' : userAnswers[idx]!==undefined ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`;
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
    isTestActive = false; // Test is finished, release strict mode
    window.onbeforeunload = null; // Remove refresh warning
    
    document.getElementById('quiz-screen').classList.add('hidden'); 
    document.getElementById('result-screen').classList.remove('hidden');
    let r = 0; questions.forEach((q, i) => { if(userAnswers[i] === q.answer) r++; });
    const pct = (r/questions.length)*100;
    
    if (activeTest === 'cefr') {
        document.getElementById('final-score-main').innerText = `Skor: ${Math.round(pct)}%`;
        document.getElementById('score-description').innerText = "Tingkat CEFR estimasi (Full Set)";
    } else if (activeTest === 'toefl') {
        const est = Math.round(310 + ((pct/100)*367));
        document.getElementById('final-score-main').innerText = `TOEFL ITP: ${est}`;
        document.getElementById('score-description').innerText = "Estimasi skor TOEFL PBT (310-677) Full Endurance.";
    } else {
        let band = (pct/100)*9.0; band = Math.round(band*2)/2; if(band<1) band=1;
        document.getElementById('final-score-main').innerText = `IELTS Band ${band.toFixed(1)}`;
        document.getElementById('score-description').innerText = "Skala Band IELTS (Overall) Full Endurance.";
    }
}

window.onload = () => { switchTab('toefl'); updateLanguageUI(); };
