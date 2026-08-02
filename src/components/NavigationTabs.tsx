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
    <nav className="bg-[#faf8f5] border-b border-[#e8e4dc] sticky top-0 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 py-2.5">
          
          {/* הוראות */}
          <button
            onClick={() => onSelectScreen('instructions')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeScreen === 'instructions'
                ? 'bg-[#3d332a] text-[#f7f4ef] shadow-xs'
                : 'text-[#635548] hover:bg-[#f4f0ea]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#c79d5f]" />
            <span>הוראות</span>
          </button>

          {/* דירוג תמונות */}
          <button
            onClick={() => onSelectScreen('drag')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeScreen === 'drag'
                ? 'bg-[#3d332a] text-[#f7f4ef] shadow-xs'
                : 'text-[#635548] hover:bg-[#f4f0ea]'
            }`}
          >
            <MoveHorizontal className="w-4 h-4 text-[#c79d5f]" />
            <span>דירוג תמונות ה-60</span>
            <span className="bg-[#f4f0ea] text-[#7a5d37] border border-[#ded8ce] text-[11px] px-2.5 py-0.5 rounded-full font-bold">
              {rankedCount}/10
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
};
