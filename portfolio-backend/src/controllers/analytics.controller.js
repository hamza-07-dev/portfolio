const prisma = require("../lib/prisma");

// Public — the frontend calls this on page views / key interactions
async function track(req, res) {
  const { type, path, meta } = req.body;

  if (!type) {
    return res.status(400).json({ error: "type est requis (page_view, project_view, cta_click)." });
  }

  await prisma.analyticsEvent.create({
    data: {
      type,
      path,
      meta: meta ? JSON.stringify(meta) : null,
    },
  });

  res.status(201).json({ success: true });
}

// Protected — admin dashboard summary
async function summary(req, res) {
  const since30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [totalViews, viewsLast30d, newMessages, totalMessages, topProjectsRaw] =
    await Promise.all([
      prisma.analyticsEvent.count({ where: { type: "page_view" } }),
      prisma.analyticsEvent.count({
        where: { type: "page_view", createdAt: { gte: since30d } },
      }),
      prisma.contactMessage.count({ where: { status: "new" } }),
      prisma.contactMessage.count(),
      prisma.analyticsEvent.groupBy({
        by: ["path"],
        where: { type: "project_view" },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 5,
      }),
    ]);

  res.json({
    totalViews,
    viewsLast30d,
    newMessages,
    totalMessages,
    topProjects: topProjectsRaw.map((p) => ({
      path: p.path,
      views: p._count.path,
    })),
  });
}

module.exports = { track, summary };
