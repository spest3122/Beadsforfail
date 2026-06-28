import React from 'react';
import { HistoryList } from '../components/HistoryList';
import type { Goal } from '../types';

interface LogProps {
  history: Goal[];
}

export const Log: React.FC<LogProps> = ({ history }) => {
  return (
    <div className="flex-1 flex flex-col pt-24 px-6 relative z-10 w-full h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full">
        {history.length > 0 ? (
          <HistoryList history={history} />
        ) : (
          <div className="mt-20 text-center text-on-background/70">
            <p className="text-lg">No goals yet.</p>
            <p className="text-sm opacity-70">Set a goal to start your journey.</p>
          </div>
        )}
      </div>
    </div>
  );
};
