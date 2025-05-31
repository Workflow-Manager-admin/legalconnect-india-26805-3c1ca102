import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './App.css';

// PUBLIC_INTERFACE
// Main homepage for LegalConnect India with routing for all features

const COLORS = {
  primary: "#0D1B2A",
  accent: "#D4AF37",
  background: "#F5F5F5",
  blackOverlay: "rgba(12,24,40, 0.58)",
  navDropShadow: "0 4px 12px rgba(13,27,42,0.07)",
  shadow: "0 2px 14px 0 rgba(13,27,42,.11)",
  focus: "#1659d6"
};
const FONT_HEADING = "'Montserrat', 'Lato', Arial, sans-serif";
const FONT_BODY = "'Open Sans', 'Roboto', Arial, sans-serif";

const FontsPreload = () => (
  <React.Fragment>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
  </React.Fragment>
);

const icons = {
  lawyer: <span aria-label="lawyer" role="img" style={{ fontSize: 22 }}>⚖️</span>,
  doc: <span aria-label="document" role="img" style={{ fontSize: 22 }}>📄</span>,
  case: <span aria-label="case tracker" role="img" style={{ fontSize: 22 }}>⏱️</span>,
  video: <span aria-label="video call" role="img" style={{ fontSize: 22 }}>🎥</span>,
  rights: <span aria-label="rights" role="img" style={{ fontSize: 22 }}>📝</span>,
  forum: <span aria-label="forum" role="img" style={{ fontSize: 22 }}>💬</span>,
  signIn: <span aria-label="sign in" role="img" style={{ fontSize: 18 }}>🔒</span>
};

const NAV_LINKS = [
  { label: "Home", route: "/" , icon: icons.lawyer},
  { label: "Lawyer Match", route: "/match-lawyer", icon: icons.lawyer},
  { label: "Legal Docs", route: "/legal-docs", icon: icons.doc},
  { label: "Case Tracker", route: "/case-tracker", icon: icons.case},
  { label: "Video Consult", route: "/video-consult", icon: icons.video},
  { label: "Know Your Rights", route: "/know-your-rights", icon: icons.rights},
  { label: "Q&A Forum", route: "/qa-forum", icon: icons.forum}
];

// Minimal placeholder page for each feature
function PlaceholderPage({ heading, children }) {
  const navigate = useNavigate();
  return (
    <section style={{
      width: "100%",
      margin: "0 auto",
      maxWidth: 900,
      minHeight: "50vh",
      padding: "44px 0 30px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      background: COLORS.background,
      borderRadius: 18,
      boxShadow: COLORS.shadow,
    }}>
      <h2 style={{
        color: COLORS.primary,
        fontFamily: FONT_HEADING,
        fontWeight: 800,
        fontSize: "2rem",
        marginBottom: 16,
        marginTop: 0
      }}>{heading}</h2>
      {children}
      <button
        className="btn"
        style={{ marginTop: 28, background: COLORS.primary, color: "#fff", fontFamily: FONT_HEADING, fontWeight: 700, borderRadius: 7 }}
        onClick={() => navigate("/")}
        aria-label="Back to Home"
      >
        ← Back to Homepage
      </button>
    </section>
  );
}

// PUBLIC_INTERFACE
function MatchLawyerPage() {
  const [form, setForm] = useState({
    description: "",
    urgency: "Normal",
    budget: "",
    specialization: "Civil"
  });
  const [submitted, setSubmitted] = useState(false);

  const sampleLawyers = [
    {
      name: "Adv. Rina Sharma",
      rating: 4.8,
      specialization: "Property Law",
      exp: 12,
      results: ["High Court, Delhi", "Fluent: Hindi/English"]
    },
    {
      name: "Adv. Arjun Kadam",
      rating: 4.6,
      specialization: "Family Law",
      exp: 8,
      results: ["District Court, Mumbai", "Fluent: Marathi/English"]
    }
  ];

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <PlaceholderPage heading="Instant Lawyer Match">
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          padding: "19px 2vw",
          background: "#fff",
          borderRadius: 13,
          boxShadow: COLORS.shadow,
          marginBottom: 26
        }}
      >
        <form onSubmit={handleSubmit} className="lc-match-form" style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <label style={{ fontWeight: 600, color: COLORS.primary }}>
            Legal Issue Description
            <textarea
              name="description"
              style={{ width: "100%", marginTop: 3, padding: 8, borderRadius: 6, border: "1.1px solid #adbadc", minHeight: 44, resize: "vertical" }}
              value={form.description}
              onChange={handleChange}
              required
              maxLength={300}
              aria-label="Describe your legal issue"
              placeholder="Briefly describe your problem or legal need"
              disabled={submitted}
            />
          </label>
          <label style={{ fontWeight: 600 }}>
            Urgency
            <select
              name="urgency"
              style={{ width: "100%", marginTop: 3, padding: 7, borderRadius: 6, border: "1.1px solid #adbadc" }}
              value={form.urgency}
              onChange={handleChange}
              disabled={submitted}
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Immediate">Immediate</option>
            </select>
          </label>
          <label style={{ fontWeight: 600 }}>
            Budget Estimate (INR)
            <input
              type="number"
              name="budget"
              min={500}
              placeholder="(Optional)"
              value={form.budget}
              onChange={handleChange}
              style={{ width: "100%", marginTop: 3, padding: 8, borderRadius: 6, border: "1.1px solid #adbadc" }}
              disabled={submitted}
            />
          </label>
          <label style={{ fontWeight: 600 }}>
            Area of Law / Specialization
            <select
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              disabled={submitted}
              style={{ width: "100%", marginTop: 3, padding: 7, borderRadius: 6, border: "1.1px solid #adbadc" }}
            >
              <option value="Civil">Civil</option>
              <option value="Criminal">Criminal</option>
              <option value="Property Law">Property Law</option>
              <option value="Family Law">Family Law</option>
              <option value="Corporate">Corporate</option>
              <option value="Constitutional">Constitutional</option>
            </select>
          </label>
          {!submitted &&
            <button className="btn btn-large" style={{ background: COLORS.accent, color: COLORS.primary, fontWeight: 800, fontFamily: FONT_HEADING, borderRadius: 6 }}>
              {icons.lawyer} Find My Lawyer
            </button>
          }
        </form>
        {submitted &&
          <div style={{ marginTop: 23 }}>
            <div style={{ fontFamily: FONT_HEADING, color: COLORS.primary, fontWeight: 700, fontSize: "1.12rem", marginBottom: 13, display: "flex", alignItems: "center", gap: 6 }}>
              {icons.lawyer} Matched Lawyers (Sample)
            </div>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
              {sampleLawyers.map(lawyer => (
                <div key={lawyer.name} style={{ background: "#f7faff", borderRadius: 12, padding: 13, width: 230, boxShadow: "0 1px 6px #e1e6ee" }}>
                  <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: "1.08rem", marginBottom: 4 }}>{lawyer.name}</div>
                  <div style={{ fontSize: "0.96rem", color: "#225", marginBottom: 3 }}>{lawyer.specialization}</div>
                  <div style={{ fontSize: "0.94rem", color: "#6d7298" }}>Experience: <b>{lawyer.exp} yrs</b></div>
                  <div style={{ fontSize: "0.98rem", color: COLORS.accent, fontWeight: 700, margin: "5px 0" }}>
                    {Array.from({ length: Math.floor(lawyer.rating) }, (v, i) => <span key={i}>★</span>)}<span style={{ filter: "grayscale(.5)", color: "#bbb" }}>{lawyer.rating % 1 ? "☆" : ""}</span>
                  </div>
                  <ul style={{ margin: "5px 0 0 0", padding: "0 0 0 15px", color: "#444", fontSize: "0.93rem" }}>
                    {lawyer.results.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                  <button className="btn" style={{ marginTop: 10, background: COLORS.primary, color: "#fff", fontWeight: 600, fontFamily: FONT_HEADING, borderRadius: 4, fontSize: "0.96rem" }}>
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        }
        {submitted && <div style={{ marginTop: 18 }}>
          <button onClick={() => setSubmitted(false)} className="btn" style={{ background: COLORS.accent, color: COLORS.primary, fontWeight: 700, fontFamily: FONT_HEADING, borderRadius: 6 }}>Try New Match</button>
        </div>}
      </div>
    </PlaceholderPage>
  );
}

// PUBLIC_INTERFACE
function LegalDocsPage() {
  const [docUpload, setDocUpload] = useState({ filename: "", filled: "" });
  const templates = [
    { name: "Rental Agreement", url: "#" },
    { name: "Non-Disclosure Agreement (NDA)", url: "#" },
    { name: "Affidavit (General)", url: "#" }
  ];
  return (
    <PlaceholderPage heading="Legal Documents Generator">
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          marginBottom: 28,
          background: "#fff",
          borderRadius: 14,
          boxShadow: COLORS.shadow,
          padding: "18px 2vw"
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <div style={{ color: COLORS.primary, fontFamily: FONT_HEADING, fontWeight: 700, fontSize: "1.12rem", marginBottom: 7 }}>
            {icons.doc} Download Sample Templates
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {templates.map((tpl, i) => (
              <li key={i} style={{ marginBottom: 7 }}>
                <a href={tpl.url} download style={{ textDecoration: "none", color: COLORS.primary, fontWeight: 500, fontSize: "1.055rem", background: COLORS.accent, borderRadius: 5, padding: "5px 15px", boxShadow: "0 0 4px #e6e8f5", display: "inline-block" }}>
                  {tpl.name} ⬇️
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ color: COLORS.primary, fontFamily: FONT_HEADING, fontWeight: 700, marginBottom: 7, fontSize: "1.12rem" }}>
            Fill or Upload Document
          </div>
          <input
            type="file"
            accept=".doc,.pdf,.docx"
            style={{ marginBottom: 8 }}
            onChange={e => setDocUpload({ ...docUpload, filename: e.target.files[0]?.name || "" })}
          />
          <textarea
            placeholder="Fill sample affidavit here or paste text"
            style={{ width: "100%", minHeight: 52, borderRadius: 7, border: "1.1px solid #adbadc", marginBottom: 7, padding: 8 }}
            value={docUpload.filled}
            onChange={e => setDocUpload({ ...docUpload, filled: e.target.value })}
            maxLength={800}
          ></textarea>
          <button className="btn" style={{ background: COLORS.accent, color: COLORS.primary, fontWeight: 600, fontFamily: FONT_HEADING, borderRadius: 5, width: "100%" }}>
            Upload/Fake Save
          </button>
          <div style={{ fontSize: "0.95rem", color: "#227", marginTop: 8, minHeight: 12 }}>
            {docUpload.filename ? <span>Selected: {docUpload.filename}</span> : null}
          </div>
        </div>
      </div>
    </PlaceholderPage>
  );
}

// PUBLIC_INTERFACE
function CaseTrackerPage() {
  // Static sample data for illustration
  const sampleCase = {
    name: "Family Land Dispute",
    number: "DL-2021-0192923",
    status: "Pending - Hearing Scheduled",
    milestones: [
      { label: "Case Filed", date: "2021-12-14" },
      { label: "First Hearing", date: "2022-01-09" },
      { label: "Respondent Replied", date: "2022-02-01" },
      { label: "Next Hearing", date: "2024-06-21", isUpcoming: true }
    ]
  };

  return (
    <PlaceholderPage heading="Case Tracker">
      <div
        style={{
          width: "100%",
          maxWidth: 530,
          minHeight: 200,
          background: "#fff",
          borderRadius: 14,
          boxShadow: COLORS.shadow,
          padding: "21px 2vw 15px 2vw",
          marginBottom: 24
        }}
      >
        <div style={{ fontFamily: FONT_HEADING, fontWeight: 700, marginBottom: 9, color: COLORS.primary, fontSize: "1.1rem" }}>
          Case: {sampleCase.name}
        </div>
        <div style={{ color: "#547", fontWeight: 500, marginBottom: 6, fontSize: "1.05rem" }}>
          Case No: {sampleCase.number}
        </div>
        <div style={{ marginBottom: 13 }}>
          <span style={{
            padding: "3px 13px",
            borderRadius: 15,
            background: sampleCase.status.includes("Pending") ? "#ffe5a0" : "#bff4b5",
            color: "#5c4732",
            fontWeight: 600,
            fontSize: "0.99rem"
          }}>{sampleCase.status}</span>
        </div>
        <div>
          <div style={{ margin: "10px 0 7px", fontWeight: 600, color: "#2e355a" }}>Timeline</div>
          <ol style={{ padding: "0 0 0 11px", marginBottom: 0 }}>
            {sampleCase.milestones.map((m, idx) => (
              <li
                key={m.label}
                style={{
                  color: m.isUpcoming ? COLORS.accent : "#2d2e52",
                  fontWeight: 600,
                  marginBottom: 5,
                  fontSize: "1.02rem"
                }}
              >
                {m.label}
                <span style={{ fontWeight: 500, color: "#555", marginLeft: 10, fontSize: "0.96rem" }}>
                  {m.date}
                </span>
                {m.isUpcoming && <span style={{ marginLeft: 9, color: COLORS.primary, fontWeight: 800, fontSize: "0.93rem" }}>(Upcoming)</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </PlaceholderPage>
  );
}

// PUBLIC_INTERFACE
function VideoConsultPage() {
  // Fake calendar: array of time slots for a single day for demonstration
  const sampleSlots = [
    "09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "05:30 PM", "07:00 PM"
  ];

  const [selected, setSelected] = useState(null);
  const [booked, setBooked] = useState(false);

  function handleBook() {
    setBooked(true);
    setTimeout(() => setBooked(false), 2300);
  }

  return (
    <PlaceholderPage heading="Video Consultation">
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          marginBottom: 22,
          background: "#fff",
          borderRadius: 12,
          boxShadow: COLORS.shadow,
          padding: "18px 2vw 27px"
        }}
      >
        <div style={{ color: COLORS.primary, fontFamily: FONT_HEADING, fontWeight: 700, marginBottom: 15, fontSize: "1.15rem" }}>
          Book a Time Slot
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
          {sampleSlots.map((slot, idx) => (
            <button
              key={slot}
              style={{
                background: selected === idx ? COLORS.accent : COLORS.primary,
                color: selected === idx ? COLORS.primary : "#fff",
                border: `2.2px solid ${COLORS.accent}`,
                borderRadius: 8,
                padding: "10px 17px",
                fontFamily: FONT_HEADING,
                fontWeight: 700,
                fontSize: "1.06rem",
                cursor: "pointer",
                boxShadow: "0 2px 7px #e2e3f3"
              }}
              onClick={() => setSelected(idx)}
              aria-pressed={selected === idx}
              disabled={booked}
            >
              {slot}
            </button>
          ))}
        </div>
        <button
          className="btn"
          style={{
            background: COLORS.accent,
            color: COLORS.primary,
            width: "100%",
            fontWeight: 700,
            fontFamily: FONT_HEADING,
            borderRadius: 8
          }}
          onClick={handleBook}
          disabled={selected == null || booked}
        >
          {booked ? "Booked!" : "Book Consultation"}
        </button>
      </div>
    </PlaceholderPage>
  );
}

// PUBLIC_INTERFACE
function KnowYourRightsPage() {
  // Sample categories with mock rich descriptions
  const rights = [
    {
      title: "Property Rights",
      brief: "Understand your property buying, inheritance, and ownership rights.",
      content: "Indian law protects your right to buy, inherit, and transfer property. Check land/flat titles before buying. Women have equal inheritance rights under the Hindu Succession Act. If encroached or illegally dispossessed, file a civil suit in relevant court."
    },
    {
      title: "Marriage & Family Rights",
      brief: "Your rights in marriage, divorce, domestic issues and inheritance.",
      content: "Marriage registration protects your rights. In case of abuse, women can file FIRs under Domestic Violence Act. Mutual divorce is possible under Section 13B. Maintenance/child custody is legally protected."
    },
    {
      title: "Cyber Law",
      brief: "Safeguard your data, privacy, and online reputation.",
      content: "Report online harassment/cyber fraud to the nearest cyber police. The IT Act 2000 protects digital transactions and privacy. Do not share OTPs or personal details with unknown parties."
    }
  ];

  // Expand/collapse controller for demonstration
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <PlaceholderPage heading="Know Your Rights">
      <div style={{ width: "100%", maxWidth: 650, display: "flex", flexDirection: "column", gap: 18, marginBottom: 25 }}>
        {rights.map((cat, i) => (
          <section
            key={cat.title}
            style={{
              background: "#fff",
              borderRadius: 13,
              boxShadow: COLORS.shadow,
              padding: "18px 21px",
              borderLeft: `7px solid ${COLORS.accent}`,
              marginBottom: 0,
              cursor: "pointer",
              outline: openIdx === i ? `3px solid ${COLORS.accent}` : "none"
            }}
            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            tabIndex={0}
            aria-expanded={openIdx === i}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setOpenIdx(openIdx === i ? -1 : i); }}
          >
            <div style={{ color: COLORS.accent, fontFamily: FONT_HEADING, fontWeight: 800, fontSize: "1.08rem", marginBottom: 3 }}>
              <span style={{ marginRight: 7 }}>{icons.rights}</span>
              {cat.title}
            </div>
            <div style={{ color: "#3a4660", marginBottom: 6, fontWeight: 600 }}>{cat.brief}</div>
            {openIdx === i &&
              <div style={{ color: "#2b313c", fontSize: "1.02rem", marginTop: 5, lineHeight: 1.49 }}>
                {cat.content}
              </div>
            }
            <div style={{ marginTop: 8, color: COLORS.primary, fontWeight: 700, fontSize: "0.97rem" }}>
              {openIdx === i ? "Hide details ▲" : "Show details ▼"}
            </div>
          </section>
        ))}
      </div>
    </PlaceholderPage>
  );
}

// PUBLIC_INTERFACE
function QaForumPage() {
  // Sample QAs
  const [qInput, setQInput] = useState("");
  const [questions, setQuestions] = useState([
    {
      q: "Can my landlord evict me without notice?",
      a: "No, as per Indian law, a written eviction notice is mandatory except in special cases."
    },
    {
      q: "How can I file for mutual divorce?",
      a: "File a joint petition under Section 13B of Hindu Marriage Act with both parties’ consent."
    },
    {
      q: "My employer hasn't paid my salary. What can I do?",
      a: "Send a legal notice; if unresolved, file a complaint in the labour court."
    }
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!qInput.trim()) return;
    setQuestions([{ q: qInput.trim(), a: "Awaiting lawyer response..." }, ...questions]);
    setQInput("");
  }

  return (
    <PlaceholderPage heading="Q&A Forum">
      <div
        style={{
          width: "100%",
          maxWidth: 630,
          marginBottom: 25,
          background: "#fff",
          borderRadius: 14,
          boxShadow: COLORS.shadow,
          padding: "19px 2vw"
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 13 }}
        >
          <input
            type="text"
            value={qInput}
            onChange={e => setQInput(e.target.value)}
            required
            maxLength={180}
            aria-label="Type your legal question (anonymous)"
            placeholder="Type your question (anonymous)"
            style={{
              flex: 1,
              border: "1px solid #607fc1",
              borderRadius: 8,
              padding: "9px 13px",
              fontSize: "1.05rem",
              fontFamily: FONT_BODY
            }}
          />
          <button className="btn" style={{ background: COLORS.accent, color: COLORS.primary, fontWeight: 700, fontFamily: FONT_HEADING, borderRadius: 6 }}>
            Ask
          </button>
        </form>
        <div>
          {questions.map((item, i) => (
            <div
              key={item.q + i}
              style={{
                marginBottom: 15,
                background: "#f9f9fe",
                borderRadius: 10,
                padding: "12px 14px"
              }}
            >
              <div style={{ fontWeight: 800, color: COLORS.primary, marginBottom: 3 }}>
                Q: {item.q}
              </div>
              <div style={{ marginLeft: 0, color: "#222e", fontWeight: 600 }}>
                <span style={{ color: COLORS.accent, fontWeight: 800 }}>A:&nbsp;</span>{item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PlaceholderPage>
  );
}

// --- HERO HEADER FOR HOME ---
const LEGAL_BG_URL = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=70';
function HeroHeader() {
  return (
    <header
      id="home"
      tabIndex={-1}
      style={{
        position: "relative",
        width: "100%",
        minHeight: 340,
        paddingTop: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(${COLORS.blackOverlay},${COLORS.blackOverlay}),url(${LEGAL_BG_URL}) center/cover no-repeat`,
        color: "#fff",
      }}
      aria-label="Welcome Legal Hero"
    >
      <section
        style={{
          width: "100%",
          maxWidth: 900,
          textAlign: "center",
          padding: "38px 2vw 36px",
          margin: "0 auto"
        }}>
        <span
          className="subtitle"
          style={{
            color: COLORS.accent,
            fontFamily: FONT_HEADING,
            fontWeight: 700,
            fontSize: "1.18rem",
            letterSpacing: 1
          }}
        >
          Connecting You to India's Trusted Legal Experts
        </span>
        <h1
          style={{
            margin: "21px 0 12px",
            color: "#fff",
            fontSize: "3.4rem",
            fontFamily: FONT_HEADING,
            fontWeight: 800,
            letterSpacing: ".01em",
            textShadow: "0 2px 18px #02101a9c, 0 0 3px #0008"
          }}>
          Legal Help, Instantly. <span style={{ fontSize: "2.1rem", verticalAlign: "middle" }}>⚖️</span>
        </h1>
        <p
          style={{
            fontFamily: FONT_BODY,
            color: "#ffe",
            fontWeight: 500,
            fontSize: "1.22rem",
            margin: "0 auto 12px",
            maxWidth: 470,
            textShadow: "0 1px 6px #1e2a31db"
          }}>
          Get matched with top lawyers, generate documents, track your case, and more — all in a click, trusted by thousands across India.
        </p>
      </section>
    </header>
  );
}

// --- SIGN IN BUTTON HANDLER (mock) ---
function SignInModal({ open, onClose, onSignedIn }) {
  const [fields, setFields] = useState({ name: '', address: '', mobile: '' });
  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }
  function handleSignIn(e) {
    e.preventDefault();
    onSignedIn(fields.name);
    onClose();
  }
  if (!open) return null;
  return (
    <div
      className="lc-modal"
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000,
        background: "rgba(16,22,28,0.32)", display: "flex", alignItems: "center", justifyContent: "center"
      }}>
      <form
        style={{
          background: "#fff",
          padding: "34px 30px",
          borderRadius: 16,
          minWidth: 300,
          color: COLORS.primary,
          boxShadow: "0 2px 18px #1a263716"
        }}
        onSubmit={handleSignIn}
        aria-label="Sign In Modal"
      >
        <h3 style={{ margin: "0 0 18px", color: COLORS.primary, fontFamily: FONT_HEADING }}>Sign In</h3>
        <label htmlFor="userName" style={{ fontWeight: 600 }}>Name:</label>
        <input id="userName" name="name" value={fields.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 8, padding: 7, borderRadius: 5, border: '1.3px solid #adbadc', fontFamily: FONT_BODY }} />
        <label htmlFor="address" style={{ fontWeight: 600 }}>Address:</label>
        <input id="address" name="address" value={fields.address} onChange={handleChange} required style={{ width: '100%', marginBottom: 8, padding: 7, borderRadius: 5, border: '1.3px solid #adbadc', fontFamily: FONT_BODY }} />
        <label htmlFor="mobile" style={{ fontWeight: 600 }}>Mobile:</label>
        <input id="mobile" name="mobile" type="tel" pattern="[0-9]{10}" maxLength="10" value={fields.mobile} required style={{ width: '100%', marginBottom: 8, padding: 7, borderRadius: 5, border: '1.3px solid #adbadc', fontFamily: FONT_BODY }} />
        <button className="btn btn-large" style={{ background: COLORS.primary, color: '#fff', width: "100%", marginTop: 7, fontWeight: 700, fontFamily: FONT_HEADING }}>Sign In</button>
        <button type="button" style={{
          marginTop: 10, background: "transparent", border: "none", color: COLORS.primary,
          fontWeight: 700, cursor: "pointer", display: "block", width: "100%", fontFamily: FONT_HEADING
        }} onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

// --- SIGN UP MODAL (MATCHING SIGN IN MODAL PATTERN) ---
function SignUpModal({ open, onClose }) {
  const [fields, setFields] = useState({ name: '', email: '', password: '', confirm: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }
  function handleSignUp(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1400); // brief "signed up" pseudo-flash
  }
  if (!open) return null;
  return (
    <div
      className="lc-modal"
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 2100,
        background: "rgba(16,22,28,0.32)", display: "flex", alignItems: "center", justifyContent: "center"
      }}>
      <form
        style={{
          background: "#fff",
          padding: "33px 30px",
          borderRadius: 17,
          minWidth: 300,
          width: 340,
          color: COLORS.primary,
          boxShadow: "0 2px 18px #1a263716",
        }}
        onSubmit={handleSignUp}
        aria-label="Sign Up Modal"
      >
        <h3 style={{ margin: "0 0 16px", color: COLORS.primary, fontFamily: FONT_HEADING }}>Sign Up</h3>
        <label htmlFor="signupName" style={{ fontWeight: 600 }}>Name:</label>
        <input id="signupName" name="name" type="text" value={fields.name} onChange={handleChange} required disabled={submitted} style={{ width: '100%', marginBottom: 8, padding: 7, borderRadius: 5, border: '1.3px solid #adbadc', fontFamily: FONT_BODY }} />
        <label htmlFor="signupEmail" style={{ fontWeight: 600 }}>Email:</label>
        <input id="signupEmail" name="email" type="email" value={fields.email} onChange={handleChange} required disabled={submitted} style={{ width: '100%', marginBottom: 8, padding: 7, borderRadius: 5, border: '1.3px solid #adbadc', fontFamily: FONT_BODY }} />
        <label htmlFor="signupPassword" style={{ fontWeight: 600 }}>Password:</label>
        <input id="signupPassword" name="password" type="password" value={fields.password} onChange={handleChange} required minLength={6} disabled={submitted} style={{ width: '100%', marginBottom: 8, padding: 7, borderRadius: 5, border: '1.3px solid #adbadc', fontFamily: FONT_BODY }} />
        <label htmlFor="signupConfirm" style={{ fontWeight: 600 }}>Confirm Password:</label>
        <input id="signupConfirm" name="confirm" type="password" value={fields.confirm} onChange={handleChange} required minLength={6} disabled={submitted} style={{ width: '100%', marginBottom: 8, padding: 7, borderRadius: 5, border: '1.3px solid #adbadc', fontFamily: FONT_BODY }} />
        <button className="btn btn-large" disabled={submitted || fields.password !== fields.confirm} style={{
          background: COLORS.accent,
          color: COLORS.primary,
          width: "100%",
          marginTop: 10,
          fontWeight: 700,
          fontFamily: FONT_HEADING,
          opacity: fields.password !== fields.confirm ? 0.67 : 1,
          borderRadius: 7
        }}>
          {submitted ? "Signing up..." : "Sign Up"}
        </button>
        {fields.password !== fields.confirm && !submitted && (
          <div style={{ color: "#e54e2d", fontWeight: 600, fontSize: "0.97rem", marginTop: 2 }}>
            Passwords do not match
          </div>
        )}
        <button type="button" style={{
          marginTop: 12, background: "transparent", border: "none", color: COLORS.primary,
          fontWeight: 700, cursor: "pointer", display: "block", width: "100%", fontFamily: FONT_HEADING
        }} onClick={onClose} disabled={submitted}>Cancel</button>
      </form>
    </div>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer style={{
      marginTop: 46,
      background: COLORS.primary,
      color: "#fff",
      borderTop: `2.5px solid ${COLORS.accent}`,
      padding: "32px 0 12px",
      textAlign: "center",
      width: "100%",
      fontFamily: FONT_BODY,
      fontWeight: 500,
      fontSize: "1.05rem"
    }}>
      <div className="container" style={{ maxWidth: 740, margin: "0 auto" }}>
        &copy; {new Date().getFullYear()} LegalConnect India &middot; <a href="#privacy" style={{ color: COLORS.accent, textDecoration: "underline" }}>Privacy</a> &middot; <a href="#terms" style={{ color: COLORS.accent, textDecoration: "underline" }}>Terms</a> &middot; <span>Contact: <a href="mailto:help@legalconnect.in" style={{ color: COLORS.accent }}>help@legalconnect.in</a></span>
      </div>
    </footer>
  );
}

// --- NAVIGATION BAR ---
function NavigationBar() {
  return (
    <div
      className="main-horizontal-nav"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        margin: "0 auto",
        marginTop: 11,
        marginBottom: 6,
        gap: 0,
        position: "relative",
        overflowX: "auto",
        overflowY: "hidden",
        scrollbarWidth: "thin",
        WebkitOverflowScrolling: "touch",
        background: "var(--kavia-dark, #131a2a)",
      }}
      role="navigation"
      aria-label="Site Feature Navigation"
      tabIndex={0}
    >
      <div
        className="main-horizontal-features"
        id="main-horizontal-features"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 30,
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          whiteSpace: "nowrap",
          overflowX: "auto",
          overflowY: "hidden",
          flexWrap: "nowrap",
          padding: "3px 2vw",
          scrollbarWidth: "thin"
        }}
      >
        {NAV_LINKS.map(link => (
          <NavLink
            key={link.route}
            to={link.route}
            tabIndex={0}
            style={({isActive}) => ({
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: COLORS.primary,
              color: isActive ? COLORS.primary : COLORS.accent,
              fontFamily: FONT_HEADING,
              fontWeight: 700,
              fontSize: "1.01rem",
              borderRadius: 7,
              padding: "7px 15px",
              gap: 8,
              textDecoration: "none",
              boxShadow: COLORS.shadow,
              margin: "0 2px",
              border: `2px solid ${isActive ? COLORS.accent : "transparent"}`,
              transition: "background .13s, color .13s, border-color .13s",
              minWidth: 68,
              backgroundColor: isActive ? COLORS.accent : COLORS.primary
            })}
            aria-label={link.label}
          >
            {link.icon}
            <span style={{ fontWeight: 600 }}>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

// --- MAIN CONTAINER W/ ROUTES ---
function App() {
  const [signModal, setSignModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [signedName, setSignedName] = useState('');

  return (
    <Router>
      <div className="app" style={{
        background: COLORS.background,
        color: COLORS.primary,
        fontFamily: FONT_BODY,
        minHeight: "100vh"
      }}>
        <FontsPreload />
        {/* Header + account icon row */}
        <div style={{
          width: "100%",
          background: COLORS.primary,
          minHeight: 0,
          padding: "0",
          margin: 0,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div
            className="main-header-title"
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: 900,
              fontFamily: FONT_HEADING,
              fontSize: "2.6rem",
              letterSpacing: ".012em",
              padding: "32px 0 10px 0",
              margin: 0,
              lineHeight: 1.14,
              background: "none",
              border: "none",
              width: "100%",
              position: "relative"
            }}
          >
            <span style={{ fontSize: "2.2rem", verticalAlign: "middle", marginRight: 8 }}>⚖️</span>
            LegalConnect <span style={{ color: COLORS.accent, fontWeight: 900 }}>India</span>
          </div>
          {/* User icons panel: Sign In & Sign Up, visually prominent */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 17,
              marginRight: 16
            }}
          >
            {/* Sign Up: to left of sign in */}
            <button
              className="account-icon-btn sign-up-btn"
              tabIndex={0}
              aria-label="Sign Up"
              onClick={() => setSignUpModal(true)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSignUpModal(true);
                }
              }}
              style={{
                margin: 0,
                fontSize: 0
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 29,
                  color: "#FFD700",
                  borderRadius: "50%",
                  background: "#1A237E",
                  width: 48,
                  height: 48,
                  boxShadow: "0 2px 14px 0 rgba(13,27,42,.13)",
                  border: "2.5px solid #FFD700",
                  transition: "box-shadow .14s, background .14s"
                }}
                tabIndex={-1}
                aria-hidden="true"
              >
                <svg width="27" height="27" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
                  <circle cx="11" cy="11" r="10" fill="none"/>
                  <path d="M11 12.5c2.49 0 5 .9 5 2.19v1a.81.81 0 0 1-.81.81H6.81A.81.81 0 0 1 6 15.69v-1C6 13.4 8.51 12.5 11 12.5zm0-1.59a2.59 2.59 0 1 0 0-5.18 2.59 2.59 0 0 0 0 5.18zm5.85-1h-1.1v-1.1a.75.75 0 0 0-1.5 0v1.1h-1.1a.75.75 0 0 0 0 1.5h1.1v1.1a.75.75 0 0 0 1.5 0v-1.1h1.1a.75.75 0 0 0 0-1.5z" fill="#FFD700"/>
                </svg>
              </span>
              <span className="sr-only">Sign Up</span>
            </button>
            {/* Sign In icon */}
            <button
              onClick={() => setSignModal(true)}
              className="account-icon-btn sign-in-btn"
              aria-label={signedName ? "Account details" : "Sign In"}
              style={{
                margin: 0,
                fontSize: 0
              }}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  setSignModal(true);
                }
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 29,
                  color: "#1A237E", // navy for sign-in
                  borderRadius: "50%",
                  background: "#FFD700", // gold circle
                  width: 48,
                  height: 48,
                  boxShadow: "0 2px 14px 0 rgba(13,27,42,.13)",
                  border: "2.5px solid #1A237E",
                  transition: "box-shadow .14s, background .14s"
                }}
                tabIndex={-1}
                aria-hidden="true"
              >
                {/* SVG user icon (classic/solid) */}
                <svg width="25" height="25" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
                  <circle cx="11" cy="11" r="10" fill="none"/>
                  <path d="M11 12.5c2.49 0 5 .9 5 2.19v1a.81.81 0 0 1-.81.81H6.81A.81.81 0 0 1 6 15.69v-1C6 13.4 8.51 12.5 11 12.5zm0-1.59a2.59 2.59 0 1 0 0-5.18 2.59 2.59 0 0 0 0 5.18z" fill="#1A237E"/>
                </svg>
              </span>
              <span className="sr-only">{signedName ? "Your Account" : "Sign In"}</span>
            </button>
          </div>
        </div>

        <NavigationBar />

        {/* Sign Up Modal */}
        {signUpModal && (
          <SignUpModal
            open={signUpModal}
            onClose={() => setSignUpModal(false)}
          />
        )}

        {/* Sign In Modal */}
        {signModal && (
          <SignInModal
            open={signModal}
            onClose={() => setSignModal(false)}
            onSignedIn={setSignedName}
          />
        )}

        {/* Page Content as Routes */}
        <div style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: 35,
        }}>
          <main
            className="container"
            tabIndex={0}
            style={{
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: 1100,
              minHeight: "76vh",
              background: "transparent",
              paddingBottom: 0,
            }}
            aria-labelledby="main-content"
          >
            <Routes>
              <Route
                path="/"
                element={
                  <React.Fragment>
                    <HeroHeader />
                    <section style={{marginTop: 40, color: "#1a1a2a"}}>
                      <div style={{fontFamily: FONT_HEADING, fontWeight: 700, fontSize: "1.21rem", marginBottom: 18}}>
                        Welcome to LegalConnect India. Choose a service from the navigation above.
                      </div>
                    </section>
                  </React.Fragment>
                }
              />
              <Route path="/match-lawyer" element={<MatchLawyerPage />} />
              <Route path="/legal-docs" element={<LegalDocsPage />} />
              <Route path="/case-tracker" element={<CaseTrackerPage />} />
              <Route path="/video-consult" element={<VideoConsultPage />} />
              <Route path="/know-your-rights" element={<KnowYourRightsPage />} />
              <Route path="/qa-forum" element={<QaForumPage />} />
              {/* Unknown route fallback */}
              <Route
                path="*"
                element={<PlaceholderPage heading="Page Not Found">Sorry, this page doesn't exist.</PlaceholderPage>}
              />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
