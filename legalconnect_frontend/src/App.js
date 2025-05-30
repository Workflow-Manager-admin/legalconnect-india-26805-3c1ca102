// PUBLIC_INTERFACE
import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Controls which feature to show in the main content
  const [activeFeature, setActiveFeature] = useState('home');
  // For accessibility: store sidebar open/close state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation Links
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
    <>
      <div className="app">
        {/* Top Bar with Sign-In Icon */}
        <div className="signin-icon-container">
          <button
            className="signin-icon-btn"
            aria-label="Sign in to your account"
            title="Sign In"
            onClick={() => setActiveFeature('signin')}
          >
            {/* SVG icon for user/profile, more visually distinct and accessible than emoji */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
              focusable="false"
              className="signin-svg-icon"
            >
              <circle cx="14" cy="14" r="13" stroke="#1A237E" strokeWidth="2" fill="#FFD700"/>
              <circle cx="14" cy="11.5" r="4.2" stroke="#1A237E" strokeWidth="1.5" fill="#F8F9FB"/>
              <ellipse cx="14" cy="19.7" rx="7.2" ry="4.1" stroke="#1A237E" strokeWidth="1.5" fill="#fff"/>
            </svg>
          </button>
        </div>
        {/* Top Header Bar with Centered Branding */}
        <header className="brand-header" aria-label="Site Header">
          <div
            className="brand-logo"
            tabIndex={0}
            aria-label="Indian Law Mate Home"
            onClick={() => setActiveFeature('home')}
            onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setActiveFeature('home'); }}
            role="button"
          >
            <span className="logo-symbol" aria-hidden="true">⚖️</span>
            <span className="brand-name">
              Indian Law <span className="brand-name-secondary">Mate</span>
            </span>
          </div>
        </header>

        {/* Hamburger menu for sidebar on mobile */}
        <button 
          aria-label="Open navigation menu" 
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(true)}
          style={{ display: 'none' }}
          id="sidebar-toggle"
        >
          <span aria-hidden="true" style={{fontSize: "2em"}}>☰</span>
        </button>

        <div className="layout">
          {/* Sidebar */}
          <aside
            className={`sidebar${sidebarOpen ? ' open' : ''}`}
            aria-label="Feature navigation"
          >
            <nav>
              {/* Mobile close button */}
              <button 
                tabIndex={sidebarOpen ? 0 : -1}
                className="sidebar-close"
                aria-label="Close navigation menu"
                onClick={() => setSidebarOpen(false)}
              >
                ×
              </button>
              <ul className="sidebar-nav-list">
                {navLinks.map(link => (
                  <li key={link.key}>
                    <button
                      className={`sidebar-nav-btn${activeFeature === link.key ? " active" : ""}`}
                      aria-current={activeFeature === link.key ? "page" : undefined}
                      tabIndex={0}
                      aria-label={`${link.label}: ${link.desc}`}
                      onClick={() => { setActiveFeature(link.key); setSidebarOpen(false); }}
                      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') { setActiveFeature(link.key); setSidebarOpen(false);} }}
                    >
                      <span className="sidebar-icon" aria-hidden="true">{link.icon}</span>
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main
            id="main-content"
            className="main-content"
            tabIndex={-1}
            aria-live="polite"
          >
            {renderMainContent()}
          </main>
        </div>

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
    </>
  );
}

/* ---- All major placeholders/section text remain unchanged except heading and branding text update ---- */
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
