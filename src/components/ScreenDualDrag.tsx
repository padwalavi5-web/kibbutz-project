/**
 * =========================================================================
 * דף 2: דף ההצבעה (ScreenDualDrag.tsx)
 * =========================================================================
 * מציג את מאגר התמונות ואת סולם הדירוג.
 */

import React, { useEffect, useState } from 'react';
import { Photo, LadderSlot } from '../types';
import { SITE_CONFIG } from '../content';
import { ImageBox } from './ImageBox';
import { PhotoDetailModal } from './PhotoDetailModal';
import { Plus, X, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react';

interface ScreenDualDragProps {
  photos: Photo[];
  ladderSlots: LadderSlot[];
  onAssignToLadder: (photoId: string, targetRank?: number) => void;
  onRemoveFromLadder: (photoId: string) => void;
  onMoveSlot: (rank: number, direction: 'up' | 'down') => void;
  onResetLadder: () => void;
  onSubmitVote: () => void;
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

  const [showLadder, setShowLadder] = useState(false);
  const [quickAssignPhoto, setQuickAssignPhoto] = useState<Photo | null>(null);
  const [selectedPhotoForDetail, setSelectedPhotoForDetail] = useState<Photo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem('kibbutz_60_has_submitted');
      setHasSubmitted(!!v);
    } catch {
      setHasSubmitted(false);
    }

    try {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setShowLadder(false);
      }
    } catch {
      // ignore
    }
  }, []);

  const rankedCount = ladderSlots.filter((s) => s.photoId !== null).length;

  const getPhotoRank = (photoId: string): number | null => {
    const slot = ladderSlots.find((s) => s.photoId === photoId);
    return slot ? slot.rank : null;
  };

  const getPhotoById = (photoId: string | null): Photo | undefined => {
    if (!photoId) return undefined;
    return photos.find((p) => p.id === photoId);
  };

  const handleSubmit = async () => {
    if (hasSubmitted || isSubmitting || rankedCount === 0) return;
    setIsSubmitting(true);
    try {
      const maybe: any = (onSubmitVote as any)();
      if (maybe && typeof maybe.then === 'function') {
        await maybe;
      }
      try {
        localStorage.setItem('kibbutz_60_has_submitted', '1');
      } catch {
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
    <div className="mx-auto max-w-7xl animate-fadeIn space-y-4 px-2 pb-24 pt-4 sm:space-y-6 sm:px-4 sm:py-6">
      <div className="relative overflow-hidden rounded-[32px] border border-sky-100 bg-gradient-to-br from-[#eef9ff] via-white to-[#f4f0e2] p-4 shadow-[0_22px_60px_rgba(33,75,85,0.10)] sm:p-5">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-0 h-32 w-32 rounded-full bg-sky-200/35 blur-3xl" />
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-200/25 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#e7cf9a]/35 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {dragPage.pageHeaderTitle}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              {dragPage.pageHeaderSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button
              onClick={onGoToInstructions}
              className="rounded-full border border-[#d8bf88] bg-white px-3 py-2 text-sm font-semibold text-[#7c5c22] transition-all duration-200 hover:bg-[#fff6e8]"
            >
              {dragPage.instructionsButtonText}
            </button>
            <button
              onClick={onResetLadder}
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-sky-50"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{dragPage.resetButtonText}</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={rankedCount === 0 || isSubmitting || hasSubmitted}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(124,92,34,0.18)] transition-all duration-200 ${
                hasSubmitted
                  ? 'cursor-not-allowed bg-sky-300'
                  : rankedCount > 0
                    ? 'bg-gradient-to-r from-[#7c5c22] via-[#c99b54] to-[#5fb7e8] hover:brightness-105'
                    : 'cursor-not-allowed bg-slate-300'
              }`}
            >
              {hasSubmitted ? 'ההצבעה נשלחה' : isSubmitting ? 'שולח...' : 'שליחת הצבעה'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <div
          className={`overflow-hidden rounded-[28px] border border-sky-100 bg-white/92 p-3 shadow-[0_18px_36px_rgba(33,75,85,0.06)] sm:p-4 ${
            showLadder ? 'hidden' : 'block'
          }`}
        >
          <div className="mb-4 flex items-center justify-between border-b border-sky-100 pb-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                {dragPage.poolTitle} ({photos.length})
              </h2>
              <p className="text-sm text-slate-600 sm:text-base">
                בחרו תמונות מהמאגר ושבצו אותן למקום הנכון
              </p>
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
                    <button
                      type="button"
                      onClick={() => setSelectedPhotoForDetail(photo)}
                      className="block w-full cursor-zoom-in overflow-hidden rounded-[18px] focus:outline-none focus:ring-2 focus:ring-[#7c5c22]/40"
                      aria-label={`הגדל את ${photo.title}`}
                    >
                      <ImageBox
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="image-large w-full overflow-hidden rounded-[18px] bg-white p-1"
                      />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-800">{photo.title}</h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-[#635548]">
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
                          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c5c22] via-[#c99b54] to-[#5fb7e8] px-3 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(124,92,34,0.16)] transition-all duration-200 hover:translate-y-[-1px]"
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
                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {dragPage.ladderTitle}
                  </h2>
                  <p className="text-xs text-slate-500 sm:text-sm">
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
                          ? 'border-sky-200 bg-sky-50 shadow-sm'
                          : 'border-dashed border-sky-200 bg-sky-50/70'
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
                            <button
                              type="button"
                              onClick={() => setSelectedPhotoForDetail(photo)}
                              className="block cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[#7c5c22]/40"
                              aria-label={`הגדל את ${photo.title}`}
                            >
                              <ImageBox
                                src={photo.imageUrl}
                                alt={photo.title}
                                className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white p-1 sm:h-14 sm:w-14"
                              />
                            </button>
                            <div className="min-w-0 flex-1">
                              <h4 className="truncate text-xs font-bold text-slate-800 sm:text-sm">
                                {photo.title}
                              </h4>
                              <p className="hidden truncate text-[11px] text-[#635548] sm:block">
                                {photo.description}
                              </p>
                              <span className="mt-1 inline-block rounded-md border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-[#2c7a66]">
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
                            className="flex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg p-1 text-[#2c7a66] transition-colors hover:bg-sky-100 disabled:opacity-30"
                            title="הזז למעלה"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onRemoveFromLadder(photo.id)}
                            className="flex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg p-1 text-slate-600 transition-colors hover:bg-sky-100"
                            title="הסר ממיקום זה"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onMoveSlot(slot.rank, 'down')}
                            disabled={slot.rank === 10}
                            className="flex min-h-[32px] min-w-[32px] items-center justify-center rounded-lg p-1 text-[#2c7a66] transition-colors hover:bg-sky-100 disabled:opacity-30"
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
              className="w-full rounded-2xl bg-gradient-to-r from-[#7c5c22] via-[#c99b54] to-[#5fb7e8] py-3 text-lg font-semibold text-white shadow-[0_12px_28px_rgba(124,92,34,0.18)]"
            >
              {dragPage.openLadderButtonText}
            </button>
            <button
              onClick={handleSubmit}
              disabled={rankedCount === 0 || isSubmitting || hasSubmitted}
              className={`w-full rounded-2xl py-3 text-lg font-semibold transition-colors ${
                hasSubmitted
                  ? 'cursor-not-allowed bg-sky-100 text-[#2c7a66]'
                  : rankedCount > 0
                    ? 'theme-submit'
                    : 'cursor-not-allowed bg-slate-200 text-slate-400'
              }`}
            >
              {hasSubmitted
                ? 'הדירוג נשלח'
                : isSubmitting
                  ? 'שולח...'
                  : dragPage.submitButtonText + (rankedCount > 0 ? ` (${rankedCount})` : '')}
            </button>
          </div>
        </div>
      </div>

      {quickAssignPhoto && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/30 p-3 backdrop-blur-sm sm:items-center">
          <div className="relative w-full max-w-md space-y-4 rounded-t-3xl border border-sky-100 bg-white p-6 shadow-[0_40px_90px_rgba(33,75,85,0.14)] sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">
                {dragPage.quickAssignTitlePrefix} {quickAssignPhoto.title}
              </h3>
              <button
                onClick={() => setQuickAssignPhoto(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-slate-600 transition-colors hover:bg-sky-100"
              >
                ×
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
                    className="flex items-center justify-between rounded-3xl border border-sky-200 bg-sky-50 p-3 text-right text-xs font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:bg-sky-100 sm:text-sm"
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
              className="w-full rounded-3xl bg-sky-50 px-3 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-sky-100"
            >
              {dragPage.cancelButtonText}
            </button>
          </div>
        </div>
      )}

      <PhotoDetailModal
        photo={selectedPhotoForDetail}
        onClose={() => setSelectedPhotoForDetail(null)}
        ladderSlots={ladderSlots}
        onAssignToLadder={onAssignToLadder}
        onRemoveFromLadder={onRemoveFromLadder}
      />
    </div>
  );
};
