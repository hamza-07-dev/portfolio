const prisma = require("../lib/prisma");

async function getAll(req, res) {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  res.json(skills);
}

async function create(req, res) {
  const { name, category, level, order } = req.body;
  if (!name || !category || level === undefined) {
    return res.status(400).json({ error: "name, category et level sont requis." });
  }
  const skill = await prisma.skill.create({
    data: { name, category, level, order: order ?? 0 },
  });
  res.status(201).json(skill);
}

async function update(req, res) {
  const { id } = req.params;
  const data = { ...req.body };
  delete data.id;
  try {
    const skill = await prisma.skill.update({ where: { id }, data });
    res.json(skill);
  } catch (err) {
    res.status(404).json({ error: "Compétence introuvable." });
  }
}

async function remove(req, res) {
  const { id } = req.params;
  try {
    await prisma.skill.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: "Compétence introuvable." });
  }
}

module.exports = { getAll, create, update, remove };
