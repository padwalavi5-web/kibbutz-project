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
    <header className="sticky top-0 z-40 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8e4dc] shadow-xs py-5 text-center transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h1 
          onClick={() => onNavigateScreen('instructions')}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2d241d] font-['Heebo'] cursor-pointer inline-block hover:opacity-80 transition-opacity"
          title="חזרה להוראות"
        >
          <span>{eventDetails.title}</span>{" "}
          <span className="font-light text-[#8e6e42]">|</span>{" "}
          <span className="text-[#6d5635]">{eventDetails.subTitle}</span>
        </h1>
      </div>
    </header>
  );
};
