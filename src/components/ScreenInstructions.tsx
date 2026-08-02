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
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
          {eventDetails.title} <span className="font-light text-slate-500">|</span> {eventDetails.subTitle}
        </h1>

        <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
          {instructionsPage.title}
        </p>
      </div>

      {/* שלבי ההוראות */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-semibold text-slate-900 border-b pb-4 border-slate-100 flex items-center gap-2">
          <span>{instructionsPage.subtitle}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instructionsPage.steps.map((step) => (
            <div
              key={step.number}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between space-y-4 hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                  {step.number}
                </span>
                <h3 className="font-semibold text-slate-900 text-base">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
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
          className="px-8 py-4 bg-slate-900 hover:bg-slate-700 text-white font-semibold text-base rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer inline-flex items-center gap-2"
        >
          <span>{instructionsPage.startButtonText}</span>
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};
