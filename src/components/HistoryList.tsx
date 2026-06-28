import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { Goal } from '../types';
import { cn } from '../utils';

interface HistoryListProps {
  history: Goal[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-16 p-6 glass rounded-3xl mb-8 z-10 relative">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-variant">
          Your Journey Log
        </span>
      </h2>
      <div className="space-y-4">
        {history.map((goal) => (
          <div 
            key={goal.id} 
            className={cn(
              "glass p-4 rounded-xl flex items-center gap-4 transition-all hover:scale-[1.02]",
              goal.status === 'active' 
                ? "bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(98,0,238,0.1)]" 
                : "opacity-60"
            )}
          >
            <div className="shrink-0">
              {goal.status === 'completed' ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <Circle className="w-5 h-5 text-primary shrink-0 animate-pulse" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-medium truncate",
                goal.status === 'completed' ? "text-on-surface/40 line-through" : "text-on-surface"
              )}>
                {goal.name}
              </h3>
              <p className="text-xs text-on-background/50">
                {new Date(goal.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="font-mono text-sm text-on-background/70">
              {goal.remaining} / {goal.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
