/**
 * =========================================================================
 * רכיב הכותרת המרכזית (Header.tsx)
 * =========================================================================
* מציג את הכותרת הראשית עם מראה חגיגי, צבעוני וידידותי למובייל.
 */

import React from 'react';
import { SITE_CONFIG } from '../content';
import { ScreenId } from '../types';

interface HeaderProps {
 onNavigateScreen: (screen: ScreenId) => void;
 currentScreen: ScreenId;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateScreen }) => {
 const { eventDetails } = SITE_CONFIG;

 return (
   <header className="sticky top-0 z-40 border-b border-white/20 bg-gradient-to-r from-[#0b7a44] via-[#18c06a] to-[#05b7d8] py-4 text-white shadow-[0_12px_30px_rgba(11,122,68,0.18)] sm:py-5">
     <div className="mx-auto flex max-w-6xl items-center justify-center px-4">
       <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
         <button
           onClick={() => onNavigateScreen('instructions')}
           className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur-sm transition hover:bg-white/20"
           title="חזרה להוראות"
         >
           <span className="h-2 w-2 rounded-full bg-white/90" />
           <span>התחלה</span>
         </button>

         <h1
           onClick={() => onNavigateScreen('instructions')}
           className="inline-flex flex-col items-center gap-1 text-xl font-semibold tracking-tight text-white transition-opacity hover:opacity-90 sm:flex-row sm:gap-2 sm:text-2xl md:text-3xl"
           title="חזרה להוראות"
         >
           <span>{eventDetails.title}</span>
           <span className="hidden text-white/70 sm:inline">|</span>
           <span className="text-white/95">{eventDetails.subTitle}</span>
         </h1>
       </div>
     </div>
   </header>
 );
};
