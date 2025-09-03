# Tracksy - Frontend

A comprehensive fitness tracking web application built with Next.js that enables users to track workouts, connect with friends, and participate in fitness challenges.

## Project Overview

Tracksy is a social fitness platform that combines activity tracking with community features. Users can log runs and workouts, connect with friends, join groups, participate in challenges, and track their progress through a gamified system.

## Key Features

- **Activity Tracking**: Log runs and workouts with detailed metrics
- **Social Network**: Connect with friends and view their activities
- **Community Groups**: Join fitness groups and participate in challenges
- **Gamification**: Earn badges, level up, and achieve fitness goals
- **Analytics**: View detailed statistics and progress tracking

## Project Structure

```text
app/                          # Next.js App Router pages
├── activity/                 # Activity tracking pages
│   ├── new/                  # New activity creation
│   │   ├── run/              # Running activity form
│   │   └── workout/          # Workout activity form
│   └── page.tsx              # Activity overview
├── api/                      # API routes
│   ├── auth/                 # Authentication endpoints
│   └── query/                # Data query endpoints
├── community/                # Social features
│   ├── group/[id]/           # Group pages
│   └── network/              # Friend network
├── dashboard/                # User dashboard
├── login/                    # Authentication pages
├── profile/                  # User profile & settings
│   ├── badges/               # User achievements
│   └── goals/                # Goal management
└── stats/                    # Statistics & analytics

app/lib/                      # Shared utilities and data
├── actions.ts                # Server actions
├── constants.ts              # App constants
├── definitions.ts            # TypeScript type definitions
├── utils.ts                  # Utility functions
└── data/                     # Mock data and data access
    ├── badges.ts             # Badge definitions
    ├── challenges.ts         # Challenge data
    ├── exercises.ts          # Exercise database
    ├── friends.ts            # Friend data
    ├── goals.ts              # Goal data
    ├── groups.ts             # Group data
    ├── posts.ts              # Social post data
    ├── runs.ts               # Running activity data
    ├── user.ts               # User profile data
    └── workouts.ts           # Workout data

app/ui/                       # React components
├── activity/                 # Activity-related components
├── community/                # Social feature components
├── dashboard/                # Dashboard components
├── login/                    # Authentication components
├── profile/                  # Profile page components
└── utilities/                # Shared UI components
```

## Technical Architecture

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **PWA**: Progressive Web App capabilities

## Development

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

### Key Directories

- `/app` - Main application code using Next.js App Router
- `/app/lib` - Shared utilities, types, and data access functions
- `/app/ui` - Reusable React components organized by feature
- `/types` - TypeScript type definitions
- `/public` - Static assets and PWA configuration

### Component Organization

Components are organized by feature area (activity, community, profile, etc.) with shared utilities in the utilities folder. Each feature area contains both page components and smaller UI components.

### Data Layer

The application uses a mock data layer located in `/app/lib/data/` for development. Each file contains sample data and helper functions for different features of the application.
