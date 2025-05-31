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

// Each route gets a separate minimal page. Expandable for real functionality.
function MatchLawyerPage() {
  // For now, just show the placeholder.
  return <PlaceholderPage heading="Instant Lawyer Match">{icons.lawyer} {/* more UI soon */}</PlaceholderPage>;
}
function LegalDocsPage() {
  return <PlaceholderPage heading="Legal Documents Generator">{icons.doc}</PlaceholderPage>;
}
function CaseTrackerPage() {
  return <PlaceholderPage heading="Case Tracker">{icons.case}</PlaceholderPage>;
}
function VideoConsultPage() {
  return <PlaceholderPage heading="Video Consultation">{icons.video}</PlaceholderPage>;
}
function KnowYourRightsPage() {
  return <PlaceholderPage heading="Know Your Rights">{icons.rights}</PlaceholderPage>;
}
function QaForumPage() {
  return <PlaceholderPage heading="Q&A Forum">{icons.forum}</PlaceholderPage>;
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

        <NavigationBar />

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
