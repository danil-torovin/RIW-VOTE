export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    console.log("Входящий запрос:", req.body);
    console.log("Body sent to Apps Script:", req.body);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbx9pfucKaK1ROoOhaHztzmmiEq1bRUdw2mFXUIRD7b8zOc6zYWjdf6pS55Z5a5xbhhEIA/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const text = await response.text();
    console.log("Ответ от Apps Script:", text);
    res.status(200).send(text);
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: error.message });
  }
}
