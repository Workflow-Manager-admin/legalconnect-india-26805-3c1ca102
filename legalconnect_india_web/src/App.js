import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
// Main homepage for LegalConnect India styled as a clean, elegant legal service site.
// - Deep navy blue (#0D1B2A) primary, gold (#D4AF37) accents, soft white (#F5F5F5) sections.
// - Responsive sticky top navbar, Montserrat/Roboto for headings/body.
// - Custom sticky nav height on scroll, accessible nav & controls.
// - Hero section with a semi-transparent legal-themed background (TODO: Replace placeholder) with dark overlay.
// - Modular, documented components with focus/hover states, white space, soft dividers, modern legal design.

const COLORS = {
  primary: "#0D1B2A", // deep navy blue
  accent: "#D4AF37",  // gold
  background: "#F5F5F5",
  blackOverlay: "rgba(12,24,40, 0.58)", // overlay for hero
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
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
  </React.Fragment>
);

// --- Icons, minimal inline for fast loads ---
const icons = {
  lawyer: <span aria-label="lawyer" role="img" style={{fontSize: 22}}>⚖️</span>,
  doc: <span aria-label="document" role="img" style={{fontSize: 22}}>📄</span>,
  case: <span aria-label="case tracker" role="img" style={{fontSize: 22}}>⏱️</span>,
  video: <span aria-label="video call" role="img" style={{fontSize: 22}}>🎥</span>,
  rights: <span aria-label="rights" role="img" style={{fontSize: 22}}>📝</span>,
  forum: <span aria-label="forum" role="img" style={{fontSize: 22}}>💬</span>,
  signIn: <span aria-label="sign in" role="img" style={{fontSize: 18}}>🔒</span>
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
// ---- Sticky Responsive NavBar ----
function Navbar({onSignIn, signedIn}) {
  // Responsive sticky with shrink on scroll
  const [shrink, setShrink] = useState(false);
  React.useEffect(()=>{
    const onScroll = ()=>setShrink(window.scrollY > 26);
    window.addEventListener("scroll", onScroll);
    return ()=>window.removeEventListener("scroll", onScroll);
  },[]);
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="Main"
      style={{
        background: COLORS.primary,
        color: '#fff',
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: COLORS.navDropShadow,
        borderBottom: `2.5px solid ${COLORS.accent}`,
        minHeight: shrink ? 52 : 71,
        transition: "min-height 0.23s cubic-bezier(.23,1.01,.32,1)"
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <a href="#home"
          className="logo"
          tabIndex={0}
          aria-label="LegalConnect India Home"
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 800,
            fontSize: shrink ? "1.20rem" : "1.46rem",
            display: "flex",
            alignItems: "center",
            color: COLORS.accent,
            outline: "none",
            textShadow: "0 1px 4px rgba(20,23,32,0.10)"
          }}
        >
          <span
            style={{
              marginRight: 9,
              fontSize: shrink ? "1.33rem" : "1.60rem",
              letterSpacing:1,
              fontWeight: 900,
              color: COLORS.accent
            }}>
            ⚖️
          </span>
          <span style={{
            color: "#fff",
            fontWeight: 800,
            letterSpacing: ".01em"
          }}>
            LegalConnect <span style={{fontWeight:600,color:COLORS.accent}}>India</span>
          </span>
        </a>
        {/* Main nav options */}
        <div
          className="lc-nav-links"
          style={{
            display: "flex",
            gap: 18,
            alignItems: "center",
            fontFamily: FONT_HEADING,
            fontWeight: 600,
            fontSize: ".99rem"
          }}
        >
          {NAV_LINKS.slice(1).map(link => (
            <a
              key={link.anchor}
              href={`#${link.anchor}`}
              className="lc-nav-link"
              tabIndex={0}
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: shrink ? "4px 10px" : "8px 13px",
                borderRadius: 5,
                transition: "background 0.2s,box-shadow 0.2s",
                fontWeight: 600,
                letterSpacing:".02em"
              }}
              onFocus={e=>e.target.style.boxShadow=`0 0 0 2.5px ${COLORS.focus}`}
              onBlur={e=>e.target.style.boxShadow='none'}
              onMouseOver={e=>e.target.style.background=COLORS.blackOverlay}
              onMouseOut={e=>e.target.style.background="transparent"}
            >{link.label}</a>
          ))}
          <button
            className="btn"
            style={{
              background: COLORS.accent,
              color: COLORS.primary,
              marginLeft: 20,
              borderRadius: 6,
              boxShadow: COLORS.shadow,
              fontWeight: 700,
              fontFamily: FONT_HEADING,
              fontSize: shrink ? "0.93rem" : "1.07rem",
              padding: shrink ? "7px 16px" : "10px 23px",
              border: "none",
              outline: "none",
              transition:"box-shadow 0.2s, background 0.16s"
            }}
            onClick={onSignIn}
            aria-label="Sign In"
            onFocus={e=>e.target.style.boxShadow=`0 0 0 2.5px ${COLORS.focus}`}
            onBlur={e=>e.target.style.boxShadow='none'}
          >{icons.signIn} <span style={{marginLeft:3, color: COLORS.primary, fontWeight:700}}>{signedIn ? "Signed In" : "Sign In"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// ---- Hero Section with semi-transparent legal image & dark overlay ----
// The bg image is a placeholder. Replace 'LEGAL_BG_URL' with actual asset or use image extraction.
const LEGAL_BG_URL = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=70'; 
function HeroHeader() {
  return (
    // TODO: Replace LEGAL_BG_URL with high-res legal-themed asset
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
          textAlign:"center",
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
            textShadow: "0 2px 18px #02101a9c, 0 0 3px #0008" }}>
          Legal Help, Instantly. <span style={{fontSize:"2.1rem",verticalAlign:"middle"}}>⚖️</span>
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

// --- Modular Main Content Sections ---
//

function SectionContainer({children, ariaId}) {
  // Ensures each section is padded and delimited, with proper legal style
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
      <div style={{maxWidth:970, margin:"0 auto", padding:"0 28px"}}>
        {children}
      </div>
    </section>
  );
}

// --- SIDEBAR: Hidden on mobile, left-aligned nav for desktop ---
function SidebarNav({onNavigate}) {
  // Only large screens get side nav
  return (
    <nav
      className="lc-sidebar"
      aria-label="Sidebar navigation"
      tabIndex={-1}
      style={{
        background: COLORS.primary,
        color: "#fff",
        minWidth: 170,
        padding: "24px 12px 0 0",
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        boxShadow: "2px 0 8px rgba(13,27,42,0.07)",
        position: "sticky",
        top: 82,
        fontFamily: FONT_BODY,
        fontWeight: 600,
        letterSpacing: ".01em"
      }}>
      <ul className="lc-sidelist" style={{listStyle: "none", padding: 0, margin: 0}}>
        {NAV_LINKS.slice(1).map(link =>
          <li key={link.anchor} style={{margin: "22px 0"}}>
            <a
              href={`#${link.anchor}`}
              className="lc-side-link"
              tabIndex={0}
              style={{
                display: "flex", alignItems: "center",
                color: '#fff', textDecoration: "none", gap: 10,
                borderRadius: 5,
                padding: "7px 12px",
                transition: "background 0.16s",
                fontWeight: 500
              }}
              onClick={e => { e.preventDefault(); onNavigate(link.anchor); }}
              onFocus={e=>e.target.style.background=COLORS.blackOverlay}
              onBlur={e=>e.target.style.background="transparent"}
              onMouseOver={e=>e.target.style.background=COLORS.blackOverlay}
              onMouseOut={e=>e.target.style.background="transparent"}
              aria-label={link.label}
            >{icons[link.anchor] ?? null} {link.label}</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

// --- FEATURE: Instant Lawyer Match Form ---
// (removed duplicate definition)

// --- LEGAL DOCS GENERATOR (mock UI, no backend) ---
// (removed duplicate definition)

// --- CASE TRACKER (timeline mock) ---
function CaseTracker() {
  const timeline = [
    {date:'2023-07-23', label:'Case Filed', done:true},
    {date:'2023-08-05', label:'First Hearing', done:true},
    {date:'2023-09-10', label:'Evidence Submission', done:true},
    {date:'2023-10-15', label:'Next Hearing', done:false}
  ];
  return (
    <SectionContainer ariaId="case">
      <h2 style={{
        color:COLORS.primary, fontSize:"1.53rem",fontWeight:800,
        fontFamily:FONT_HEADING, margin:"0 0 14px"}}>{icons.case} Case Tracker</h2>
      <ol style={{
        borderLeft:`3px solid ${COLORS.accent}`,
        margin:0,
        paddingLeft:15,
        background:'#fff',
        borderRadius:9,
        maxWidth:375,
        fontFamily:FONT_BODY,
        fontWeight:600,
        boxShadow:"0 1px 4px #eef2fa"
      }}>
        {timeline.map((item,idx) =>
          <li key={item.date} style={{
            marginBottom:14,
            listStyle:'none',
            color:item.done?COLORS.accent:'#aab',
            fontWeight:item.done?800:500
          }}>
            <span>
              {item.label}
              <span style={{fontWeight:400, marginLeft:9, color:'#999',fontSize:13}}>({item.date})</span>
              &nbsp;{item.done && <span style={{color:COLORS.accent, fontSize:17}}>&#10003;</span>}
            </span>
          </li>
        )}
      </ol>
      <div style={{marginTop:13, color:"#65677a", fontSize:14}}>
        For full tracking, sign in and link your case reference.
      </div>
    </SectionContainer>
  );
}

// --- VIDEO CONSULTATION BOOKING (mock UI) ---
function VideoConsultBooking() {
  return (
    <SectionContainer ariaId="video">
      <h2 style={{
        color:COLORS.primary, fontSize:"1.53rem", fontWeight:800,
        margin:"0 0 14px", fontFamily:FONT_HEADING
      }}>{icons.video} Video Consultation Booking</h2>
      <form style={{
        background:'#fff', borderRadius:8, padding:"19px 16px", maxWidth:330,
        color:COLORS.primary, fontFamily:FONT_BODY, boxShadow:COLORS.shadow}}>
        <label htmlFor="lawyerName" style={{fontWeight:600}}>Lawyer&apos;s Name:</label>
        <input id="lawyerName" name="lawyerName" type="text" required style={{width:'100%',marginBottom:7, padding:5, borderRadius:5, border:'1.1px solid #c2cadd'}} />
        <label htmlFor="date" style={{fontWeight:600}}>Date:</label>
        <input id="date" name="date" type="date" required style={{width:'100%',marginBottom:7, padding:5, borderRadius:5, border:'1.1px solid #c2cadd'}} />
        <label htmlFor="time" style={{fontWeight:600}}>Time:</label>
        <input id="time" name="time" type="time" required style={{width:'100%',marginBottom:7, padding:5, borderRadius:5, border:'1.1px solid #c2cadd'}} />
        <button type="submit" className="btn btn-large"
          style={{
            background:COLORS.primary, color:'#fff',
            fontWeight:700, width:'100%', fontFamily:FONT_HEADING, borderRadius:6, marginTop:3
          }}>Book Video Consult</button>
      </form>
      <div style={{
        fontSize:13, marginTop:10, color:'#4C4E54', fontFamily:FONT_BODY}}>Link will be sent to your email/mobile (demo only).</div>
    </SectionContainer>
  );
}

// --- EDUCATION: KNOW YOUR RIGHTS ---
function KnowYourRights() {
  const categories = [
    {cat: "Property", tip: "All property sales must be registered per Indian law."},
    {cat: "Marriage", tip: "Consent of both parties is mandatory for a valid marriage."},
    {cat: "Cyber Law", tip: "Online privacy is protected by IT Act, 2000."}
  ];
  return (
    <SectionContainer ariaId="rights">
      <h2 style={{
        color:COLORS.primary, fontSize:"1.53rem",fontWeight:800,
        margin:"0 0 10px", fontFamily:FONT_HEADING
      }}>{icons.rights} Know Your Rights</h2>
      <div style={{display:"flex", flexWrap:"wrap", gap:19}}>
        {categories.map(item =>
          <div key={item.cat} style={{
            background:'#fff',
            color:COLORS.primary,
            borderLeft:`6px solid ${COLORS.accent}`,
            borderRadius:8,
            padding:"15px 19px",
            minWidth:170,
            maxWidth:320,
            fontSize:"1.04rem",
            fontWeight:600,
            fontFamily:FONT_BODY,
            boxShadow:"1px 1px 9px #dbdbe9"
          }}>
            <b>{item.cat}:</b> {item.tip}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

// --- ANONYMOUS Q&A FORUM (mock) ---
function AnonymousForum() {
  const [q, setQ] = useState('');
  const [list, setList] = useState([
    {q:"How can I file an online FIR?", a:"Visit your state police website to file."},
    {q:"Is an unregistered rent agreement valid?", a:"It has limited legal value if not registered."}
  ]);
  function handleAsk(e){
    e.preventDefault();
    if(q.trim().length>2){
      setList([{q,a:"Pending lawyer answer"} ,...list]);
      setQ('');
    }
  }
  return (
    <SectionContainer ariaId="forum">
      <h2 style={{
        color:COLORS.primary,fontSize:"1.53rem",fontWeight:800,
        margin:"0 0 11px", fontFamily:FONT_HEADING
      }}>{icons.forum} Anonymous Q&A Forum</h2>
      <form style={{display:"flex",gap:10,marginBottom:11}} onSubmit={handleAsk}>
        <input
          style={{flex:1,padding:7,borderRadius:5, border:'1.2px solid #b1bad6', fontFamily:FONT_BODY}}
          type="text" value={q}
          placeholder="Ask your legal question (anonymous)"
          aria-label="Question"
          onChange={e=>setQ(e.target.value)} />
        <button className="btn" style={{
          background:COLORS.primary, color:"#fff", fontWeight:700, fontFamily:FONT_HEADING
        }} type="submit">Ask</button>
      </form>
      <div style={{
        background:"#fff", borderRadius:8, padding:"13px 12px",
        fontFamily:FONT_BODY, fontWeight:500, boxShadow:"0 1px 4px #e0e3f1"}}>
        <ul style={{listStyle:"none", padding:0, margin:0}}>
          {list.map((x,i) =>
            <li key={i} style={{marginBottom:10}}>
              <div style={{
                color:COLORS.primary, fontWeight:700, marginBottom:2}}>Q: {x.q}</div>
              <div style={{
                marginLeft:14,
                color: x.a==="Pending lawyer answer"? COLORS.accent: "#229157",
                fontWeight: x.a==="Pending lawyer answer"?700:600
              }} aria-live={x.a==="Pending lawyer answer"?"polite":undefined}>
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
function SignInModal({open, onClose, onSignedIn}) {
  const [fields, setFields] = useState({name:'', address:'', mobile:''});
  function handleChange(e){
    setFields({...fields, [e.target.name]: e.target.value});
  }
  function handleSignIn(e){
    e.preventDefault();
    onSignedIn(fields.name);
    onClose();
  }
  if(!open) return null;
  return (
    <div
      className="lc-modal"
      role="dialog"
      aria-modal="true"
      style={{
        position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:2000,
        background:"rgba(16,22,28,0.32)",display:"flex",alignItems:"center",justifyContent:"center"
      }}>
      <form
        style={{
          background:"#fff",
          padding:"34px 30px",
          borderRadius:16,
          minWidth:300,
          color:COLORS.primary,
          boxShadow:"0 2px 18px #1a263716"
        }}
        onSubmit={handleSignIn}
        aria-label="Sign In Modal"
      >
        <h3 style={{margin:"0 0 18px",color:COLORS.primary,fontFamily:FONT_HEADING}}>Sign In</h3>
        <label htmlFor="userName" style={{fontWeight:600}}>Name:</label>
        <input id="userName" name="name" value={fields.name} onChange={handleChange} required style={{width:'100%',marginBottom:8, padding:7, borderRadius:5, border:'1.3px solid #adbadc',fontFamily:FONT_BODY}} />
        <label htmlFor="address" style={{fontWeight:600}}>Address:</label>
        <input id="address" name="address" value={fields.address} onChange={handleChange} required style={{width:'100%',marginBottom:8,padding:7, borderRadius:5, border:'1.3px solid #adbadc',fontFamily:FONT_BODY}} />
        <label htmlFor="mobile" style={{fontWeight:600}}>Mobile:</label>
        <input id="mobile" name="mobile" type="tel" pattern="[0-9]{10}" maxLength="10" value={fields.mobile} required style={{width:'100%',marginBottom:8,padding:7,borderRadius:5, border:'1.3px solid #adbadc',fontFamily:FONT_BODY}} />
        <button className="btn btn-large" style={{background:COLORS.primary,color:'#fff',width:"100%",marginTop:7,fontWeight:700,fontFamily:FONT_HEADING}}>Sign In</button>
        <button type="button" style={{
          marginTop:10,background:"transparent",border:"none",color:COLORS.primary,
          fontWeight:700, cursor:"pointer", display:"block", width:"100%",fontFamily:FONT_HEADING
        }} onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer style={{
      marginTop:46,
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
      <div className="container" style={{maxWidth:740, margin:"0 auto"}}>
        &copy; {new Date().getFullYear()} LegalConnect India &middot; <a href="#privacy" style={{color:COLORS.accent, textDecoration:"underline"}}>Privacy</a> &middot; <a href="#terms" style={{color:COLORS.accent, textDecoration:"underline"}}>Terms</a> &middot; <span>Contact: <a href="mailto:help@legalconnect.in" style={{color:COLORS.accent}}>help@legalconnect.in</a></span>
      </div>
    </footer>
  );
}

// --- MAIN CONTAINER ---
function App() {
  // Modal state for sign in
  const [signModal, setSignModal] = useState(false);
  const [signedName, setSignedName] = useState('');

  // Main section navigation handler
  function handleNav(anchor) {
    let elem = document.getElementById(anchor);
    if (elem) elem.scrollIntoView({behavior:'smooth', block:'start'});
  }

  // Responsive: show sidebar if width > 1000px
  const [showSidebar, setShowSidebar] = useState(typeof window !== "undefined" ? window.innerWidth > 1140 : true);
  React.useEffect(() => {
    const handleResize = () => setShowSidebar(window.innerWidth > 1140);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app" style={{
      background: COLORS.background,
      color: COLORS.primary,
      fontFamily: FONT_BODY,
      minHeight: "100vh"
    }}>
      <FontsPreload />
      <Navbar
        onSignIn={() => setSignModal(true)}
        signedIn={!!signedName}
      />
      {signModal && (
        <SignInModal
          open={signModal}
          onClose={() => setSignModal(false)}
          onSignedIn={setSignedName}
        />
      )}
      <HeroHeader />
      <div style={{display:"flex", margin: "0 auto", maxWidth: 1418, width: "100%"}}>
        {showSidebar && (
          <SidebarNav onNavigate={handleNav}/>
        )}
        <main
          className="container"
          tabIndex={0}
          style={{
            marginTop: 0,
            marginLeft: showSidebar ? 0 : undefined,
            flexGrow: 1,
            padding: showSidebar ? "0 7% 0 80px" : "0 0 0 0",
            minHeight: "90vh"
          }}
          aria-labelledby="main-content"
        >
          {/* Main sections, all modular, ample white space, soft dividers */}
          <InstantLawyerMatch />
          <div style={{
            display:"flex",
            flexWrap:"wrap",
            gap:36,
            justifyContent:"space-evenly",
            marginBottom:0
          }}>
            <LegalDocsGenerator />
            <CaseTracker />
            <VideoConsultBooking />
          </div>
          <KnowYourRights />
          <AnonymousForum />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;

// --- ACCESSIBLE FORM: INSTANT LAWYER MATCH ---
function InstantLawyerMatch({onResult}) {
  const [form, setForm] = useState({issue:'', urgency:'Normal', budget:''});
  const [submitted, setSubmitted] = useState(false);

  // Mocked result (normally an API call)
  const mockLawyers = [
    {name:"Amit Sharma", spec:"Civil Law", rating:4.8},
    {name:"Priya Mehra", spec:"Property Law", rating:4.6},
    {name:"Rajiv Gupta", spec:"Cyber Law", rating:4.5}
  ];

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if(onResult) onResult(mockLawyers.slice(0,3)); // In real case, send real request
  }

  return (
    <section id="match" style={{margin: "0 auto", padding: "40px 0 32px", maxWidth: 520}} aria-label="Instant Lawyer Match">
      <h2 style={{
        fontSize: "2.1rem", color: COLORS.primary, fontWeight: 700, marginBottom: 8, marginTop: 0
      }}>{icons.lawyer} Instant Lawyer Match</h2>
      <form className="lc-match-form"
        style={{
          background: "#fff",
          color: "#111",
          borderRadius: 10,
          padding: 24,
          boxShadow: "0 2px 14px 0 rgba(26,35,126,0.09)",
          display: "flex",
          flexDirection: "column",
          gap: 18
        }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label htmlFor="issue" style={{fontWeight: 500, color: COLORS.primary}}>Your Legal Issue</label>
        <input
          id="issue"
          name="issue"
          type="text"
          value={form.issue}
          required
          placeholder="Briefly describe (e.g., property dispute)..."
          onChange={handleChange}
          style={{padding:9, borderRadius:5, border:'1px solid #c7cadd'}}
          aria-required="true"
        />

        <label htmlFor="urgency" style={{fontWeight: 500, color: COLORS.primary}}>Urgency</label>
        <select
          id="urgency"
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
          style={{padding:7, borderRadius:5}}
        >
          <option>Normal</option>
          <option>Urgent</option>
        </select>
        
        <label htmlFor="budget" style={{fontWeight: 500, color: COLORS.primary}}>Budget (INR)</label>
        <input
          id="budget"
          name="budget"
          type="number"
          min={0}
          value={form.budget}
          required
          placeholder="e.g., 2000"
          onChange={handleChange}
          style={{padding:9, borderRadius:5, border:'1px solid #c7cadd'}}
          aria-required="true"
        />

        <button
          type="submit"
          className="btn btn-large"
          style={{
            background: COLORS.primary,
            color: '#fff',
            borderRadius: 7,
            fontWeight: 600,
            fontSize: "1.04rem"
          }}
          aria-label="Get Matched Lawyers"
        >Find My Lawyer</button>
      </form>
      {submitted && (
        <div
          aria-live="polite"
          style={{marginTop:18, background:"#f0f2fa", borderRadius:8, padding:16}}
        >
          <div style={{color:COLORS.primary, fontWeight:700, marginBottom:6}}>Matched Lawyers:</div>
          <ul style={{listStyle:"none", padding:0, margin:0}}>
            {mockLawyers.map(lawyer =>
              <li key={lawyer.name} style={{
                padding:"7px 0", borderBottom:"1px solid #ececec", display:"flex", justifyContent:"space-between"
              }}>
                <span>
                  <span role="img" aria-label="lawyer">👤</span> <b>{lawyer.name}</b>
                  <span style={{color:"#444",marginLeft:6,fontWeight:400}}>({lawyer.spec})</span>
                </span>
                <span style={{color:COLORS.accent,fontWeight:600}}>&#9733; {lawyer.rating}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
}

// --- LEGAL DOCS GENERATOR (mock UI, no backend) ---
function LegalDocsGenerator() {
  // Simple templates
  const templates = [
    {id:'rent',    label:'Rental Agreement'},
    {id:'affid',   label:'Affidavit'},
    {id:'nda',     label:'NDA'}
  ];
  const [selected, setSelected] = useState('');
  const [filled, setFilled] = useState({name:'', party:'', date:''});
  const [download, setDownload] = useState('');

  const handleTemplate = (id) => {
    setSelected(id); setDownload('');
    setFilled({name:'', party:'', date:''});
  };

  function handleChange(e) {
    setFilled({...filled, [e.target.name]: e.target.value});
  }

  function handleGenerate(e) {
    e.preventDefault();
    // Basic rendering, no backend
    const docText =
      `LegalConnect: ${templates.find(x=>x.id===selected).label}\nName: ${filled.name}\nSecond Party: ${filled.party}\nDate: ${filled.date}`;
    setDownload(docText);
  }

  return (
    <section id="docs" style={{marginTop:24, marginBottom:24}} aria-label="Legal Docs Generator">
      <h2 style={{color: COLORS.primary, fontSize:"1.6rem",fontWeight:600, margin:"0 0 10px"}}>
        {icons.doc} Legal Docs Generator
      </h2>
      <div style={{display:"flex", gap:14, flexWrap:"wrap"}}>
        {templates.map(t =>
          <button
            className="btn"
            style={{background: selected===t.id?COLORS.accent:COLORS.primary, color:"#fff"}}
            onClick={()=>handleTemplate(t.id)}
            aria-label={`Select ${t.label} template`}
            key={t.id}
          >{t.label}</button>
        )}
      </div>
      {selected && (
        <form onSubmit={handleGenerate} style={{marginTop:14, background: "#fff", borderRadius:8, padding:18, maxWidth:320, color:"#111"}}>
          <label htmlFor="name" style={{fontWeight:500}}>Your Name:</label>
          <input id="name" name="name" value={filled.name} onChange={handleChange} required style={{width:'100%',marginBottom:7, padding:5}} />
          <label htmlFor="party" style={{fontWeight:500}}>Second Party:</label>
          <input id="party" name="party" value={filled.party} onChange={handleChange} required style={{width:'100%',marginBottom:7, padding:5}} />
          <label htmlFor="date" style={{fontWeight:500}}>Date:</label>
          <input id="date" name="date" type="date" value={filled.date} onChange={handleChange} required style={{width:'100%',marginBottom:7, padding:5}} />
          <button type="submit" className="btn btn-large" style={{background:COLORS.primary, color:'#fff',width:'100%'}}>Generate</button>
        </form>
      )}
      {download && (
        <div style={{marginTop:10, background:"#F5F7FF", padding:10, borderRadius:5}}>
          <pre style={{whiteSpace:'pre-wrap', fontSize:14, color:'#333'}}>{download}</pre>
          <button
            className="btn"
            style={{background:COLORS.accent, marginTop:5}}
            onClick={() => alert('Downloaded (mock)')}
          >Download</button>
        </div>
      )}
    </section>
  );
}

// --- CASE TRACKER (timeline mock) ---
function CaseTracker() {
  const timeline = [
    {date:'2023-07-23', label:'Case Filed', done:true},
    {date:'2023-08-05', label:'First Hearing', done:true},
    {date:'2023-09-10', label:'Evidence Submission', done:true},
    {date:'2023-10-15', label:'Next Hearing', done:false}
  ];
  return (
    <section id="case" style={{marginBottom:24}} aria-label="Case Tracker">
      <h2 style={{color:COLORS.primary, fontSize:"1.6rem",fontWeight:600, margin:"0 0 14px"}}>{icons.case} Case Tracker</h2>
      <ol style={{borderLeft:`3px solid ${COLORS.accent}`, margin:0, paddingLeft:16, background:'#fff', borderRadius:8, maxWidth:370}}>
        {timeline.map((item,idx) =>
          <li key={item.date} style={{marginBottom:16,listStyle:'none'}}>
            <div style={{fontWeight:600,color:item.done?COLORS.accent:'#aaa'}}>{item.label}
              <span style={{fontWeight:400, marginLeft:9, color:'#999',fontSize:13}}>({item.date})</span>
            </div>
            {item.done && <div style={{color:COLORS.accent, fontSize:17}}>&#10003;</div>}
          </li>
        )}
      </ol>
      <div style={{marginTop:12, color:"#444", fontSize:14}}>For full tracking, please sign in and link your case reference.</div>
    </section>
  );
}

// --- VIDEO CONSULTATION BOOKING (mock UI) ---
function VideoConsultBooking() {
  return (
    <section id="video" style={{marginBottom:24}} aria-label="Video Consultation Booking">
      <h2 style={{color:COLORS.primary, fontSize:"1.6rem",fontWeight:600, margin:"0 0 12px"}}>{icons.video} Video Consultation Booking</h2>
      <form style={{background:'#fff', borderRadius:8, padding:18, maxWidth:320, color:"#111"}}>
        <label htmlFor="lawyerName" style={{fontWeight:500}}>Lawyer's Name:</label>
        <input id="lawyerName" name="lawyerName" type="text" required style={{width:'100%',marginBottom:7, padding:5}} />
        <label htmlFor="date" style={{fontWeight:500}}>Date:</label>
        <input id="date" name="date" type="date" required style={{width:'100%',marginBottom:7, padding:5}} />
        <label htmlFor="time" style={{fontWeight:500}}>Time:</label>
        <input id="time" name="time" type="time" required style={{width:'100%',marginBottom:7, padding:5}} />
        <button type="submit" className="btn btn-large" style={{background:COLORS.primary, color:'#fff',width:'100%'}}>Book Video Consult</button>
      </form>
      <div style={{fontSize:13, marginTop:7, color:'#444'}}>Link will be sent to your email/mobile (mock-up interface).</div>
    </section>
  );
}

// --- EDUCATION: KNOW YOUR RIGHTS ---
function KnowYourRights() {
  const categories = [
    {cat: "Property", tip: "All property sales must be registered per Indian law."},
    {cat: "Marriage", tip: "Both parties must consent for a valid marriage."},
    {cat: "Cyber Law", tip: "Your online privacy is protected by the IT Act, 2000."}
  ];
  return (
    <section id="rights" style={{marginBottom:24}} aria-label="Know Your Rights">
      <h2 style={{color:COLORS.primary, fontSize:"1.6rem",fontWeight:600, margin:"0 0 10px"}}>{icons.rights} Know Your Rights</h2>
      <div style={{display:"flex", flexWrap:"wrap", gap:18}}>
        {categories.map(item =>
          <div key={item.cat} style={{
            background:'#fff',
            color:'#111',
            borderLeft:`6px solid ${COLORS.secondary}`,
            borderRadius:8,
            padding:"14px 18px",
            minWidth:170,
            maxWidth:320,
            fontSize:"1.07rem",
            boxShadow:"1px 1px 8px #f0f1ff"
          }}>
            <b>{item.cat}:</b> {item.tip}
          </div>
        )}
      </div>
    </section>
  );
}

// --- ANONYMOUS Q&A FORUM (mock) ---
function AnonymousForum() {
  const [q, setQ] = useState('');
  const [list, setList] = useState([
    {q:"How can I file an online FIR?", a:"Visit your state police website to file."},
    {q:"Is an unregistered rent agreement valid?", a:"It has limited legal value if not registered."}
  ]);
  function handleAsk(e){
    e.preventDefault();
    if(q.trim().length>2){
      setList([{q,a:"Pending lawyer answer"} ,...list]);
      setQ('');
    }
  }
  return (
    <section id="forum" style={{marginBottom:30}} aria-label="Anonymous Q&A Forum">
      <h2 style={{color:COLORS.primary,fontSize:"1.6rem",fontWeight:600, margin:"0 0 10px"}}>{icons.forum} Anonymous Q&A Forum</h2>
      <form style={{display:"flex",gap:10,marginBottom:10}} onSubmit={handleAsk}>
        <input
          style={{flex:1,padding:7,borderRadius:5}}
          type="text" value={q}
          placeholder="Ask your legal question (anonymous)"
          aria-label="Question"
          onChange={e=>setQ(e.target.value)} />
        <button className="btn" style={{background:COLORS.primary}} type="submit">Ask</button>
      </form>
      <div style={{background:"#fff", borderRadius:8, padding:14}}>
        <ul style={{listStyle:"none", padding:0, margin:0}}>
          {list.map((x,i) =>
            <li key={i} style={{marginBottom:10}}>
              <div style={{color:COLORS.primary, fontWeight:500}}>Q: {x.q}</div>
              <div style={{marginLeft:14, color: x.a==="Pending lawyer answer"? COLORS.secondary:COLORS.accent}} aria-live={x.a==="Pending lawyer answer"?"polite":undefined}>
                {x.a}
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

// --- SIGN IN BUTTON HANDLER (mock) ---
function SignInModal({open, onClose, onSignedIn}) {
  const [fields, setFields] = useState({name:'', address:'', mobile:''});
  function handleChange(e){
    setFields({...fields, [e.target.name]: e.target.value});
  }
  function handleSignIn(e){
    e.preventDefault();
    onSignedIn(fields.name);
    onClose();
  }
  if(!open) return null;
  return (
    <div
      className="lc-modal"
      role="dialog"
      aria-modal="true"
      style={{
        position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:999,
        background:"rgba(36,41,52,0.38)",display:"flex",alignItems:"center",justifyContent:"center"
      }}>
      <form
        style={{background:"#fff",padding:32,borderRadius:12,minWidth:300,color:"#111",boxShadow:"0 1px 17px #434a71"}}
        onSubmit={handleSignIn}
        aria-label="Sign In Modal"
      >
        <h3 style={{margin:"0 0 18px",color:COLORS.primary}}>Sign In</h3>
        <label htmlFor="userName" style={{fontWeight:500}}>Name:</label>
        <input id="userName" name="name" value={fields.name} onChange={handleChange} required style={{width:'100%',marginBottom:7, padding:7}} />
        <label htmlFor="address" style={{fontWeight:500}}>Address:</label>
        <input id="address" name="address" value={fields.address} onChange={handleChange} required style={{width:'100%',marginBottom:7,padding:7}} />
        <label htmlFor="mobile" style={{fontWeight:500}}>Mobile:</label>
        <input id="mobile" name="mobile" type="tel" pattern="[0-9]{10}" maxLength="10" value={fields.mobile} required style={{width:'100%',marginBottom:7,padding:7}} />
        <button className="btn btn-large" style={{background:COLORS.primary,color:'#fff',width:"100%",marginTop:8}}>Sign In</button>
        <button type="button" style={{
          marginTop:10,background:"transparent",border:"none",color:COLORS.primary, fontWeight:600,
          cursor:"pointer", display:"block", width:"100%"
        }} onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer style={{
      marginTop:48,
      background: COLORS.primary,
      color: "#fff",
      borderTop: `3px solid ${COLORS.secondary}`,
      padding: "26px 0 10px",
      textAlign: "center",
      width: "100%"
    }}>
      <div className="container" style={{fontSize:15}}>
        &copy; {new Date().getFullYear()} LegalConnect India &middot; <a href="#privacy" style={{color:COLORS.accent}}>Privacy</a> &middot; <a href="#terms" style={{color:COLORS.accent}}>Terms</a> &middot; <span>Contact: help@legalconnect.in</span>
      </div>
    </footer>
  );
}

// --- MAIN CONTAINER ---
function App() {
  // Modal state for sign in
  const [signModal, setSignModal] = useState(false);
  const [signedName, setSignedName] = useState('');

  // Main section navigation handler
  function handleNav(anchor) {
    let elem = document.getElementById(anchor);
    if (elem) elem.scrollIntoView({behavior:'smooth', block:'start'});
  }

  // Responsive: show sidebar if width > 900px
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 930);
  React.useEffect(() => {
    const handleResize = () => setShowSidebar(window.innerWidth > 930);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app" style={{background: "#F8F9FC", color: "#111"}}>
      <Navbar
        onSignIn={() => setSignModal(true)}
        signedIn={!!signedName}
      />

      {signModal && (
        <SignInModal
          open={signModal}
          onClose={() => setSignModal(false)}
          onSignedIn={setSignedName}
        />
      )}

      <div style={{display:"flex"}}>
        {showSidebar && (
          <SidebarNav onNavigate={handleNav}/>
        )}
      <main
        className="container"
        tabIndex={0}
        style={{
          marginTop: 95,
          marginLeft: showSidebar ? 0 : undefined,
          flexGrow:1,
          padding: showSidebar ? "0 5% 0 70px" : "0 0 0 0",
          minHeight: "90vh"
        }}
        aria-labelledby="main-content"
      >
        {/* HERO / LANDING */}
        <section
          style={{
            background:"#fff",
            borderRadius:16,
            boxShadow:"0 2px 10px 0 rgba(26,35,126,0.05)",
            margin:"20px 0 28px",
            padding:"38px 0 28px",
            textAlign:"center",
            position:"relative"
          }}
        >
          <span className="subtitle" style={{
            color: COLORS.secondary, fontWeight:600, fontSize:"1.14rem", letterSpacing:1
          }}>Connecting You to India's Trusted Legal Experts</span>
          <h1 className="title" style={{
            margin:"14px 0 12px",
            color: COLORS.primary,
            fontWeight:800,
            fontSize:"2.9rem"
          }}>
            Legal Help, Instantly. <span style={{display:"inline-block",fontSize:"2.2rem",verticalAlign:"middle"}}>⚖️</span>
          </h1>
          <p className="description" style={{
            margin:"0 auto 20px", maxWidth:410,
            fontSize:"1.17rem", color:"#242d56"
          }}>
            Get matched with top lawyers, create legal documents, track your case and more —
            all in a click, trusted by thousands across India.
          </p>
        </section>
        
        {/* INSTANT LAWYER MATCH */}
        <InstantLawyerMatch />

        {/* Feature Sections */}
        <div style={{display:"flex", flexWrap:"wrap", gap:28, justifyContent:"space-evenly"}}>
          <LegalDocsGenerator />
          <CaseTracker />
          <VideoConsultBooking />
        </div>
        <KnowYourRights />
        <AnonymousForum />
      </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;