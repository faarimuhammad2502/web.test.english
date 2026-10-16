// script.js

let activeTest = 'cefr';
let questions = [];
let currentIndex = 0;
let userAnswers = {};
let timerInterval;
let timeLeft = 0;
let audioPlayed = false;

// Format waktu H:M:S
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Switch tabs and initialize test details
function switchTab(testId) {
    activeTest = testId;
    
    // UI Update Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        btn.classList.add('text-slate-500');
    });
    const activeBtn = document.getElementById(`tab-${testId}`);
    activeBtn.classList.remove('text-slate-500');
    activeBtn.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');

    resetApp();
}

// Kembalikan ke layar utama
function resetApp() {
    clearInterval(timerInterval);
    userAnswers = {};
    currentIndex = 0;
    
    const data = db[activeTest];
    
    // Update Welcome Screen Info
    document.getElementById('test-icon').className = `fas ${data.icon} text-3xl text-blue-600`;
    document.getElementById('test-title').innerHTML = data.title;
    document.getElementById('test-desc').innerHTML = data.desc;
    document.getElementById('test-total-q').innerText = data.questions.length;
    document.getElementById('test-time-limit').innerText = Math.round(data.timeLimit / 60);

    // Hide/Show screens
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
}

// Mulai Test
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
    timerEl.classList.remove('text-red-600');
    timerEl.classList.add('text-blue-700');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = formatTime(timeLeft);
        
        if (timeLeft <= 300) { // 5 menit terakhir
            timerEl.classList.remove('text-blue-700');
            timerEl.classList.add('text-red-600', 'animate-pulse');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Waktu habis! Ujian akan diselesaikan secara otomatis.");
            finishTest();
        }
    }, 1000);
}

// Render Soal ke UI
function renderQuestion() {
    const qData = questions[currentIndex];
    
    // Update Header
    document.getElementById('current-q').innerText = currentIndex + 1;
    document.getElementById('q-number-badge').innerText = currentIndex + 1;
    
    // Section Name
    const sectionData = db[activeTest].sections.find(s => s.id === qData.section);
    document.getElementById('section-name').innerText = sectionData ? sectionData.name : "General";

    // Handle Passage / Audio UI
    const readingContainer = document.getElementById('reading-container');
    const audioContainer = document.getElementById('audio-container');
    
    readingContainer.classList.add('hidden');
    audioContainer.classList.add('hidden');

    if (sectionData.type === 'reading') {
        readingContainer.classList.remove('hidden');
        if (qData.passageText && qData.passageText !== "(Refer to previous passage)") {
            document.getElementById('passage-title').innerText = qData.passageTitle;
            document.getElementById('passage-text').innerHTML = qData.passageText;
        }
    } else if (sectionData.type === 'listening') {
        audioContainer.classList.remove('hidden');
        simulateAudioPlay(qData);
    }

    // Render Question & Options
    document.getElementById('question-text').innerText = qData.q;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    qData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        const isSelected = userAnswers[currentIndex] === index;
        
        btn.className = `w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-lg font-medium flex items-center group
            ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50'}`;
        
        const letter = String.fromCharCode(65 + index);
        btn.innerHTML = `
            <span class="flex items-center justify-center w-8 h-8 rounded border-2 mr-4 flex-shrink-0 transition-colors
                ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 group-hover:border-blue-400'}">
                ${letter}
            </span>
            <span class="flex-grow">${opt}</span>
        `;
        
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });

    // Nav Buttons
    document.getElementById('prev-btn').classList.toggle('hidden', currentIndex === 0);
    
    if (currentIndex === questions.length - 1) {
        document.getElementById('next-btn').classList.add('hidden');
        document.getElementById('submit-btn').classList.remove('hidden');
    } else {
        document.getElementById('next-btn').classList.remove('hidden');
        document.getElementById('submit-btn').classList.add('hidden');
    }
}

// Simulasi Audio Player
function simulateAudioPlay(qData) {
    const transcriptMock = document.getElementById('audio-transcript-mock');
    
    if(qData.audioTranscript && qData.audioTranscript !== "Refer to previous") {
        transcriptMock.innerText = qData.audioTranscript;
        
        // Animasi progress bar simple
        const progress = document.getElementById('audio-progress');
        progress.style.width = '0%';
        progress.style.transition = `width ${qData.audioDuration}s linear`;
        
        setTimeout(() => { progress.style.width = '100%'; }, 100);
    }
}

function selectOption(index) {
    userAnswers[currentIndex] = index;
    renderQuestion(); // Re-render untuk update styling UI
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

// ==============================
// Kalkulasi dan Penilaian
// ==============================

function finishTest() {
    clearInterval(timerInterval);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('result-date').innerText = "Terselesaikan pada: " + new Date().toLocaleDateString('id-ID', dateOpts);

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

    // Card 1: Raw Score
    container.innerHTML += createScoreCard("Raw Score", `${rawScore}/${totalQ}`, `${Math.round(percentage)}% Akurasi`, "fa-bullseye", "blue");

    // Grading Logic based on Test Type
    if (activeTest === 'cefr') {
        let level = "A1 Beginner";
        let desc = "Anda berada di tahap awal pembelajaran.";
        if(percentage >= 90) { level = "C2 Proficient"; desc = "Bahasa Inggris Anda setara dengan penutur asli yang berpendidikan tinggi."; }
        else if(percentage >= 75) { level = "C1 Advanced"; desc = "Anda dapat memahami teks kompleks dan mengekspresikan diri dengan lancar secara spontan."; }
        else if(percentage >= 55) { level = "B2 Upper-Intermediate"; desc = "Anda dapat berinteraksi dengan penutur asli secara lancar dan spontan."; }
        else if(percentage >= 35) { level = "B1 Intermediate"; desc = "Anda dapat memahami poin utama dari input standar yang jelas tentang hal-hal yang biasa ditemui."; }
        else if(percentage >= 20) { level = "A2 Elementary"; desc = "Anda dapat memahami kalimat dan ungkapan yang sering digunakan."; }
        
        mainScoreEl.innerText = level;
        descEl.innerText = desc;
        container.innerHTML += createScoreCard("CEFR Level", level.split(" ")[0], level.split(" ")[1], "fa-layer-group", "indigo");
        
    } else if (activeTest === 'toefl') {
        // Konversi kasar persentase ke skala TOEFL 0-120
        let toeflScore = Math.round((percentage / 100) * 120);
        let level = "Intermediate";
        let desc = "Skor Anda cukup untuk program pendidikan dasar.";
        if(toeflScore >= 100) { level = "Advanced"; desc = "Skor sangat baik. Memenuhi syarat hampir semua universitas top dunia."; }
        else if(toeflScore >= 80) { level = "Upper-Intermediate"; desc = "Memenuhi syarat masuk rata-rata universitas luar negeri."; }
        else if(toeflScore < 60) { level = "Basic"; desc = "Perlu peningkatan intensif pada pemahaman grammar dan vocabulary."; }
        
        mainScoreEl.innerText = `Skor Estimasi: ${toeflScore}`;
        descEl.innerText = desc;
        container.innerHTML += createScoreCard("Est. iBT Score", toeflScore, "Skala 0-120", "fa-university", "indigo");

    } else if (activeTest === 'ielts') {
        // Konversi kasar ke Band 0-9.0
        let band = (percentage / 100) * 9.0;
        band = Math.round(band * 2) / 2; // Bulatkan ke 0.5 terdekat
        if(band > 9.0) band = 9.0;
        if(band < 1.0) band = 1.0;
        
        let desc = "Level pemula.";
        if(band >= 7.5) desc = "Pengguna Sangat Baik (Very Good User). Siap untuk studi pascasarjana di negara berbahasa Inggris.";
        else if(band >= 6.0) desc = "Pengguna Kompeten (Competent User). Cukup untuk syarat masuk jenjang S1/S2 standar.";
        else if(band >= 5.0) desc = "Pengguna Sedang (Modest User). Bisa menangani komunikasi dasar di bidang sendiri.";
        
        mainScoreEl.innerText = `Band ${band.toFixed(1)}`;
        descEl.innerText = desc;
        container.innerHTML += createScoreCard("IELTS Band", band.toFixed(1), "Skala 0 - 9.0", "fa-globe", "indigo");
    }

    // Card 3: Time Spent
    const timeSpent = db[activeTest].timeLimit - timeLeft;
    container.innerHTML += createScoreCard("Waktu Digunakan", formatTime(timeSpent), "Dari " + Math.round(db[activeTest].timeLimit/60) + " Menit", "fa-clock", "slate");
}

function createScoreCard(title, value, subtitle, icon, color) {
    return `
    <div class="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-14 h-14 rounded-full bg-${color}-100 text-${color}-600 flex items-center justify-center text-2xl flex-shrink-0">
            <i class="fas ${icon}"></i>
        </div>
        <div>
            <p class="text-sm font-semibold text-slate-500 uppercase tracking-wider">${title}</p>
            <p class="text-2xl font-bold text-slate-800">${value}</p>
            <p class="text-xs text-slate-500 mt-1">${subtitle}</p>
        </div>
    </div>`;
}

// Generate Review & Pembahasan
function renderReview() {
    const container = document.getElementById('review-container');
    container.innerHTML = '';
    
    questions.forEach((q, i) => {
        const uAns = userAnswers[i];
        const isCorrect = uAns === q.answer;
        const isUnanswered = uAns === undefined;
        
        let statusBadge = isCorrect 
            ? `<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold"><i class="fas fa-check mr-1"></i> Benar</span>`
            : isUnanswered
                ? `<span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold"><i class="fas fa-minus mr-1"></i> Kosong</span>`
                : `<span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold"><i class="fas fa-times mr-1"></i> Salah</span>`;

        let optionsHTML = '';
        q.options.forEach((opt, optIdx) => {
            let optClass = "text-slate-600";
            let optIcon = "";
            if (optIdx === q.answer) {
                optClass = "text-green-700 font-bold bg-green-50 p-2 rounded";
                optIcon = "<i class='fas fa-check text-green-600 ml-2'></i>";
            } else if (optIdx === uAns && !isCorrect) {
                optClass = "text-red-600 line-through p-2";
                optIcon = "<i class='fas fa-times text-red-500 ml-2'></i>";
            } else {
                optClass = "p-2";
            }
            optionsHTML += `<div class="mb-1 ${optClass}">${String.fromCharCode(65 + optIdx)}. ${opt} ${optIcon}</div>`;
        });

        const reviewCard = `
        <div class="bg-white p-6 rounded-xl border ${isCorrect ? 'border-green-200' : 'border-red-200'} shadow-sm">
            <div class="flex justify-between items-start mb-4">
                <div class="flex gap-3">
                    <span class="font-bold text-slate-400">#${i+1}</span>
                    <h4 class="font-semibold text-slate-800 text-lg">${q.q}</h4>
                </div>
                ${statusBadge}
            </div>
            
            <div class="ml-8 mb-4 border-l-2 border-slate-100 pl-4 space-y-1">
                ${optionsHTML}
            </div>
            
            <div class="ml-8 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                <h5 class="text-sm font-bold text-blue-800 mb-1"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>Pembahasan:</h5>
                <p class="text-slate-700 text-sm leading-relaxed">${q.explanation}</p>
            </div>
        </div>
        `;
        container.innerHTML += reviewCard;
    });
}

// Inisialisasi awal
window.onload = () => {
    switchTab('cefr');
};
