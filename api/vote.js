export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("📩 Входящий запрос:", req.body);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyRGLLI8-uxZ6LqA4JvS1HytOniKZV7HoP8QniGRwIj7r-rx7-nHTaIEmRyjtXG9moEmQ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nominees: req.body.nominees,
          category: req.body.category,
          ip: req.body.ip || "0.0.0.0"
        }),
      }
    );

    const text = await response.text();
    console.log("✅ Ответ от Apps Script:", text);

    // Пробуем распарсить ответ от Apps Script
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { result: "error", message: "Невалидный ответ от Apps Script" };
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("❌ Ошибка:", error);
    res.status(500).json({ result: "error", message: error.message });
  }
}
