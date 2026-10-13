import React, { useState } from "react";
import { BellRing, CalendarClock, Check, Filter, LockKeyhole, MessageSquare, Paperclip, Plus, Search, Send, Sparkles, Trash2, Upload } from "lucide-react";
import { applications, jobs } from "../data/mockData";
import { BarChart, DashJobCard, DataTable, Field, ListRow, PanelTitle, Progress, SettingToggle, Stat, Status, Toggle } from "../components/Common";

export function CandidatePages({ section, toast }) {
  switch (section) {
    case "Overview": return <Overview />;
    case "Find Jobs": return <FindJobs toast={toast} />;
    case "Recommended": return <Recommended toast={toast} />;
    case "Saved Jobs": return <SavedJobs toast={toast} />;
    case "Applications": return <Applications />;
    case "Interviews": return <Interviews toast={toast} />;
    case "Messages": return <Messages toast={toast} />;
    case "Job Alerts": return <Alerts toast={toast} />;
    case "Career Profile": return <Profile toast={toast} />;
    case "Resume Center": return <Resumes toast={toast} />;
    case "Settings": return <CandidateSettings toast={toast} />;
    default: return null;
  }
}

function Overview() {
  return <>
    <div className="stats">
      <Stat label="Applications" value="8" note="+2 this week" tone="good" />
      <Stat label="Saved jobs" value="12" note="4 closing soon" />
      <Stat label="Best match" value="97%" note="strong fit" tone="good" />
      <Stat label="Profile views" value="11" note="last 30 days" />
    </div>
    <div className="two-col">
      <div className="card panel">
        <PanelTitle eyebrow="Recommended" title="Strong job matches" />
        {jobs.slice(0, 3).map((job) => <ListRow key={job.id} avatar={job.logo} title={job.title} sub={job.company + " - " + job.location} badge={job.match + "% match"} />)}
      </div>
      <div className="card panel">
        <PanelTitle eyebrow="Career intelligence" title="Profile strength" />
        <div className="big-score">82%</div>
        <Progress label="Skills coverage" value={88} />
        <Progress label="Profile completeness" value={82} />
        <Progress label="Experience detail" value={74} />
        <button className="primary">Improve profile</button>
      </div>
    </div>
    <div className="card panel spaced">
      <PanelTitle eyebrow="Application tracker" title="Momentum this week" />
      <div className="stage-track">{["Applied", "Reviewed", "Interview", "Offer"].map((stage, i) =>
        <div className={i < 2 ? "done" : i === 2 ? "current" : ""} key={stage}>
          <span>{i < 2 ? <Check size={14} /> : i + 1}</span><b>{stage}</b>
        </div>
      )}</div>
    </div>
  </>;
}

function FindJobs({ toast }) {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState("All");
  const filtered = jobs.filter((job) =>
    (!q || JSON.stringify(job).toLowerCase().includes(q.toLowerCase())) &&
    (mode === "All" || job.mode === mode)
  );
  return <>
    <div className="card compact-search">
      <Search size={17} />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs, companies or skills" />
      <select value={mode} onChange={(e) => setMode(e.target.value)}><option>All</option><option>Remote</option><option>Hybrid</option><option>On-site</option></select>
      <button className="secondary"><Filter size={15} />More filters</button>
    </div>
    <div className="section-tools"><span>{filtered.length} matching roles</span><span>Sorted by relevance</span></div>
    <div className="grid2">{filtered.map((job) => <DashJobCard key={job.id} job={job} onApply={() => toast("Application flow opened")} />)}</div>
  </>;
}

function Recommended({ toast }) {
  return <>
    <div className="insight-banner"><Sparkles size={20} /><div><b>Your strongest matches are remote React roles.</b><span>Based on synthetic skills, location preference and profile data.</span></div></div>
    <div className="grid2">{[jobs[5], jobs[0], jobs[1], jobs[3]].map((job) => <DashJobCard key={job.id} job={job} onApply={() => toast("Application flow opened")} />)}</div>
  </>;
}

function SavedJobs({ toast }) {
  const [saved, setSaved] = useState([jobs[0], jobs[3], jobs[1]]);
  return <>
    <div className="section-tools"><span>{saved.length} saved opportunities</span><button className="secondary"><Filter size={15} />Sort by match</button></div>
    <div className="grid2">{saved.map((job) => <DashJobCard key={job.id} job={job} onApply={() => toast("Application flow opened")} onRemove={() => { setSaved(saved.filter((x) => x.id !== job.id)); toast("Removed from saved jobs"); }} />)}</div>
  </>;
}

function Applications() {
  return <div className="card panel">
    <PanelTitle eyebrow="Application tracker" title="Your active applications" />
    <DataTable heads={["Role", "Company", "Stage", "Match", "Updated"]} rows={applications.map((a) => [
      <b>{a.role}</b>, a.company, <Status text={a.stage} />, a.match + "%", a.date
    ])} />
  </div>;
}

function Interviews({ toast }) {
  const interviews = [
    ["Today - 5:30 PM", "Northstar Labs", "Frontend Engineer", "Technical screen"],
    ["Tomorrow - 11:00 AM", "OrbitPay", "Frontend Intern", "Hiring manager"],
    ["Oct 15 - 3:00 PM", "Aster Cloud", "Full Stack Developer", "Culture interview"]
  ];
  return <div className="two-col">
    <div className="card panel">
      <PanelTitle eyebrow="Upcoming" title="Interview schedule" />
      {interviews.map((item) => <div className="interview-row" key={item[0]}>
        <div className="date-box"><CalendarClock size={18} /><span>{item[0]}</span></div>
        <div><b>{item[1]}</b><small>{item[2]} - {item[3]}</small></div>
        <button className="secondary mini" onClick={() => toast("Interview details opened")}>View</button>
      </div>)}
    </div>
    <div className="card panel">
      <PanelTitle eyebrow="Preparation" title="Interview checklist" />
      {["Review job requirements", "Prepare 2 project examples", "Test microphone and camera", "Write 3 questions for the team"].map((x, i) =>
        <label className="check-row" key={x}><input type="checkbox" defaultChecked={i < 2} /><span>{x}</span></label>
      )}
    </div>
  </div>;
}

function Messages({ toast }) {
  const people = ["Northstar Labs", "OrbitPay HR", "Aster Cloud Recruiter"];
  const [active, setActive] = useState(people[0]);
  const [text, setText] = useState("");
  const [sent, setSent] = useState([]);
  return <div className="message-layout">
    <div className="card panel">
      <PanelTitle eyebrow="Inbox" title="Recruiter conversations" />
      {people.map((person, i) => <button className={active === person ? "conversation active" : "conversation"} key={person} onClick={() => setActive(person)}>
        <div className="avatar">{person.split(" ").map((x) => x[0]).join("").slice(0, 2)}</div>
        <div><b>{person}</b><small>{i ? "Thanks, I will review it." : "Can we discuss the next step?"}</small></div><span>{i + 2}m</span>
      </button>)}
    </div>
    <div className="card chat-panel">
      <div className="chat-head"><div className="avatar">{active[0]}</div><div><b>{active}</b><small>Active recently</small></div></div>
      <div className="chat-body"><div className="bubble">Thanks for the update. I wanted to confirm the next step.</div><div className="bubble mine">Absolutely. I will send the details here.</div>{sent.map((m, i) => <div className="bubble mine" key={i}>{m}</div>)}</div>
      <div className="composer"><button className="icon-plain"><Paperclip size={17} /></button><input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message..." /><button className="primary square" onClick={() => { if (text.trim()) { setSent([...sent, text]); setText(""); toast("Message added to demo thread"); } }}><Send size={16} /></button></div>
    </div>
  </div>;
}

function Alerts({ toast }) {
  const [alerts, setAlerts] = useState([
    { id: 1, title: "React / Frontend", where: "Remote", freq: "Daily", on: true },
    { id: 2, title: "Full Stack Developer", where: "Lahore", freq: "Weekly", on: true },
    { id: 3, title: "React Native", where: "Remote", freq: "Daily", on: false }
  ]);
  return <div className="card panel">
    <PanelTitle eyebrow="Notifications" title="Job alerts" action={<button className="primary mini" onClick={() => { setAlerts([...alerts, { id: Date.now(), title: "JavaScript Developer", where: "Remote", freq: "Daily", on: true }]); toast("New alert created"); }}><Plus size={14} />New alert</button>} />
    {alerts.map((a) => <div className="alert-row" key={a.id}><div className="alert-icon"><BellRing size={18} /></div><div><b>{a.title}</b><small>{a.where} - {a.freq}</small></div><Toggle checked={a.on} onChange={() => setAlerts(alerts.map((x) => x.id === a.id ? { ...x, on: !x.on } : x))} /><button className="icon-plain" onClick={() => setAlerts(alerts.filter((x) => x.id !== a.id))}><Trash2 size={16} /></button></div>)}
  </div>;
}

function Profile({ toast }) {
  const [skills, setSkills] = useState(["React", "JavaScript", "React Native", "Supabase", "Git"]);
  return <div className="two-col">
    <div className="card panel">
      <div className="profile-avatar">MA</div><h3>Muhammad Abdullah</h3><p className="muted">Full Stack Developer - Lahore, Pakistan</p>
      <div className="chips editable">{skills.map((s) => <button key={s} onClick={() => setSkills(skills.filter((x) => x !== s))}>{s} x</button>)}<button className="add-chip" onClick={() => !skills.includes("PostgreSQL") && setSkills([...skills, "PostgreSQL"])}><Plus size={12} />Add skill</button></div>
      <Field label="Professional headline"><input defaultValue="Full Stack Developer | React & React Native" /></Field>
      <Field label="About"><textarea defaultValue="Computer Science graduate focused on responsive web and mobile products with React, React Native and Supabase." /></Field>
      <button className="primary" onClick={() => toast("Career profile saved")}>Save profile</button>
    </div>
    <div className="card panel"><PanelTitle eyebrow="Completion" title="Profile strength" /><div className="big-score">82%</div><Progress label="Basic information" value={100} /><Progress label="Skills" value={90} /><Progress label="Projects" value={76} /><Progress label="Experience" value={62} /></div>
  </div>;
}

function Resumes({ toast }) {
  const [defaultId, setDefaultId] = useState(1);
  const docs = [
    { id: 1, name: "Frontend-Resume.pdf", date: "Updated today", size: "312 KB" },
    { id: 2, name: "FullStack-Resume.pdf", date: "Updated 3 days ago", size: "338 KB" },
    { id: 3, name: "Internship-Resume.pdf", date: "Updated 1 week ago", size: "296 KB" }
  ];
  return <div className="card panel">
    <PanelTitle eyebrow="Documents" title="Resume Center" action={<button className="primary mini" onClick={() => toast("Upload resume opened")}><Upload size={14} />Upload resume</button>} />
    {docs.map((doc) => <div className="resume-row" key={doc.id}><div className="pdf-icon">PDF</div><div><b>{doc.name}</b><small>{doc.date} - {doc.size}</small></div>{defaultId === doc.id ? <Status text="Default" /> : <button className="secondary mini" onClick={() => { setDefaultId(doc.id); toast("Default resume updated"); }}>Make default</button>}</div>)}
  </div>;
}

function CandidateSettings({ toast }) {
  const [prefs, setPrefs] = useState({ email: true, push: true, profile: true, digest: false });
  return <div className="settings-grid">
    <div className="card panel">
      <PanelTitle eyebrow="Account" title="Personal settings" />
      <Field label="Email"><input defaultValue="candidate@hirely.demo" /></Field>
      <Field label="Phone"><input defaultValue="+92 300 1234567" /></Field>
      <Field label="Location"><input defaultValue="Lahore, Pakistan" /></Field>
      <button className="primary" onClick={() => toast("Account settings saved")}>Save changes</button>
    </div>
    <div className="card panel">
      <PanelTitle eyebrow="Privacy" title="Visibility & notifications" />
      <SettingToggle label="Recruiter discoverability" sub="Verified recruiters can find your profile." checked={prefs.profile} onChange={() => setPrefs({ ...prefs, profile: !prefs.profile })} />
      <SettingToggle label="Application emails" sub="Status changes and interview updates." checked={prefs.email} onChange={() => setPrefs({ ...prefs, email: !prefs.email })} />
      <SettingToggle label="Push notifications" sub="Messages and reminders." checked={prefs.push} onChange={() => setPrefs({ ...prefs, push: !prefs.push })} />
      <SettingToggle label="Weekly career digest" sub="Matches, activity and profile insights." checked={prefs.digest} onChange={() => setPrefs({ ...prefs, digest: !prefs.digest })} />
    </div>
    <div className="card panel security-panel">
      <PanelTitle eyebrow="Security" title="Password & sessions" />
      <div className="form-grid"><Field label="Current password"><input type="password" placeholder="********" /></Field><Field label="New password"><input type="password" placeholder="Minimum 8 characters" /></Field></div>
      <button className="secondary" onClick={() => toast("Password updated in demo")}>Update password</button>
      <div className="session-box"><LockKeyhole size={17} /><div><b>Current session</b><small>Chrome - Lahore - active now</small></div><Status text="Current" /></div>
    </div>
  </div>;
}
