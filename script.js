// script.js - EduTest Pro v3 Core Logic
let activeTest = 'cefr'; // Default to CEFR now that it's back
let currentLang = 'id'; 
let isDarkMode = false;
let questions = [];
let currentIndex = 0;
let userAnswers = {};
let timerInterval;
let timeLeft = 0;
let speechUtterance = null;
let isSpeaking = false;

const translations = {
    id: {
        heroTitle: "Simulasi Ujian Standar Internasional",
        heroSubtitle: "Evaluasi skor Bahasa Inggris Anda dengan format, waktu, dan kisi-kisi soal yang otentik.",
        questionsCount: "Soal", minutesCount: "Menit",
        testNotice: "Disarankan menggunakan earphone untuk sesi Listening. Timer berjalan terus.",
        startBtn: "Mulai Simulasi", question: "Soal", gridBtn: "Peta Soal", questionPalette: "Navigasi Soal",
        listeningAudio: "Sesi Listening Audio", audioInstruct: "Dengarkan klip suara berikut:",
        playAudio: "Putar Audio", stopAudio: "Hentikan", showTranscript: "Tampilkan Transkrip",
        prevBtn: "Sebelumnya", nextBtn: "Selanjutnya", finishBtn: "Selesaikan Ujian",
        resultTitle: "Hasil Laporan Ujian", overallEval: "Evaluasi Tingkat Kemampuan",
        reviewTitle: "Pembahasan & Koreksi Soal", retryBtn: "Coba Ujian Lain",
        footerSub: "Dirancang untuk simulasi mandiri sertifikasi resmi CEFR, TOEFL ITP dan IELTS.",
        explanationHeader: "Analisis Pembahasan:"
    },
    en: {
        heroTitle: "International Standard Test Simulation",
        heroSubtitle: "Evaluate your English proficiency score with authentic formatting and timing.",
        questionsCount: "Questions", minutesCount: "Minutes",
        testNotice: "Earphones recommended for Listening. Timer starts immediately.",
        startBtn: "Start Simulation", question: "Question", gridBtn: "Question Map", questionPalette: "Question Navigation",
        listeningAudio: "Listening Audio Section", audioInstruct: "Listen carefully to the audio clip:",
        playAudio: "Play Audio", stopAudio: "Stop", showTranscript: "Show Transcript",
        prevBtn: "Previous", nextBtn: "Next", finishBtn: "Finish Exam",
        resultTitle: "Test Performance Report", overallEval: "Overall Assessment",
        reviewTitle: "Explanations & Corrections", retryBtn: "Take Another Test",
        footerSub: "Designed for self-assessment for official CEFR, TOEFL ITP and IELTS certifications.",
        explanationHeader: "Analysis & Explanation:"
    }
};

function updateLanguageUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) el.innerHTML = translations[currentLang][key];
    });
    document.getElementById('lang-label').innerText = currentLang === 'id' ? 'ID | EN' : 'EN | ID';
    document.getElementById('test-desc').innerHTML = db[activeTest].desc[currentLang];
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
    activeTest = testId;
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('border-blue-600', 'text-blue-600', 'dark:text-blue-400');
        b.classList.add('border-transparent', 'text-slate-500', 'dark:text-slate-400');
    });
    const aBtn = document.getElementById(`tab-${testId}`);
    aBtn.classList.remove('border-transparent', 'text-slate-500');
    aBtn.classList.add('border-blue-600', 'text-blue-600', 'dark:text-blue-400');
    resetApp();
}

function resetApp() {
    clearInterval(timerInterval); stopQuestionSpeech();
    userAnswers = {}; currentIndex = 0;
    const data = db[activeTest];
    document.getElementById('test-icon').className = `fas ${data.icon} text-3xl`;
    document.getElementById('test-title').innerText = data.title;
    document.getElementById('test-desc').innerHTML = data.desc[currentLang];
    document.getElementById('test-total-q').innerText = data.questions.length;
    document.getElementById('test-time-limit').innerText = Math.round(data.timeLimit / 60);
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('grid-palette').classList.add('hidden');
}

function startTest() {
    questions = db[activeTest].questions; timeLeft = db[activeTest].timeLimit;
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('total-q').innerText = questions.length;
    startTimer(); renderQuestion();
}

function startTimer() {
    const tEl = document.getElementById('timer'); tEl.innerText = formatTime(timeLeft);
    timerInterval = setInterval(() => {
        timeLeft--; tEl.innerText = formatTime(timeLeft);
        if (timeLeft <= 300) tEl.parentElement.classList.add('text-red-600', 'bg-red-50', 'dark:bg-red-950/80', 'animate-pulse');
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

    if (sData && sData.type === 'reading') {
        rCont.classList.remove('hidden');
        if (qData.passageText) {
            document.getElementById('passage-title').innerText = qData.passageTitle || "Reading Passage";
            document.getElementById('passage-text').innerHTML = qData.passageText;
        }
    } else if (sData && sData.type === 'listening') {
        aCont.classList.remove('hidden');
        document.getElementById('audio-transcript-text').innerHTML = qData.audioTranscript.replace(/\n/g, '<br>');
    }

    document.getElementById('question-text').innerText = qData.q;
    const oCont = document.getElementById('options-container'); oCont.innerHTML = '';
    
    qData.options.forEach((opt, idx) => {
        const isSel = userAnswers[currentIndex] === idx;
        const btn = document.createElement('button');
        btn.className = `w-full text-left p-4 rounded-xl border-2 transition text-sm font-medium flex items-center group ${isSel ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 shadow-sm' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-400'}`;
        btn.innerHTML = `<span class="flex items-center justify-center w-7 h-7 rounded-lg border text-xs font-bold mr-3.5 transition ${isSel ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 dark:border-slate-700 text-slate-500 group-hover:border-blue-500 group-hover:text-blue-500'}">${String.fromCharCode(65+idx)}</span><span class="flex-grow">${opt}</span>`;
        btn.onclick = () => { userAnswers[currentIndex] = idx; renderQuestion(); };
        oCont.appendChild(btn);
    });

    document.getElementById('prev-btn').classList.toggle('hidden', currentIndex === 0);
    if (currentIndex === questions.length - 1) { document.getElementById('next-btn').classList.add('hidden'); document.getElementById('submit-btn').classList.remove('hidden'); }
    else { document.getElementById('next-btn').classList.remove('hidden'); document.getElementById('submit-btn').classList.add('hidden'); }
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
        btn.className = `h-9 w-full rounded-lg font-bold text-xs flex items-center justify-center border ${idx===currentIndex ? 'border-blue-600 bg-blue-600 text-white' : userAnswers[idx]!==undefined ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 border-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700'}`;
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
        speechUtterance.lang = 'en-US'; speechUtterance.rate = 0.9;
        speechUtterance.onstart = () => { document.getElementById('play-audio-icon').className = 'fas fa-spinner fa-spin'; };
        speechUtterance.onend = () => { document.getElementById('play-audio-icon').className = 'fas fa-play'; };
        window.speechSynthesis.speak(speechUtterance);
    }
}
function stopQuestionSpeech() { if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); document.getElementById('play-audio-icon').className = 'fas fa-play'; } }

function finishTest() {
    clearInterval(timerInterval); stopQuestionSpeech();
    document.getElementById('quiz-screen').classList.add('hidden'); document.getElementById('result-screen').classList.remove('hidden');
    let r = 0; questions.forEach((q, i) => { if(userAnswers[i] === q.answer) r++; });
    
    document.getElementById('score-cards').innerHTML = `
        <div class="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center text-xl"><i class="fas fa-bullseye"></i></div><div><p class="text-xs font-bold text-slate-500 uppercase">${currentLang==='id'?'Skor Benar':'Raw Score'}</p><p class="text-xl font-extrabold text-slate-900 dark:text-white">${r}/${questions.length}</p></div></div>
        <div class="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-xl"><i class="fas fa-clock"></i></div><div><p class="text-xs font-bold text-slate-500 uppercase">${currentLang==='id'?'Waktu':'Time'}</p><p class="text-xl font-extrabold text-slate-900 dark:text-white">${formatTime(db[activeTest].timeLimit - timeLeft)}</p></div></div>
    `;

    const pct = (r/questions.length)*100;
    
    if (activeTest === 'cefr') {
        let level = "A1 Beginner";
        let desc = currentLang === 'id' ? "Anda berada pada tingkat awal kemampuan dasar." : "You are at the foundational beginner stage.";
        if (pct >= 90) { level = "C2 Proficient"; desc = currentLang === 'id' ? "Bahasa Inggris Anda setara dengan penutur asli akademis." : "Your English command is equivalent to an educated native speaker."; }
        else if (pct >= 75) { level = "C1 Advanced"; desc = currentLang === 'id' ? "Anda mampu memahami teks kompleks dan berkomunikasi dengan sangat lancar." : "You understand complex texts and express ideas fluently and spontaneously."; }
        else if (pct >= 55) { level = "B2 Upper-Intermediate"; desc = currentLang === 'id' ? "Anda dapat berkomunikasi secara efektif dalam konteks profesional & akademis." : "You communicate effectively in professional and academic contexts."; }
        else if (pct >= 35) { level = "B1 Intermediate"; desc = currentLang === 'id' ? "Anda memahami poin-poin utama topik umum harian." : "You understand the main points of clear standard input on familiar matters."; }
        else if (pct >= 20) { level = "A2 Elementary"; desc = currentLang === 'id' ? "Anda mampu memahami ungkapan-ungkapan dasar harian." : "You understand basic sentences and frequently used expressions."; }
        document.getElementById('final-score-main').innerText = level;
        document.getElementById('score-description').innerText = desc;
    } else if (activeTest === 'toefl') {
        const est = Math.round(310 + ((pct/100)*367)); // rough PBT calculation 310-677
        document.getElementById('final-score-main').innerText = `TOEFL ITP: ${est}`;
        document.getElementById('score-description').innerText = currentLang === 'id' ? "Estimasi konversi skor TOEFL PBT/ITP (Skala 310-677)." : "Estimated TOEFL PBT/ITP conversion (310-677 Scale).";
    } else {
        let band = (pct/100)*9.0; band = Math.round(band*2)/2; if(band<1) band=1;
        document.getElementById('final-score-main').innerText = `IELTS Band ${band.toFixed(1)}`;
        document.getElementById('score-description').innerText = currentLang === 'id' ? "Skala Band Keseluruhan (Overall Band Score)." : "Overall Band Score Scale.";
    }

    const rc = document.getElementById('review-container'); rc.innerHTML = '';
    questions.forEach((q, i) => {
        let opts = ''; q.options.forEach((opt, oIdx) => {
            const isCor = oIdx === q.answer; const isUsr = oIdx === userAnswers[i];
            opts += `<div class="mb-1 text-sm ${isCor ? 'text-emerald-700 font-bold bg-emerald-50 dark:bg-emerald-950/60 p-2 rounded' : (isUsr ? 'text-rose-600 line-through p-2' : 'p-2 text-slate-600 dark:text-slate-400')}">${String.fromCharCode(65+oIdx)}. ${opt}</div>`;
        });
        rc.innerHTML += `<div class="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border ${userAnswers[i]===q.answer ? 'border-emerald-200 dark:border-emerald-900' : 'border-rose-200 dark:border-rose-900'}"><h4 class="font-semibold text-slate-900 dark:text-white mb-3">#${i+1}. ${q.q}</h4><div class="pl-4 mb-3">${opts}</div><div class="bg-blue-50/70 dark:bg-blue-950/50 p-3 rounded-lg border border-blue-100 dark:border-blue-900 text-xs text-slate-700 dark:text-slate-300"><b>${translations[currentLang].explanationHeader}</b> ${q.explanation[currentLang]}</div></div>`;
    });
}

window.onload = () => { switchTab('cefr'); updateLanguageUI(); };
