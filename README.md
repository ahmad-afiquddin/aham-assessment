# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Environment variables

Create a new file in the root directory called .env and add these in

```
DATABASE_URL=<YOUR DATABASE CONNECTION STRING>
TOKEN_SECRET=<JWT_TOKEN_SECRET>
TOKEN_EXPIRATION=<JWT LIVE PERIOD>
```

## Database migrations

Since this project is a fullstack app, you will need to run migrations to your database, and generate a prisma client before running the web app

```
# run migrations
npx prisma migrate dev

# generate prisma client
npx prisma generate
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# aham-assessment
