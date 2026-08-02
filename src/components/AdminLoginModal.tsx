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
      <div className="bg-white border border-[#e8e4dc] rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl relative text-[#2d241d] space-y-6 text-center">
        
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#f4f0ea] hover:bg-[#eae4d8] text-[#635548] font-bold flex items-center justify-center transition-colors cursor-pointer"
          title="סגירה"
        >
          <X className="w-4 h-4" />
        </button>

        {/* כותרת ואייקון מנעול */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#f4f0ea] text-[#7a5d37] shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#2d241d] font-['Heebo']">
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
              className="w-full px-4 py-3 bg-[#faf8f5] border border-[#ded8ce] rounded-2xl text-center text-lg font-bold tracking-widest text-[#2d241d] focus:outline-none focus:ring-2 focus:ring-[#c79d5f] transition-all"
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
            className="w-full py-3.5 bg-[#3d332a] hover:bg-[#524438] text-[#f7f4ef] font-bold text-sm rounded-2xl transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-[#c79d5f]" />
            <span>{admin.loginButtonText}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
