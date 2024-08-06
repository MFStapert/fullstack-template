import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  console.log('Seeding...');

  const post = await prisma.post.create({
    data: {
      id: 1,
      title: 'Post',
      content: 'lorem ipsum',
      published: true,
    },
  });

  console.log({ post });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
