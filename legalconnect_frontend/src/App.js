import React, { useState } from 'react';
import './App.css';

// NAVIGATION LINKS CONFIG
const navLinks = [
  { key: 'home', label: 'Home' },
  { key: 'docs', label: 'Legal Docs Generator' },
  { key: 'cases', label: 'Case Tracker' },
  { key: 'rights', label: 'Know your Rights' },
  { key: 'qa', label: 'Anonymous Q&A' }
];

function App() {
  // Controls which feature to show in the main content
  const [activeFeature, setActiveFeature] = useState('home');

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
      default:
        return <InstantLawyerMatchPlaceholder />;
    }
  }

  // PUBLIC_INTERFACE
  return (
    <div className="app">

      {/* Top Bar: Sign In/Sign Up at top right */}
      <div className="topbar-auth">
        <div className="topbar-spacer" />
        <div className="topbar-auth-actions">
          <button className="signin-btn" type="button" aria-label="Sign In" tabIndex={0}>Sign In</button>
          <button className="signup-link" type="button" aria-label="Sign Up" tabIndex={0}>Sign Up</button>
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

      {/* Nav bar RIGHT BELOW heading/logo, horizontal and centered */}
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

      {/* Hero section with law-themed image + overlay */}
      <section className="hero-top" tabIndex={-1} aria-label="Legal Services Hero Banner">
        <div className="hero-top-blur" aria-hidden="true" />
        <div className="hero-top-content">
          <h1 className="hero-top-title">Indian Law Mate – Your Trusted Legal Platform</h1>
          <div className="hero-top-subtitle">Expert guidance. Instant solutions. Confidential &amp; accessible for all.</div>
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

// Placeholder: Homepage "Instant Lawyer Match" hero
// PUBLIC_INTERFACE
function InstantLawyerMatchPlaceholder() {
  return (
    <section tabIndex={-1}>
      <div className="subtitle" style={{ marginTop: 6 }}>
        Connect With Verified Legal Experts Instantly
      </div>
      <h2 className="title">Instant Lawyer Match</h2>
      <div className="description" style={{ marginBottom: 30 }}>
        Tell us about your legal issue and we'll match you with the right lawyer. Transparent, fast, and confidential.
      </div>
      {/* Instant Lawyer Match - improved stack form, spaced & animated */}
      <form
        className="container instant-lawyer-form fade-in-section"
        aria-label="Instant Lawyer Match Form"
        tabIndex={0}
        autoComplete="off"
      >
        <div className="form-group">
          <label htmlFor="issue">
            Legal Issue<span style={{ color: 'var(--gold)' }}> *</span>
          </label>
          <input
            id="issue"
            name="issue"
            type="text"
            placeholder="Your issue (e.g. Rental dispute, Cheque bounce...)"
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="urgency">Urgency</label>
          <select id="urgency" name="urgency" defaultValue="normal">
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="just-inquiry">Just Inquiry</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="budget">Budget Preference</label>
          <select id="budget" name="budget" defaultValue="">
            <option value="">No Preference</option>
            <option value="basic">Basic (&lt;₹5000)</option>
            <option value="mid">Standard (₹5000-₹20,000)</option>
            <option value="premium">Premium (&gt;₹20,000)</option>
          </select>
        </div>
        <button className="btn btn-accent btn-large fade-in-btn" type="submit" disabled>
          Match Me (Stub)
        </button>
      </form>
      <div style={{ marginTop: 38, textAlign: "left", width: "100%", maxWidth: 540 }}>
        <FeatureHighlights />
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Modern, responsive feature cards grid: each core feature is
 * shown as a card (icon, title, description) neatly explaining its value.
 * Cards are consistently styled, spaced, and align responsively.
 */
function FeatureHighlights() {
  const features = [
    {
      icon: "📄",
      title: "Legal Docs Generator",
      desc: "Quickly generate essential legal documents such as affidavits, rental agreements, or NDAs. Guided forms let you customize details with confidence, and download ready-to-use PDFs in minutes."
    },
    {
      icon: "🗂️",
      title: "Case Tracker",
      desc: "Track your legal matters in one place. View real-time case statuses, timelines, and receive alerts for upcoming court dates—stay in control and never miss an update."
    },
    {
      icon: "🎥",
      title: "Video Consultation Booking",
      desc: "Book secure, confidential video consultations with verified lawyers at your convenience. Pick a time, connect via Zoom/Google Meet, and get expert advice face-to-face."
    },
    {
      icon: "⚖️",
      title: "Know Your Rights",
      desc: "Explore plain-language guides for Indian legal protections—property, consumer, marriage, and more. Empower yourself with accurate, accessible knowledge in English and Hindi."
    },
    {
      icon: "💬",
      title: "Anonymous Q&A",
      desc: "Ask basic legal questions anonymously—no sign-in required. Receive answers from authentic lawyers and search a growing bank of previously resolved queries."
    }
  ];

  return (
    <section className="features-section" aria-label="Main Platform Features" tabIndex={-1}>
      <h3 className="features-section-heading" style={{textAlign:"center", marginBottom:10, color:"var(--navy)", fontFamily:"var(--font-heading)", fontWeight:700}}>Why Choose Indian Law Mate?</h3>
      <div className="features-grid">
        {features.map((f, idx) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon" aria-hidden="true">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function DocsGeneratorPlaceholder() {
  return (
    <section tabIndex={-1} style={{ alignItems: "flex-start" }}>
      <h2 className="title"><span role="img" aria-label="Docs" style={{ marginRight: 10 }}>📄</span>Legal Document Generator</h2>
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
    <section tabIndex={-1} style={{ alignItems: "flex-start" }}>
      <h2 className="title"><span role="img" aria-label="Cases" style={{ marginRight: 10 }}>🗂️</span>Case Tracker</h2>
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
    <section tabIndex={-1} style={{ alignItems: "flex-start" }}>
      <h2 className="title"><span role="img" aria-label="Rights" style={{ marginRight: 10 }}>⚖️</span>Know Your Rights</h2>
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
    <section tabIndex={-1} style={{ alignItems: "flex-start" }}>
      <h2 className="title"><span role="img" aria-label="Q&A" style={{ marginRight: 10 }}>💬</span>Anonymous Q&amp;A Forum</h2>
      <div className="description">
        Post your legal query anonymously or browse the Q&amp;A bank.<br /><br />
        <em>Forum feature will be enabled soon.</em>
      </div>
      <button className="btn btn-accent btn-large" disabled>Ask A Question (Stub)</button>
    </section>
  );
}

export default App;
