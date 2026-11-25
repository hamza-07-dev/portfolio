const prisma = require("../lib/prisma");
const { triggerContactWorkflow } = require("../services/n8nWebhook");

// Public — the portfolio's contact form posts here
async function create(req, res) {
  const { name, email, projectType, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email et message sont requis." });
  }

  const contactMessage = await prisma.contactMessage.create({
    data: { name, email, projectType, message },
  });

  // Fire-and-forget: don't block the response on the automation call
  triggerContactWorkflow({
    id: contactMessage.id,
    name,
    email,
    projectType,
    message,
    createdAt: contactMessage.createdAt,
  });

  res.status(201).json({ success: true, id: contactMessage.id });
}

// Protected — admin inbox
async function getAll(req, res) {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(messages);
}

async function updateStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  if (!["new", "read", "replied"].includes(status)) {
    return res.status(400).json({ error: "status doit être new, read ou replied." });
  }

  try {
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: "Message introuvable." });
  }
}

module.exports = { create, getAll, updateStatus };
