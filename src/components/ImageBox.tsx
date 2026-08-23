/**
 * =========================================================================
 * רכיב הצגת תמונה או תיבת מילוי מקום (ImageBox.tsx)
 * =========================================================================
 * מציג תמונה אם קיימת כתובת URL, או מציג תיבה מסודרת עם הכיתוב
 * "הכנס כאן תמונה" במידה והשדה ריק.
 */

import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageBoxProps {
  /** כתובת התמונה (אם ריקה, יוצג מילוי מקום) */
  src?: string;
  /** כותרת / טקסט חלופי */
  alt?: string;
  /** קלאסים מותאמים לעיצוב התיבה */
  className?: string;
}

/**
 * רכיב להצגת תמונה או מילוי מקום (Placeholder).
 * 
 * @param {ImageBoxProps} props - מאפייני הרכיב
 * @returns {JSX.Element} - אלמנט תמונה או תיבת "הכנס כאן תמונה"
 */
export const ImageBox: React.FC<ImageBoxProps> = ({
  src,
  alt = "תמונה",
  className = "w-full h-40"
}) => {
  // אם הוזנה כתובת תמונה תקפה
  if (src && src.trim() !== "") {
    return (
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`object-contain bg-white ${className}`}
      />
    );
  }

  // במידה ולא הוזנה תמונה - הצג תיבת מילוי מקום עם הכיתוב "הכנס כאן תמונה"
  return (
    <div
      className={`bg-slate-100/90 border-2 border-dashed border-slate-300/80 rounded-xl flex flex-col items-center justify-center p-3 text-slate-500 text-center select-none ${className}`}
    >
      <ImageIcon className="w-6 h-6 mb-1 text-slate-400" />
      <span className="text-xs font-bold">הכנס כאן תמונה</span>
    </div>
  );
};
