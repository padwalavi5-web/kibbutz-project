/**
* =========================================================================
* רכיב סרגל כרטיסיות הניווט (NavigationTabs.tsx)
* =========================================================================
* מציג 2 כרטיסיות צבעוניות למעבר בין דף ההוראות לבין דף הדירוג.
*/

import React from 'react';
import { ScreenId } from '../types';
import { FileText, MoveHorizontal } from 'lucide-react';

interface NavigationTabsProps {
 activeScreen: ScreenId;
 onSelectScreen: (screen: ScreenId) => void;
 rankedCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
 activeScreen,
 onSelectScreen,
 rankedCount
}) => {
 return (
   <nav className="sticky top-0 z-30 border-b border-emerald-100/80 bg-white/80 backdrop-blur-xl">
     <div className="mx-auto max-w-4xl px-3 py-3 sm:px-4">
       <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
         <button
           onClick={() => onSelectScreen('instructions')}
           className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:px-5 sm:py-3 sm:text-sm ${
             activeScreen === 'instructions'
               ? 'bg-gradient-to-r from-[#0b7a44] to-[#18c06a] text-white shadow-[0_10px_25px_rgba(11,122,68,0.2)]'
               : 'bg-white/80 text-slate-700 hover:bg-emerald-50'
           }`}
         >
           <FileText className={`h-4 w-4 ${activeScreen === 'instructions' ? 'text-white' : 'text-emerald-600'}`} />
           <span>הוראות</span>
         </button>

         <button
           onClick={() => onSelectScreen('drag')}
           className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:px-5 sm:py-3 sm:text-sm ${
             activeScreen === 'drag'
               ? 'bg-gradient-to-r from-[#0b7a44] to-[#05b7d8] text-white shadow-[0_10px_25px_rgba(5,183,216,0.2)]'
               : 'bg-white/80 text-slate-700 hover:bg-sky-50'
           }`}
         >
           <MoveHorizontal className={`h-4 w-4 ${activeScreen === 'drag' ? 'text-white' : 'text-sky-600'}`} />
           <span>דירוג תמונות ה-60</span>
           <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${activeScreen === 'drag' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
             {rankedCount}/10
           </span>
         </button>
       </div>
     </div>
   </nav>
 );
};
