import React from "react";
import { Check, ChevronRight, Download, MapPin, Bookmark, Heart, X } from "lucide-react";

export function SectionTitle({ eyebrow, title, text, action }) {
  return <div className="section-title">
    <div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
    {action}
  </div>;
}

export function PageIntro({ eyebrow, title, text }) {
  return <div className="page-intro">
    {eyebrow && <div className="eyebrow">{eyebrow}</div>}
    <h1>{title}</h1>
    {text && <p>{text}</p>}
  </div>;
}

export function PanelTitle({ eyebrow, title, action }) {
  return <div className="panel-title">
    <div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h3>{title}</h3>
    </div>
    {action}
  </div>;
}

export function Stat({ label, value, note, tone = "" }) {
  return <div className="card stat">
    <span>{label}</span>
    <strong>{value}</strong>
    <em className={tone}>{note}</em>
  </div>;
}

export function Status({ text }) {
  const value = String(text).toLowerCase();
  const cls =
    value.includes("active") || value.includes("verified") || value.includes("offer") || value.includes("resolved") || value.includes("low")
      ? "good"
      : value.includes("pending") || value.includes("review") || value.includes("medium") || value.includes("shortlist") || value.includes("progress")
      ? "warn"
      : value.includes("high") || value.includes("suspend") || value.includes("pause") || value.includes("open")
      ? "danger"
      : "";
  return <span className={"status " + cls}>{text}</span>;
}

export function Progress({ label, value }) {
  return <div className="metric">
    <div><span>{label}</span><b>{value}%</b></div>
    <div className="progress"><i style={{ width: value + "%" }} /></div>
  </div>;
}

export function ListRow({ avatar, title, sub, badge, action }) {
  return <div className="list-row">
    <div className="avatar">{avatar}</div>
    <div><b>{title}</b><small>{sub}</small></div>
    {badge && <span className="status">{badge}</span>}
    {action}
  </div>;
}

export function DataTable({ heads, rows }) {
  return <div className="table-wrap">
    <table>
      <thead><tr>{heads.map((head) => <th key={head}>{head}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export function Toggle({ checked, onChange }) {
  return <button className={checked ? "toggle on" : "toggle"} onClick={onChange}><i /></button>;
}

export function SettingToggle({ label, sub, checked, onChange }) {
  return <div className="setting-row">
    <div><b>{label}</b><small>{sub}</small></div>
    <Toggle checked={checked} onChange={onChange} />
  </div>;
}

export function Field({ label, children }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}

export function DemoButton({ label, sub, onClick }) {
  return <button className="demo-btn" onClick={onClick}>
    <div><b>{label}</b><small>{sub}</small></div>
    <ChevronRight size={16} />
  </button>;
}

export function BarChart({ values }) {
  const max = Math.max(...values);
  return <>
    <div className="bar-chart">
      {values.map((v, i) => <i key={i} style={{ height: (v / max * 100) + "%" }}><span>{v}</span></i>)}
    </div>
    <div className="axis"><span>Week 1</span><span>Week 4</span></div>
  </>;
}

export function PublicJobCard({ job, saved, onSave, onApply, onDetails }) {
  return <article className="card job-card">
    <div className="job-top">
      <div className="company-logo">{job.logo}</div>
      <div><b>{job.title}</b><small>{job.company}</small></div>
      {onSave && <button className={saved ? "save-btn saved" : "save-btn"} onClick={onSave}>
        {saved ? <Heart size={17} fill="currentColor" /> : <Bookmark size={17} />}
      </button>}
    </div>
    <div className="meta-line"><span><MapPin size={13} />{job.location}</span><span>{job.type}</span></div>
    <div className="chips">{job.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
    <div className="salary-line"><b>{job.salary}</b><span>{job.match}% match</span></div>
    <div className="posted">{job.posted} - {job.verified ? "Verified employer" : "Employer"}</div>
    {onApply && <div className="dual">
      <button className="secondary" onClick={onDetails}>Details</button>
      <button className="primary" onClick={onApply}>Apply now</button>
    </div>}
  </article>;
}

export function DashJobCard({ job, onApply, onRemove, onDetails }) {
  return <article className="card dash-job">
    <div className="job-top">
      <div className="company-logo">{job.logo}</div>
      <div><b>{job.title}</b><small>{job.company}</small></div>
      {onRemove && <button className="icon-plain" onClick={onRemove}>x</button>}
    </div>
    <div className="meta-line"><span><MapPin size={13} />{job.location}</span><span>{job.salary}</span></div>
    <div className="chips">{job.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
    <div className="match-bar"><span>{job.match}% match</span><div className="progress"><i style={{ width: job.match + "%" }} /></div></div>
    <div className="dual"><button className="secondary" onClick={onDetails}>View details</button><button className="primary" onClick={onApply}>Apply</button></div>
  </article>;
}

export function MiniPipeline() {
  const stages = [["Applied", 18, 42], ["Reviewing", 7, 27], ["Interview", 4, 18], ["Offer", 1, 8]];
  return <div className="pipeline-mini">
    {stages.map(([label, count, pct]) => <div key={label}><span>{count}</span><b>{label}</b><small>{pct}% of pipeline</small></div>)}
  </div>;
}

export function ActivityFeed({ items }) {
  return <div className="activity-feed">
    {items.map((item, i) => <div key={i}>
      <span className="activity-dot" />
      <div><b>{item.action}</b><small>{item.actor} - {item.target}</small></div>
      <time>{item.time}</time>
    </div>)}
  </div>;
}


export function DemoModal({ open, title, subtitle, children, onClose, footer }) {
  if (!open) return null;
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="demo-modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e)=>e.stopPropagation()}>
      <div className="modal-head">
        <div><div className="eyebrow">Interactive demo</div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>
        <button className="icon-plain" aria-label="Close modal" onClick={onClose}><X size={18}/></button>
      </div>
      <div className="modal-body">{children}</div>
      {footer && <div className="modal-footer">{footer}</div>}
    </div>
  </div>;
}
