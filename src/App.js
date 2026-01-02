import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 1. IMPROVEMENT: This reference helps us find the bottom of the page
  const resultsRef = useRef(null);

  // ⚠️ YOUR KEY IS HERE
  const API_KEY = "AIzaSyDZKiEANSwFVqMzmlk95owPB6zpCha96I4";

  // 2. IMPROVEMENT: Auto-Scroll Effect
  // When 'analysis' finishes, this automatically scrolls down to the results
  useEffect(() => {
    if (analysis && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis]);

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
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const fileParts = await Promise.all(files.map(fileToGenerativePart));

      const prompt = `You are an expert Lawyer. Analyze these ${files.length} documents.
      For each document:
      1. List the Document Name.
      2. Find 3 'Red Flags'. Use the exact phrase "Red Flag:" for each one.
      3. Explain the risk in 1 simple sentence.
      4. Give a 'Risk Score' (0-10) at the end.
      
      Format the output cleanly without using markdown bolding (avoid **).`;

      const result = await model.generateContent([prompt, ...fileParts]);
      const response = await result.response;
      let text = response.text();
      
      // 3. IMPROVEMENT: The "Text Polisher"
      // Automatically adds emojis to make it look nicer
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
      <h1>⚡ Legal-Lens Pro ⚡</h1>
      <p>AI-Powered Contract Analysis</p>
      
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
          {loading ? "⏳ ANALYZING..." : `🔍 SCAN FILES`}
        </button>

        <button className="btn-clear" onClick={handleClear}>
          🗑️ RESET
        </button>
      </div>

      {analysis && !loading && (
        // The 'ref' here tells the code "This is where we scroll to"
        <div className="result-box" ref={resultsRef}>
          <h3 className="result-title">📋 DIAGNOSTIC REPORT:</h3>
          <p>{analysis}</p>
          
          <div style={{marginTop: "20px", textAlign: "right", borderTop: "1px solid #444", paddingTop: "15px"}}>
             <button className="btn-download" onClick={handleDownload}>
               💾 SAVE REPORT
             </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;