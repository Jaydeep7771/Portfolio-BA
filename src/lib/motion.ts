import type { Variants } from "framer-motion";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Shared viewport config for scroll-triggered animation.
 *
 * `amount: 0` means "fires as soon as any part intersects". Deliberately no
 * negative bottom margin: with one, content that is already on screen at load
 * — or that a hash link jumps straight to — never animates and stays at
 * opacity 0. Erring toward firing early is much safer than erring toward
 * invisible content.
 */
export const VIEWPORT = { once: true, amount: 0 } as const;

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};
