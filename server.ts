import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Discord Webhook
  app.post("/api/contact", async (req, res) => {
    try {
      const { subject, email, message } = req.body;

      if (!subject || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required fields: subject, email, or message." 
        });
      }

      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

      if (!webhookUrl) {
        console.error("DISCORD_WEBHOOK_URL is not defined in environment variables.");
        return res.status(500).json({ 
          success: false, 
          message: "Server configuration error. Please try again later." 
        });
      }

      const discordPayload = {
        embeds: [
          {
            title: "New Contact Form Submission",
            color: 0x00f2ff, // Neon Blue
            fields: [
              { name: "Subject", value: subject, inline: true },
              { name: "Sender Email", value: email, inline: true },
              { name: "Message", value: message },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordPayload),
      });

      if (response.ok) {
        return res.json({ success: true });
      } else {
        const errorText = await response.text();
        console.error("Discord Webhook Error:", errorText);
        return res.status(502).json({ 
          success: false, 
          message: "Failed to send message to Discord." 
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An unexpected error occurred." 
      });
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
