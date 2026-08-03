/**
 * =========================================================================
 * הקומפוננטה המרכזית - אפליקציית דירוג תמונות (App.tsx)
 * =========================================================================
 * מנהלת את מצב הניווט (דף 1: הוראות, דף 2: דף גרירה כפול),
 * שיבוצי התמונות בסולם הדירוג, חישוב הניקוד ושמירת הנתונים ב-Firebase.
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, LadderSlot, Photo, VoteResult } from './types';
import { SITE_CONFIG, PHOTOS_DATA } from './content';
import { calculateScores } from './utils/scoring';
import { saveToFirebase } from './utils/firebase';

import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { ScreenInstructions } from './components/ScreenInstructions';
import { ScreenDualDrag } from './components/ScreenDualDrag';
import { PhotoDetailModal } from './components/PhotoDetailModal';
import { SubmissionModal } from './components/SubmissionModal';
import { CommunityStatsModal } from './components/CommunityStatsModal';
import { AdminLoginModal } from './components/AdminLoginModal';

export default function App() {
  // 1. ניהול מסך פעיל ('instructions' | 'drag')
  const [activeScreen, setActiveScreen] = useState<ScreenId>('instructions');

  // 2. ניהול סולם הדירוג (10 משבצות)
  const [ladderSlots, setLadderSlots] = useState<LadderSlot[]>(() => {
    const saved = localStorage.getItem('kibbutz_current_ladder');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // ניקוי אימוג'ים ישנים שנשמרו ב-localStorage בגרסאות קודמות
        return parsed.map((slot: LadderSlot) => ({
          ...slot,
          badge: "",
          title: `מקום ${slot.rank}`
        }));
      } catch (e) {
        console.error("שגיאה בטעינת דירוג שמור:", e);
      }
    }
    return SITE_CONFIG.ladderRanks.map((item) => ({
      rank: item.rank,
      title: item.title,
      points: item.points,
      photoId: null,
      badge: ""
    }));
  });

  // 3. ניהול תמונה נבחרת לתצוגה מוגדלת
  const [selectedPhotoForDetail, setSelectedPhotoForDetail] = useState<Photo | null>(null);

  // 4. ניהול תוצאות הצבעה ושליחה
  const [voteResult, setVoteResult] = useState<VoteResult | null>(null);
  const [isSavingVote, setIsSavingVote] = useState<boolean>(false);
  const [saveStatusMessage, setSaveStatusMessage] = useState<string>('');

  // 5. ניהול חלונית תוצאות הקהילה וכניסת מנהל
  const [showCommunityStats, setShowCommunityStats] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);

  // שמירת מצב הדירוג ב-localStorage
  useEffect(() => {
    localStorage.setItem('kibbutz_current_ladder', JSON.stringify(ladderSlots));
  }, [ladderSlots]);

  /**
   * פונקציה לניווט בין דף ההוראות (דף 1) לבין דף הגרירה הכפול (דף 2).
   * 
   * @param {ScreenId} screen - מזהה המסך ('instructions' | 'drag')
   * @returns {void}
   */
  const handleNavigateScreen = (screen: ScreenId): void => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * פונקציה לשיבוץ תמונה במשבצת ספציפית בסולם הדירוג.
   * 
   * @param {string} photoId - מזהה התמונה
   * @param {number} [targetRank] - מספר המשבצת בסולם (1-10, אופציונלי)
   * @returns {void}
   */
  const handleAssignToLadder = (photoId: string, targetRank?: number): void => {
    setLadderSlots((prevSlots: LadderSlot[]) => {
      const newSlots = [...prevSlots];
      const existingSlotIndex = newSlots.findIndex((s) => s.photoId === photoId);

      if (targetRank !== undefined) {
        const targetIndex = newSlots.findIndex((s) => s.rank === targetRank);
        if (targetIndex !== -1) {
          const occupantPhotoId = newSlots[targetIndex].photoId;
          if (existingSlotIndex !== -1) {
            newSlots[existingSlotIndex].photoId = occupantPhotoId;
          }
          newSlots[targetIndex].photoId = photoId;
        }
      } else {
        const emptySlotIndex = newSlots.findIndex((s) => s.photoId === null);
        if (emptySlotIndex !== -1) {
          if (existingSlotIndex !== -1) {
            newSlots[existingSlotIndex].photoId = null;
          }
          newSlots[emptySlotIndex].photoId = photoId;
        }
      }

      return newSlots;
    });
  };

  /**
   * פונקציה להסרת תמונה מסולם הדירוג.
   * 
   * @param {string} photoId - מזהה התמונה להסרה
   * @returns {void}
   */
  const handleRemoveFromLadder = (photoId: string): void => {
    setLadderSlots((prevSlots: LadderSlot[]) =>
      prevSlots.map((slot: LadderSlot) =>
        slot.photoId === photoId ? { ...slot, photoId: null } : slot
      )
    );
  };

  /**
   * פונקציה להזזת תמונה בסולם (למעלה/למטה).
   * 
   * @param {number} currentRank - הדרגה הנוכחית בסולם
   * @param {'up' | 'down'} direction - כיוון ההזזה
   * @returns {void}
   */
  const handleMoveSlot = (currentRank: number, direction: 'up' | 'down'): void => {
    const targetRank = direction === 'up' ? currentRank - 1 : currentRank + 1;
    if (targetRank < 1 || targetRank > 10) return;

    setLadderSlots((prevSlots: LadderSlot[]) => {
      const newSlots = [...prevSlots];
      const indexA = newSlots.findIndex((s) => s.rank === currentRank);
      const indexB = newSlots.findIndex((s) => s.rank === targetRank);

      if (indexA !== -1 && indexB !== -1) {
        const tempPhotoId = newSlots[indexA].photoId;
        newSlots[indexA].photoId = newSlots[indexB].photoId;
        newSlots[indexB].photoId = tempPhotoId;
      }
      return newSlots;
    });
  };

  /**
   * פונקציה לאיפוס כל המשבצות בסולם.
   * 
   * @returns {void}
   */
  const handleResetLadder = (): void => {
    if (window.confirm("האם לאפס את כל המשבצות בסולם?")) {
      setLadderSlots((prevSlots: LadderSlot[]) =>
        prevSlots.map((slot: LadderSlot) => ({ ...slot, photoId: null }))
      );
    }
  };

  /**
   * פונקציה לשליחת הדירוג הסופי ושמירה ב-Firebase.
   * 
   * @returns {Promise<void>}
   */
  const handleSubmitVote = async (): Promise<void> => {
    const calculatedResult = calculateScores(ladderSlots, PHOTOS_DATA);
    setVoteResult(calculatedResult);
    setIsSavingVote(true);
    setSaveStatusMessage("שומר את הדירוג במסד הנתונים...");

    const saveResponse = await saveToFirebase(calculatedResult);
    setIsSavingVote(false);
    setSaveStatusMessage(saveResponse.message);
  };

  // ספירת תמונות שדורגו בסולם
  const rankedCount = ladderSlots.filter((s) => s.photoId !== null).length;

  return (
    <div className="page-shell flex min-h-screen flex-col font-['Rubik','Assistant',sans-serif] text-[#2c2017]">
      
      {/* 1. כותרת עליונה */}
      <Header
        onNavigateScreen={() => handleNavigateScreen('instructions')}
        currentScreen={activeScreen}
      />

      {/* 2. סרגל ניווט בין 2 המסכים (דף 1: הוראות, דף 2: דף גרירה כפול) */}
      <NavigationTabs
        activeScreen={activeScreen}
        onSelectScreen={handleNavigateScreen}
        rankedCount={rankedCount}
      />

      {/* 3. תוכן המסך האקטיבי */}
      <main className="flex-1">
        {activeScreen === 'instructions' ? (
          <ScreenInstructions
            onStartDrag={() => handleNavigateScreen('drag')}
          />
        ) : (
          <ScreenDualDrag
            photos={PHOTOS_DATA}
            ladderSlots={ladderSlots}
            onAssignToLadder={handleAssignToLadder}
            onRemoveFromLadder={handleRemoveFromLadder}
            onMoveSlot={handleMoveSlot}
            onResetLadder={handleResetLadder}
            onSubmitVote={handleSubmitVote}
            onGoToInstructions={() => handleNavigateScreen('instructions')}
          />
        )}
      </main>

      {/* 4. מודלים קופצים */}
      
      {/* מודל פרטי תמונה */}
      <PhotoDetailModal
        photo={selectedPhotoForDetail}
        onClose={() => setSelectedPhotoForDetail(null)}
        ladderSlots={ladderSlots}
        onAssignToLadder={handleAssignToLadder}
        onRemoveFromLadder={handleRemoveFromLadder}
      />

      {/* מודל אישור ושליחת דירוג */}
      {voteResult && (
        <SubmissionModal
          voteResult={voteResult}
          allPhotos={PHOTOS_DATA}
          isSaving={isSavingVote}
          saveMessage={saveStatusMessage}
          onClose={() => setVoteResult(null)}
          onReset={() => {
            handleResetLadder();
            setVoteResult(null);
            handleNavigateScreen('drag');
          }}
          onOpenCommunityStats={() => {
            setVoteResult(null);
            setShowAdminLogin(true);
          }}
        />
      )}

      {/* מודל כניסת מנהלים */}
      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onSuccess={() => {
            setShowAdminLogin(false);
            setShowCommunityStats(true);
          }}
        />
      )}

      {/* מודל תוצאות קהילתיות (למנהלי מערכת בלבד) */}
      {showCommunityStats && (
        <CommunityStatsModal
          photos={PHOTOS_DATA}
          onClose={() => setShowCommunityStats(false)}
        />
      )}

      {/* פוטר תחתון נקי */}
      <footer className="mt-auto border-t border-white/20 bg-gradient-to-r from-[#2d241d] to-[#3f3226] px-4 py-4 text-xs text-[#f6ebd8] shadow-[0_-8px_24px_rgba(45,36,29,0.12)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-right">
          <p>מערכת דירוג תמונות ה-60 | קיבוץ עלומים</p>
          <button
            onClick={() => setShowAdminLogin(true)}
            className="font-semibold text-[#f1c97a] transition-colors hover:text-[#f9e0aa]"
          >
            {SITE_CONFIG.admin.footerLinkText}
          </button>
        </div>
      </footer>

    </div>
  );
}
