"use client";

/**
 * MobileDrawerWrapper - Integration component for TELOS v7 mobile navigation
 * 
 * This component wraps the MobileDrawer and provides automatic state management.
 * Use this in layouts or page components that need mobile navigation.
 * 
 * Usage:
 *   import { MobileDrawerWrapper } from "@/components/MobileDrawerWrapper";
 *   
 *   // In your layout or page:
 *   <MobileDrawerWrapper />
 */

import { MobileDrawer, useMobileDrawer } from "./MobileDrawer";

export function MobileDrawerWrapper() {
  const { visible, close, toggle } = useMobileDrawer();

  return (
    <MobileDrawer
      visible={visible}
      onClose={close}
      onToggle={toggle}
    />
  );
}

export { useMobileDrawer } from "./MobileDrawer";
export default MobileDrawerWrapper;
