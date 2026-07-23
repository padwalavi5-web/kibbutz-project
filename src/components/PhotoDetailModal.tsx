/**
 * =========================================================================
 * רכיב חלונית תצוגת תמונה מוגדלת (PhotoDetailModal.tsx)
 * =========================================================================
 * מציג תמונה מוגדלת או תיבת "הכנס כאן תמונה" בצרוף תיאור וכפתורי שיבוץ.
 */

import React from 'react';
import { Photo, LadderSlot } from '../types';
import { ImageBox } from './ImageBox';
import { X, Camera, Award } from 'lucide-react';

interface PhotoDetailModalProps {
  photo: Photo | null;
  onClose: () => void;
  ladderSlots: LadderSlot[];
  onAssignToLadder: (photoId: string, targetRank?: number) => void;
  onRemoveFromLadder: (photoId: string) => void;
}

/**
 * רכיב מודל פרטי תמונה.
 */
export const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({
  photo,
  onClose,
  ladderSlots,
  onAssignToLadder,
  onRemoveFromLadder
}) => {
  if (!photo) return null;

  const currentSlot = ladderSlots.find((s) => s.photoId === photo.id);
  const isRanked = currentSlot !== undefined;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border-2 border-slate-300 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-[#2c2017] max-h-[90vh] flex flex-col">
        
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
          title="סגור חלונית"
        >
          <X className="w-5 h-5" />
        </button>

        {/* תמונה / תיבת מילוי מקום */}
        <div className="relative h-64 w-full bg-slate-100 flex items-center justify-center shrink-0">
          <ImageBox
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full"
          />
        </div>

        {/* תוכן ופרטים */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <h2 className="text-xl font-extrabold text-[#2c2017]">
              {photo.title}
            </h2>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md">
              {photo.category}
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {photo.description}
          </p>

          {/* כפתורי שיבוץ מהיר בסולם */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-[#2c2017] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#a87422]" />
                <span>שיבוץ בסולם הדירוג:</span>
              </h3>
              {isRanked && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  מדורג כעת במקום #{currentSlot.rank}
                </span>
              )}
            </div>

            {isRanked ? (
              <button
                onClick={() => {
                  onRemoveFromLadder(photo.id);
                  onClose();
                }}
                className="w-full py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                הסר תמונה זו מסולם הדירוג
              </button>
            ) : (
              <div className="grid grid-cols-5 gap-1.5">
                {ladderSlots.map((slot) => (
                  <button
                    key={slot.rank}
                    onClick={() => {
                      onAssignToLadder(photo.id, slot.rank);
                      onClose();
                    }}
                    className="p-2 bg-slate-100 hover:bg-[#2c2017] hover:text-[#f7e6cc] text-[#2c2017] rounded-xl text-xs font-bold transition-all text-center cursor-pointer border border-slate-200"
                  >
                    <span>#{slot.rank}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
