/**
 * DATA REAL — Bridge from =notes vault to PAI Pulse Observatory
 *
 * Reads: PAI/TELOS.md, PAI/DA-IDENTITIES/*.md, fleet inbox, health dashboard
 * Outputs: TELOS object in the shape PAI expects
 *
 * To regenerate: edit PAI/TELOS.md or agent identities, then re-run this script.
 * But since PAI is a Next.js + dev build, edits to this file auto-reload.
 */

import type { Telos } from "./data";

// ── Dimensions: derived from goal completion state ──────────────
// We score each dimension 0-100 based on how many goals in that
// dimension have measurable progress. Approximate / honest.
export const REAL_DIMENSIONS = [
  { id:"health",        label:"Health",        cur:55, ideal:90, velo:+1.2, color:"--health"          }, // rib recovery in progress
  { id:"money",         label:"Money",         cur:45, ideal:95, velo:+0.5, color:"--money"           }, // PFL, no income, portfolio not shipped
  { id:"freedom",       label:"Freedom",       cur:60, ideal:90, velo:+2.0, color:"--freedom"         }, // on PFL, own schedule, building for independence
  { id:"creative",      label:"Creative",      cur:72, ideal:85, velo:+3.5, color:"--creative"        }, // high output today, fleet building, PAI integration
  { id:"relationships", label:"Relationships", cur:82, ideal:90, velo:+0.2, color:"--relationships"     }, // family focus with Robin, Katherine
  { id:"rhythms",       label:"Rhythms",       cur:65, ideal:85, velo:+1.5, color:"--rhythms"         }, // PT 2x/week, sessions regular, could tighten
  { id:"career",        label:"Career",        cur:40, ideal:85, velo:+1.0, color:"--career"          }, // between jobs, building portfolio
  { id:"learning",      label:"Learning",      cur:75, ideal:80, velo:+4.0, color:"--learning"        }, // PAI architecture deep-dive, Nate Jones input
  { id:"environment",   label:"Environment",   cur:50, ideal:75, velo:+0.8, color:"--environment"     }, // Ardmore home, Sea Ranch project on deck
  { id:"community",     label:"Community",     cur:60, ideal:80, velo:+2.5, color:"--community"       }, // fleet coordination active, GitNexus, open-source
  { id:"legacy",        label:"Legacy",        cur:35, ideal:70, velo:+2.0, color:"--legacy"          }, // fleet architecture as reference impl = nascent
  { id:"play",          label:"Play",          cur:30, ideal:70, velo:+0.5, color:"--play"            }, // baby Robin = play, but structured fun low
  { id:"spirit",        label:"Spirit",        cur:70, ideal:85, velo:+1.8, color:"--spirit"          }, // building something meaningful, curious, engaged
] as const;

// ── Snapshot: how Jack felt today (best guess from session) ───
export const REAL_SNAPSHOT = [
  { id:"mood",   label:"Mood",   v:8.2, of:10 },   // high energy session, real progress
  { id:"energy", label:"Energy", v:6.5, of:10 },   // rib recovery limits physical energy
  { id:"focus",  label:"Focus",  v:8.8, of:10 },   // deep flow on PAI integration
] as const;

// ── Problems (systemic issues above mission) ────────────────────
export const REAL_PROBLEMS = [
  {
    id:"PB0", title:"OB1 Supabase auth keeps failing (401)",
    note:"External brain (Supabase) authentication rots. OB1 unreliable since Mar 2026. Fleet memory degrades when OB1 is down.",
    severity:"high" as const, affects:["M0","M1"]
  },
  {
    id:"PB1", title:"Context fragmentation across 18 repos + vault",
    note:"Portfolio scattered across too many projects. No clear prioritization. ISA framework may help but is not yet adopted.",
    severity:"high" as const, affects:["M0"]
  },
  {
    id:"PB2", title:"Rib recovery constrains physical capacity",
    note:"PT 2x/week with Ryan Fraley. Cannot skip. Return to full work capacity delayed until ~Aug 2026.",
    severity:"med" as const, affects:["M2"]
  },
  {
    id:"PB3", title:"Income gap during PFL bonding period",
    note:"On Paid Family Leave since Jan 2026. No active salary. Portfolio revenue not yet generating. Need interim plan.",
    severity:"med" as const, affects:["M1"]
  },
] as const;

// ── Missions ────────────────────────────────────────────────────
export const REAL_MISSIONS = [
  { id:"M0", title:"Live well and stay curious", horizon:"lifetime" },
  { id:"M1", title:"Build durable multi-agent infrastructure that outlasts any vendor", horizon:"10y", active:true, addresses:["PB0","PB1"] },
  { id:"M2", title:"Return to full physical + financial capacity for family", horizon:"1y", addresses:["PB2","PB3"] },
] as const;

// ── Goals (from TELOS.md, filtered to active, scored honestly) ─
export const REAL_GOALS = [
  { id:"G0",  title:"Fleet fully autonomous (self-heal, self-coordinate)", kpi:"Partial", target:"Dec 2026", pct:35, delta:+5,   dims:["community","creative"],         metrics:["MT0"] },
  { id:"G1",  title:"OB1 brain repaired and reliable",                   kpi:"401",     target:"Jul 2026", pct:10, delta:+2,   dims:["career","learning"],              metrics:["MT1"] },
  { id:"G2",  title:"One shipped product generating revenue",            kpi:"0/18",    target:"Dec 2026", pct:5,  delta:+1,   dims:["money","creative"],               metrics:["MT2"] },
  { id:"G3",  title:"Rib recovery complete",                             kpi:"In PT",   target:"Aug 2026", pct:60, delta:+3,   dims:["health","rhythms"],               metrics:["MT3"] },
  { id:"G4",  title:"PAI infrastructure better than Panasonic Well",     kpi:"Building",target:"May 2027", pct:40, delta:+8,   dims:["career","legacy"],                  metrics:["MT4"] },
  { id:"G5",  title:"Sustainable family rhythm (Jack + Katherine + Robin)",kpi:"Good",    target:"ongoing",  pct:75, delta:+1,   dims:["relationships","rhythms"],          metrics:["MT5"] },
  { id:"G6",  title:"Fleet architecture adopted by others",               kpi:"11 agents",target:"2031",    pct:15, delta:+3,   dims:["legacy","community"],             metrics:["MT6"] },
  { id:"G7",  title:"Financial independence",                             kpi:"PFL",     target:"2031",    pct:20, delta:+1,   dims:["money","freedom"],                metrics:["MT7"] },
] as const;

// ── Metrics (tracked independently) ───────────────────────────────
export const REAL_METRICS = [
  { id:"MT0", label:"Fleet uptime",         value:"7/7",   unit:"agents", trend:+1,    spark:[3,3,4,4,5,6,7,7,7],          feeds:["G0"],    color:"--community" },
  { id:"MT1", label:"OB1 auth status",      value:"401",   unit:"",       trend:0,     spark:[200,200,401,401,401,401,401], feeds:["G1"],    color:"--bad"         },
  { id:"MT2", label:"Shipped products",       value:"0",     unit:"",       trend:0,     spark:[0,0,0,0,0,0,0,0,0],          feeds:["G2"],    color:"--money"       },
  { id:"MT3", label:"PT sessions completed",  value:"6",     unit:"",       trend:+2,    spark:[0,1,2,3,4,5,6],              feeds:["G3"],    color:"--health"      },
  { id:"MT4", label:"Fleet architecture maturity", value:"v2.1", unit:"",  trend:+8,    spark:[0,5,10,15,20,25,30,40],      feeds:["G4"],    color:"--creative"    },
  { id:"MT5", label:"Family time quality",  value:"8.5",   unit:"/10",    trend:+1,    spark:[7,8,8,8,8,8,8,8,8,8,9],      feeds:["G5"],    color:"--relationships" },
  { id:"MT6", label:"GitHub stars (fleet)", value:"0",     unit:"",       trend:+3,    spark:[0,0,0,0,0,0,0,0,0,0,0,0],   feeds:["G6"],    color:"--legacy"      },
  { id:"MT7", label:"Portfolio runway",     value:"PFL",   unit:"",       trend:+1,    spark:[0,0,0,0,0,0,0],              feeds:["G7"],    color:"--money"       },
] as const;

// ── Challenges ──────────────────────────────────────────────────
export const REAL_CHALLENGES = [
  { id:"C0", title:"OB1 Supabase auth (401) — Blocked",            note:"Service role token needs rotation. Blocking fleet auto-brief.", blocks:["G0","G1"] },
  { id:"C1", title:"Rib surgery recovery — In progress",         note:"PT with Ryan Fraley 2x/week. Cannot skip. Limits work capacity.", blocks:["G3","G5"] },
  { id:"C2", title:"PFL / income gap — Managing",                  note:"Return to work ~Aug 2026. Portfolio revenue not yet generating.", blocks:["G2","G7"] },
  { id:"C3", title:"Fleet token hygiene — Active",                 note:"All tokens in SOPS now, but quarterly rotation ritual not defined.", blocks:["G0"] },
  { id:"C4", title:"18-repo portfolio focus — Unsolved",           note:"No prioritization framework. ISA may help but not yet adopted.", blocks:["G2","G4"] },
] as const;

// ── Strategies ──────────────────────────────────────────────────
export const REAL_STRATEGIES = [
  { id:"S0", title:"TELOS + ISA — define done before starting",     overcomes:["C4"],      implements:["G2","G4"], active:true },
  { id:"S1", title:"SOPS token rotation ritual — quarterly cadence", overcomes:["C3"],    implements:["G0"] },
  { id:"S2", title:"Physical therapy discipline — 2x/week no skips", overcomes:["C1"],    implements:["G3"] },
  { id:"S3", title:"Portfolio tracer bullets — ship one thing end-to-end", overcomes:["C4"], implements:["G2"] },
  { id:"S4", title:"OB1 repair sprint — rotate key + test auto-brief", overcomes:["C0"],  implements:["G1"] },
  { id:"S5", title:"Family rhythm blocks — calendar-protected time",   overcomes:["C2"],    implements:["G5"] },
  { id:"S6", title:"Fleet show-and-tell — publish architecture decisions", overcomes:["C0"], implements:["G6"] },
] as const;

// ── Projects + Work (from recent fleet activity) ──────────────
export const REAL_PROJECTS = [
  { id:"P0", title:"PAI Concept Integration",                strategy:"S0", dims:["creative","learning"], status:"green" as const,
    work:[
      { id:"W0", title:"Design PAI logo SVG",                    strategy:"S0", eta:"done",    status:"green" as const, owner:"Hermes" },
      { id:"W1", title:"Architecture review vs =notes fleet",     strategy:"S0", eta:"done",    status:"green" as const, owner:"Hermes" },
      { id:"W2", title:"Create PAI/ dir with TELOS + ALGORITHM", strategy:"S0", eta:"done",    status:"green" as const, owner:"Hermes" },
      { id:"W3", title:"Wire real data into PAI Pulse",          strategy:"S0", eta:"today",   status:"green" as const, owner:"Hermes" },
    ]},
  { id:"P1", title:"Fleet Topology Roster",               strategy:"S1", dims:["community","career"], status:"amber" as const,
    work:[
      { id:"W4", title:"Ratify fleet roster (7 of 11 votes cast)", strategy:"S1", eta:"1d", status:"amber" as const, owner:"neo-pt" },
      { id:"W5", title:"Fix Zoe 401 (token rotation)",             strategy:"S1", eta:"1d", status:"red" as const, owner:"Olivier" },
    ]},
  { id:"P2", title:"Command Centre Dashboard",              strategy:"S6", dims:["creative","legacy"], status:"green" as const,
    work:[
      { id:"W6", title:"Astro /pulse page with scheduled briefs",  strategy:"S6", eta:"done", status:"green" as const, owner:"PT" },
    ]},
  { id:"P3", title:"OB1 Brain Repair",                    strategy:"S4", dims:["career","learning"], status:"red" as const,
    work:[
      { id:"W7", title:"Rotate Supabase service role key",         strategy:"S4", eta:"blocked", status:"red" as const, owner:"Hermes" },
    ]},
] as const;

// ── Team (from =notes DA-IDENTITIES + fleet knowledge) ─────────
export const REAL_TEAM = [
  { id:"T0", name:"Jack Reis",      role:"Principal / Human-in-the-loop", kind:"human" as const,
    owns:["P0","P1","P2","P3"], avatar:"J",
    note:"Sets mission, makes calls. Senior UX Designer, on PFL bonding with baby Robin. Lives in Ardmore, OK." },
  { id:"T1", name:"Hermes",         role:"Gateway coordinator + fleet orchestrator", kind:"agent" as const,
    owns:["P0","P3"], avatar:"H",
    note:"Pi harness, direct chat. Auto-briefs from OB1+OBn, writes handoffs, fleet inbox updates." },
  { id:"T2", name:"Klaude",         role:"Discord responder + file/exec agent", kind:"agent" as const,
    owns:["P1"], avatar:"K",
    note:"OpenClaw node :18792, Discord surface. Wry voice. Exec approval gate always on." },
  { id:"T3", name:"Olivier/Zoe",    role:"Gateway proxy + scheduled briefs", kind:"agent" as const,
    owns:["P1"], avatar:"Z",
    note:"OpenClaw node :18790. Telegram + Discord. Currently 401-ing. Needs token rotation." },
  { id:"T4", name:"Kimi",           role:"Mobile agent + coding assistant", kind:"agent" as const,
    owns:["P2"], avatar:"M",
    note:"OpenClaw node :18789 (Telegram) + :18793 (Code). Mobile-first. Local model fallback." },
  { id:"T5", name:"Pi",             role:"Gemma4 Discord agent", kind:"agent" as const,
    owns:[], avatar:"P",
    note:"OpenClaw node :18796. Gemma4 primary. Shares token with Opencode." },
  { id:"T6", name:"Opencode",       role:"GLM5 agent", kind:"agent" as const,
    owns:[], avatar:"O",
    note:"OpenClaw node :18797. GLM-5.1 primary. Shares token with Pi." },
] as const;

// ── Budget (honest approximations) ──────────────────────────────
// We do NOT have real financial data in =notes.
// These are rough placeholders that Jack should update.
export const REAL_BUDGET = [
  { id:"B0", kind:"attention" as const, label:"Active WIP threads",        value:"4",      of:"6", pct:67,
    funds:["P0","P1","P2","P3"], note:"PAI integration, fleet roster, dashboard, OB1 repair." },
  { id:"B1", kind:"attention" as const, label:"Open JAC tickets",          value:"12",     of:"12", pct:100, warn:true,
    funds:["P1"], note:"All open items tracked. Needs triage." },
  { id:"B2", kind:"time" as const,      label:"Deep-work hours this week", value:"14h",    of:"28h", pct:50,
    funds:["P0","P2"], note:"Good flow on PAI integration. Rib recovery limits sustained hours." },
  { id:"B3", kind:"time" as const,      label:"Session count (7 days)",    value:"8",      of:"14", pct:57,
    funds:["P0","P1","P3"], note:"One session/day average. Fleet coordination adds overhead." },
] as const;

// ── Recommendations (from ALGORITHM.md + fleet state) ──────────
export const REAL_RECOMMENDATIONS = [
  { id:"R0",
    action:"Fix OB1 auth before any fleet-wide memory task.",
    because:"Without external brain, agents lose session continuity. Every auto-brief fails. All agents affected.",
    upstream:["B1","C0","G0","G1","M1"],
    effort:"2h key rotation + test",
    impact:"high" as const },
  { id:"R1",
    action:"Pick ONE repo from 18 and ship a tracer-bullet end-to-end.",
    because:"Context fragmentation is a systemic problem. One shipped thing creates evidence, momentum, and a template.",
    upstream:["C4","C2","G2","G4","M1"],
    effort:"1 week focused",
    impact:"high" as const },
  { id:"R2",
    action:"Define the quarterly token rotation ritual before next quarter.",
    because:"Credential rot is recurring. SOPS setup is half-done; the ritual (who, when, how) is missing.",
    upstream:["C3","S1","G0"],
    effort:"30 min ritual design",
    impact:"med" as const },
] as const;

// ── Stranded (orphans in the =notes system) ────────────────────
export const REAL_STRANDED = {
  work_no_goal: [
    { id:"W8", title:"Linear MCP server setup (unrelated session)", owner:"unknown", age:"1d" },
    { id:"W9", title:"Scheduled briefs FDA fix — needs Jack's call on midday/evening", owner:"Hermes", age:"1d" },
  ],
  goals_no_strategy: [
    { id:"G6", title:"Fleet architecture adopted by others", reason:"strategy exists (S6) but no tracked work in 7d" },
  ],
  strategies_idle: [
    { id:"S5", title:"Family rhythm blocks", reason:"no tracked work items in current projects" },
  ],
} as const;

// ── Subtabs (corners of life) ───────────────────────────────────
export const REAL_SUBTABS = [
  { id:"business",  label:"Business",  dim:"career",    cur:40, ideal:85, velo:+1.0, target:"2027",
    top:"Between jobs. Building agentic OS as portfolio + reference architecture." },
  { id:"finances",  label:"Finances",  dim:"money",     cur:45, ideal:95, velo:+0.5, target:"2027",
    top:"PFL period. No active income. Portfolio not yet generating. Tight but managed." },
  { id:"health",    label:"Health",    dim:"health",    cur:55, ideal:90, velo:+1.2, target:"Aug 2026",
    top:"Rib recovery in progress. PT 2x/week. Physical energy limited but improving." },
  { id:"work",      label:"Work",      dim:"creative",  cur:72, ideal:85, velo:+3.5, target:"Dec 2026",
    top:"High creative output. PAI adoption, fleet coordination, dashboard work all flowing." },
  { id:"life",      label:"Life",      dim:"relationships", cur:82, ideal:90, velo:+0.2, target:"ongoing",
    top:"Family time with Katherine + baby Robin is priority. Ardmore home base stable." },
] as const;

// ── Preferences (from TELOS.md books + mental models) ─────────
export const REAL_PREFERENCES = {
  books:      ["The Real Internet of Things — Daniel Miessler", "Nate Jones (YouTube) — agent deployment/evals"],
  films:      [],
  anime:      [],
  characters: [],
  aphorisms:  [
    "The 11-agent roster works because each agent has a hard boundary.",
    "OB1 auth breaks because credentials rot.",
    "Daily notes are raw; MEMORY.md is distilled.",
    "Fleet-ratify is slow but it catches blind spots.",
    "Klaude stuck on messaging profile for a month = monitoring gaps.",
  ],
  hobbies:    [],
  literature: ["Daniel Miessler — Personal AI Infrastructure, The Real Internet of Things"],
} as const;

// ── Narrative seed (from TELOS.md narrative + today's session) ──
export const REAL_NARRATIVE = {
  days_into: 5,  // days since PAI adoption started
  push_name: "PAI v5.0.0 fleet adoption",
  current_work: "W3",
  via_strategy: "S0",
  addresses: "C4",
  moves_goal: "G0",
  serves_mission: "M1",
} as const;

// ── Assembled TELOS export ─────────────────────────────────────
export const REAL_TELOS = {
  owner:      { name: "Jack Reis", day: "Sat · 30 May", streak: 5 },
  idealState: { horizon: "by May 2027", note: "Personal AI infrastructure demonstrably better than corporate tooling. Sustainable family rhythm. Financial independence trajectory." },
  dimensions: REAL_DIMENSIONS,
  snapshot:   REAL_SNAPSHOT,
  problems:   REAL_PROBLEMS,
  missions:   REAL_MISSIONS,
  goals:      REAL_GOALS,
  metrics:    REAL_METRICS,
  challenges: REAL_CHALLENGES,
  strategies: REAL_STRATEGIES,
  projects:   REAL_PROJECTS,
  team:       REAL_TEAM,
  budget:     REAL_BUDGET,
  recommendations: REAL_RECOMMENDATIONS,
  stranded:   REAL_STRANDED,
  subtabs:    REAL_SUBTABS,
  preferences: REAL_PREFERENCES,
  narrativeSeed: REAL_NARRATIVE,
} satisfies Telos;
