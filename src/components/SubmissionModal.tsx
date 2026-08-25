/**
 * =========================================================================
 * רכיב חלונית אישור ושליחת דירוג (SubmissionModal.tsx)
 * =========================================================================
 * מציג הודעת הצלחה קצרה עם כפתור עריכת תוצאות.
 */

import React from 'react';
import { SITE_CONFIG } from '../content';
import { Trophy, X, RefreshCw } from 'lucide-react';

interface SubmissionModalProps {
  onClose: () => void;
  onReset: () => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  onClose,
  onReset
}) => {
  const { modals } = SITE_CONFIG;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#eadbb5] bg-gradient-to-br from-white via-[#fffaf1] to-[#eef9ff] p-6 text-center text-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.14)] sm:p-8">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition-colors hover:bg-white"
          title="סגירה"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#7c5c22] to-[#5fb7e8] text-white shadow-[0_16px_32px_rgba(124,92,34,0.22)]">
          <Trophy className="h-10 w-10" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {modals.submissionTitle}
          </h2>
          <p className="text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
            {modals.submissionSubtitle}
          </p>
          <p className="text-sm font-semibold leading-relaxed text-[#7c5c22] sm:text-base">
            {modals.thankYouText}
          </p>
        </div>

        <div className="mt-7">
          <button
            onClick={onReset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c5c22] via-[#c99b54] to-[#5fb7e8] px-5 py-3.5 text-base font-semibold text-white shadow-[0_16px_35px_rgba(124,92,34,0.20)] transition-all duration-200 hover:brightness-105 active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{modals.redraftButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
