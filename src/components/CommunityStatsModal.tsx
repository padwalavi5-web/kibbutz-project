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
import { BarChart2, Award, X, Sparkles, TrendingUp } from 'lucide-react';

interface CommunityStatsModalProps {
  // מערך 15 התמונות המלא
  photos: Photo[];
  // פונקציית סגירת המודל
  onClose: () => void;
}

/**
 * רכיב מודל לתוצאות וסטטיסטיקת דירוג הקהילה.
 * 
 * @description מחשב את סך הניקוד שהצטבר לכל תמונה מכלל ההצבעות שנרשמו,
 * ומציג את דירוג התמונות המובילות לקראת תערוכת ה-60.
 * 
 * @param {CommunityStatsModalProps} props - פרופס כוללים תמונות וסגירת מודל
 * @returns {JSX.Element} - אלמנט מודל תוצאות הקהילה
 */
export const CommunityStatsModal: React.FC<CommunityStatsModalProps> = ({
  photos,
  onClose
}) => {
  const communityStats = getCommunityScores(photos);

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
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#fefcf8] border-2 border-[#c4903e] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-[#2c2017] space-y-6 max-h-[90vh] flex flex-col">
        
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* כותרת החלונית */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f2e6d3] text-[#8c5d18] mb-1">
            <BarChart2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#2c2017] font-['Heebo']">
            תוצאות הקהילה - תמונות ה-60
          </h2>
          <p className="text-xs text-[#6e5847]">
            נרשמו עד כה {totalVotesCount} הצבעות מחברי ואורחי קיבוץ עלומים
          </p>
        </div>

        {/* רשימת התמונות המובילות לפי ניקוד קהילתי */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1">
          {sortedPhotos.map((photo, index) => {
            const stats = communityStats[photo.id] || { totalPoints: 0, voteCount: 0 };
            const percentage = Math.min(100, Math.round((stats.totalPoints / (maxScore || 1)) * 100));
            const rankMedal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;

            return (
              <div key={photo.id} className="bg-white border border-[#e5d8c8] rounded-2xl p-3 shadow-xs space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 truncate">
                    <span className="w-7 h-7 rounded-xl bg-[#f4ebe0] font-extrabold text-xs text-[#2c2017] flex items-center justify-center shrink-0">
                      {rankMedal}
                    </span>
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-lg shrink-0 border border-gray-200"
                    />
                    <div className="truncate">
                      <h4 className="font-bold text-xs sm:text-sm text-[#2c2017] truncate">
                        {photo.title}
                      </h4>
                      <p className="text-[10px] text-gray-500">
                        {photo.year} | {photo.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-left shrink-0">
                    <span className="font-extrabold text-xs text-[#8c5d18] bg-[#fdf7ee] px-2.5 py-1 rounded-full border border-[#f0dfc8]">
                      {stats.totalPoints} נק'
                    </span>
                  </div>
                </div>

                {/* בר התקדמות יחסי */}
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#c4903e] to-[#8c5d18] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, percentage)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#2c2017] text-[#f7e6cc] font-bold text-sm rounded-xl hover:bg-[#423124] transition-colors cursor-pointer"
        >
          סגור תוצאות
        </button>

      </div>
    </div>
  );
};
