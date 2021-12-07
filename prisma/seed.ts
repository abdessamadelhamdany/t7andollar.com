import { PrismaClient } from '@prisma/client';
import posts from '../data/posts';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@gmail.com',
      role: 'ADMIN',
    },
  });

  await prisma.post.createMany({
    data: posts,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
