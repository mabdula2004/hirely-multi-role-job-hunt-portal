import React,{useMemo,useState} from "react";
import {ArrowUpRight,BadgeCheck,CheckCircle2,Filter,MapPin,Search,SlidersHorizontal} from "lucide-react";
import {companies,jobs} from "../data/mockData";
import {DemoButton,DemoModal,Field,PageIntro,PublicJobCard,SectionTitle} from "../components/Common";

export function HomePage({go}){
  return <>
    <section className="hero"><div className="wrap hero-grid">
      <div><div className="eyebrow">A better way to move your career forward</div><h1>Find work that <span>fits your life.</span></h1><p>Search verified opportunities, understand your fit and manage the full hiring journey from one focused platform.</p><div className="hero-buttons"><button className="primary" onClick={()=>go("jobs")}>Explore jobs <ArrowUpRight size={17}/></button><button className="secondary" onClick={()=>go("companies")}>Browse companies</button></div></div>
      <div className="card hero-card"><div className="hero-card-top"><div className="eyebrow">Career intelligence</div><span className="status good">Live preview</span></div><div className="match-row"><div className="company-logo">NL</div><div><b>Frontend Engineer</b><small>Northstar Labs - Remote</small></div><strong>94%</strong></div><div className="chips"><span>React</span><span>JavaScript</span><span>Remote</span><span>Design Systems</span></div><div className="progress"><i style={{width:"94%"}}/></div><small>Strong match across skills, work mode and experience.</small></div>
    </div></section>
    <section className="metric-strip"><div className="wrap strip-grid"><div><b>2,931</b><span>Active jobs</span></div><div><b>684</b><span>Verified companies</span></div><div><b>9.8k</b><span>Monthly active users</span></div><div><b>3 roles</b><span>Candidate - Recruiter - Admin</span></div></div></section>
    <section className="section"><div className="wrap"><SectionTitle eyebrow="Recommended today" title="Roles worth your attention" action={<button className="secondary" onClick={()=>go("jobs")}>View all jobs</button>}/><div className="grid3">{jobs.slice(0,3).map(job=><PublicJobCard key={job.id} job={job}/>)}</div></div></section>
  </>
}

export function JobsPage({saved,setSaved,query,setQuery,workMode,setWorkMode,toast,go}){
  const[more,setMore]=useState(false);
  const[type,setType]=useState("All");
  const[minMatch,setMinMatch]=useState(0);
  const[selected,setSelected]=useState(null);
  const list=useMemo(()=>jobs.filter(job=>(!query||JSON.stringify(job).toLowerCase().includes(query.toLowerCase()))&&(workMode==="All"||job.mode===workMode)&&(type==="All"||job.type===type)&&job.match>=minMatch),[query,workMode,type,minMatch]);
  const toggle=id=>{setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);toast(saved.includes(id)?"Removed from saved jobs":"Job saved")};
  return <section className="section"><div className="wrap"><PageIntro eyebrow="Job marketplace" title="Find the right opportunity" text="Search by role, company, skill or location and refine by work mode."/>
    <div className="card filters"><div className="input-icon"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search jobs, skills or companies"/></div><select value={workMode} onChange={e=>setWorkMode(e.target.value)}><option>All</option><option>Remote</option><option>Hybrid</option><option>On-site</option></select><button className="secondary" onClick={()=>setMore(!more)}><SlidersHorizontal size={16}/>{more?"Hide filters":"More filters"}</button></div>
    {more&&<div className="card advanced-filters"><Field label="Employment type"><select value={type} onChange={e=>setType(e.target.value)}><option>All</option><option>Full-time</option><option>Internship</option></select></Field><Field label="Minimum match"><select value={minMatch} onChange={e=>setMinMatch(Number(e.target.value))}><option value="0">Any match</option><option value="85">85%+</option><option value="90">90%+</option><option value="95">95%+</option></select></Field><button className="secondary mini" onClick={()=>{setType("All");setMinMatch(0)}}>Clear filters</button></div>}
    <div className="result-line"><b>{list.length} opportunities</b><span>Verified employers prioritized</span></div>
    <div className="grid3">{list.map(job=><PublicJobCard key={job.id} job={job} saved={saved.includes(job.id)} onSave={()=>toggle(job.id)} onDetails={()=>setSelected(job)} onApply={()=>go("auth")}/>)}</div>
    <DemoModal open={!!selected} title={selected?.title||"Job details"} subtitle={selected?.company+" - "+selected?.location} onClose={()=>setSelected(null)} footer={<><button className="secondary" onClick={()=>{if(selected)toggle(selected.id)}}>{selected&&saved.includes(selected.id)?"Remove saved":"Save job"}</button><button className="primary" onClick={()=>{setSelected(null);go("auth")}}>Apply now</button></>}>
      <div className="modal-grid"><div><div className="eyebrow">Salary</div><h3>{selected?.salary}</h3></div><div><div className="eyebrow">Match</div><h3>{selected?.match}%</h3></div></div><p className="muted">Build product experiences with a collaborative engineering team. This is synthetic portfolio content.</p><div className="chips">{selected?.skills?.map(skill=><span key={skill}>{skill}</span>)}</div>
    </DemoModal>
  </div></section>
}

export function CompaniesPage({toast}){
  const[followed,setFollowed]=useState([]);
  const[selected,setSelected]=useState(null);
  return <section className="section"><div className="wrap"><PageIntro eyebrow="Company discovery" title="Know the team before you apply" text="Explore verified employers, hiring activity and workplace signals."/>
    <div className="grid3">{companies.map(company=><div className="card company-card" key={company.id}><div className="company-logo large">{company.initials}</div><h3>{company.name}</h3><p>{company.about}</p><div className="meta-line"><span>{company.sector}</span><span>{company.size}</span><span>{company.location}</span></div><div className="chips"><span><BadgeCheck size={13}/>{company.status}</span><span>{company.jobs} open roles</span></div><div className="dual"><button className="secondary" onClick={()=>setFollowed(f=>f.includes(company.id)?f.filter(x=>x!==company.id):[...f,company.id])}>{followed.includes(company.id)?"Following ✓":"Follow"}</button><button className="primary" onClick={()=>setSelected(company)}>View company</button></div></div>)}</div>
    <DemoModal open={!!selected} title={selected?.name||"Company"} subtitle={(selected?.sector||"")+" - "+(selected?.location||"")} onClose={()=>setSelected(null)} footer={<button className="primary" onClick={()=>{toast("Company followed from profile");setFollowed(f=>selected&&!f.includes(selected.id)?[...f,selected.id]:f);setSelected(null)}}>Follow company</button>}>
      <div className="company-profile-demo"><div className="company-hero"><div className="company-logo large">{selected?.initials}</div><div><h3>{selected?.name}</h3><p>{selected?.about}</p></div></div><div className="modal-grid"><div><div className="eyebrow">Open roles</div><h3>{selected?.jobs}</h3></div><div><div className="eyebrow">Followers</div><h3>{selected?.followers}</h3></div></div><div className="eyebrow">Company size</div><h3>{selected?.size}</h3><div><div className="eyebrow">Status</div><h3>{selected?.status}</h3></div></div></div>
    </DemoModal>
  </div></section>
}

export function AuthPage({mode,setMode,login}){
  const[signupRole,setSignupRole]=useState("candidate");
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[confirm,setConfirm]=useState("");
  const[company,setCompany]=useState("");
  const[error,setError]=useState("");
  const submit=()=>{
    setError("");
    if(mode==="signup"){
      if(name.trim().length<2)return setError("Enter your full name.");
      if(!email.includes("@"))return setError("Enter a valid email.");
      if(password.length<8)return setError("Password must be at least 8 characters.");
      if(password!==confirm)return setError("Passwords do not match.");
      if(signupRole==="recruiter"&&!company.trim())return setError("Company name is required.");
      login(signupRole);return;
    }
    if(!email||!password)return setError("Enter email and password, or use a demo account.");
    login("candidate");
  };
  return <section className="auth-page"><div className="card auth-shell">
    <div className="auth-aside"><div className="eyebrow white">Hirely workspace</div><h1>{mode==="signin"?"Welcome back.":"Create your workspace."}</h1><p>Explore complete candidate, recruiter and admin product workflows with synthetic portfolio data.</p><div className="aside-checks"><span><CheckCircle2 size={16}/>Role-aware dashboards</span><span><CheckCircle2 size={16}/>Responsive production-style UI</span><span><CheckCircle2 size={16}/>No real hiring actions sent</span></div></div>
    <div className="auth-form"><div className="switch-tabs"><button className={mode==="signin"?"active":""} onClick={()=>setMode("signin")}>Sign in</button><button className={mode==="signup"?"active":""} onClick={()=>setMode("signup")}>Sign up</button></div><h2>{mode==="signin"?"Sign in to Hirely":"Create your account"}</h2>
      {mode==="signup"&&<div className="role-tabs"><button className={signupRole==="candidate"?"active":""} onClick={()=>setSignupRole("candidate")}>Candidate</button><button className={signupRole==="recruiter"?"active":""} onClick={()=>setSignupRole("recruiter")}>Recruiter</button></div>}
      {mode==="signup"&&<Field label="Full name"><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name"/></Field>}
      <Field label="Email"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></Field>
      {mode==="signup"&&signupRole==="recruiter"&&<Field label="Company name"><input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company name"/></Field>}
      <Field label="Password"><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Minimum 8 characters"/></Field>
      {mode==="signup"&&<Field label="Confirm password"><input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Repeat password"/></Field>}
      {error&&<div className="error-box">{error}</div>}
      <button className="primary full" onClick={submit}>{mode==="signin"?"Sign in":"Create "+signupRole+" account"}</button>
      {mode==="signin"&&<div className="demo-accounts"><span>One-click demo accounts</span><DemoButton label="Candidate Demo" sub="Jobs, applications, profile & resume" onClick={()=>login("candidate")}/><DemoButton label="Recruiter Demo" sub="ATS, hiring pipeline & analytics" onClick={()=>login("recruiter")}/><DemoButton label="Admin Demo" sub="Moderation, support & platform controls" onClick={()=>login("admin")}/></div>}
    </div>
  </div></section>
}
