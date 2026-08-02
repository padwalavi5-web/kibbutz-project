/**
 * הגדרת טיפוסים עבור אפליקציית דירוג התמונות
 */

// טיפוס עבור תמונה בודדת במאגר
export interface Photo {
  id: string;             // מזהה ייחודי לתמונה (למשל photo_01)
  title: string;          // כותרת התמונה
  description: string;    // תיאור התמונה
  year: number | string;  // שנת הצילום
  category: string;       // קטגוריית התמונה
  imageUrl: string;       // נתיב קישור לתמונה (אם ריק - יוצג מילוי מקום "הכנס כאן תמונה")
  photographer?: string;  // שם הצלם (אופציונלי)
}

// טיפוס עבור משבצת בסולם הדירוג
export interface LadderSlot {
  rank: number;           // דרגה בסולם (1 עד 10)
  title: string;          // שם הדרגה (למשל: "מקום 1")
  points: number;         // ניקוד המשויך לדרגה זו (10 נקודות למקום 1, וכו')
  photoId: string | null; // מזהה התמונה המשובצת במשבצת זו (null אם ריק)
  badge?: string;         // מדליה/אייקון (🥇, 🥈, 🥉 וכו' - אופציונלי)
}

// טיפוס עבור תוצאת הצבעה סופית
export interface VoteResult {
  voterName?: string;     // שם המצביע (אופציונלי)
  voterEmail?: string;    // דוא"ל המצביע (אופציונלי)
  timestamp: string;      // חותמת זמן
  ladder: Array<{
    rank: number;
    photoId: string;
    points: number;
    title: string;
  }>;
  totalPointsAssigned: number; // סך כל הניקוד שהוענק
  photoScoresMap: Record<string, number>; // מיפוי מזהה תמונה -> ניקוד
}

// טיפוס למסכי האפליקציה (דף 1: הוראות, דף 2: דף גרירה כפול)
export type ScreenId = 'instructions' | 'drag';
