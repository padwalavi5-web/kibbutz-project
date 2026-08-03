/**
 * =========================================================================
 * דף 2: דף גרירה כפול (ScreenDualDrag.tsx)
 * =========================================================================
 * מציג את מאגר התמונות ואת סולם הדירוג (10 מקומות).
 * מותאם באופן מלא לטלפונים ניידים - כולל גרירה במגע (Touch Drag & Drop),
 * תצוגה ניידת נוחה (טאבים ניידים / תצוגה כפולה למסכים רחבים), וכפתורי שיבוץ מהירים.
 */

import React, { useState, useEffect } from 'react';
import { Photo, LadderSlot } from '../types';
import { SITE_CONFIG } from '../content';
import { ImageBox } from './ImageBox';
import { Plus, X, RefreshCw, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';

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

  // שמירה/מניעת שליחה כפולה
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem('kibbutz_60_has_submitted');
      setHasSubmitted(!!v);
    } catch (e) {
      setHasSubmitted(false);
    }

    // Ensure on small screens the ladder is hidden by default (guard against stale state or older builds)
    try {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setShowLadder(false);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // ספירת תמונות שדורגו
  const rankedCount = ladderSlots.filter((s) => s.photoId !== null).length;
  const isLadderFull = rankedCount >= 10;

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
   * טיפול בשליחת הדירוג — מונע שליחה כפולה ומייצר דגל מקומי
   */
  const handleSubmit = async () => {
    if (hasSubmitted || isSubmitting || rankedCount === 0) return;
    setIsSubmitting(true);
    try {
      const maybe = onSubmitVote();
      if (maybe && typeof (maybe as any).then === 'function') {
        await maybe;
      }
      try {
        localStorage.setItem('kibbutz_60_has_submitted', '1');
      } catch (e) {
        // ignore storage errors
      }
      setHasSubmitted(true);
    } catch (e) {
      console.error('submit failed', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl animate-fadeIn space-y-4 px-2 pb-24 pt-4 sm:px-4 sm:py-6 sm:space-y-6">
      <div className="overflow-hidden rounded-[28px] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/70 to-cyan-50/60 p-4 shadow-[0_20px_45px_rgba(11,122,68,0.08)] sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div>
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              {dragPage.pageHeaderTitle}
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {dragPage.pageHeaderSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <span className="rounded-full border border-emerald-100 bg-emerald-50/60 px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm">
              {rankedCount}/10 {dragPage.rankedStatusText}
            </span>
            <button
              onClick={onGoToInstructions}
              className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-200"
            >
              {dragPage.instructionsButtonText}
            </button>
            <button
              onClick={onResetLadder}
              className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 transition-all duration-200 hover:bg-amber-100"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{dragPage.resetButtonText}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <div
          className={`overflow-hidden rounded-[28px] border border-emerald-100 bg-white/90 p-3 shadow-[0_18px_36px_rgba(15,23,42,0.06)] sm:p-4 ${
            showLadder ? 'hidden' : 'block'
          }`}
        >
          <div className="mb-4 flex items-center justify-between border-b border-emerald-100 pb-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                {dragPage.poolTitle} ({photos.length})
              </h2>
              <p className="text-xs text-slate-500 sm:text-sm">
                לחצו על ״שבץ בסולם״ ובחרו את המיקום המועדף
              </p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {isLadderFull ? 'מלא' : 'ממתין'}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {photos.map((photo) => {
              const currentRank = getPhotoRank(photo.id);
              const isRanked = currentRank !== null;

              return (
                <div
                  key={photo.id}
                  className={`flex flex-col justify-between rounded-[24px] border p-3 shadow-sm transition-all duration-200 ${
                    isRanked ? 'festive-card' : 'festive-card-empty'
                  }`}
                >
                  <div className="relative mb-2">
                    <ImageBox
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full image-large overflow-hidden rounded-[18px]"
                    />

                    {isRanked && (
                      <span className="absolute right-2 top-2 rounded-full bg-[#2d241d]/90 px-2.5 py-1 text-[11px] font-semibold text-[#f7f4ef] shadow-sm">
                        {dragPage.rankBadgePrefix}{currentRank}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-['Heebo'] text-sm font-bold text-[#2d241d]">
                      {photo.title}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[#635548]">
                      {photo.description}
                    </p>

                    <div className="flex items-center gap-2 border-t border-slate-200/70 pt-2">
                      {isRanked ? (
                        <button
                          onClick={() => onRemoveFromLadder(photo.id)}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100"
                        >
                          <X className="h-4 w-4" />
                          <span>{dragPage.removeFromLadderText}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setQuickAssignPhoto(photo)}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0b7a44] via-[#18c06a] to-[#05b7d8] px-3 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(11,122,68,0.16)] transition-all duration-200 hover:translate-y-[-1px]"
                        >
                          <Plus className="h-4 w-4 text-white" />
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

        {showLadder && (
          <div className="fixed inset-0 z-50 overflow-auto bg-white p-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    {dragPage.ladderTitle}
                  </h2>
                  <p className="text-[11px] text-slate-500 sm:text-xs">
                    {dragPage.ladderSubtitle}
                  </p>
                </div>
                <button
                  onClick={() => setShowLadder(false)}
                  className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-200"
                >
                  {dragPage.closeLadderButtonText}
                </button>
              </div>

              <div className="max-h-[70vh] space-y-3 overflow-y-auto p-0.5">
                {ladderSlots.map((slot) => {
                  const photo = getPhotoById(slot.photoId);

                  return (
                    <div
                      key={slot.rank}
                      data-slot-rank={slot.rank}
                      className={`flex items-center gap-3 rounded-[20px] border p-3 transition-all duration-200 ${
                        photo
                          ? 'border-slate-200 bg-slate-50 shadow-sm'
                          : 'border-dashed border-slate-200 bg-slate-50/70'
                      }`}
                    >
                      <div className="flex w-9 shrink-0 flex-col items-center justify-center sm:w-10">
                        <span className="text-sm font-semibold text-slate-900 sm:text-base">
                          #{slot.rank}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        {photo ? (
                          <div className="flex items-center gap-3">
                            <ImageBox
                              src={photo.imageUrl}
                              alt={photo.title}
                              className="h-12 w-12 shrink-0 overflow-hidden rounded-xl sm:h-14 sm:w-14"
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="truncate font-['Heebo'] text-xs font-bold text-[#2d241d] sm:text-sm">
                                {photo.title}
                              </h4>
                              <p className="hidden truncate text-[11px] text-[#635548] sm:block">
                                {photo.description}
                              </p>
                              <span className="mt-1 inline-block rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                                {slot.points} {dragPage.pointsText}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="py-3 text-center text-xs font-medium text-slate-500">
                            {dragPage.emptySlotText}
                          </div>
                        )}
                      </div>

                      {photo && (
                        <div className="flex shrink-0 flex-col items-center gap-1">
                          <button
                            onClick={() => onMoveSlot(slot.rank, 'up')}
                            disabled={slot.rank === 1}
                            className="flex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg p-1 text-[#5e4b3c] transition-colors hover:bg-[#eae4d8] disabled:opacity-30"
                            title="הזז למעלה"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onRemoveFromLadder(photo.id)}
                            className="flex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg p-1 text-slate-600 transition-colors hover:bg-slate-100"
                            title="הסר ממיקום זה"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onMoveSlot(slot.rank, 'down')}
                            disabled={slot.rank === 10}
                            className="flex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg p-1 text-[#5e4b3c] transition-colors hover:bg-[#eae4d8] disabled:opacity-30"
                            title="הזז למטה"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setShowLadder(false)}
                  className="w-full rounded-3xl bg-slate-100 px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                >
                  {dragPage.closeLadderButtonText}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 px-1 lg:hidden">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowLadder(true)}
              className="w-full rounded-2xl bg-gradient-to-r from-[#0b7a44] via-[#18c06a] to-[#05b7d8] py-3 text-lg font-semibold text-white shadow-[0_12px_28px_rgba(11,122,68,0.18)]"
            >
              {dragPage.openLadderButtonText}
            </button>
            <button
              onClick={handleSubmit}
              disabled={rankedCount === 0 || isSubmitting || hasSubmitted}
              className={`w-full rounded-2xl py-3 text-lg font-semibold transition-colors ${
                hasSubmitted
                  ? 'cursor-not-allowed bg-emerald-100 text-emerald-800'
                  : rankedCount > 0
                    ? 'theme-submit'
                    : 'cursor-not-allowed bg-slate-200 text-slate-400'
              }`}
            >
              {hasSubmitted ? 'הדירוג נשלח' : isSubmitting ? 'שולח...' : dragPage.submitButtonText + (rankedCount > 0 ? ` (${rankedCount})` : '')}
            </button>
          </div>
        </div>
      </div>

      {quickAssignPhoto && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-3 backdrop-blur-sm sm:items-center">
          <div className="relative w-full max-w-md space-y-4 rounded-t-3xl border border-slate-200 bg-white p-6 shadow-[0_40px_90px_rgba(15,23,42,0.16)] sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">
                {dragPage.quickAssignTitlePrefix} {quickAssignPhoto.title}
              </h3>
              <button
                onClick={() => setQuickAssignPhoto(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              {dragPage.quickAssignSubtitle}
            </p>

            <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto p-1">
              {ladderSlots.map((slot) => {
                const occupant = getPhotoById(slot.photoId);
                return (
                  <button
                    key={slot.rank}
                    onClick={() => {
                      onAssignToLadder(quickAssignPhoto.id, slot.rank);
                      setQuickAssignPhoto(null);
                    }}
                    className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-3 text-right text-xs font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:bg-slate-100 sm:text-sm"
                  >
                    <span className="font-semibold">מקום #{slot.rank}</span>
                    <span className="max-w-[90px] truncate text-[11px] opacity-75">
                      {occupant ? occupant.title : dragPage.freeSlotText}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setQuickAssignPhoto(null)}
              className="w-full rounded-3xl bg-slate-100 px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
            >
              {dragPage.cancelButtonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
