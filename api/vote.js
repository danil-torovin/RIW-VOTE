export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyRGLLI8-uxZ6LqA4JvS1HytOniKZV7HoP8QniGRwIj7r-rx7-nHTaIEmRyjtXG9moEmQ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
