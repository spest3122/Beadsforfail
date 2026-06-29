import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '../utils';

interface BagProps {
  onInteract: (x: number, y: number) => void;
  disabled: boolean;
}

export const Bag: React.FC<BagProps> = ({ onInteract, disabled }) => {
  const controls = useAnimation();
  const bagRef = useRef<HTMLDivElement>(null);

  const handleInteraction = async () => {
    if (disabled) return;

    // Trigger the squish animation
    controls.start({
      scale: [1, 0.9, 1.05, 1],
      rotate: [0, -2, 2, 0],
      transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 15 }
    });

    // Get position to spawn bead
    if (bagRef.current) {
      const rect = bagRef.current.getBoundingClientRect();
      const spawnX = rect.left + rect.width / 2;
      const spawnY = rect.top + rect.height / 2;
      
      // Slight randomization of spawn point
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 20;

      onInteract(spawnX + offsetX, spawnY + offsetY);
    }
  };

  return (
    <div className="relative flex justify-center items-center w-full max-w-sm mx-auto h-64 mt-12 z-20">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000"></div>

      <motion.div
        ref={bagRef}
        animate={controls}
        whileHover={!disabled ? { scale: 1.05, cursor: 'pointer' } : {}}
        onClick={handleInteraction}
        className={cn(
          "relative w-48 h-56 rounded-[2rem] shadow-2xl flex items-center justify-center transition-all duration-300",
          disabled ? 'opacity-50 grayscale cursor-not-allowed' : 'glass hover:shadow-primary/20'
        )}
        style={{
          borderBottomLeftRadius: '3rem',
          borderBottomRightRadius: '3rem',
          borderTopLeftRadius: '1.5rem',
          borderTopRightRadius: '1.5rem',
          touchAction: 'manipulation',
        }}

      >
        {/* Drawstrings/Top of Bag Styling */}
        <div className="absolute top-0 w-full h-8 flex justify-center -mt-2">
          <div className="w-32 h-6 bg-white/20 rounded-full blur-[1px]"></div>
        </div>

        {/* Inner shadow/depth */}
        <div className="absolute inset-2 rounded-[inherit] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] border border-white/10 pointer-events-none"></div>

        {!disabled && (
          <div className="text-primary/60 font-semibold tracking-widest uppercase text-sm select-none">
            Tap Me
          </div>
        )}
      </motion.div>
    </div>
  );
};
