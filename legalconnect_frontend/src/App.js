import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Controls which feature to show in the main content
  const [activeFeature, setActiveFeature] = useState('home');

  // Helper for accessibility/focus
  const navLinks = [
    { key: 'home', label: 'Home', icon: '🏠', desc: 'Instant Lawyer Match' },
    { key: 'docs', label: 'Legal Docs Generator', icon: '📄', desc: 'Draft & Download Legal Docs' },
    { key: 'cases', label: 'Case Tracker', icon: '🗂️', desc: 'Track Your Cases' },
    { key: 'rights', label: 'Know Your Rights', icon: '⚖️', desc: 'Legal Rights Info' },
    { key: 'qa', label: 'Anonymous Q&A', icon: '💬', desc: 'Ask Legal Questions' },
    { key: 'signin', label: 'Sign In', icon: '👤', desc: 'Access Your Profile' }
  ];

  // PUBLIC_INTERFACE
  function renderMainContent() {
    switch (activeFeature) {
      case 'docs':
        return <DocsGeneratorPlaceholder />;
      case 'cases':
        return <CaseTrackerPlaceholder />;
      case 'rights':
        return <KnowYourRightsPlaceholder />;
      case 'qa':
        return <AnonymousForumPlaceholder />;
      case 'signin':
        return <SignInPlaceholder />;
      default:
        // Home/Instant Lawyer Match
        return <InstantLawyerMatchPlaceholder />;
    }
  }

  // PUBLIC_INTERFACE
  return (
    <div className="app" style={{ minHeight: "100vh", background: "var(--neutral-bg)" }}>
      {/* Top Navigation Bar */}
      <nav className="navbar" aria-label="Main navigation">
        <div className="container">
          <div className="logo" style={{ cursor: "pointer" }} tabIndex={0} aria-label="LegalConnect India Home" onClick={() => setActiveFeature('home')}>
            <span className="logo-symbol" aria-hidden="true">⚖️</span>
            <span style={{ color: 'var(--secondary)' }}>LegalConnect <span style={{ color: 'var(--primary)' }}>India</span></span>
          </div>
          <ul style={{
            display: "flex",
            listStyle: "none",
            gap: "1.7em",
            margin: 0,
            padding: 0,
            alignItems: 'center',
            fontWeight: 500
          }}>
            {navLinks.map(link => (
              <li key={link.key}>
                <button
                  className="btn btn-secondary"
                  style={{
                    background: activeFeature === link.key ? 'var(--accent)' : 'var(--secondary)',
                    color: activeFeature === link.key ? 'var(--text-contrast)' : 'var(--primary)'
                  }}
                  aria-label={`${link.label}: ${link.desc}`}
                  tabIndex={0}
                  onClick={() => setActiveFeature(link.key)}
                  onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveFeature(link.key); }}
                >
                  <span role="img" aria-label={link.label} style={{ marginRight: 8 }}>{link.icon}</span>
                  <span style={{ fontWeight: 600 }}>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Layout: Sidebar for "Docs Generator", "Case Tracker", "Know Your Rights" if space allows */}
      <div style={{
        display: "flex",
        flex: 1,
        marginTop: 80, // Below the navbar
        minHeight: "70vh"
      }}>
        {/* Sidebar (hidden on mobile) */}
        <aside
          className="sidebar"
          style={{
            minWidth: 170,
            background: "var(--neutral-bg)",
            borderRight: "1.5px solid var(--border)",
            padding: "32px 12px 0 12px",
            display: window.innerWidth > 750 ? "flex" : "none",
            flexDirection: "column",
            gap: 24
          }}
          aria-label="Section navigation"
        >
          <SidebarNav
            items={navLinks.filter(l => ['docs', 'cases', 'rights'].includes(l.key))}
            activeFeature={activeFeature}
            setActiveFeature={setActiveFeature}
          />
        </aside>
        {/* Main Content Area */}
        <main
          id="main-content"
          className="container"
          tabIndex={-1}
          aria-live="polite"
          style={{
            minHeight: "62vh",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "32px 12px 36px 12px",
            background: "#fff",
            boxShadow: "0 2.5px 16px rgba(26,35,126,0.06)",
            marginLeft: window.innerWidth > 750 ? 0 : 0, // No left margin on mobile
            borderRadius: 8
          }}
        >
          {renderMainContent()}
        </main>
      </div>

      {/* Footer */}
      <footer
        className="container"
        style={{
          marginTop: 32,
          fontSize: "1.02rem",
          textAlign: "center",
          color: "#313140",
          borderTop: "1px solid var(--border)",
          padding: "28px 0 20px 0"
        }}
      >
        <div>
          &copy; {new Date().getFullYear()} LegalConnect India &middot;
          <a href="#" style={{ margin: "0 1em" }}>Contact</a>
          <a href="#" style={{ margin: "0 1em" }}>Privacy Policy</a>
          <a href="#" style={{ margin: "0 1em" }}>Terms of Service</a>
        </div>
        <div style={{ fontSize: "0.96rem", color: "var(--accent)", marginTop: 8 }}>
          Empowering Every Legal Journey – Indian Law, Accessible to All
        </div>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function SidebarNav({ items, activeFeature, setActiveFeature }) {
  return (
    <nav>
      <ul style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        listStyle: "none",
        padding: 0,
        margin: 0
      }}>
        {items.map(link => (
          <li key={link.key}>
            <button
              className="btn"
              tabIndex={0}
              style={{
                boxShadow: "none",
                background: activeFeature === link.key ? "var(--accent)" : "#f4f6fc",
                color: activeFeature === link.key ? "var(--text-contrast)" : "var(--primary)",
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
              onClick={() => setActiveFeature(link.key)}
              onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setActiveFeature(link.key); }}
            >
              <span style={{ marginRight: 10, fontSize: "1.32em" }}>{link.icon}</span>
              <span>{link.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// --- MAIN CONTENT PLACEHOLDERS ---

// PUBLIC_INTERFACE
function InstantLawyerMatchPlaceholder() {
  return (
    <section className="hero" tabIndex={-1}>
      <div className="subtitle">Connect With Verified Legal Experts Instantly</div>
      <h1 className="title">Instant Lawyer Match</h1>
      <div className="description" style={{ marginBottom: 30 }}>
        Tell us about your legal issue and we'll match you with the right lawyer. Transparent, fast, and confidential.
      </div>
      {/* Placeholder for lawyer match form */}
      <form
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          maxWidth: 410,
          background: "#f4f6fc",
          border: "1.5px solid var(--border)",
          borderRadius: 8,
          boxShadow: "0 2px 12px rgba(26,35,126, 0.02)",
          padding: "24px 22px"
        }}
        aria-label="Instant Lawyer Match Form"
        tabIndex={0}
      >
        <label htmlFor="issue" style={{ fontWeight: "500" }}>Legal Issue<span style={{ color: 'var(--accent)' }}> *</span></label>
        <input id="issue" name="issue" type="text" placeholder="Short description (e.g. Rental dispute, Cheque bounce...)" required style={{
          border: "1.5px solid var(--primary)",
          borderRadius: 5,
          padding: "9px 12px",
          marginBottom: 7
        }} />

        <label htmlFor="urgency" style={{ fontWeight: "500" }}>Urgency</label>
        <select id="urgency" name="urgency" defaultValue="normal" style={{
          border: "1.5px solid var(--primary)",
          borderRadius: 5,
          padding: "9px 12px",
        }}>
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
          <option value="just-inquiry">Just Inquiry</option>
        </select>

        <label htmlFor="budget" style={{ fontWeight: "500" }}>Budget Preference</label>
        <select id="budget" name="budget" defaultValue="" style={{
          border: "1.5px solid var(--primary)",
          borderRadius: 5,
          padding: "9px 12px",
        }}>
          <option value="">No Preference</option>
          <option value="basic">Basic (&lt;₹5000)</option>
          <option value="mid">Standard (₹5000-₹20,000)</option>
          <option value="premium">Premium (&gt;₹20,000)</option>
        </select>
        <button className="btn btn-accent btn-large" type="submit" disabled>Match Me (Stub)</button>
      </form>
      <div style={{ marginTop: 34, textAlign: "left", width: "100%", maxWidth: 540 }}>
        <FeatureHighlights />
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function FeatureHighlights() {
  // Icon and description for each feature on home
  const highlights = [
    {
      icon: "📄",
      title: "Legal Docs Generator",
      desc: "Draft affidavits, rental agreements, and more with guided templates."
    },
    {
      icon: "🗂️",
      title: "Case Tracker",
      desc: "Visualize case status and court dates in real time."
    },
    {
      icon: "💬",
      title: "Anonymous Q&A",
      desc: "Ask questions and get answers from verified lawyers."
    },
    {
      icon: "⚖️",
      title: "Know Your Rights",
      desc: "Understand legal protections, explained in plain English/Hindi."
    },
    {
      icon: "🎥",
      title: "Video Consultations",
      desc: "Book appointments and consult virtually with legal experts."
    }
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
      {highlights.map((f, i) => (
        <div key={i}
          style={{
            flex: "1 1 170px",
            minWidth: 140,
            maxWidth: 200,
            background: "var(--neutral-bg)",
            border: "1.3px solid var(--border)",
            borderRadius: 8,
            padding: "13px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            boxShadow: "0 1.5px 8px rgba(26,35,126, 0.03)"
          }}
        >
          <span style={{ fontSize: "2.2rem", color: "var(--primary)" }}>{f.icon}</span>
          <span style={{ fontWeight: "600", marginTop: 2 }}>{f.title}</span>
          <span style={{ fontSize: "0.98rem", lineHeight: 1.18, color: "#444", textAlign: "center" }}>{f.desc}</span>
        </div>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function DocsGeneratorPlaceholder() {
  return (
    <section className="hero" tabIndex={-1} style={{ alignItems: "flex-start" }}>
      <h1 className="title"><span role="img" aria-label="Docs" style={{ marginRight: 10 }}>📄</span>Legal Document Generator</h1>
      <div className="description">
        Select, fill, and download Indian legal document templates such as agreements and affidavits. <br /><br />
        <em>Full interactive generator coming soon.</em>
      </div>
      <button className="btn btn-accent btn-large" disabled>Start Document (Stub)</button>
    </section>
  );
}

// PUBLIC_INTERFACE
function CaseTrackerPlaceholder() {
  return (
    <section className="hero" tabIndex={-1} style={{ alignItems: "flex-start" }}>
      <h1 className="title"><span role="img" aria-label="Cases" style={{ marginRight: 10 }}>🗂️</span>Case Tracker</h1>
      <div className="description">
        Timeline view for your ongoing cases, complete with court hearing dates and alert notifications.<br /><br />
        <em>Case dashboard feature coming soon.</em>
      </div>
      <button className="btn btn-accent btn-large" disabled>View My Cases (Stub)</button>
    </section>
  );
}

// PUBLIC_INTERFACE
function KnowYourRightsPlaceholder() {
  return (
    <section className="hero" tabIndex={-1} style={{ alignItems: "flex-start" }}>
      <h1 className="title"><span role="img" aria-label="Rights" style={{ marginRight: 10 }}>⚖️</span>Know Your Rights</h1>
      <div className="description">
        Learn about your rights and Indian law – from property and consumer issues to marriage and cyber law.<br /><br />
        <em>Knowledgebase will soon be available.</em>
      </div>
      <button className="btn btn-accent btn-large" disabled>Explore Rights (Stub)</button>
    </section>
  );
}

// PUBLIC_INTERFACE
function AnonymousForumPlaceholder() {
  return (
    <section className="hero" tabIndex={-1} style={{ alignItems: "flex-start" }}>
      <h1 className="title"><span role="img" aria-label="Q&A" style={{ marginRight: 10 }}>💬</span>Anonymous Q&A Forum</h1>
      <div className="description">
        Post your legal query anonymously or browse the Q&A bank.<br /><br />
        <em>Forum feature will be enabled soon.</em>
      </div>
      <button className="btn btn-accent btn-large" disabled>Ask A Question (Stub)</button>
    </section>
  );
}

// PUBLIC_INTERFACE
function SignInPlaceholder() {
  return (
    <section className="hero" tabIndex={-1} style={{ alignItems: "flex-start" }}>
      <h1 className="title"><span role="img" aria-label="Sign In" style={{ marginRight: 10 }}>👤</span>Sign In</h1>
      <div className="description">
        Secure sign-in for personalized features like case tracking and bookings.<br /><br />
        <em>Secure sign-in coming soon.</em>
      </div>
      <button className="btn btn-accent btn-large" disabled>Sign In (Stub)</button>
    </section>
  );
}

export default App;
