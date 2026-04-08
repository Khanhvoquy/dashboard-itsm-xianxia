import { Variants } from 'framer-motion';

/**
 * Ink reveal animation - content appears like ink spreading on paper
 */
export const inkRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Pulse glow animation for aura effects
 */
export const pulseGlowVariants: Variants = {
  idle: {
    boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)',
  },
  active: {
    boxShadow: '0 0 35px rgba(212, 175, 55, 0.6)',
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

/**
 * Float animation for hovering elements
 */
export const floatVariants: Variants = {
  idle: {
    y: 0,
  },
  floating: {
    y: -4,
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

/**
 * Fade in up animation for page transitions
 */
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Stagger container for list items
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Scale in animation for modal/dialog
 */
export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Slide in from left for sidebar
 */
export const slideInLeftVariants: Variants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Slide in from right for panels
 */
export const slideInRightVariants: Variants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Gradient shimmer effect keyframes (CSS-based, but here for reference)
 * @keyframes shimmer {
 *   0% { background-position: 200% 0; }
 *   100% { background-position: -200% 0; }
 * }
 */

/**
 * Particle drift animation variants
 */
export const particleVariants: Variants = {
  drift: {
    y: [0, -20, 0],
    x: [0, 10, -10, 0],
    opacity: [0.3, 0.8, 0.3],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Progress bar fill animation
 */
export const progressFillVariants: Variants = {
  empty: {
    width: 0,
  },
  filled: (custom: number) => ({
    width: `${custom}%`,
    transition: {
      duration: 1,
      ease: 'easeOut',
      delay: 0.2,
    },
  }),
};

/**
 * Card hover lift animation
 */
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 0 0 rgba(212, 175, 55, 0)',
  },
  hover: {
    y: -4,
    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};
