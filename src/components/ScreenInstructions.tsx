/**
 * =========================================================================
 * דף 1: דף הוראות (ScreenInstructions.tsx)
 * =========================================================================
 * מציג דף הוראות פשוט וברור להשתתפות בדירוג התמונות.
 */

import React from 'react';
import { SITE_CONFIG } from '../content';
import { FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ScreenInstructionsProps {
  /** פונקציה למעבר לדף גרירת התמונות (דף 2) */
  onStartDrag: () => void;
}

/**
 * רכיב דף 1 - הוראות שימוש.
 * 
 * @param {ScreenInstructionsProps} props - מאפייני הרכיב
 * @returns {JSX.Element} - אלמנט דף ההוראות
 */
export const ScreenInstructions: React.FC<ScreenInstructionsProps> = ({ onStartDrag }) => {
  const { instructionsPage, eventDetails } = SITE_CONFIG;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-fadeIn">
      {/* כותרת הדף */}
      <div className="bg-white rounded-3xl p-8 border border-[#e8e4dc] shadow-sm text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2d241d] font-['Heebo'] tracking-tight">
          {eventDetails.title} <span className="font-light text-[#a88247]">|</span> {eventDetails.subTitle}
        </h1>

        <p className="text-[#5e4b3c] text-base font-normal max-w-xl mx-auto leading-relaxed">
          {instructionsPage.title}
        </p>
      </div>

      {/* שלבי ההוראות */}
      <div className="bg-white rounded-3xl p-8 border border-[#e8e4dc] shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-[#2d241d] font-['Heebo'] border-b pb-4 border-[#f0ece5] flex items-center gap-2">
          <span>{instructionsPage.subtitle}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instructionsPage.steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#faf8f5] rounded-2xl p-6 border border-[#ece7de] flex flex-col justify-between space-y-4 hover:border-[#ded5c6] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#3d332a] text-[#f7f4ef] font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {step.number}
                </span>
                <h3 className="font-bold text-[#2d241d] text-base font-['Heebo']">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#635548] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* כפתור מעבר לדף גרירת התמונות */}
      <div className="text-center pt-4">
        <button
          onClick={onStartDrag}
          className="px-8 py-4 bg-[#3d332a] hover:bg-[#524438] text-[#f7f4ef] font-bold text-base rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-98 cursor-pointer inline-flex items-center gap-2"
        >
          <span>{instructionsPage.startButtonText}</span>
          <ArrowLeft className="w-5 h-5 text-[#c79d5f]" />
        </button>
      </div>
    </div>
  );
};
