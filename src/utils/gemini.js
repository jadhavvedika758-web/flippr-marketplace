export async function callGemini(prompt) {
  try {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    console.log(import.meta.env.VITE_GEMINI_API_KEY);
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();

    console.log(data);

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "";
  }
}
