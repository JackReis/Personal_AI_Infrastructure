# MobileDrawer Component for PAI Pulse TELOS v7

A mobile navigation drawer component styled for Pulse's dark navy theme, mirroring the functionality of the dispatcher OS mobile drawer.

## Features

- **Backdrop overlay** with blur effect
- **Slide-in drawer panel** with smooth animations
- **Hamburger menu button** with 44px touch targets
- **TELOS section navigation**: Overview, Goals, Metrics, Challenges, Strategies, Team, Budget, Preferences
- **Active state indicators** with accent color glow
- **Proper touch targets** (min 44px for accessibility)
- **CSS custom properties** integration with Pulse theme variables

## Installation

The component is already located at:
```
~/pai-sandbox/PAI-repo/Releases/v5.0.0/.claude/PAI/PULSE/Observability/src/components/MobileDrawer.tsx
```

## Usage

### Basic Usage with Hook

```tsx
"use client";

import { MobileDrawer, useMobileDrawer } from "@/components/MobileDrawer";

function MyComponent() {
  const { visible, open, close, toggle } = useMobileDrawer();

  return (
    <>
      <button onClick={toggle}>Open Menu</button>
      <MobileDrawer visible={visible} onClose={close} onToggle={toggle} />
    </>
  );
}
```

### Using the Wrapper Component

```tsx
import { MobileDrawerWrapper } from "@/components/MobileDrawerWrapper";

// In your layout or page:
<MobileDrawerWrapper />
```

### Manual Integration in Layout

```tsx
// In your layout.tsx or a specific page layout
"use client";

import { MobileDrawer, useMobileDrawer } from "@/components/MobileDrawer";

export default function TelosLayout({ children }) {
  const { visible, close, toggle } = useMobileDrawer();

  return (
    <div>
      <header>
        {/* Your header content */}
        <MobileDrawer visible={visible} onClose={close} onToggle={toggle} />
      </header>
      <main>{children}</main>
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Controls drawer visibility |
| `onClose` | `() => void` | Callback when drawer should close |
| `onToggle` | `() => void` | Callback for hamburger button toggle |

## Theme Variables

The component uses Pulse's CSS custom properties:

- `--bg`: Background color
- `--bg-1`: Drawer panel background
- `--bg-2`: Active/hover state background
- `--bg-3`: Hover accent background
- `--line`: Border color
- `--line-2`: Accent border color
- `--text`: Primary text color
- `--text-2`: Secondary text color
- `--text-3`: Muted text color
- `--text-4`: Very muted text color
- `--accent`: Accent color (sky blue)

## Navigation Items

The drawer includes these TELOS sections:

1. **Overview** (`/telos`) - Dashboard view
2. **Goals** (`/telos/goals`) - Mission goals
3. **Metrics** (`/telos/metrics`) - Performance metrics
4. **Challenges** (`/telos/challenges`) - Current challenges
5. **Strategies** (`/telos/strategies`) - Active strategies
6. **Team** (`/telos/team`) - Team members
7. **Budget** (`/telos/budget`) - Budget tracking
8. **Preferences** (`/telos/preferences`) - User preferences

## Accessibility

- ARIA attributes: `aria-expanded`, `aria-controls`, `aria-hidden`, `aria-label`, `aria-current`
- 44px minimum touch targets for mobile
- Keyboard navigable
- Screen reader friendly
- Reduced motion support (via CSS)

## Files

- `MobileDrawer.tsx` - Main component
- `MobileDrawerWrapper.tsx` - Convenience wrapper with built-in state
- `index.ts` - Export barrel file
