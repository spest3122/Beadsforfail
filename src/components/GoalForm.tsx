import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { cn } from '../utils';

interface GoalFormProps {
  onSetGoal: (name: string) => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({ onSetGoal }) => {
  const [goalName, setGoalName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goalName.trim()) {
      onSetGoal(goalName.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        <div className="w-full relative group">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full transition-opacity opacity-0 group-focus-within:opacity-100"></div>
          <div className="relative glass rounded-full flex items-center p-2 pr-4 transition-transform group-focus-within:scale-[1.02]">
            <Target className="w-5 h-5 text-primary mr-3 shrink-0" />
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="What are you working towards?"
              className="bg-transparent border-none outline-none text-on-background placeholder:text-on-background/50 flex-1 min-w-0 text-lg"
              autoFocus
            />
            <button
              type="submit"
              disabled={!goalName.trim()}
              className={cn(
                "ml-2 px-6 py-2 rounded-full font-medium transition-all duration-300",
                goalName.trim()
                  ? "bg-primary text-on-primary hover:opacity-90 hover:shadow-[0_0_20px_rgba(98,0,238,0.4)]"
                  : "bg-black/5 text-on-background/30 cursor-not-allowed"
              )}
            >
              Lock In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
