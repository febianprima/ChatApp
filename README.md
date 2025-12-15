# ChatApp

A React Native chat application built with a focus on clean architecture, minimal dependencies, and native-first component design.

> **Built in 4 days with vibe coding** 🎵 — See [Development Story](#development-story) below.

## Features

- **Chat List** - View all contacts with their last message preview
- **Chat Room** - Real-time messaging interface with animated message bubbles
- **User Profiles** - View and interact with user contact details
- **Block/Unblock Users** - Manage blocked contacts with persistent storage
- **User Switching** - Switch between different user accounts for testing
- **Skeleton Loading** - Smooth loading states throughout the app
- **Snackbar Notifications** - Non-intrusive feedback for user actions
- **Animated Tab Bar** - Smooth hide/show animation when navigating

## Architecture

### Project Structure

```
src/
├── chat/                    # Chat feature module
│   ├── components/          # Chat-specific UI components
│   ├── hooks/               # Custom hooks for chat logic
│   ├── navigation/          # Chat stack navigator
│   ├── queries/             # React Query hooks for data fetching
│   ├── screens/             # Chat screens
│   ├── store/               # Zustand store for chat state
│   ├── utils/               # Chat utilities
│   └── index.d.ts           # Chat type definitions
├── global/                  # Shared/global module
│   ├── components/          # Reusable UI components
│   ├── config/              # App configuration (QueryClient)
│   ├── constants/           # Colors, API, navigation constants
│   ├── hooks/               # Shared custom hooks
│   ├── navigation/          # Bottom tab navigator
│   ├── store/               # Global state (auth, snackbar)
│   ├── utils/               # Shared utilities
│   └── index.d.ts           # Global type definitions
├── settings/                # Settings feature module
│   ├── navigation/          # Settings stack navigator
│   └── screens/             # Settings screens
└── mocks/                   # Mock data for testing
```

### Design Principles

#### 1. Feature-Based Module Structure

The codebase is organized by feature (`chat`, `settings`) rather than by type. Each feature module is self-contained with its own components, screens, hooks, and state management. The `global` module contains shared code used across features.

#### 2. TypeScript Namespaces for Type Organization

Types are organized using TypeScript namespaces (`chat`, `global`) defined in `index.d.ts` files. This approach:

- Keeps related types grouped together
- Avoids import/export boilerplate for types
- Provides clear ownership of types per module

#### 3. Named Exports Over Default Exports

All exports use named exports (`export function`, `export const`) rather than default exports. This provides:

- Better debugging (preserved function names in stack traces)
- Easier refactoring (find-and-replace works reliably)
- Consistent import style across the codebase

#### 4. Index Files for Clean Imports

Each folder has an `index.ts` that re-exports its contents, enabling clean imports:

```typescript
// Instead of
import { useGetUser } from '../queries/useGetUser';
import { useGetUsers } from '../queries/useGetUsers';

// We can write
import { useGetUser, useGetUsers } from '../queries';
```

### State Management

#### Zustand

We use [Zustand](https://github.com/pmndrs/zustand) for state management because:

- **Minimal boilerplate** - No providers, reducers, or action creators
- **TypeScript-first** - Excellent type inference
- **Persist middleware** - Easy AsyncStorage integration for data persistence
- **Selective subscriptions** - Components only re-render when their selected state changes

**Stores:**

- `useGlobalStore` - Authentication state (userId)
- `useChatStore` - Chat state (selected contact, blocked users, sent messages)
- `useSnackbarStore` - Snackbar visibility and message

#### React Query

[TanStack React Query](https://tanstack.com/query) handles server state:

- **Caching** - Automatic request deduplication and caching
- **Background updates** - Data stays fresh without manual refetching
- **Optimistic updates** - Immediate UI feedback for mutations
- **Infinite queries** - Built-in pagination support for user lists

### Why Built-in Components Over Libraries

We intentionally built custom components instead of using third-party UI libraries:

| Component          | Why Custom                                                             |
| ------------------ | ---------------------------------------------------------------------- |
| **AnimatedTabBar** | Full control over hide/show animation timing and behavior              |
| **BottomSheet**    | Lightweight implementation with PanResponder for drag-to-close         |
| **Snackbar**       | Simple toast notifications without heavy dependencies                  |
| **Shimmer**        | Minimal skeleton loading using Animated API                            |
| **Touchable**      | Platform-specific touch feedback (Ripple on Android, Highlight on iOS) |

**Benefits:**

- **Smaller bundle size** - No unused features from large UI libraries
- **Full customization** - Every aspect can be modified to match design requirements
- **Learning opportunity** - Better understanding of React Native's Animated API
- **No breaking changes** - No dependency updates to worry about

### Animation Strategy

All animations use React Native's built-in `Animated` API with `useNativeDriver: true` for 60fps performance:

- **Tab bar** - Slide + fade when navigating to nested screens
- **Chat bubbles** - Slide-in from left/right with scale effect for new messages
- **Bottom sheet** - Spring animation with drag gesture support
- **Snackbar** - Fade + slide from top

## Tech Stack

| Category         | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | React Native 0.83                   |
| Language         | TypeScript 5.8                      |
| Navigation       | React Navigation 7                  |
| State Management | Zustand 5                           |
| Server State     | TanStack React Query 5              |
| Storage          | AsyncStorage                        |
| Testing          | Jest + React Native Testing Library |
| Code Quality     | ESLint + Prettier + Husky           |

## Getting Started

### Prerequisites

- Node.js >= 20
- Yarn
- Xcode (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ChatApp
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **iOS Setup**

   ```bash
   yarn ios:install
   ```

4. **Configure environment**

   Create a `.env` file in the project root:

   ```env
   BASE_URL=https://api.example.com
   ```

### Running the App

**Start Metro bundler:**

```bash
yarn start
```

**Run on iOS:**

```bash
yarn ios
```

**Run on Android:**

```bash
yarn android
```

### Development Scripts

| Script           | Description                              |
| ---------------- | ---------------------------------------- |
| `yarn start`     | Start Metro bundler                      |
| `yarn ios`       | Run on iOS simulator                     |
| `yarn android`   | Run on Android emulator                  |
| `yarn test`      | Run Jest tests                           |
| `yarn lint`      | Run ESLint                               |
| `yarn lint:fix`  | Fix ESLint issues                        |
| `yarn format`    | Format code with Prettier                |
| `yarn typecheck` | Run TypeScript compiler check            |
| `yarn validate`  | Run all checks (format, lint, typecheck) |

### Version Management

```bash
yarn version:patch  # 1.0.0 → 1.0.1
yarn version:minor  # 1.0.0 → 1.1.0
yarn version:major  # 1.0.0 → 2.0.0
```

Version is automatically synced to iOS and Android native projects.

## Testing

```bash
# Run all tests
yarn test

# Run tests for changed files only
yarn test:affected

# Run tests in watch mode
yarn test --watch
```

## Project Configuration

### Prettier

Configured with `@trivago/prettier-plugin-sort-imports` for automatic import sorting:

1. Third-party modules
2. Global shared modules (`**/global/**`)
3. Relative parent imports (`../`)
4. Relative sibling imports (`./`)

### Husky + lint-staged

Pre-commit hooks automatically:

- Format staged files with Prettier
- Fix ESLint issues
- Prevent commits with linting errors

## Development Story

### Built in 4 Days with Vibe Coding 🎵

This entire application was built in just **4 days** using a collaborative approach between human creativity and AI assistance — what's often called "vibe coding."

#### What is Vibe Coding?

Vibe coding is a development approach where you:

- **Focus on the "what" and "why"** — describing features, architecture decisions, and desired outcomes
- **Let AI handle the "how"** — implementation details, boilerplate, and repetitive patterns
- **Iterate through conversation** — refining and improving through natural dialogue

#### The Process

**Day 1: Foundation**

- Set up React Native project with TypeScript
- Configured navigation structure (Bottom Tabs + Stack Navigators)
- Implemented basic screens and data fetching with React Query

**Day 2: Core Features**

- Built chat list with skeleton loading
- Implemented chat room with message bubbles
- Created animated tab bar with hide/show behavior
- Added user profile screen with contact actions

**Day 3: Polish & UX**

- Implemented block/unblock functionality
- Created draggable bottom sheet component
- Added snackbar notifications
- Built user switching for testing
- Persisted data with AsyncStorage

**Day 4: Refinement**

- Standardized code patterns (named exports, function declarations)
- Cleaned up colors and constants
- Wrote comprehensive tests
- Created documentation

#### Key Takeaways

1. **Speed without sacrificing quality** — AI assistance allowed rapid implementation while maintaining clean architecture and best practices.

2. **Human decisions, AI execution** — Every architectural decision (module structure, state management choice, custom vs library components) was a human choice. AI helped execute those decisions consistently.

3. **Iterative refinement** — The conversation-based workflow made it easy to refine details: "make the snackbar a centered pill" or "rename colors based on their role."

4. **Learning accelerator** — Building custom components (animations, gestures, persistence) provided deeper understanding of React Native internals than using pre-built libraries.

#### Tools Used

- **[Cursor](https://cursor.sh)** — AI-powered code editor
- **Claude** — AI assistant for pair programming

---

_This project demonstrates that with the right tools and approach, a single developer can build a polished, production-quality mobile app in under a week._

## License

Private - All rights reserved
