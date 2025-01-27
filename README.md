This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

my-nextjs-app/
├── app/
│   ├── dashboard/       # DashboardCard feature
│   │   ├── components/  # DashboardCard-specific components
│   │   │   └── Widget.tsx
│   │   ├── page.tsx     # DashboardCard page
│   │   ├── styles.css   # DashboardCard-specific styles
│   │   └── utils.ts     # DashboardCard-specific utility functions
│   ├── signin/          # Sign-In feature
│   │   ├── components/  # Sign-In-specific components
│   │   │   └── Form.tsx
│   │   ├── page.tsx     # Sign-In page
│   │   └── styles.css   # Sign-In-specific styles
│   ├── layout.tsx       # Global layout
│   ├── globals.css      # Global styles
│   └── favicon.ico      # Favicon
├── components/          # Reusable global components
│   ├── Header.tsx       # Header component
│   ├── Footer.tsx       # Footer component
│   └── ThemeToggle.tsx  # Example: Theme toggle button
├── public/              # Static assets
│   ├── images/          # Images
│   │   └── logo.png
│   └── fonts/           # Custom fonts
│       └── OpenSans.ttf
├── styles/              # Global styles
│   ├── variables.css    # CSS variables
│   ├── mixins.css       # Reusable CSS mixins
│   └── utilities.css    # Utility classes
├── utils/               # Global utility functions
│   ├── fetcher.ts       # Fetch wrapper for API calls
│   ├── constants.ts     # Global constants
│   └── helpers.ts       # Global helper functions
├── middleware.ts        # Middleware for API routes
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
