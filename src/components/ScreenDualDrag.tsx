/**
 * =========================================================================
 * דף 2: דף גרירה כפול (ScreenDualDrag.tsx)
 * =========================================================================
 * מציג את מאגר התמונות ואת סולם הדירוג (10 מקומות).
 * מותאם באופן מלא לטלפונים ניידים - כולל גרירה במגע (Touch Drag & Drop),
 * תצוגה ניידת נוחה (טאבים ניידים / תצוגה כפולה למסכים רחבים), וכפתורי שיבוץ מהירים.
 */

import React, { useState, useRef } from 'react';
import { Photo, LadderSlot } from '../types';
import { SITE_CONFIG } from '../content';
import { ImageBox } from './ImageBox';
import { Plus, X, ArrowUp, ArrowDown, RefreshCw, Send, MoveLeft, Info, Grid, List, GripVertical } from 'lucide-react';

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

  // 1. ניהול גרירה במחשב ובנייד
  const [draggedPhotoId, setDraggedPhotoId] = useState<string | null>(null);
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);
  const [draggedPhotoTitle, setDraggedPhotoTitle] = useState<string>('');

  // 2. ניהול תצוגת המסך במובייל ('pool' | 'ladder')
  const [mobileTab, setMobileTab] = useState<'pool' | 'ladder'>('pool');

  // 3. ניהול מודל שיבוץ מהיר למובייל (בעת לחיצה על תמונה)
  const [quickAssignPhoto, setQuickAssignPhoto] = useState<Photo | null>(null);

  // ספירת תמונות שדורגו
  const rankedCount = ladderSlots.filter((s) => s.photoId !== null).length;
  const isLadderFull = rankedCount >= 10;

  const handleAssignToLadderInternal = (photoId: string, targetRank?: number) => {
    const wasRanked = getPhotoRank(photoId) !== null;
    const nextRankedCount = wasRanked ? rankedCount : rankedCount + 1;

    onAssignToLadder(photoId, targetRank);

    if (draggedPhotoId && !wasRanked && mobileTab === 'ladder' && nextRankedCount < 10) {
      setMobileTab('pool');
    }
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

  /**
   * טיפול בתחילת גרירה במגע (Touch Start)
   */
  const handleTouchStart = (photo: Photo, e: React.TouchEvent) => {
    const touch = e.touches[0];
    setDraggedPhotoId(photo.id);
    setDraggedPhotoTitle(photo.title);
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  /**
   * טיפול בתנועת אצבע (Touch Move)
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedPhotoId) return;
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });

    if (!isLadderFull && touch.clientX < window.innerWidth * 0.25 && mobileTab !== 'ladder') {
      setMobileTab('ladder');
    }
  };

  /**
   * טיפול בסיום גרירה במגע (Touch End)
   */
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!draggedPhotoId || !touchPos) {
      setDraggedPhotoId(null);
      setTouchPos(null);
      return;
    }

    const changedTouch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);

    if (dropTarget) {
      const slotElement = dropTarget.closest('[data-slot-rank]');
      if (slotElement) {
        const rankAttr = slotElement.getAttribute('data-slot-rank');
        if (rankAttr) {
          const targetRank = parseInt(rankAttr, 10);
          handleAssignToLadderInternal(draggedPhotoId, targetRank);
        }
      }
    }

    setDraggedPhotoId(null);
    setTouchPos(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 animate-fadeIn pb-24">
      
      {/* סרגל עליון ראשי - מותאם לסלולר */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 flex flex-wrap items-center gap-2.5">
              <span>{dragPage.pageHeaderTitle}</span>
              <span className="text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full">
                {rankedCount}/10 {dragPage.rankedStatusText}
              </span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 hidden sm:block">
              {dragPage.pageHeaderSubtitle}
            </p>
          </div>

          <button
            onClick={onGoToInstructions}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-2xl transition-all duration-200 cursor-pointer shrink-0"
          >
            {dragPage.instructionsButtonText}
          </button>
        </div>

        {/* מקשי פעולה מהירים ברורים למובייל */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={onResetLadder}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-sm font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{dragPage.resetButtonText}</span>
          </button>
 
          <button
            onClick={onSubmitVote}
            disabled={rankedCount === 0}
            className={`flex-1 py-3 rounded-2xl text-sm font-semibold shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              rankedCount > 0
                ? 'bg-slate-900 text-white hover:bg-slate-700 shadow-sm'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{dragPage.submitButtonText} ({rankedCount})</span>
          </button>
        </div>

        {/* מתג כרטיסיות מותאם למובייל בלבד (עבור בין מאגר התמונות לסולם) */}
        <div className="flex lg:hidden bg-slate-100 p-1 rounded-xl gap-1 text-xs font-semibold">
          <button
            onClick={() => setMobileTab('pool')}
            className={`flex-1 py-2 rounded-lg text-center transition-all ${
              mobileTab === 'pool' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {dragPage.tabPoolText} ({photos.length})
          </button>
          <button
            onClick={() => setMobileTab('ladder')}
            className={`flex-1 py-2 rounded-lg text-center transition-all ${
              mobileTab === 'ladder' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {dragPage.tabLadderText} ({rankedCount}/10)
          </button>
        </div>
      </div>
      {draggedPhotoId && mobileTab === 'pool' && !isLadderFull && (
        <div className="lg:hidden rounded-3xl border border-amber-200 bg-amber-50 text-amber-800 px-4 py-3 text-sm font-semibold shadow-sm">
          גרור שמאלה כדי לפתוח את סולם הדירוג ולהמשיך לשבץ
        </div>
      )}

      {/* תצוגה מרכזית - גרירה כפולה (מאגר + סולם) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* עמודה 1: מאגר התמונות */}
        <div
          className={`lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-4 space-y-3 sm:space-y-4 ${
            mobileTab === 'ladder' ? 'hidden lg:block' : 'block'
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

          {/* רשת התמונות במאגר */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-[650px] overflow-y-auto p-0.5">
            {photos.map((photo) => {
              const currentRank = getPhotoRank(photo.id);
              const isRanked = currentRank !== null;

              return (
                <div
                  key={photo.id}
                  draggable
                  onDragStart={(e) => {
                    setDraggedPhotoId(photo.id);
                    e.dataTransfer.setData('text/plain', photo.id);
                  }}
                  onDragEnd={() => setDraggedPhotoId(null)}
                  onTouchStart={(e) => handleTouchStart(photo, e)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`bg-white rounded-3xl border p-3 flex flex-col justify-between transition-all duration-200 shadow-sm cursor-grab active:cursor-grabbing touch-pan-y hover:shadow-lg ${
                    isRanked
                      ? 'border-slate-300 bg-slate-50 ring-1 ring-slate-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* תיבת התמונה */}
                  <div className="relative mb-2">
                    <ImageBox
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-32 rounded-xl overflow-hidden"
                    />

                    <div className="absolute top-2 left-2 bg-black/60 text-white p-1 rounded-md text-[10px] flex items-center gap-1 sm:hidden">
                      <GripVertical className="w-3.5 h-3.5" />
                      <span>{dragPage.dragBadgeText}</span>
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

                    <div className="pt-2 border-t border-[#f0ece5] flex items-center gap-2">
                      {isRanked ? (
                        <button
                          onClick={() => onRemoveFromLadder(photo.id)}
                          className="w-full py-2 bg-rose-50 hover:bg-rose-100/80 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>{dragPage.removeFromLadderText}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setQuickAssignPhoto(photo)}
                          className="w-full py-2 bg-slate-900 hover:bg-slate-700 text-white text-xs font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5 text-slate-200" />
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
            mobileTab === 'pool' ? 'hidden lg:block' : 'block'
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
          </div>

          {/* 10 המשבצות בסולם */}
          <div className="space-y-3 max-h-[650px] overflow-y-auto p-0.5">
            {ladderSlots.map((slot) => {
              const photo = getPhotoById(slot.photoId);

              return (
                <div
                  key={slot.rank}
                  data-slot-rank={slot.rank}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const photoId = e.dataTransfer.getData('text/plain') || draggedPhotoId;
                    if (photoId) {
                      onAssignToLadder(photoId, slot.rank);
                    }
                  }}
                  className={`p-3 rounded-3xl border transition-all duration-200 flex items-center gap-3 ${
                    photo
                      ? 'bg-slate-50 border-slate-200 shadow-sm'
                      : 'bg-slate-50 border-dashed border-slate-200 hover:border-slate-300'
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

      </div>

      {/* אלמנט תצוגת גרירה צף במגע (Touch Drag Overlay) למכשירים ניידים */}
      {draggedPhotoId && touchPos && (
        <div
          style={{
            position: 'fixed',
            left: `${touchPos.x - 60}px`,
            top: `${touchPos.y - 40}px`,
            pointerEvents: 'none',
            zIndex: 9999
          }}
          className="bg-slate-900 text-white px-3 py-2 rounded-2xl shadow-2xl font-semibold text-xs border border-slate-800 flex items-center gap-2 opacity-95"
        >
          <GripVertical className="w-4 h-4 text-slate-100" />
          <span>גורר: {draggedPhotoTitle}</span>
        </div>
      )}

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
