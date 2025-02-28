This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It uses [Prisma](https://www.prisma.io/) for Object-relational mapping.
[OpenAI](https://platform.openai.com/docs/api-reference/chat) will be used to generate post drafts.

## Tasks

- As a user, I want to be able to see the Authors of each post.
- As a user, when I create a new post, I want to be able to select the Author from a list of existing Authors in the database, right now the options are hard-coded.
- As a user, I want to be able to input a list of comma-separated keywords and get a post draft from ChatGPT. I want to be able to review the draft before submitting it as a new post.

## Getting Started

Install dependencies

```
npm install
```

Create a `.env` file in the root of the project:

```
cp .env.example .env
```

Add the OpenAI API key to the `.env` file:

```
OPENAI_API_KEY=sk-...
```

Then, initialize the database:

```bash
docker-compose up -d
```

Run the migrations:

```bash
npm run migrate
```

Seed the database:

```bash
npm run seed
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Database

If you make changes to the database schema you can run the migrations with:

```
npm run migrate
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/docs/concepts) - learn about Prisma features and API.
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference/chat) - learn about OpenAI API.
