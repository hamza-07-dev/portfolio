require("dotenv").config();
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans .env avant de seed.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name: "Hamza" },
  });
  console.log(`✅ Admin user ready: ${admin.email}`);

  // Initial skills (edit freely from the admin CMS afterwards)
  const skills = [
    { name: "React", category: "Frontend", level: 90, order: 1 },
    { name: "Node.js / Express", category: "Backend", level: 85, order: 2 },
    { name: "PHP / Laravel", category: "Backend", level: 85, order: 3 },
    { name: "Python", category: "Backend", level: 75, order: 4 },
    { name: "MySQL / PostgreSQL", category: "Data", level: 80, order: 5 },
    { name: "n8n (automation)", category: "Tools", level: 80, order: 6 },
    { name: "Git", category: "Tools", level: 85, order: 7 },
  ];

  for (const skill of skills) {
    const existing = await prisma.skill.findFirst({ where: { name: skill.name } });
    if (!existing) {
      await prisma.skill.create({ data: skill });
    }
  }
  console.log(`✅ ${skills.length} skills seeded (skipping duplicates).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
