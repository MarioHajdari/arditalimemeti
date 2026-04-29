import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Cinematic curtain wipe */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#0A0A0A',
          zIndex: 9998,
          pointerEvents: 'none',
          transformOrigin: 'top',
        }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.65, 0, 0.35, 1],
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#C9A96E',
          zIndex: 9997,
          pointerEvents: 'none',
          transformOrigin: 'top',
        }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.65, 0, 0.35, 1],
        }}
      />
      {children}
    </motion.div>
  );
}
