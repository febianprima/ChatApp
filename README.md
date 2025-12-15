# ChatApp

A React Native chat application demonstrating micro frontend architecture patterns in a monolith repository, with intentional UX design decisions for mobile ergonomics.

> **Built in 4 days with vibe coding** 🎵 — See [Development Story](#development-story) below.

## Features

- **Chat List** - Contact list with last message preview and skeleton loading
- **Chat Room** - Messaging interface with animated bubbles and date grouping
- **User Profiles** - Contact details with actionable items
- **Block/Unblock** - Persistent user blocking with snackbar feedback
- **User Switching** - Switch accounts for testing multi-user scenarios
- **Animated Transitions** - Smooth state masking and micro-interactions

## Architecture

### Micro Frontend in Monolith

This project simulates a **micro frontend approach within a monolith repository**. The goal is to structure code in a way that:

- **Reduces friction between engineers** — Clear module boundaries mean teams can work on `chat`, `settings`, or `global` independently without stepping on each other's toes
- **Enables product-focused development** — Each feature module (`chat/`, `settings/`) is self-contained with its own screens, components, hooks, and state, making it easy to reason about a single product area
- **Scales naturally** — New features become new modules, not additions to a growing monolithic structure

**Further Reading:**

- [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html) — Martin Fowler's comprehensive guide to micro frontend architecture
- [Architecture Patterns That Support Team Ownership](https://palospublishing.com/architecture-patterns-that-support-team-ownership/) — How architectural patterns enable team autonomy
- [Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law) — Why system structure mirrors team structure

```
src/
├── chat/                    # Chat feature module (owned by Chat team)
│   ├── components/          # Chat-specific UI components
│   ├── hooks/               # Chat business logic
│   ├── navigation/          # Chat stack navigator
│   ├── queries/             # Data fetching for chat
│   ├── screens/             # Chat screens
│   ├── store/               # Chat state (Zustand)
│   └── index.d.ts           # Chat types
│
├── settings/                # Settings feature module (owned by Settings team)
│   ├── navigation/          # Settings stack navigator
│   └── screens/             # Settings screens
│
├── global/                  # Shared module (owned by Platform team)
│   ├── components/          # Design system components
│   ├── constants/           # Colors, API config
│   ├── hooks/               # Shared hooks
│   ├── navigation/          # Root navigation
│   ├── store/               # Global state
│   └── index.d.ts           # Global types
│
└── mocks/                   # API mocks
```

Each module can be thought of as a "mini app" that could theoretically be extracted into its own package if the team grows large enough.

### Code Conventions

| Convention                | Rationale                                                                   |
| ------------------------- | --------------------------------------------------------------------------- |
| **Named exports**         | Better debugging (preserved names in stack traces), reliable refactoring    |
| **TypeScript namespaces** | Types grouped by module (`chat.Post`, `global.User`), no import boilerplate |
| **Index re-exports**      | Clean imports: `import { useGetUser } from '../queries'`                    |
| **Function declarations** | Consistent style, hoisting benefits, better stack traces                    |

## Design System

### UX Philosophy

Every design decision is intentional, optimized for mobile ergonomics and user attention.

#### Snackbar Positioning (Top)

The snackbar appears at the **top of the screen** because:

- **Within natural vision area** — Users' eyes are typically focused on the upper portion of the screen while reading content
- **Doesn't obscure actions** — Interactive elements (buttons, inputs) are typically at the bottom; top placement avoids blocking user actions
- **Consistent with system patterns** — iOS notification banners and Android heads-up notifications appear at the top

**Further Reading:**

- [The Role of Visual Hierarchy in UX](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/) — Nielsen Norman Group on attention flow

#### Action Placement (Right Side, Top-to-Bottom)

Interactive elements are positioned on the **right side** of the screen:

- **Thumb reach zone** — Most users hold phones in their right hand; right-side actions are within natural thumb arc
- **Top-to-bottom flow** — Primary actions at the top (menu button, back button), secondary actions below
- **Reduced hand movement** — Users don't need to stretch across the screen for common actions

**Further Reading:**

- [How Do Users Really Hold Mobile Devices?](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php) — Steven Hoober's research on phone grip patterns
- [Designing for Thumb Zone](https://www.smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/) — Smashing Magazine on mobile ergonomics

#### Alert Style (Native Glass Effect)

We use React Native's built-in `Alert.alert()` instead of custom modals:

- **iOS glass blur effect** — Native alerts use iOS's frosted glass aesthetic, blending with the system design language
- **Platform consistency** — Users expect system dialogs for destructive actions (blocking users)
- **Accessibility built-in** — Native alerts work with VoiceOver/TalkBack out of the box

**Further Reading:**

- [iOS Human Interface Guidelines: Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts) — Apple's official guidance on alert usage
- [Material Design: Dialogs](https://m3.material.io/components/dialogs) — Google's dialog component guidelines

#### Animation Strategy (State Masking)

Animations aren't just decorative — they **mask perceived latency**:

| Animation                | Purpose                                             |
| ------------------------ | --------------------------------------------------- |
| **Skeleton shimmer**     | Masks data loading, prevents layout shift           |
| **Tab bar slide**        | Smooth transition when navigating to nested screens |
| **Chat bubble slide-in** | Draws attention to new messages, masks render delay |
| **Bottom sheet spring**  | Natural feel for modal interactions                 |
| **Snackbar fade**        | Non-jarring notification appearance                 |

All animations use `useNativeDriver: true` for 60fps performance on the UI thread.

**Further Reading:**

- [The Psychology of Waiting](https://www.nngroup.com/articles/progress-indicators/) — Nielsen Norman Group on perceived wait times
- [Skeleton Screens: Improve UX with Placeholder UI](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a) — How skeleton screens improve perceived performance
- [Animation and Motion Design](https://m3.material.io/styles/motion/overview) — Material Design motion principles

### Why Custom Components

We built custom UI components instead of using libraries like `react-native-paper` or `native-base`:

| Component          | Why Custom                                                       |
| ------------------ | ---------------------------------------------------------------- |
| **Touchable**      | Platform-specific feedback (Ripple on Android, Highlight on iOS) |
| **BottomSheet**    | Lightweight drag-to-close with PanResponder                      |
| **Snackbar**       | Simple, positioned at top, no dependencies                       |
| **Shimmer**        | Minimal skeleton loading with Animated API                       |
| **AnimatedTabBar** | Precise control over hide/show timing                            |

**Benefits:**

- Smaller bundle size (no unused features)
- Full customization control
- No breaking changes from dependency updates
- Deeper understanding of React Native internals

**Further Reading:**

- [Build vs Buy: Software Components](https://martinfowler.com/articles/build-buy.html) — When to build custom vs use libraries
- [The Hidden Costs of UI Component Libraries](https://blog.bitsrc.io/the-hidden-costs-of-using-component-libraries-bfd3b36e3b3c) — Trade-offs of third-party UI dependencies

## State Management

### Client State (Zustand)

Lightweight, TypeScript-first state management:

```typescript
// Simple, no boilerplate
const { userId } = useGlobalStore();
const { blockUser } = useChatStore();
```

**Stores:**

- `useGlobalStore` — Auth state (userId)
- `useChatStore` — Chat state (selected contact, blocked users, sent messages)
- `useSnackbarStore` — Notification state

**Further Reading:**

- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction) — Official Zustand guide
- [Why Zustand](https://blog.logrocket.com/zustand-vs-redux/) — Comparison with Redux and other state managers

### Server State (React Query)

Data fetching with automatic caching and background updates:

- **Deduplication** — Multiple components requesting same data = single request
- **Stale-while-revalidate** — Show cached data immediately, refresh in background
- **Optimistic updates** — Immediate UI feedback for mutations

**Further Reading:**

- [Practical React Query](https://tkdodo.eu/blog/practical-react-query) — TkDodo's comprehensive React Query guide
- [Client State vs Server State](https://tanstack.com/query/latest/docs/framework/react/overview) — Why server state needs different treatment

## Tech Stack

| Category     | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | React Native 0.83                   |
| Language     | TypeScript 5.8                      |
| Navigation   | React Navigation 7                  |
| Client State | Zustand 5                           |
| Server State | TanStack React Query 5              |
| Persistence  | AsyncStorage                        |
| Testing      | Jest + React Native Testing Library |
| Code Quality | ESLint + Prettier + Husky           |

## Getting Started

### Prerequisites

- Node.js >= 20
- Yarn
- Xcode (iOS) / Android Studio (Android)
- CocoaPods (iOS)

### Installation

```bash
# Clone and install
git clone <repository-url>
cd ChatApp
yarn install

# iOS setup
yarn ios:install

# Configure environment
echo "BASE_URL=https://api.example.com" > .env
```

### Running

```bash
yarn start     # Start Metro
yarn ios       # Run on iOS
yarn android   # Run on Android
```

### Scripts

| Script               | Description                          |
| -------------------- | ------------------------------------ |
| `yarn test`          | Run all tests                        |
| `yarn lint`          | Run ESLint                           |
| `yarn typecheck`     | TypeScript check                     |
| `yarn validate`      | All checks (format, lint, typecheck) |
| `yarn version:patch` | Bump patch version (1.0.0 → 1.0.1)   |

## Testing

```bash
yarn test                    # All tests
yarn test tests/flows        # E2E flow tests only
yarn test --watch            # Watch mode
```

**Test structure:**

- `tests/` — Root level tests and E2E flows
- `src/**/tests/` — Unit tests co-located with modules

## Development Story

### Built in 4 Days with Vibe Coding 🎵

This app was built in **4 days** using AI-assisted development:

| Day   | Focus                                              |
| ----- | -------------------------------------------------- |
| **1** | Project setup, navigation, data fetching           |
| **2** | Chat list, chat room, animated tab bar             |
| **3** | Block/unblock, bottom sheet, snackbar, persistence |
| **4** | Code cleanup, testing, documentation               |

#### What is Vibe Coding?

A development approach where:

- **Human decides the "what" and "why"** — Architecture, UX decisions, feature scope
- **AI handles the "how"** — Implementation, boilerplate, repetitive patterns
- **Iterate through conversation** — "Make the snackbar a centered pill", "Rename colors by role"

**Further Reading:**

- [Vibe Coding](https://en.wikipedia.org/wiki/Vibe_coding) — Overview of AI-assisted development
- [AI Pair Programming](https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/) — GitHub's research on AI coding assistants

#### Tools

- **[Cursor](https://cursor.sh)** — AI-powered code editor
- **[Claude](https://anthropic.com/claude)** — AI pair programmer

---

_This project demonstrates that a single developer with the right tools can build a polished mobile app in under a week._

## License

Private - All rights reserved
