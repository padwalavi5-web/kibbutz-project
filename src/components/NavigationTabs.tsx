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
    <nav className="bg-slate-50 border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 py-2">
          
          {/* דף 1: הוראות */}
          <button
            onClick={() => onSelectScreen('instructions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeScreen === 'instructions'
                ? 'bg-[#2c2017] text-[#f7e6cc] shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-4 h-4 text-[#e0a84e]" />
            <span>דף 1: הוראות</span>
          </button>

          {/* דף 2: דף גרירה כפול */}
          <button
            onClick={() => onSelectScreen('drag')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeScreen === 'drag'
                ? 'bg-[#2c2017] text-[#f7e6cc] shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <MoveHorizontal className="w-4 h-4 text-[#e0a84e]" />
            <span>דף 2: דף גרירה כפול</span>
            <span className="bg-amber-100 text-[#a37021] text-[11px] px-2 py-0.5 rounded-full font-extrabold">
              {rankedCount}/10
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
};
