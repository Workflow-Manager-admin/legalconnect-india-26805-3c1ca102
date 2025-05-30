import React, { useState } from 'react';
import './App.css';

/*
 * NAVIGATION LINKS CONFIG
 * Removed Sign-In from nav bar links. Auth handled in topbar only.
 */
const navLinks = [
  { key: 'home', label: 'Home' },
  { key: 'lawyer', label: 'Instant Lawyer Match' },
  { key: 'docs', label: 'Legal Docs Generator' },
  { key: 'cases', label: 'Case Tracker' },
  { key: 'video', label: 'Video Consultation Booking' },
  { key: 'rights', label: 'Know Your Rights' },
  { key: 'qa', label: 'Anonymous Q&A' }
];

/**
 * PUBLIC_INTERFACE
 * Main App Component, handles navigation, user auth, modals, and content switching.
 */
function App() {
  // Controls which feature to show in the main content
  const [activeFeature, setActiveFeature] = useState('home');
  const [signedInUser, setSignedInUser] = useState(null);
  // Modal control for auth overlays
  const [modalType, setModalType] = useState(null); // null | 'signin' | 'signup'
  const [modalSuccess, setModalSuccess] = useState("");

  function closeModal() {
    setModalType(null);
    setModalSuccess("");
  }

  // PUBLIC_INTERFACE
  function handleSignedIn(user) {
    setSignedInUser(user);
    setModalType(null);
    setModalSuccess("Sign In successful! Welcome, " + user.name);
    setTimeout(() => setModalSuccess(""), 1700);
  }
  // PUBLIC_INTERFACE
  function handleSignedUp(user) {
    setModalType(null);
    setModalSuccess("Sign Up successful! You may now sign in.");
    setTimeout(() => setModalSuccess(""), 1800);
  }

  // PUBLIC_INTERFACE
  function renderMainContent() {
    switch (activeFeature) {
      case 'lawyer':
        return (
          <InstantLawyerMatchSection />
        );
      case 'docs':
        return <LegalDocsSection />;
      case 'cases':
        return <CaseTrackerSection />;
      case 'video':
        return <VideoConsultSection />;
      case 'rights':
        return <KnowYourRightsSection />;
      case 'qa':
        return <AnonymousQnASection />;
      default:
        return <FeaturesStackedSections setActiveFeature={setActiveFeature} />;
    }
  }

  // PUBLIC_INTERFACE
  return (
    <div className="app">
      {/* Top Bar: Sign In/Sign Up at top right, modal triggers */}
      <div className="topbar-auth">
        <div className="topbar-spacer" />
        <div className="topbar-auth-actions">
          {signedInUser ? (
            <span>
              Welcome, {signedInUser.name}
              <button
                className="signin-btn"
                type="button"
                aria-label="Sign Out"
                tabIndex={0}
                style={{marginLeft: 18}}
                onClick={() => setSignedInUser(null)}
              >Sign Out</button>
            </span>
          ) : (
            <>
              <button className="signin-btn" type="button" aria-label="Sign In" tabIndex={0}
                onClick={() => setModalType('signin')}
              >Sign In</button>
              <button className="signup-link" type="button" aria-label="Sign Up" tabIndex={0}
                onClick={() => setModalType('signup')}
              >Sign Up</button>
            </>
          )}
        </div>
      </div>

      {/* Centered logo heading at very top */}
      <div className="heading-logo-container">
        <button
          className="brand-logo"
          tabIndex={0}
          aria-label="Indian Law Mate Home"
          onClick={() => setActiveFeature('home')}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setActiveFeature('home'); }}
          style={{ background: "none", border: "none" }}
        >
          <span className="logo-symbol" aria-hidden="true">⚖️</span>
          <span className="brand-name">Indian <span className="brand-name-secondary">Law Mate</span></span>
        </button>
      </div>

      {/* Nav bar just below the heading/logo, horizontal and centered */}
      <nav className="main-navbar-below-heading" aria-label="Primary">
        <ul className="navbar-nav" role="menu">
          {navLinks.map(link => (
            <li key={link.key}>
              <button
                className={`navbar-link${activeFeature === link.key ? " active" : ""}`}
                role="menuitem"
                tabIndex={0}
                aria-current={activeFeature === link.key ? "page" : undefined}
                onClick={() => setActiveFeature(link.key)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setActiveFeature(link.key); }}
                aria-label={link.label}
                type="button"
                style={{ background: "none", border: "none" }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Modal overlays for Sign In/Sign Up. Styled overlay, keyboard dismiss, click off, close btn. */}
      {(modalType === 'signin' || modalType === 'signup') && (
        <AuthModal
          type={modalType}
          onClose={closeModal}
          onSignedIn={handleSignedIn}
          onSignedUp={handleSignedUp}
        />
      )}
      {/* Display auth success messages in overlay at top */}
      {modalSuccess && (
        <div
          style={{
            position: 'fixed',
            top: 10, left: 0, width: "100vw", zIndex: 2001,
            display: 'flex', justifyContent: 'center', pointerEvents: 'none'
          }}
        >
          <div style={{
            background: "#4CAF50", color: "#fff",
            fontWeight: 700, fontSize: "1.09em", padding: "12px 40px",
            borderRadius: 7, boxShadow: "0 4px 18px rgba(23,32,44,0.17)",
            border: "2.5px solid #FFD700"
          }}>{modalSuccess}</div>
        </div>
      )}

      {/* Hero section with law-themed image + overlay */}
      <section className="hero-top" tabIndex={-1} aria-label="Legal Services Hero Banner">
        <div className="hero-top-blur" aria-hidden="true" />
        <div className="hero-top-content">
          <h1 className="hero-top-title">Indian Law Mate – Your Trusted Legal Platform</h1>
          <div className="hero-top-subtitle">
            Expert guidance. Instant solutions. Confidential &amp; accessible for all.
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main id="main-content" className="main-content" tabIndex={-1} aria-live="polite">
        {renderMainContent()}
      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div>
          &copy; {new Date().getFullYear()} Indian Law Mate &middot;
          <a href="#" style={{ margin: "0 1em" }}>Contact</a>
          <a href="#" style={{ margin: "0 1em" }}>Privacy Policy</a>
          <a href="#" style={{ margin: "0 1em" }}>Terms of Service</a>
        </div>
        <div className="footer-motto">
          Empowering Every Legal Journey – Indian Law, Accessible to All
        </div>
      </footer>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Stacked sections to introduce features interactively; clicking a CTA navigates to the embedded component.
 */
function FeaturesStackedSections({ setActiveFeature }) {
  // Section content definition
  const sections = [
    {
      key: 'lawyer',
      icon: '🔍',
      heading: 'Instant Lawyer Match',
      desc:
        "Describe your legal problem and get instantly matched with lawyers best suited for your issue, urgency, and budget.",
      bgClass: '',
      buttonText: 'Find a Lawyer',
    },
    {
      key: 'docs',
      icon: '📄',
      heading: 'Legal Document Generator',
      desc:
        "Instantly generate essential documents using guided, lawyer-verified templates customized for India.",
      bgClass: 'feature-section-legal-docs',
      buttonText: 'Create a Document',
    },
    {
      key: 'cases',
      icon: '🗂️',
      heading: 'Case Tracker',
      desc:
        "Monitor your engaged legal cases in a timeline with notifications and milestone tracking.",
      bgClass: 'feature-section-case-tracker',
      buttonText: 'Track My Cases',
    },
    {
      key: 'video',
      icon: '🎥',
      heading: 'Video Consultation Booking',
      desc:
        "Book video meetings with legal experts at your convenience. Get confidential legal advice via integrated video platforms.",
      bgClass: 'feature-section-video-booking',
      buttonText: 'Book Consultation',
    },
    {
      key: 'rights',
      icon: '⚖️',
      heading: 'Know Your Rights',
      desc:
        "Explore plain-English guides to Indian law—property, consumer, family, cyber, and more.",
      bgClass: 'feature-section-know-rights',
      buttonText: 'Explore Rights',
    },
    {
      key: 'qa',
      icon: '💬',
      heading: 'Anonymous Q&A',
      desc:
        "Ask your legal questions anonymously and get answers from verified lawyers. Search public Q&A for quick help.",
      bgClass: 'feature-section-anon-qa',
      buttonText: 'Ask a Question',
    },
    {
      key: 'signin',
      icon: '👤',
      heading: 'Sign-In',
      desc: "Sign in to access features like case tracking, booking, and download history.",
      bgClass: '',
      buttonText: 'Sign In',
    },
  ];
  return (
    <div className="stacked-features-root">
      {sections.map((s, idx) => (
        <section
          tabIndex={-1}
          className={`stacked-feature-section ${s.bgClass || ''}${idx > 0 ? ' section-with-border' : ''}`}
          aria-label={s.heading}
          key={s.key}
        >
          <div className="stacked-feature-inner">
            <span className="stacked-feature-icon" aria-hidden="true">{s.icon}</span>
            <h2 className="stacked-feature-heading">{s.heading}</h2>
            <div
              className="stacked-feature-desc"
              dangerouslySetInnerHTML={{ __html: s.desc }}
            />
            <button
              className="btn btn-accent btn-large"
              tabIndex={0}
              onClick={() => setActiveFeature(s.key)}
              style={{marginTop: '18px'}}
              type="button"
            >{s.buttonText}</button>
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Instant Lawyer Match: dynamic, interactive form and live lawyer-matching simulation.
 */
function InstantLawyerMatchSection() {
  const [values, setValues] = useState({
    issue: "",
    urgency: "Normal",
    budget: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);

  // Simple static demo lawyer DB
  const LAWYERS = [
    { name: 'Ritu Sharma', specialization: 'Property', rating: 4.7, location: 'Delhi', exp: 8 },
    { name: 'Amit Singh', specialization: 'Criminal', rating: 4.9, location: 'Bangalore', exp: 11 },
    { name: 'Priya Menon', specialization: 'Family', rating: 4.8, location: 'Mumbai', exp: 6 },
    { name: 'Harish Yadav', specialization: 'Civil', rating: 4.6, location: 'Pune', exp: 10 },
    { name: 'Leena Nair', specialization: 'Cyber', rating: 4.8, location: 'Hyderabad', exp: 9 },
    { name: 'Sushil Patil', specialization: 'Corporate', rating: 4.7, location: 'Delhi', exp: 7 },
  ];

  // PUBLIC_INTERFACE
  function handleChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  }

  // PUBLIC_INTERFACE
  function handleSubmit(evt) {
    evt.preventDefault();
    // Simulate filtered results based on specialization from "issue"
    let issue = values.issue.toLowerCase();
    const match = LAWYERS.filter(l =>
      (!values.location || l.location.toLowerCase().includes(values.location.toLowerCase())) &&
      (issue
        ? l.specialization.toLowerCase().includes(issue) ||
          (issue.includes('property') && l.specialization === 'Property') ||
          (issue.includes('criminal') && l.specialization === 'Criminal') ||
          (issue.includes('family') && l.specialization === 'Family') ||
          (issue.includes('cyber') && l.specialization === 'Cyber') ||
          (issue.includes('civil') && l.specialization === 'Civil') ||
          (issue.includes('company') && l.specialization === 'Corporate')
        : true)
    );
    // Return at most three by rating then experience
    setResults(
      [...match]
        .sort((a, b) => b.rating - a.rating || b.exp - a.exp)
        .slice(0, 3)
    );
    setSubmitted(true);
  }

  // PUBLIC_INTERFACE
  function reset() {
    setSubmitted(false);
    setResults([]);
    setValues({ issue: "", urgency: "Normal", budget: "", location: "" });
  }

  return (
    <section tabIndex={-1} className="stacked-feature-section" aria-label="Instant Lawyer Match">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">🔍</span>
        <h2 className="stacked-feature-heading">Instant Lawyer Match</h2>
        <div className="stacked-feature-desc" style={{marginBottom: 18}}>
          Fill in your legal issue to see matched lawyers instantly, filtered by specialization and location.
        </div>
        <form className="instant-lawyer-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="issue">Describe your Legal Issue<span style={{ color: "#b50a46" }}>*</span></label>
            <input
              id="issue"
              name="issue"
              required
              value={values.issue}
              onChange={handleChange}
              placeholder="E.g. rental dispute, cyber fraud, divorce..."
              type="text"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="urgency">Urgency</label>
            <select
              id="urgency"
              name="urgency"
              value={values.urgency}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>Urgent</option>
              <option>Emergency</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget (Optional)</label>
            <input
              id="budget"
              name="budget"
              value={values.budget}
              onChange={handleChange}
              type="text"
              placeholder="E.g. 1000-10000 INR"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Preferred Location (Optional)</label>
            <input
              id="location"
              name="location"
              value={values.location}
              onChange={handleChange}
              type="text"
              placeholder="E.g. Delhi, Mumbai..."
            />
          </div>
          <button className="btn btn-accent btn-large fade-in-btn" style={{marginTop: 2}} type="submit">Find Lawyers</button>
        </form>
        {submitted && (
          <div style={{ marginTop: 30, width: '100%' }}>
            <h3 style={{fontFamily: "Montserrat, Lato, Arial, sans-serif", fontWeight: 700, color: "#0D1B2A", fontSize: "1.17em", marginBottom: 2}}>Recommended Lawyers</h3>
            {results.length === 0 ? (
              <div style={{margin: "10px 0", color: "#b50a46"}}>No suitable lawyers found for your criteria.</div>
            ) : (
              <ul style={{padding: 0, listStyle: "none", marginTop: 8}}>
                {results.map((l, idx) => (
                  <li key={l.name} style={{
                    marginBottom: 13, padding: "13px 18px",
                    background: "#fcf7ed", borderRadius: 6, boxShadow: "0 1.5px 8px rgba(212,175,55,0.11)"
                  }}>
                    <strong>{l.name}</strong> ({l.specialization}) <span style={{color: "#FFD700"}}>★ {l.rating}</span><br />
                    <span style={{fontSize: "0.94em", color: "#444"}}>{l.exp} yrs exp. | {l.location}</span>
                  </li>
                ))}
              </ul>
            )}
            <button className="btn" onClick={reset} style={{marginTop: 2}}>Match Again</button>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Legal Docs Generator: Choose template, fill interactive form, "download" as simulated doc.
 */
function LegalDocsSection() {
  const templates = [
    {
      key: 'rental',
      name: 'Rental Agreement',
      fields: [
        { name: 'Landlord Name', key: 'landlord', req: true },
        { name: 'Tenant Name', key: 'tenant', req: true },
        { name: 'Property Address', key: 'address', req: true },
        { name: 'Monthly Rent (INR)', key: 'rent', req: true },
        { name: 'Agreement Term (months)', key: 'term', req: true },
      ]
    },
    {
      key: 'affidavit',
      name: 'Affidavit',
      fields: [
        { name: 'Deponent Name', key: 'deponent', req: true },
        { name: 'Subject/Statement', key: 'subject', req: true },
        { name: 'Date', key: 'date', req: true },
        { name: 'Place', key: 'place', req: false }
      ]
    },
    {
      key: 'nda',
      name: 'Non-disclosure Agreement (NDA)',
      fields: [
        { name: 'Party 1 Name', key: 'p1', req: true },
        { name: 'Party 2 Name', key: 'p2', req: true },
        { name: 'Purpose/Scope', key: 'purpose', req: true },
        { name: 'Validity (months)', key: 'months', req: true },
      ]
    }
  ];
  const [step, setStep] = useState(0); // 0: pick template, 1: fill fields
  const [tmpl, setTmpl] = useState(null);
  const [vals, setVals] = useState({});
  const [downloadContent, setDownloadContent] = useState(null);

  // PUBLIC_INTERFACE
  function handleTemplateChoose(tplKey) {
    setTmpl(templates.find(t => t.key === tplKey));
    setStep(1);
    setVals({});
    setDownloadContent(null);
  }
  // PUBLIC_INTERFACE
  function handleInputChange(e) {
    setVals({ ...vals, [e.target.name]: e.target.value });
  }
  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    // Basic validation: all req fields
    if (tmpl.fields.some(f => f.req && !vals[f.key])) return;
    // Compose the simple simulated legal document (plain text format)
    let body = "";
    if (tmpl.key === "rental") {
      body = `RENTAL AGREEMENT

This agreement is between ${vals.landlord} (Landlord) and ${vals.tenant} (Tenant) for the property at ${vals.address}.
Monthly Rent: INR ${vals.rent} | Term: ${vals.term} months.

[Signature]`;
    } else if (tmpl.key === "affidavit") {
      body = `AFFIDAVIT

I, ${vals.deponent}, solemnly affirm that: ${vals.subject}.
Date: ${vals.date} | Place: ${vals.place || '-'}

[Signature]`;
    } else if (tmpl.key === "nda") {
      body = `NON-DISCLOSURE AGREEMENT

This NDA is made between ${vals.p1} and ${vals.p2}.
Purpose: ${vals.purpose}
Validity: ${vals.months} months

[Signature]`;
    }
    setDownloadContent(body);
  }
  // PUBLIC_INTERFACE
  function downloadDoc() {
    // Just text download for demo
    const blob = new Blob([downloadContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `${tmpl.name.replace(/ /g, '_')}.txt`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }
  // PUBLIC_INTERFACE
  function reset() {
    setStep(0);
    setTmpl(null);
    setVals({});
    setDownloadContent(null);
  }

  return (
    <section tabIndex={-1} className="stacked-feature-section feature-section-legal-docs" aria-label="Legal Document Generator">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">📄</span>
        <h2 className="stacked-feature-heading">Legal Document Generator</h2>
        <div className="stacked-feature-desc">
          {step === 0 && <>Select a document template to generate:</>}
        </div>
        {step === 0 && (
          <div style={{display: "flex", flexDirection: "column", gap: "1em", marginTop: 12, marginBottom: 0}}>
            {templates.map(t => (
              <button key={t.key} className="btn btn-accent"
                onClick={() => handleTemplateChoose(t.key)}
                style={{width: "100%", fontWeight: 700}}
              >{t.name}</button>
            ))}
          </div>
        )}
        {step === 1 && tmpl && !downloadContent && (
          <form className="instant-lawyer-form" style={{marginTop: 16}} onSubmit={handleSubmit} autoComplete="off">
            <div style={{fontWeight: 600, marginBottom: 10}}>Fill in the required fields:</div>
            {tmpl.fields.map(field => (
              <div key={field.key} className="form-group">
                <label htmlFor={field.key}>
                  {field.name}{field.req && <span style={{color: "#b50a46"}}>*</span>}
                </label>
                <input
                  id={field.key}
                  name={field.key}
                  required={field.req}
                  type="text"
                  value={vals[field.key] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.name}...`}
                />
              </div>
            ))}
            <button className="btn btn-accent btn-large fade-in-btn" style={{marginTop: 8}} type="submit">Generate Document Preview</button>
          </form>
        )}
        {downloadContent && (
          <div style={{marginTop: 25}}>
            <div style={{fontWeight: 600, color: "#4CAF50", marginBottom: 5}}>Document Ready:</div>
            <pre style={{
              background: "#fcf7ed", border: "1.5px solid #FFD700", borderRadius: 7,
              padding: "14px 12px", fontFamily: "monospace", fontSize: "1.01em"
            }}>{downloadContent}</pre>
            <button className="btn btn-accent" onClick={downloadDoc} style={{marginTop: 9}}>Download .txt</button>
            <button className="btn" style={{marginLeft: 8}} onClick={reset}>Create Another</button>
          </div>
        )}
        {step === 1 && !downloadContent && (
          <button className="btn" style={{marginTop: 18}} onClick={reset}>Back</button>
        )}
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Case Tracker: Interactive timeline; clicking a step marks it active and cycles.
 */
function CaseTrackerSection() {
  // Demo cases/timeline statuses
  const [cases, setCases] = useState([
    {
      id: 1,
      title: "Property Dispute (Delhi)",
      timeline: [
        { label: "Consultation", date: "2024-03-01", done: true },
        { label: "Case Filed", date: "2024-03-15", done: true },
        { label: "Court Hearing: #1", date: "2024-05-10", done: true },
        { label: "Next Hearing", date: "2024-08-14", done: false }
      ]
    },
    {
      id: 2,
      title: "Cyber Complaint (Hyderabad)",
      timeline: [
        { label: "Consultation", date: "2024-04-10", done: true },
        { label: "FIR Lodged", date: "2024-04-14", done: true },
        { label: "Police Report", date: "-", done: false },
        { label: "Case Closed", date: "-", done: false }
      ]
    },
  ]);

  const [activeCase, setActiveCase] = useState(0);

  // PUBLIC_INTERFACE
  function toggleMilestone(ci, mi) {
    setCases(arr =>
      arr.map((c, idx) =>
        idx !== ci
          ? c
          : {
              ...c,
              timeline: c.timeline.map((step, sidx) =>
                sidx === mi
                  ? { ...step, done: !step.done }
                  : step
              )
            }
      )
    );
  }

  return (
    <section tabIndex={-1} className="stacked-feature-section feature-section-case-tracker" aria-label="Case Tracker">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">🗂️</span>
        <h2 className="stacked-feature-heading">Case Tracker</h2>
        <div className="stacked-feature-desc">
          Your ongoing law cases—timeline of hearings &amp; important milestones.<br />
        </div>
        <div style={{marginTop: 12}}>
          <label htmlFor="casePicker" style={{fontWeight: 600}}>Select Case:</label>{" "}
          <select
            id="casePicker"
            style={{marginLeft: 6, marginBottom: 10}}
            value={activeCase}
            onChange={e => setActiveCase(Number(e.target.value))}
          >
            {cases.map((c, idx) => (
              <option key={c.id} value={idx}>{c.title}</option>
            ))}
          </select>
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: "16px 0 0 3px" }}>
          {cases[activeCase].timeline.map((step, i) => (
            <li key={i}
              tabIndex={0}
              style={{
                padding: "10px 10px", margin: "8px 0",
                background: step.done ? "#E9F1F8" : "#fcfaf2",
                borderRadius: 5,
                borderLeft: step.done ? "5px solid #1A237E" : "5px solid #FFD700",
                cursor: "pointer", display: "flex", alignItems: "center"
              }}
              onClick={() => toggleMilestone(activeCase, i)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggleMilestone(activeCase, i); }}
              aria-label={`Step ${step.label} - ${step.done ? "done" : "pending"}`}
            >
              <span style={{
                fontSize: 21,
                color: step.done ? "#1A237E" : "#FFD700",
                marginRight: 12
              }}>{step.done ? "✔️" : "⬜"}</span>
              <span>
                <strong>{step.label}</strong> {step.date && step.date !== '-' ? <span style={{color:"#474"}}>({step.date})</span> : ''}
                <span style={{
                  marginLeft: 10, color: step.done ? "#888" : "#B80C09",
                  fontWeight: 500, fontSize: '0.96em'
                }}>{step.done ? "Completed" : "Pending"}</span>
              </span>
            </li>
          ))}
        </ol>
        <div style={{ color: "#888", fontSize: "0.98em", marginTop: 15 }}>
          Click or press <span style={{fontWeight:600}}>Enter</span> to mark timeline step as complete/incomplete.
        </div>
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Video Consultation Booking: Book slot on calendar, see mock confirmation.
 */
function VideoConsultSection() {
  // Demo appointments in next 7 days, multiple time slots
  const today = new Date();
  function getNDaysOut(n) {
    const d = new Date();
    d.setDate(today.getDate() + n);
    return d.toISOString().slice(0, 10);
  }
  const AVAILABLE_DAYS = Array.from({length: 7}, (_,i) => getNDaysOut(i));
  const TIMES = ["09:30", "11:30", "13:30", "16:00", "18:00"];
  const [chosenDay, setChosenDay] = useState(AVAILABLE_DAYS[0]);
  const [chosenTime, setChosenTime] = useState(TIMES[0]);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <section tabIndex={-1} className="stacked-feature-section feature-section-video-booking" aria-label="Video Consultation Booking">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">🎥</span>
        <h2 className="stacked-feature-heading">Video Consultation Booking</h2>
        <div className="stacked-feature-desc">
          Book secure and confidential video consultation slots.<br />
          Choose date &amp; time. (Demo)
        </div>
        {!confirmed ? (
          <form className="instant-lawyer-form" style={{marginTop: 12}}
                onSubmit={e => { e.preventDefault(); setConfirmed(true); }}>
            <div className="form-group">
              <label htmlFor="vc-date">Date</label>
              <select id="vc-date" value={chosenDay} onChange={e => setChosenDay(e.target.value)}>
                {AVAILABLE_DAYS.map(d =>
                  <option key={d} value={d}>{d}</option>
                )}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="vc-time">Time</label>
              <select id="vc-time" value={chosenTime} onChange={e => setChosenTime(e.target.value)}>
                {TIMES.map(t =>
                  <option key={t} value={t}>{t}</option>
                )}
              </select>
            </div>
            <button type="submit" className="btn btn-accent btn-large" style={{marginTop: 5}}>Book Slot</button>
          </form>
        ) : (
          <div style={{marginTop: 24, color: "#4CAF50", fontWeight: 700}}>
            Booking Confirmed!
            <div style={{ fontWeight: 400, color: "#141812", margin: "8px 0" }}>
              <span>Date:</span> <b>{chosenDay}</b> <span>Time:</span> <b>{chosenTime}</b><br />
              (A Google Meet/Zoom link will be generated for your slot.)
            </div>
            <button
              className="btn"
              onClick={() => setConfirmed(false)}
              style={{marginTop: 7}}
            >Book Another</button>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Know Your Rights: Expandable sections per category, "quiz" for engagement.
 */
function KnowYourRightsSection() {
  const categories = [
    {
      key: "property",
      title: "Property Rights",
      desc: "Your right to acquire, hold, and dispose of property, protection from illegal eviction, and laws related to land and housing."
    },
    {
      key: "marriage",
      title: "Marriage & Divorce Rights",
      desc: "Legal provisions for marriage registration, divorce, child custody, domestic violence protection and maintenance."
    },
    {
      key: "cyber",
      title: "Cyber Law & Protection",
      desc: "Your rights when facing cybercrime, online fraud, identity theft, privacy breaches, or abuse on digital platforms."
    },
    {
      key: "consumer",
      title: "Consumer Protection",
      desc: "Right to be protected against defective goods, unfair trade, fraud, and the procedure for redressal of complaints."
    }
  ];
  const [openIdx, setOpenIdx] = useState(null);

  // Simple quiz demo - one question
  const quizQ = {
    q: "Which law protects Indian consumers from defective goods?",
    options: [
      { text: "Consumer Protection Act, 2019", correct: true },
      { text: "Property Act, 1999", correct: false },
      { text: "IPC, Section 302", correct: false },
      { text: "IT Act", correct: false },
    ]
  };
  const [quizSelected, setQuizSelected] = useState(-1);
  const [quizDone, setQuizDone] = useState(false);

  return (
    <section tabIndex={-1} className="stacked-feature-section feature-section-know-rights" aria-label="Know Your Rights">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">⚖️</span>
        <h2 className="stacked-feature-heading">Know Your Rights</h2>
        <div className="stacked-feature-desc" style={{marginBottom: 12}}>
          Explore legal rights by area. Click a category to learn more.<br />
        </div>
        <div style={{
          width: "100%", marginBottom: 15, display:"flex", flexDirection:"column", gap: "11px"
        }}>
          {categories.map((c, i) => (
            <div
              key={c.key}
              style={{
                background: "#F3F8EE",
                borderRadius: "7px",
                boxShadow: i === openIdx ? "0 1.5px 8px #a0d59133" : "0 1.5px 8px #e9f1f8",
                padding: "11px 15px",
                border: `2px solid ${i === openIdx ? "#2e7d32" : "#e4e6eb"}`,
                cursor: "pointer"
              }}
              tabIndex={0}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpenIdx(openIdx === i ? null : i); }}
              aria-expanded={openIdx === i}
              aria-controls={`right-panel-${c.key}`}
            >
              <span style={{fontWeight:800}}>{c.title}</span>
              {openIdx === i && (
                <div id={`right-panel-${c.key}`} style={{margin: "6px 0 3px 5px", fontWeight:400, color:"#262"}}>
                  {c.desc}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{margin: "26px 0 8px 0", fontWeight: 600, color: "#1A237E"}}>Pop Quiz:</div>
        <div style={{marginBottom: 7}}>{quizQ.q}</div>
        <div>
          {quizQ.options.map((o, idx) => (
            <button
              key={idx}
              style={{
                margin: "0 8px 7px 0",
                border: "1.7px solid #FFD700",
                borderRadius: "6px",
                background: quizSelected === idx ? (o.correct ? "#4CAF50" : "#b50a46") : "#FFF",
                color: quizSelected === idx ? "#fff" : "#1A237E",
                fontWeight: quizSelected === idx ? 700 : 500,
                padding: "6px 18px"
              }}
              disabled={quizDone}
              onClick={() => {
                setQuizSelected(idx);
                setQuizDone(true);
              }}
            >{o.text}</button>
          ))}
        </div>
        {quizDone && (
          <div style={{margin: "6px 0", color: quizQ.options[quizSelected].correct ? "#4CAF50":"#b50a46", fontWeight:600}}>
            {quizQ.options[quizSelected].correct ? "Correct!" : "Not quite right, try again next time!"}
            <button style={{marginLeft:12}} className="btn" onClick={() => {setQuizDone(false);setQuizSelected(-1);}}>Try Another</button>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Anonymous Q&A Forum: Submit questions, view/sample answers, search list.
 */
function AnonymousQnASection() {
  const [questions, setQuestions] = useState([
    {
      q: "Can my landlord increase rent arbitrarily?",
      a: "No. In India, rent increases should follow state rent control laws or the signed rental agreement. Normally, 10% yearly increase is reasonable.",
      id: 0
    },
    {
      q: "Is WhatsApp chat valid as legal evidence?",
      a: "Yes, electronic messages are accepted as secondary evidence under the Indian Evidence Act with proper authentication.",
      id: 1
    }
  ]);
  const [search, setSearch] = useState("");
  const [newQ, setNewQ] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // PUBLIC_INTERFACE
  function submitQ(e) {
    e.preventDefault();
    if (!newQ.trim()) return;
    setQuestions(qs =>
      [...qs, { q: newQ, a: "Awaiting lawyer response...", id: qs.length }]
    );
    setSubmitted(true);
    setNewQ("");
    setTimeout(() => setSubmitted(false), 1800);
  }

  // PUBLIC_INTERFACE
  function filtered() {
    if (!search) return questions;
    return questions.filter(q =>
      q.q.toLowerCase().includes(search.toLowerCase()) ||
      q.a.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <section tabIndex={-1} className="stacked-feature-section feature-section-anon-qa" aria-label="Anonymous Q&A">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">💬</span>
        <h2 className="stacked-feature-heading">Anonymous Q&amp;A</h2>
        <div className="stacked-feature-desc" style={{marginBottom:8}}>
          Post your legal question anonymously, view answers, or search previous Q&amp;A.
        </div>
        <form onSubmit={submitQ} className="instant-lawyer-form" style={{marginBottom: "1em"}}>
          <label htmlFor="newQ" style={{fontWeight:600,marginBottom: 2}}>Ask a Question</label>
          <input
            id="newQ"
            name="newQ"
            value={newQ}
            onChange={e => setNewQ(e.target.value)}
            type="text"
            placeholder="Type your question—no name required"
            style={{marginBottom:2}}
          />
          <button className="btn btn-accent btn-large" type="submit" style={{marginTop:2}}>Submit</button>
          {submitted && <span style={{marginLeft:12, color: "#4CAF50"}}>Submitted!</span>}
        </form>
        <div>
          <label htmlFor="searchQ" style={{ fontWeight: 600, marginBottom: 4 }}>Search Q&amp;A</label>
          <input
            id="searchQ"
            name="searchQ"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions &amp; answers"
            style={{ width: "100%", marginBottom: 12 }}
          />
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered().length === 0 ? (
            <li style={{ color: "#b50a46", margin: "1em 0" }}>No questions found.</li>
          ) : (
            filtered().slice().reverse().map(q => (
              <li
                key={q.id}
                style={{
                  marginBottom: 12,
                  background: "#FFF2F5",
                  border: "1.7px solid #b50a46",
                  borderRadius: 7,
                  padding: "10px 14px"
                }}
              >
                <strong>Q:</strong> {q.q}
                <br />
                <strong>A:</strong> {q.a}
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Sign-In: Interactive form, live validation, demo "sign in" with state change.
 */
function SignInSection({ onSignIn }) {
  const [vals, setVals] = useState({ name: "", address: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [tried, setTried] = useState(false);

  // PUBLIC_INTERFACE
  function handleChange(e) {
    setVals({ ...vals, [e.target.name]: e.target.value });
  }

  // PUBLIC_INTERFACE
  function validate() {
    const e = {};
    if (!vals.name) e.name = "Required";
    if (!vals.address) e.address = "Required";
    if (!vals.phone.match(/^[6-9][0-9]{9}$/)) e.phone = "10-digit mobile, Indian pattern";
    if (!vals.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Invalid email";
    return e;
  }

  // PUBLIC_INTERFACE
  function handleSubmit(ev) {
    ev.preventDefault();
    setTried(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSignIn({ ...vals });
    }
  }

  return (
    <section tabIndex={-1} className="stacked-feature-section" aria-label="Sign-In">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">👤</span>
        <h2 className="stacked-feature-heading">Sign-In</h2>
        <div className="stacked-feature-desc" style={{marginBottom:8}}>
          Sign in/register with your details for tailored features (case &amp; video tracking, downloads, and more).
        </div>
        <form className="instant-lawyer-form" style={{maxWidth: 400}} onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="name">Name<span style={{color: "#b50a46"}}>*</span></label>
            <input id="name" name="name" value={vals.name} onChange={handleChange} required />
            {tried && errors.name && <div style={{color:"#b50a46", fontSize: ".91em"}}>{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address<span style={{color: "#b50a46"}}>*</span></label>
            <input id="address" name="address" value={vals.address} onChange={handleChange} required />
            {tried && errors.address && <div style={{color:"#b50a46", fontSize: ".91em"}}>{errors.address}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Mobile Number<span style={{color: "#b50a46"}}>*</span></label>
            <input id="phone" name="phone" value={vals.phone} onChange={handleChange} required maxLength={10} minLength={10} placeholder="e.g. 9123456789"/>
            {tried && errors.phone && <div style={{color:"#b50a46", fontSize: ".91em"}}>{errors.phone}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email<span style={{color: "#b50a46"}}>*</span></label>
            <input id="email" name="email" value={vals.email} onChange={handleChange} required type="email" />
            {tried && errors.email && <div style={{color:"#b50a46", fontSize: ".91em"}}>{errors.email}</div>}
          </div>
          <button style={{marginTop: 7}} className="btn btn-accent btn-large" type="submit">Sign In</button>
        </form>
      </div>
    </section>
  );
}

/**
 * Authentication Modal (overlay) for Sign In & Sign Up.
 * Props:
 *   - type: "signin" | "signup"
 *   - onClose: function
 *   - onSignedIn: function(user) // on Sign In success
 *   - onSignedUp: function(user) // on Sign Up success
 */
function AuthModal({ type, onClose, onSignedIn, onSignedUp }) {
  // Close on ESC or click outside content
  React.useEffect(() => {
    function handler(e) {
      if (e.key && e.key.toLowerCase() === "escape") onClose();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  // Handle tab trapping for accessibility (optional)
  const contentRef = React.useRef();
  React.useEffect(() => {
    if (!contentRef.current) return;
    const focusable = contentRef.current.querySelectorAll("input,button,[tabindex='0']");
    if (focusable.length) focusable[0].focus();
  }, []);
  function handleBackdropClick(e) {
    if (e.target && e.target.classList.contains('auth-modal-backdrop')) {
      onClose();
    }
  }
  return (
    <div
      className="auth-modal-backdrop"
      style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        zIndex: 1200, background: "rgba(16,23,36,0.56)", display: "flex",
        alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.23s both"
      }}
      role="dialog"
      aria-modal="true"
      aria-label={type === "signin" ? "Sign In Form" : "Sign Up Form"}
      tabIndex={-1}
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        style={{
          background: "#fff", borderRadius: 10, boxShadow: "0 2.5px 25px #0D1B2A33",
          padding: "32px 30px 28px 30px", minWidth: 320, maxWidth: 370, width: "95vw",
          border: "2.5px solid #D4AF37", position: "relative",
          animation: "fadeInUp 0.26s cubic-bezier(.65,.09,.36,1.1) both"
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" style={{
          position: "absolute", right: 17, top: 11, border: "none", background: "transparent",
          fontSize: 23, color: "#b50a46", cursor: "pointer", fontWeight: 700, padding: 0
        }} tabIndex={0}>×</button>
        <div style={{ margin: "7px 0 13px 0", textAlign: "center" }}>
          <span style={{
            fontSize: 44, display: "block", color: "#D4AF37", fontFamily: "'Montserrat', Arial, sans-serif"
          }}>{type === "signin" ? "👤" : "📝"}</span>
          <div style={{
            fontWeight: 700, fontSize: "1.19em", letterSpacing: "0.03em", color: "#1A237E",
            marginTop: 0, marginBottom: 8, fontFamily: "'Montserrat', Arial, sans-serif"
          }}>
            {type === "signin" ? "Sign In" : "Sign Up"}
          </div>
        </div>
        {type === "signin" ? (
          <SignInForm onSignedIn={onSignedIn} />
        ) : (
          <SignUpForm onSignedUp={onSignedUp} />
        )}
      </div>
    </div>
  );
}

/**
 * Sign In Form (modal)
 * Fields: email/mobile, password.
 */
function SignInForm({ onSignedIn }) {
  const [vals, setVals] = React.useState({ email: "", password: "" });
  const [tried, setTried] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  function validate() {
    const e = {};
    if (!vals.email.match(/^([6-9]\d{9}|[^@]+@[^@]+\.[^@]+)$/))
      e.email = "Enter a valid email or Indian mobile";
    if (!vals.password || vals.password.length < 5)
      e.password = "Password must be 5+ characters";
    return e;
  }
  function handleChange(ev) {
    setVals({ ...vals, [ev.target.name]: ev.target.value });
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    setTried(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // "Sign In": return mock user
        onSignedIn({
          name: vals.email.includes("@") ? (vals.email.split("@")[0] || "User") : "User",
          email: vals.email
        });
      }, 1000);
    }
  }
  return (
    <form className="instant-lawyer-form" style={{minWidth:0, width: "100%"}} onSubmit={handleSubmit} autoComplete="off">
      <div className="form-group">
        <label htmlFor="signin-email">Email or Mobile<span style={{color: "#b50a46"}}>*</span></label>
        <input id="signin-email" name="email" value={vals.email} onChange={handleChange} required
          autoFocus autoComplete="username" placeholder="Enter email or mobile number"/>
        {tried && errors.email && <div style={{color:"#b50a46", fontSize: ".93em"}}>{errors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="signin-password">Password<span style={{color: "#b50a46"}}>*</span></label>
        <input id="signin-password" name="password" value={vals.password}
          onChange={handleChange} required type="password" autoComplete="current-password"
          minLength={5} placeholder="Enter password"/>
        {tried && errors.password && <div style={{color:"#b50a46", fontSize: ".93em"}}>{errors.password}</div>}
      </div>
      <button className="btn btn-accent btn-large fade-in-btn"
        type="submit" style={{marginTop: 10, minWidth:94}} disabled={loading}
      >{loading ? "Signing In..." : "Sign In"}</button>
    </form>
  );
}

/**
 * Sign Up Form (modal)
 * Fields: name, address, phone, email, password, confirm password.
 */
function SignUpForm({ onSignedUp }) {
  const [vals, setVals] = React.useState({
    name: "", address: "", phone: "", email: "", password: "", confirm: ""
  });
  const [tried, setTried] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  function validate() {
    const e = {};
    if (!vals.name) e.name = "Required";
    if (!vals.address) e.address = "Required";
    if (!vals.phone.match(/^[6-9][0-9]{9}$/))
      e.phone = "10-digit Indian mobile";
    if (!vals.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      e.email = "Invalid email";
    if (!vals.password || vals.password.length < 5)
      e.password = "At least 5 characters";
    if (vals.confirm !== vals.password)
      e.confirm = "Does not match password";
    return e;
  }
  function handleChange(ev) {
    setVals({ ...vals, [ev.target.name]: ev.target.value });
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    setTried(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Simulate sign up success
        onSignedUp({...vals});
      }, 1100);
    }
  }
  return (
    <form className="instant-lawyer-form" style={{minWidth:0, width: "100%"}} onSubmit={handleSubmit} autoComplete="off">
      <div className="form-group">
        <label htmlFor="signup-name">Name<span style={{color: "#b50a46"}}>*</span></label>
        <input id="signup-name" name="name" value={vals.name} onChange={handleChange} required />
        {tried && errors.name && <div style={{color:"#b50a46", fontSize: ".91em"}}>{errors.name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="signup-address">Address<span style={{color: "#b50a46"}}>*</span></label>
        <input id="signup-address" name="address" value={vals.address} onChange={handleChange} required />
        {tried && errors.address && <div style={{color:"#b50a46", fontSize: ".91em"}}>{errors.address}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="signup-phone">Mobile Number<span style={{color: "#b50a46"}}>*</span></label>
        <input id="signup-phone" name="phone" value={vals.phone} onChange={handleChange} required maxLength={10} minLength={10} placeholder="9123456789"/>
        {tried && errors.phone && <div style={{color:"#b50a46", fontSize: ".91em"}}>{errors.phone}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="signup-email">Email<span style={{color: "#b50a46"}}>*</span></label>
        <input id="signup-email" name="email" value={vals.email} onChange={handleChange} required type="email" />
        {tried && errors.email && <div style={{color:"#b50a46", fontSize: ".91em"}}>{errors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="signup-password">Password<span style={{color: "#b50a46"}}>*</span></label>
        <input id="signup-password" name="password" value={vals.password}
          onChange={handleChange} required type="password" minLength={5}
          autoComplete="new-password" placeholder="Create password"/>
        {tried && errors.password && <div style={{color:"#b50a46", fontSize: ".91em"}}>{errors.password}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="signup-confirm">Confirm Password<span style={{color: "#b50a46"}}>*</span></label>
        <input id="signup-confirm" name="confirm" value={vals.confirm}
          onChange={handleChange} required type="password" minLength={5}
          placeholder="Confirm password"/>
        {tried && errors.confirm && <div style={{color:"#b50a46", fontSize: ".91em"}}>{errors.confirm}</div>}
      </div>
      <button className="btn btn-accent btn-large fade-in-btn"
        type="submit" style={{marginTop: 10, minWidth:124}} disabled={loading}
      >{loading ? "Signing Up..." : "Sign Up"}</button>
    </form>
  );
}

export default App;
