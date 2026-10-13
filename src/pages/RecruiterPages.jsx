import React, { useState } from "react";
import { CalendarClock, Copy, Filter, MoreHorizontal, Paperclip, Pause, Pencil, Play, Plus, Search, Send, Star } from "lucide-react";
import { applications, jobs, users } from "../data/mockData";
import { BarChart, DataTable, Field, ListRow, PanelTitle, Progress, SettingToggle, Stat, Status } from "../components/Common";

export function RecruiterPages({ section, toast }) {
  switch (section) {
    case "Overview": return <Overview />;
    case "Jobs": return <Jobs toast={toast} />;
    case "Applicants": return <Applicants toast={toast} />;
    case "Talent Search": return <TalentSearch toast={toast} />;
    case "Interviews": return <Interviews toast={toast} />;
    case "Messages": return <Messages toast={toast} />;
    case "Company Profile": return <CompanyProfile toast={toast} />;
    case "Analytics": return <Analytics />;
    case "Job Templates": return <Templates toast={toast} />;
    case "Settings": return <RecruiterSettings toast={toast} />;
    default: return null;
  }
}

function Overview() {
  return <>
    <div className="stats">
      <Stat label="Active jobs" value="7" note="2 drafts" />
      <Stat label="New applicants" value="34" note="+12% this week" tone="good" />
      <Stat label="Interviews" value="9" note="next 7 days" />
      <Stat label="Avg. match" value="86%" note="qualified" />
    </div>
    <div className="two-col">
      <div className="card panel">
        <PanelTitle eyebrow="ATS pipeline" title="Frontend Engineer" />
        <div className="pipeline-mini">
          {[
            ["Applied", 18, "42% of pipeline"],
            ["Reviewing", 7, "27% of pipeline"],
            ["Interview", 4, "18% of pipeline"],
            ["Offer", 1, "8% of pipeline"]
          ].map(([label, count, note]) => <div key={label}><span>{count}</span><b>{label}</b><small>{note}</small></div>)}
        </div>
      </div>
      <div className="card panel">
        <PanelTitle eyebrow="Hiring health" title="This week" />
        <Progress label="Application review SLA" value={91} />
        <Progress label="Candidate response rate" value={84} />
        <Progress label="Interview show-up rate" value={96} />
      </div>
    </div>
  </>;
}

function Jobs({ toast }) {
  const [data, setData] = useState(jobs.slice(0, 5));
  const toggle = (id) => setData(data.map((j) => j.id === id ? { ...j, status: j.status === "Paused" ? "Active" : "Paused" } : j));
  return <div className="card panel">
    <PanelTitle eyebrow="Job management" title="Your job posts" action={<button className="primary mini" onClick={() => toast("5-step job posting wizard opened")}><Plus size={14} />Post a job</button>} />
    <DataTable heads={["Role", "Applicants", "Views", "Status", "Salary", "Action"]} rows={data.map((job) => [
      <><b>{job.title}</b><small>{job.location}</small></>,
      job.applicants,
      job.views,
      <Status text={job.status} />,
      job.salary,
      <div className="inline-btns">
        <button className="icon-plain" onClick={() => toast("Job editor opened")}><Pencil size={15} /></button>
        <button className="icon-plain" onClick={() => toggle(job.id)}>{job.status === "Paused" ? <Play size={15} /> : <Pause size={15} />}</button>
      </div>
    ])} />
  </div>;
}

function Applicants({ toast }) {
  const stages = ["Applied", "Reviewing", "Interview", "Offer"];
  return <div className="card panel">
    <PanelTitle eyebrow="Pipeline" title="Frontend Engineer applicants" action={<button className="secondary mini"><Filter size={14} />Filter</button>} />
    <div className="kanban">
      {stages.map((stage, i) => <div className="kan-col" key={stage}>
        <div className="kan-head"><b>{stage}</b><span>{applications.filter((_, n) => n % 4 === i).length}</span></div>
        {applications.filter((_, n) => n % 4 === i).map((a) => <div className="candidate-card" key={a.id}>
          <div className="avatar">{a.avatar}</div><b>{a.candidate}</b><small>{a.role}</small><span className="match-pill">{a.match}% match</span>
          <button className="text-btn" onClick={() => toast(a.candidate + " profile opened")}>Open profile</button>
        </div>)}
      </div>)}
    </div>
  </div>;
}

function TalentSearch({ toast }) {
  const [q, setQ] = useState("");
  const candidates = users.filter((u) => u.role === "Candidate" && (!q || JSON.stringify(u).toLowerCase().includes(q.toLowerCase())));
  return <>
    <div className="card compact-search"><Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search candidates by skill, name or location" /><button className="secondary"><Filter size={15} />Advanced filters</button></div>
    <div className="grid2">
      {candidates.map((u, i) => <div className="card talent-card" key={u.id}>
        <div className="talent-top"><div className="avatar large">{u.name.split(" ").map((x) => x[0]).join("")}</div><div><h3>{u.name}</h3><p>{u.location} - Frontend / Full Stack</p></div><span className="match-pill">{[94, 91, 88, 86][i % 4]}% fit</span></div>
        <div className="chips"><span>React</span><span>JavaScript</span><span>Supabase</span></div>
        <div className="dual"><button className="secondary" onClick={() => toast("Candidate saved to talent pool")}>Save</button><button className="primary" onClick={() => toast("Candidate profile opened")}>View profile</button></div>
      </div>)}
    </div>
  </>;
}

function Interviews({ toast }) {
  return <div className="two-col">
    <div className="card panel">
      <PanelTitle eyebrow="Schedule" title="Upcoming interviews" />
      {[["10:30 AM", "Ayesha Khan", "Technical screen"], ["1:00 PM", "Sara Ahmed", "Portfolio review"], ["4:30 PM", "Mina Shah", "Hiring manager"]].map((x) =>
        <div className="calendar-row" key={x[0]}><div className="time-pill">{x[0]}</div><div><b>{x[1]}</b><small>{x[2]} - Frontend Engineer</small></div><button className="secondary mini" onClick={() => toast("Interview room opened")}>Join</button></div>
      )}
    </div>
    <div className="card panel">
      <PanelTitle eyebrow="Interview kit" title="Scorecard template" />
      {["Technical depth", "Problem solving", "Communication", "Product thinking"].map((label, i) => <div className="score-item" key={label}><span>{label}</span><div className="rating">{[1,2,3,4,5].map((n) => <Star key={n} size={15} fill={n <= 4 && i < 3 ? "currentColor" : "none"} />)}</div></div>)}
      <button className="primary" onClick={() => toast("Scorecard saved")}>Save scorecard</button>
    </div>
  </div>;
}

function Messages({ toast }) {
  const people = ["Ayesha Khan", "Sara Ahmed", "Mina Shah", "James Cole"];
  const [active, setActive] = useState(people[0]);
  const [text, setText] = useState("");
  const [sent, setSent] = useState([]);
  return <div className="message-layout">
    <div className="card panel">
      <PanelTitle eyebrow="Inbox" title="Candidate conversations" />
      {people.map((person, i) => <button className={active === person ? "conversation active" : "conversation"} key={person} onClick={() => setActive(person)}>
        <div className="avatar">{person.split(" ").map((x) => x[0]).join("").slice(0,2)}</div><div><b>{person}</b><small>{i ? "Thanks, I will review it." : "Can we discuss the next step?"}</small></div><span>{i + 2}m</span>
      </button>)}
    </div>
    <div className="card chat-panel">
      <div className="chat-head"><div className="avatar">{active[0]}</div><div><b>{active}</b><small>Active recently</small></div><button className="icon-plain"><MoreHorizontal size={18}/></button></div>
      <div className="chat-body"><div className="bubble">Thanks for the update. I wanted to confirm the next step.</div><div className="bubble mine">Absolutely. I will send the details here.</div>{sent.map((m,i) => <div className="bubble mine" key={i}>{m}</div>)}</div>
      <div className="composer"><button className="icon-plain"><Paperclip size={17}/></button><input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write a message..."/><button className="primary square" onClick={()=>{if(text.trim()){setSent([...sent,text]);setText("");toast("Message added to demo thread");}}}><Send size={16}/></button></div>
    </div>
  </div>;
}

function CompanyProfile({ toast }) {
  return <div className="two-col">
    <div className="card panel">
      <div className="company-hero"><div className="company-logo large">NL</div><div><h2>Northstar Labs</h2><p>Developer Tools - Remote-first</p></div><Status text="Verified" /></div>
      <Field label="Company tagline"><input defaultValue="Developer infrastructure for distributed product teams." /></Field>
      <Field label="About"><textarea defaultValue="Northstar Labs builds collaboration and deployment tools for modern engineering organizations." /></Field>
      <div className="form-grid"><Field label="Company size"><select defaultValue="201-500"><option>51-200</option><option>201-500</option><option>501-1000</option></select></Field><Field label="Website"><input defaultValue="northstarlabs.example" /></Field></div>
      <button className="primary" onClick={() => toast("Company profile saved")}>Save profile</button>
    </div>
    <div className="card panel"><PanelTitle eyebrow="Employer brand" title="Profile completeness" /><div className="big-score">92%</div><Progress label="Company information" value={100} /><Progress label="Culture & benefits" value={88} /><Progress label="Media & brand assets" value={82} /></div>
  </div>;
}

function Analytics() {
  return <>
    <div className="stats"><Stat label="Job views" value="12.8k" note="+18%" tone="good" /><Stat label="Apply rate" value="7.4%" note="+1.2%" tone="good" /><Stat label="Qualified rate" value="68%" note="+4.1%" tone="good" /><Stat label="Time to shortlist" value="1.8d" note="-0.6d" tone="good" /></div>
    <div className="two-col"><div className="card panel"><PanelTitle eyebrow="Trend" title="Applicant volume" /><BarChart values={[32,44,38,56,62,51,74,71,86,78,92,101]} /></div><div className="card panel"><PanelTitle eyebrow="Source quality" title="Where candidates come from" /><Progress label="Hirely search" value={46} /><Progress label="Job alerts" value={28} /><Progress label="Company page" value={16} /><Progress label="Direct link" value={10} /></div></div>
  </>;
}

function Templates({ toast }) {
  const items = ["Frontend Engineer", "Full Stack Developer", "Product Designer", "React Native Engineer"];
  return <div className="grid2">{items.map((x, i) => <div className="card template-card" key={x}><div className="template-icon">T{i+1}</div><div><div className="eyebrow">Template 0{i+1}</div><h3>{x}</h3><p>Reusable responsibilities, skill requirements and screening questions.</p></div><div className="dual"><button className="secondary" onClick={() => toast("Template duplicated")}><Copy size={14}/>Duplicate</button><button className="primary" onClick={() => toast("Template opened")}>Use template</button></div></div>)}</div>;
}

function RecruiterSettings({ toast }) {
  const [prefs, setPrefs] = useState({ digest: true, applicant: true, marketing: false, calendar: true });
  return <div className="settings-grid">
    <div className="card panel">
      <PanelTitle eyebrow="Recruiter account" title="Workspace preferences" />
      <Field label="Work email"><input defaultValue="recruiter@northstar.demo" /></Field>
      <Field label="Role title"><input defaultValue="Senior Talent Partner" /></Field>
      <Field label="Timezone"><select defaultValue="UTC+5"><option>UTC+5</option><option>UTC</option><option>UTC-5</option></select></Field>
      <button className="primary" onClick={() => toast("Recruiter settings saved")}>Save changes</button>
    </div>
    <div className="card panel">
      <PanelTitle eyebrow="Notifications" title="Hiring activity" />
      <SettingToggle label="Applicant digest" sub="Daily summary of new applicants." checked={prefs.digest} onChange={() => setPrefs({ ...prefs, digest: !prefs.digest })} />
      <SettingToggle label="High-match applicant alerts" sub="Notify when match score is 90%+." checked={prefs.applicant} onChange={() => setPrefs({ ...prefs, applicant: !prefs.applicant })} />
      <SettingToggle label="Calendar reminders" sub="Interview reminders and conflicts." checked={prefs.calendar} onChange={() => setPrefs({ ...prefs, calendar: !prefs.calendar })} />
      <SettingToggle label="Product updates" sub="Feature and product announcements." checked={prefs.marketing} onChange={() => setPrefs({ ...prefs, marketing: !prefs.marketing })} />
    </div>
    <div className="card panel security-panel">
      <PanelTitle eyebrow="Team access" title="Recruiter permissions" />
      <ListRow avatar="OM" title="Omar Malik" sub="Admin recruiter - Full access" badge="Owner" />
      <ListRow avatar="DR" title="Daniel Reed" sub="Recruiter - Jobs & applicants" badge="Member" />
      <button className="secondary" onClick={() => toast("Invite teammate opened")}><Plus size={15}/>Invite teammate</button>
    </div>
  </div>;
}
