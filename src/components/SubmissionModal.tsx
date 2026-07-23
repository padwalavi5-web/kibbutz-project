/**
 * =========================================================================
 * רכיב חלונית אישור ושליחת דירוג (SubmissionModal.tsx)
 * =========================================================================
 * מציג חגיגה ויזואלית עם סיכום הניקוד המחושב, אישור שמירה במסד הנתונים
 * Firebase, ואפשרויות שיתוף ב-WhatsApp או שינוי דירוג.
 */

import React, { useState } from 'react';
import { VoteResult, Photo } from '../types';
import { generateShareSummary } from '../utils/scoring';
import { Trophy, CheckCircle, Share2, Copy, RefreshCcw, Sparkles, X, Heart, Star } from 'lucide-react';

interface SubmissionModalProps {
  // תוצאות ההצבעה המחושבות
  voteResult: VoteResult | null;
  // מערך 15 התמונות המלא
  allPhotos: Photo[];
  // סטטוס שמירה בשרת/פיירבייס
  isSaving: boolean;
  // הודעת חיווי מהשרת
  saveMessage: string;
  // פונקציית סגירת החלונית
  onClose: () => void;
  // פונקציית איפוס והתחלת דירוג מחדש
  onReset: () => void;
  // פונקציית פתיחת דירוגי הקהילה
  onOpenCommunityStats: () => void;
}

/**
 * רכיב חלונית סיכום ושליחת הצבעה.
 * 
 * @description מציג חיווי חגיגי לסיכום הדירוג, פירוט הניקוד שהוענק לתמונות המובילות,
 * הודעת חיווי על שמירה ב-Firebase, וכפתורי שיתוף.
 * 
 * @param {SubmissionModalProps} props - פרופס כוללים תוצאות דירוג, סטטוס שמירה ואירועי לחיצה
 * @returns {JSX.Element | null} - אלמנט המודל החגיגי
 */
export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  voteResult,
  allPhotos,
  isSaving,
  saveMessage,
  onClose,
  onReset,
  onOpenCommunityStats
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!voteResult) return null;

  /**
   * פונקציה להעתקת סיכום הדירוג ללוח ההעתקות.
   * 
   * @returns {void}
   */
  const handleCopyShareText = (): void => {
    const text = generateShareSummary(voteResult, allPhotos);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  /**
   * פונקציה לשיתוף ישיר ב-WhatsApp.
   * 
   * @returns {void}
   */
  const handleWhatsAppShare = (): void => {
    const text = generateShareSummary(voteResult, allPhotos);
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#fefcf8] border-2 border-[#c4903e] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#2c2017] text-center space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* אייקון גביע חגיגי וכותרת */}
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#e6b35c] via-[#f7e0b5] to-[#c4903e] text-[#2c2017] shadow-lg animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-extrabold text-[#2c2017] font-['Heebo']">
            הדירוג נשלח בהצלחה! 🎉
          </h2>
          <p className="text-sm font-semibold text-[#8c5d18]">
            חג המשק 60 לקיבוץ עלומים
          </p>
        </div>

        {/* הודעת סטטוס שמירה ב-Firebase */}
        <div className={`p-3 rounded-xl border text-xs font-bold transition-all ${
          isSaving 
            ? 'bg-amber-50 border-amber-300 text-amber-800 animate-pulse'
            : 'bg-emerald-50 border-emerald-300 text-emerald-800'
        }`}>
          {isSaving ? "שומר את הדירוג במסד הנתונים..." : saveMessage || "הנתונים נרשמו בהצלחה!"}
        </div>

        {/* סיכום הניקוד הכולל ו-3 התמונות המובילות */}
        <div className="bg-[#f5ebd8]/80 border border-[#ddc29a] rounded-2xl p-4 text-right space-y-3">
          <div className="flex items-center justify-between border-b border-[#e5d0b3] pb-2">
            <span className="font-extrabold text-[#2c2017] text-sm">
              סך הניקוד שהוענק:
            </span>
            <span className="bg-[#2c2017] text-[#f7e6cc] font-extrabold text-sm px-3 py-1 rounded-full">
              {voteResult.totalPointsAssigned} נקודות
            </span>
          </div>

          <h4 className="font-extrabold text-xs text-[#8c5d18] pt-1">
            תמונות ה-TOP 3 בסולם הדירוג שלך:
          </h4>

          <div className="space-y-2">
            {voteResult.ladder.slice(0, 3).map((item, idx) => {
              const photo = allPhotos.find((p) => p.id === item.photoId);
              const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
              return (
                <div key={item.rank} className="flex items-center justify-between bg-white/90 p-2 rounded-xl border border-[#e8d7bb] text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span>{medal}</span>
                    <span className="font-bold text-[#2c2017] truncate">
                      {photo ? photo.title : item.title}
                    </span>
                  </div>
                  <span className="font-extrabold text-[#96631b] shrink-0">
                    +{item.points} נק'
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* כפתורי שיתוף ב-WhatsApp והעתקה */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>שתף את הדירוג ב-WhatsApp 💬</span>
          </button>

          <button
            onClick={handleCopyShareText}
            className="w-full py-2.5 bg-white hover:bg-gray-100 text-[#2c2017] font-bold text-xs rounded-xl border border-gray-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-gray-600" />
            <span>{copied ? "הטקסט הועתק בהצלחה! ✓" : "העתק סיכום להודעה"}</span>
          </button>
        </div>

        {/* מקשים נוספים: צפייה בתוצאות הקהילה או התחלה מחדש */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-gray-200 text-xs">
          <button
            onClick={onOpenCommunityStats}
            className="text-[#8c5d18] font-bold hover:underline cursor-pointer"
          >
            צפה בדירוג הקהילתי 📊
          </button>

          <button
            onClick={onReset}
            className="text-gray-500 hover:text-rose-700 font-semibold cursor-pointer"
          >
            דירוג מחדש 🔄
          </button>
        </div>

      </div>
    </div>
  );
};
