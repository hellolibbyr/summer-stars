import { useState, useEffect, useRef } from "react";

// ─── DAILY QUOTE BANK ─────────────────────────────────────────────────────────
const QUOTES = [
  // ✝️ Scripture / Catholic
  { text: "I can do all things through Christ who strengthens me.", source: "Philippians 4:13", category: "faith", icon: "✝️" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", source: "Joshua 1:9", category: "faith", icon: "✝️" },
  { text: "For I know the plans I have for you — plans to prosper you and not to harm you, plans to give you hope and a future.", source: "Jeremiah 29:11", category: "faith", icon: "✝️" },
  { text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", source: "Colossians 3:23", category: "faith", icon: "✝️" },
  { text: "Even youths grow tired and weary, but those who hope in the Lord will renew their strength. They will soar on wings like eagles.", source: "Isaiah 40:30-31", category: "faith", icon: "✝️" },
  { text: "The Lord is my shepherd; I shall not want.", source: "Psalm 23:1", category: "faith", icon: "✝️" },
  { text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.", source: "Romans 12:2", category: "faith", icon: "✝️" },
  { text: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.", source: "Matthew 7:7", category: "faith", icon: "✝️" },
  { text: "Commit to the Lord whatever you do, and he will establish your plans.", source: "Proverbs 16:3", category: "faith", icon: "✝️" },
  { text: "With God, all things are possible.", source: "Matthew 19:26", category: "faith", icon: "✝️" },
  { text: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you.", source: "Zephaniah 3:17", category: "faith", icon: "✝️" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", source: "Proverbs 3:5", category: "faith", icon: "✝️" },

  // 🏆 Athletes
  { text: "Hard work beats talent when talent doesn't work hard.", source: "Tim Notke", category: "athlete", icon: "🏆" },
  { text: "The only way to prove you are a good sport is to lose.", source: "Ernie Banks", category: "athlete", icon: "⚾" },
  { text: "You have to expect things of yourself before you can do them.", source: "Michael Jordan", category: "athlete", icon: "🏆" },
  { text: "Champions keep playing until they get it right.", source: "Billie Jean King", category: "athlete", icon: "🏆" },
  { text: "It's not whether you get knocked down — it's whether you get up.", source: "Vince Lombardi", category: "athlete", icon: "🏈" },
  { text: "The more difficult the victory, the greater the happiness in winning.", source: "Pelé", category: "athlete", icon: "⚽" },
  { text: "Never give up! Failure and rejection are only the first steps to succeeding.", source: "Jim Valvano", category: "athlete", icon: "🏆" },
  { text: "The difference between the impossible and the possible lies in a person's determination.", source: "Tommy Lasorda", category: "athlete", icon: "⚾" },
  { text: "To be a great champion you must believe you are the best. If you're not, pretend you are.", source: "Muhammad Ali", category: "athlete", icon: "🥊" },
  { text: "Make sure your worst enemy doesn't live between your own two ears.", source: "Laird Hamilton", category: "athlete", icon: "🏄" },
  { text: "Push yourself again and again. Don't give an inch until the final buzzer sounds.", source: "Larry Bird", category: "athlete", icon: "🏀" },
  { text: "Somewhere behind the athlete you've become is the little kid who fell in love with the game.", source: "Mia Hamm", category: "athlete", icon: "⚽" },
  { text: "You can't put a limit on anything. The more you dream, the farther you get.", source: "Michael Phelps", category: "athlete", icon: "🏊" },
  { text: "Baseball was, is, and always will be to me the best game in the world.", source: "Babe Ruth", category: "athlete", icon: "⚾" },
  { text: "Every strike brings me closer to the next home run.", source: "Babe Ruth", category: "athlete", icon: "⚾" },
  { text: "It ain't over till it's over.", source: "Yogi Berra", category: "athlete", icon: "⚾" },

  // 💼 Business Leaders
  { text: "The secret of getting ahead is getting started.", source: "Mark Twain", category: "business", icon: "💼" },
  { text: "Your time is limited, so don't waste it living someone else's life.", source: "Steve Jobs", category: "business", icon: "💡" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", source: "Thomas Edison", category: "business", icon: "💡" },
  { text: "Success is not final, failure is not fatal — it is the courage to continue that counts.", source: "Winston Churchill", category: "business", icon: "💼" },
  { text: "The way to get started is to quit talking and begin doing.", source: "Walt Disney", category: "business", icon: "✨" },
  { text: "Innovation distinguishes between a leader and a follower.", source: "Steve Jobs", category: "business", icon: "💡" },
  { text: "Dream big and dare to fail.", source: "Norman Vaughan", category: "business", icon: "🚀" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", source: "Franklin D. Roosevelt", category: "business", icon: "💼" },
  { text: "It does not matter how slowly you go as long as you do not stop.", source: "Confucius", category: "business", icon: "🌟" },
  { text: "Opportunities don't happen. You create them.", source: "Chris Grosser", category: "business", icon: "💡" },
  { text: "Don't watch the clock; do what it does. Keep going.", source: "Sam Levenson", category: "business", icon: "⏰" },
  { text: "The biggest risk is not taking any risk. In a world that's changing fast, the only strategy that is guaranteed to fail is not taking risks.", source: "Mark Zuckerberg", category: "business", icon: "🚀" },
  { text: "Whether you think you can or you think you can't — you're right.", source: "Henry Ford", category: "business", icon: "💼" },
  { text: "Success usually comes to those who are too busy to be looking for it.", source: "Henry David Thoreau", category: "business", icon: "🌿" },

  // 🌱 Character & Life
  { text: "Discipline is the bridge between goals and accomplishment.", source: "Jim Rohn", category: "life", icon: "🌱" },
  { text: "Small daily improvements over time lead to stunning results.", source: "Robin Sharma", category: "life", icon: "📈" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", source: "Aristotle", category: "life", icon: "⚡" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", source: "Anonymous", category: "life", icon: "🔥" },
  { text: "Talent is cheaper than table salt. What separates the talented individual from the successful one is hard work.", source: "Stephen King", category: "life", icon: "✍️" },
  { text: "You don't have to be great to start, but you have to start to be great.", source: "Zig Ziglar", category: "life", icon: "🚀" },
  { text: "Character is doing the right thing when nobody's watching.", source: "J.C. Watts", category: "life", icon: "🌟" },
  { text: "A good name is more desirable than great riches; to be esteemed is better than silver or gold.", source: "Proverbs 22:1", category: "faith", icon: "✝️" },
  { text: "Act as if what you do makes a difference. It does.", source: "William James", category: "life", icon: "💛" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", source: "Nelson Mandela", category: "life", icon: "🌟" },
];

// Deterministic daily quote — same quote all day, changes at midnight
function getDailyQuote() {
  const day = Math.floor(Date.now() / 86400000);
  return QUOTES[day % QUOTES.length];
}

const CATEGORY_COLORS = {
  faith:    { bg: "rgba(92,107,192,.18)",  border: "rgba(92,107,192,.45)",  label: "Scripture" },
  athlete:  { bg: "rgba(255,107,53,.16)",  border: "rgba(255,107,53,.45)",  label: "Athlete" },
  business: { bg: "rgba(255,193,7,.14)",   border: "rgba(255,193,7,.4)",    label: "Leader" },
  life:     { bg: "rgba(76,175,80,.14)",   border: "rgba(76,175,80,.4)",    label: "Wisdom" },
};

// ─── DAILY REQUIRED WORKOUTS ─────────────────────────────────────────────────
// These must ALL be checked off each day. No points per item — completing the
// full set awards the daily workout bonus.
const DAILY_WORKOUT = {
  rocco: {
    bonus: 40, // points awarded for completing ALL items
    items: [
      { id: "dw_laps",    icon: "🏃", label: "2 Laps Around the Neighborhood" },
      { id: "dw_pushups", icon: "💪", label: "20 Push-Ups" },
      { id: "dw_situps",  icon: "🔥", label: "20 Sit-Ups" },
      { id: "dw_mirror",  icon: "🪞", label: "Mirror Balance Holds" },
      { id: "dw_towel",   icon: "🎯", label: "Towel Throws" },
    ],
  },
  milo: {
    bonus: 40,
    items: [
      { id: "dw_pushups",  icon: "💪", label: "Push-Ups" },
      { id: "dw_situps",   icon: "🔥", label: "Sit-Ups" },
      { id: "dw_pullups",  icon: "🏋️", label: "Pull-Ups" },
      { id: "dw_squats",   icon: "🦵", label: "Squats" },
      { id: "dw_laps",     icon: "🏃", label: "2 Laps with Rocco" },
    ],
  },
};

// ─── SHARED CATEGORIES ───────────────────────────────────────────────────────
const SHARED_CATS = [
  { id: "fuel",     icon: "🥗", label: "Eat Right",        points: 10, color: "#4CAF50", hasNote: true,  notePlaceholder: "What did you eat? (e.g. chicken + veggies, protein shake...)" },
  { id: "prayer",   icon: "🙏", label: "Prayer Time",      points: 10, color: "#5C6BC0", hasNote: true,  notePlaceholder: "What did you pray about or reflect on?" },
  { id: "reading",  icon: "📖", label: "Read",             points: 15, color: "#00BCD4", hasNote: true,  notePlaceholder: "What did you read? How far did you get?" },
  { id: "writing",  icon: "✍️", label: "Write",            points: 15, color: "#795548", hasNote: true,  notePlaceholder: "What did you write about?" },
  { id: "math",     icon: "🔢", label: "Math Study",       points: 15, color: "#E91E63", hasNote: true,  notePlaceholder: "What did you work on? (e.g. Khan Academy, worksheet...)" },
  { id: "clean",    icon: "✨", label: "Clean & Organize",  points: 10, color: "#607D8B", hasNote: true,  notePlaceholder: "What did you clean or organize?" },
  { id: "kindness", icon: "💛", label: "Act of Kindness",  points: 20, color: "#FFC107", hasNote: true,  notePlaceholder: "What did you do and for who?" },
  { id: "family",   icon: "🏡", label: "Family Time",      points: 15, color: "#F06292", hasNote: true,  notePlaceholder: "What did you do together?" },
  { id: "outside",  icon: "🌿", label: "Go Outside",       points: 10, color: "#66BB6A", hasNote: false },
  { id: "business", icon: "💡", label: "Business Move",    points: 25, color: "#FF9800", hasNote: true,  notePlaceholder: "What did you do? (sold something, had an idea, made a plan...)" },
];

// ─── PER-KID CONFIG ───────────────────────────────────────────────────────────
const KID_CONFIG = {
  rocco: {
    id: "rocco", name: "Rocco", avatar: "⚾",
    color: "#FF6B35", gradient: "linear-gradient(135deg,#FF6B35,#FF9800)",
    extraWorkouts: [
      { id: "xw_baseball", icon: "⚾", label: "Baseball Practice",      points: 20, hasNote: true, notePlaceholder: "Drills, batting, fielding — what did you work on?" },
      { id: "xw_strength", icon: "🏋️", label: "Extra Strength Session", points: 20, hasNote: true, notePlaceholder: "Which workout did you pick? What exercises? Sets/reps?", link: { url: "https://www.instagram.com/fam_hiit_squad?igsh=MWp5ZTJweDkzb2M5OA==", label: "Browse Workout Videos 📱", icon: "📱" } },
      { id: "xw_sport",    icon: "🏅", label: "Other Sport / Activity", points: 15, hasNote: true, notePlaceholder: "What did you do?" },
    ],
    goals: [
      { id: "g_batting",  icon: "🏏", label: "Batting Goal",      points: 25, hasNote: true, notePlaceholder: "What batting goal did you work on? What progress?" },
      { id: "g_fielding", icon: "🧤", label: "Fielding Goal",     points: 25, hasNote: true, notePlaceholder: "What fielding goal? What did you practice?" },
      { id: "g_personal", icon: "🎯", label: "Personal Goal",     points: 20, hasNote: true, notePlaceholder: "What goal? What progress did you make?" },
      { id: "g_team",     icon: "🤝", label: "Team / Leadership", points: 20, hasNote: true, notePlaceholder: "How did you lead or support your team?" },
    ],
    rewards: [
      { id: "rr1", points: 75,  weekly: true,  icon: "🧸", label: "Squishmallow Pick",   desc: "Pick any squishy you want!" },
      { id: "rr2", points: 100, weekly: true,  icon: "👕", label: "New Clothes",          desc: "$30 toward clothes or kicks" },
      { id: "rr3", points: 125, weekly: true,  icon: "⚾", label: "Baseball Gear",        desc: "$40 toward bats, gloves, or gear" },
      { id: "rr4", points: 200, weekly: false, icon: "🏟️", label: "MLB Game!",            desc: "A real MLB game — you pick the team!" },
      { id: "rr5", points: 300, weekly: false, icon: "🧢", label: "Pro Gear Haul",        desc: "$100 baseball gear shopping spree" },
      { id: "rr8", points: 350, weekly: false, icon: "🧤", label: "Wilson A2000 Glove",   desc: "The real deal — earn it, own it." },
      { id: "rr6", points: 0,   bonus: true,   bonusDate: "June End", icon: "🌟", label: "June Bonus: Squishy Mystery Box", desc: "End-of-June special — mystery squishies!" },
      { id: "rr7", points: 0,   bonus: true,   bonusDate: "July End", icon: "🏆", label: "July Bonus: MLB Stadium Day",     desc: "Full MLB experience — food, gear, the works!" },
    ],
  },
  milo: {
    id: "milo", name: "Milo", avatar: "⚡",
    color: "#00BCD4", gradient: "linear-gradient(135deg,#00BCD4,#9C27B0)",
    extraWorkouts: [
      { id: "xw_strength", icon: "🏋️", label: "Extra Strength Session", points: 20, hasNote: true, notePlaceholder: "What exercises? Sets/reps?" },
      { id: "xw_sport",    icon: "🏅", label: "Other Sport / Activity", points: 15, hasNote: true, notePlaceholder: "What did you do?" },
      { id: "xw_training", icon: "🚴", label: "Extra Training Ride",    points: 20, hasNote: true, notePlaceholder: "Distance, terrain, drills — what was this ride about?" },
    ],
    goals: [
      { id: "g_trading",  icon: "📈", label: "Day Trading Study",  points: 30, hasNote: true, notePlaceholder: "What did you research or trade? What did you learn?" },
      { id: "g_evolvmoto", icon: "🏍️", label: "EvolvMoto Project",  points: 25, hasNote: true, notePlaceholder: "What did you work on for EvolvMoto? Ideas, research, content, builds..." },
      { id: "g_personal", icon: "🎯", label: "Personal Goal",      points: 20, hasNote: true, notePlaceholder: "What goal? What progress?" },
      { id: "g_skill",    icon: "🧠", label: "New Skill",          points: 20, hasNote: true, notePlaceholder: "What did you learn? Tech, coding, anything." },
    ],
    rewards: [
      { id: "mr1", points: 75,  weekly: true,  icon: "⚙️", label: "Ebike Accessory",        desc: "$30 toward an ebike mod or accessory" },
      { id: "mr2", points: 100, weekly: true,  icon: "👕", label: "New Clothes / Kicks",     desc: "$35 toward clothes or sneakers" },
      { id: "mr3", points: 125, weekly: true,  icon: "📈", label: "Trading Account Deposit", desc: "$50 added to your day trading account!" },
      { id: "mr4", points: 200, weekly: false, icon: "⚡", label: "Big Ebike Upgrade",       desc: "$100 toward a major ebike upgrade" },
      { id: "mr5", points: 300, weekly: false, icon: "💰", label: "Major Trading Deposit",   desc: "$150 into your trading account — let it grow!" },
      { id: "mr6", points: 0,   bonus: true,   bonusDate: "June End", icon: "🌟", label: "June Bonus: Ebike Gear Drop",  desc: "End-of-June mystery ebike gear!" },
      { id: "mr7", points: 0,   bonus: true,   bonusDate: "July End", icon: "🏆", label: "July Bonus: Trading Boost",    desc: "$200 into the trading account — big move!" },
    ],
  },
};

const TOGETHER_BONUS = 30;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().split("T")[0];

function weekOf(dateStr) {
  const d = new Date(dateStr), start = new Date("2024-06-08");
  return Math.max(0, Math.floor((d - start) / (7 * 86400000)));
}
function currentWeek() { return weekOf(todayStr()); }

function getStreak(logs) {
  const days = [...new Set(logs.map(l => l.date))].sort().reverse();
  if (!days.length || days[0] !== todayStr()) return 0;
  let s = 1;
  for (let i = 1; i < days.length; i++) {
    if (Math.round((new Date(days[i-1]) - new Date(days[i])) / 86400000) === 1) s++;
    else break;
  }
  return s;
}

function weekLabel(w) {
  const s = new Date("2024-06-08"); s.setDate(s.getDate() + w * 7);
  const e = new Date(s); e.setDate(e.getDate() + 6);
  const fmt = d => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `Week ${w + 1}: ${fmt(s)} – ${fmt(e)}`;
}

const INIT_STATE = () => ({
  rocco: { logs: [], redeemed: [], dailyChecks: {} },
  milo:  { logs: [], redeemed: [], dailyChecks: {} },
});

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(() => {
    try { const s = localStorage.getItem("summerStars_v3"); if (s) return JSON.parse(s); } catch {}
    return INIT_STATE();
  });

  const [activeKid, setActiveKid] = useState("rocco");
  const [view, setView]           = useState("earn");   // earn | rewards | history
  const [logModal, setLogModal]   = useState(null);
  const [togetherMode, setTogetherMode] = useState(false);
  const [note, setNote]           = useState("");
  const [toast, setToast]         = useState(null);
  const [burst, setBurst]         = useState(false);
  const noteRef = useRef();

  useEffect(() => { localStorage.setItem("summerStars_v3", JSON.stringify(data)); }, [data]);

  const kid  = data[activeKid];
  const cfg  = KID_CONFIG[activeKid];
  const dw   = DAILY_WORKOUT[activeKid];
  const logs = kid.logs;

  const totalEarned = logs.reduce((s, l) => s + l.points, 0);
  const totalSpent  = kid.redeemed.filter(r => !r.bonus).reduce((s, r) => s + r.points, 0);
  const available   = totalEarned - totalSpent;
  const streak      = getStreak(logs);

  const cw           = currentWeek();
  const weekPoints   = logs.filter(l => weekOf(l.date) === cw).reduce((s,l) => s + l.points, 0);
  const weekRedeemed = kid.redeemed.filter(r => r.week === cw && !r.bonus);

  const todayLogs = logs.filter(l => l.date === todayStr());
  const todayCats = new Set(todayLogs.map(l => l.catId));

  // Daily workout checklist state
  const todayChecks = kid.dailyChecks[todayStr()] || [];
  const allChecked  = dw.items.every(item => todayChecks.includes(item.id));
  const bonusAlreadyGiven = todayLogs.some(l => l.catId === "daily_workout_complete");

  function toggleDailyCheck(itemId) {
    const current = kid.dailyChecks[todayStr()] || [];
    const updated  = current.includes(itemId)
      ? current.filter(x => x !== itemId)
      : [...current, itemId];

    const newChecks = { ...kid.dailyChecks, [todayStr()]: updated };
    const willComplete = dw.items.every(i => updated.includes(i.id));

    let newLogs = [...kid.logs];
    if (willComplete && !bonusAlreadyGiven) {
      newLogs = [...newLogs, {
        id: Date.now(), catId: "daily_workout_complete",
        label: "Daily Workout Complete!", icon: "🏅",
        points: dw.bonus, date: todayStr(),
        ts: new Date().toISOString(), note: null,
      }];
      setBurst(true); setTimeout(() => setBurst(false), 1400);
      showToast(`🏅 Daily workout done! +${dw.bonus} stars!`);
    }

    setData(d => ({ ...d, [activeKid]: { ...kid, dailyChecks: newChecks, logs: newLogs } }));
  }

  function openLog(cat) {
    setLogModal(cat);
    setNote("");
    setTimeout(() => noteRef.current?.focus(), 80);
  }

  function submitLog() {
    if (!logModal) return;
    const basePoints  = logModal.points;
    const bonusPoints = togetherMode ? TOGETHER_BONUS : 0;
    const totalPts    = basePoints + bonusPoints;

    const makeEntry = (kidId, pts) => ({
      id: Date.now() + (kidId === "rocco" ? 0 : 1),
      catId: logModal.id, label: logModal.label, icon: logModal.icon,
      points: pts, date: todayStr(), ts: new Date().toISOString(),
      note: note.trim() || null,
      together: togetherMode,
    });

    if (togetherMode) {
      // Award both kids
      setData(d => ({
        rocco: { ...d.rocco, logs: [...d.rocco.logs, makeEntry("rocco", totalPts)] },
        milo:  { ...d.milo,  logs: [...d.milo.logs,  makeEntry("milo",  totalPts)] },
      }));
      showToast(`🤝 +${totalPts} ⭐ for BOTH boys! (${basePoints} + ${bonusPoints} together bonus)`);
    } else {
      setData(d => ({ ...d, [activeKid]: { ...kid, logs: [...kid.logs, makeEntry(activeKid, basePoints)] } }));
      showToast(`+${basePoints} ⭐ — ${logModal.label}! 🎉`);
    }

    setBurst(true); setTimeout(() => setBurst(false), 1300);
    setLogModal(null);
  }

  function redeem(reward) {
    if (reward.bonus) {
      setData(d => ({ ...d, [activeKid]: { ...kid, redeemed: [...kid.redeemed, { ...reward, ts: new Date().toISOString(), bonus: true }] } }));
      showToast(`${reward.icon} Bonus claimed! Show Mom!`);
      return;
    }
    if (available < reward.points) return;
    setData(d => ({ ...d, [activeKid]: { ...kid, redeemed: [...kid.redeemed, { ...reward, ts: new Date().toISOString(), week: cw }] } }));
    showToast(`${reward.icon} ${reward.label} — show Mom to collect!`);
  }

  function alreadyRedeemed(r) {
    if (r.bonus)   return kid.redeemed.some(x => x.id === r.id);
    if (r.weekly)  return weekRedeemed.some(x => x.id === r.id);
    return false;
  }

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 4000); }

  const allCats = [...cfg.extraWorkouts, ...cfg.goals, ...SHARED_CATS];

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'Nunito',sans-serif", minHeight:"100vh", background:"#080812", color:"#fff", position:"relative", overflowX:"hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&family=Fredoka+One&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes twinkle{0%{opacity:.1}100%{opacity:.75}}
        @keyframes slideUp{from{transform:translateY(22px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes confetti{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(130px) rotate(600deg);opacity:0}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        .btn-tap{transition:transform .13s,opacity .13s;cursor:pointer}
        .btn-tap:hover{transform:translateY(-2px) scale(1.02)}
        .btn-tap:active{transform:scale(.94)}
        .rc{transition:transform .18s}.rc:hover{transform:scale(1.015)}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:2px}
        textarea{resize:none}
        input,textarea,button{-webkit-tap-highlight-color:transparent}
        .check-row{transition:background .15s}
        .check-row:active{background:rgba(255,255,255,.12)!important}
      `}</style>

      {/* Stars */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        {[...Array(55)].map((_,i)=>(
          <div key={i} style={{position:"absolute",width:Math.random()*2.5+.4+"px",height:Math.random()*2.5+.4+"px",borderRadius:"50%",background:"#fff",top:Math.random()*100+"%",left:Math.random()*100+"%",animation:`twinkle ${Math.random()*3+2}s ${Math.random()*4}s infinite alternate`}}/>
        ))}
      </div>

      {/* Confetti */}
      {burst && <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:998}}>
        {[...Array(22)].map((_,i)=>(
          <div key={i} style={{position:"absolute",top:"30%",left:`${Math.random()*80+10}%`,fontSize:"1.3rem",animation:`confetti ${Math.random()*.8+.4}s ease-out ${Math.random()*.35}s forwards`}}>
            {["⭐","💫","✨","🎉","🏆","🔥","🤝"][Math.floor(Math.random()*7)]}
          </div>
        ))}
      </div>}

      {/* Toast */}
      {toast && <div style={{position:"fixed",top:18,left:"50%",transform:"translateX(-50%)",background:"rgba(20,20,40,.92)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,.2)",borderRadius:16,padding:"11px 20px",fontFamily:"'Fredoka One'",fontSize:".95rem",color:"#fff",zIndex:1000,animation:"slideUp .22s ease",whiteSpace:"nowrap",maxWidth:"90vw",textAlign:"center"}}>
        {toast}
      </div>}

      {/* Log Modal */}
      {logModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(10px)",zIndex:900,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={e=>e.target===e.currentTarget&&setLogModal(null)}>
          <div style={{background:"#13132a",borderRadius:"22px 22px 0 0",padding:"26px 22px 44px",width:"100%",maxWidth:520,animation:"slideUp .22s ease",border:"1px solid rgba(255,255,255,.1)"}}>

            {/* Together toggle */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:"1.9rem"}}>{logModal.icon}</span>
                <div>
                  <div style={{fontFamily:"'Fredoka One'",fontSize:"1.1rem"}}>{logModal.label}</div>
                  <div style={{opacity:.5,fontSize:".72rem"}}>+{logModal.points} ⭐ base</div>
                </div>
              </div>
              <button onClick={()=>setTogetherMode(t=>!t)} style={{
                background: togetherMode ? "linear-gradient(135deg,#FF6B35,#00BCD4)" : "rgba(255,255,255,.08)",
                border:"none",borderRadius:12,padding:"8px 14px",color:"#fff",cursor:"pointer",
                fontFamily:"'Fredoka One'",fontSize:".82rem",transition:"all .2s",
                boxShadow: togetherMode ? "0 0 16px rgba(255,107,53,.5)" : "none"
              }}>
                🤝 Together{togetherMode ? ` +${TOGETHER_BONUS}!` : "?"}
              </button>
            </div>

            {togetherMode && <div style={{background:"linear-gradient(135deg,rgba(255,107,53,.15),rgba(0,188,212,.15))",border:"1px solid rgba(255,200,100,.3)",borderRadius:14,padding:"10px 14px",marginBottom:14,fontSize:".82rem",fontFamily:"'Fredoka One'",color:"#FFC107",textAlign:"center"}}>
              🤝 Both boys earn +{logModal.points + TOGETHER_BONUS} ⭐ each!
            </div>}

            {logModal.hasNote && <>
              {logModal.link && (
                <a href={logModal.link.url} target="_blank" rel="noopener noreferrer" style={{
                  display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                  background:"linear-gradient(135deg,rgba(131,58,180,.4),rgba(253,29,29,.3),rgba(252,176,69,.3))",
                  border:"1px solid rgba(253,29,29,.35)", borderRadius:12,
                  padding:"11px 16px", marginBottom:12, color:"#fff",
                  fontFamily:"'Fredoka One'", fontSize:".9rem", textDecoration:"none",
                  transition:"opacity .2s",
                }}>
                  <span style={{fontSize:"1.1rem"}}>📱</span>
                  {logModal.link.label}
                  <span style={{opacity:.6, fontSize:".7rem"}}>↗</span>
                </a>
              )}
              <div style={{opacity:.55,fontSize:".8rem",marginBottom:7}}>What did you do? <span style={{color:"#FF6B35"}}>(required)</span></div>
              <textarea ref={noteRef} value={note} onChange={e=>setNote(e.target.value)}
                placeholder={logModal.notePlaceholder||"Describe what you did..."}
                style={{width:"100%",minHeight:82,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.13)",borderRadius:12,padding:"11px 14px",color:"#fff",fontSize:".88rem",fontFamily:"'Nunito'",outline:"none",boxSizing:"border-box"}}/>
            </>}
            {!logModal.hasNote && <div style={{opacity:.55,fontSize:".84rem",marginBottom:16}}>Tap confirm to log this and earn your stars!</div>}

            <div style={{display:"flex",gap:10,marginTop:16}}>
              <button onClick={()=>setLogModal(null)} style={{flex:1,padding:"13px",borderRadius:14,background:"rgba(255,255,255,.07)",border:"none",color:"#fff",fontFamily:"'Fredoka One'",fontSize:".95rem",cursor:"pointer"}}>
                Cancel
              </button>
              <button onClick={submitLog} disabled={logModal.hasNote && !note.trim()} style={{
                flex:2,padding:"13px",borderRadius:14,
                background:(logModal.hasNote&&!note.trim())?"rgba(255,255,255,.1)":cfg.gradient,
                border:"none",color:"#fff",fontFamily:"'Fredoka One'",fontSize:"1rem",
                cursor:(logModal.hasNote&&!note.trim())?"not-allowed":"pointer",
                opacity:(logModal.hasNote&&!note.trim())?.45:1,
                boxShadow: !(logModal.hasNote&&!note.trim()) ? `0 4px 18px ${cfg.color}55` : "none"
              }}>
                Log! +{logModal.points + (togetherMode ? TOGETHER_BONUS : 0)} ⭐
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN SCROLL ── */}
      <div style={{position:"relative",zIndex:1,maxWidth:520,margin:"0 auto",paddingBottom:100}}>

        {/* Header */}
        <div style={{textAlign:"center",padding:"26px 20px 10px"}}>
          <div style={{fontFamily:"'Fredoka One'",fontSize:"1.85rem",background:cfg.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            ☀️ Summer Stars
          </div>
        </div>

        {/* Daily Quote Banner */}
        <QuoteBanner/>

        {/* Kid tabs */}
        <div style={{display:"flex",gap:10,padding:"0 20px 18px"}}>
          {Object.values(KID_CONFIG).map(c=>{
            const isA = activeKid===c.id;
            return <button key={c.id} onClick={()=>setActiveKid(c.id)} style={{
              flex:1,padding:"13px 8px",borderRadius:18,
              background:isA?c.gradient:"rgba(255,255,255,.07)",
              border:isA?"none":"1px solid rgba(255,255,255,.1)",
              color:"#fff",cursor:"pointer",fontFamily:"'Fredoka One'",fontSize:"1.1rem",
              transition:"all .2s",boxShadow:isA?`0 4px 20px ${c.color}55`:"none"
            }}>
              <div style={{fontSize:"1.5rem"}}>{c.avatar}</div>
              <div style={{fontSize:".88rem",marginTop:3}}>{c.name}</div>
            </button>;
          })}
        </div>

        {/* Stats */}
        <div style={{margin:"0 20px 18px",background:"rgba(255,255,255,.05)",borderRadius:22,padding:18,border:"1px solid rgba(255,255,255,.08)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div>
              <div style={{fontFamily:"'Fredoka One'",fontSize:"2.6rem",lineHeight:1,background:cfg.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{available}</div>
              <div style={{opacity:.5,fontSize:".73rem",marginTop:2}}>stars available</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Fredoka One'",fontSize:"1.8rem"}}>🔥 {streak}</div>
              <div style={{opacity:.5,fontSize:".73rem"}}>day streak</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Fredoka One'",fontSize:"1.7rem"}}>{weekPoints} ⭐</div>
              <div style={{opacity:.5,fontSize:".73rem"}}>this week</div>
            </div>
          </div>
          <div style={{background:"rgba(255,255,255,.08)",borderRadius:99,height:7,overflow:"hidden",marginBottom:5}}>
            <div style={{width:`${Math.min(100,(available/75)*100)}%`,height:"100%",background:cfg.gradient,borderRadius:99,transition:"width .6s ease"}}/>
          </div>
          <div style={{opacity:.38,fontSize:".68rem"}}>{weekLabel(cw)} · {todayLogs.length} win{todayLogs.length!==1?"s":""} today</div>
        </div>

        {/* Nav */}
        <div style={{display:"flex",gap:8,padding:"0 20px 20px"}}>
          {[["earn","🏆 Earn"],["rewards","🎁 Rewards"],["history","📋 Log"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{
              flex:1,padding:"10px 4px",borderRadius:12,
              background:view===v?"rgba(255,255,255,.14)":"rgba(255,255,255,.05)",
              border:view===v?"1px solid rgba(255,255,255,.22)":"1px solid transparent",
              color:"#fff",cursor:"pointer",fontSize:".8rem",fontWeight:700,
              fontFamily:"'Nunito'",transition:"all .2s"
            }}>{l}</button>
          ))}
        </div>

        {/* ══ EARN ══ */}
        {view==="earn" && <div style={{padding:"0 20px"}}>

          {/* ── DAILY REQUIRED WORKOUT ── */}
          <div style={{
            background: allChecked
              ? "linear-gradient(135deg,rgba(76,175,80,.2),rgba(76,175,80,.05))"
              : "rgba(255,255,255,.05)",
            border: allChecked
              ? "1px solid rgba(76,175,80,.5)"
              : "1px solid rgba(255,255,255,.1)",
            borderRadius:22,marginBottom:24,overflow:"hidden"
          }}>
            <div style={{padding:"16px 18px 12px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontFamily:"'Fredoka One'",fontSize:"1.05rem"}}>🏅 Daily Workout</div>
                  <div style={{opacity:.45,fontSize:".72rem",marginTop:2}}>Check off each one — finish all for +{dw.bonus} ⭐</div>
                </div>
                {allChecked
                  ? <div style={{fontFamily:"'Fredoka One'",fontSize:".85rem",color:"#4CAF50",background:"rgba(76,175,80,.15)",borderRadius:10,padding:"5px 12px"}}>Done! ✓</div>
                  : <div style={{fontFamily:"'Fredoka One'",fontSize:".82rem",opacity:.5}}>{todayChecks.length}/{dw.items.length}</div>
                }
              </div>
              {bonusAlreadyGiven && <div style={{marginTop:8,fontSize:".75rem",color:"#4CAF50",opacity:.8}}>+{dw.bonus} ⭐ awarded today! 🎉</div>}
            </div>
            {dw.items.map((item,idx)=>{
              const checked = todayChecks.includes(item.id);
              return (
                <div key={item.id} className="check-row" onClick={()=>toggleDailyCheck(item.id)} style={{
                  display:"flex",alignItems:"center",gap:14,padding:"13px 18px",
                  background:checked?"rgba(76,175,80,.08)":"transparent",
                  borderBottom:idx<dw.items.length-1?"1px solid rgba(255,255,255,.05)":"none",
                  cursor:"pointer",transition:"background .15s"
                }}>
                  <div style={{
                    width:24,height:24,borderRadius:8,flexShrink:0,
                    background:checked?"#4CAF50":"rgba(255,255,255,.1)",
                    border:checked?"none":"1px solid rgba(255,255,255,.2)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:".85rem",transition:"all .2s"
                  }}>{checked?"✓":""}</div>
                  <span style={{fontSize:"1.2rem"}}>{item.icon}</span>
                  <span style={{fontSize:".88rem",fontWeight:checked?700:400,opacity:checked?.7:1,flex:1,textDecoration:checked?"line-through":"none"}}>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* ── TOGETHER BANNER ── */}
          <div onClick={()=>setTogetherMode(t=>!t)} style={{
            background: togetherMode
              ? "linear-gradient(135deg,rgba(255,107,53,.25),rgba(0,188,212,.25))"
              : "rgba(255,255,255,.05)",
            border: togetherMode ? "1px solid rgba(255,200,100,.4)" : "1px solid rgba(255,255,255,.1)",
            borderRadius:16,padding:"12px 18px",marginBottom:24,cursor:"pointer",
            display:"flex",alignItems:"center",gap:12,transition:"all .2s"
          }}>
            <span style={{fontSize:"1.6rem"}}>🤝</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Fredoka One'",fontSize:".95rem"}}>Together Mode {togetherMode?"ON 🔥":"OFF"}</div>
              <div style={{opacity:.5,fontSize:".72rem",marginTop:2}}>Tap to toggle — doing it together? Both boys get +{TOGETHER_BONUS} bonus stars each!</div>
            </div>
            <div style={{
              width:44,height:24,borderRadius:99,
              background:togetherMode?"linear-gradient(90deg,#FF6B35,#00BCD4)":"rgba(255,255,255,.12)",
              position:"relative",transition:"all .3s",flexShrink:0
            }}>
              <div style={{position:"absolute",top:3,left:togetherMode?20:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .25s"}}/>
            </div>
          </div>

          {/* ── EXTRA WORKOUTS ── */}
          <SectionHeader label="💪 Extra Workouts" sub="Beyond the daily required set — log additional training"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
            {cfg.extraWorkouts.map(cat=>(
              <CatButton key={cat.id} cat={cat} done={todayCats.has(cat.id)} color={cfg.color} gradient={cfg.gradient} together={togetherMode} onTap={()=>openLog(cat)}/>
            ))}
          </div>

          {/* ── GOALS ── */}
          <SectionHeader label="🎯 Goals" sub="Log progress on your personal goals"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
            {cfg.goals.map(cat=>(
              <CatButton key={cat.id} cat={cat} done={todayCats.has(cat.id)} color={cfg.color} gradient={cfg.gradient} together={togetherMode} onTap={()=>openLog(cat)}/>
            ))}
          </div>

          {/* ── DAILY WINS ── */}
          <SectionHeader label="🌟 Daily Wins" sub="All the other good stuff"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {SHARED_CATS.map(cat=>(
              <CatButton key={cat.id} cat={cat} done={todayCats.has(cat.id)} color={cfg.color} gradient={cfg.gradient} together={togetherMode} onTap={()=>openLog(cat)}/>
            ))}
          </div>
        </div>}

        {/* ══ REWARDS ══ */}
        {view==="rewards" && <div style={{padding:"0 20px"}}>
          <div style={{fontFamily:"'Fredoka One'",fontSize:"1rem",marginBottom:3,opacity:.7}}>Weekly Rewards</div>
          <div style={{opacity:.45,fontSize:".76rem",marginBottom:14}}>One per week · <span style={{color:cfg.color,fontWeight:700}}>{available} ⭐ available</span></div>
          {cfg.rewards.filter(r=>r.weekly).map(r=>(
            <RewardCard key={r.id} r={r} available={available} redeemed={alreadyRedeemed(r)} onRedeem={()=>redeem(r)} gradient={cfg.gradient} color={cfg.color}/>
          ))}

          <div style={{fontFamily:"'Fredoka One'",fontSize:"1rem",margin:"22px 0 3px",opacity:.7}}>Big Rewards</div>
          <div style={{opacity:.45,fontSize:".76rem",marginBottom:14}}>Save up — these are worth it</div>
          {cfg.rewards.filter(r=>!r.weekly&&!r.bonus).map(r=>(
            <RewardCard key={r.id} r={r} available={available} redeemed={alreadyRedeemed(r)} onRedeem={()=>redeem(r)} gradient={cfg.gradient} color={cfg.color}/>
          ))}

          <div style={{fontFamily:"'Fredoka One'",fontSize:"1rem",margin:"22px 0 3px",opacity:.7}}>🎁 End-of-Month Bonuses</div>
          <div style={{opacity:.45,fontSize:".76rem",marginBottom:14}}>Show up every day — these are your reward</div>
          {cfg.rewards.filter(r=>r.bonus).map(r=>(
            <div key={r.id} className="rc" style={{background:"rgba(255,200,0,.07)",border:"1px solid rgba(255,200,0,.2)",borderRadius:18,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <div style={{fontSize:"1.8rem",minWidth:36}}>{r.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Fredoka One'",fontSize:".93rem"}}>{r.label}</div>
                <div style={{opacity:.55,fontSize:".72rem",marginTop:2}}>{r.desc}</div>
                <div style={{fontFamily:"'Fredoka One'",fontSize:".75rem",color:"#FFC107",marginTop:4}}>📅 {r.bonusDate}</div>
              </div>
              {alreadyRedeemed(r)
                ? <div style={{background:"rgba(255,255,255,.08)",borderRadius:10,padding:"7px 12px",fontSize:".75rem",fontFamily:"'Fredoka One'",opacity:.55}}>Claimed ✓</div>
                : <button onClick={()=>redeem(r)} style={{background:"linear-gradient(135deg,#FFC107,#FF9800)",border:"none",borderRadius:12,padding:"9px 14px",color:"#000",fontFamily:"'Fredoka One'",fontSize:".82rem",cursor:"pointer",fontWeight:800}}>Claim!</button>
              }
            </div>
          ))}
        </div>}

        {/* ══ HISTORY ══ */}
        {view==="history" && <div style={{padding:"0 20px"}}>
          <div style={{fontFamily:"'Fredoka One'",fontSize:"1rem",marginBottom:14,opacity:.7}}>Your Summer Log 📋</div>

          {logs.length>0 && <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:18}}>
            {allCats.concat([{id:"daily_workout_complete",icon:"🏅",label:"Daily Workout",color:"#4CAF50"}]).map(cat=>{
              const count = logs.filter(l=>l.catId===cat.id).length;
              if(!count) return null;
              return <div key={cat.id} style={{background:`${cat.color||cfg.color}18`,border:`1px solid ${cat.color||cfg.color}44`,borderRadius:10,padding:"5px 11px",fontSize:".76rem",display:"flex",alignItems:"center",gap:5}}>
                <span>{cat.icon}</span><b style={{fontFamily:"'Fredoka One'"}}>{count}×</b><span style={{opacity:.6}}>{cat.label}</span>
              </div>;
            })}
          </div>}

          {logs.length===0
            ? <div style={{textAlign:"center",opacity:.4,padding:"48px 20px"}}><div style={{fontSize:"3rem"}}>🌱</div><div style={{fontFamily:"'Fredoka One'",marginTop:10}}>No wins yet — go earn some stars!</div></div>
            : [...logs].reverse().map(log=>(
                <div key={log.id} style={{background:"rgba(255,255,255,.05)",borderRadius:14,padding:"12px 16px",marginBottom:9,animation:"fadeIn .2s ease",border:log.together?"1px solid rgba(255,200,100,.25)":"1px solid transparent"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:log.note?6:0}}>
                    <span style={{fontSize:"1.15rem"}}>{log.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:".86rem"}}>{log.label} {log.together&&<span style={{opacity:.7,fontSize:".72rem"}}>🤝 together</span>}</div>
                      <div style={{opacity:.4,fontSize:".68rem"}}>{new Date(log.ts).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</div>
                    </div>
                    <div style={{fontFamily:"'Fredoka One'",color:"#FFC107",fontSize:".9rem"}}>+{log.points}⭐</div>
                  </div>
                  {log.note && <div style={{background:"rgba(255,255,255,.05)",borderRadius:9,padding:"7px 12px",fontSize:".78rem",opacity:.7,lineHeight:1.5,fontStyle:"italic"}}>"{log.note}"</div>}
                </div>
              ))
          }
        </div>}

      </div>
    </div>
  );
}

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

function QuoteBanner() {
  const quote = getDailyQuote();
  const theme = CATEGORY_COLORS[quote.category];
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 120); }, []);

  return (
    <div onClick={() => setExpanded(e => !e)} style={{
      margin: "0 20px 18px",
      background: theme.bg,
      border: `1px solid ${theme.border}`,
      borderRadius: 18,
      padding: expanded ? "16px 18px 18px" : "14px 18px",
      cursor: "pointer",
      transition: "all .35s ease",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* shimmer line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)`,
        opacity: .8,
      }}/>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: "1.35rem", flexShrink: 0, marginTop: 1 }}>{quote.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Nunito'", fontWeight: 700,
            fontSize: expanded ? ".9rem" : ".82rem",
            lineHeight: 1.5, color: "#fff",
            display: expanded ? "block" : "-webkit-box",
            WebkitLineClamp: expanded ? "unset" : 2,
            WebkitBoxOrient: "vertical",
            overflow: expanded ? "visible" : "hidden",
            transition: "font-size .2s",
          }}>
            "{quote.text}"
          </div>
          {expanded && (
            <div style={{
              marginTop: 8, fontFamily: "'Fredoka One'",
              fontSize: ".78rem", opacity: .65,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>— {quote.source}</span>
            </div>
          )}
        </div>
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <div style={{
            fontFamily: "'Fredoka One'", fontSize: ".6rem",
            background: theme.border, borderRadius: 99,
            padding: "2px 8px", opacity: .9, whiteSpace: "nowrap",
          }}>{theme.label}</div>
          <div style={{ fontSize: ".65rem", opacity: .4 }}>{expanded ? "▲" : "▼"}</div>
        </div>
      </div>

      {!expanded && (
        <div style={{ marginTop: 5, fontFamily: "'Fredoka One'", fontSize: ".65rem", opacity: .45 }}>
          — {quote.source} · tap to read
        </div>
      )}
    </div>
  );
}

function SectionHeader({label,sub}){
  return <div style={{marginBottom:11}}>
    <div style={{fontFamily:"'Fredoka One'",fontSize:"1rem"}}>{label}</div>
    {sub&&<div style={{opacity:.42,fontSize:".71rem",marginTop:2}}>{sub}</div>}
  </div>;
}

function CatButton({cat,done,color,gradient,together,onTap}){
  const baseColor = cat.color||color;
  return (
    <button className="btn-tap" onClick={onTap} style={{
      background:done?`${baseColor}1a`:"rgba(255,255,255,.05)",
      border:done?`2px solid ${baseColor}`:"2px solid rgba(255,255,255,.08)",
      borderRadius:18,padding:"14px 12px",color:"#fff",textAlign:"left",
      position:"relative",width:"100%"
    }}>
      {done && <div style={{position:"absolute",top:7,right:8,background:baseColor,borderRadius:99,padding:"2px 7px",fontSize:".6rem",fontWeight:800}}>✓ done</div>}
      {together && !done && <div style={{position:"absolute",top:7,right:8,background:"rgba(255,200,0,.25)",borderRadius:99,padding:"2px 7px",fontSize:".6rem",color:"#FFC107",fontWeight:800}}>🤝</div>}
      <div style={{fontSize:"1.55rem",marginBottom:5}}>{cat.icon}</div>
      <div style={{fontFamily:"'Fredoka One'",fontSize:".9rem",lineHeight:1.2}}>{cat.label}</div>
      {cat.desc&&<div style={{opacity:.45,fontSize:".65rem",marginTop:3,lineHeight:1.35}}>{cat.desc||""}</div>}
      <div style={{fontFamily:"'Fredoka One'",fontSize:".82rem",color:baseColor,marginTop:8}}>
        +{cat.points}{together?<span style={{color:"#FFC107"}}> +{TOGETHER_BONUS}🤝</span>:""} ⭐
      </div>
    </button>
  );
}

function RewardCard({r,available,redeemed,onRedeem,gradient,color}){
  const can = available>=r.points && !redeemed;
  return (
    <div className="rc" style={{background:can?"rgba(255,255,255,.08)":"rgba(255,255,255,.03)",border:can?"1px solid rgba(255,255,255,.18)":"1px solid rgba(255,255,255,.06)",borderRadius:18,padding:"13px 15px",display:"flex",alignItems:"center",gap:12,marginBottom:10,opacity:redeemed?.5:1}}>
      <div style={{fontSize:"1.7rem",minWidth:34}}>{r.icon}</div>
      <div style={{flex:1}}>
        <div style={{fontFamily:"'Fredoka One'",fontSize:".92rem"}}>{r.label}</div>
        <div style={{opacity:.5,fontSize:".7rem",marginTop:2,lineHeight:1.4}}>{r.desc}</div>
        <div style={{fontFamily:"'Fredoka One'",fontSize:".75rem",color:"#FFC107",marginTop:4}}>{r.points} ⭐</div>
      </div>
      {redeemed
        ? <div style={{background:"rgba(255,255,255,.07)",borderRadius:10,padding:"7px 11px",fontSize:".74rem",fontFamily:"'Fredoka One'",opacity:.55}}>Done ✓</div>
        : <button onClick={onRedeem} disabled={!can} style={{background:can?gradient:"rgba(255,255,255,.07)",border:"none",borderRadius:12,padding:"9px 13px",color:can?"#fff":"rgba(255,255,255,.35)",fontFamily:"'Fredoka One'",fontSize:".78rem",cursor:can?"pointer":"not-allowed",whiteSpace:"nowrap",boxShadow:can?`0 3px 14px ${color}44`:"none"}}>
            {can?"Redeem!":`Need ${r.points-available} more`}
          </button>
      }
    </div>
  );
}
