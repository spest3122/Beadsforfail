import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationModalProps {
  goalName: string;
  isVisible: boolean;
  onClose: () => void;
  onStartNewGoal: () => void;
}

interface ConfettiParticle {
  id: number;
  x: number;
  size: number;
  color: string;
  rotate: number;
  duration: number;
  delay: number;
  xDrift: number;
  shape: 'circle' | 'rect';
}

const CONFETTI_COLORS = [
  '#6200EE', // primary purple
  '#03DAC6', // secondary teal
  '#FFD700', // gold
  '#FF6B9D', // pink
  '#A855F7', // lighter purple
  '#34D399', // emerald
  '#FBBF24', // amber
  '#F87171', // red-ish
];

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  goalName,
  isVisible,
  onClose,
  onStartNewGoal,
}) => {
  const particles = useMemo<ConfettiParticle[]>(() => {
    return Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
      size: Math.random() * 8 + 6,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotate: Math.random() * 720,
      duration: Math.random() * 1.5 + 2.5,
      delay: Math.random() * 1.2,
      xDrift: (Math.random() - 0.5) * 200,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }));
  }, []);

  const screenHeight = typeof window !== 'undefined' ? window.innerHeight + 150 : 900;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Confetti Layer */}
          <div className="fixed inset-0 pointer-events-none z-[63] overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  x: p.x,
                  y: -20,
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                animate={{
                  x: [p.x, p.x + p.xDrift * 0.4, p.x + p.xDrift],
                  y: [-20, screenHeight * 0.3, screenHeight],
                  opacity: [1, 1, 0],
                  rotate: [0, p.rotate * 0.5, p.rotate],
                  scale: [1, 1.1, 0.8],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: [0.2, 0.0, 0.8, 1],
                  times: [0, 0.4, 1],
                }}
                style={{
                  position: 'absolute',
                  width: p.size,
                  height: p.shape === 'rect' ? p.size * 0.4 : p.size,
                  backgroundColor: p.color,
                  borderRadius: p.shape === 'circle' ? '50%' : '2px',
                  top: 0,
                  left: 0,
                  opacity: 0.9,
                }}
              />
            ))}
          </div>

          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[61] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{
              delay: 0.3,
              type: 'spring',
              stiffness: 280,
              damping: 22,
            }}
            className="fixed inset-0 z-[62] flex items-center justify-center px-6 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md rounded-3xl pointer-events-auto overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow:
                  '0 32px 64px rgba(98,0,238,0.18), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              {/* Top gradient accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary-variant" />

              <div className="p-8 flex flex-col items-center text-center gap-5">
                {/* Emoji burst */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.55, type: 'spring', stiffness: 350, damping: 18 }}
                  className="text-6xl select-none"
                  aria-hidden="true"
                >
                  🏆
                </motion.div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                >
                  <h2
                    className="text-4xl font-extrabold tracking-tight"
                    style={{
                      background: 'linear-gradient(135deg, #6200EE, #03DAC6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    You did it!
                  </h2>
                </motion.div>

                {/* Goal name pill */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 }}
                  className="px-5 py-2 rounded-full text-sm font-semibold tracking-wide"
                  style={{
                    background: 'linear-gradient(135deg, rgba(98,0,238,0.12), rgba(3,218,198,0.12))',
                    border: '1px solid rgba(98,0,238,0.25)',
                    color: '#6200EE',
                  }}
                >
                  {goalName}
                </motion.div>

                {/* Stat */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.82 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span
                    className="text-5xl font-black font-mono"
                    style={{
                      background: 'linear-gradient(135deg, #6200EE, #3700B3)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    1,000
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-widest text-black/50">
                    beads dropped ✨
                  </span>
                </motion.div>

                {/* Sub-copy */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-black/60 text-base leading-relaxed max-w-xs"
                >
                  One bead at a time, you crushed it.{' '}
                  <span className="font-semibold text-black/80">Keep going!</span>
                </motion.p>

                {/* Divider */}
                <div className="w-full h-px bg-black/8" />

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  <button
                    id="celebration-start-new-goal"
                    onClick={onStartNewGoal}
                    className="flex-1 py-3 px-6 rounded-2xl text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #6200EE, #3700B3)',
                      boxShadow: '0 8px 20px rgba(98,0,238,0.35)',
                    }}
                  >
                    🚀 Start a New Goal
                  </button>
                  <button
                    id="celebration-close"
                    onClick={onClose}
                    className="flex-1 py-3 px-6 rounded-2xl text-black/60 font-semibold text-sm tracking-wide border border-black/10 bg-black/5 hover:bg-black/10 transition-all duration-200 active:scale-95"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
