# NextJS Post App

A modern blog application built with Next.js 15, following Feature-Sliced Design architecture.

## ✨ Features

- **📚 Post Management**: View, create, edit, and delete blog posts
- **💾 Save Posts**: Save your favorite posts locally
- **🔄 Real-time Updates**: Automatic revalidation every 30 seconds
- **⚡ Fast Performance**: Server-side rendering with caching

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: HeroUI (NextUI v2)
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS
- **API**: JSONPlaceholder (fake JSON API)

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/OleksandrRusinka/nextjs-app.git
cd nextjs-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

2. **Start development server**

```bash
npm run dev
# or
yarn dev
```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack

## 🔧 Key Features Explained

### Caching Strategy

- **Main page**: Cached with 30-second revalidation
- **Post pages**: Static generation with 30-second revalidation
- **API calls**: 30-second stale time with React Query

### State Management

- **Zustand**: Global state for saved posts with localStorage persistence
- **React Query**: Server state management with caching

### Form Validation

- **React Hook Form**: Form handling with validation
- **Minimum requirements**: Title (5+ chars), Content (20+ chars)

## 📂 API Integration

Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for:

- Fetching posts (`GET /posts`)
- Individual post details (`GET /posts/:id`)
- User-created posts are stored locally

## 🎨 UI Components

Built with HeroUI components:

- Cards, Buttons, Modals
- Form inputs with validation
- Pagination and navigation
- Responsive design system

## 📱 Pages

- **Home** (`/`) - List of all posts with pagination and search
- **Post Detail** (`/posts/[slug]`) - Individual post view with actions
- **Saved Posts** (`/saved`) - User's saved posts with CRUD operations

## 🏗️ Architecture

This project follows **Feature-Sliced Design** (FSD) architecture:

```
src/app/(client)/
├── (app)/              # App layer - routing and pages
├── modules/            # Business logic modules
├── widgets/            # Self-contained UI widgets
├── features/           # Reusable feature components
├── entities/           # Business entities (models, API)
└── shared/             # Shared utilities and UI components
```

### Key Implementation Details

- **Server-Side Rendering**: Pages are cached with 30-second revalidation
- **Data Fetching**: TanStack Query with prefetching on server
- **State Management**: Zustand for client-side state with persistence
- **Forms**: React Hook Form with validation
- **API Integration**: JSONPlaceholder for demo data + local storage for user posts

## ✅ Completed Implementation

✓ **Feature-Sliced Design Architecture** - Clean, scalable folder structure  
✓ **TanStack Query Integration** - Server-side prefetching with 30s revalidation  
✓ **Zustand State Management** - Persistent store for saved posts  
✓ **React Hook Form** - Validated forms for post creation/editing  
✓ **Hero UI Components** - Modern, responsive design  
✓ **CRUD Operations** - Create, read, update, delete posts  
✓ **Server-Side Caching** - Optimized performance with Next.js caching  
✓ **JSONPlaceholder API** - External data source integration  
✓ **User Post Management** - Local storage for user-created content
