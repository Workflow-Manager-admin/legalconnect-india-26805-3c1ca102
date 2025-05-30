# LegalConnect India Main Container – Requirements & Architecture Document

## 1. Overview

LegalConnect India is a web platform designed to connect users with legal professionals, provide tools for document generation, simplify case tracking, and educate users about their rights, all tailored to the Indian legal environment. This document details the requirements, design, and architecture of the LegalConnect India main container front-end, developed using React JS.

---

## 2. Product Requirements

### 2.1 Functional Requirements

#### 2.1.1 Instant Lawyer Match
- Users can fill out a form specifying legal issues, urgency, and budget.
- System matches and displays 2–3 recommended lawyers filtered by specialization, rating, and, optionally, location.
- Display lawyer details (name, specialization, experience, ratings) and facilitate initiation of contact.

#### 2.1.2 Legal Document Generator
- Users can select from templates for common legal documents (e.g., rental agreements, affidavits, NDAs).
- Interactive forms allow users to fill out template fields.
- Users can download completed documents in PDF or Word format.

#### 2.1.3 Case Tracker
- After engaging a lawyer, users can view the status of their legal cases.
- Case statuses are shown in a timeline format, including upcoming court dates and milestones.
- Support for push/email notifications of key updates.

#### 2.1.4 Video Consultation Booking
- Users can book appointments for virtual consultations with lawyers.
- Integration with video platforms (e.g., Zoom or Google Meet) via booking links.
- Calendar view of upcoming booked sessions.

#### 2.1.5 Know Your Rights Section
- Educational content organized by legal category (property, marriage, cyber law, etc.).
- Content is written in plain English/Hindi for accessibility.

#### 2.1.6 Anonymous Q&A Forum
- Users can post basic legal questions without signing in.
- Verified lawyers respond; all users can view/search the question bank.

#### 2.1.7 Sign-In
- Sign-in feature for managing user details (name, address, mobile number) to enable contact and engagement tracking.
- Provides additional features for registered users (case tracking, booking, download history, etc.)

---

### 2.2 Non-Functional Requirements

- **Responsiveness:** The application must offer a seamless experience on desktop, tablet, and mobile devices.
- **Performance:** Application loads in under 2 seconds on standard broadband; navigation between core sections is instantaneous.
- **Security:** Sensitive user details (sign-in data, documents) must be handled securely and in compliance with Indian data protection norms.
- **Accessibility:** All features must be usable by people with disabilities, adhering to WCAG 2.1 AA guidelines.
- **Scalability:** Front-end architecture should support modular addition of new features without disrupting base functionality.
- **Reliability:** The UI should gracefully handle backend/API outages, displaying meaningful messages.
- **Internationalization (Future):** Code should anticipate multi-language support, primarily English and Hindi.

---

## 3. System Architecture

### 3.1 Technology Stack

- **Frontend:** React JS (JavaScript, ES6+)
- **UI Styling:** Vanilla CSS (with CSS variables in `App.css`)
- **Testing:** Jest, React Testing Library (see `setupTests.js`)
- **Package Management:** NPM
- **Linting:** ESLint (see `eslint.config.mjs`)

### 3.2 Frontend Layout & Navigation

- **Main Navigation:** Fixed top navbar (see `App.js` / `App.css`) with links to:
  - Home (Instant Lawyer Match)
  - Legal Docs Generator
  - Case Tracker
  - Know Your Rights
  - Anonymous Q&A
  - Sign In
- **Sidebar / Secondary Nav:** For frequently accessed utilities (document downloads, bookings, notifications).
- **Footer:** With contact information, privacy, and terms of service.

#### Homepage
- Prominent “Instant Lawyer Match” form.
- Features highlighted in main content area with icons and clear calls-to-action.

#### Responsive Design
- Uses media queries, flexible container widths, and adaptive layout for mobile and desktop.
- Color palette and components defined via CSS variables (primary: `#1A237E` navy blue, secondary: `#FFD700` gold, accent: `#4CAF50` green, see `App.css` and plan).

---

## 4. Design & UI Guidelines

- Maintain a professional legal look and feel emphasizing trust, simplicity, and clarity.
- Consistent branding with navy blue, gold, and accent green.
- Buttons, typography, and containers styled using the `.btn`, `.container`, `.navbar`, `.title`, `.subtitle`, `.description` classes (see `App.css`).
- Use iconography and whitespace to reduce clutter and highlight primary call-to-actions.
- All interactive elements must have adequate touch/click targets and visible focus indicators.
- Use modals or side panels for forms and secondary tasks instead of full-page reloads.

---

## 5. Component Structure Proposal

- `App.js`: Application container; handles routing and main navigation.
- `components/Navbar.js`: Main navigation bar.
- `components/InstantLawyerMatch.js`: Lawyer matching form and results.
- `components/LegalDocsGenerator.js`: Document template selector and forms.
- `components/CaseTracker.js`: Case status timeline view.
- `components/VideoBookings.js`: Video consultation scheduler.
- `components/KnowYourRights.js`: Rights content display.
- `components/AnonymousForum.js`: Question entry and list view.
- `components/SignIn.js`: User sign-in/profile form.
- `components/Footer.js`: Footer content.
- CSS modules or files for component-specific styles.

---

## 6. Future Enhancements & Extensibility

- Integration with backend APIs/services for real-time data.
- Deployment as a PWA (Progressive Web App) for offline support.
- Addition of multi-language support via i18n frameworks.
- Optional: Theming toggle (light/dark mode).
- Extensible modular architecture for adding features like lawyer verification, document e-signature, payment gateways.

---

## 7. References

- [React Documentation](https://reactjs.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Indian IT (Data Protection) Laws](https://www.meity.gov.in/)

---

## 8. Appendix

- See `legalconnect_frontend/README.md` for developer setup and running instructions.
- UI and theme variables specified in `src/App.css`.

---
