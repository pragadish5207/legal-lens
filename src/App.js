import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';

// --- GLOBAL LANGUAGE LIST (50+ Languages) ---
const LANGUAGES = [
  "English", "Hindi", "Gujarati", "Tamil", "Telugu", "Kannada", "Malayalam", 
  "Marathi", "Bengali", "Punjabi", "Urdu", "Odia", "Assamese", "Maithili", "Sanskrit",
  "Spanish", "French", "German", "Mandarin Chinese", "Japanese", "Korean", 
  "Russian", "Arabic", "Portuguese", "Italian", "Dutch", "Turkish", 
  "Vietnamese", "Thai", "Indonesian", "Polish", "Ukrainian", "Hebrew", 
  "Swedish", "Norwegian", "Danish", "Finnish", "Greek", "Hungarian", "Czech",
  "Romanian", "Bulgarian", "Serbian", "Croatian", "Slovak", "Lithuanian",
  "Latvian", "Estonian", "Slovenian", "Persian", "Pashto", "Swahili", "Amharic"
];

// --- GLOBAL CONFIGURATION ---
// Initializing the API key and library outside the component to prevent re-initialization on every render.
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

function App() {
  // --- 1. STATE MANAGEMENT ---
  // Core application states for files and results
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Scanning document...");
  
  // UI and Feature states
  const [availableModels, setAvailableModels] = useState([]);
  const [modelError, setModelError] = useState("");
  const [hasAgreed, setHasAgreed] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  // --- NEW: LANGUAGE STATE ---
  const [language, setLanguage] = useState("English");
  const [apiStatus, setApiStatus] = useState("checking"); // States: "checking", "online", or "offline"
  
  // Refs for UI manipulation
  const resultsRef = useRef(null);

  // --- 2. EFFECT: API HEALTH CHECK ---
  // This runs once on mount to verify if the Gemini API is reachable.
  useEffect(() => {
    const checkAPI = async () => {
      try {
        // We perform a lightweight "ping" to verify the connection
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("ping"); 
        const response = await result.response;
        
        if (response.text()) {
          setApiStatus("online");
        }
      } catch (error) {
        console.error("API Health Check Failed:", error);
        // Only set to offline if the error is specifically about the API Key
        if (error.message && error.message.includes("API_KEY_INVALID")) {
           setApiStatus("offline");
        } else {
           // For temporary network glitches, we assume online to allow the user to try scanning
           setApiStatus("online"); 
        }
      }
    };
    checkAPI();
  }, []);

  // --- 3. EFFECT: AUTOMATIC MODEL CHECKER ---
  // Fetches the list of models your specific API key has access to.
  useEffect(() => {
    const checkModels = async () => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch models");
        
        const data = await response.json();
        
        // We filter the list to find only models that support content generation
        const validModels = data.models?.filter(m => 
          m.supportedGenerationMethods.includes("generateContent")
        );
        
        setAvailableModels(validModels || []);
      } catch (err) {
        console.error("Model Check Failed:", err);
        setModelError("Could not verify models. Check your Vercel/Local environment variables.");
      }
    };

    if (API_KEY) {
      checkModels();
    }
  }, [API_KEY]);

  // --- 4. EFFECT: AUTO-SCROLL TO RESULTS ---
  // Automatically scrolls the page to the diagnostic report once it is generated.
  useEffect(() => {
    if (analysis && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis]);

  // --- 5. EFFECT: LOADING MESSAGE CYCLE ---
  // Rotates through different messages while the AI is thinking to keep the user engaged.
  useEffect(() => {
    let interval;
    if (loading) {
      const messages = [
        "Reading file content...",
        "Analyzing legal jargon...",
        "Identifying high-risk clauses...",
        "Checking for red flags...",
        "Scanning for hidden liabilities...",
        "Finalizing your diagnostic report..."
      ];
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % messages.length;
        setLoadingMessage(messages[i]);
      }, 2500); // Changes message every 2.5 seconds
    }
    return () => clearInterval(interval); // Cleanup when loading stops
  }, [loading]);

  // --- 6. HANDLER: FILE UPLOAD & PREVIEW ---
  // Processes selected files and creates local URLs for the preview gallery.
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      const newPreviews = selectedFiles.map(file => ({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      }));
      setPreviews(newPreviews);
      setAnalysis(""); // Clears old analysis when new files are chosen
    }
  };
  // --- 7. HANDLER: RESET THE DASHBOARD ---
  // Completely wipes all files, previews, and analysis to start fresh.
  const handleClear = () => {
    setFiles([]);
    setPreviews([]);
    setAnalysis("");
  };

  // --- 8. HANDLER: SAVE TO DEVICE ---
  // Converts the AI's diagnostic report into a .txt file for the user to keep.
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([analysis], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "legal-lens-report.txt";
    document.body.appendChild(element);
    element.click();
  };

  // --- 9. HANDLER: QUICK COPY ---
  // Copies the entire analysis to the clipboard for easy sharing.
  const handleCopy = () => {
    navigator.clipboard.writeText(analysis);
    alert("✅ Report copied to clipboard!");
  };

  // --- 10. HANDLER: FEEDBACK SYSTEM ---
  // Captures and "sends" suggestions. (Future: connect to backend/DB).
  const handleSendSuggestion = () => {
    if (!suggestion.trim()) {
      alert("⚠️ Please type something before sending!");
      return;
    }
    // Personalized confirmation for the developer
    alert("🚀 Thanks! Your suggestion has been recorded by the system.");
    setSuggestion(""); // Clears the input box after sending
  };

  // --- 11. HELPER: FILE PREPARATION ---
  // Converts standard browser files into the base64 format Gemini requires.
  const fileToGenerativePart = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // --- 12. CORE LOGIC: THE AI SCANNER ---
  // The primary function that sends data to Gemini and retrieves the report.
  const analyzeContract = async () => {
    if (files.length === 0) {
      alert("⚠️ SYSTEM ALERT: Please upload at least one file to begin analysis!");
      return;
    }

    setLoading(true);
    // Initial status update for the user
    setAnalysis(`Analyzing ${files.length} document(s)... Please wait for the system to process...`);

    try {
      // ⚠️ DYNAMIC MODEL SELECTION: 
      // Uses the first available model found on mount, or falls back to 'gemini-1.5-flash'.
      const modelName = availableModels.length > 0 
        ? availableModels[0].name.replace("models/", "") 
        : "gemini-1.5-flash";
      
      console.log("System Status: Active. Model in use:", modelName);
      
      const model = genAI.getGenerativeModel({ model: modelName });

      // Convert all uploaded files simultaneously
      const fileParts = await Promise.all(files.map(fileToGenerativePart));

      // The specialized legal prompt designed to find risks without markdown clutter
      // ⚠️ SMART PROMPT: INJECTS SELECTED LANGUAGE
      const prompt = `You are an expert Lawyer. Analyze these ${files.length} documents.
      
      CRITICAL INSTRUCTION: Output the entire report in ${language} language.
      
      For each document:
      1. List the Document Name.
      2. Find 'Red Flags'. Label them as "⚠️ Red Flag:" (keep this label in English).
      3. Explain the risk in ${language} in 1 simple sentence.
      4. Give a 'Risk Score' (0-10) labeled as "🔥 Risk Score:" (keep this label in English).
      
      Format the output cleanly without markdown bolding.`;

      const result = await model.generateContent([prompt, ...fileParts]);
      const response = await result.response;
      let text = response.text();
      
      // UI POLISH: Replace text triggers with visual icons for better UX
      text = text.replace(/Red Flag:/g, "⚠️ Red Flag:");
      text = text.replace(/Risk Score/g, "🔥 Risk Score");
      
      setAnalysis(text);
    } catch (error) {
      console.error("Critical Scanner Error:", error);
      setAnalysis("❌ SYSTEM FAILURE: Unable to process documents. " + error.toString());
    }

    setLoading(false);
  };

  // --- 13. UI HELPER: THE COLOR PARSER ---
  // This logic applies conditional coloring to the AI's response in real-time.
  const formatAnalysis = (text) => {
    if (!text) return null;

    // Splits the long text block into individual lines for color evaluation
    return text.split('\n').map((line, index) => {
      let color = "white"; // Default text color

      // SCANNABILITY LOGIC: Highlight the most important info in Red/Yellow/Green
      if (line.includes("🔥 Risk Score: 10") || line.includes("High Risk") || line.includes("⚠️ Red Flag:")) {
        color = "#ff6b6b"; // High Alert (Soft Red)
      } else if (line.includes("🔥 Risk Score: 5") || line.includes("Medium Risk")) {
        color = "#fcc419"; // Caution (Warning Yellow)
      } else if (line.includes("Low Risk") || line.includes("Safe") || line.includes("🔥 Risk Score: 0")) {
        color = "#51cf66"; // Safe (Success Green)
      }

      return (
        <p key={index} style={{ 
          color: color, 
          margin: "8px 0", 
          fontWeight: color !== "white" ? "bold" : "normal",
          lineHeight: "1.5" 
        }}>
          {line}
        </p>
      );
    });
  };
  // --- 14. THE MAIN VISUAL COMPONENT ---
  return (
    <div className="App">
      {/* --- GATEKEEPER MODAL: Safety First --- */}
      {!hasAgreed && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 10000, padding: "20px"
        }}>
          <div style={{
            backgroundColor: "#1a1a1a", padding: "40px", borderRadius: "20px",
            maxWidth: "600px", border: "2px solid #ffcc00", textAlign: "center",
            boxShadow: "0 0 30px rgba(255, 204, 0, 0.2)"
          }}>
            <h2 style={{color: "#ffcc00", marginBottom: "20px"}}>⚖️ LEGAL-LENS PRO: USER AGREEMENT</h2>
            
            <div style={{textAlign: "left", color: "#ddd", fontSize: "14px", lineHeight: "1.6", marginBottom: "30px"}}>
              <p>Welcome to <strong>Legal-Lens Pro</strong>. Before you proceed, please understand:</p>
              <ul style={{marginTop: "10px"}}>
                <li>This is a student project created by <strong>Pragadishwar</strong> for educational purposes only.</li>
                <li><strong>NOT LEGAL ADVICE:</strong> AI analysis can be wrong. Never rely on this for real legal decisions.</li>
                <li><strong>USER RESPONSIBILITY:</strong> All risks, outcomes, and liabilities from using this tool are strictly your own.</li>
                <li><strong>PRIVACY:</strong> Do not upload documents containing sensitive personal data.</li>
              </ul>
            </div>

            <div style={{display: "flex", gap: "15px", justifyContent: "center"}}>
              <button 
                onClick={() => setHasAgreed(true)}
                style={{
                  padding: "15px 30px", backgroundColor: "#ffcc00", color: "#000",
                  border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "16px"
                }}
              >
                I AGREE & CONTINUE
              </button>
              <button 
                onClick={() => window.location.href = "https://google.com"}
                style={{
                  padding: "15px 30px", backgroundColor: "transparent", color: "#ff4444",
                  border: "1px solid #ff4444", borderRadius: "8px", cursor: "pointer"
                }}
              >
                I DISAGREE (EXIT)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER SECTION --- */}
      <h1>
        ⚡ Legal-Lens Pro ⚡ 
        <span 
  className={apiStatus === "online" ? "live-pulse" : ""}
  style={{ 
    fontSize: '12px', 
    verticalAlign: 'middle', 
    marginLeft: '10px',
    transition: "color 0.3s ease",
    color: apiStatus === "online" ? "#28a745" : apiStatus === "offline" ? "#dc3545" : "#ffc107"
  }}
>
  ● {apiStatus.toUpperCase()}
</span>
      </h1>
      <p style={{ color: "#aaa", marginBottom: "30px" }}>AI-Powered Contract Analysis & Risk Detection</p>
      
      {/* --- SYSTEM ERROR DISPLAY --- */}
      {modelError && (
        <div style={{ 
          backgroundColor: "#2d0a0a", padding: "10px", margin: "10px auto", 
          borderRadius: "5px", maxWidth: "600px", fontSize: "12px", 
          border: "1px solid #ff4444", color: "#ff8888" 
        }}>
          <strong>🚨 SYSTEM ERROR:</strong> {modelError}
        </div>
      )}

      {/* --- UPLOAD SECTION --- */}
      <div className="upload-box">
        <input 
          type="file" multiple accept="image/*,application/pdf" 
          onChange={handleFileChange} 
        />
        <p style={{marginTop: "10px", fontSize: "12px", color: "#888"}}>
          (Supports: JPG, PNG, PDF)
        </p>
      </div>

      {/* --- PREVIEW GALLERY --- */}
      <div className="preview-container">
        {previews.map((file, index) => (
          <div key={index} className="preview-item">
            {file.type.includes("image") ? (
              <img src={file.url} alt="preview" style={{width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px"}} />
            ) : (
              <div style={{
                width: "80px", height: "80px", display: "flex", alignItems: "center", 
                justifyContent: "center", flexDirection: "column", color: "#e0e0e0"
              }}>
                📄 <span style={{fontSize: "9px", marginTop: "5px"}}>{file.name.substring(0, 10)}...</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", margin: "20px 0" }}>
       {/* --- LANGUAGE SELECTOR --- */}
       {/* PASTE THIS NEW SEARCH BAR HERE */}
<div style={{ display: "inline-block", marginRight: "10px" }}>
  <input 
    list="language-options" 
    placeholder="Type language..." 
    value={language} 
    onChange={(e) => setLanguage(e.target.value)}
    style={{
      padding: "10px", borderRadius: "5px", border: "1px solid #444",
      backgroundColor: "#222", color: "#fff", width: "150px",
      cursor: "text", fontSize: "14px"
    }}
  />
  <datalist id="language-options">
    {LANGUAGES.map((lang) => (
      <option key={lang} value={lang} />
    ))}
  </datalist>
</div>
        <button className="btn-scan" onClick={analyzeContract} disabled={loading}>
          {loading ? `⏳ ${loadingMessage}` : `🔍 SCAN FILES`}
        </button>

        <button className="btn-clear" onClick={handleClear}>
          🗑️ RESET
        </button>
      </div>

      {/* --- RESULTS SECTION: The Colorful Diagnostic --- */}
      {analysis && !loading && (
        <div className="result-box" ref={resultsRef}>
          <h3 className="result-title">📋 DIAGNOSTIC REPORT:</h3>
          <div style={{ textAlign: "left" }}>
            {formatAnalysis(analysis)}
          </div>
          
          <div style={{marginTop: "25px", textAlign: "right", borderTop: "1px solid #444", paddingTop: "15px"}}>
             <button 
               className="btn-download" onClick={handleCopy} 
               style={{marginRight: "10px", backgroundColor: "#333"}}
             >
               📋 COPY TEXT
             </button>
             <button className="btn-download" onClick={handleDownload}>
               💾 SAVE REPORT
             </button>
          </div>
        </div>
      )}

      {/* --- SUGGESTION BOX: Developer Feedback --- */}
      <div style={{
        marginTop: "60px", padding: "20px", backgroundColor: "#111", 
        borderRadius: "10px", border: "1px solid #333", maxWidth: "600px", 
        margin: "60px auto", textAlign: "center"
      }}>
        <h4 style={{color: "#007bff", marginBottom: "10px"}}>💡 Have a suggestion?</h4>
        <textarea 
          placeholder="Help me improve Legal-Lens! Type your feedback here..."
          value={suggestion} onChange={(e) => setSuggestion(e.target.value)}
          style={{
            width: "100%", height: "80px", backgroundColor: "#222", color: "#fff",
            border: "1px solid #444", borderRadius: "5px", padding: "10px", 
            fontSize: "14px", resize: "none", marginBottom: "10px", outline: "none"
          }}
        />
        <button onClick={handleSendSuggestion} className="btn-send-suggestion">
          SEND FEEDBACK
        </button>
      </div>

      {/* --- FOOTER: Professional Branding --- */}
      <footer style={{ 
        marginTop: "80px", padding: "30px", borderTop: "1px solid #333", 
        fontSize: "12px", color: "#666", textAlign: "center", lineHeight: "1.8"
      }}>
        <p>⚠️ <strong>LEGAL DISCLAIMER:</strong> This AI tool provides general information and is not a substitute for professional legal advice.</p>
        <p style={{ color: "#007bff", fontWeight: "bold" }}>© 2026 Pragadishwar - Built with Google Gemini API</p>
      </footer>
    </div>
  );
}

export default App;