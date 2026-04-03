import React from 'react';
import { Helmet } from 'react-helmet';

function Contact() {
  const handleEmailClick = () => {
    const subject = "Query regarding Legal-Lens Pro Dashboard";
    window.location.href = `mailto:pragadishwar5207@gmail.com?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Contact Founder | Legal-Lens Pro AI Legal Innovation</title>
        <meta name="description" content="Connect with Pragadishwar, the founder of Legal-Lens Pro. Collaborate on AI legal-tech or report a feature request for Indian contract analysis." />
      </Helmet>

      {/* --- HERO SECTION --- */}
      <section style={styles.section}>
        <h1 className="gradient-text" style={styles.heading}>Connect with the Founder</h1>
        <p style={styles.paragraph}>
          Have a technical query about the <strong>AI Legal Scanner</strong> or want to 
          collaborate on legal-tech innovation? We're building the future of 
          <strong> Indian law transparency</strong>, bridging the gap between commerce 
          expertise and Generative AI.
        </p>
      </section>

      {/* --- CONTACT GRID --- */}
      <div style={styles.contactGrid}>
        {/* Support Card */}
        <div style={styles.contactCard}>
          <div style={styles.cardIcon}>📬</div>
          <h2 style={styles.cardHeading}>Official Support</h2>
          <p style={styles.cardText}>
            For business inquiries, API collaborations, or reporting high-risk scam patterns 
            detected by the AI:
          </p>
          <button 
            onClick={handleEmailClick} 
            style={styles.emailButton}
            className="live-pulse"
          >
            Email Pragadishwar
          </button>
        </div>

        {/* Location Card */}
        <div style={styles.contactCard}>
          <div style={styles.cardIcon}>📍</div>
          <h2 style={styles.cardHeading}>Headquarters</h2>
          <p style={styles.cardText}>
            Innovating from the industrial heart of <strong>Ahmedabad, Gujarat, India</strong>. 
            Rooted in the community at Gujarat Housing Board, Khokhara.
          </p>
          <div style={{ marginTop: '15px', fontSize: '0.8rem', color: '#4facfe', fontWeight: 'bold' }}>
            Open for Pan-India Legal Aid Projects
          </div>
        </div>
      </div>
      {/* --- DEVELOPER BADGE --- */}
      <div style={styles.devBadge}>
        <div style={styles.avatar}>P</div>
        <div>
          <h3 style={{ margin: 0, color: "#fff", fontSize: '1.4rem' }}>Pragadishwar</h3>
          <p style={{ margin: "5px 0 0 0", fontSize: "0.95rem", color: "#4facfe", fontWeight: 'bold' }}>
            B.Com Student | AI Innovator | Jio & Outskill Certified
          </p>
          <p style={{ margin: "5px 0 0 0", fontSize: "0.85rem", color: "#777" }}>
            Specializing in Generative AI Mastermind applications for Indian Law.
          </p>
        </div>
      </div>

      {/* --- FINAL DISCLAIMER --- */}
      <p style={styles.disclaimer}>
        <strong>Legal Safety Notice:</strong> Legal-Lens Pro is an educational AI research project. 
        It is designed to identify "red flags" and does not constitute a substitute for 
        professional legal counsel. For binding legal advice or representation, please 
        consult an advocate or your nearest <strong>District Legal Services Authority (DLSA)</strong>.
      </p>
    </div>
  );
}

// --- STYLING ENGINE ---
const styles = {
  container: {
    padding: "100px 20px",
    color: "#e0e0e0",
    maxWidth: "900px",
    margin: "0 auto",
    lineHeight: "1.8",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "transparent"
  },
  section: {
    marginBottom: "60px",
    textAlign: "center"
  },
  heading: {
    fontSize: "3.5rem",
    marginBottom: "20px",
    fontWeight: "900",
    letterSpacing: "-1px"
  },
  paragraph: {
    fontSize: "1.15rem",
    color: "#888",
    marginBottom: "30px",
    maxWidth: "700px",
    margin: "0 auto"
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
    marginBottom: "60px"
  },
  contactCard: {
    padding: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "0.3s ease",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  cardIcon: {
    fontSize: "2.5rem",
    marginBottom: "15px"
  },
  cardHeading: {
    fontSize: "1.6rem",
    color: "#fff",
    marginBottom: "15px",
    fontWeight: "700"
  },
  cardText: {
    fontSize: "1rem",
    color: "#777",
    lineHeight: "1.6",
    marginBottom: "20px"
  },
  emailButton: {
    padding: "14px 28px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "0.3s",
    boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)"
  },
  devBadge: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    padding: "35px",
    backgroundColor: "rgba(0, 123, 255, 0.03)",
    borderRadius: "20px",
    border: "1px solid rgba(0, 123, 255, 0.1)",
    marginBottom: "60px",
    backdropFilter: "blur(10px)"
  },
  avatar: {
    width: "70px",
    height: "70px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
    fontWeight: "900",
    boxShadow: "0 0 20px rgba(0, 123, 255, 0.4)"
  },
  disclaimer: {
    fontSize: "0.95rem",
    color: "#555",
    borderTop: "1px solid #1a1a1a",
    paddingTop: "40px",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: "1.6"
  }
};

export default Contact;