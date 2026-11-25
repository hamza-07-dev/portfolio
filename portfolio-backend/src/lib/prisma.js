const { PrismaClient } = require("@prisma/client");

// Avoid creating multiple Prisma Client instances in dev (nodemon hot reload)
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
