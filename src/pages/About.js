import React from 'react';

function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Legal-Lens Pro</h1>
      
      <p style={styles.paragraph}>
        Welcome to Legal-Lens Pro, your personal AI-powered contract scanner. 
        Navigating legal jargon can be confusing, time-consuming, and risky. 
        Our mission is to make legal documents transparent and accessible for everyone 
        by highlighting hidden "Red Flags" before you sign on the dotted line.
      </p>

      <h2 style={styles.subheading}>The Vision</h2>
      <p style={styles.paragraph}>
        This platform was developed by Pragadishwar to bridge the gap between complex legal 
        fine print and everyday users. Powered by Google's advanced Gemini AI, Legal-Lens Pro analyzes 
        contracts instantly to protect your interests and give you peace of mind.
      </p>
    </div>
  );
}

// Basic styling to keep it looking good without needing an external CSS file yet
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
    fontSize: "1.8rem",
    marginTop: "30px",
    marginBottom: "15px",
    color: "#4da6ff"
  },
  paragraph: {
    fontSize: "1.1rem",
    marginBottom: "15px"
  }
};

export default About;