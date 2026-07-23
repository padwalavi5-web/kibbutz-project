export const SITE_TEXT = {
  appName: 'דירוג תמונות קיבוץ עלומים',
  introTitle: 'דירוג תמונות היסטוריות - משחק זיכרון וחגיגה משותפת',
  introSubtitle: 'בחרו את 10 התמונות המועדפות עליכם ודעו שכל תמונה מחוץ לסולם מקבלת 0 נקודות.',
  startButton: 'התחל הצבעה',
  poolTitle: 'גררו את התמונות המועדפות אל הסולם',
  poolDescription: 'גרירה ממאגר התמונות תעביר אתכם לסולם הדירוג. ניתן גם לעבור לסולם בלחיצה.',
  ladderTitle: 'סדרו את התמונות לפי חשיבות',
  ladderDescription: 'הדרגה הראשונה מקבלת 10 נקודות, העשירית מקבלת נקודה אחת. תמונות מחוץ לסולם מקבלות 0.',
  submitButton: 'שלח הצבעה',
  backButton: '← חזור למאגר',
  galleryCount: 'תמונות זמינות',
  ladderCount: 'מקומות בסולם',
  swapInfo: 'החלפה חופשית',
  scoreIntro: 'הנקודות יתעדכנו בזמן גרירה.',
  screen1: 'מסך 1 | מאגר תמונות',
  screen2: 'מסך 2 | סולם דירוג',
  howToTitle: 'איך מצביעים?',
  howToSteps: [
    'עיינו ב-15 התמונות ההיסטוריות.',
    'גררו תמונה למקום המתאים בסולם 10 הדירוגים.',
    'החליפו בין תמונות, החזירו למאגר ושלחו את ההצבעה.'
  ],
  howToHint: 'תמונה מחוץ לסולם תקבל 0 נקודות. כל דרגה מקבלת ניקוד מדורג: 10 עד 1.',
};

export const PHOTOS = [
  {
    id: 'photo_01',
    title: 'יום ההקמה',
    description: 'חברי הקיבוץ באוכל בשדה פתוח בתחילת הדרך.',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    year: '1956',
    photographer: 'אוסף הקיבוץ'
  },
  {
    id: 'photo_02',
    title: 'צהריים בחצר',
    description: 'ילדים ושחקים בזמן ארוחת צהריים משותפת.',
    imageUrl: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d0?auto=format&fit=crop&w=900&q=80',
    year: '1962',
    photographer: 'ארכיון משפחתי'
  },
  {
    id: 'photo_03',
    title: 'חגיגת קציר',
    description: 'תהלוכה לחג הקציר עם דגלים ושירי שמחה.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
    year: '1970',
    photographer: 'צלם קיבוץ'
  },
  {
    id: 'photo_04',
    title: 'כיתת לימוד פתוחה',
    description: 'ילדים לומדים בחוץ תחת עצים בימים של ילדות חופשית.',
    imageUrl: 'https://images.unsplash.com/photo-1491895200222-0fc4a3dcb7a7?auto=format&fit=crop&w=900&q=80',
    year: '1975',
    photographer: 'ארכיון הקיבוץ'
  },
  {
    id: 'photo_05',
    title: 'ערב מסיבה',
    description: 'תזמורת חיות וריקודים סביב למדורה.',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    year: '1980',
    photographer: 'צלם המקום'
  },
  {
    id: 'photo_06',
    title: 'דייגים על האגם',
    description: 'חברים קופצים לשחייה ומשתתפים בפעילות מים.',
    imageUrl: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=900&q=80',
    year: '1986',
    photographer: 'ארכיון בית תלים'
  },
  {
    id: 'photo_07',
    title: 'ברכות ליום העצמאות',
    description: 'הקהל בשירת ההמנון והברכות לחג.',
    imageUrl: 'https://images.unsplash.com/photo-1520962912210-cf45b1981b35?auto=format&fit=crop&w=900&q=80',
    year: '1990',
    photographer: 'צלם קהילה'
  },
  {
    id: 'photo_08',
    title: 'ארוחת ערב משפחתית',
    description: 'שולחן ארוך מלא בדגים, לחם וסלסלות ירקות.',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
    year: '1995',
    photographer: 'תיעוד חברתי'
  },
  {
    id: 'photo_09',
    title: 'עבודת שדה',
    description: 'חברים עובדים יחד בנטיעות ובגיזום עצים.',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    year: '2000',
    photographer: 'יחידת דיגום'
  },
  {
    id: 'photo_10',
    title: 'פינת זיכרון',
    description: 'מצבת זיכרון ושיח סביב אירוע קהילתי חשוב.',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    year: '2004',
    photographer: 'אוסף קיבוץ'
  },
  {
    id: 'photo_11',
    title: 'אירוע תרבות',
    description: 'מופע מוסיקה במסגרת חג הקיבוץ.',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    year: '2008',
    photographer: 'צלם חיצוני'
  },
  {
    id: 'photo_12',
    title: 'מפגש דורות',
    description: 'ילדים וזקנים יושבים יחד ומספרים סיפורים.',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
    year: '2012',
    photographer: 'תיעוד אירועים'
  },
  {
    id: 'photo_13',
    title: 'שמורת טבע',
    description: 'טיול משפחות בשבילים הציוריים של הקיבוץ.',
    imageUrl: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=900&q=80',
    year: '2016',
    photographer: 'צלם קיבוצי'
  },
  {
    id: 'photo_14',
    title: 'בנייה משותפת',
    description: 'חברים בונים מבנה קהילתי ביצירתיות ושיתוף פעולה.',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    year: '2019',
    photographer: 'ארכיון תפוז'
  },
  {
    id: 'photo_15',
    title: 'חיבוק סוף הדרך',
    description: 'סיום פעילות קהילתית עם חיוכים ותמונות יחד.',
    imageUrl: 'https://images.unsplash.com/photo-1520962912210-cf45b1981b35?auto=format&fit=crop&w=900&q=80',
    year: '2024',
    photographer: 'צלם אירועים'
  }
];
