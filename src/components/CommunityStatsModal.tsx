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
      <div className="bg-[#fefcf9] border border-[#e8e4dc] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-[#2d241d] space-y-6 max-h-[90vh] flex flex-col">
        
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#f4f0ea] hover:bg-[#eae4d8] text-[#635548] font-bold flex items-center justify-center transition-colors cursor-pointer"
          title="סגירה"
        >
          <X className="w-4 h-4" />
        </button>

        {/* כותרת החלונית */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#f4f0ea] text-[#7a5d37] border border-[#ded8ce] text-xs font-semibold px-3.5 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>תצוגת מנהלי מערכת</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#2d241d] font-['Heebo']">
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
                      <h4 className="font-bold text-xs sm:text-sm text-[#2d241d] font-['Heebo'] truncate">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-[#635548]">
                        {photo.year} | {photo.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-left shrink-0">
                    <span className="font-bold text-xs text-[#7a5d37] bg-[#f4f0ea] px-3 py-1 rounded-full border border-[#ded8ce]">
                      {stats.totalPoints} {modals.pointsText}
                    </span>
                  </div>
                </div>

                {/* בר התקדמות יחסי */}
                <div className="w-full bg-[#f4f0ea] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#d9bc8c] to-[#a88247] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, percentage)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#3d332a] hover:bg-[#524438] text-[#f7f4ef] font-bold text-sm rounded-2xl transition-all duration-200 cursor-pointer shadow-xs"
        >
          סגירה
        </button>

      </div>
    </div>
  );
};

