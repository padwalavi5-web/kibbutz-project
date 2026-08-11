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
   <header className="sticky top-0 z-40 border-b border-white/60 bg-gradient-to-r from-sky-50 via-white to-emerald-50 py-4 text-slate-800 shadow-[0_12px_30px_rgba(33,75,85,0.08)] sm:py-5">
     <div className="mx-auto flex max-w-6xl items-center justify-center px-4">
       <div className="flex flex-col items-center gap-1 text-center sm:gap-2">
         <h1
           onClick={() => onNavigateScreen('instructions')}
           className="text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl md:text-3xl"
           title="חזרה להוראות"
         >
           <span>{eventDetails.title}</span>
           <span className="mx-2 hidden sm:inline text-slate-400">|</span>
           <span className="text-slate-600">{eventDetails.subTitle}</span>
         </h1>
       </div>
     </div>
   </header>
 );
};
