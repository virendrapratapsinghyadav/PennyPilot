import { useState } from "react";

const GEMINI_API_KEY = "Gemini_KEYFROM GOOGLE";

const AIInsights = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const testGemini = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Reply with exactly: Gemini API is working.",
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await res.json();

      console.log("Status:", res.status);
      console.log("Full response:", data);

      if (!res.ok) {
        throw new Error(
          data?.error?.message || "Gemini request failed"
        );
      }

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("Gemini returned no text.");
      }

      setResponse(text);
    } catch (error) {
      console.error("Gemini error:", error);

      setResponse(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Insights</h1>

      <button onClick={testGemini} disabled={loading}>
        {loading ? "Testing..." : "Test Gemini"}
      </button>

      {response && (
        <p>
          {response}
        </p>
      )}
    </div>
  );
};

export default AIInsights;