import React from 'react';

function Contact() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>
      
      <p style={styles.paragraph}>
        Have questions about Legal-Lens Pro or found a bug in the AI scanner? 
        We are here to help you navigate your legal documents safely.
      </p>

      <div style={styles.contactBox}>
        <h2 style={styles.subheading}>Get in Touch</h2>
        <p style={styles.paragraph}><strong>Email:</strong> pragadishwar5207@gmail.com</p>
        <p style={styles.paragraph}><strong>Developer:</strong> Pragadishwar</p>
        <p style={styles.paragraph}><strong>Location:</strong> Ahmedabad, Gujarat, India</p>
      </div>

      <p style={styles.paragraph}>
        <em>Note: Legal-Lens Pro is an AI tool. For binding legal advice, please consult a certified legal professional.</em>
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
    fontSize: "1.8rem",
    marginTop: "10px",
    marginBottom: "15px",
    color: "#4da6ff"
  },
  paragraph: {
    fontSize: "1.1rem",
    marginBottom: "15px"
  },
  contactBox: {
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "30px",
    marginBottom: "30px",
    border: "1px solid #333"
  }
};

export default Contact;