/**
 * =========================================================================
 * רכיב חלונית סטטיסטיקות הקהילה (CommunityStatsModal.tsx)
 * =========================================================================
 * מציג לוח מובילים של התמונות האהובות והמדורגות ביותר מכלל המצביעים
 * בקיבוץ עלומים.
 */

import React from 'react';
import { Photo } from '../types';
import { getCommunityScores } from '../utils/firebase';
import { SITE_CONFIG } from '../content';
import { BarChart3, X, Lock } from 'lucide-react';
import { ImageBox } from './ImageBox';

interface CommunityStatsModalProps {
  // מערך 15 התמונות המלא
  photos: Photo[];
  // פונקציית סגירת המודל
  onClose: () => void;
}

/**
 * רכיב מודל לתוצאות וסטטיסטיקת דירוג הקהילה.
 */
export const CommunityStatsModal: React.FC<CommunityStatsModalProps> = ({
  photos,
  onClose
}) => {
  const communityStats = getCommunityScores(photos);
  const { modals } = SITE_CONFIG;

  // מציאת סך כל ההצבעות שנרשמו
  const allVotesRaw = localStorage.getItem('kibbutz_60_all_votes');
  const totalVotesCount = allVotesRaw ? JSON.parse(allVotesRaw).length : 0;

  // מיון התמונות לפי סך הניקוד המצטבר בקהילה (מהגבוה לנמוך)
  const sortedPhotos = [...photos].sort((a, b) => {
    const scoreA = communityStats[a.id]?.totalPoints || 0;
    const scoreB = communityStats[b.id]?.totalPoints || 0;
    return scoreB - scoreA;
  });

  // מציאת הניקוד הגבוה ביותר עבור חישוב רוחב בר היחסי
  const maxScore = sortedPhotos.length > 0 ? (communityStats[sortedPhotos[0].id]?.totalPoints || 1) : 1;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-sky-100 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-800 space-y-6 max-h-[90vh] flex flex-col">
        
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-sky-50 hover:bg-sky-100 text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer"
          title="סגירה"
        >
          <X className="w-4 h-4" />
        </button>

        {/* כותרת החלונית */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-sky-50 text-[#2c7a66] border border-sky-100 text-xs font-semibold px-3.5 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>תצוגת מנהלי מערכת</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 font-sans">
            {modals.communityModalTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#635548]">
            {modals.totalVotesPrefix} {totalVotesCount} {modals.totalVotesSuffix}
          </p>
        </div>

        {/* רשימת התמונות המובילות לפי ניקוד קהילתי */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1">
          {sortedPhotos.map((photo, index) => {
            const stats = communityStats[photo.id] || { totalPoints: 0, voteCount: 0 };
            const percentage = Math.min(100, Math.round((stats.totalPoints / (maxScore || 1)) * 100));
            const rankMedal = `#${index + 1}`;

            return (
              <div key={photo.id} className="bg-white border border-[#ece7de] hover:border-[#ded8ce] rounded-2xl p-3.5 shadow-xs transition-colors space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 truncate">
                    <span className="w-8 h-8 rounded-xl bg-[#faf8f5] border border-[#ece7de] font-extrabold text-xs text-[#3d332a] flex items-center justify-center shrink-0">
                      {rankMedal}
                    </span>
                    <ImageBox
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-11 h-11 object-cover rounded-xl shrink-0 overflow-hidden"
                    />
                    <div className="truncate">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 font-sans truncate">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-[#635548]">
                        {photo.year} | {photo.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-left shrink-0">
                    <span className="font-bold text-xs text-[#2c7a66] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                      {stats.totalPoints} {modals.pointsText}
                    </span>
                  </div>
                </div>

                {/* בר התקדמות יחסי */}
                <div className="w-full bg-sky-50 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#63c7a9] to-[#5fb7e8] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, percentage)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-gradient-to-r from-[#2c7a66] to-[#5fb7e8] hover:opacity-95 text-white font-bold text-sm rounded-2xl transition-all duration-200 cursor-pointer shadow-xs"
        >
          סגירה
        </button>

      </div>
    </div>
  );
};
