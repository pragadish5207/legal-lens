import React from 'react';

function HowToUse() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>How to Use Legal-Lens Pro</h1>
      
      <p style={styles.paragraph}>
        Scanning your documents for hidden risks is quick and easy. Follow these simple steps to protect yourself:
      </p>

      <h2 style={styles.subheading}>Step 1: Provide Your Document</h2>
      <p style={styles.paragraph}>
        You have multiple ways to input your contract. You can paste text directly, upload an image, upload a PDF file, or even use a combination of text, images, and PDFs all at once.
      </p>

      <h2 style={styles.subheading}>Step 2: Customize Your Settings</h2>
      <p style={styles.paragraph}>
        Tailor the scan to your needs. If applicable, select "Indian Mode" for insights specific to Indian law. You can also choose a translation language from the dropdown if you need the final analysis in a language other than English.
      </p>

      <h2 style={styles.subheading}>Step 3: Click Scan</h2>
      <p style={styles.paragraph}>
        Once your files are uploaded and your settings are configured, simply click the "Scan" button to start the AI analysis.
      </p>

      <h2 style={styles.subheading}>Step 4: Review and Save the Report</h2>
      <p style={styles.paragraph}>
        Carefully read through the results to understand the potential risks hidden in the fine print. Once you have reviewed the "Red Flags," you can easily copy the generated report to your clipboard or download it for your personal records.
      </p>

      <h2 style={styles.subheading}>Step 5: Use the Local Help Dashboard</h2>
      <p style={styles.paragraph}>
        If the scan reveals serious issues and you need legal assistance, go to our Local Help dashboard. First, select your state, then select your district, and click the "Find" button. This will automatically open Google Maps to show you the relevant legal authorities or help centers nearby.
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

export default HowToUse;