import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return response.status(405).json({ 
      success: false, 
      message: "Method Not Allowed" 
    });
  }

  try {
    const { subject, email, message } = request.body;

    // Validate fields
    if (!subject || !email || !message) {
      return response.status(400).json({ 
        success: false, 
        message: "Missing required fields: subject, email, or message." 
      });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not defined in environment variables.");
      return response.status(500).json({ 
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

    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (discordRes.ok) {
      return response.status(200).json({ success: true });
    } else {
      const errorText = await discordRes.text();
      console.error("Discord Webhook Error:", errorText);
      return response.status(502).json({ 
        success: false, 
        message: "Failed to send message to Discord." 
      });
    }
  } catch (error) {
    console.error("API Error:", error);
    return response.status(500).json({ 
      success: false, 
      message: "An unexpected error occurred." 
    });
  }
}
