/**
 * =========================================================================
 * לוגיקת חישוב ניקוד וניתוח הדירוגים - חג המשק 60
 * =========================================================================
 */

import { LadderSlot, Photo, VoteResult } from '../types';

/**
 * פונקציה לחישוב הניקוד המלא עבור כל התמונות בהתאם למיקומן בסולם הדירוג.
 * 
 * @description פונקציה זו עוברת על 10 הדרגות בסולם הדירוג, מחשבת את הניקוד שהוענק
 * לכל תמונה שנמצאת בסולם (מקום 1 = 10 נקודות, מקום 2 = 9 נקודות... מקום 10 = 1 נקודה),
 * ומעניקה 0 נקודות לכל התמונות שנשארו במאגר מחוץ לסולם.
 * 
 * @param {LadderSlot[]} ladderSlots - מערך 10 הדרגות בסולם הדירוג והתמונות המשובצות בהן
 * @param {Photo[]} allPhotos - מערך כל 15 התמונות ההיסטוריות ממאגר התמונות
 * @param {string} [voterName] - שם המצביע/ה (אופציונלי)
 * @returns {VoteResult} - אובייקט תוצאה מלא הכולל ניקוד לכל תמונה ומיפוי מקיף
 */
export function calculateScores(
  ladderSlots: LadderSlot[],
  allPhotos: Photo[],
  voterName: string = "חבר/ת קיבוץ"
): VoteResult {
  const photoScoresMap: Record<string, number> = {};
  
  // 1. איתחול כל 15 התמונות עם ניקוד התחלתי 0
  allPhotos.forEach((photo) => {
    photoScoresMap[photo.id] = 0;
  });

  const ladderSummary: Array<{ rank: number; photoId: string; points: number; title: string }> = [];
  let totalPointsAssigned = 0;

  // 2. חישוב הניקוד עבור תמונות המשובצות בסולם הדירוג
  ladderSlots.forEach((slot) => {
    if (slot.photoId) {
      const assignedPoints = slot.points; // למשל מקום 1 מעניק slot.points (10 נקודות)
      photoScoresMap[slot.photoId] = assignedPoints;
      totalPointsAssigned += assignedPoints;

      const matchingPhoto = allPhotos.find((p) => p.id === slot.photoId);
      ladderSummary.push({
        rank: slot.rank,
        photoId: slot.photoId,
        points: assignedPoints,
        title: matchingPhoto ? matchingPhoto.title : "תמונה"
      });
    }
  });

  // 3. החזרת אובייקט הנתונים המחושב
  return {
    voterName: voterName || "חבר/ת קיבוץ עלומים",
    timestamp: new Date().toLocaleString('he-IL'),
    ladder: ladderSummary,
    totalPointsAssigned: totalPointsAssigned,
    photoScoresMap: photoScoresMap
  };
}

/**
 * פונקציה לבדיקת מידת השלמת סולם הדירוג.
 * 
 * @description פונקציה זו בודקת כמה משבצות בסולם הדירוג אוכלסו בתמונות,
 * ומחזירה מידע לגבי מוכנות הטופס לשליחה.
 * 
 * @param {LadderSlot[]} ladderSlots - מערך 10 הדרגות בסולם
 * @returns {{ filledCount: number; isComplete: boolean; remainingCount: number }} - אובייקט סיכום סטטוס
 */
export function validateLadderCompletion(ladderSlots: LadderSlot[]): {
  filledCount: number;
  isComplete: boolean;
  remainingCount: number;
} {
  const filledCount = ladderSlots.filter((slot) => slot.photoId !== null).length;
  const remainingCount = 10 - filledCount;
  
  return {
    filledCount,
    isComplete: filledCount === 10,
    remainingCount
  };
}

/**
 * פונקציה ליצירת טקסט סיכום לשיתוף או העתקה.
 * 
 * @description פונקציה זו מחוללת הודעה מעוצבת בעברית המציגה את 3 התמונות המובילות שנבחרו
 * וקישור להצבעה.
 * 
 * @param {VoteResult} voteResult - תוצאת ההצבעה
 * @param {Photo[]} photos - מערך התמונות המלא
 * @returns {string} - מחרוזת טקסט מוכנה לשיתוף
 */
export function generateShareSummary(voteResult: VoteResult, photos: Photo[]): string {
  const top3 = voteResult.ladder.slice(0, 3);
  
  let text = `*הדירוג שלי לחג המשק 60 שנים לקיבוץ עלומים!*\n\n`;
  text += `התמונות המובילות שלי בסולם הדירוג:\n`;
  
  top3.forEach((item, index) => {
    const photo = photos.find((p) => p.id === item.photoId);
    const place = index === 0 ? "#1" : index === 1 ? "#2" : "#3";
    text += `${place} מקום ${item.rank}: ${photo ? photo.title : ''} (${photo ? photo.year : ''})\n`;
  });

  text += `\nבואו להצביע ולהשפיע גם אתם בתערוכת ה-60!`;
  return text;
}
