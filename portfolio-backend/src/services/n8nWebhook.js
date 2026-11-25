const axios = require("axios");

/**
 * Sends the contact message payload to the n8n webhook so the automation
 * workflow (validation → notification → Google Sheet backup) can run.
 * Never throws: a failure here should not block saving the message.
 */
async function triggerContactWorkflow(payload) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) {
    console.warn("[n8nWebhook] N8N_WEBHOOK_URL non configurée — envoi ignoré.");
    return { skipped: true };
  }

  try {
    await axios.post(url, payload, { timeout: 5000 });
    return { sent: true };
  } catch (err) {
    console.error("[n8nWebhook] Échec de l'envoi vers n8n:", err.message);
    return { sent: false, error: err.message };
  }
}

module.exports = { triggerContactWorkflow };
