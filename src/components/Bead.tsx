import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface BeadProps {
  id: string;
  x: number;
  y: number;
  onComplete: (id: string) => void;
}

export const Bead: React.FC<BeadProps> = ({ id, x, y, onComplete }) => {
  // Generate a random trajectory for the bead only once on mount
  const { randomX, heightY, endY } = React.useMemo(() => {
    return {
      randomX: (Math.random() - 0.5) * 300, // Left or right scatter
      heightY: -Math.random() * 200 - 100, // How high it pops up
      endY: window.innerHeight + 100 // Drop off the screen
    };
  }, []);

  useEffect(() => {
    // Ensure cleanup happens even if unmounted early
    const timer = setTimeout(() => {
      onComplete(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  return (
    <motion.div
      initial={{ x, y, scale: 0.2, opacity: 1, rotate: 0 }}
      animate={{
        x: [x, x + randomX * 0.5, x + randomX],
        y: [y, y + heightY, endY],
        scale: [0.2, 1.2, 1],
        opacity: [1, 1, 0],
        rotate: [0, Math.random() * 360, Math.random() * 720]
      }}
      transition={{
        duration: 2.5,
        ease: [0.3, 0.0, 0.8, 1], // Custom cubic-bezier for gravity effect
        times: [0, 0.4, 1]
      }}
      onAnimationComplete={() => onComplete(id)}
      className="fixed w-8 h-8 rounded-full glass-bead pointer-events-none z-50 flex items-center justify-center"
      style={{
        boxShadow: '0 10px 20px rgba(0,0,0,0.2), inset 0 4px 6px rgba(255,255,255,0.6), inset 0 -4px 6px rgba(0,0,0,0.1)'
      }}
    >
      {/* Little highlight to make it look like a glossy sphere */}
      <div className="absolute top-1 left-1 w-2 h-2 bg-white/70 rounded-full blur-[1px]"></div>
    </motion.div>
  );
};
