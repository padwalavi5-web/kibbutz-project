import { VoteResult } from '../types';

let firebaseInitialized = false;
let firebaseDb: any = null;

async function tryInitFirebase() {
  if (firebaseInitialized) return;

  try {
    const cfg = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
      appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
    };

    const hasCfg = cfg.apiKey && cfg.projectId && cfg.appId;
    if (!hasCfg) {
      console.warn('⚠️ Firebase env vars are missing.');
      return;
    }

    const firebaseApp = await import('firebase/app');
    const firestore = await import('firebase/firestore');

    const { initializeApp, getApps } = firebaseApp as any;
    const { getFirestore } = firestore as any;

    if (!getApps || (getApps && getApps().length === 0)) {
      initializeApp(cfg);
    }

    firebaseDb = getFirestore();
    firebaseInitialized = true;
    console.info('✅ Firebase initialized');
  } catch (e) {
    console.warn('⚠️ Firebase init skipped or failed:', e);
  }
}

/**
 * שמירת הצבעה ב-Firestore (או ב-localStorage במידה ואין חיבור)
 */
export async function saveToFirebase(voteData: VoteResult): Promise<{ success: boolean; id: string; message: string }> {
  console.log('🔥 [Firebase] saving vote', voteData);

  try {
    await tryInitFirebase();

    if (firebaseInitialized && firebaseDb) {
      try {
        const firestore = await import('firebase/firestore');
        const { collection, addDoc, serverTimestamp } = firestore as any;
        const docRef = await addDoc(collection(firebaseDb, 'kibbutz_60_votes'), {
          ...voteData,
          submittedAt: new Date().toISOString(),
          createdAt: serverTimestamp()
        });

        return { success: true, id: docRef.id, message: 'ההצבעה נשמרה בהצלחה ב-Firebase!' };
      } catch (e) {
        console.warn('Firebase write failed — falling back to localStorage', e);
      }
    }

    const existingVotesRaw = localStorage.getItem('kibbutz_60_all_votes');
    const existingVotes = existingVotesRaw ? JSON.parse(existingVotesRaw) : [];

    const voteId = `vote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullVoteObject = { id: voteId, ...voteData, savedAt: new Date().toISOString() };

    existingVotes.push(fullVoteObject);
    localStorage.setItem('kibbutz_60_all_votes', JSON.stringify(existingVotes));
    localStorage.setItem('kibbutz_60_my_last_vote', JSON.stringify(fullVoteObject));

    await new Promise((r) => setTimeout(r, 600));

    return { success: true, id: voteId, message: 'הדירוג נרשם בהצלחה (מקומי) — Firebase לא הוגדר.' };
  } catch (error) {
    console.error('❌ error saving vote', error);
    return { success: false, id: '', message: 'אירעה שגיאה בשמירת הנתונים. אנא נסה שנית.' };
  }
}

/**
 * שליפת כל ההצבעות מ-Firestore וחישוב הניקוד המצטבר
 */
export async function fetchCommunityVotes(): Promise<VoteResult[]> {
  try {
    await tryInitFirebase();

    if (firebaseInitialized && firebaseDb) {
      const firestore = await import('firebase/firestore');
      const { collection, getDocs } = firestore as any;
      const querySnapshot = await getDocs(collection(firebaseDb, 'kibbutz_60_votes'));
      
      const remoteVotes: VoteResult[] = [];
      querySnapshot.forEach((doc: any) => {
        remoteVotes.push(doc.data() as VoteResult);
      });

      return remoteVotes;
    }
  } catch (e) {
    console.warn('Failed to fetch from Firebase, falling back to localStorage', e);
  }

  const existingVotesRaw = localStorage.getItem('kibbutz_60_all_votes');
  return existingVotesRaw ? JSON.parse(existingVotesRaw) : [];
}

/**
 * חישוב הסטטיסטיקות עבור רשימת התמונות מתוך הנתונים שנשלפו
 */
export function getCommunityScores(photos: Array<{ id: string; title: string }>, votesList?: VoteResult[]) {
  const allVotes = votesList || (localStorage.getItem('kibbutz_60_all_votes') 
    ? JSON.parse(localStorage.getItem('kibbutz_60_all_votes')!) 
    : []);

  const stats: Record<string, { totalPoints: number; voteCount: number; rankPositions: number[] }> = {};
  photos.forEach((photo) => {
    stats[photo.id] = { totalPoints: 0, voteCount: 0, rankPositions: [] };
  });

  allVotes.forEach((vote: VoteResult) => {
    // תמיכה במבנה הנתונים שנשמר
    if (vote.photoScoresMap) {
      Object.entries(vote.photoScoresMap).forEach(([photoId, pts]) => {
        if (stats[photoId]) {
          stats[photoId].totalPoints += pts as number;
          if ((pts as number) > 0) {
            stats[photoId].voteCount += 1;
            const rank = 11 - (pts as number);
            stats[photoId].rankPositions.push(rank);
          }
        }
      });
    } else if (vote.ladder && Array.isArray(vote.ladder)) {
      vote.ladder.forEach((item: any) => {
        if (item.photoId && stats[item.photoId]) {
          const pts = item.points || 0;
          stats[item.photoId].totalPoints += pts;
          if (pts > 0) {
            stats[item.photoId].voteCount += 1;
            stats[item.photoId].rankPositions.push(item.rank || 1);
          }
        }
      });
    }
  });

  return stats;
}