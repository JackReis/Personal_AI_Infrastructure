"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Target,
  BarChart3,
  AlertTriangle,
  Lightbulb,
  Users,
  Wallet,
  Settings,
  X,
  Menu,
  Sparkles,
} from "lucide-react";

// TELOS navigation sections for Pulse v7
const mainNavItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/telos" },
  { label: "Goals", icon: Target, href: "/telos/goals" },
  { label: "Metrics", icon: BarChart3, href: "/telos/metrics" },
  { label: "Challenges", icon: AlertTriangle, href: "/telos/challenges" },
  { label: "Strategies", icon: Lightbulb, href: "/telos/strategies" },
  { label: "Team", icon: Users, href: "/telos/team" },
  { label: "Budget", icon: Wallet, href: "/telos/budget" },
];

const bottomNavItems = [
  { label: "Preferences", icon: Settings, href: "/telos/preferences" },
];

interface MobileDrawerProps {
  visible: boolean;
  onClose: () => void;
  onToggle?: () => void;
}

export function MobileDrawer({ visible, onClose, onToggle }: MobileDrawerProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/telos") {
      return pathname === "/telos" || pathname === "/telos/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Hamburger menu button - visible only on mobile */}
      <button
        onClick={onToggle}
        aria-label={visible ? "Close navigation" : "Open navigation"}
        aria-expanded={visible}
        aria-controls="telos-mobile-drawer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          minWidth: "44px",
          minHeight: "44px",
          background: visible ? "var(--bg-2)" : "transparent",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          cursor: "pointer",
          color: visible ? "var(--accent)" : "var(--text-2)",
          transition: "all 200ms ease",
        }}
        className="telos-mobile-trigger"
      >
        {visible ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop overlay */}
      {visible && (
        <div
          className="drawer-backdrop"
          onClick={onClose}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.72)",
            backdropFilter: "blur(4px)",
            zIndex: 90,
            animation: "fadeIn 200ms ease",
          }}
        />
      )}

      {/* Drawer panel */}
      <aside
        id="telos-mobile-drawer"
        className="telos-drawer-panel"
        data-visible={visible ? "true" : "false"}
        aria-hidden={!visible}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "min(320px, 85vw)",
          background: "var(--bg-1)",
          borderRight: "1px solid var(--line)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          gap: "24px",
          transform: visible ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: visible
            ? "4px 0 24px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--line)"
            : "none",
        }}
      >
        {/* Header: brand + close */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'advocate-c14', sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                color: "var(--text)",
                letterSpacing: "0.08em",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Sparkles size={18} style={{ color: "var(--accent)" }} />
              PULSE
            </h1>
            <p
              style={{
                fontFamily: "'concourse-t3', sans-serif",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--text-3)",
                marginTop: "4px",
              }}
            >
              TELOS v7 Dashboard
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-3)",
              borderRadius: "8px",
              flexShrink: 0,
              minWidth: "36px",
              minHeight: "36px",
              transition: "all 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-3)";
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.borderColor = "var(--line-2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--bg-2)";
              e.currentTarget.style.color = "var(--text-3)";
              e.currentTarget.style.borderColor = "var(--line)";
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            overflowY: "auto",
          }}
        >
          {/* Section label */}
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-4)",
              padding: "8px 12px",
              fontWeight: 500,
            }}
          >
            TELOS
          </div>

          {/* Main navigation items */}
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundColor: active ? "var(--bg-2)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-2)",
                  textDecoration: "none",
                  transition: "all 200ms ease",
                  border: active
                    ? "1px solid var(--line-2)"
                    : "1px solid transparent",
                  fontWeight: active ? 500 : 400,
                  fontSize: "14px",
                  minHeight: "48px",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "var(--bg-2)";
                    e.currentTarget.style.color = "var(--text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--text-2)";
                  }
                }}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  size={20}
                  style={{
                    color: active ? "var(--accent)" : "inherit",
                    flexShrink: 0,
                  }}
                />
                <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
                {active && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      boxShadow: "0 0 8px var(--accent)",
                    }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div
            style={{
              borderTop: "1px solid var(--line)",
              margin: "12px 0",
            }}
          />

          {/* Bottom items */}
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundColor: active ? "var(--bg-2)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-2)",
                  textDecoration: "none",
                  transition: "all 200ms ease",
                  border: active
                    ? "1px solid var(--line-2)"
                    : "1px solid transparent",
                  fontWeight: active ? 500 : 400,
                  fontSize: "14px",
                  minHeight: "48px",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "var(--bg-2)";
                    e.currentTarget.style.color = "var(--text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--text-2)";
                  }
                }}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  size={20}
                  style={{
                    color: active ? "var(--accent)" : "inherit",
                    flexShrink: 0,
                  }}
                />
                <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Version info */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: "16px",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "var(--text-4)",
              textAlign: "center",
              letterSpacing: "0.05em",
            }}
          >
            TELOS v7 • PAI Observatory
          </div>
        </div>
      </aside>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Ensure proper touch targets on mobile */
        @media (pointer: coarse) {
          .telos-mobile-trigger {
            min-height: 44px !important;
            min-width: 44px !important;
          }
        }

        /* Hide trigger on desktop */
        @media (min-width: 768px) {
          .telos-mobile-trigger {
            display: none !important;
          }
        }

        /* Scrollbar styling for drawer nav */
        .telos-drawer-panel nav::-webkit-scrollbar {
          width: 4px;
        }

        .telos-drawer-panel nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .telos-drawer-panel nav::-webkit-scrollbar-thumb {
          background: var(--line-2);
          border-radius: 2px;
        }
      `}</style>
    </>
  );
}

// Hook for managing drawer state
export function useMobileDrawer() {
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);
  const toggle = () => setVisible((v) => !v);

  return {
    visible,
    open,
    close,
    toggle,
  };
}

export default MobileDrawer;
