// test-data.js
// Data soal simulasi komprehensif

const db = {
    cefr: {
        id: "cefr",
        title: "CEFR Level Assessment",
        icon: "fa-layer-group",
        timeLimit: 30 * 60, // 30 Menit untuk versi web (Aslinya ~50 menit)
        desc: "Tes ini mengukur level bahasa Inggris umum Anda berdasarkan standar <b>Common European Framework of Reference for Languages (CEFR)</b> dari A1 (Beginner) hingga C2 (Proficient).<br><br><b>Format Tes:</b><br>• Grammar & Vocabulary (30 Soal)<br>• Reading Comprehension (10 Soal)",
        sections: [
            { id: "grammar", name: "Grammar & Vocabulary", type: "standard" },
            { id: "reading", name: "Reading Comprehension", type: "reading" }
        ],
        questions: [
            // Grammar & Vocab
            { id: 1, section: "grammar", q: "I ___ to the cinema yesterday.", options: ["go", "gone", "went", "going"], answer: 2, explanation: "Kalimat menggunakan keterangan waktu lampau 'yesterday', sehingga membutuhkan Simple Past Tense (V2 dari go = went)." },
            { id: 2, section: "grammar", q: "She has been working here ___ five years.", options: ["since", "for", "in", "from"], answer: 1, explanation: "'For' digunakan untuk menunjukkan durasi waktu (lima tahun). 'Since' digunakan untuk titik awal waktu (misal: since 2015)." },
            { id: 3, section: "grammar", q: "If I ___ a million dollars, I would travel the world.", options: ["have", "will have", "had", "would have"], answer: 2, explanation: "Ini adalah Conditional Type 2 (unreal present). Polanya: If + Simple Past (had), Subject + would + V1." },
            { id: 4, section: "grammar", q: "The meeting was called ___ because the manager was ill.", options: ["off", "out", "up", "down"], answer: 0, explanation: "Phrasal verb 'call off' bermakna membatalkan (cancel)." },
            { id: 5, section: "grammar", q: "By the time we arrive at the station, the train ___.", options: ["will leave", "left", "will have left", "has left"], answer: 2, explanation: "Menggunakan Future Perfect Tense (will have + V3) untuk menyatakan kejadian yang sudah selesai di masa depan sebelum kejadian lain terjadi." },
            
            // Reading
            { id: 6, section: "reading", 
              passageTitle: "The Decline of Bees", 
              passageText: "<p>In recent years, scientists have observed a significant decline in bee populations worldwide, a phenomenon known as Colony Collapse Disorder (CCD). Bees play a crucial role in pollinating approximately one-third of the human diet, including fruits, vegetables, and nuts. The exact cause of CCD remains highly debated, but researchers believe it is a combination of factors including pesticide use, habitat loss, climate change, and parasitic mites.</p><br><p>Without bees, global food security would be severely compromised, leading to skyrocketing prices for fresh produce and a drastic change in human nutritional intake.</p>",
              q: "According to the passage, why are bees considered crucial?", 
              options: ["They produce honey for human consumption.", "They pollinate about a third of human food sources.", "They help control the parasitic mite population.", "They are the only insects affected by climate change."], 
              answer: 1, 
              explanation: "Teks secara eksplisit menyatakan: 'Bees play a crucial role in pollinating approximately one-third of the human diet...' (Opsi B)." 
            },
            { id: 7, section: "reading", 
              passageTitle: "The Decline of Bees", 
              passageText: "(Refer to previous passage)", // Logic in JS will reuse the text if not provided or same title
              q: "What is the primary cause of Colony Collapse Disorder (CCD) according to the text?", 
              options: ["Pesticide use exclusively", "Habitat loss due to urbanization", "Climate change causing global warming", "A combination of multiple factors"], 
              answer: 3, 
              explanation: "Teks menyebutkan 'researchers believe it is a combination of factors including pesticide use, habitat loss, climate change, and parasitic mites.' (Opsi D)." 
            }
        ]
    },
    toefl: {
        id: "toefl",
        title: "TOEFL iBT Simulation",
        icon: "fa-globe-americas",
        timeLimit: 120 * 60, // 2 Jam (Dipersingkat untuk web dari 3 jam)
        desc: "Simulasi <b>Test of English as a Foreign Language (TOEFL iBT)</b>. Tes ini mengukur kemampuan bahasa Inggris akademik untuk keperluan studi di universitas, terutama di Amerika Utara.<br><br><b>Format Simulasi Ini:</b><br>• Reading (1 Passage, 5 Soal)<br>• Listening (1 Lecture, 5 Soal)<br>• Structure/Written Expression (10 Soal)<br><i>Skala skor dikonversi ke estimasi iBT (0-120).</i>",
        sections: [
            { id: "reading", name: "Reading", type: "reading" },
            { id: "listening", name: "Listening", type: "listening" },
            { id: "structure", name: "Structure", type: "standard" }
        ],
        questions: [
            // Reading Section
            { id: 1, section: "reading", 
              passageTitle: "Teotihuacán: The City of the Gods", 
              passageText: "<p>The ancient city of Teotihuacán, located in the Valley of Mexico, was one of the largest and most populated cities in the pre-Columbian Americas. At its zenith in the first half of the first millennium CE, it had an estimated population of 100,000 or more. The city is characterized by its vast monuments, particularly the Pyramid of the Sun and the Pyramid of the Moon, connected by the Avenue of the Dead.</p><p>Unlike other Mesoamerican cities, Teotihuacán contains no royal tombs, and its artwork rarely depicts individual rulers. This has led some archaeologists to propose that the city may have been ruled by a collective governance structure rather than a single autocratic monarch.</p>",
              q: "The word 'zenith' in the first paragraph is closest in meaning to:", 
              options: ["beginning", "decline", "peak", "destruction"], 
              answer: 2, 
              explanation: "Dalam konteks ini, 'zenith' merujuk pada masa puncak kejayaan atau titik tertinggi (peak) dari kota tersebut." 
            },
            { id: 2, section: "reading", 
              passageTitle: "Teotihuacán: The City of the Gods", 
              q: "What does the author imply about the governance of Teotihuacán?", 
              options: ["It was firmly controlled by a dynasty of kings.", "It might have been ruled by a group of leaders rather than one king.", "It was heavily influenced by the rulers of the Maya civilization.", "It was a chaotic society with no formal leadership."], 
              answer: 1, 
              explanation: "Teks menyebutkan 'city may have been ruled by a collective governance structure rather than a single autocratic monarch', yang berarti kemungkinan diperintah oleh sekelompok pemimpin (collective)." 
            },
            // Listening Section (Mock)
            { id: 3, section: "listening", 
              audioTranscript: "[Professor]: 'Today we're going to discuss the concept of Keystone Species in ecology. Now, a keystone species is a plant or animal that plays a unique and crucial role in the way an ecosystem functions. Without keystone species, the ecosystem would be dramatically different or cease to exist altogether. The classic example, discovered by Robert Paine in the 1960s, is the purple sea star in the Pacific Northwest. Paine noticed that when he removed these starfish from the tide pools, the population of mussels—which the starfish usually ate—exploded, crowding out all other species. The biodiversity dropped dramatically.'",
              audioDuration: 45,
              q: "What is the main topic of the lecture?", 
              options: ["The life cycle of the purple sea star.", "The history of ecology in the 1960s.", "The definition and impact of keystone species.", "How to increase biodiversity in tide pools."], 
              answer: 2, 
              explanation: "Profesor secara jelas menyatakan di awal: 'Today we're going to discuss the concept of Keystone Species in ecology...'" 
            },
            { id: 4, section: "listening", 
              audioTranscript: "Refer to previous",
              q: "According to the professor, what happened when the purple sea star was removed from the tide pools?", 
              options: ["The ecosystem flourished with new species.", "The mussel population grew rapidly and reduced biodiversity.", "The starfish adapted to living on land.", "The tide pools dried up completely."], 
              answer: 1, 
              explanation: "Audio menyebutkan: 'when he removed these starfish... the population of mussels exploded, crowding out all other species. The biodiversity dropped dramatically.'" 
            },
            // Structure
            { id: 5, section: "structure", q: "Not only ___ generate energy, but it also produces no greenhouse gas emissions.", options: ["wind power does", "does wind power", "wind power", "did wind power"], answer: 1, explanation: "Kalimat yang diawali dengan frasa negatif (Not only) membutuhkan inversi subjek dan kata kerja bantu (does + subject + V1)." },
            { id: 6, section: "structure", q: "The architecture of the new museum, ___ by a renowned Japanese architect, has won multiple international awards.", options: ["designing", "designed", "was designed", "which designed"], answer: 1, explanation: "Kalimat ini membutuhkan reduced relative clause berbentuk pasif. Bentuk aslinya 'which was designed', disingkat menjadi past participle 'designed'." }
        ]
    },
    ielts: {
        id: "ielts",
        title: "IELTS Academic",
        icon: "fa-globe-europe",
        timeLimit: 60 * 60, // 60 Menit
        desc: "Simulasi <b>International English Language Testing System (IELTS)</b> - Academic Module. Dirancang untuk menguji kemampuan bahasa Inggris bagi mereka yang ingin mendaftar ke universitas di UK, Australia, Kanada, dan Selandia Baru.<br><br><b>Format Simulasi Ini:</b><br>• Listening (1 Section, 5 Soal)<br>• Reading (1 Passage, 5 Soal)<br><i>Skor dikalkulasi menggunakan sistem Band (0 - 9.0).</i>",
        sections: [
            { id: "listening", name: "Listening Section 1", type: "listening" },
            { id: "reading", name: "Reading Passage 1", type: "reading" }
        ],
        questions: [
            // Listening
            { id: 1, section: "listening", 
              audioTranscript: "[Agent]: 'Good morning, City Tours. How can I help you?'
[Tourist]: 'Hello, I'd like to book a walking tour for this Saturday.'
[Agent]: 'Certainly. We have two tours available on Saturday. The Historical Centre Tour starts at 9:30 AM, and the Culinary Tour begins at 1:00 PM. Which one would you prefer?'
[Tourist]: 'The food one sounds great, but my flight arrives at noon, so I might miss it. I'll take the morning one instead, assuming I can change my flight.'
[Agent]: 'Alright, the Historical Centre Tour at 9:30. That will be £25 per person.'",
              audioDuration: 35,
              q: "Which tour does the tourist decide to book?", 
              options: ["The 1:00 PM Culinary Tour", "The 9:30 AM Historical Centre Tour", "Both tours", "Neither tour"], 
              answer: 1, 
              explanation: "Meskipun awalnya tertarik pada Culinary Tour, turis tersebut mengatakan 'I'll take the morning one instead' (Historical Centre Tour jam 9:30)." 
            },
            { id: 2, section: "listening", 
              audioTranscript: "Refer to previous",
              q: "Why did the tourist reject the Culinary Tour?", 
              options: ["It was too expensive.", "He doesn't like local food.", "His flight arrival time conflicts with the tour start time.", "It was fully booked."], 
              answer: 2, 
              explanation: "Turis mengatakan 'my flight arrives at noon, so I might miss it' (Culinary tour jam 1:00 PM)." 
            },
            // Reading (T/F/NG Format mapped to Multiple Choice for web)
            { id: 3, section: "reading", 
              passageTitle: "The Future of Urban Farming", 
              passageText: "<p>As global populations soar, traditional agriculture is facing unprecedented pressure. Urban farming—the practice of cultivating, processing, and distributing food in or around urban areas—is emerging as a viable solution. Vertical farming, a subset of urban farming, involves growing crops in stacked layers in highly controlled indoor environments.</p><p>Proponents argue that vertical farming uses up to 95% less water than conventional farming and eliminates the need for chemical pesticides due to the enclosed environment. However, critics point out that the energy consumption required for artificial lighting (LEDs) and climate control makes the carbon footprint of vertical farms significantly higher than traditional farms, at least until renewable energy becomes the primary power source.</p>",
              q: "Vertical farming requires more water than conventional agriculture.", 
              options: ["TRUE (Statement agrees with information)", "FALSE (Statement contradicts information)", "NOT GIVEN (No information on this)"], 
              answer: 1, 
              explanation: "Teks menyatakan: 'vertical farming uses up to 95% less water than conventional farming'. Pernyataan di soal berkontradiksi (FALSE)." 
            },
            { id: 4, section: "reading", 
              passageTitle: "The Future of Urban Farming",
              q: "Pesticides are frequently used in vertical farming to protect crops.", 
              options: ["TRUE", "FALSE", "NOT GIVEN"], 
              answer: 1, 
              explanation: "Teks menyatakan: 'eliminates the need for chemical pesticides due to the enclosed environment'. Jadi pernyataan salah (FALSE)." 
            },
            { id: 5, section: "reading", 
              passageTitle: "The Future of Urban Farming",
              q: "Most vertical farms currently use solar panels to power their LED lights.", 
              options: ["TRUE", "FALSE", "NOT GIVEN"], 
              answer: 2, 
              explanation: "Teks menyebutkan 'until renewable energy becomes the primary power source', tetapi tidak menyebutkan secara spesifik bahwa sebagian besar lahan pertanian vertikal saat ini menggunakan 'solar panels' (NOT GIVEN)." 
            }
        ]
    }
};
