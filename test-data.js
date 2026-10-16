// test-data.js - EduTest Pro v3 Realistic Data Warehouse (with CEFR)

const db = {
    cefr: {
        id: "cefr",
        title: "CEFR Placement Test",
        icon: "fa-layer-group",
        timeLimit: 30 * 60, // 30 mins
        desc: {
            id: "Tes ini dirancang khusus untuk mengukur tingkat kemahiran Bahasa Inggris umum Anda berdasarkan kerangka standar internasional <b>CEFR (Common European Framework of Reference for Languages)</b>. Hasil evaluasi mencakup skala level dari <b>A1 (Beginner)</b>, <b>A2 (Elementary)</b>, <b>B1 (Intermediate)</b>, <b>B2 (Upper-Intermediate)</b>, <b>C1 (Advanced)</b>, hingga <b>C2 (Proficient/Mastery)</b>.<br><br><b>Cakupan Materi:</b><br>• Tatabahasa & Kosakata Akademik (Grammar & Vocabulary)<br>• Pemahaman Bacaan Teks (Reading Comprehension)<br>• Kunci Jawaban Lengkap dengan Analisis Pembahasan Tatabahasa.",
            en: "This test is specifically designed to assess your general English proficiency based on the international standard framework <b>CEFR (Common European Framework of Reference for Languages)</b>. The evaluation covers levels from <b>A1 (Beginner)</b> up to <b>C2 (Proficient)</b>.<br><br><b>Test Coverage:</b><br>• Academic Grammar & Vocabulary<br>• Reading Comprehension<br>• Detailed Answer Keys with Grammatical Analysis."
        },
        sections: [
            { id: "grammar", name: "Grammar & Vocabulary", type: "standard" },
            { id: "reading", name: "Reading Comprehension", type: "reading" }
        ],
        questions: [
            {
                id: 1,
                section: "grammar",
                q: "I ___ to the cinema with my close friends yesterday evening.",
                options: ["go", "gone", "went", "going"],
                answer: 2,
                explanation: {
                    id: "Kalimat menggunakan keterangan waktu lampau 'yesterday evening', sehingga harus memakai Simple Past Tense (Kata kerja bentuk kedua: V2 dari 'go' adalah 'went').",
                    en: "The sentence uses the past time signal 'yesterday evening', which requires the Simple Past Tense (V2 of 'go' is 'went')."
                }
            },
            {
                id: 2,
                section: "grammar",
                q: "She has been working as an educator at this institution ___ five years.",
                options: ["since", "for", "in", "from"],
                answer: 1,
                explanation: {
                    id: "'For' digunakan untuk menunjukkan durasi/jangka waktu (lima tahun). Sementara 'since' digunakan untuk menunjukkan titik awal dimulainya suatu kegiatan.",
                    en: "'For' is used to denote a duration of time (five years). 'Since' is used to specify a starting point in time."
                }
            },
            {
                id: 3,
                section: "grammar",
                q: "If I ___ a million dollars, I would construct a free public library.",
                options: ["have", "will have", "had", "would have"],
                answer: 2,
                explanation: {
                    id: "Kalimat ini adalah Conditional Sentence Type 2 (Pengandaian masa kini yang tidak nyata). Rumus: If + Simple Past (had), Subject + would + V1.",
                    en: "This is a Conditional Sentence Type 2 (unreal present). Formula: If + Simple Past (had), Subject + would + V1."
                }
            },
            {
                id: 4,
                section: "grammar",
                q: "The executive meeting was called ___ because the chief director fell ill.",
                options: ["off", "out", "up", "down"],
                answer: 0,
                explanation: {
                    id: "Phrasal verb 'call off' bermakna membatalkan (cancel).",
                    en: "The phrasal verb 'call off' means to cancel."
                }
            },
            {
                id: 5,
                section: "grammar",
                q: "By the time we arrive at the platform, the express train ___.",
                options: ["will leave", "left", "will have left", "has left"],
                answer: 2,
                explanation: {
                    id: "Future Perfect Tense (will have + V3) digunakan untuk menyatakan peristiwa yang diprediksi sudah selesai di masa depan sebelum kejadian lain terjadi.",
                    en: "Future Perfect Tense (will have + V3) is used for an action that will be completed before another event in the future."
                }
            },
            {
                id: 6,
                section: "reading",
                passageTitle: "The Essential Role of Pollinators",
                passageText: "<p>In recent years, agricultural scientists have observed a significant decrease in bee populations worldwide, a phenomenon referred to as Colony Collapse Disorder (CCD). Bees play a crucial role in pollinating approximately one-third of the human food supply, including fruits, vegetables, and nuts. The exact cause of CCD remains under investigation, but researchers point to a combination of pesticide exposure, habitat destruction, climate change, and parasitic infestation.</p><p>Without healthy pollinator populations, global food security faces imminent challenges, leading to increased produce prices and dietary shifts globally.</p>",
                q: "According to the passage, why are bees considered essential to agriculture?",
                options: [
                    "They produce organic honey for commercial export.",
                    "They pollinate approximately one-third of the human food supply.",
                    "They eliminate harmful crop parasites naturally.",
                    "They prevent soil erosion in agricultural areas."
                ],
                answer: 1,
                explanation: {
                    id: "Teks menyatakan secara langsung: 'Bees play a crucial role in pollinating approximately one-third of the human food supply' (Pilihan B).",
                    en: "The text explicitly states: 'Bees play a crucial role in pollinating approximately one-third of the human food supply' (Option B)."
                }
            },
            {
                id: 7,
                section: "reading",
                passageTitle: "The Essential Role of Pollinators",
                passageText: "(Refer to previous passage)",
                q: "What do researchers believe is responsible for Colony Collapse Disorder (CCD)?",
                options: [
                    "Exclusively chemical pesticide usage",
                    "Rapid global urbanization only",
                    "A combination of multiple environmental and biological factors",
                    "A single species of invasive parasitic mite"
                ],
                answer: 2,
                explanation: {
                    id: "Peneliti menyatakan bahwa CCD disebabkan oleh gabungan beberapa faktor: 'a combination of pesticide exposure, habitat destruction, climate change, and parasitic infestation'.",
                    en: "Researchers state that CCD is driven by 'a combination of pesticide exposure, habitat destruction, climate change, and parasitic infestation'."
                }
            }
        ]
    },
    toefl: {
        id: "toefl",
        title: "TOEFL ITP Official Format",
        icon: "fa-globe-americas",
        timeLimit: 115 * 60, // 115 mins (Official length)
        desc: {
            id: "<b>Struktur Asli TOEFL ITP:</b><br>• Section 1: Listening Comprehension (50 Soal, ~35 Menit)<br>• Section 2: Structure & Written Expression (40 Soal, 25 Menit)<br>• Section 3: Reading Comprehension (50 Soal, 55 Menit)<br><br><i>Sistem memuat sampel representatif. Anda dapat meng-copy-paste format di database untuk mencapai 140 soal penuh.</i>",
            en: "<b>Official TOEFL ITP Structure:</b><br>• Section 1: Listening (50 Qs, 35 Mins)<br>• Section 2: Structure (40 Qs, 25 Mins)<br>• Section 3: Reading (50 Qs, 55 Mins)<br><br><i>This system contains representative samples. You can duplicate the JSON format to reach the full 140 questions.</i>"
        },
        sections: [
            { id: "listening", name: "Sec 1: Listening Comprehension", type: "listening" },
            { id: "structure", name: "Sec 2: Structure & Written Expression", type: "standard" },
            { id: "reading", name: "Sec 3: Reading Comprehension", type: "reading" }
        ],
        questions: [
            // LISTENING SECTION
            {
                id: 1, section: "listening",
                audioTranscript: "Man: Do you want to grab lunch before the next class? I usually buy meals at Kantin Buahati, but I heard it's closed for renovation this week.\nWoman: Oh, I didn't know that. Let's just go to the cafe across the street then.",
                q: "What does the woman imply?",
                options: ["She works at Kantin Buahati.", "She is surprised by the news.", "She already ate lunch.", "She wants to skip class."],
                answer: 1, explanation: { id: "Wanita tersebut mengatakan 'I didn't know that', menunjukkan respons terkejut terhadap informasi baru.", en: "She says 'I didn't know that', indicating surprise at the new information." }
            },
            {
                id: 2, section: "listening",
                audioTranscript: "Professor: Today we will discuss inclusive education. A key figure in this system is the shadow teacher. For instance, a shadow teacher at SMAIT BUAHATI might assist a student named Rezky by modifying complex worksheets so the student can grasp core concepts effectively without feeling left behind.",
                q: "What is the primary role of the professional mentioned by the professor?",
                options: ["To grade national university exams.", "To provide personalized educational support.", "To manage school administration.", "To design physical classroom layouts."],
                answer: 1, explanation: { id: "Dosen menyebutkan 'assist a student... by modifying complex worksheets', yang berarti memberikan dukungan edukasi personal.", en: "The lecturer mentions modifying worksheets to assist a student, indicating personalized educational support." }
            },
            // STRUCTURE SECTION
            {
                id: 3, section: "structure",
                q: "The external SSD, which is capable of storing large PC games such as Resident Evil and Devil May Cry 5, ___ considered essential by many modern gamers.",
                options: ["is", "are", "being", "have been"],
                answer: 0, explanation: { id: "Subjek utama kalimat adalah 'The external SSD' (tunggal), sehingga kata kerja bantu yang tepat adalah 'is'.", en: "The main subject is singular ('The external SSD'), requiring the singular verb 'is'." }
            },
            {
                id: 4, section: "structure",
                q: "If the train tickets to Surabaya ___ earlier, her mother would have saved a significant amount of money.",
                options: ["booked", "were booked", "had been booked", "have booked"],
                answer: 2, explanation: { id: "Ini adalah Conditional sentence type 3 (If + Past Perfect, Subject + would have + V3).", en: "Conditional sentence type 3 requires the Past Perfect tense ('had been booked') in the 'if' clause." }
            },
            {
                id: 5, section: "structure",
                q: "___ a functional web-based educational dashboard like Omah Les Privat requires a solid grasp of HTML, CSS, and Google Apps Script.",
                options: ["Develop", "Developed", "Developing", "To developing"],
                answer: 2, explanation: { id: "Gerund 'Developing' bertindak sebagai subjek kalimat.", en: "The gerund 'Developing' acts as the subject of the sentence." }
            },
            {
                id: 6, section: "structure",
                q: "Measuring exactly 30x30 cm, the floor tiles ___ carefully to evaluate where to place the compact computer desk next to the bed.",
                options: ["was examined", "were examined", "examining", "examines"],
                answer: 1, explanation: { id: "Subjek jamak 'the floor tiles' membutuhkan kata kerja pasif jamak 'were examined'.", en: "The plural subject 'the floor tiles' requires the plural passive verb 'were examined'." }
            },
            {
                id: 7, section: "structure",
                q: "The family wedding ring, dating back to 1996, ___ down from the ayah and ibu as a cherished heirloom.",
                options: ["has been passed", "is passing", "passed", "have passed"],
                answer: 0, explanation: { id: "Kalimat membutuhkan pasif present perfect 'has been passed' (telah diwariskan).", en: "Passive present perfect 'has been passed' is used to show an action completed over time." }
            },
            // READING SECTION
            {
                id: 8, section: "reading",
                passageTitle: "Narrative Structures in Modern Film",
                passageText: "<p>The psychological thriller genre frequently employs intricate narrative structures to build tension. Directors use suspense and mystery to manipulate the audience's perception of reality. A hallmark of these films is the 'plot twist'—a radical change in the expected direction of the storyline.</p><p>Analyzing these movie plots reveals that twists are not merely for shock value. Instead, they serve to force viewers to re-evaluate the entire narrative leading up to that moment, akin to solving a complex puzzle. This cognitive engagement is what makes horror and mystery films enduringly popular.</p>",
                q: "According to the passage, what is the primary purpose of a plot twist?",
                options: ["To provide cheap shock value.", "To force viewers to re-evaluate the narrative.", "To confuse the actors involved.", "To shorten the film's runtime."],
                answer: 1, explanation: { id: "Paragraf kedua secara eksplisit menyatakan 'serve to force viewers to re-evaluate the entire narrative'.", en: "The text states it serves to 'force viewers to re-evaluate the entire narrative'." }
            },
            {
                id: 9, section: "reading",
                passageTitle: "Narrative Structures in Modern Film",
                passageText: "(Refer to previous passage)",
                q: "The word 'intricate' in the first paragraph is closest in meaning to:",
                options: ["Simple", "Complex", "Boring", "Predictable"],
                answer: 1, explanation: { id: "Konteks kalimat merujuk pada struktur cerita yang rumit layaknya puzzle, sehingga 'intricate' bersinonim dengan 'Complex'.", en: "In the context of puzzle-like stories, 'intricate' means 'Complex'." }
            }
        ]
    },
    ielts: {
        id: "ielts",
        title: "IELTS Academic Official Format",
        icon: "fa-globe-europe",
        timeLimit: 150 * 60, // 2.5 hours total representation
        desc: {
            id: "<b>Struktur Asli IELTS:</b><br>• Listening (40 Soal, ~30 Menit)<br>• Reading (40 Soal, 60 Menit)<br>• Writing (2 Task, 60 Menit)<br>• Speaking (Wawancara interaktif).<br><br><i>Sistem ini mencakup format lengkap, termasuk simulasi layar Prompt untuk sesi Writing dan Speaking.</i>",
            en: "<b>Official IELTS Structure:</b><br>• Listening (40 Qs, ~30 Mins)<br>• Reading (40 Qs, 60 Mins)<br>• Writing (2 Tasks, 60 Mins)<br>• Speaking (Interactive interview).<br><br><i>This system includes the full format, with on-screen prompt simulations for Writing and Speaking.</i>"
        },
        sections: [
            { id: "listening", name: "Listening (Section 1-4)", type: "listening" },
            { id: "reading", name: "Reading (Passage 1-3)", type: "reading" },
            { id: "writing", name: "Writing (Task 1 & 2)", type: "reading" },
            { id: "speaking", name: "Speaking Interview", type: "reading" }
        ],
        questions: [
            // LISTENING
            {
                id: 1, section: "listening",
                audioTranscript: "Agent: Hello, Premier Housing. How can I help?\nCaller: Hi, I'm calling about the apartment on 5th Avenue. My kakak—my older sibling—and I are planning our shared rental expenses. We'd like to know if the utilities are included in the 800 pounds monthly rent.",
                q: "Who is the caller planning to share the living arrangements with?",
                options: ["A university friend", "Her older sibling", "Her parents", "A co-worker"],
                answer: 1, explanation: { id: "Penelepon merujuk pada 'kakak—my older sibling'.", en: "The caller refers to 'kakak—my older sibling'." }
            },
            {
                id: 2, section: "listening",
                audioTranscript: "Customer: I am looking for a kitchen appliance for my mother. She wants to reduce oil usage, so I'm thinking of purchasing an air fryer.\nAssistant: Excellent choice. We have a 4-liter model on sale today.",
                q: "What appliance is the customer planning to purchase?",
                options: ["A microwave", "An air fryer", "A rice cooker", "A blender"],
                answer: 1, explanation: { id: "Pelanggan dengan jelas mengatakan 'thinking of purchasing an air fryer'.", en: "The customer clearly states 'purchasing an air fryer'." }
            },
            // READING
            {
                id: 3, section: "reading",
                passageTitle: "The Rise of Digital Skills Training",
                passageText: "<p>The demand for data-literate professionals has skyrocketed in the past decade. In response, intensive online bootcamps have emerged as a dominant educational force. Programs such as the MySkill data analysis course offer accelerated learning paths, teaching practical skills like SQL and Python over a few months, rather than the years typically required by traditional university degrees.</p><p>Proponents argue this democratizes education and quickly fills industry gaps, though critics question the depth of theoretical and foundational knowledge gained in such a short timespan.</p>",
                q: "Statement: Traditional degrees take less time to complete than online bootcamps like MySkill.",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                answer: 1, explanation: { id: "Teks secara eksplisit menyebutkan program bootcamp memakan waktu beberapa bulan ('a few months'), berlawanan dengan gelar tradisional yang memakan waktu bertahun-tahun ('years required by traditional degrees'). Pernyataan ini berlawanan (FALSE).", en: "The text states bootcamps take a few months, rather than the years required by traditional degrees. Statement is FALSE." }
            },
            // WRITING PROMPT
            {
                id: 4, section: "writing",
                passageTitle: "IELTS Writing Task 1 & 2",
                passageText: "<div class='bg-amber-50/80 dark:bg-amber-900/30 p-5 border border-amber-200 dark:border-amber-700/50 rounded-xl text-slate-800 dark:text-slate-200 shadow-inner'><p class='font-bold text-amber-800 dark:text-amber-400 mb-2'>Task 1 (20 Minutes):</p><p class='mb-4 text-sm leading-relaxed'>The chart below shows the hardware performance benchmarks of laptops equipped with AMD Ryzen 7 7735HS processors and Radeon 680M graphics compared to previous generations. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p><hr class='border-amber-200 dark:border-amber-700/50 my-4'><p class='font-bold text-amber-800 dark:text-amber-400 mb-2'>Task 2 (40 Minutes):</p><p class='text-sm leading-relaxed'>Some people believe that playing action video games like <i>Sekiro: Shadows Die Twice</i> or <i>Spider-Man Remastered</i> improves reflexes and strategic thinking. Others argue it is a waste of time.<br><br>Discuss both views and give your own opinion.</p></div>",
                q: "Are you ready to simulate the Writing section? (Write your essay on a separate paper or word processor)",
                options: ["Yes, I have completed my essay practice.", "No, I will skip the writing section for now."],
                answer: 0, explanation: { id: "Sesi Writing dilakukan secara mandiri (offline). Jawaban apa pun dianggap benar untuk melanjutkan sistem.", en: "The Writing session is completed offline independently. Answering proceeds the system." }
            },
            // SPEAKING PROMPT
            {
                id: 5, section: "speaking",
                passageTitle: "IELTS Speaking Interview Cue Card",
                passageText: "<div class='bg-blue-50/80 dark:bg-blue-900/30 p-5 border border-blue-200 dark:border-blue-700/50 rounded-xl text-slate-800 dark:text-slate-200 shadow-inner'><p class='font-bold text-blue-800 dark:text-blue-400 mb-3'>Part 2: Long Turn (1-2 minutes speaking time)</p><p class='text-sm leading-relaxed mb-2'>Describe a time when you created study materials to help someone else learn.</p><p class='text-sm leading-relaxed'>You should say:</p><ul class='list-disc pl-5 text-sm space-y-1 mb-3'><li>What subjects you covered (e.g., Economics, Mathematics, Geography, or Sociology)</li><li>Who you helped</li><li>How you organized the practice questions and step-by-step solutions</li></ul><p class='text-sm font-semibold'>And explain how this experience made you feel.</p></div>",
                q: "Have you completed your 2-minute speaking practice? (Practice with your partner or record yourself)",
                options: ["Yes, speaking practice completed.", "No, skip for now."],
                answer: 0, explanation: { id: "Sesi Speaking disimulasikan secara lisan secara mandiri atau bersama rekan belajar Anda.", en: "Speaking session is practiced orally alone or with a study partner." }
            }
        ]
    }
};
