import React from 'react';

function HowToUse() {
  return (
    <div style={styles.container}>
      {/* --- HERO SECTION --- */}
      <header style={styles.header}>
        <h1 style={styles.heading}>Master the AI Legal Scan</h1>
        <p style={styles.paragraph}>
          Protecting yourself from unfair clauses is simple. Follow this 5-step 
          guide to get a professional-grade <strong>AI contract analysis</strong> 
          using Legal-Lens Pro.
        </p>
      </header>

      {/* --- STEP 1 --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>01. Provide Your Document</h2>
        <p style={styles.paragraph}>
          Our <strong>Multimodal AI</strong> accepts multiple inputs simultaneously. 
          You can paste raw text from WhatsApp/Email, upload <strong>OCR-ready images</strong> 
          of paper contracts, or drop <strong>PDF files</strong> directly into the scanner.
        </p>
      </section>

      {/* --- STEP 2 --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>02. Activate Indian Law Mode</h2>
        <p style={styles.paragraph}>
          To get insights based on the <strong>Indian Contract Act 1872</strong>, 
          ensure the "Indian Law Mode" toggle is active. If you need the report 
          in your native tongue, select one of <strong>50+ regional languages</strong> 
          from the dropdown menu.
        </p>
      </section>

      {/* --- STEP 3 --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>03. Run the AI Diagnostic</h2>
        <p style={styles.paragraph}>
          Click the <strong>"Scan Files"</strong> button. Our system uses 
          <strong> Gemini 1.5 Flash</strong> to cross-reference your document 
          against standard legal safety protocols in real-time.
        </p>
      </section>

      {/* --- STEP 4 --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>04. Analyze the Risk-O-Meter</h2>
        <p style={styles.paragraph}>
          Review the generated <strong>Risk Score</strong>. Red flags will highlight 
          dangerous clauses, while green markers indicate standard terms. You can 
          <strong> Download the Report</strong> as a text file for your personal legal records.
        </p>
      </section>

      {/* --- STEP 5 --- */}
      <section style={styles.stepSection}>
        <h2 style={styles.subheading}>05. Connect with DLSA</h2>
        <p style={styles.paragraph}>
          If serious risks are found, use our <strong>Local Help Dashboard</strong>. 
          By selecting your State and District, you can locate the nearest 
          <strong> District Legal Services Authority (DLSA)</strong> on Google Maps 
          for free legal assistance.
        </p>
      </section>
      </div>
  );
}

// --- STYLING ENGINE ---
const styles = {
  container: {
    padding: "60px 20px",
    color: "#e0e0e0",
    maxWidth: "900px",
    margin: "0 auto",
    lineHeight: "1.7",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "transparent"
  },
  header: {
    marginBottom: "50px",
    textAlign: "center"
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "15px",
    background: "linear-gradient(90deg, #4da6ff, #b3d9ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "800"
  },
  subheading: {
    fontSize: "1.8rem",
    marginTop: "40px",
    marginBottom: "15px",
    color: "#4da6ff",
    borderLeft: "4px solid #4da6ff",
    paddingLeft: "15px"
  },
  paragraph: {
    fontSize: "1.1rem",
    marginBottom: "20px",
    color: "#ccc"
  },
  stepSection: {
    marginBottom: "40px",
    padding: "30px",
    backgroundColor: "#111",
    borderRadius: "15px",
    border: "1px solid #222",
    transition: "0.3s"
  }
};

export default HowToUse;