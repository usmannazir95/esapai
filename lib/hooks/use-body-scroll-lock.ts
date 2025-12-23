import { useEffect } from "react";

const BODY_SCROLL_LOCK_CLASS = "body-scroll-locked";

/**
 * Locks page scroll by toggling a class on document.body.
 * This avoids inline style mutation while keeping behavior predictable.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const body = document.body;
    if (!body) return;

    if (locked) {
      body.classList.add(BODY_SCROLL_LOCK_CLASS);
    } else {
      body.classList.remove(BODY_SCROLL_LOCK_CLASS);
    }

    return () => {
      body.classList.remove(BODY_SCROLL_LOCK_CLASS);
    };
  }, [locked]);
}













