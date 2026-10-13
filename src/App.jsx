import React,{useEffect,useState} from "react";
import {AnimatePresence,motion} from "framer-motion";
import {Menu,Moon,Sun,X} from "lucide-react";
import Workspace from "./layouts/Workspace";
import {AuthPage,CompaniesPage,HomePage,JobsPage} from "./pages/PublicPages";

export default function App(){
  const[theme,setTheme]=useState(localStorage.getItem("hirely-theme")||"light");
  const[page,setPage]=useState("home");
  const[role,setRole]=useState(null);
  const[section,setSection]=useState("Overview");
  const[authMode,setAuthMode]=useState("signin");
  const[mobileNav,setMobileNav]=useState(false);
  const[toast,setToast]=useState("");
  const[saved,setSaved]=useState(()=>JSON.parse(localStorage.getItem("hirely-saved")||"[1,4]"));
  const[query,setQuery]=useState("");
  const[workMode,setWorkMode]=useState("All");

  useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem("hirely-theme",theme)},[theme]);
  useEffect(()=>localStorage.setItem("hirely-saved",JSON.stringify(saved)),[saved]);
  useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(""),2200);return()=>clearTimeout(timer)},[toast]);

  const go=(target)=>{setPage(target);setMobileNav(false);window.scrollTo({top:0,behavior:"smooth"})};
  const login=(targetRole)=>{setRole(targetRole);setSection("Overview");setPage("dashboard");setToast(targetRole.charAt(0).toUpperCase()+targetRole.slice(1)+" demo loaded")};

  return <div className="app">
    <header className="topbar">
      <button className="brand" onClick={()=>go("home")}><span>H</span>Hirely</button>
      {page!=="dashboard"&&<nav className={mobileNav?"open":""}>
        <button onClick={()=>go("home")}>Home</button>
        <button onClick={()=>go("jobs")}>Jobs</button>
        <button onClick={()=>go("companies")}>Companies</button>
        {!role&&<><button className="nav-mobile-auth" onClick={()=>{setAuthMode("signin");go("auth")}}>Sign in</button><button className="nav-mobile-auth" onClick={()=>{setAuthMode("signup");go("auth")}}>Create account</button></>}
      </nav>}
      <div className="top-actions">
        <button className="icon-btn" aria-label="Toggle theme" onClick={()=>setTheme(theme==="light"?"dark":"light")}>{theme==="light"?<Moon size={18}/>:<Sun size={18}/>}</button>
        {page!=="dashboard"&&!role&&<><button className="secondary desktop" onClick={()=>{setAuthMode("signin");go("auth")}}>Sign in</button><button className="primary desktop" onClick={()=>{setAuthMode("signup");go("auth")}}>Create account</button></>}
        {role&&page!=="dashboard"&&<button className="primary desktop" onClick={()=>go("dashboard")}>Dashboard</button>}
        {page!=="dashboard"&&<button className="icon-btn mobile" aria-label="Open navigation" onClick={()=>setMobileNav(!mobileNav)}>{mobileNav?<X size={18}/>:<Menu size={18}/>}</button>}
      </div>
    </header>

    <AnimatePresence mode="wait">
      <motion.div key={page} initial={{opacity:0,y:7}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:.18}}>
        {page==="home"&&<HomePage go={go}/>}
        {page==="jobs"&&<JobsPage saved={saved} setSaved={setSaved} query={query} setQuery={setQuery} workMode={workMode} setWorkMode={setWorkMode} toast={setToast} openAuth={()=>{setAuthMode("signin");go("auth")}}/>}
        {page==="companies"&&<CompaniesPage toast={setToast}/>}
        {page==="auth"&&<AuthPage mode={authMode} setMode={setAuthMode} login={login}/>}
        {page==="dashboard"&&role&&<Workspace role={role} section={section} setSection={setSection} onLogout={()=>{setRole(null);setSection("Overview");go("home")}} toast={setToast}/>}
      </motion.div>
    </AnimatePresence>

    {toast&&<motion.div className="toast" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}}>{toast}</motion.div>}
  </div>;
}
