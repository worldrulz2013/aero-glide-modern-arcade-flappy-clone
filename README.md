# Cloudflare Workers React Template

[![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/worldrulz2013/aero-glide-modern-arcade-flappy-clone)]](https://deploy.workers.cloudflare.com)

A production-ready full-stack starter template for building modern web applications with React on Cloudflare Workers. Features a Vite-powered frontend with Tailwind CSS, shadcn/ui components, API routes powered by Hono, and seamless deployment to Cloudflare.

## ✨ Key Features

- **Full-Stack Ready**: React SPA frontend with Hono-powered API routes on Cloudflare Workers
- **Modern UI**: shadcn/ui components, Tailwind CSS with custom design system, dark mode support
- **Developer Experience**: Hot Module Replacement (HMR), TypeScript end-to-end, TanStack Query for data fetching
- **Performance Optimized**: Vite bundling, Cloudflare Assets for static files, automatic SPA routing
- **Theming & Accessibility**: Built-in theme toggle, responsive design, ARIA-compliant components
- **Production Features**: Error reporting, logging, CORS, health checks
- **Easy Extensibility**: Add routes in `worker/userRoutes.ts`, pages via React Router

## 🛠️ Technology Stack

### Frontend
- **React 18** with React Router DOM
- **Vite** (build tool & dev server)
- **Tailwind CSS** with custom animations & gradients
- **shadcn/ui** (Radix UI primitives + Tailwind)
- **TanStack Query** (data fetching & caching)
- **Zustand** (state management)
- **Sonner** (toasts), **Lucide React** (icons)
- **Framer Motion**, **Recharts** (animations & charts)

### Backend
- **Hono** (ultra-fast web framework)
- **Cloudflare Workers** (serverless runtime)
- **TypeScript** (full type safety with Workers types)

### Development
- **Bun** (package manager & scripts)
- **ESLint** & **TypeScript** (strict mode)
- **Wrangler** (Cloudflare CLI)

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) installed
- [Cloudflare Account](https://dash.cloudflare.com/) & [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install/)
- Optional: Cloudflare API Token for deployment

### Installation
```bash
bun install
```

### Development
```bash
# Start dev server (frontend + worker)
bun dev

# Generates Worker types
bun cf-typegen
```

Open [http://localhost:3000](http://localhost:3000) (or your configured PORT).

### Production Build
```bash
bun build
```

## 📖 Usage

### Frontend Development
- Add pages in `src/pages/`
- Update router in `src/main.tsx`
- Use shadcn/ui components from `src/components/ui/`
- API calls via TanStack Query (auto-typed with Worker env)

### Backend Development
- Add API routes in `worker/userRoutes.ts` (e.g., `app.get('/api/users', ...)`)
- Custom logic integrates with Cloudflare KV/DO/R2 via `env`
- Protected by CORS, logging, error handling

### Error Reporting
Client errors auto-reported to `/api/client-errors`. Customize in `src/lib/errorReporter.ts`.

### Theming
Toggle dark/light mode. Custom CSS vars in `src/index.css`.

## ☁️ Deployment

1. **Configure Wrangler** (optional):
   Edit `wrangler.jsonc` for custom bindings (KV, DO, etc.)

2. **Deploy**:
   ```bash
   bun deploy
   ```
   Deploys Worker + Assets to your Cloudflare account.

3. **Custom Domain** (optional):
   ```bash
   wrangler pages deploy --project-name your-project
   ```

[![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/worldrulz2013/aero-glide-modern-arcade-flappy-clone)]](https://deploy.workers.cloudflare.com)

## 🤝 Contributing

1. Fork & clone
2. `bun install`
3. Make changes
4. `bun lint` & `bun build`
5. PR to `main`

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

Built on [Cloudflare Workers](https://workers.cloudflare.com/), [Vite](https://vitejs.dev/), [shadcn/ui](https://ui.shadcn.com/), [Hono](https://hono.dev/).