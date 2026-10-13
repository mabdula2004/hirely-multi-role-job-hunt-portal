
import React,{useEffect,useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import {motion,AnimatePresence} from "framer-motion";
import {
  Home,Search,Sparkles,Bookmark,BriefcaseBusiness,CalendarDays,MessageSquare,BellRing,UserRound,FileText,Settings,
  Users,Building2,ChartNoAxesCombined,ShieldAlert,Tags,Headphones,ScrollText,LayoutDashboard,LogOut,Moon,Sun,Menu,X,
  CheckCircle2,Clock3,MapPin,DollarSign,ChevronRight,Plus,Filter,Eye,Pause,Play,ShieldCheck,CircleAlert,Send,Paperclip,
  Upload,Trash2,Pencil,Mail,Phone,Globe2,Star,TrendingUp,Download,LockKeyhole,SlidersHorizontal,UserCheck,UserX,Copy,
  Check,ArrowUpRight,Target,Layers3,BadgeCheck,Inbox,CalendarClock,Briefcase,BarChart3,FolderKanban,Heart,ChevronDown
} from "lucide-react";
import "./styles.css";

const JOBS=[
{id:1,title:"Frontend Engineer",company:"Northstar Labs",logo:"NL",location:"Remote — US/EMEA",mode:"Remote",type:"Full-time",salary:"$72k–$96k",match:94,status:"Active",applicants:128,views:1850,posted:"2h ago",skills:["React","JavaScript","Design Systems"],verified:true},
{id:2,title:"Full Stack Developer",company:"Aster Cloud",logo:"AC",location:"Remote",mode:"Remote",type:"Full-time",salary:"$80k–$108k",match:93,status:"Active",applicants:94,views:1320,posted:"5h ago",skills:["React","Supabase","PostgreSQL"],verified:true},
{id:3,title:"Product UI Engineer",company:"Monarch Studio",logo:"MS",location:"Berlin, Germany",mode:"Hybrid",type:"Full-time",salary:"€68k–€������q�^���