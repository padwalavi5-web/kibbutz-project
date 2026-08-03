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
       <div className="flex flex-col items-center gap-1 text-center sm:gap-2">
         <h1
           onClick={() => onNavigateScreen('instructions')}
           className="text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl"
           title="חזרה להוראות"
         >
           <span>{eventDetails.title}</span>
           <span className="mx-2 hidden sm:inline text-white/80">|</span>
           <span className="text-white/95">{eventDetails.subTitle}</span>
         </h1>
       </div>
     </div>
   </header>
 );
};
