import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Scanning document...");
  
  // NEW: State to store the list of available models
  const [availableModels, setAvailableModels] = useState([]);
  const [modelError, setModelError] = useState("");
const [hasAgreed, setHasAgreed] = useState(false);
const [suggestion, setSuggestion] = useState("");
  const resultsRef = useRef(null);

  // ⚠️ API KEY FROM ENVIRONMENT VARIABLES (SECURE)
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  
  // --- NEW FEATURE: CHECK SUPPORTED MODELS AUTOMATICALLY ---
  useEffect(() => {
    const checkModels = async () => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch models");
        
        const data = await response.json();
        
        // Filter for models that support "generateContent"
        const validModels = data.models?.filter(m => 
          m.supportedGenerationMethods.includes("generateContent")
        );
        
        setAvailableModels(validModels || []);
      } catch (err) {
        console.error("Model Check Failed:", err);
        setModelError("Could not verify models. Check API Key permissions.");
      }
    };

    checkModels();
  }, [API_KEY]);

  // --- AUTO SCROLL EFFECT ---
  useEffect(() => {
    if (analysis && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis]);

  // --- LOADING MESSAGE CYCLE ---
  useEffect(() => {
    let interval;
    if (loading) {
      const messages = [
        "Reading file content...",
        "Analyzing legal jargon...",
        "Checking for red flags...",
        "Drafting final report..."
      ];
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % messages.length;
        setLoadingMessage(messages[i]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [loading]);

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
      setAnalysis(""); 
    }
  };

  const handleClear = () => {
    setFiles([]);
    setPreviews([]);
    setAnalysis("");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([analysis], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "legal-lens-report.txt";
    document.body.appendChild(element);
    element.click();
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(analysis);
    alert("✅ Report copied to clipboard!");
  };
  const handleSendSuggestion = () => {
  if (!suggestion.trim()) {
    alert("⚠️ Please type something before sending!");
    return;
  }
  // For now, this just alerts. Later you can connect this to an email API or Database.
  alert("🚀 Thanks, Pragadishwar received your suggestion!");
  setSuggestion(""); // Clears the box
};

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

  const analyzeContract = async () => {
    if (files.length === 0) {
      alert("⚠️ SYSTEM ALERT: Upload at least one file!");
      return;
    }

    setLoading(true);
    setAnalysis(`Analyzing ${files.length} document(s)... Please wait...`);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // ⚠️ WE USE THE FIRST AVAILABLE MODEL OR FALLBACK TO STANDARD
      const modelName = availableModels.length > 0 ? availableModels[0].name.replace("models/", "") : "gemini-1.5-flash";
      console.log("Using Model:", modelName);
      
      const model = genAI.getGenerativeModel({ model: modelName });

      const fileParts = await Promise.all(files.map(fileToGenerativePart));

      const prompt = `You are an expert Lawyer. Analyze these ${files.length} documents.
      For each document:
      1. List the Document Name.
      2. Find 'Red Flags'. Use the exact phrase "Red Flag:" for each one.
      3. Explain the risk in 1 simple sentence.
      4. Give a 'Risk Score' (0-10) at the end.
      
      Format the output cleanly without using markdown bolding (avoid **).`;

      const result = await model.generateContent([prompt, ...fileParts]);
      const response = await result.response;
      let text = response.text();
      
      text = text.replace(/Red Flag:/g, "⚠️ Red Flag:");
      text = text.replace(/Risk Score/g, "🔥 Risk Score");
      
      setAnalysis(text);
    } catch (error) {
      setAnalysis("❌ SYSTEM FAILURE: " + error.toString());
    }

    setLoading(false);
  };

  return (
    <div className="App">
      {/* --- GATEKEEPER MODAL --- */}
      {!hasAgreed && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(0,0,0,0.95)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10000, padding: "20px"
        }}>
          <div style={{
            backgroundColor: "#1a1a1a",
            padding: "40px",
            borderRadius: "20px",
            maxWidth: "600px",
            border: "2px solid #ffcc00",
            textAlign: "center",
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
                  padding: "15px 30px", 
                  backgroundColor: "#ffcc00", 
                  color: "#000", 
                  border: "none", 
                  borderRadius: "8px", 
                  fontWeight: "bold", 
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                I AGREE & CONTINUE
              </button>
              <button 
                onClick={() => window.location.href = "https://google.com"}
                style={{
                  padding: "15px 30px", 
                  backgroundColor: "transparent", 
                  color: "#ff4444", 
                  border: "1px solid #ff4444", 
                  borderRadius: "8px", 
                  cursor: "pointer"
                }}
              >
                I DISAGREE (EXIT)
              </button>
            </div>
          </div>
        </div>
      )}
      <h1>⚡ Legal-Lens Pro ⚡</h1>
      <p>AI-Powered Contract Analysis</p>
      
      {/* --- NEW SECTION: API DEBUGGER --- */}
      {/* --- SMART STATUS: ONLY SHOWS IF BROKEN --- */}
      {modelError && (
        <div style={{ 
          backgroundColor: "#2d0a0a", 
          padding: "10px", 
          margin: "10px auto", 
          borderRadius: "5px", 
          maxWidth: "600px", 
          fontSize: "12px", 
          border: "1px solid #ff4444", 
          color: "#ff8888" 
        }}>
          <strong>🚨 SYSTEM ERROR:</strong> {modelError}
        </div>
      )}

      <div className="upload-box">
        <input 
          type="file" 
          multiple 
          accept="image/*,application/pdf" 
          onChange={handleFileChange} 
        />
        <p style={{marginTop: "10px", fontSize: "12px", color: "#888"}}>
          (Supports: JPG, PNG, PDF)
        </p>
      </div>

      <div className="preview-container">
        {previews.map((file, index) => (
          <div key={index} className="preview-item">
            {file.type.includes("image") ? (
              <img src={file.url} alt="preview" style={{width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px"}} />
            ) : (
              <div style={{width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#e0e0e0"}}>
                📄 <span style={{fontSize: "9px", marginTop: "5px"}}>{file.name.substring(0, 10)}...</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <button className="btn-scan" onClick={analyzeContract} disabled={loading}>
          {loading ? `⏳ ${loadingMessage}` : `🔍 SCAN FILES`}
        </button>

        <button className="btn-clear" onClick={handleClear}>
          🗑️ RESET
        </button>
      </div>

      {analysis && !loading && (
        <div className="result-box" ref={resultsRef}>
          <h3 className="result-title">📋 DIAGNOSTIC REPORT:</h3>
          <p style={{whiteSpace: "pre-line"}}>{analysis}</p>
          
          <div style={{marginTop: "20px", textAlign: "right", borderTop: "1px solid #444", paddingTop: "15px"}}>
             <button 
               className="btn-download" 
               onClick={handleCopy} 
               style={{marginRight: "10px", backgroundColor: "#333"}}
             >
               📋 COPY TEXT
             </button>
             <button className="btn-download" onClick={handleDownload}>
               💾 SAVE REPORT
             </button>
             {/* --- SUGGESTION BOX --- */}
      <div style={{
        marginTop: "40px",
        padding: "20px",
        backgroundColor: "#111",
        borderRadius: "10px",
        border: "1px solid #333",
        maxWidth: "600px",
        margin: "40px auto",
        textAlign: "center"
      }}>
        <h4 style={{color: "#007bff", marginBottom: "10px"}}>💡 Have a suggestion?</h4>
        <textarea 
          placeholder="Type your feedback or feature ideas here..."
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          style={{
            width: "100%",
            height: "80px",
            backgroundColor: "#222",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "5px",
            padding: "10px",
            fontSize: "14px",
            resize: "none",
            marginBottom: "10px",
            outline: "none"
          }}
        />
        <button 
          onClick={handleSendSuggestion}
          style={{
            padding: "10px 25px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
        >
          SEND FEEDBACK
        </button>
      </div>

      {/* --- LEGAL DISCLAIMER FOOTER --- */}
      <footer style={{ 
        marginTop: "50px", 
        padding: "20px", 
        borderTop: "1px solid #333", 
        fontSize: "11px", 
        color: "#666", 
        textAlign: "center",
        lineHeight: "1.5"
      }}>
        <p>⚠️ <strong>DISCLAIMER:</strong> Legal-Lens Pro is an AI-powered tool for educational purposes only. It is not a substitute for professional legal advice.</p>
        <p>© 2026 Pragadishwar - Built with Gemini AI</p>
      </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;