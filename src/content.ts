/**
 * =========================================================================
 * קובץ התצורה והתוכן המרכזי - הגדרות טקסטים וקישורי תמונות
 * =========================================================================
 * מדריך למשתמש:
 * -------------------------------------------------------------------------
 * 1. כדי לשנות טקסטים, כותרות או הוראות - עדכנו את הערכים בגרשיים בלבד.
 * 2. כדי להוסיף קישור לתמונה - הכניסו את כתובת ה-URL בשדה `imageUrl`.
 *    אם השדה `imageUrl` ריק (""), יוצג בתיבה הטקסט "הכנס כאן תמונה".
 * 3. ניתן להוסיף או למחוק תמונות מהמערך `PHOTOS_DATA`.
 * =========================================================================
 */

import { Photo } from './types';

export const SITE_CONFIG = {
  // פרטי האירוע והכותרת המרכזית
  eventDetails: {
    title: "חג המשק",
    subTitle: "60 לקיבוץ עלומים",
    dateText: "חמישי | 03.09.26 - כ\"א אלול תשפ\"ו",
    locationText: "דשא חתונות-עלומים",
    mainBannerImage: "", // הדבק כאן קישור לתמונת באנר (אופציונלי)
    welcomeMessage: "מחכים לראותכם!",
    programSchedule: [
      { time: "18:00", text: "קבלת פנים, ארוחת ערב ותערוכה" },
      { time: "19:45", text: "תפילת ערבית חגיגית" },
      { time: "20:00", text: "מופע מרכזי - 60 שנות יצירה וקהילה" }
    ]
  },

  // דף 1: הוראות
  instructionsPage: {
    title: "הוראות השתתפות בדירוג התמונות",
    subtitle: "מערכת דירוג תמונות ה-60 של עלומים",
    steps: [
      {
        number: "1",
        title: "עיינו במאגר התמונות",
        description: "במאגר מופיעות תמונות היסטוריות של הקיבוץ. עברו עליהן וקראו את התיאורים."
      },
      {
        number: "2",
        title: "גררו או שבצו בסולם",
        description: "בחרו את 10 התמונות החשובות ביותר לדעתכם ושבצו אותן ב-10 המקומות בסולם הדירוג."
      },
      {
        number: "3",
        title: "אישור ושליחה",
        description: "קבעו את הדירוג הסופי (מקום 1 ועד מקום 10) ולחצו על כפתור השליחה."
      }
    ],
    startButtonText: "מעבר לדף גרירה ודירוג התמונות 🚀"
  },

  // דף 2: דף גרירה כפול (מאגר + סולם)
  dragPage: {
    poolTitle: "מאגר התמונות",
    poolSubtitle: "גררו או לחצו על תמונה כדי לשבץ אותה בסולם",
    ladderTitle: "סולם הדירוג (10 מקומות)",
    ladderSubtitle: "סדרו את 10 התמונות הנבחרות לפי סדר החשיבות",
    submitButtonText: "אישור ושליחת דירוג 🎉",
    resetButtonText: "איפוס דירוג",
    emptySlotText: "גררו לכאן תמונה מהמאגר"
  },

  // 10 הדרגות בסולם הדירוג
  ladderRanks: [
    { rank: 1, title: "מקום 1", points: 10, badge: "🥇" },
    { rank: 2, title: "מקום 2", points: 9, badge: "🥈" },
    { rank: 3, title: "מקום 3", points: 8, badge: "🥉" },
    { rank: 4, title: "מקום 4", points: 7, badge: "⭐" },
    { rank: 5, title: "מקום 5", points: 6, badge: "🌟" },
    { rank: 6, title: "מקום 6", points: 5, badge: "✨" },
    { rank: 7, title: "מקום 7", points: 4, badge: "📸" },
    { rank: 8, title: "מקום 8", points: 3, badge: "🌱" },
    { rank: 9, title: "מקום 9", points: 2, badge: "🌻" },
    { rank: 10, title: "מקום 10", points: 1, badge: "🌾" }
  ]
};

/**
 * מערך התמונות - כרגע ללא קישורי תמונות חיצוניים.
 * בעת השארת imageUrl ריק (""), המערכת תציג תיבה שכתוב בה "הכנס כאן תמונה".
 */
export const PHOTOS_DATA: Photo[] = [
  {
    id: "photo_01",
    title: "תמונה 1",
    description: "תיאור תמונה 1",
    year: 1966,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_02",
    title: "תמונה 2",
    description: "תיאור תמונה 2",
    year: 1970,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_03",
    title: "תמונה 3",
    description: "תיאור תמונה 3",
    year: 1974,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_04",
    title: "תמונה 4",
    description: "תיאור תמונה 4",
    year: 1978,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_05",
    title: "תמונה 5",
    description: "תיאור תמונה 5",
    year: 1982,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_06",
    title: "תמונה 6",
    description: "תיאור תמונה 6",
    year: 1986,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_07",
    title: "תמונה 7",
    description: "תיאור תמונה 7",
    year: 1990,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_08",
    title: "תמונה 8",
    description: "תיאור תמונה 8",
    year: 1994,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_09",
    title: "תמונה 9",
    description: "תיאור תמונה 9",
    year: 1998,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_10",
    title: "תמונה 10",
    description: "תיאור תמונה 10",
    year: 2002,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_11",
    title: "תמונה 11",
    description: "תיאור תמונה 11",
    year: 2006,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_12",
    title: "תמונה 12",
    description: "תיאור תמונה 12",
    year: 2010,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_13",
    title: "תמונה 13",
    description: "תיאור תמונה 13",
    year: 2014,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_14",
    title: "תמונה 14",
    description: "תיאור תמונה 14",
    year: 2018,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  },
  {
    id: "photo_15",
    title: "תמונה 15",
    description: "תיאור תמונה 15",
    year: 2024,
    category: "כללי",
    imageUrl: "", // הכנס כאן קישור לתמונה
    photographer: ""
  }
];
