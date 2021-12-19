import bcrypt from 'bcrypt';
import { Prisma, PrismaClient, User } from '@prisma/client';
import posts from '../data/posts';

const prisma = new PrismaClient();

async function main() {
  const users: Prisma.UserCreateInput[] = [
    {
      name: 'عبدالصمد الحمداني',
      email: 'abdessamadelhamdany@gmail.com',
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'password', 10),
      role: 'ADMIN',
    },
  ];

  for (const user of users) {
    const exists = await prisma.user.count({
      where: { email: user.email },
    });

    if (exists === 0) {
      await prisma.user.create({
        data: user,
      });
    }
  }

  const categories: Prisma.CategoryCreateInput[] = [
    {
      name: 'العمل على الإنترنت',
      slug: 'العمل-على-الإنترنت',
    },
    {
      name: 'تحسين محركات البحث',
      slug: 'تحسين-محركات-البحث',
    },
    {
      name: 'انشاء المواقع الالكترونية',
      slug: 'انشاء-المواقع-الالكترونية',
    },
    {
      name: 'أخبار تقنية',
      slug: 'أخبار-تقنية',
    },
  ];

  for (const category of categories) {
    const exists = await prisma.category.count({
      where: { slug: category.slug },
    });

    if (exists === 0) {
      await prisma.category.create({
        data: category,
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
