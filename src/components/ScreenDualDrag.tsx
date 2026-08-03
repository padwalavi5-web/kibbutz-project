/**
 * =========================================================================
 * דף 2: דף גרירה כפול (ScreenDualDrag.tsx)
 * =========================================================================
 * מציג את מאגר התמונות ואת סולם הדירוג (10 מקומות).
 * מותאם באופן מלא לטלפונים ניידים - כולל גרירה במגע (Touch Drag & Drop),
 * תצוגה ניידת נוחה (טאבים ניידים / תצוגה כפולה למסכים רחבים), וכפתורי שיבוץ מהירים.
 */

import React, { useState } from 'react';
import { Photo, LadderSlot } from '../types';
import { SITE_CONFIG } from '../content';
import { ImageBox } from './ImageBox';
import { Plus, X, RefreshCw, Send, ArrowUp, ArrowDown } from 'lucide-react';

interface ScreenDualDragProps {
  /** מערך התמונות במאגר */
  photos: Photo[];
  /** משבצות סולם הדירוג */
  ladderSlots: LadderSlot[];
  /** פונקציית שיבוץ תמונה בסולם */
  onAssignToLadder: (photoId: string, targetRank?: number) => void;
  /** פונקציית הסרת תמונה מהסולם */
  onRemoveFromLadder: (photoId: string) => void;
  /** פונקציה להזזת תמונה בסולם (למעלה/למטה) */
  onMoveSlot: (rank: number, direction: 'up' | 'down') => void;
  /** פונקציה לאיפוס הסולם */
  onResetLadder: () => void;
  /** פונקציה לשליחת הדירוג הסופי */
  onSubmitVote: () => void;
  /** פונקציית מעבר חזרה לדף ההוראות */
  onGoToInstructions: () => void;
}

export const ScreenDualDrag: React.FC<ScreenDualDragProps> = ({
  photos,
  ladderSlots,
  onAssignToLadder,
  onRemoveFromLadder,
  onMoveSlot,
  onResetLadder,
  onSubmitVote,
  onGoToInstructions
}) => {
  const { dragPage } = SITE_CONFIG;

  // 1. הסרנו את אפשרות הגרירה — משתמשים בכפתורי שיבוץ; הסולם מוסתר כבררת מחדל
  const [showLadder, setShowLadder] = useState<boolean>(false);
  const [quickAssignPhoto, setQuickAssignPhoto] = useState<Photo | null>(null);

  // ספירת תמונות שדורגו
  const rankedCount = ladderSlots.filter((s) => s.photoId !== null).length;
  const isLadderFull = rankedCount >= 10;

  const handleAssignToLadderInternal = (photoId: string, targetRank?: number) => {
    onAssignToLadder(photoId, targetRank);
    // נשארים בתצוגת התמונות — המשתמש צריך ללחוץ 'לסולם הדירוג' אם רוצה לראות את הסולם
  };

  /**
   * בודק באיזה מקום בסולם משובצת תמונה
   */
  const getPhotoRank = (photoId: string): number | null => {
    const slot = ladderSlots.find((s) => s.photoId === photoId);
    return slot ? slot.rank : null;
  };

  /**
   * מחזיר אובייקט תמונה לפי מזהה
   */
  const getPhotoById = (photoId: string | null): Photo | undefined => {
    if (!photoId) return undefined;
    return photos.find((p) => p.id === photoId);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 animate-fadeIn pb-24">
      
      {/* כותרת עליונה פשוטה (הסרנו את התיבה הגדולה)` */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            {dragPage.pageHeaderTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {dragPage.pageHeaderSubtitle}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span className="bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm text-sm font-semibold">
            {rankedCount}/10 {dragPage.rankedStatusText}
          </span>
          <button
            onClick={onGoToInstructions}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-2xl transition-all duration-200 cursor-pointer"
          >
            {dragPage.instructionsButtonText}
          </button>
        </div>
      </div>

      {/* מתג כרטיסיות מותאם למובייל בלבד (עבור בין מאגר התמונות לסולם) */}
      <div className="flex lg:hidden bg-slate-100 p-1 rounded-xl gap-1 text-xs font-semibold">
        <button
          onClick={() => setShowLadder(false)}
          className={`flex-1 py-2 rounded-lg text-center transition-all ${
            !showLadder ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {dragPage.tabPoolText} ({photos.length})
        </button>
        <button
          onClick={() => setShowLadder(true)}
          className={`flex-1 py-2 rounded-lg text-center transition-all ${
            showLadder ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {dragPage.tabLadderText} ({rankedCount}/10)
        </button>
      </div>

      {/* תצוגה מרכזית - גלריה תמונות או סולם (לפי בחירת המשתמש) */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        
        {/* עמודה 1: מאגר התמונות (מלא מסך כשהסולם מוסתר) */}
        <div
          className={`bg-white rounded-3xl p-4 space-y-3 sm:space-y-4 ${
            showLadder ? 'hidden' : 'block'
          }`}
        >
          <div className="border-b pb-3 border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-base sm:text-lg text-slate-900">
                {dragPage.poolTitle} ({photos.length})
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                גררו תמונה או לחצו עליה כדי לשבץ בסולם
              </p>
            </div>
          </div>

          {/* רשת התמונות במאגר (גרירה מושבתת) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 overflow-y-auto p-0.5">
            {photos.map((photo) => {
              const currentRank = getPhotoRank(photo.id);
              const isRanked = currentRank !== null;
 
              return (
                <div
                  key={photo.id}
                  className={`festive-card rounded-3xl p-3 flex flex-col justify-between transition-all duration-200 shadow-sm touch-none ${
                    isRanked
                      ? 'festive-card'
                     : 'festive-card-empty'
                  }`}
                >
                  {/* תיבת התמונה */}
                  <div className="relative mb-2">
                    <ImageBox
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full image-large rounded-xl overflow-hidden"
                    />

                    <div className="absolute top-2 left-2 bg-black/60 text-white p-1 rounded-md text-[11px] sm:hidden">
                      <span className="font-semibold">{dragPage.dragBadgeText}</span>
                    </div>

                    {isRanked && (
                      <span className="absolute top-2 right-2 bg-[#3d332a] text-[#f7f4ef] text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
                        {dragPage.rankBadgePrefix}{currentRank}
                      </span>
                    )}
                  </div>

                  {/* טקסט וכפתורי פעולה */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm text-[#2d241d] font-['Heebo']">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-[#635548] line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>

                    <div className="pt-2 border-t festive-sep flex items-center gap-2">
                      {isRanked ? (
                        <button
                          onClick={() => onRemoveFromLadder(photo.id)}
                          className="w-full py-3 bg-rose-50 hover:bg-rose-100/80 text-rose-700 text-sm font-semibold rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          <span>{dragPage.removeFromLadderText}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setQuickAssignPhoto(photo)}
                          className="w-full btn-large theme-btn text-sm font-semibold rounded-2xl transition-colors flex items-center justify-center gap-3 shadow-md"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>{dragPage.assignToLadderText}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* עמודה 2: סולם הדירוג - 10 מקומות */}
        <div
          className={`lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 space-y-4 shadow-sm ${
            !showLadder ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="border-b pb-3 border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-base sm:text-lg text-slate-900">
                {dragPage.ladderTitle}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {dragPage.ladderSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLadder(false)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-2xl transition-all duration-200 cursor-pointer"
              >
                {dragPage.closeLadderButtonText}
              </button>
            </div>
          </div>

          {/* 10 המשבצות בסולם */}
          <div className={`${showLadder ? 'block' : 'hidden'} space-y-3 max-h-[650px] overflow-y-auto p-0.5`}>
            {ladderSlots.map((slot) => {
              const photo = getPhotoById(slot.photoId);

              return (
                <div
                  key={slot.rank}
                  data-slot-rank={slot.rank}
                  className={`p-3 rounded-3xl border transition-all duration-200 flex items-center gap-3 ${
                    photo
                      ? 'bg-slate-50 border-slate-200 shadow-sm'
                      : 'bg-slate-50 border-dashed border-slate-200'
                  }`}
                >
                  {/* מספר הדרגה בסולם */}
                  <div className="flex flex-col items-center justify-center w-9 sm:w-10 shrink-0">
                    <span className="text-sm sm:text-base font-semibold text-slate-900">
                      #{slot.rank}
                    </span>
                  </div>

                  {/* תוכן המשבצת בסולם */}
                  <div className="flex-1 min-w-0">
                    {photo ? (
                      <div className="flex items-center gap-3">
                        <ImageBox
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0 overflow-hidden"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs sm:text-sm text-[#2d241d] font-['Heebo'] truncate">
                            {photo.title}
                          </h4>
                          <p className="text-[11px] text-[#635548] truncate hidden sm:block">
                            {photo.description}
                          </p>
                          <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md mt-1 inline-block border border-slate-200">
                            {slot.points} {dragPage.pointsText}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-3 text-center text-xs text-slate-500 font-medium">
                        {dragPage.emptySlotText}
                      </div>
                    )}
                  </div>

                  {/* כפתורי הזזה / הסרה מהסולם */}
                  {photo && (
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button
                        onClick={() => onMoveSlot(slot.rank, 'up')}
                        disabled={slot.rank === 1}
                        className="p-1 hover:bg-[#eae4d8] text-[#5e4b3c] rounded-lg disabled:opacity-30 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                        title="הזז למעלה"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemoveFromLadder(photo.id)}
                        className="p-1 hover:bg-slate-100 text-slate-600 rounded-lg cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                        title="הסר ממיקום זה"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onMoveSlot(slot.rank, 'down')}
                        disabled={slot.rank === 10}
                        className="p-1 hover:bg-[#eae4d8] text-[#5e4b3c] rounded-lg disabled:opacity-30 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                        title="הזז למטה"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* כפתורי פעולה בתחתית המסך (מובייל בלבד) */}
        <div className="lg:hidden col-span-12 mt-3 px-1">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowLadder(true)}
              className="w-full py-3 theme-btn font-semibold rounded-2xl shadow-sm text-lg"
            >
              {dragPage.openLadderButtonText}
            </button>
            <button
              onClick={onSubmitVote}
              disabled={rankedCount === 0}
              className={`w-full py-3 rounded-2xl text-lg font-semibold transition-colors ${rankedCount>0? 'theme-submit':'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            >
              {dragPage.submitButtonText} {rankedCount>0? `(${rankedCount})` : ''}
            </button>
          </div>
        </div>

      </div>

      {/* אלמנט תצוגת גרירה צף במגע (Touch Drag Overlay) למכשירים ניידים */}

      {/* מודל שיבוץ מהיר למובייל בלחיצה על תמונה */}
      {quickAssignPhoto && (
        <div className="fixed inset-0 bg-black/35 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full p-6 shadow-[0_40px_90px_rgba(15,23,42,0.16)] border border-slate-200 relative space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="font-semibold text-base text-slate-900">
                {dragPage.quickAssignTitlePrefix} {quickAssignPhoto.title}
              </h3>
              <button
                onClick={() => setQuickAssignPhoto(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {dragPage.quickAssignSubtitle}
            </p>

            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-1">
              {ladderSlots.map((slot) => {
                const occupant = getPhotoById(slot.photoId);
                return (
                  <button
                    key={slot.rank}
                    onClick={() => {
                      onAssignToLadder(quickAssignPhoto.id, slot.rank);
                      setQuickAssignPhoto(null);
                    }}
                    className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-3xl text-xs sm:text-sm font-semibold transition-all duration-200 text-right flex items-center justify-between cursor-pointer shadow-sm"
                  >
                    <span className="flex items-center gap-1.5 font-semibold">
                      <span>מקום #{slot.rank}</span>
                    </span>
                    <span className="text-[11px] opacity-75 truncate max-w-[90px]">
                      {occupant ? occupant.title : dragPage.freeSlotText}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setQuickAssignPhoto(null)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-3xl transition-colors cursor-pointer"
            >
              {dragPage.cancelButtonText}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
