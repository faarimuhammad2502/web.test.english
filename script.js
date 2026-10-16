// script.js

// Dataset untuk soal
const testData = {
    general: {
        title: "General English Test",
        desc: "Uji pemahaman dasar grammar, vocabulary, dan reading comprehension. Cocok untuk mengetahui level bahasa Inggris harian Anda.",
        questions: [
            { q: "Choose the correct sentence:", options: ["She don't like apples.", "She doesn't likes apples.", "She doesn't like apples.", "She isn't like apples."], answer: 2 },
            { q: "I have been living in Jakarta ___ 2010.", options: ["since", "for", "in", "from"], answer: 0 },
            { q: "If it rains tomorrow, we ___ at home.", options: ["will stay", "would stay", "stayed", "stays"], answer: 0 },
            { q: "The book is ___ the table.", options: ["in", "on", "at", "under"], answer: 1 },
            { q: "What is the synonym of the word 'crucial'?", options: ["trivial", "important", "optional", "boring"], answer: 1 }
        ]
    },
    toefl: {
        title: "TOEFL ITP/iBT Practice",
        desc: "Simulasi soal berstandar TOEFL mencakup Structure and Written Expression. Uji ketelitian grammar akademik Anda.",
        questions: [
            { q: "Not until the late nineteenth century ___ a significant impact on modern medicine.", options: ["did the discovery of penicillin have", "the discovery of penicillin had", "had the discovery of penicillin", "penicillin the discovery had"], answer: 0 },
            { q: "The committee has met and ___.", options: ["they have reached a decision", "it has formulated themselves some opinions", "its decision was reached at", "it has reached a decision"], answer: 3 },
            { q: "___ the severe weather conditions, all outbound flights were cancelled.", options: ["Because", "Due to", "Despite", "Although"], answer: 1 },
            { q: "I really wish I ___ that specific laptop when it was on sale last month.", options: ["bought", "have bought", "had bought", "buy"], answer: 2 },
            { q: "Hardly ___ asleep when the fire alarm abruptly rang.", options: ["had I fallen", "I had fallen", "did I fall", "I fell"], answer: 0 }
        ]
    },
    ielts: {
        title: "IELTS Academic Practice",
        desc: "Latihan soal berstandar IELTS untuk Academic Training. Fokus pada leksikon dan struktur kalimat formal.",
        questions: [
            { q: "Identify the correct academic phrasing: The bar chart ___ a significant fluctuation in sales over the decade.", options: ["shows off", "illustrates", "looks like", "gives"], answer: 1 },
            { q: "Moreover, the strict implementation of this fiscal policy will ___ lead to better economic outcomes.", options: ["inevitably", "maybe", "kind of", "somewhat"], answer: 0 },
            { q: "The local city council decided to ___ the abandoned warehouse to make way for a new public park.", options: ["demolish", "destroy down", "break", "smash"], answer: 0 },
            { q: "In my opinion, the national government should ___ more funding to public transportation infrastructure.", options: ["allocate", "give out", "put", "spend away"], answer: 0 },
            { q: "The current findings of the research are entirely consistent ___ the data from previous studies.", options: ["to", "with", "for", "by"], answer: 1 }
        ]
    }
};

let currentTab = 'general';
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let secondsElapsed = 0;
let answered = false;

// Fungsi untuk pindah tab (General, TOEFL, IELTS)
function switchTab(tab) {
    currentTab = tab;
    
    // Update styling navigasi
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        btn.classList.add('text-slate-500');
    });
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.classList.remove('text-slate-500');
    activeBtn.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');

    resetTest();
}

// Mengembalikan tes ke kondisi awal
function resetTest() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('timer').innerText = "00:00";
    
    document.getElementById('test-title').innerText = testData[currentTab].title;
    document.getElementById('test-desc').innerText = testData[currentTab].desc;
    
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
}

// Memulai timer dan soal pertama
function startTest() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('total-q').innerText = testData[currentTab].questions.length;
    
    startTimer();
    loadQuestion();
}

// Format dan hitung waktu
function startTimer() {
    const timerEl = document.getElementById('timer');
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const m = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        const s = (secondsElapsed % 60).toString().padStart(2, '0');
        timerEl.innerText = `${m}:${s}`;
    }, 1000);
}

// Memuat data soal ke UI
function loadQuestion() {
    answered = false;
    const qData = testData[currentTab].questions[currentQuestionIndex];
    document.getElementById('current-q').innerText = currentQuestionIndex + 1;
    document.getElementById('question-text').innerText = qData.q;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    qData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        // Menggunakan A, B, C, D untuk opsi
        btn.innerHTML = `<span class="inline-block w-8 font-bold text-blue-600">${String.fromCharCode(65 + index)}.</span> <span class="text-slate-700">${opt}</span>`;
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
}

// Logika saat user memilih jawaban
function selectOption(selectedIndex, btn) {
    if (answered) return;
    answered = true;

    const qData = testData[currentTab].questions[currentQuestionIndex];
    const isCorrect = selectedIndex === qData.answer;

    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach((b, i) => {
        b.disabled = true; // Nonaktifkan klik setelah dijawab
        
        // Tandai jawaban benar
        if (i === qData.answer) {
            b.classList.add('correct');
            b.innerHTML += '<i class="fas fa-check-circle absolute right-4 top-1/2 transform -translate-y-1/2 text-xl"></i>';
        } 
        // Tandai jika jawaban user salah
        else if (i === selectedIndex && !isCorrect) {
            b.classList.add('wrong');
            b.innerHTML += '<i class="fas fa-times-circle absolute right-4 top-1/2 transform -translate-y-1/2 text-xl"></i>';
        }
    });

    if (isCorrect) score++;

    // Tampilkan tombol Next atau Submit
    if (currentQuestionIndex < testData[currentTab].questions.length - 1) {
        document.getElementById('next-btn').classList.remove('hidden');
    } else {
        document.getElementById('submit-btn').classList.remove('hidden');
        clearInterval(timerInterval); // Stop timer di soal terakhir
    }
}

// Soal selanjutnya
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Kalkulasi dan tampilkan hasil
function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    const total = testData[currentTab].questions.length;
    const percentage = Math.round((score / total) * 100);
    
    document.getElementById('score-display').innerText = `${score} / ${total}`;
    
    let remark = "Sangat Baik!";
    if(percentage < 50) remark = "Perlu Banyak Latihan.";
    else if(percentage < 80) remark = "Cukup Bagus!";
    
    document.getElementById('score-percentage').innerText = `${percentage}% Akurasi - ${remark}`;
}

// Initialize on page load
window.onload = () => {
    document.getElementById('test-title').innerText = testData.general.title;
    document.getElementById('test-desc').innerText = testData.general.desc;
};
