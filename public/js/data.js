//hall of fame

const hallOfFame = [
  {
    name: "Gautam Gambhir",
    role: "Captain / Batter",
    image: "assets/images/gambhir.avif",
    description: "The iconic leader who built KKR's gritty and aggressive winning legacy.",
    achievements: "Led KKR to 2 IPL Titles (2012, 2014) as captain and the 2024 championship as mentor.",
    stats: { matches: 154, runs: 4217, highestScore: 93 } 
  },
  {
    name: "Sunil Narine",
    role: "All-Rounder / Mystery Spinner",
    image: "assets/images/narine-hof.avif",
    description: "The most impactful and loyal match-winner in the history of the franchise.",
    achievements: "Multi-time MVP, 3x Champion, and the greatest asset in franchise history.",
    stats: { matches: 180, wickets: 185, economy: 6.75, runs: 1540 }
  },
  {
    name: "Andre Russell",
    role: "Power-Hitting All-Rounder",
    image: "assets/images/russell.avif",
    description: "The ultimate modern match-winner capable of unadulterated destruction.",
    achievements: "Pulled off statistically impossible chases for over a decade with a record strike rate.",
    stats: { matches: 112, runs: 2262, strikeRate: 174.0, wickets: 96 }
  },
  {
    name: "Yusuf Pathan",
    role: "All-Rounder",
    image: "assets/images/pathan.avif",
    description: "The powerhouse middle-order engine of the early KKR golden era.",
    achievements: "The destructive core of both the 2012 and 2014 championship teams.",
    stats: { matches: 174, runs: 3204, strikeRate: 142.9, wickets: 42 }
  },
  {
    name: "Robin Uthappa",
    role: "Wicket-Keeper / Batter",
    image: "assets/images/uthappa.avif",
    description: "An elegant yet completely destructive top-order anchor.",
    achievements: "Orange Cap Winner (2014) anchoring a record streak of 40+ scores.",
    stats: { matches: 205, runs: 4952, strikeRate: 130.3 } 
  },
  {
    name: "Brendon McCullum",
    role: "Wicket-Keeper / Batter",
    image: "assets/images/mccullum.avif",
    description: "The man who violently kickstarted the IPL on opening night.",
    achievements: "Ignited the global phenomenon of the IPL by scoring 158* in the very first match (2008).",
    stats: { matches: 109, runs: 2880, highestScore: "158*" } 
  },
  {
    name: "Shreyas Iyer",
    role: "Captain / Batter",
    image: "assets/images/shreyas.avif",
    description: "The composed tactician who ended a decade-long drought.",
    achievements: "Dynamically captained the team to lift the trophy in 2024.",
    stats: { matches: 115, runs: 3127, strikeRate: 125.3 }
  },
  {
    name: "Venkatesh Iyer",
    role: "All-Rounder",
    image: "assets/images/venkatesh.avif",
    description: "A towering presence who steps up when the stakes are highest.",
    achievements: "Clutch big-match performer across playoff cycles, notably dominating the 2024 finals week.",
    stats: { matches: 50, runs: 1326, strikeRate: 137.1 }
  }
];

//greatest victories

const milestones = [
  {
    year: 2012,
    title: "First Championship",
    opponent: "Chennai Super Kings (CSK)",
    summary: "Chasing a daunting 191 in Chennai's fortress, Manvinder Bisla played the innings of his life, smashing 89 off 48 balls to secure KKR's maiden IPL trophy in a nail-biting finish.",
    performers: "Manvinder Bisla 89(48) // Jacques Kallis 69(49) // Sunil Narine 2/37",
    stats: "KKR 192/5 (19.4 OV) defeated CSK 190/3 (20 OV) by 5 wickets",
    link: "https://www.iplt20.com/video/31643/final-csk-vs-kkr-match-highlights"
  },
  {
    year: 2014,
    title: "Second Championship",
    opponent: "Punjab Kings (PBKS)",
    summary: "After Punjab posted an imposing 199, Manish Pandey anchored an incredible high-pressure chase with a clutch 94 off 50 balls, leading KKR to their second title.",
    performers: "Manish Pandey 94(50) // Yusuf Pathan 36(22) // Piyush Chawla 13*(5)",
    stats: "KKR 200/7 (19.3 OV) defeated PBKS 199/4 (20 OV) by 3 wickets",
    link: "https://www.iplt20.com/video/18141/final-kkr-vs-kxip-match-highlights"
  },
  {
    year: 2024,
    title: "Third Championship",
    opponent: "Sunrisers Hyderabad (SRH)",
    summary: "A masterclass in sheer dominance. KKR's relentless bowling attack dismantled SRH for the lowest total in IPL final history, chasing it down with 57 balls to spare.",
    performers: "Mitchell Starc 2/14 // Andre Russell 3/19 // Venkatesh Iyer 52*(26)",
    stats: "KKR 114/2 (10.3 OV) defeated SRH 113/10 (18.3 OV) by 8 wickets",
    link: "https://www.iplt20.com/video/58957/final-kkr-vs-srh-match-highlights"
  }
];

//franchise records

const teamRecords = [
  { label: "HIGHEST PARTNERSHIP", value: "184", player: "GAMBHIR & LYNN", detail: "VS GUJARAT LIONS (2017)" },
  { label: "FASTEST FIFTY", value: "14 BALLS", player: "PAT CUMMINS", detail: "VS MUMBAI INDIANS (2022)" },
  { label: "FASTEST HUNDRED", value: "49 BALLS", player: "SUNIL NARINE", detail: "VS RAJASTHAN ROYALS (2024)" },
  { label: "BEST BOWLING", value: "5/15", player: "ANDRE RUSSELL", detail: "VS MUMBAI INDIANS (2021)" },
  { label: "MOST POTM AWARDS", value: "15", player: "SUNIL NARINE", detail: "ALL-TIME FRANCHISE RECORD" },
  { label: "MOST SIXES (SEASON)", value: "52", player: "ANDRE RUSSELL", detail: "2019 IPL SEASON" },
  { label: "MOST RUNS (SEASON)", value: "660", player: "ROBIN UTHAPPA", detail: "2014 IPL SEASON (ORANGE CAP)" },
  { label: "MOST WICKETS (SEASON)", value: "24", player: "SUNIL NARINE", detail: "2012 IPL SEASON" }
];