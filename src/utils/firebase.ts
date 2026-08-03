import { VoteResult } from '../types';

// Optional Firebase initialization — reads config from Vite env vars (VITE_FIREBASE_*)
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
    if (!hasCfg) return;

    // dynamic imports so the code doesn't fail when firebase isn't installed/configured
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
 * Save vote either to Firestore (if configured) or to localStorage as fallback
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

    // Fallback: save locally
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

export function getCommunityScores(photos: Array<{ id: string; title: string }>) {
  const existingVotesRaw = localStorage.getItem('kibbutz_60_all_votes');
  const allVotes = existingVotesRaw ? JSON.parse(existingVotesRaw) : [];

  const stats: Record<string, { totalPoints: number; voteCount: number; rankPositions: number[] }> = {};
  photos.forEach((photo) => {
    stats[photo.id] = { totalPoints: 0, voteCount: 0, rankPositions: [] };
  });

  allVotes.forEach((vote: VoteResult) => {
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
    }
  });

  return stats;
}
