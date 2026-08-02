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
import { SITE_CONFIG } from '../content';
import { Trophy, CheckCircle, Share2, Copy, X, Sparkles, BarChart3, RefreshCw } from 'lucide-react';

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
  const { modals } = SITE_CONFIG;

  if (!voteResult) return null;

  const handleCopyShareText = (): void => {
    const text = generateShareSummary(voteResult, allPhotos);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = (): void => {
    const text = generateShareSummary(voteResult, allPhotos);
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#fefcf9] border border-[#e8e4dc] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#2d241d] text-center space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#f4f0ea] hover:bg-[#eae4d8] text-[#635548] font-bold flex items-center justify-center transition-colors cursor-pointer"
          title="סגירה"
        >
          <X className="w-4 h-4" />
        </button>

        {/* אייקון גביע חגיגי וכותרת */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#ead7ba] via-[#f7ebd9] to-[#dfc499] text-[#7a5d37] shadow-sm">
            <Trophy className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2d241d] font-['Heebo']">
            {modals.submissionTitle}
          </h2>
          <p className="text-sm font-semibold text-[#8e6e42]">
            {modals.submissionSubtitle}
          </p>
          <p className="text-xs sm:text-sm text-[#635548] leading-relaxed max-w-sm mx-auto">
            {modals.thankYouText}
          </p>
        </div>

        {/* הודעת סטטוס שמירה ב-Firebase */}
        <div className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all ${
          isSaving 
            ? 'bg-amber-50/80 border-amber-300 text-amber-800 animate-pulse'
            : 'bg-emerald-50/80 border-emerald-300 text-emerald-800'
        }`}>
          <div className="flex items-center justify-center gap-2">
            {!isSaving && <CheckCircle className="w-4 h-4 shrink-0" />}
            <span>{isSaving ? "שומר את הדירוג במסד הנתונים..." : saveMessage || "הדירוג נשמר בהצלחה!"}</span>
          </div>
        </div>

        {/* סיכום הניקוד הכולל ו-3 התמונות המובילות */}
        <div className="bg-[#faf8f5] border border-[#ece7de] rounded-2xl p-4 text-right space-y-3">
          <div className="flex items-center justify-between border-b border-[#ece7de] pb-2.5">
            <span className="font-bold text-[#2d241d] text-sm">
              {modals.summaryTitle}
            </span>
            <span className="bg-[#3d332a] text-[#f7f4ef] font-bold text-xs px-3 py-1 rounded-full">
              {voteResult.totalPointsAssigned} {modals.pointsText}
            </span>
          </div>

          <div className="space-y-2">
            {voteResult.ladder.slice(0, 3).map((item, idx) => {
              const photo = allPhotos.find((p) => p.id === item.photoId);
              const medal = idx === 0 ? '#1' : idx === 1 ? '#2' : '#3';
              return (
                <div key={item.rank} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#ece7de] text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="font-extrabold text-[#7a5d37] w-6 text-center">{medal}</span>
                    <span className="font-bold text-[#2d241d] truncate">
                      {photo ? photo.title : item.title}
                    </span>
                  </div>
                  <span className="font-bold text-[#8e6e42] shrink-0">
                    +{item.points} {modals.pointsText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* כפתורי שיתוף ב-WhatsApp והעתקה */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{modals.shareWhatsAppText}</span>
          </button>

          <button
            onClick={handleCopyShareText}
            className="w-full py-3 bg-[#f4f0ea] hover:bg-[#eae4d8] text-[#5e4b3c] font-semibold text-xs sm:text-sm rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Copy className="w-4 h-4 text-[#7a5d37]" />
            <span>{copied ? modals.copiedText : modals.copySummaryText}</span>
          </button>
        </div>

        {/* כפתורים נוספים: צפייה בתוצאות הקהילה (למנהל) או התחלה מחדש */}
        <div className="pt-3 flex items-center justify-between gap-3 border-t border-[#f0ece5] text-xs sm:text-sm">
          <button
            onClick={onOpenCommunityStats}
            className="text-[#7a5d37] font-bold hover:text-[#5e4b3c] flex items-center gap-1.5 cursor-pointer transition-colors"
            title="כניסה למנהלי האפליקציה בלבד"
          >
            <BarChart3 className="w-4 h-4" />
            <span>{modals.communityStatsButton}</span>
          </button>

          <button
            onClick={onReset}
            className="text-[#8e8275] hover:text-rose-700 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{modals.redraftButton}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

