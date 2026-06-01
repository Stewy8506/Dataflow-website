export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

export const cinematicRevealContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export const cinematicRevealText = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
