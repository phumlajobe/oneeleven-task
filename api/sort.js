export default function handler(req, res) {
    // Allow CORS so the frontend can call this API
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed. Use POST." });
    }

    const { data } = req.body;

    if (!data || typeof data !== "string") {
        return res.status(400).json({ error: "Missing or invalid 'data' field. Expected a string." });
    }

    // Convert string to array of characters, sort alphabetically
    const word = data.split("").sort();

    return res.status(200).json({ word });
}