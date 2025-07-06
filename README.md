# ArkLab AI Agent Catalog

A comprehensive, responsive web application built with Next.js, TypeScript, and Redux that showcases a catalog of AI agents with advanced filtering, search capabilities, and server-side rendering.

## 🚀 Features

### Core Functionality
- **Server-Side Rendering (SSR)** - Initial data fetching with Next.js `getServerSideProps`
- **Advanced Filtering** - Multiple filter types with real-time updates
- **Search Functionality** - Search by agent name or description
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **State Management** - Redux Toolkit for efficient state handling
- **Animations** - Smooth transitions and micro-interactions with Framer Motion
- **SEO Optimized** - Dynamic meta tags and semantic HTML

### Filter Options
- **Search Bar** - Real-time search by name or description
- **Status Filter** - Multiple selection (Active, Beta, Archived)
- **Category Filter** - Multiple selection by agent category
- **Pricing Model Filter** - Single selection (Free Tier, Subscription, Per-Use)
- **Clear All Filters** - Reset all filters with one click

### UI/UX Features
- **Professional Design** - Clean, modern interface with subtle animations
- **Interactive Cards** - Hover effects and smooth transitions
- **Filter Status Display** - Visual feedback for active filters
- **Loading States** - Elegant loading animations
- **Empty States** - Helpful messaging when no results found
- **Sticky Filters** - Filter panel remains accessible while scrolling

## 🛠️ Technology Stack

- **Framework**: Next.js 13.5.1
- **Language**: TypeScript
- **State Management**: Redux Toolkit + React Redux
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-agent-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main page with SSR
├── components/
│   ├── providers/
│   │   └── ReduxProvider.tsx # Redux store provider
│   ├── AgentCard.tsx        # Individual agent card component
│   ├── AgentGrid.tsx        # Grid layout for agents
│   ├── FilterPanel.tsx      # Filter controls panel
│   └── Header.tsx           # Page header with branding
├── data/
│   └── mock-agents.json     # Mock agent data
├── store/
│   ├── slices/
│   │   └── agentSlice.ts    # Redux slice for agents
│   ├── hooks.ts             # Typed Redux hooks
│   └── store.ts             # Redux store configuration
├── types/
│   └── agent.ts             # TypeScript interfaces
└── components.json          # Shadcn/ui configuration
```

## 🔧 Build & Deploy

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Deploy to Vercel** (Recommended)
   - Connect your GitHub repository to Vercel
   - Auto-deployment will be configured for your main branch

## 🎯 Key Design Decisions

### Server-Side Rendering
- Implemented `getServerSideProps` for initial data fetching
- Added artificial delay to simulate real API calls
- Ensures SEO-friendly content delivery

### State Management
- Used Redux Toolkit for efficient state management
- Centralized filter logic in Redux slice
- Implemented real-time filtering without API calls

### Component Architecture
- Modular component design for maintainability
- Separation of concerns between UI and business logic
- Reusable components with TypeScript interfaces

### Performance Optimization
- Lazy loading animations with staggered delays
- Efficient re-renders with Redux selectors
- Responsive image handling and modern CSS

### User Experience
- Intuitive filter system with visual feedback
- Smooth animations and transitions
- Accessibility-conscious design patterns

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2-column grid)
- **Desktop**: > 1024px (4-column layout with sidebar)

## 🔍 SEO Implementation

- Dynamic meta tags based on applied filters
- Semantic HTML structure
- Proper heading hierarchy
- Open Graph and Twitter Card support
- Search engine friendly URLs

## 🚀 Future Enhancements

- Google OAuth 2.0 integration
- Advanced sorting options
- Pagination for large datasets
- Individual agent detail pages
- Favorites/bookmarking system
- Export functionality

## 📝 License

This project is created for the ArkLab Frontend Developer Intern take-home challenge.

## 🤝 Contributing

This is a take-home challenge project. For questions or clarifications, please refer to the challenge requirements document.