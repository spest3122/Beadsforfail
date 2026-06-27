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
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-white">
          Journey Log
        </span>
      </h2>
      <div className="space-y-4">
        {history.map((goal) => (
          <div 
            key={goal.id} 
            className={cn(
              "flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
              goal.status === 'active' 
                ? "bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                : "bg-white/5 border border-white/5 opacity-70"
            )}
          >
            <div className="flex items-center gap-3">
              {goal.status === 'completed' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-indigo-400 shrink-0 animate-pulse" />
              )}
              <div>
                <p className={cn(
                  "font-medium",
                  goal.status === 'completed' ? "text-slate-300 line-through" : "text-slate-100"
                )}>
                  {goal.name}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(goal.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="font-mono text-sm text-slate-400">
              {goal.total - goal.remaining} / {goal.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
