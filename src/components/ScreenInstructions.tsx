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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* כותרת הדף */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-[#a37021] border border-amber-200 text-xs font-bold px-3 py-1 rounded-full">
          <FileText className="w-3.5 h-3.5" />
          <span>דף 1 מתוך 2: הוראות</span>
        </div>

        <h1 className="text-3xl font-black text-[#2c2017]">
          {eventDetails.title} - {eventDetails.subTitle}
        </h1>

        <p className="text-[#634e3d] text-base font-medium max-w-xl mx-auto">
          {instructionsPage.title}
        </p>
      </div>

      {/* שלבי ההוראות */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-[#2c2017] border-b pb-3 border-slate-100 flex items-center gap-2">
          <span>כיצד לדרג את התמונות?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instructionsPage.steps.map((step) => (
            <div
              key={step.number}
              className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#2c2017] text-[#f7e6cc] font-extrabold text-sm flex items-center justify-center shrink-0">
                  {step.number}
                </span>
                <h3 className="font-bold text-[#2c2017] text-base">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* כפתור מעבר לדף גרירת התמונות */}
      <div className="text-center pt-2">
        <button
          onClick={onStartDrag}
          className="px-8 py-4 bg-[#2c2017] hover:bg-[#423124] text-[#f7e6cc] font-extrabold text-base rounded-2xl shadow-md hover:shadow-lg transition-all transform active:scale-98 cursor-pointer inline-flex items-center gap-2"
        >
          <span>{instructionsPage.startButtonText}</span>
          <ArrowLeft className="w-5 h-5 text-[#e0a84e]" />
        </button>
      </div>
    </div>
  );
};
