import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoalForm } from './GoalForm';
import type { Goal } from '../types';

interface HeaderProps {
  currentGoal: Goal | null;
  onSetGoal: (name: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentGoal, onSetGoal }) => {
  return (
    <header className="w-full pt-16 pb-8 px-6 flex flex-col items-center justify-center min-h-[200px] z-10 relative">
      <AnimatePresence mode="wait">
        {!currentGoal ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-variant mb-4">
                What's your next big goal?
              </h1>
              <p className="text-on-background/70 text-lg">Set a goal and drop 1,000 beads to achieve it.</p>
            </div>
            <GoalForm onSetGoal={onSetGoal} />
          </motion.div>
        ) : (
          <motion.div
            key="active-goal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <motion.h1 
              layoutId="goal-name"
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-variant"
            >
              {currentGoal.name}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass px-6 py-3 rounded-2xl flex items-center gap-4"
            >
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-3xl font-bold text-primary">
                  {currentGoal.remaining.toLocaleString()}
                </span>
                <span className="text-on-background/40 text-xl">/</span>
                <span className="text-on-background/60 text-xl">
                  {currentGoal.total}
                </span>
              </div>
              <div className="w-px h-8 bg-black/15 mx-2"></div>
              <div className="text-sm text-on-background/70 uppercase tracking-widest font-semibold">
                Remaining
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
