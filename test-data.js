// test-data.js - EduTest Pro v2.0 Data Warehouse

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
        title: "TOEFL iBT Practice Test",
        icon: "fa-globe-americas",
        timeLimit: 45 * 60, // 45 mins
        desc: {
            id: "Simulasi ujian <b>TOEFL iBT (Test of English as a Foreign Language)</b> berstandar akademik. Menguji kesiapan bahasa Inggris Anda untuk pendaftaran studi perguruan tinggi di Amerika Serikat, Kanada, dan universitas global.<br><br><b>Fitur Simulasi:</b><br>• Reading Academic Passage<br>• Listening Lecture Audio Synthesis<br>• Structure & Written Expression Analysis<br>• Konversi Estimasi Skor TOEFL iBT (Skala 0 - 120).",
            en: "Academic <b>TOEFL iBT Simulation</b>. Assesses your readiness for university admission in the US, Canada, and global institutions.<br><br><b>Simulation Features:</b><br>• Academic Reading Passage<br>• Listening Lecture Speech Synthesizer<br>• Structure & Written Expression Analysis<br>• TOEFL iBT Estimated Score Conversion (0 - 120 Scale)."
        },
        sections: [
            { id: "reading", name: "Reading Section", type: "reading" },
            { id: "listening", name: "Listening Section", type: "listening" },
            { id: "structure", name: "Structure & Written", type: "standard" }
        ],
        questions: [
            {
                id: 1,
                section: "reading",
                passageTitle: "Teotihuacán: An Architectural Marvel",
                passageText: "<p>Located in the Valley of Mexico, the ancient city of Teotihuacán was once one of the largest urban centers in the pre-Columbian Americas. At its zenith during the first millennium CE, the city supported an estimated population exceeding 100,000 residents. The urban layout was defined by monumental architecture, notably the Pyramid of the Sun and the Avenue of the Dead.</p><p>Unlike contemporary Mayan city-states, Teotihuacán exhibits a distinct absence of royal tombs or monuments honoring individual rulers. This has led leading archaeologists to hypothesize that the city operated under a collective governance system rather than an absolute monarchy.</p>",
                q: "The word 'zenith' in the first paragraph is closest in meaning to:",
                options: ["origin", "pinnacle", "decline", "foundation"],
                answer: 1,
                explanation: {
                    id: "'Zenith' bermakna titik puncak atau kejayaan tertinggi (pinnacle).",
                    en: "'Zenith' refers to the highest point or peak of success (pinnacle)."
                }
            },
            {
                id: 2,
                section: "reading",
                passageTitle: "Teotihuacán: An Architectural Marvel",
                passageText: "(Refer to previous passage)",
                q: "What does the passage suggest regarding the political structure of Teotihuacán?",
                options: [
                    "It was strictly ruled by an absolute king.",
                    "It may have been governed by a council or collective leadership.",
                    "It was heavily dependent on Mayan military force.",
                    "It suffered from continuous political anarchy."
                ],
                answer: 1,
                explanation: {
                    id: "Teks menyebutkan 'hypothesize that the city operated under a collective governance system', yang menunjukkan kepemimpinan kolektif.",
                    en: "The text notes archaeologists 'hypothesize that the city operated under a collective governance system', indicating shared leadership."
                }
            },
            {
                id: 3,
                section: "listening",
                audioTranscript: "Welcome class. Today we will examine the biological concept of a Keystone Species. A keystone species is an organism that holds an ecosystem together. If a keystone species were removed, the ecosystem would experience drastic changes or collapse entirely. Consider the purple sea star in tide pools. When biologists removed this sea star, the mussel population grew unchecked, completely monopolizing space and drastically reducing overall marine biodiversity.",
                q: "What is the primary objective of the biology lecture?",
                options: [
                    "To detail the hunting habits of sea stars",
                    "To explain the significance and ecological impact of keystone species",
                    "To compare freshwater and marine ecosystems",
                    "To critique early environmental research methods"
                ],
                answer: 1,
                explanation: {
                    id: "Profesor menjelaskan definisi dan contoh pentingnya spesies kunci (keystone species) bagi kelangsungan ekosistem.",
                    en: "The lecturer explains the definition and critical impact of keystone species in preserving ecosystem balance."
                }
            },
            {
                id: 4,
                section: "structure",
                q: "Not only ___ cleaner energy, but solar power also reduces reliance on fossil fuels.",
                options: ["solar technology provides", "does solar technology provide", "provides solar technology", "solar technology does provide"],
                answer: 1,
                explanation: {
                    id: "Inversi terjadi saat kalimat diawali oleh frasa negatif/pembatas seperti 'Not only'. Strukturnya: Not only + Auxiliary Verb (does) + Subject + Main Verb (provide).",
                    en: "Inversion occurs when a sentence begins with 'Not only'. Structure: Not only + Auxiliary (does) + Subject + Main Verb (provide)."
                }
            }
        ]
    },
    ielts: {
        id: "ielts",
        title: "IELTS Academic Practice",
        icon: "fa-globe-europe",
        timeLimit: 40 * 60, // 40 mins
        desc: {
            id: "Simulasi <b>IELTS Academic (International English Language Testing System)</b>. Dirancang untuk pendaftaran studi di Britania Raya, Australia, Selandia Baru, dan Eropa.<br><br><b>Format Simulasi:</b><br>• Academic Reading (True / False / Not Given & Multiple Choice)<br>• Audio Listening Comprehension<br>• Kalkulasi Skor IELTS Band (Skala Band 1.0 - 9.0).",
            en: "Simulated <b>IELTS Academic</b> assessment for higher education in the UK, Australia, New Zealand, and Europe.<br><br><b>Simulation Features:</b><br>• Academic Reading (True / False / Not Given)<br>• Audio Listening Comprehension<br>• IELTS Band Score Calculation (1.0 - 9.0 Band Scale)."
        },
        sections: [
            { id: "listening", name: "Listening Section", type: "listening" },
            { id: "reading", name: "Reading Passage", type: "reading" }
        ],
        questions: [
            {
                id: 1,
                section: "listening",
                audioTranscript: "Good day, City Tourism Bureau. I am calling to inquire about the heritage walking tour scheduled for Saturday. We offer two guided slots: the Morning Architectural Tour at 9:30 AM and the Afternoon Culinary Tour at 2:00 PM. The morning tour costs 20 pounds per participant and covers historical monuments.",
                q: "What time does the Morning Architectural Tour begin?",
                options: ["9:00 AM", "9:30 AM", "2:00 PM", "10:00 AM"],
                answer: 1,
                explanation: {
                    id: "Transkrip audio menyebutkan: 'Morning Architectural Tour at 9:30 AM' (Pilihan B).",
                    en: "The transcript explicitly states: 'Morning Architectural Tour at 9:30 AM' (Option B)."
                }
            },
            {
                id: 2,
                section: "reading",
                passageTitle: "Vertical Agriculture Innovations",
                passageText: "<p>As global urban populations expand, traditional agricultural land experiences severe strains. Urban vertical farming—growing crops in stacked indoor layers under controlled climates—presents an alternative solution. Controlled environment farming reduces water usage by up to 95% compared to conventional soil farming and eliminates the necessity for chemical insecticides.</p><p>However, environmental analysts point out that vertical farms require substantial electrical energy to power artificial LED illumination, resulting in a notable carbon footprint unless powered by renewable energy sources.</p>",
                q: "Statement: Vertical farming utilizes significantly more water than conventional soil farming.",
                options: [
                    "TRUE (Statement agrees with information)",
                    "FALSE (Statement contradicts information)",
                    "NOT GIVEN (No information on this in text)"
                ],
                answer: 1,
                explanation: {
                    id: "Teks menyatakan vertical farming menghemat air hingga 95% ('reduces water usage by up to 95%'). Maka pernyataan 'utilizes significantly more water' adalah FALSE.",
                    en: "The text states vertical farming reduces water usage by up to 95%. Therefore, the statement is FALSE."
                }
            },
            {
                id: 3,
                section: "reading",
                passageTitle: "Vertical Agriculture Innovations",
                passageText: "(Refer to previous passage)",
                q: "Statement: Vertical indoor farms completely eliminate the need for chemical insecticides.",
                options: [
                    "TRUE (Statement agrees with information)",
                    "FALSE (Statement contradicts information)",
                    "NOT GIVEN (No information on this in text)"
                ],
                answer: 0,
                explanation: {
                    id: "Teks menyatakan: 'eliminates the necessity for chemical insecticides'. Pernyataan ini berkesesuaian (TRUE).",
                    en: "The text notes: 'eliminates the necessity for chemical insecticides'. This matches the statement (TRUE)."
                }
            }
        ]
    }
};
