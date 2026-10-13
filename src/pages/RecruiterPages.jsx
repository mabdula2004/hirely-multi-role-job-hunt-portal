import React, { useState } from "react";
import { CalendarClock, Copy, Filter, MoreHorizontal, Paperclip, Pause, Pencil, Play, Plus, Search, Send, Star } from "lucide-react";
import { applications, jobs, users } from "../data/mockData";
import { BarChart, DataTable, DemoModal, Field, ListRow, PanelTitle, Progress, SettingToggle, Stat, Status } from "../components/Common";

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
  const [wizard,setWizard]=useState(false);
  const [step,setStep]=useState(1);
  const [editing,setEditing]=useState(null);
  const toggle = (id) => setData(data.map((j) => j.id === id ? { ...j, status: j.status === "Paused" ? "Active" : "Paused" } : j));
  const publish=()=>{setData([{...jobs[0],id:Date.now(),title:"React Frontend Developer",status:"Active",applicants:0,views:0},...data]);setWizard(false);setStep(1);toast("Demo job published")};
  return <>
    <div className="card panel">
      <PanelTitle eyebrow="Job management" title="Your job posts" action={<button className="primary mini" onClick={() => {setWizard(true);setStep(1)}}><Plus size={14} />Post a job</button>} />
      <DataTable heads={["Role", "Applicants", "Views", "Status", "Salary", "Action"]} rows={data.map((job) => [
        <><b>{job.title}</b><small>{job.location}</small></>,
        job.applicants,
        job.views,
        <Status text={job.status} />,
        job.salary,
        <div className="inline-btns">
          <button className="icon-plain" onClick={() => setEditing(job)}><Pencil size={15} /></button>
          <button className="icon-plain" onClick={() => {toggle(job.id);toast(job.status==="Paused"?"Job resumed":"Job paused")}}>{job.status === "Paused" ? <Play size={15} /> : <Pause size={15} />}</button>
        </div>
      ])} />
    </div>
    <DemoModal open={wizard} title="Post a new job" subtitle={"Step "+step+" of 3"} onClose={()=>setWizard(false)} footer={<><button className="secondary" onClick={()=>setStep(Math.max(1,step-1))} disabled={step===1}>Back</button>{step<3?<button className="primary" onClick={()=>setStep(step+1)}>Continue</button>:<button className="primary" onClick={publish}>Publish demo job</button>}</>}>
      <div className="stepper"><span className={step>=1?"active":""}>1 Basics</span><span className={step>=2?"active":""}>2 Requirements</span><span className={step>=3?"active":""}>3 Review</span></div>
      {step===1&&<><Field label="Job title"><input defaultValue="React Frontend Developer"/></Field><div className="form-grid"><Field label="Work mode"><select defaultValue="Remote"><option>Remote</option><option>Hybrid</option><option>On-site</option></select></Field><Field label="Employment"><select defaultValue="Full-time"><option>Full-time</option><option>Internship</option></select></Field></div></>}
      {step===2&&<><Field label="Required skills"><input defaultValue="React, JavaScript, Git"/></Field><Field label="Salary range"><input defaultValue="$70k-$95k"/></Field><Field label="Description"><textarea defaultValue="Build responsive product experiences with the frontend team."/></Field></>}
      {step===3&&<div className="review-box"><b>React Frontend Developer</b><span>Remote - Full-time</span><span>React, JavaScript, Git</span><span>Ready to publish to the synthetic marketplace</span></div>}
    </DemoModal>
    <DemoModal open={!!editing} title={editing?.title||"Edit job"} subtitle="Update the demo listing" onClose={()=>setEditing(null)} footer={<button className="primary" onClick={()=>{toast("Job changes saved");setEditing(null)}}>Save changes</button>}>
      <Field label="Job title"><input defaultValue={editing?.title}/></Field><div className="form-grid"><Field label="Status"><select defaultValue={editing?.status}><option>Active</option><option>Paused</option><option>Closed</option></select></Field><Field label="Salary"><input defaultValue={editing?.salary}/></Field></div><Field label="Location"><input defaultValue={editing?.location}/></Field>
    </DemoModal>
  </>;
}

function Applicants({ toast }) {
  const stages = ["Applied", "Reviewing", "Interview", "Offer"];
  const[highMatch,setHighMatch]=useState(false);
  const[selected,setSelected]=useState(null);
  const pool=highMatch?applications.filter(a=>a.match>=90):applications;
  return <>
    <div className="card panel">
      <PanelTitle eyebrow="Pipeline" title="Frontend Engineer applicants" action={<button className={highMatch?"secondary mini active-filter":"secondary mini"} onClick={()=>setHighMatch(!highMatch)}><Filter size={14} />{highMatch?"90%+ only":"Filter 90%+"}</button>} />
      <div className="kanban">
        {stages.map((stage, i) => <div className="kan-col" key={stage}>
          <div className="kan-head"><b>{stage}</b><span>{pool.filter((_, n) => n % 4 === i).length}</span></div>
          {pool.filter((_, n) => n % 4 === i).map((a) => <div className="candidate-card" key={a.id}>
            <div className="avatar">{a.avatar}</div><b>{a.candidate}</b><small>{a.role}</small><span className="match-pill">{a.match}% match</span>
            <button className="text-btn" onClick={() => setSelected(a)}>Open profile</button>
          </div>)}
        </div>)}
      </div>
    </div>
    <DemoModal open={!!selected} title={selected?.candidate||"Candidate"} subtitle={selected?.role} onClose={()=>setSelected(null)} footer={<><button className="secondary" onClick={()=>toast("Candidate shortlisted")}>Shortlist</button><button className="primary" onClick={()=>{toast("Interview invite created");setSelected(null)}}>Schedule interview</button></>}>
      <div className="modal-grid"><div><div className="eyebrow">Match</div><h3>{selected?.match}%</h3></div><div><div className="eyebrow">Stage</div><h3>{selected?.stage}</h3></div></div><div className="chips"><span>React</span><span>JavaScript</span><span>Supabase</span><span>Git</span></div><p className="muted">Synthetic candidate profile with relevant experience, portfolio projects and availability.</p>
    </DemoModal>
  </>;
}

function TalentSearch({ toast }) {
  const [q, setQ] = useState("");
  const[advanced,setAdvanced]=useState(false);
  const[location,setLocation]=useState("All");
  const[saved,setSaved]=useState([]);
  const[selected,setSelected]=useState(null);
  const candidates = users.filter((u) => u.role === "Candidate" && (!q || JSON.stringify(u).toLowerCase().includes(q.toLowerCase())) && (location==="All"||u.location===location));
  return <>
    <div className="card compact-search"><Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search candidates by skill, name or location" /><button className="secondary" onClick={()=>setAdvanced(!advanced)}><Filter size={15} />{advanced?"Hide filters":"Advanced filters"}</button></div>
    {advanced&&<div className="card advanced-filters"><Field label="Location"><select value={location} onChange={e=>setLocation(e.target.value)}><option>All</option><option>Lahore</option><option>Karachi</option><option>Islamabad</option><option>Manchester</option></select></Field><Field label="Availability"><select defaultValue="Available"><option>Available</option><option>Open to offers</option></select></Field><button className="secondary mini" onClick={()=>setLocation("All")}>Clear filters</button></div>}
    <div className="grid2">
      {candidates.map((u, i) => <div className="card talent-card" key={u.id}>
        <div className="talent-top"><div className="avatar large">{u.name.split(" ").map((x) => x[0]).join("")}</div><div><h3>{u.name}</h3><p>{u.location} - Frontend / Full Stack</p></div><span className="match-pill">{[94, 91, 88, 86][i % 4]}% fit</span></div>
        <div className="chips"><span>React</span><span>JavaScript</span><span>Supabase</span></div>
        <div className="dual"><button className="secondary" onClick={() => {setSaved(saved.includes(u.id)?saved.filter(id=>id!==u.id):[...saved,u.id]);toast(saved.includes(u.id)?"Removed from talent pool":"Saved to talent pool")}}>{saved.includes(u.id)?"Saved ✓":"Save"}</button><button className="primary" onClick={() => setSelected({...u,fit:[94,91,88,86][i%4]})}>View profile</button></div>
      </div>)}
    </div>
    <DemoModal open={!!selected} title={selected?.name||"Candidate profile"} subtitle={(selected?.location||"")+" - Frontend / Full Stack"} onClose={()=>setSelected(null)} footer={<><button className="secondary" onClick={()=>{toast("Candidate saved to shortlist");setSelected(null)}}>Shortlist</button><button className="primary" onClick={()=>{toast("Interview invite created");setSelected(null)}}>Invite to interview</button></>}>
      <div className="modal-grid"><div><div className="eyebrow">Fit score</div><h3>{selected?.fit}%</h3></div><div><div className="eyebrow">Availability</div><h3>2 weeks</h3></div></div><p className="muted">Synthetic candidate with relevant React, JavaScript and Supabase experience.</p><div className="chips"><span>React</span><span>JavaScript</span><span>Supabase</span><span>Git</span></div>
    </DemoModal>
  </>;
}

function Interviews({ toast }) {
  const[room,setRoom]=useState(null);
  const[saved,setSaved]=useState(false);
  return <>
    <div className="two-col">
      <div className="card panel">
        <PanelTitle eyebrow="Schedule" title="Upcoming interviews" />
        {[["10:30 AM", "Ayesha Khan", "Technical screen"], ["1:00 PM", "Sara Ahmed", "Portfolio review"], ["4:30 PM", "Mina Shah", "Hiring manager"]].map((x) =>
          <div className="calendar-row" key={x[0]}><div className="time-pill">{x[0]}</div><div><b>{x[1]}</b><small>{x[2]} - Frontend Engineer</small></div><button className="secondary mini" onClick={() => setRoom(x)}>Join</button></div>
        )}
      </div>
      <div className="card panel">
        <PanelTitle eyebrow="Interview kit" title="Scorecard template" action={saved?<span className="status good">Saved ✓</span>:null}/>
        {["Technical depth", "Problem solving", "Communication", "Product thinking"].map((label, i) => <div className="score-item" key={label}><span>{label}</span><div className="rating">{[1,2,3,4,5].map((n) => <Star key={n} size={15} fill={n <= 4 && i < 3 ? "currentColor" : "none"} />)}</div></div>)}
        <button className="primary" onClick={() => {setSaved(true);toast("Scorecard saved")}}>Save scorecard</button>
      </div>
    </div>
    <DemoModal open={!!room} title={"Interview room - "+(room?.[1]||"Candidate")} subtitle={(room?.[0]||"")+" - "+(room?.[2]||"")} onClose={()=>setRoom(null)} footer={<button className="primary" onClick={()=>{toast("Demo interview started");setRoom(null)}}>Start interview</button>}>
      <div className="video-demo"><div className="video-tile recruiter-video"><div className="avatar large">OM</div><span>You - Recruiter</span></div><div className="video-tile"><div className="avatar large">{room?.[1]?.split(" ").map(x=>x[0]).join("")}</div><span>{room?.[1]}</span></div></div><div className="call-controls"><span>Mic on</span><span>Camera on</span><span>45 min slot</span></div>
    </DemoModal>
  </>;
}

function Messages({ toast }) {
  const people = ["Ayesha Khan", "Sara Ahmed", "Mina Shah", "James Cole"];
  const [active, setActive] = useState(people[0]);
  const [text, setText] = useState("");
  const [sent, setSent] = useState([]);
  const [attachment,setAttachment]=useState("");
  const [menu,setMenu]=useState(false);
  return <div className="message-layout">
    <div className="card panel">
      <PanelTitle eyebrow="Inbox" title="Candidate conversations" />
      {people.map((person, i) => <button className={active === person ? "conversation active" : "conversation"} key={person} onClick={() => setActive(person)}>
        <div className="avatar">{person.split(" ").map((x) => x[0]).join("").slice(0,2)}</div><div><b>{person}</b><small>{i ? "Thanks, I will review it." : "Can we discuss the next step?"}</small></div><span>{i + 2}m</span>
      </button>)}
    </div>
    <div className="card chat-panel">
      <div className="chat-head"><div className="avatar">{active[0]}</div><div><b>{active}</b><small>Active recently</small></div><div className="chat-menu-wrap"><button className="icon-plain" onClick={()=>setMenu(!menu)}><MoreHorizontal size={18}/></button>{menu&&<div className="chat-menu"><button onClick={()=>{toast("Conversation marked unread");setMenu(false)}}>Mark unread</button><button onClick={()=>{toast("Conversation archived");setMenu(false)}}>Archive</button></div>}</div></div>
      <div className="chat-body"><div className="bubble">Thanks for the update. I wanted to confirm the next step.</div><div className="bubble mine">Absolutely. I will send the details here.</div>{sent.map((m,i) => <div className="bubble mine" key={i}>{m}</div>)}</div>
      <div className="composer-wrap">{attachment&&<div className="attachment-chip">candidate-resume.pdf <button onClick={()=>setAttachment("")}>x</button></div>}<div className="composer"><button className="icon-plain" onClick={()=>{setAttachment("candidate-resume.pdf");toast("Demo attachment added")}}><Paperclip size={17}/></button><input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write a message..."/><button className="primary square" onClick={()=>{if(text.trim()||attachment){setSent([...sent,text.trim()||"Attachment: candidate-resume.pdf"]);setText("");setAttachment("");toast("Message added to demo thread");}}}><Send size={16}/></button></div></div>
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
  const [items,setItems]=useState(["Frontend Engineer", "Full Stack Developer", "Product Designer", "React Native Engineer"]);
  const[selected,setSelected]=useState(null);
  return <>
    <div className="grid2">{items.map((x, i) => <div className="card template-card" key={x+i}><div className="template-icon">T{i+1}</div><div><div className="eyebrow">Template 0{i+1}</div><h3>{x}</h3><p>Reusable responsibilities, skill requirements and screening questions.</p></div><div className="dual"><button className="secondary" onClick={() => {setItems([...items,x+" Copy"]);toast("Template duplicated")}}><Copy size={14}/>Duplicate</button><button className="primary" onClick={() => setSelected(x)}>Use template</button></div></div>)}</div>
    <DemoModal open={!!selected} title={"Use template - "+selected} subtitle="Pre-filled job draft" onClose={()=>setSelected(null)} footer={<button className="primary" onClick={()=>{toast("Job draft created from template");setSelected(null)}}>Create draft</button>}>
      <Field label="Job title"><input defaultValue={selected||""}/></Field><Field label="Location"><input defaultValue="Remote"/></Field><Field label="Required skills"><input defaultValue="React, JavaScript, Git"/></Field><Field label="Description"><textarea defaultValue="Use this template as the starting point for the role."/></Field>
    </DemoModal>
  </>;
}

function RecruiterSettings({ toast }) {
  const [prefs, setPrefs] = useState({ digest: true, applicant: true, marketing: false, calendar: true });
  const[invite,setInvite]=useState(false);
  return <> <div className="settings-grid">
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
      <button className="secondary" onClick={() => setInvite(true)}><Plus size={15}/>Invite teammate</button>
    </div>
  </div>
  <DemoModal open={invite} title="Invite recruiter" subtitle="Add a teammate to the synthetic company workspace" onClose={()=>setInvite(false)} footer={<button className="primary" onClick={()=>{toast("Demo invitation sent");setInvite(false)}}>Send invite</button>}><Field label="Work email"><input defaultValue="new.recruiter@northstar.demo"/></Field><Field label="Access level"><select defaultValue="Recruiter"><option>Recruiter</option><option>Admin recruiter</option></select></Field></DemoModal>
  </>;
}
