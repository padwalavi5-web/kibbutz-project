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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-[2rem] max-w-lg w-full p-6 sm:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] relative text-slate-900 text-center space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          title="סגירה"
        >
          <X className="w-4 h-4" />
        </button>

        {/* אייקון גביע חגיגי וכותרת */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 text-slate-700 shadow-sm">
            <Trophy className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {modals.submissionTitle}
          </h2>
          <p className="text-sm font-medium text-slate-600">
            {modals.submissionSubtitle}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            {modals.thankYouText}
          </p>
        </div>

        {/* הודעת סטטוס שמירה ב-Firebase */}
        <div className={`p-3.5 rounded-3xl border text-sm font-semibold transition-all ${
          isSaving 
            ? 'bg-slate-100 border-slate-200 text-slate-700 animate-pulse'
            : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center justify-center gap-2">
            {!isSaving && <CheckCircle className="w-4 h-4 shrink-0 text-slate-700" />}
            <span>{isSaving ? "שומר את הדירוג במסד הנתונים..." : saveMessage || "הדירוג נשמר בהצלחה!"}</span>
          </div>
        </div>

        {/* סיכום הניקוד הכולל ו-3 התמונות המובילות */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 text-right space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="font-semibold text-slate-900 text-sm">
              {modals.summaryTitle}
            </span>
            <span className="bg-slate-900 text-white font-semibold text-xs px-3 py-1 rounded-full">
              {voteResult.totalPointsAssigned} {modals.pointsText}
            </span>
          </div>

          <div className="space-y-3">
            {voteResult.ladder.slice(0, 3).map((item, idx) => {
              const photo = allPhotos.find((p) => p.id === item.photoId);
              const medal = idx === 0 ? '#1' : idx === 1 ? '#2' : '#3';
              return (
                <div key={item.rank} className="flex items-center justify-between bg-white p-3 rounded-3xl border border-slate-200 text-sm shadow-sm">
                  <div className="flex items-center gap-3 truncate">
                    <span className="font-semibold text-slate-700 w-8 text-center">{medal}</span>
                    <span className="font-semibold text-slate-900 truncate">
                      {photo ? photo.title : item.title}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-700 shrink-0">
                    +{item.points} {modals.pointsText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* כפתורי שיתוף ב-WhatsApp והעתקה */}
        <div className="space-y-3 pt-1">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-3xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{modals.shareWhatsAppText}</span>
          </button>
 
          <button
            onClick={handleCopyShareText}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-3xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Copy className="w-4 h-4 text-slate-500" />
            <span>{copied ? modals.copiedText : modals.copySummaryText}</span>
          </button>
        </div>

        {/* כפתורים נוספים: צפייה בתוצאות הקהילה (למנהל) או התחלה מחדש */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 text-sm">
          <button
            onClick={onOpenCommunityStats}
            className="text-slate-700 font-semibold hover:text-slate-900 flex items-center gap-2 cursor-pointer transition-colors"
            title="כניסה למנהלי האפליקציה בלבד"
          >
            <BarChart3 className="w-4 h-4" />
            <span>{modals.communityStatsButton}</span>
          </button>
 
          <button
            onClick={onReset}
            className="text-slate-500 hover:text-slate-900 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{modals.redraftButton}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

