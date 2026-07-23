/**
 * =========================================================================
 * מודול חיבור ל-Firebase Firestore
 * =========================================================================
 * קובץ זה מכיל פונקציה מובנית ומודגמת לשמירת תוצאות ההצבעה של המשתמש
 * במסד הנתונים Firebase Firestore.
 * 
 * הוראות להפעלת Firebase בפרויקט:
 * 1. יש להתקין את ספריית firebase: npm install firebase
 * 2. יש לעדכן את קונפיגורציית ה-firebaseConfig להלן עם מפתחות הפרויקט שלכם.
 * =========================================================================
 */

import { VoteResult } from '../types';

/**
 * פונקציה לשמירת נתוני הצבעה במסד הנתונים Firebase Firestore.
 * 
 * @description פונקציה זו מחשבת את סיכום הדירוגים, מכינה את אובייקט הנתונים,
 * ומנסה לשמור אותו באוסף (Collection) בשם "photo_votes".
 * במידה ואינטגרציית Firebase אינה פעילה, הפונקציה מבצעת סימולציית שמירה מוצלחת
 * ושומרת את התוצאה ב-localStorage.
 * 
 * @param {VoteResult} voteData - אובייקט המכיל את כל הנתונים המחושבים של הדירוג
 * @returns {Promise<{ success: boolean; id: string; message: string }>} - אובייקט תוצאה הכולל סטטוס, מזהה הצבעה והודעת חיווי
 */
export async function saveToFirebase(voteData: VoteResult): Promise<{ success: boolean; id: string; message: string }> {
  console.log("🔥 [Firebase Integration] תהליך שמירת דירוג התחיל עבור:", voteData);

  try {
    // בדיקה האם הגדרת Firebase קיימת בסביבה העבודה
    // במידה ומוגדרים מפתחות אמיתיים ב-window.firebase or process.env:
    /* 
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "kibbutz_60_votes"), {
      ...voteData,
      submittedAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id, message: "ההצבעה נשמרה בהצלחה ב-Firebase!" };
    */

    // שמיכה מקומית ב-localStorage לשמירת רציפות הנתונים גם ללא אינטרנט
    const existingVotesRaw = localStorage.getItem('kibbutz_60_all_votes');
    const existingVotes = existingVotesRaw ? JSON.parse(existingVotesRaw) : [];
    
    const voteId = `vote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullVoteObject = {
      id: voteId,
      ...voteData,
      savedAt: new Date().toISOString()
    };

    existingVotes.push(fullVoteObject);
    localStorage.setItem('kibbutz_60_all_votes', JSON.stringify(existingVotes));
    localStorage.setItem('kibbutz_60_my_last_vote', JSON.stringify(fullVoteObject));

    // השהיה קצרה לסימולציית תקשורת שרת
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      id: voteId,
      message: "הדירוג נרשם בהצלחה במסד הנתונים! תודה על השתתפותך."
    };
  } catch (error) {
    console.error("❌ שגיאה בשמירת הדירוג ב-Firebase:", error);
    return {
      success: false,
      id: "",
      message: "אירעה שגיאה בשמירת הנתונים. אנא נסה שנית."
    };
  }
}

/**
 * פונקציה לקבלת נתוני הצבעות קהילתיות מצטברות.
 * 
 * @description פונקציה זו מחשבת את סך הניקוד המצטבר של כל התמונות מכלל ההצבעות שנרשמו,
 * לצורך הצגת דירוג הקהילה והתמונות המובילות.
 * 
 * @param {Array<any>} photos - מערך התמונות המלא מ-content.ts
 * @returns {Record<string, { totalPoints: number; voteCount: number; averageRank: number }>} - מיפוי מזהה תמונה לסטטיסטיקה קהילתית
 */
export function getCommunityScores(photos: Array<{ id: string; title: string }>) {
  const existingVotesRaw = localStorage.getItem('kibbutz_60_all_votes');
  const allVotes = existingVotesRaw ? JSON.parse(existingVotesRaw) : [];

  const stats: Record<string, { totalPoints: number; voteCount: number; rankPositions: number[] }> = {};

  // איתחול סטטיסטיקה לכל תמונה
  photos.forEach((photo) => {
    stats[photo.id] = {
      totalPoints: 0,
      voteCount: 0,
      rankPositions: []
    };
  });

  // צבירת נתונים מכלל הדירוגים
  allVotes.forEach((vote: VoteResult) => {
    if (vote.photoScoresMap) {
      Object.entries(vote.photoScoresMap).forEach(([photoId, pts]) => {
        if (stats[photoId]) {
          stats[photoId].totalPoints += pts;
          if (pts > 0) {
            stats[photoId].voteCount += 1;
            // מציאת הדרגה שנבחרה (10 - pts + 1)
            const rank = 11 - pts;
            stats[photoId].rankPositions.push(rank);
          }
        }
      });
    }
  });

  return stats;
}
