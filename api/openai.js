// api/openai.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { messages, model = "gpt-4o-mini" } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, messages }),
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
