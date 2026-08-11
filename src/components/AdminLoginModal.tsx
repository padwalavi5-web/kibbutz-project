import React, { useState } from 'react';
import { SITE_CONFIG } from '../content';
import { Lock, X, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

/**
  * חלונית כניסה למנהלי המערכת לצפייה בריכוז התוצאות
  */
export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  onClose,
  onSuccess
}) => {
  const [pinInput, setPinInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { admin } = SITE_CONFIG;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === admin.pinCode) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-sky-100 rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl relative text-slate-800 space-y-6 text-center">
        
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-sky-50 hover:bg-sky-100 text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer"
          title="סגירה"
        >
          <X className="w-4 h-4" />
        </button>

        {/* כותרת ואייקון מנעול */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sky-50 text-[#2c7a66] shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-sans">
            {admin.modalTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#635548] leading-relaxed">
            {admin.modalSubtitle}
          </p>
        </div>

        {/* טופס הזנת קוד גישה */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                if (error) setError(false);
              }}
              placeholder={admin.inputPlaceholder}
              autoFocus
              className="w-full px-4 py-3 bg-sky-50 border border-sky-100 rounded-2xl text-center text-lg font-bold tracking-widest text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5fb7e8] transition-all"
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-1.5 text-rose-600 text-xs font-medium animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{admin.errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#2c7a66] to-[#5fb7e8] hover:opacity-95 text-white font-bold text-sm rounded-2xl transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-[#c79d5f]" />
            <span>{admin.loginButtonText}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
