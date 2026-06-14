//2026 roster
const players = [
  //batters and wk
  {
    id: "001",
    name: "Ajinkya Rahane",
    role: "Batter / Captain",
    image: "assets/images/rahane.avif",
    stats: { matches: 185, runs: 4600, strikeRate: 123.5 }
  },
  {
    id: "002",
    name: "Rinku Singh",
    role: "Batter",
    image: "assets/images/rinku.avif",
    stats: { matches: 45, runs: 890, strikeRate: 145.2, highestScore: 67 }
  },
  {
    id: "003",
    name: "Manish Pandey",
    role: "Batter",
    image: "assets/images/pandey.avif",
    stats: { matches: 175, runs: 3850, strikeRate: 121.8, hundreds: 1 }
  },
  {
    id: "004",
    name: "Rahul Tripathi",
    role: "Batter",
    image: "assets/images/tripathi.avif",
    stats: { matches: 95, runs: 2150, strikeRate: 139.5 }
  },
  {
    id: "005",
    name: "Rovman Powell",
    role: "Batter",
    image: "assets/images/powell.avif",
    stats: { matches: 25, runs: 350, strikeRate: 155.4 }
  },
  {
    id: "006",
    name: "Angkrish Raghuvanshi",
    role: "Batter",
    image: "assets/images/raghuvanshi.avif",
    stats: { matches: 15, runs: 280, strikeRate: 151.2 }
  },
  {
    id: "007",
    name: "Finn Allen",
    role: "Wicket-Keeper",
    image: "assets/images/allen.avif",
    stats: { matches: 12, runs: 210, strikeRate: 165.0 }
  },
  {
    id: "008",
    name: "Tim Seifert",
    role: "Wicket-Keeper",
    image: "assets/images/seifert.avif",
    stats: { matches: 8, runs: 120, strikeRate: 135.5 }
  },
  {
    id: "009",
    name: "Tejasvi Singh",
    role: "Wicket-Keeper",
    image: "assets/images/tejasvi.avif",
    stats: { matches: 0, runs: 0, strikeRate: 0 }
  },

  //all rounders
  {
    id: "010",
    name: "Sunil Narine",
    role: "All-Rounder",
    image: "assets/images/narine.avif",
    stats: { matches: 180, runs: 1540, strikeRate: 165.0, wickets: 185, economy: 6.75 }
  },
  {
    id: "011",
    name: "Cameron Green",
    role: "All-Rounder",
    image: "assets/images/green.avif",
    stats: { matches: 30, runs: 650, strikeRate: 148.5, wickets: 15, economy: 8.42 }
  },
  {
    id: "012",
    name: "Rachin Ravindra",
    role: "All-Rounder",
    image: "assets/images/ravindra.avif",
    stats: { matches: 16, runs: 310, strikeRate: 138.2, wickets: 8, economy: 8.15 }
  },
  {
    id: "013",
    name: "Ramandeep Singh",
    role: "All-Rounder",
    image: "assets/images/ramandeep.avif",
    stats: { matches: 25, runs: 320, strikeRate: 160.0, wickets: 6, economy: 8.90 }
  },
  {
    id: "014",
    name: "Anukul Roy",
    role: "All-Rounder",
    image: "assets/images/roy.avif",
    stats: { matches: 18, runs: 125, strikeRate: 122.4, wickets: 12, economy: 7.80 }
  },
  {
    id: "015",
    name: "Sarthak Ranjan",
    role: "All-Rounder",
    image: "assets/images/sarthak.avif",
    stats: { matches: 0, runs: 0, strikeRate: 0, wickets: 0, economy: 0 }
  },
  {
    id: "016",
    name: "Daksh Kamra",
    role: "All-Rounder",
    image: "assets/images/daksh.avif",
    stats: { matches: 0, runs: 0, strikeRate: 0, wickets: 0, economy: 0 }
  },

  //bowlers
  {
    id: "017",
    name: "Varun Chakaravarthy",
    role: "Bowler",
    image: "assets/images/varun.avif",
    stats: { matches: 70, wickets: 85, economy: 7.40, bestBowling: "5/20" }
  },
  {
    id: "020",
    name: "Umran Malik",
    role: "Bowler",
    image: "assets/images/malik.avif",
    stats: { matches: 30, wickets: 35, economy: 9.25, bestBowling: "5/25" }
  },
  {
    id: "021",
    name: "Vaibhav Arora",
    role: "Bowler",
    image: "assets/images/arora.avif",
    stats: { matches: 22, wickets: 24, economy: 8.85, bestBowling: "3/27" }
  },
  {
    id: "022",
    name: "Kartik Tyagi",
    role: "Bowler",
    image: "assets/images/tyagi.avif",
    stats: { matches: 20, wickets: 15, economy: 9.50, bestBowling: "2/20" }
  },
  {
    id: "023",
    name: "Prashant Solanki",
    role: "Bowler",
    image: "assets/images/solanki.avif",
    stats: { matches: 3, wickets: 2, economy: 8.50, bestBowling: "2/20" }
  },
  {
    id: "025",
    name: "Blessing Muzarabani",
    role: "Bowler",
    image: "assets/images/muzarabani.avif",
    stats: { matches: 5, wickets: 6, economy: 8.20, bestBowling: "3/18" }
  },
  {
    id: "026",
    name: "Navdeep Saini",
    role: "Bowler",
    image: "assets/images/saini.avif",
    stats: { matches: 32, wickets: 23, economy: 8.80, bestBowling: "3/19" }
  },
  {
    id: "027",
    name: "Saurabh Dubey",
    role: "Bowler",
    image: "assets/images/dubey.avif",
    stats: { matches: 0, wickets: 0, economy: 0, bestBowling: "0/0" }
  }
];

//hall of fame
const hallOfFame = [
  {
    name: "Gautam Gambhir",
    role: "Captain / Batter",
    image: "assets/images/gambhir.avif",
    achievements: "Led KKR to 2 IPL Titles (2012, 2014) as captain and the 2024 championship as mentor."
  },
  {
    name: "Sunil Narine",
    role: "All-Rounder / Mystery Spinner",
    image: "assets/images/narine-hof.avif",
    achievements: "Multi-time MVP, 3x Champion, and the greatest asset in franchise history."
  },
  {
    name: "Andre Russell",
    role: "Power-Hitting All-Rounder",
    image: "assets/images/russell.avif",
    achievements: "The ultimate modern match-winner, pulling off statistically impossible chases for over a decade."
  },
  {
    name: "Yusuf Pathan",
    role: "All-Rounder",
    image: "assets/images/pathan.avif",
    achievements: "The powerhouse middle-order engine of both the 2012 and 2014 championship teams."
  },
  {
    name: "Robin Uthappa",
    role: "Wicket-Keeper / Batter",
    image: "assets/images/uthappa.avif",
    achievements: "Orange Cap Winner (2014) with 660 runs, anchoring a record streak of 40+ scores."
  },
  {
    name: "Brendon McCullum",
    role: "Wicket-Keeper / Batter",
    image: "assets/images/mccullum.avif",
    achievements: "Ignited the global phenomenon of the IPL by scoring 158* in the very first match (2008)."
  },
  {
    name: "Shreyas Iyer",
    role: "Captain / Batter",
    image: "assets/images/shreyas.avif",
    achievements: "Dynamically captained the team to lift the trophy in 2024, breaking a decade-long title drought."
  },
  {
    name: "Venkatesh Iyer",
    role: "All-Rounder",
    image: "assets/images/venkatesh.avif",
    achievements: "Clutch big-match performer across playoff cycles, notably dominating the 2024 finals week."
  }
];

//victories
const milestones = [
  {
    year: 2012,
    title: "First Championship",
    details: "Manvinder Bisla's 89(48) stuns CSK in Chennai to secure KKR's maiden IPL trophy."
  },
  {
    year: 2014,
    title: "Second Championship",
    details: "Manish Pandey hits 94(50) chasing 200 against PBKS in Bangalore."
  },
  {
    year: 2024,
    title: "Third Championship",
    details: "Absolute dominance. Bowled SRH out for 113 to win the final with 57 balls remaining."
  }
];

//quiz qna
const quizQuestions = [
  {
    question: "Who hit 5 consecutive sixes in the final over to win the match against GT?",
    options: ["Andre Russell", "Rinku Singh", "Sunil Narine"],
    answer: "Rinku Singh"
  },
  {
    question: "How many IPL titles have KKR won?",
    options: ["Two", "Three", "Four"],
    answer: "Three"
  },
  {
    question: "Who is KKR's all-time leading wicket-taker?",
    options: ["Sunil Narine", "Piyush Chawla", "Umesh Yadav"],
    answer: "Sunil Narine"
  },
  {
    question: "Who scored a match-winning 89 off 48 balls in the 2012 IPL Final?",
    options: ["Gautam Gambhir", "Jacques Kallis", "Manvinder Bisla"],
    answer: "Manvinder Bisla"
  }
];