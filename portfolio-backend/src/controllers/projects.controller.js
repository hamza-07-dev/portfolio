const prisma = require("../lib/prisma");

// Public — used by the frontend to render the Projects section
async function getAll(req, res) {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  res.json(projects);
}

async function getBySlug(req, res) {
  const project = await prisma.project.findUnique({
    where: { slug: req.params.slug },
  });
  if (!project) return res.status(404).json({ error: "Projet introuvable." });
  res.json(project);
}

// Protected — used by the admin CMS
async function create(req, res) {
  const { title, slug, category, description, stack, highlights, imageUrl, liveUrl, repoUrl, featured, order } = req.body;

  if (!title || !slug || !category || !description) {
    return res.status(400).json({ error: "title, slug, category et description sont requis." });
  }

  const project = await prisma.project.create({
    data: {
      title,
      slug,
      category,
      description,
      stack: stack || [],
      highlights: highlights || [],
      imageUrl,
      liveUrl,
      repoUrl,
      featured: !!featured,
      order: order ?? 0,
    },
  });
  res.status(201).json(project);
}

async function update(req, res) {
  const { id } = req.params;
  const data = { ...req.body };
  delete data.id;

  try {
    const project = await prisma.project.update({ where: { id }, data });
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: "Projet introuvable." });
  }
}

async function remove(req, res) {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: "Projet introuvable." });
  }
}

module.exports = { getAll, getBySlug, create, update, remove };
