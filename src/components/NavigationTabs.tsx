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
   <nav className="sticky top-0 z-30 border-b border-sky-100/80 bg-white/75 backdrop-blur-xl">
     <div className="mx-auto max-w-4xl px-3 py-3 sm:px-4">
       <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
         <button
           onClick={() => onSelectScreen('instructions')}
           className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:px-5 sm:py-3 sm:text-sm ${
             activeScreen === 'instructions'
               ? 'bg-gradient-to-r from-[#2c7a66] to-[#5fb7e8] text-white shadow-[0_10px_25px_rgba(44,122,102,0.18)]'
               : 'bg-white/90 text-slate-700 hover:bg-sky-50'
           }`}
         >
           <FileText className={`h-4 w-4 ${activeScreen === 'instructions' ? 'text-white' : 'text-[#2c7a66]'}`} />
           <span>הוראות</span>
         </button>

         <button
           onClick={() => onSelectScreen('drag')}
           className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:px-5 sm:py-3 sm:text-sm ${
             activeScreen === 'drag'
               ? 'bg-gradient-to-r from-[#2c7a66] to-[#63c7a9] text-white shadow-[0_10px_25px_rgba(95,183,232,0.18)]'
               : 'bg-white/90 text-slate-700 hover:bg-sky-50'
           }`}
         >
           <MoveHorizontal className={`h-4 w-4 ${activeScreen === 'drag' ? 'text-white' : 'text-[#5fb7e8]'}`} />
           <span>דירוג תמונות ה-60</span>
         </button>
       </div>
     </div>
   </nav>
 );
};
