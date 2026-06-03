import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

export const cinematicRevealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export const cinematicRevealText: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const cardHover: Variants = {
  initial: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
  hover: { 
    scale: 1.02, 
    y: -8,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

export const pulseGlow: Variants = {
  initial: { opacity: 0.8, scale: 1 },
  animate: {
    opacity: [0.8, 1, 0.8],
    scale: [1, 1.05, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};
