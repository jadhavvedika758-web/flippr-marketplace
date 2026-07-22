export async function callAI(prompt) {
  try {
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      throw new Error(data.error?.message || "OpenRouter Error");
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return "";
  }
}