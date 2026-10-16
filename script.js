// script.js - EduTest Pro v2.0 Logic & Interaction Core

let activeTest = 'cefr';
let currentLang = 'id'; // 'id' or 'en'
let isDarkMode = false;

let questions = [];
let currentIndex = 0;
let userAnswers = {};
let timerInterval;
let timeLeft = 0;

// Speech Synthesis State
let speechUtterance = null;
let isSpeaking = false;

// i18n Translations Dictionary
const translations = {
    id: {
        heroTitle: "Simulasi Ujian Standar Internasional",
        heroSubtitle: "Evaluasi & tingkatkan skor kemampuan Bahasa Inggris Anda dengan format, waktu, dan kisi-kisi soal yang otentik.",
        questionsCount: "Soal",
        minutesCount: "Menit",
        testNotice: "Perhatian: Disarankan menggunakan earphone/headphone untuk sesi Listening. Timer berjalan terus begitu Anda menekan tombol mulai.",
        startBtn: "Mulai Simulasi",
        question: "Soal",
        gridBtn: "Peta Soal",
        questionPalette: "Navigasi Soal",
        listeningAudio: "Sesi Listening Audio",
        audioInstruct: "Dengarkan klip suara Bahasa Inggris di bawah ini dengan seksama.",
        playAudio: "Putar Audio",
        stopAudio: "Hentikan",
        showTranscript: "Tampilkan Transkrip Teks (Bantuan Latihan)",
        prevBtn: "Sebelumnya",
        nextBtn: "Selanjutnya",
        finishBtn: "Selesaikan Ujian",
        resultTitle: "Hasil Laporan Ujian",
        overallEval: "Evaluasi Tingkat Kemampuan",
        reviewTitle: "Pembahasan & Koreksi Soal",
        retryBtn: "Coba Ujian Lain",
        footerSub: "Dirancang untuk simulasi mandiri persiapan sertifikasi resmi CEFR, TOEFL iBT, dan IELTS Academic.",
        explanationHeader: "Analisis Pembahasan:"
    },
    en: {
        heroTitle: "International Standard Test Simulation",
        heroSubtitle: "Evaluate & elevate your English language proficiency score with authentic formatting, timing, and question blueprints.",
        questionsCount: "Questions",
        minutesCount: "Minutes",
        testNotice: "Notice: Earphones/headphones are recommended for Listening sessions. The timer starts immediately upon clicking start.",
        startBtn: "Start Simulation",
        question: "Question",
        gridBtn: "Question Map",
        questionPalette: "Question Navigation",
        listeningAudio: "Listening Audio Section",
        audioInstruct: "Listen carefully to the English audio clip below.",
        playAudio: "Play Audio",
        stopAudio: "Stop",
        showTranscript: "Show Transcript (Practice Help)",
        prevBtn: "Previous",
        nextBtn: "Next",
        finishBtn: "Finish Exam",
        resultTitle: "Test Performance Report",
        overallEval: "Overall Proficiency Assessment",
        reviewTitle: "Explanations & Corrections",
        retryBtn: "Take Another Test",
        footerSub: "Designed for self-assessment in preparation for official CEFR, TOEFL iBT, and IELTS Academic certifications.",
        explanationHeader: "Analysis & Explanation:"
    }
};

// Apply Language
function updateLanguageUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    document.getElementById('lang-label').innerText = currentLang === 'id' ? 'ID | EN' : 'EN | ID';
    
    // Update description of current active test
    const data = db[activeTest];
    document.getElementById('test-desc').innerHTML = data.desc[currentLang];
}

function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    updateLanguageUI();
    if (!document.getElementById('quiz-screen').classList.contains('hidden')) {
        renderQuestion();
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    const html = document.documentElement;
    const icon = document.getElementById('dark-icon');

    if (isDarkMode) {
        html.classList.add('dark');
        icon.className = 'fas fa-sun text-amber-400';
    } else {
        html.classList.remove('dark');
        icon.className = 'fas fa-moon text-slate-700';
    }
}

// Format Seconds to HH:MM:SS or MM:SS
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Switch Active Test Tab
function switchTab(testId) {
    activeTest = testId;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-blue-600', 'text-blue-600', 'dark:text-blue-400');
        btn.classList.add('border-transparent', 'text-slate-500', 'dark:text-slate-400');
    });
    
    const activeBtn = document.getElementById(`tab-${testId}`);
    activeBtn.classList.remove('border-transparent', 'text-slate-500', 'dark:text-slate-400');
    activeBtn.classList.add('border-blue-600', 'text-blue-600', 'dark:text-blue-400');

    resetApp();
}

// Reset App State
function resetApp() {
    clearInterval(timerInterval);
    stopQuestionSpeech();
    userAnswers = {};
    currentIndex = 0;
    
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

// Start Test
function startTest() {
    questions = db[activeTest].questions;
    timeLeft = db[activeTest].timeLimit;
    
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('total-q').innerText = questions.length;
    
    startTimer();
    renderQuestion();
}

// Timer Logic
function startTimer() {
    const timerEl = document.getElementById('timer');
    timerEl.innerText = formatTime(timeLeft);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = formatTime(timeLeft);
        
        if (timeLeft <= 300) { // last 5 mins
            timerEl.parentElement.classList.add('text-red-600', 'bg-red-50', 'dark:bg-red-950/80', 'animate-pulse');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(currentLang === 'id' ? "Waktu pengerjaan telah habis! Sistem akan mengumpulkan jawaban Anda." : "Time is up! Your test will be submitted automatically.");
            finishTest();
        }
    }, 1000);
}

// Render Active Question
function renderQuestion() {
    stopQuestionSpeech();
    const qData = questions[currentIndex];
    
    document.getElementById('current-q').innerText = currentIndex + 1;
    document.getElementById('q-number-badge').innerText = currentIndex + 1;
    
    // Section Badge
    const sectionData = db[activeTest].sections.find(s => s.id === qData.section);
    document.getElementById('section-badge').innerText = sectionData ? sectionData.name : "SECTION";

    // Handle Passage / Audio UI visibility
    const readingContainer = document.getElementById('reading-container');
    const audioContainer = document.getElementById('audio-container');
    
    readingContainer.classList.add('hidden');
    audioContainer.classList.add('hidden');

    if (sectionData && sectionData.type === 'reading') {
        readingContainer.classList.remove('hidden');
        if (qData.passageText && qData.passageText !== "(Refer to previous passage)") {
            document.getElementById('passage-title').innerText = qData.passageTitle || "Reading Passage";
            document.getElementById('passage-text').innerHTML = qData.passageText;
        }
    } else if (sectionData && sectionData.type === 'listening') {
        audioContainer.classList.remove('hidden');
        document.getElementById('audio-transcript-text').innerText = qData.audioTranscript || "";
    }

    // Question Text & Options
    document.getElementById('question-text').innerText = qData.q;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    qData.options.forEach((opt, index) => {
        const isSelected = userAnswers[currentIndex] === index;
        const btn = document.createElement('button');
        
        btn.className = `w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium flex items-center group ${
            isSelected 
            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-semibold shadow-sm' 
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`;
        
        const letter = String.fromCharCode(65 + index);
        btn.innerHTML = `
            <span class="flex items-center justify-center w-7 h-7 rounded-lg border text-xs font-bold mr-3.5 flex-shrink-0 transition-colors ${
                isSelected 
                ? 'border-blue-600 bg-blue-600 text-white' 
                : 'border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 group-hover:border-blue-500 group-hover:text-blue-500'
            }">
                ${letter}
            </span>
            <span class="flex-grow">${opt}</span>
        `;
        
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });

    // Navigation buttons
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

function selectOption(index) {
    userAnswers[currentIndex] = index;
    renderQuestion();
}

function nextQuestion() {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
}

// Question Palette Drawer
function toggleGridPalette() {
    const palette = document.getElementById('grid-palette');
    palette.classList.toggle('hidden');
    if (!palette.classList.contains('hidden')) {
        renderGridPalette();
    }
}

function renderGridPalette() {
    const container = document.getElementById('grid-buttons-container');
    container.innerHTML = '';
    
    questions.forEach((q, idx) => {
        const isAnswered = userAnswers[idx] !== undefined;
        const isCurrent = idx === currentIndex;
        
        const btn = document.createElement('button');
        btn.className = `h-9 w-full rounded-lg font-bold text-xs flex items-center justify-center transition border ${
            isCurrent 
            ? 'ring-2 ring-blue-600 border-blue-600 bg-blue-600 text-white' 
            : isAnswered 
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
        }`;
        
        btn.innerText = idx + 1;
        btn.onclick = () => {
            currentIndex = idx;
            renderQuestion();
        };
        container.appendChild(btn);
    });
}

// Native Speech Synthesis for Listening Sensation
function playQuestionSpeech() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        
        const qData = questions[currentIndex];
        const textToSpeak = qData.audioTranscript || qData.q;
        
        speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
        speechUtterance.lang = 'en-US';
        speechUtterance.rate = 0.9; // Slightly clearer reading pace
        
        const playBtnLabel = document.getElementById('play-audio-label');
        const playIcon = document.getElementById('play-audio-icon');

        speechUtterance.onstart = () => {
            isSpeaking = true;
            if (playBtnLabel) playBtnLabel.innerText = currentLang === 'id' ? 'Memutar...' : 'Playing...';
            if (playIcon) playIcon.className = 'fas fa-spinner fa-spin';
        };

        speechUtterance.onend = () => {
            isSpeaking = false;
            if (playBtnLabel) playBtnLabel.innerText = translations[currentLang].playAudio;
            if (playIcon) playIcon.className = 'fas fa-play';
        };

        speechUtterance.onerror = () => {
            isSpeaking = false;
            if (playBtnLabel) playBtnLabel.innerText = translations[currentLang].playAudio;
            if (playIcon) playIcon.className = 'fas fa-play';
        };

        window.speechSynthesis.speak(speechUtterance);
    } else {
        alert("Browser Anda tidak mendukung Speech Synthesis.");
    }
}

function stopQuestionSpeech() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        const playBtnLabel = document.getElementById('play-audio-label');
        const playIcon = document.getElementById('play-audio-icon');
        if (playBtnLabel) playBtnLabel.innerText = translations[currentLang].playAudio;
        if (playIcon) playIcon.className = 'fas fa-play';
    }
}

// Calculate & Display Results
function finishTest() {
    clearInterval(timerInterval);
    stopQuestionSpeech();
    
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    const now = new Date();
    document.getElementById('result-date').innerText = (currentLang === 'id' ? "Terselesaikan pada: " : "Completed on: ") + now.toLocaleDateString(currentLang === 'id' ? 'id-ID' : 'en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    let rawScore = 0;
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) rawScore++;
    });

    renderScoreCards(rawScore);
    renderReview();
}

function renderScoreCards(rawScore) {
    const container = document.getElementById('score-cards');
    const mainScoreEl = document.getElementById('final-score-main');
    const descEl = document.getElementById('score-description');
    container.innerHTML = '';
    
    const totalQ = questions.length;
    let percentage = (rawScore / totalQ) * 100;

    // Card 1: Accuracy / Raw Score
    container.innerHTML += createScoreCard("Raw Score", `${rawScore}/${totalQ}`, `${Math.round(percentage)}% Accuracy`, "fa-bullseye", "blue");

    // Grading Logic according to test type
    if (activeTest === 'cefr') {
        let level = "A1 Beginner";
        let desc = currentLang === 'id' ? "Anda berada pada tingkat awal kemampuan dasar." : "You are at the foundational beginner stage.";
        
        if (percentage >= 90) { 
            level = "C2 Proficient"; 
            desc = currentLang === 'id' ? "Bahasa Inggris Anda setara dengan penutur asli akademis." : "Your English command is equivalent to an educated native speaker."; 
        } else if (percentage >= 75) { 
            level = "C1 Advanced"; 
            desc = currentLang === 'id' ? "Anda mampu memahami teks kompleks dan berkomunikasi dengan sangat lancar." : "You understand complex texts and express ideas fluently and spontaneously."; 
        } else if (percentage >= 55) { 
            level = "B2 Upper-Intermediate"; 
            desc = currentLang === 'id' ? "Anda dapat berkomunikasi secara efektif dalam konteks profesional & akademis." : "You communicate effectively in professional and academic contexts."; 
        } else if (percentage >= 35) { 
            level = "B1 Intermediate"; 
            desc = currentLang === 'id' ? "Anda memahami poin-poin utama topik umum harian." : "You understand the main points of clear standard input on familiar matters."; 
        } else if (percentage >= 20) { 
            level = "A2 Elementary"; 
            desc = currentLang === 'id' ? "Anda mampu memahami ungkapan-ungkapan dasar harian." : "You understand basic sentences and frequently used expressions."; 
        }
        
        mainScoreEl.innerText = level;
        descEl.innerText = desc;
        container.innerHTML += createScoreCard("CEFR Level", level.split(" ")[0], level.split(" ")[1], "fa-layer-group", "indigo");
        
    } else if (activeTest === 'toefl') {
        let toeflScore = Math.round((percentage / 100) * 120);
        let desc = currentLang === 'id' ? "Skor estimasi memenuhi syarat pendaftaran universitas." : "Estimated score meets university application standards.";
        
        mainScoreEl.innerText = `TOEFL iBT: ${toeflScore}`;
        descEl.innerText = desc;
        container.innerHTML += createScoreCard("Est. iBT Score", toeflScore, "Scale 0 - 120", "fa-university", "indigo");

    } else if (activeTest === 'ielts') {
        let band = (percentage / 100) * 9.0;
        band = Math.round(band * 2) / 2;
        if (band > 9.0) band = 9.0;
        if (band < 1.0) band = 1.0;
        
        let desc = currentLang === 'id' ? "Kategori Pengguna Kompeten (Competent User)." : "Competent User category.";
        
        mainScoreEl.innerText = `IELTS Band ${band.toFixed(1)}`;
        descEl.innerText = desc;
        container.innerHTML += createScoreCard("IELTS Band", band.toFixed(1), "Scale 1.0 - 9.0", "fa-globe", "indigo");
    }

    // Card 3: Time Spent
    const timeSpent = db[activeTest].timeLimit - timeLeft;
    container.innerHTML += createScoreCard(
        currentLang === 'id' ? "Waktu Digunakan" : "Time Spent", 
        formatTime(timeSpent), 
        (currentLang === 'id' ? "Dari " : "Out of ") + Math.round(db[activeTest].timeLimit/60) + " Mins", 
        "fa-clock", 
        "emerald"
    );
}

function createScoreCard(title, value, subtitle, icon, color) {
    return `
    <div class="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-${color}-100 dark:bg-${color}-950 text-${color}-600 dark:text-${color}-400 flex items-center justify-center text-xl flex-shrink-0">
            <i class="fas ${icon}"></i>
        </div>
        <div>
            <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">${title}</p>
            <p class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">${value}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${subtitle}</p>
        </div>
    </div>`;
}

// Render Review Items
function renderReview() {
    const container = document.getElementById('review-container');
    container.innerHTML = '';
    
    questions.forEach((q, i) => {
        const uAns = userAnswers[i];
        const isCorrect = uAns === q.answer;
        const isUnanswered = uAns === undefined;
        
        let statusBadge = isCorrect 
            ? `<span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-300 dark:border-emerald-800"><i class="fas fa-check mr-1"></i> Correct</span>`
            : isUnanswered
                ? `<span class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-xs font-bold border border-slate-300 dark:border-slate-700"><i class="fas fa-minus mr-1"></i> Unanswered</span>`
                : `<span class="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-3 py-1 rounded-full text-xs font-bold border border-rose-300 dark:border-rose-800"><i class="fas fa-times mr-1"></i> Incorrect</span>`;

        let optionsHTML = '';
        q.options.forEach((opt, optIdx) => {
            let optClass = "text-slate-600 dark:text-slate-400";
            let optIcon = "";
            
            if (optIdx === q.answer) {
                optClass = "text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800";
                optIcon = "<i class='fas fa-check text-emerald-600 dark:text-emerald-400 ml-2'></i>";
            } else if (optIdx === uAns && !isCorrect) {
                optClass = "text-rose-600 dark:text-rose-400 line-through p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-lg";
                optIcon = "<i class='fas fa-times text-rose-500 ml-2'></i>";
            } else {
                optClass = "p-2.5";
            }
            optionsHTML += `<div class="mb-1.5 text-sm ${optClass}">${String.fromCharCode(65 + optIdx)}. ${opt} ${optIcon}</div>`;
        });

        const explanationText = typeof q.explanation === 'object' ? q.explanation[currentLang] : q.explanation;

        const reviewCard = `
        <div class="bg-slate-50 dark:bg-slate-800/60 p-5 sm:p-6 rounded-2xl border ${isCorrect ? 'border-emerald-200 dark:border-emerald-900' : 'border-rose-200 dark:border-rose-900'} shadow-sm">
            <div class="flex justify-between items-start mb-4 gap-2">
                <div class="flex gap-3">
                    <span class="font-bold text-slate-400 text-sm">#${i+1}</span>
                    <h4 class="font-semibold text-slate-900 dark:text-white text-base leading-snug">${q.q}</h4>
                </div>
                ${statusBadge}
            </div>
            
            <div class="sm:pl-8 mb-4 space-y-1">
                ${optionsHTML}
            </div>
            
            <div class="sm:pl-8">
                <div class="bg-blue-50/70 dark:bg-blue-950/50 p-4 rounded-xl border border-blue-100 dark:border-blue-900">
                    <h5 class="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-1">
                        <i class="fas fa-lightbulb text-amber-500 mr-1.5"></i> ${translations[currentLang].explanationHeader}
                    </h5>
                    <p class="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">${explanationText}</p>
                </div>
            </div>
        </div>
        `;
        container.innerHTML += reviewCard;
    });
}

// Initializer
window.onload = () => {
    switchTab('cefr');
    updateLanguageUI();
};
