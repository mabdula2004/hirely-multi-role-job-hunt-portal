import React,{useState} from "react";
import {
  LayoutDashboard,Search,Sparkles,Bookmark,FolderKanban,CalendarDays,MessageSquare,BellRing,UserRound,FileText,Settings,
  BriefcaseBusiness,Users,Building2,ChartNoAxesCombined,ShieldAlert,Tags,Headphones,ScrollText,LogOut,Menu,ShieldCheck
} from "lucide-react";
import {CandidatePages} from "../pages/CandidatePages";
import {RecruiterPages} from "../pages/RecruiterPages";
import {AdminPages} from "../pages/AdminPages";

const nav = {
  candidate:[
    ["Overview",LayoutDashboard],["Find Jobs",Search],["Recommended",Sparkles],["Saved Jobs",Bookmark],
    ["Applications",FolderKanban],["Interviews",CalendarDays],["Messages",MessageSquare],["Job Alerts",BellRing],
    ["Career Profile",UserRound],["Resume Center",FileText],["Settings",Settings]
  ],
  recruiter:[
    ["Overview",LayoutDashboard],["Jobs",BriefcaseBusiness],["Applicants",Users],["Talent Search",Search],
    ["Interviews",CalendarDays],["Messages",MessageSquare],["Company Profile",Building2],["Analytics",ChartNoAxesCombined],
    ["Job Templates",FileText],["Settings",Settings]
  ],
  admin:[
    ["Overview",LayoutDashboard],["Users",Users],["Companies",Building2],["Jobs",BriefcaseBusiness],
    ["Applications",FolderKanban],["Reports",ShieldAlert],["Categories & Skills",Tags],["Support",Headphones],
    ["Analytics",ChartNoAxesCombined],["Audit Logs",ScrollText],["Settings",Settings]
  ]
};

const subtitles = {
  candidate:{
    "Overview":"Your job search, application momentum and next actions.",
    "Find Jobs":"Search high-quality opportunities with relevant filters.",
    "Recommended":"Prioritized opportunities based on your synthetic profile.",
    "Saved Jobs":"Keep promising roles organized before you apply.",
    "Applications":"Track every application and hiring stage.",
    "Interviews":"Prepare for and manage upcoming interview sessions.",
    "Messages":"Keep recruiter conversations in one focused inbox.",
    "Job Alerts":"Control saved searches and notification frequency.",
    "Career Profile":"Manage the profile recruiters discover and evaluate.",
    "Resume Center":"Maintain role-specific resumes and choose a default.",
    "Settings":"Control your account, privacy, notifications and security."
  },
  recruiter:{
    "Overview":"Hiring performance, pipeline health and urgent actions.",
    "Jobs":"Create, edit, pause and monitor job posts.",
    "Applicants":"Review candidates across a structured ATS pipeline.",
    "Talent Search":"Discover high-fit candidates before they apply.",
    "Interviews":"Coordinate interviews and capture scorecards.",
    "Messages":"Communicate with candidates inside the hiring workflow.",
    "Company Profile":"Manage employer brand, culture and company details.",
    "Analytics":"Measure applicant quality and job performance.",
    "Job Templates":"Reuse polished job structures for faster publishing.",
    "Settings":"Manage recruiter preferences, team access and notifications."
  },
  admin:{
    "Overview":"Platform health, moderation and operational risk.",
    "Users":"Manage candidates, recruiters and account access.",
    "Companies":"Verify employers and protect marketplace trust.",
    "Jobs":"Moderate listings and publishing quality.",
    "Applications":"Monitor application flow across the platform.",
    "Reports":"Investigate safety, spam and quality reports.",
    "Categories & Skills":"Maintain job taxonomy and skill mappings.",
    "Support":"Manage user support and response SLAs.",
    "Analytics":"Track growth, conversion and marketplace health.",
    "Audit Logs":"Review sensitive administrative activity.",
    "Settings":"Control platform access, moderation and security."
  }
};

export default function Workspace({role,section,setSection,onLogout,toast}){
  const[open,setOpen]=useState(false);
  const RolePages=role==="candidate"?CandidatePages:role==="recruiter"?RecruiterPages:AdminPages;
  return <div className="workspace">
    <aside className={open?"sidebar open":"sidebar"}>
      <div className="side-role"><span className="role-dot"/><div><b>{role.charAt(0).toUpperCase()+role.slice(1)} workspace</b><small>Synthetic demo account</small></div></div>
      <div className="nav-label">Workspace</div>
      {nav[role].map(([name,Icon])=><button key={name} className={section===name?"side-link active":"side-link"} onClick={()=>{setSection(name);setOpen(false)}}><Icon size={18}/><span>{name}</span></button>)}
      <button className="side-link logout" onClick={onLogout}><LogOut size={18}/><span>Sign out</span></button>
    </aside>
    <main className="main">
      <div className="demo-notice"><ShieldCheck size={16}/>Portfolio demo - all people, companies, jobs and hiring activity are synthetic.</div>
      <div className="dash-title"><div><div className="eyebrow">{role}</div><h1>{section}</h1><p>{subtitles[role][section]}</p></div><button className="icon-btn mobile side-toggle" onClick={()=>setOpen(!open)}><Menu size={18}/></button></div>
      <RolePages section={section} toast={toast} navigate={setSection}/>
    </main>
  </div>
}
