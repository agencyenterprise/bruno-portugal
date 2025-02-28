import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: [
          {
            title: 'Check out AE Studio Website',
            content: 'You can check out AE Studio Website at https://ae.studio',
            published: true,
          },
          {
            title: 'Follow AE Studio on Twitter',
            content: 'You can check out AE Studio Twitter at https://twitter.com/AEStudioLA',
            published: true,
          },
          {
            title: 'Follow AE Studio on Instagram',
            content: 'You can check out AE Studio Instagram at https://www.instagram.com/aestudiola',
            published: true,
          },
        ],
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Check out Prisma with Next.js',
            content: 'You can checkout Prisma with Next.js at https://www.prisma.io/nextjs',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'You can checkout Prisma on Twitter at https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'You can follow Nexus on Twitter at https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })
  const john = await prisma.user.upsert({
    where: { email: 'john@prisma.io' },
    update: {},
    create: {
      email: 'john@prisma.io',
      name: 'John',
    },
  })

  console.log({ alice, bob, john })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
