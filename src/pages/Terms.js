import React from 'react';

function Terms() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Terms & Conditions</h1>
      
      <p style={styles.paragraph}>
        By using Legal-Lens Pro, you agree to the following terms. 
        Please read them carefully before using our AI contract scanning services:
      </p>

      <h2 style={styles.subheading}>1. Not Legal Advice</h2>
      <p style={styles.paragraph}>
        Legal-Lens Pro utilizes artificial intelligence to analyze text and highlight potential "Red Flags." 
        The output provided by this tool is strictly for informational purposes and does not constitute legally binding advice. 
        Always consult with a qualified attorney before signing any legal document.
      </p>

      <h2 style={styles.subheading}>2. Data Privacy</h2>
      <p style={styles.paragraph}>
        Documents scanned through Legal-Lens Pro are processed securely via Google's Gemini API for analysis. 
        However, we recommend redacting highly sensitive personal information (like bank details or social security numbers) before scanning.
      </p>

      <h2 style={styles.subheading}>3. Limitation of Liability</h2>
      <p style={styles.paragraph}>
        The developer is not responsible for any financial, legal, or personal damages 
        resulting from decisions made based on the use of this tool. You use this application at your own risk.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    color: "#ffffff",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.6",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#4da6ff" 
  },
  subheading: {
    fontSize: "1.5rem",
    marginTop: "25px",
    marginBottom: "10px",
    color: "#4da6ff"
  },
  paragraph: {
    fontSize: "1.1rem",
    marginBottom: "15px"
  }
};

export default Terms;