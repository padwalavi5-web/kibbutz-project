/**
 * =========================================================================
 * קובץ 1: הגדרות האתר, טקסטים, כותרות ועיצוב (site-config.ts)
 * =========================================================================
 * מדריך לעריכה קלה (ללא צורך בידע בתכנות):
 * -------------------------------------------------------------------------
 * 1. כדי לשנות כותרת, טקסט או כפתור - פשוט שנו את המילים שבתוך המרכאות (" ").
 * 2. כדי לשנות את צבעי האתר - עדכנו את קודי הצבע (לדוגמה "#2c2017") בחלק ה-theme.
 * 3. קובץ זה אחראי על כל המלל והמראה הכללי של האתר.
 *    (לעריכת התמונות עצמן, עברו לקובץ השני: photos-data.ts)
 * =========================================================================
 */

export const SITE_CONFIG = {
  // --- עיצוב וצבעי האתר (אופציונלי לשינוי) ---
  theme: {
    // עדכון לפלטת צבעים חגיגית בגווני ירוק וטורקיז — מתאים למראה שמח אך מקצועי
    primaryColor: "#0b7a44",      // ירוק כהה לכותרות וכפתורים (הוחזק קלות יותר)
    accentColor: "#18c06a",       // ירוק בוהק להדגשות
    secondaryAccent: "#05b7d8",   // טורקיז/כחול להרמוניה וחגיגיות
    buttonTextColor: "#ffffff",   // טקסט לבן על כפתורים בצבע
    // השתמש ב-gradient חוגג כרקע דף כך שהרקע לא יהיה לבן אלא ירוק/טורקיז עדין
    pageBackground: "linear-gradient(180deg, #ecfff3 0%, #e7fbf9 30%, #eaf8ff 100%)",
    fontFamily: "'Rubik', 'Assistant', sans-serif"
  },

  // --- פרטי האירוע והכותרת העליונה ---
  eventDetails: {
    title: "חג המשק",
    subTitle: "60 שנים לקיבוץ עלומים",
    dateText: "חמישי | 03.09.26 - כ\"א אלול תשפ\"ו",
    locationText: "דשא חתונות-עלומים",
    mainBannerImage: "", // קישור לבאנר (אם ריק - לא יוצג)
    welcomeMessage: "מחכים לראותכם!",
    programSchedule: [
      { time: "18:00", text: "קבלת פנים, ארוחת ערב ותערוכה" },
      { time: "19:45", text: "תפילת ערבית חגיגית" },
      { time: "20:00", text: "מופע מרכזי - 60 שנות יצירה וקהילה" }
    ]
  },

  // --- דף 1: הוראות השתתפות ---
  instructionsPage: {
    title: "הוראות השתתפות בדירוג התמונות",
    subtitle: "איך משתתפים בדירוג",
    heroImageUrl: "",
    heroImageAlt: "תמונה לדף הוראות",
    steps: [
      {
        number: "1",
        title: "עיינו במאגר התמונות",
        description: "במאגר מופיעות תמונות היסטוריות של הקיבוץ. עברו עליהן וקראו את התיאורים."
      },
      {
        number: "2",
        title: "שבצו",
        description: "בחרו את 10 התמונות החשובות ביותר לדעתכם ושבצו אותן ב-10 המקומות בסולם הדירוג."
      },
      {
        number: "3",
        title: "אישור ושליחה",
        description: "קבעו את הדירוג הסופי (מקום 1 ועד מקום 10) ולחצו על כפתור השליחה."
      }
    ],
    startButtonText: "מעבר לדירוג התמונות"
  },

  // --- דף 2: דף גרירה כפול (מאגר התמונות + סולם הדירוג) ---
  dragPage: {
    pageHeaderTitle: "דירוג תמונות ה-60",
    pageHeaderSubtitle: "שבצו תמונות ממאגר התמונות ישירות לתוך משבצות סולם הדירוג",
    instructionsButtonText: "הוראות",
    rankedStatusText: "דורגו",
    tabBothText: "תצוגה כפולה",
    tabPoolText: "מאגר",
    tabLadderText: "סולם",
    poolTitle: "מאגר התמונות",
    poolSubtitle: "לחצו על 'שבץ בסולם' בכל תמונה כדי לבחור מקום בסולם",
    ladderTitle: "סולם הדירוג",
    ladderSubtitle: "סמנו את 10 התמונות החשובות - ניתן להזיז ולהסיר בתוך הסולם",
    submitButtonText: "אישור ושליחת דירוג",
    resetButtonText: "איפוס דירוג",
    emptySlotText: "הקשו על תמונה במאגר כדי לשבץ",
    dragBadgeText: "לחץ לשיבוץ",
    rankBadgePrefix: "מקום #",
    removeFromLadderText: "הסר מסולם",
    assignToLadderText: "שבץ בסולם",
    pointsText: "נקודות",
    quickAssignTitlePrefix: "בחירת מקום בסולם עבור:",
    quickAssignSubtitle: "בחרו את הדרגה (מקום 1 עד מקום 10) שבה תרצו לשבץ את התמונה:",
    freeSlotText: "פנוי",
    cancelButtonText: "ביטול",
    openLadderButtonText: "פתח את סולם הדירוג",
    closeLadderButtonText: "חזור אל התמונות"
  },

  // --- 10 הדרגות בסולם הדירוג ---
  ladderRanks: [
    { rank: 1, title: "מקום 1", points: 10, badge: "" },
    { rank: 2, title: "מקום 2", points: 9, badge: "" },
    { rank: 3, title: "מקום 3", points: 8, badge: "" },
    { rank: 4, title: "מקום 4", points: 7, badge: "" },
    { rank: 5, title: "מקום 5", points: 6, badge: "" },
    { rank: 6, title: "מקום 6", points: 5, badge: "" },
    { rank: 7, title: "מקום 7", points: 4, badge: "" },
    { rank: 8, title: "מקום 8", points: 3, badge: "" },
    { rank: 9, title: "מקום 9", points: 2, badge: "" },
    { rank: 10, title: "מקום 10", points: 1, badge: "" }
  ],

  // --- טקסטים לחלונות קופצים (מודלים של סיכום וסטטיסטיקה) ---
  modals: {
    submissionTitle: "הדירוג נשלח בהצלחה!",
    submissionSubtitle: "חג המשק 60 שנים לקיבוץ עלומים",
    thankYouText: "תודה על ההשתתפות בעיצוב תערוכת ה-60 של עלומים! קולך נספר ונשמר בהצלחה.",
    summaryTitle: "סיכום דירוג 10 התמונות שלך:",
    shareWhatsAppText: "שיתוף בוואטסאפ",
    copySummaryText: "העתקת סיכום דירוג",
    copiedText: "הועתק ללוח!",
    communityStatsButton: "כניסת מנהל לתוצאות הקהילה",
    redraftButton: "שינוי דירוג מחדש",
    communityModalTitle: "תוצאות הקהילה - תמונות ה-60",
    communityModalSubtitle: "דירוג מצטבר מכלל ההצבעות של חברי ואורחי קיבוץ עלומים",
    totalVotesPrefix: "נרשמו עד כה",
    totalVotesSuffix: "הצבעות במערכת",
    pointsText: "נקודות",
    votesText: "הצבעות"
  },

  // --- הגדרות כניסה למנהל המערכת (לצפייה בתוצאות בלבד) ---
  admin: {
    pinCode: "6060", // קוד הגישה למנהל (ניתן לשינוי כאן)
    modalTitle: "כניסת מנהל מערכת",
    modalSubtitle: "הזינו קוד גישה לצפייה בריכוז תוצאות והצבעות הקהילה",
    inputPlaceholder: "הזינו קוד (ברירת מחדל: 6060)",
    loginButtonText: "כניסה לתוצאות",
    errorMessage: "קוד גישה שגוי, נסו שוב",
    footerLinkText: "כניסת מנהלים לתוצאות"
  }
};
