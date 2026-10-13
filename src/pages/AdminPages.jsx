import React,{useState} from "react";
import {Download,Eye,LockKeyhole,Plus,Search,UserCheck,UserX,Pencil} from "lucide-react";
import {applications,auditLogs,categories,companies,jobs,tickets,users} from "../data/mockData";
import {ActivityFeed,BarChart,DataTable,DemoModal,Field,ListRow,PanelTitle,Progress,SettingToggle,Stat,Status} from "../components/Common";

export function AdminPages({section,toast}){
  switch(section){
    case"Overview":return <Overview/>;
    case"Users":return <UsersPage toast={toast}/>;
    case"Companies":return <CompaniesPage toast={toast}/>;
    case"Jobs":return <JobsPage toast={toast}/>;
    case"Applications":return <ApplicationsPage/>;
    case"Reports":return <ReportsPage toast={toast}/>;
    case"Categories & Skills":return <TaxonomyPage toast={toast}/>;
    case"Support":return <SupportPage toast={toast}/>;
    case"Analytics":return <AnalyticsPage/>;
    case"Audit Logs":return <AuditPage/>;
    case"Settings":return <SettingsPage toast={toast}/>;
    default:return null;
  }
}

function Overview(){return <>
  <div className="stats">
    <Stat label="Users" value="12.4k" note="+4.8%" tone="good"/>
    <Stat label="Companies" value="684" note="52 pending" tone="warn"/>
    <Stat label="Active jobs" value="2,931" note="healthy" tone="good"/>
    <Stat label="Open reports" value="17" note="needs review" tone="warn"/>
  </div>
  <div className="two-col">
    <div className="card panel"><PanelTitle eyebrow="Moderation queue" title="Needs attention"/>
      {companies.filter(c=>c.status==="Pending").map(c=><ListRow key={c.id} avatar={c.initials} title={c.name} sub={"Company verification - "+c.risk+" risk"} badge="Review"/>)}
      <ListRow avatar="PU" title="Product UI Engineer" sub="Job listing - salary metadata mismatch" badge="Flagged"/>
    </div>
    <div className="card panel"><PanelTitle eyebrow="Platform health" title="Last 24 hours"/><Progress label="Successful logins" value={98}/><Progress label="Verified job ratio" value={93}/><Progress label="Support SLA" value={91}/></div>
  </div>
  <div className="card panel spaced"><PanelTitle eyebrow="Activity" title="System events"/><ActivityFeed items={auditLogs.slice(0,4)}/></div>
</>}

function UsersPage({toast}){
  const[filter,setFilter]=useState("All");
  const[data,setData]=useState(users);
  const list=data.filter(u=>filter==="All"||u.role===filter);
  return <div className="card panel">
    <PanelTitle eyebrow="Account operations" title="User management" action={<select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Candidate</option><option>Recruiter</option></select>}/>
    <DataTable heads={["User","Role","Location","Status","Last active","Action"]} rows={list.map(u=>[
      <><b>{u.name}</b><small>{u.email}</small></>,u.role,u.location,<Status text={u.status}/>,u.activity,
      <div className="inline-btns"><button className="icon-plain" onClick={()=>toast("User profile opened")}><Eye size={15}/></button><button className="icon-plain" onClick={()=>{setData(data.map(x=>x.id===u.id?{...x,status:x.status==="Suspended"?"Active":"Suspended"}:x));toast("User status updated")}}>{u.status==="Suspended"?<UserCheck size={15}/>:<UserX size={15}/>}</button></div>
    ])}/>
  </div>
}

function CompaniesPage({toast}){
  const[data,setData]=useState(companies);
  const verify=id=>{setData(data.map(c=>c.id===id?{...c,status:"Verified",risk:"Low"}:c));toast("Company verified")};
  return <div className="card panel"><PanelTitle eyebrow="Trust & verification" title="Company management" action={<button className="secondary mini" onClick={()=>{const rows=["Company,Sector,Open Jobs,Status",...data.map(c=>`${c.name},${c.sector},${c.jobs},${c.status}`)];const blob=new Blob([rows.join("\n")],{type:"text/csv"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="hirely-companies.csv";a.click();URL.revokeObjectURL(url);toast("Company CSV exported")}}><Download size={14}/>Export</button>}/>
    <DataTable heads={["Company","Sector","Open jobs","Risk","Status","Action"]} rows={data.map(c=>[
      <><b>{c.name}</b><small>{c.country} - {c.size}</small></>,c.sector,c.jobs,<Status text={c.risk}/>,<Status text={c.status}/>,
      c.status==="Pending"?<button className="primary mini" onClick={()=>verify(c.id)}>Verify</button>:<button className="secondary mini" onClick={()=>toast("Company review opened")}>Review</button>
    ])}/>
  </div>
}

function JobsPage({toast}){
  const[data,setData]=useState(jobs);
  const[filter,setFilter]=useState("All");
  const update=(id,status)=>{setData(data.map(j=>j.id===id?{...j,status}:j));toast("Job status updated")};
  const visible=data.filter(j=>filter==="All"||(filter==="Paused"&&j.status==="Paused")||(filter==="Flagged"&&j.status==="Under review"));
  return <div className="card panel"><PanelTitle eyebrow="Marketplace quality" title="Job moderation" action={<div className="segmented">{["All","Flagged","Paused"].map(x=><button key={x} className={filter===x?"active":""} onClick={()=>setFilter(x)}>{x}</button>)}</div>}/>
    <DataTable heads={["Job","Company","Applicants","Views","Status","Action"]} rows={visible.map(j=>[
      <><b>{j.title}</b><small>{j.location} - {j.salary}</small></>,j.company,j.applicants,j.views,<Status text={j.status}/>,
      <div className="inline-btns"><button className="secondary mini" onClick={()=>update(j.id,"Active")}>Approve</button><button className="secondary mini danger" onClick={()=>update(j.id,"Paused")}>Pause</button></div>
    ])}/>
  </div>
}

function ApplicationsPage(){return <>
  <div className="stats"><Stat label="Today" value="386" note="+8.4%" tone="good"/><Stat label="Under review" value="1,124" note="19h avg"/><Stat label="Interviews" value="421" note="7-day window"/><Stat label="Offers" value="89" note="6.4% conversion"/></div>
  <div className="card panel spaced"><PanelTitle eyebrow="Platform flow" title="Recent applications"/><DataTable heads={["Candidate","Role","Company","Match","Stage","Date"]} rows={applications.map(a=>[<b>{a.candidate}</b>,a.role,a.company,a.match+"%",<Status text={a.stage}/>,a.date])}/></div>
</>}

function ReportsPage({toast}){
  const[data,setData]=useState([
    {id:"RPT-881",reason:"Fake job claim",target:"Senior Data Analyst",severity:"High",status:"Open"},
    {id:"RPT-876",reason:"Misleading salary",target:"Backend Engineer",severity:"Medium",status:"Reviewing"},
    {id:"RPT-870",reason:"Spam recruiter",target:"USR-8821",severity:"High",status:"Open"},
    {id:"RPT-865",reason:"Duplicate posting",target:"Frontend Developer",severity:"Low",status:"Resolved"}
  ]);
  return <div className="card panel"><PanelTitle eyebrow="Safety center" title="Reports & investigations"/>
    <DataTable heads={["Report","Reason","Target","Severity","Status","Action"]} rows={data.map(r=>[
      r.id,r.reason,<b>{r.target}</b>,<Status text={r.severity}/>,<Status text={r.status}/>,
      <button className="text-btn" onClick={()=>{setData(data.map(x=>x.id===r.id?{...x,status:"Resolved"}:x));toast("Report resolved")}}>{r.status==="Resolved"?"Resolved":"Resolve"}</button>
    ])}/>
  </div>
}

function TaxonomyPage({toast}){
  const[skills,setSkills]=useState(["JavaScript","React","React Native","Supabase","PostgreSQL","Python","UI/UX","Machine Learning"]);
  const[skill,setSkill]=useState("");
  const[cats,setCats]=useState(categories);
  const[editing,setEditing]=useState(null);
  const[newCat,setNewCat]=useState(false);
  return <>
    <div className="two-col">
      <div className="card panel"><PanelTitle eyebrow="Taxonomy" title="Job categories" action={<button className="primary mini" onClick={()=>setNewCat(true)}><Plus size={14}/>Category</button>}/>
        {cats.map(c=><div className="taxonomy-row" key={c.name}><div><b>{c.name}</b><small>{c.skills} mapped skills</small></div><strong>{c.jobs}</strong><span>jobs</span><button className="icon-plain" onClick={()=>setEditing(c)}><Pencil size={14}/></button></div>)}
      </div>
      <div className="card panel"><PanelTitle eyebrow="Skill library" title="Skills"/><div className="skill-adder"><input value={skill} onChange={e=>setSkill(e.target.value)} placeholder="Add a skill"/><button className="primary mini" onClick={()=>{if(skill.trim()){setSkills([...skills,skill.trim()]);setSkill("");toast("Skill added")}}}>Add</button></div><div className="chips editable">{skills.map(s=><button key={s} onClick={()=>setSkills(skills.filter(x=>x!==s))}>{s} x</button>)}</div></div>
    </div>
    <DemoModal open={!!editing} title="Edit category" subtitle={editing?.name} onClose={()=>setEditing(null)} footer={<button className="primary" onClick={()=>{toast("Category updated");setEditing(null)}}>Save category</button>}><Field label="Category name"><input defaultValue={editing?.name}/></Field><Field label="Mapped skills"><input defaultValue={editing?.skills}/></Field></DemoModal>
    <DemoModal open={newCat} title="Create category" subtitle="Add a new synthetic marketplace category" onClose={()=>setNewCat(false)} footer={<button className="primary" onClick={()=>{setCats([...cats,{name:"Cybersecurity",jobs:0,skills:12}]);setNewCat(false);toast("Category created")}}>Create category</button>}><Field label="Category name"><input defaultValue="Cybersecurity"/></Field><Field label="Mapped skills"><input defaultValue="12"/></Field></DemoModal>
  </>
}

function SupportPage({toast}){
  const[data,setData]=useState(tickets);
  return <div className="support-grid">
    <div className="card panel"><PanelTitle eyebrow="Support inbox" title="Open tickets" action={<span className="status">{data.filter(t=>t.status!=="Resolved").length} active</span>}/>
      {data.map(t=><div className="ticket-row" key={t.id}><div><b>{t.subject}</b><small>{t.id} - {t.user} - {t.age}</small></div><Status text={t.priority}/><Status text={t.status}/><button className="text-btn" onClick={()=>{setData(data.map(x=>x.id===t.id?{...x,status:"Resolved"}:x));toast("Ticket resolved")}}>Resolve</button></div>)}
    </div>
    <div className="card panel"><PanelTitle eyebrow="Service quality" title="Support SLA"/><div className="big-score">91%</div><Progress label="First response < 1h" value={94}/><Progress label="Resolved < 24h" value={89}/><Progress label="CSAT" value={94}/></div>
  </div>
}

function AnalyticsPage(){return <>
  <div className="stats"><Stat label="Monthly active users" value="9.8k" note="+12.6%" tone="good"/><Stat label="Applications" value="5.84k" note="+8.1%" tone="good"/><Stat label="Hire conversion" value="6.4%" note="+0.7%"/><Stat label="Avg. review time" value="19h" note="-3.2h" tone="good"/></div>
  <div className="two-col"><div className="card panel"><PanelTitle eyebrow="Growth" title="Applications trend"/><BarChart values={[42,58,51,74,69,83,77,92,88,96,102,118]}/></div><div className="card panel"><PanelTitle eyebrow="Marketplace mix" title="Jobs by category"/><Progress label="Software Development" value={39}/><Progress label="Data & AI" value={24}/><Progress label="Design" value={14}/><Progress label="Other" value={23}/></div></div>
  <div className="card panel spaced"><PanelTitle eyebrow="Funnel" title="Hiring conversion"/><div className="funnel"><div style={{width:"100%"}}>Applications <b>5,842</b></div><div style={{width:"78%"}}>Reviewed <b>4,557</b></div><div style={{width:"43%"}}>Interviewed <b>2,512</b></div><div style={{width:"18%"}}>Offers <b>1,051</b></div><div style={{width:"8%"}}>Hired <b>467</b></div></div></div>
</>}

function AuditPage(){
  const[q,setQ]=useState("");
  const list=auditLogs.filter(x=>!q||JSON.stringify(x).toLowerCase().includes(q.toLowerCase()));
  return <div className="card panel"><PanelTitle eyebrow="Security" title="Audit trail" action={<div className="search-small"><Search size={14}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search audit log"/></div>}/><DataTable heads={["Time","Actor","Action","Target","IP"]} rows={list.map(x=>[x.time,x.actor,x.action,<b>{x.target}</b>,x.ip])}/></div>
}

function SettingsPage({toast}){
  const[p,setP]=useState({verification:true,moderation:true,signup:true,maintenance:false,digest:true,security:true});
  return <div className="settings-grid">
    <div className="card panel"><PanelTitle eyebrow="Platform controls" title="Access & moderation"/><SettingToggle label="Require employer verification" sub="Unverified companies cannot publish jobs." checked={p.verification} onChange={()=>setP({...p,verification:!p.verification})}/><SettingToggle label="Automatic moderation" sub="Flag suspicious jobs and accounts for review." checked={p.moderation} onChange={()=>setP({...p,moderation:!p.moderation})}/><SettingToggle label="Public signup" sub="Allow candidate and recruiter registration." checked={p.signup} onChange={()=>setP({...p,signup:!p.signup})}/><SettingToggle label="Maintenance mode" sub="Temporarily restrict public access." checked={p.maintenance} onChange={()=>setP({...p,maintenance:!p.maintenance})}/></div>
    <div className="card panel"><PanelTitle eyebrow="Operations" title="Notifications & SLA"/><SettingToggle label="Admin daily digest" sub="Platform health and moderation summary." checked={p.digest} onChange={()=>setP({...p,digest:!p.digest})}/><SettingToggle label="Security alerts" sub="High-risk sign-in and permission events." checked={p.security} onChange={()=>setP({...p,security:!p.security})}/><Field label="Support email"><input defaultValue="support@hirely.demo"/></Field><Field label="Default review SLA"><select defaultValue="24 hours"><option>12 hours</option><option>24 hours</option><option>48 hours</option></select></Field><button className="primary" onClick={()=>toast("Platform settings saved")}>Save settings</button></div>
    <div className="card panel security-panel"><PanelTitle eyebrow="Security" title="Admin session"/><div className="session-box"><LockKeyhole size={18}/><div><b>Current administrator</b><small>Chrome - Lahore - active now</small></div><Status text="Protected"/></div><button className="secondary" onClick={()=>toast("Security log opened")}>Review security activity</button></div>
  </div>
}
