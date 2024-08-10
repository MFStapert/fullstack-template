import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  console.log('Seeding...');

  const post = await prisma.post.createMany({
    data: [
      {
        id: 1,
        title: 'Post',
        content: 'lorem ipsum',
        published: true,
      },
      {
        id: 2,
        title: 'Paper',
        content: 'solor dolem',
        published: true,
      },
      {
        id: 3,
        title: 'Blog',
        content: 'een woord',
        published: true,
      },
    ],
  });

  console.log({ post });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
