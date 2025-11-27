import prisma from "../../../lib/prisma";

let prisma;

if (global.prisma) {
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
  global.prisma = prisma;
}

export default prisma;
