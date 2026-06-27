import React from 'react';
import { Header } from '../components/Header';
import { Bag } from '../components/Bag';
import { Bead } from '../components/Bead';
import type { Goal, BeadData } from '../types';

interface TrackerProps {
  currentGoal: Goal | null;
  activeBeads: BeadData[];
  onSetGoal: (name: string) => void;
  onBagInteract: (x: number, y: number) => void;
  onBeadComplete: (id: string) => void;
}

export const Tracker: React.FC<TrackerProps> = ({ 
  currentGoal, 
  activeBeads, 
  onSetGoal, 
  onBagInteract,
  onBeadComplete
}) => {
  return (
    <div className="flex-1 flex flex-col pt-24 px-6 relative z-10 w-full h-full">
      <Header currentGoal={currentGoal} onSetGoal={onSetGoal} />
      
      <main className="flex-1 flex flex-col items-center justify-center relative">
        <Bag 
          onInteract={onBagInteract} 
          disabled={!currentGoal || currentGoal.remaining === 0} 
        />
      </main>

      {/* Render Active Beads */}
      {activeBeads.map(bead => (
        <Bead
          key={bead.id}
          id={bead.id}
          x={bead.x}
          y={bead.y}
          onComplete={onBeadComplete}
        />
      ))}
    </div>
  );
};
