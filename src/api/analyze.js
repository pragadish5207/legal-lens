export default async function handler(req, res) {
  // 1. Only allow "POST" requests (for security)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { contents } = req.body;
    
    // 2. GET THE SECRET KEY
    // This is hidden on the server, not in the browser!
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("API Key is missing on the server.");
    }

    // 3. THE PRIVATE CONVERSATION
    // We talk to Google from here, so the user never sees the URL with the key
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      }
    );

    const data = await response.json();

    // 4. SEND THE RESULT BACK
    res.status(200).json(data);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: 'Failed to process legal scan' });
  }
}