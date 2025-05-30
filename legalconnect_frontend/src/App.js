import React, { useState } from 'react';
import './App.css';

// NAVIGATION LINKS CONFIG
const navLinks = [
  { key: 'home', label: 'Home' },
  { key: 'lawyer', label: 'Instant Lawyer Match' },
  { key: 'docs', label: 'Legal Docs Generator' },
  { key: 'cases', label: 'Case Tracker' },
  { key: 'video', label: 'Video Consultation Booking' },
  { key: 'rights', label: 'Know Your Rights' },
  { key: 'qa', label: 'Anonymous Q&A' },
  { key: 'signin', label: 'Sign-In' }
];

// PUBLIC_INTERFACE
function App() {
  // Controls which feature to show in the main content
  const [activeFeature, setActiveFeature] = useState('home');
  const [signedInUser, setSignedInUser] = useState(null);

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
      case 'signin':
        return (
          <SignInSection
            onSignIn={user => {
              setSignedInUser(user);
              setActiveFeature('home');
            }}
          />
        );
      default:
        return <FeaturesStackedSections setActiveFeature={setActiveFeature} />;
    }
  }

  // PUBLIC_INTERFACE
  return (
    <div className="app">
      {/* Top Bar: Sign In/Sign Up at top right */}
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
                onClick={() => setActiveFeature('signin')}
              >Sign In</button>
              <button className="signup-link" type="button" aria-label="Sign Up" tabIndex={0}
                onClick={() => setActiveFeature('signin')}
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

// PUBLIC_INTERFACE
function LegalDocsSection() {
  return (
    <section tabIndex={-1} className="stacked-feature-section feature-section-legal-docs">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">📄</span>
        <h2 className="stacked-feature-heading">Legal Document Generator</h2>
        <div className="stacked-feature-desc">
          Select, fill, and download custom Indian legal document templates such as agreements or affidavits.<br /><br />
          <em>Full interactive generator coming soon.</em>
        </div>
        <button className="btn btn-accent btn-large" disabled>Start Document (Stub)</button>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function CaseTrackerSection() {
  return (
    <section tabIndex={-1} className="stacked-feature-section feature-section-case-tracker">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">🗂️</span>
        <h2 className="stacked-feature-heading">Case Tracker</h2>
        <div className="stacked-feature-desc">
          Timeline view for your ongoing cases, complete with court hearing dates and alert notifications.<br /><br />
          <em>Case dashboard feature coming soon.</em>
        </div>
        <button className="btn btn-accent btn-large" disabled>View My Cases (Stub)</button>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function VideoConsultSection() {
  return (
    <section tabIndex={-1} className="stacked-feature-section feature-section-video-booking">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">🎥</span>
        <h2 className="stacked-feature-heading">Video Consultation Booking</h2>
        <div className="stacked-feature-desc">
          Book video meetings with legal experts on your schedule.<br /><br />
          <em>Booking system coming soon.</em>
        </div>
        <button className="btn btn-accent btn-large" disabled>Book Consultation (Stub)</button>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function KnowYourRightsSection() {
  return (
    <section tabIndex={-1} className="stacked-feature-section feature-section-know-rights">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">⚖️</span>
        <h2 className="stacked-feature-heading">Know Your Rights</h2>
        <div className="stacked-feature-desc">
          Learn about your rights under Indian law – from property and consumer protection to family &amp; cyber laws.<br /><br />
          <em>Knowledgebase will soon be available.</em>
        </div>
        <button className="btn btn-accent btn-large" disabled>Explore Rights (Stub)</button>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function AnonymousQnASection() {
  return (
    <section tabIndex={-1} className="stacked-feature-section feature-section-anon-qa">
      <div className="stacked-feature-inner">
        <span className="stacked-feature-icon" aria-hidden="true">💬</span>
        <h2 className="stacked-feature-heading">Anonymous Q&amp;A</h2>
        <div className="stacked-feature-desc">
          Post your legal query anonymously or browse the Q&amp;A bank.<br /><br />
          <em>Forum feature will be enabled soon.</em>
        </div>
        <button className="btn btn-accent btn-large" disabled>Ask A Question (Stub)</button>
      </div>
    </section>
  );
}

export default App;
