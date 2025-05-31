import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
// Main homepage for LegalConnect India styled as a clean, elegant legal service site.

// Color & font system
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

// Preconnect for custom fonts
const FontsPreload = () => (
  <React.Fragment>
    {/* Google Fonts */}
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
  </React.Fragment>
);

// --- Icons, minimal inline for fast loads ---
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
  { label: "Home", anchor: "home" },
  { label: "Lawyer Match", anchor: "match" },
  { label: "Legal Docs", anchor: "docs" },
  { label: "Case Tracker", anchor: "case" },
  { label: "Video Consult", anchor: "video" },
  { label: "Know Your Rights", anchor: "rights" },
  { label: "Q&A Forum", anchor: "forum" }
];

// --- Modular Main Content Sections and Subcomponents are unchanged ---

// ... (Leave all modular sections from original code: SectionContainer, SidebarNav, InstantLawyerMatch, LegalDocsGenerator, CaseTracker, VideoConsultBooking, KnowYourRights, AnonymousForum, SignInModal, Footer)

function SectionContainer({ children, ariaId }) {
  return (
    <section
      id={ariaId}
      style={{
        width: "100%",
        background: COLORS.background,
        borderRadius: 18,
        boxShadow: COLORS.shadow,
        margin: "35px 0",
        padding: "60px 0",
        boxSizing: "border-box"
      }}>
      <div style={{ maxWidth: 970, margin: "0 auto", padding: "0 28px" }}>
        {children}
      </div>
    </section>
  );
}

// ... (Other content components unchanged; omitted here for brevity: copy existing from prompt)

function InstantLawyerMatch({ onResult }) {
  const [form, setForm] = useState({ issue: '', urgency: 'Normal', budget: '' });
  const [submitted, setSubmitted] = useState(false);

  const mockLawyers = [
    { name: "Amit Sharma", spec: "Civil Law", rating: 4.8 },
    { name: "Priya Mehra", spec: "Property Law", rating: 4.6 },
    { name: "Rajiv Gupta", spec: "Cyber Law", rating: 4.5 }
  ];

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    onResult && onResult(mockLawyers.slice(0, 3));
  }

  return (
    <SectionContainer ariaId="match">
      <h2 style={{
        fontSize: "2.2rem", color: COLORS.primary,
        fontFamily: FONT_HEADING,
        fontWeight: 800,
        marginBottom: 7, marginTop: 0, letterSpacing: ".01em"
      }}>{icons.lawyer} Instant Lawyer Match</h2>
      <form
        autoComplete="off"
        className="lc-match-form"
        style={{
          background: "#fff",
          color: COLORS.primary,
          borderRadius: 11,
          padding: "26px 22px",
          boxShadow: COLORS.shadow,
          display: "flex",
          flexDirection: "column",
          gap: 19,
          fontFamily: FONT_BODY,
          maxWidth: 420,
          margin: "0 auto"
        }}
        onSubmit={handleSubmit}
        aria-label="Instant Lawyer Match"
      >
        <label htmlFor="issue" style={{ fontWeight: 600, color: COLORS.primary }}>Your Legal Issue</label>
        <input
          id="issue"
          name="issue"
          type="text"
          value={form.issue}
          required
          autoFocus
          placeholder="Briefly describe (e.g., property dispute)..."
          onChange={handleChange}
          style={{
            padding: 9, borderRadius: 5, border: '1.2px solid #b1bad6',
            fontFamily: FONT_BODY
          }}
          aria-required="true"
        />

        <label htmlFor="urgency" style={{ fontWeight: 600, color: COLORS.primary }}>Urgency</label>
        <select
          id="urgency"
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
          style={{ padding: 7, borderRadius: 5 }}
        >
          <option>Normal</option>
          <option>Urgent</option>
        </select>

        <label htmlFor="budget" style={{ fontWeight: 600, color: COLORS.primary }}>Budget (INR)</label>
        <input
          id="budget"
          name="budget"
          type="number"
          min={0}
          value={form.budget}
          required
          placeholder="e.g., 2000"
          onChange={handleChange}
          style={{ padding: 9, borderRadius: 5, border: '1.2px solid #b1bad6', fontFamily: FONT_BODY }}
          aria-required="true"
        />

        <button
          type="submit"
          className="btn btn-large"
          style={{
            background: COLORS.primary,
            color: '#fff',
            borderRadius: 8,
            fontWeight: 700,
            fontFamily: FONT_HEADING,
            fontSize: "1.09rem",
            boxShadow: COLORS.shadow
          }}
          aria-label="Get Matched Lawyers"
        >Find My Lawyer</button>
      </form>
      {submitted && (
        <div
          aria-live="polite"
          style={{
            marginTop: 18,
            background: "#f9fafc",
            borderRadius: 8,
            padding: "16px 14px",
            boxShadow: "0 1px 3px #dbe4fd44"
          }}
        >
          <div style={{ color: COLORS.primary, fontWeight: 700, marginBottom: 6 }}>Matched Lawyers:</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {mockLawyers.map(lawyer =>
              <li key={lawyer.name} style={{
                padding: "7px 0",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <span>
                  <span role="img" aria-label="lawyer">👤</span> <b>{lawyer.name}</b>
                  <span style={{ color: "#355", marginLeft: 8, fontWeight: 400 }}>({lawyer.spec})</span>
                </span>
                <span style={{ color: COLORS.accent, fontWeight: 700 }}>&#9733; {lawyer.rating}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </SectionContainer>
  );
}

// ... (Other main content section components remain as originally implemented)

function LegalDocsGenerator() {
  const templates = [
    { id: 'rent', label: 'Rental Agreement' },
    { id: 'affid', label: 'Affidavit' },
    { id: 'nda', label: 'NDA' }
  ];
  const [selected, setSelected] = useState('');
  const [filled, setFilled] = useState({ name: '', party: '', date: '' });
  const [download, setDownload] = useState('');

  const handleTemplate = (id) => {
    setSelected(id); setDownload('');
    setFilled({ name: '', party: '', date: '' });
  };

  function handleChange(e) {
    setFilled({ ...filled, [e.target.name]: e.target.value });
  }

  function handleGenerate(e) {
    e.preventDefault();
    if (!selected) return;
    const docText =
      `LegalConnect: ${templates.find(x => x.id === selected).label}
Name: ${filled.name}
Second Party: ${filled.party}
Date: ${filled.date}`;
    setDownload(docText);
  }

  return (
    <SectionContainer ariaId="docs">
      <h2 style={{
        color: COLORS.primary, fontSize: "1.53rem", fontWeight: 800,
        margin: "0 0 12px", fontFamily: FONT_HEADING
      }}> {icons.doc} Legal Docs Generator </h2>
      <div style={{ display: "flex", gap: 15, flexWrap: "wrap", marginBottom: 17 }}>
        {templates.map(t =>
          <button
            className="btn"
            style={{
              background: selected === t.id ? COLORS.accent : COLORS.primary,
              color: selected === t.id ? COLORS.primary : "#fff",
              border: selected === t.id ? `2px solid ${COLORS.primary}` : "none",
              fontWeight: 700,
              fontFamily: FONT_HEADING
            }}
            onClick={() => handleTemplate(t.id)}
            aria-label={`Select ${t.label} template`}
            key={t.id}
          >{t.label}</button>
        )}
      </div>
      {selected && (
        <form onSubmit={handleGenerate} style={{
          marginTop: 10, background: "#fff", borderRadius: 8, padding: "19px 16px",
          maxWidth: 320, color: "#1a2142", fontFamily: FONT_BODY,
          boxShadow: COLORS.shadow
        }} autoComplete="off">
          <label htmlFor="name" style={{ fontWeight: 600 }}>Your Name:</label>
          <input id="name" name="name" value={filled.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 7, padding: 5, borderRadius: 5, border: '1.1px solid #c2cadd' }} />
          <label htmlFor="party" style={{ fontWeight: 600 }}>Second Party:</label>
          <input id="party" name="party" value={filled.party} onChange={handleChange} required style={{ width: '100%', marginBottom: 7, padding: 5, borderRadius: 5, border: '1.1px solid #c2cadd' }} />
          <label htmlFor="date" style={{ fontWeight: 600 }}>Date:</label>
          <input id="date" name="date" type="date" value={filled.date} onChange={handleChange} required style={{ width: '100%', marginBottom: 7, padding: 5, borderRadius: 5, border: '1.1px solid #c2cadd' }} />
          <button type="submit" className="btn btn-large" style={{ background: COLORS.primary, color: '#fff', width: '100%', fontWeight: 700, fontFamily: FONT_HEADING }}>Generate</button>
        </form>
      )}
      {download && (
        <div style={{
          marginTop: 10, background: "#F5F7FF", padding: 11, borderRadius: 6,
          fontFamily: FONT_BODY
        }}>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 14, color: '#333', margin: 0 }}>{download}</pre>
          <button
            className="btn"
            style={{ background: COLORS.accent, marginTop: 5, color: COLORS.primary, fontWeight: 700 }}
            onClick={() => alert('Downloaded (mock)')}
          >Download</button>
        </div>
      )}
    </SectionContainer>
  );
}

function CaseTracker() {
  const timeline = [
    { date: '2023-07-23', label: 'Case Filed', done: true },
    { date: '2023-08-05', label: 'First Hearing', done: true },
    { date: '2023-09-10', label: 'Evidence Submission', done: true },
    { date: '2023-10-15', label: 'Next Hearing', done: false }
  ];
  return (
    <SectionContainer ariaId="case">
      <h2 style={{
        color: COLORS.primary, fontSize: "1.53rem", fontWeight: 800,
        fontFamily: FONT_HEADING, margin: "0 0 14px"
      }}>{icons.case} Case Tracker</h2>
      <ol style={{
        borderLeft: `3px solid ${COLORS.accent}`,
        margin: 0,
        paddingLeft: 15,
        background: '#fff',
        borderRadius: 9,
        maxWidth: 375,
        fontFamily: FONT_BODY,
        fontWeight: 600,
        boxShadow: "0 1px 4px #eef2fa"
      }}>
        {timeline.map((item, idx) =>
          <li key={item.date} style={{
            marginBottom: 14,
            listStyle: 'none',
            color: item.done ? COLORS.accent : '#aab',
            fontWeight: item.done ? 800 : 500
          }}>
            <span>
              {item.label}
              <span style={{ fontWeight: 400, marginLeft: 9, color: '#999', fontSize: 13 }}>({item.date})</span>
              &nbsp;{item.done && <span style={{ color: COLORS.accent, fontSize: 17 }}>&#10003;</span>}
            </span>
          </li>
        )}
      </ol>
      <div style={{ marginTop: 13, color: "#65677a", fontSize: 14 }}>
        For full tracking, sign in and link your case reference.
      </div>
    </SectionContainer>
  );
}

function VideoConsultBooking() {
  return (
    <SectionContainer ariaId="video">
      <h2 style={{
        color: COLORS.primary, fontSize: "1.53rem", fontWeight: 800,
        margin: "0 0 14px", fontFamily: FONT_HEADING
      }}>{icons.video} Video Consultation Booking</h2>
      <form style={{
        background: '#fff', borderRadius: 8, padding: "19px 16px", maxWidth: 330,
        color: COLORS.primary, fontFamily: FONT_BODY, boxShadow: COLORS.shadow
      }}>
        <label htmlFor="lawyerName" style={{ fontWeight: 600 }}>Lawyer&apos;s Name:</label>
        <input id="lawyerName" name="lawyerName" type="text" required style={{ width: '100%', marginBottom: 7, padding: 5, borderRadius: 5, border: '1.1px solid #c2cadd' }} />
        <label htmlFor="date" style={{ fontWeight: 600 }}>Date:</label>
        <input id="date" name="date" type="date" required style={{ width: '100%', marginBottom: 7, padding: 5, borderRadius: 5, border: '1.1px solid #c2cadd' }} />
        <label htmlFor="time" style={{ fontWeight: 600 }}>Time:</label>
        <input id="time" name="time" type="time" required style={{ width: '100%', marginBottom: 7, padding: 5, borderRadius: 5, border: '1.1px solid #c2cadd' }} />
        <button type="submit" className="btn btn-large"
          style={{
            background: COLORS.primary, color: '#fff',
            fontWeight: 700, width: '100%', fontFamily: FONT_HEADING, borderRadius: 6, marginTop: 3
          }}>Book Video Consult</button>
      </form>
      <div style={{
        fontSize: 13, marginTop: 10, color: '#4C4E54', fontFamily: FONT_BODY
      }}>Link will be sent to your email/mobile (demo only).</div>
    </SectionContainer>
  );
}

function KnowYourRights() {
  const categories = [
    { cat: "Property", tip: "All property sales must be registered per Indian law." },
    { cat: "Marriage", tip: "Consent of both parties is mandatory for a valid marriage." },
    { cat: "Cyber Law", tip: "Online privacy is protected by IT Act, 2000." }
  ];
  return (
    <SectionContainer ariaId="rights">
      <h2 style={{
        color: COLORS.primary, fontSize: "1.53rem", fontWeight: 800,
        margin: "0 0 10px", fontFamily: FONT_HEADING
      }}>{icons.rights} Know Your Rights</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 19 }}>
        {categories.map(item =>
          <div key={item.cat} style={{
            background: '#fff',
            color: COLORS.primary,
            borderLeft: `6px solid ${COLORS.accent}`,
            borderRadius: 8,
            padding: "15px 19px",
            minWidth: 170,
            maxWidth: 320,
            fontSize: "1.04rem",
            fontWeight: 600,
            fontFamily: FONT_BODY,
            boxShadow: "1px 1px 9px #dbdbe9"
          }}>
            <b>{item.cat}:</b> {item.tip}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

function AnonymousForum() {
  const [q, setQ] = useState('');
  const [list, setList] = useState([
    { q: "How can I file an online FIR?", a: "Visit your state police website to file." },
    { q: "Is an unregistered rent agreement valid?", a: "It has limited legal value if not registered." }
  ]);
  function handleAsk(e) {
    e.preventDefault();
    if (q.trim().length > 2) {
      setList([{ q, a: "Pending lawyer answer" }, ...list]);
      setQ('');
    }
  }
  return (
    <SectionContainer ariaId="forum">
      <h2 style={{
        color: COLORS.primary, fontSize: "1.53rem", fontWeight: 800,
        margin: "0 0 11px", fontFamily: FONT_HEADING
      }}>{icons.forum} Anonymous Q&A Forum</h2>
      <form style={{ display: "flex", gap: 10, marginBottom: 11 }} onSubmit={handleAsk}>
        <input
          style={{ flex: 1, padding: 7, borderRadius: 5, border: '1.2px solid #b1bad6', fontFamily: FONT_BODY }}
          type="text" value={q}
          placeholder="Ask your legal question (anonymous)"
          aria-label="Question"
          onChange={e => setQ(e.target.value)} />
        <button className="btn" style={{
          background: COLORS.primary, color: "#fff", fontWeight: 700, fontFamily: FONT_HEADING
        }} type="submit">Ask</button>
      </form>
      <div style={{
        background: "#fff", borderRadius: 8, padding: "13px 12px",
        fontFamily: FONT_BODY, fontWeight: 500, boxShadow: "0 1px 4px #e0e3f1"
      }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {list.map((x, i) =>
            <li key={i} style={{ marginBottom: 10 }}>
              <div style={{
                color: COLORS.primary, fontWeight: 700, marginBottom: 2
              }}>Q: {x.q}</div>
              <div style={{
                marginLeft: 14,
                color: x.a === "Pending lawyer answer" ? COLORS.accent : "#229157",
                fontWeight: x.a === "Pending lawyer answer" ? 700 : 600
              }} aria-live={x.a === "Pending lawyer answer" ? "polite" : undefined}>
                {x.a}
              </div>
            </li>
          )}
        </ul>
      </div>
    </SectionContainer>
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

// --- MAIN CONTAINER ---
function App() {
  // Modal state for sign in
  const [signModal, setSignModal] = useState(false);
  const [signedName, setSignedName] = useState('');

  // Responsive: show sidebar if width > 1000px
  const [showSidebar, setShowSidebar] = useState(typeof window !== "undefined" ? window.innerWidth > 1140 : true);
  React.useEffect(() => {
    const handleResize = () => setShowSidebar(window.innerWidth > 1140);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive: handle mobile horizontal navigation menu (no longer used as all nav is scrollable horizontal)
  // const [navOpen, setNavOpen] = React.useState(false);
  // ... no navOpen logic now, always horizontal scroll

  return (
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
        {/* User icon (sign in) absolutely top right, accessible */}
        <button
          onClick={() => setSignModal(true)}
          className="account-icon-btn"
          aria-label={signedName ? "Account details" : "Sign In"}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            padding: "7px 12px",
            marginRight: 12,
            fontSize: 0,
            cursor: "pointer",
            outline: "none"
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
              fontSize: 26,
              color: COLORS.accent,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              width: 38,
              height: 38,
              boxShadow: COLORS.shadow,
              transition: "box-shadow .14s, background .14s"
            }}
            tabIndex={-1}
            aria-hidden="true"
          >
            <span style={{ fontSize: 22, marginTop: 1 }}>{'👤'}</span>
          </span>
          <span className="sr-only">{signedName ? "Your Account" : "Sign In"}</span>
        </button>
      </div>

      {/* Horizontal feature/nav row below header */}
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
        {/* Navigation/Features row: force nowrap, horizontal scroll on overflow */}
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
            <a
              key={link.anchor}
              href={`#${link.anchor}`}
              tabIndex={0}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: COLORS.primary,
                color: COLORS.accent,
                fontFamily: FONT_HEADING,
                fontWeight: 700,
                fontSize: "1.01rem",
                borderRadius: 7,
                padding: "7px 15px",
                gap: 8,
                textDecoration: "none",
                boxShadow: COLORS.shadow,
                margin: "0 2px",
                border: `2px solid transparent`,
                transition: "background .13s, color .13s, border-color .13s",
                minWidth: 68,
              }}
              onFocus={e => {
                e.target.style.background = COLORS.blackOverlay;
                e.target.style.borderColor = COLORS.accent;
              }}
              onBlur={e => {
                e.target.style.background = COLORS.primary;
                e.target.style.color = COLORS.accent;
                e.target.style.borderColor = "transparent";
              }}
              onMouseOver={e => {
                e.target.style.background = COLORS.accent;
                e.target.style.color = COLORS.primary;
              }}
              onMouseOut={e => {
                e.target.style.background = COLORS.primary;
                e.target.style.color = COLORS.accent;
              }}
              aria-label={link.label}
            >
              {icons[link.anchor] ?? icons.lawyer}
              <span style={{ fontWeight: 600 }}>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Sign In Modal */}
      {signModal && (
        <SignInModal
          open={signModal}
          onClose={() => setSignModal(false)}
          onSignedIn={setSignedName}
        />
      )}

      {/* Page Content: Centered horizontally */}
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
          {/* Hero/Welcome (centered) */}
          <HeroHeader />
          {/* Main feature sections */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 44,
            width: "100%",
          }}>
            {/* Center main content sections */}
            <InstantLawyerMatch />
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 36,
              justifyContent: "center",
              width: "100%"
            }}>
              <LegalDocsGenerator />
              <CaseTracker />
              <VideoConsultBooking />
            </div>
            <KnowYourRights />
            <AnonymousForum />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

// HeroHeader as before (separated for modularity)
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
      {/* Overlay for darkness for legal feel */}
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
          Connecting You to India&apos;s Trusted Legal Experts
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

export default App;
