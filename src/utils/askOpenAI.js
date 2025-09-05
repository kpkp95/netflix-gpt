// src/askOpenAI.js
export async function askOpenAI(userPrompt) {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: "You are a movie recommendation assistant.",
        },
        { role: "user", content: userPrompt },
      ],
      // model: "gpt-4o-mini", // optional override
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "OpenAI request failed");
  }

  const data = await res.json();
  // Chat Completions shape
  return data?.choices?.[0]?.message?.content ?? "";
}
