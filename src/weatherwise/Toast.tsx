'use client';
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export const TOAST_DURATION_MS = 5000;
const GAP = 10;

type Props = {
  children: ReactNode;
  onDismiss: () => void;
  className?: string;
  onClick?: () => void;
  /** Selector of a control the toast must never cover (e.g. the onboarding Continue button). */
  avoid?: string;
};

/** Status pop-up that dismisses itself after about 5 seconds. Render with `key={message}` so a new message restarts the timer. */
export default function Toast({ children, onDismiss, className = '', onClick, avoid }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<CSSProperties>();

  useEffect(() => {
    const timer = setTimeout(onDismiss, TOAST_DURATION_MS);
    return () => clearTimeout(timer);
    // The timer belongs to this toast instance; parents remount it per message.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!avoid) return;
    const place = () => {
      const target = document.querySelector(avoid)?.getBoundingClientRect();
      const height = ref.current?.offsetHeight ?? 0;
      if (!target || target.bottom < 0 || target.top > window.innerHeight) return setPosition(undefined);
      // Prefer just below the control; if there isn't room, sit just above it.
      if (target.bottom + GAP + height <= window.innerHeight - 8) setPosition({ top: target.bottom + GAP, bottom: 'auto' });
      else setPosition({ bottom: window.innerHeight - target.top + GAP });
    };
    place();
    window.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', place);
    return () => { window.removeEventListener('scroll', place); window.removeEventListener('resize', place); };
  }, [avoid]);

  return <div ref={ref} role="status" aria-live="polite" className={`toast ${className}`.trim()} style={position} onClick={onClick}>{children}</div>;
}
