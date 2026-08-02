/**
 * =========================================================================
 * רכיב סרגל כרטיסיות הניווט (NavigationTabs.tsx)
 * =========================================================================
 * מציג 2 כרטיסיות פשוטות למעבר בין דף 1 (הוראות) לבין דף 2 (דף גרירה כפול).
 */

import React from 'react';
import { ScreenId } from '../types';
import { FileText, MoveHorizontal } from 'lucide-react';

interface NavigationTabsProps {
  /** המסך האקטיבי כעת */
  activeScreen: ScreenId;
  /** פונקציית מעבר מסך */
  onSelectScreen: (screen: ScreenId) => void;
  /** מספר התמונות שדורגו בסולם */
  rankedCount: number;
}

/**
 * רכיב כרטיסיות הניווט.
 * 
 * @param {NavigationTabsProps} props - מאפייני הרכיב
 * @returns {JSX.Element} - אלמנט סרגל הניווט
 */
export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeScreen,
  onSelectScreen,
  rankedCount
}) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 py-3">
          
          {/* הוראות */}
          <button
            onClick={() => onSelectScreen('instructions')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeScreen === 'instructions'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <span>הוראות</span>
          </button>

          {/* דירוג תמונות */}
          <button
            onClick={() => onSelectScreen('drag')}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeScreen === 'drag'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MoveHorizontal className="w-4 h-4 text-slate-400" />
            <span>דירוג תמונות ה-60</span>
            <span className="bg-slate-100 text-slate-600 text-[11px] px-2.5 py-0.5 rounded-full font-bold">
              {rankedCount}/10
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
};
