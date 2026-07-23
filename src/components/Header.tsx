/**
 * =========================================================================
 * רכיב הכותרת המרכזית (Header.tsx)
 * =========================================================================
 * מציג אך ורק את הכותרת "חג המשק 60 לקיבוץ עלומים" בכותרת העליונה.
 */

import React from 'react';
import { SITE_CONFIG } from '../content';
import { ScreenId } from '../types';

interface HeaderProps {
  onNavigateScreen: (screen: ScreenId) => void;
  currentScreen: ScreenId;
}

/**
 * רכיב כותרת עליונה נקייה עם הכותרת בלבד.
 */
export const Header: React.FC<HeaderProps> = ({ onNavigateScreen }) => {
  const { eventDetails } = SITE_CONFIG;

  return (
    <header className="bg-slate-200/80 border-b border-slate-300 shadow-xs py-4 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h1 
          onClick={() => onNavigateScreen('instructions')}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2c2017] cursor-pointer inline-block hover:opacity-90 transition-opacity"
          title="חזרה להוראות"
        >
          {eventDetails.title} {eventDetails.subTitle}
        </h1>
      </div>
    </header>
  );
};
