import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Contact Form
  app.post("/api/contact", async (req, res) => {
    const { subject, email, message } = req.body;

    if (!subject || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not set.");
      return res.status(500).json({ error: "Server configuration error." });
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [
            {
              title: `🚀 New Contact Form Submission: ${subject}`,
              color: 0x00f2ff, // Neon Blue
              fields: [
                {
                  name: "📧 Return Path (Email)",
                  value: email,
                  inline: true,
                },
                {
                  name: "🎯 Subject",
                  value: subject,
                  inline: true,
                },
                {
                  name: "📝 Transmission Payload (Message)",
                  value: message,
                },
              ],
              footer: {
                text: "Portfolio Contact System • " + new Date().toLocaleString(),
              },
            },
          ],
        }),
      });

      if (response.ok) {
        return res.status(200).json({ success: true });
      } else {
        const errorData = await response.text();
        console.error("Discord Webhook Error:", errorData);
        return res.status(500).json({ success: false, error: "Failed to send message to Discord." });
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      return res.status(500).json({ success: false, error: "Internal server error." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

