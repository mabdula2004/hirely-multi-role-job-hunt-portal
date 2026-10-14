export const jobs = [
  { id: 1, title: "Frontend Engineer", company: "Northstar Labs", logo: "NL", location: "Remote - US/EMEA", mode: "Remote", type: "Full-time", salary: "$72k-$96k", match: 94, status: "Active", applicants: 128, views: 1850, posted: "2h ago", skills: ["React", "JavaScript", "Design Systems"], verified: true },
  { id: 2, title: "Full Stack Developer", company: "Aster Cloud", logo: "AC", location: "Remote", mode: "Remote", type: "Full-time", salary: "$80k-$108k", match: 93, status: "Active", applicants: 94, views: 1320, posted: "5h ago", skills: ["React", "Supabase", "PostgreSQL"], verified: true },
  { id: 3, title: "Product UI Engineer", company: "Monarch Studio", logo: "MS", location: "Berlin, Germany", mode: "Hybrid", type: "Full-time", salary: "EUR 68k-88k", match: 91, status: "Under review", applicants: 47, views: 890, posted: "1d ago", skills: ["React", "Motion", "CSS"], verified: true },
  { id: 4, title: "Junior Frontend Developer", company: "OrbitPay", logo: "OP", location: "Lahore, Pakistan", mode: "Hybrid", type: "Full-time", salary: "£18k-£26k", match: 88, status: "Active", applicants: 76, views: 1110, posted: "1d ago", skills: ["JavaScript", "React", "REST APIs"], verified: true },
  { id: 5, title: "React Native Engineer", company: "Canvas Health", logo: "CH", location: "Remote", mode: "Remote", type: "Full-time", salary: "$76k-$101k", match: 86, status: "Paused", applicants: 51, views: 760, posted: "2d ago", skills: ["React Native", "Expo", "JavaScript"], verified: true },
  { id: 6, title: "Frontend Intern", company: "OrbitPay", logo: "OP", location: "Lahore, Pakistan", mode: "On-site", type: "Internship", salary: "£8k-£12k", match: 97, status: "Active", applicants: 212, views: 3420, posted: "3h ago", skills: ["JavaScript", "React", "Git"], verified: true }
];

export const companies = [
  { id: 1, name: "Northstar Labs", initials: "NL", sector: "Developer Tools", size: "201-500", location: "Remote-first", country: "United States", jobs: 14, status: "Verified", risk: "Low", followers: "42.8k", about: "Developer infrastructure for distributed product teams." },
  { id: 2, name: "OrbitPay", initials: "OP", sector: "Fintech", size: "51-200", location: "Lahore / Hybrid", country: "Pakistan", jobs: 8, status: "Verified", risk: "Low", followers: "18.3k", about: "Payments infrastructure for fast-growing digital businesses." },
  { id: 3, name: "Aster Cloud", initials: "AC", sector: "Cloud Infrastructure", size: "501-1000", location: "Remote", country: "United Kingdom", jobs: 19, status: "Pending", risk: "Medium", followers: "31.6k", about: "Cloud operations and data tooling for engineering teams." },
  { id: 4, name: "Nexa Dynamics", initials: "ND", sector: "Artificial Intelligence", size: "11-50", location: "Austin, TX", country: "United States", jobs: 4, status: "Pending", risk: "High", followers: "6.9k", about: "Applied AI systems for enterprise workflow automation." },
  { id: 5, name: "Canvas Health", initials: "CH", sector: "HealthTech", size: "201-500", location: "Remote", country: "United States", jobs: 11, status: "Verified", risk: "Low", followers: "24.1k", about: "Digital care infrastructure for modern clinics." }
];

export const users = [
  { id: 1, name: "Ayesha Khan", email: "ayesha@example.com", role: "Candidate", status: "Active", joined: "Oct 12", location: "Lahore", activity: "8m ago" },
  { id: 2, name: "Omar Malik", email: "omar@northstar.demo", role: "Recruiter", status: "Active", joined: "Oct 11", location: "Dubai", activity: "21m ago" },
  { id: 3, name: "Sara Ahmed", email: "sara@example.com", role: "Candidate", status: "Review", joined: "Oct 10", location: "Karachi", activity: "1h ago" },
  { id: 4, name: "Daniel Reed", email: "daniel@aster.demo", role: "Recruiter", status: "Active", joined: "Oct 09", location: "London", activity: "3h ago" },
  { id: 5, name: "James Cole", email: "james@example.com", role: "Candidate", status: "Suspended", joined: "Oct 07", location: "Manchester", activity: "2d ago" },
  { id: 6, name: "Mina Shah", email: "mina@example.com", role: "Candidate", status: "Active", joined: "Oct 06", location: "Islamabad", activity: "34m ago" }
];

export const applications = [
  { id: 1, candidate: "Ayesha Khan", role: "Frontend Engineer", company: "Northstar Labs", stage: "Interview", match: 95, date: "Oct 12", avatar: "AK" },
  { id: 2, candidate: "Omar Raza", role: "Full Stack Developer", company: "Aster Cloud", stage: "Reviewing", match: 92, date: "Oct 12", avatar: "OR" },
  { id: 3, candidate: "Sara Ahmed", role: "Product UI Engineer", company: "Monarch Studio", stage: "Shortlisted", match: 94, date: "Oct 11", avatar: "SA" },
  { id: 4, candidate: "James Cole", role: "Frontend Intern", company: "OrbitPay", stage: "Applied", match: 86, date: "Oct 11", avatar: "JC" },
  { id: 5, candidate: "Mina Shah", role: "React Native Engineer", company: "Canvas Health", stage: "Offer", match: 91, date: "Oct 10", avatar: "MS" }
];

export const tickets = [
  { id: "SUP-1048", user: "Ayesha Khan", subject: "Application status is not updating", priority: "High", status: "Open", age: "18m" },
  { id: "SUP-1047", user: "OrbitPay HR", subject: "Company verification document review", priority: "Medium", status: "In progress", age: "42m" },
  { id: "SUP-1042", user: "Daniel Reed", subject: "Job post billing question", priority: "Low", status: "Resolved", age: "3h" },
  { id: "SUP-1039", user: "Sara Ahmed", subject: "Resume preview issue", priority: "Medium", status: "Open", age: "6h" }
];

export const auditLogs = [
  { time: "16:42:11", actor: "admin@hirely.demo", action: "Verified company", target: "OrbitPay", ip: "10.24.18.8" },
  { time: "16:31:02", actor: "moderator@hirely.demo", action: "Reviewed report", target: "JOB-2044", ip: "10.24.17.3" },
  { time: "16:18:49", actor: "system", action: "Auto-flagged account", target: "USR-8832", ip: "-" },
  { time: "15:57:15", actor: "admin@hirely.demo", action: "Updated category", target: "Frontend Development", ip: "10.24.18.8" },
  { time: "15:22:33", actor: "support@hirely.demo", action: "Closed ticket", target: "SUP-1042", ip: "10.24.16.9" }
];

export const categories = [
  { name: "Software Development", jobs: 1128, skills: 34 },
  { name: "Data & AI", jobs: 684, skills: 29 },
  { name: "Design", jobs: 412, skills: 18 },
  { name: "Product", jobs: 305, skills: 15 },
  { name: "Marketing", jobs: 244, skills: 22 }
];
