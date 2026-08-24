/**
 * =========================================================================
 * קובץ 2: עריכת תמונות ותיאורים בלבד (photos-data.ts)
 * =========================================================================
 * מדריך לעריכת התמונות והתיאורים (ללא צורך בידע בתכנות):
 * -------------------------------------------------------------------------
 * 1. כדי לשנות שם תמונה - שנו את הטקסט שבשדה `title` (בתוך הגרשיים).
 * 2. כדי לשנות את התיאור - שנו את הטקסט שבשדה `description`.
 * 3. כדי לשלב תמונה אמיתית - הדביקו את הקישור (URL) של התמונה בשדה `imageUrl`.
 *    אם תשאירו את השדה `imageUrl: ""` ריק - יוצג באתר מילוי מקום: "הכנס כאן תמונה".
 * 4. תוכלו להוסיף עוד תמונות על ידי העתקת אחת החבילות (מצמד ה-{ ועד ה-},) ולהדביק למטה.
 * =========================================================================
 */

import { Photo } from '../types';
import photoOneImage from '../assets/images/photo-1.png';
import photoTwoImage from '../assets/images/photo-2.jpg';
import photoThreeImage from '../assets/images/photo-3.jpg';
import photoFourImage from '../assets/images/photo-4.jpg';
import photoFiveImage from '../assets/images/photo-5.jpg';
import photoSixImage from '../assets/images/photo-6.png';
import photoSevenImage from '../assets/images/photo-7.jpg';
import photoEightImage from '../assets/images/photo-8.jpg';
import photoNineImage from '../assets/images/photo-9.jpg';
import photoTenImage from '../assets/images/photo-10.jpg';
import photoElevenImage from '../assets/images/photo-11.png';
import photoTwelveImage from '../assets/images/photo-12.jpg';
import photoThirteenImage from '../assets/images/photo-13.jpg';
import photoFourteenImage from '../assets/images/photo-14.jpg';
import photoFifteenImage from '../assets/images/photo-15.jpg';

export const PHOTOS_DATA: Photo[] = [
  {
    id: "photo_01",
    title: "תמונה 1",
    description: "שלט הכניסה של הקיבוץ 1966",
    year: 1966,
    category: "כללי",
    imageUrl: photoOneImage,
    photographer: ""
  },
  {
    id: "photo_02",
    title: "תמונה 2",
    description: "⁠גגות אדומים- בנייה ראשונה בקיבוץ",
    year: 1970,
    category: "כללי",
    imageUrl: photoTwoImage,
    photographer: ""
  },
  {
    id: "photo_03",
    title: "תמונה 3",
    description: "החיים בתחילת הדרך- בנייה בעלומים",
    year: 1974,
    category: "כללי",
    imageUrl: photoThreeImage,
    photographer: ""
  },
  {
    id: "photo_04",
    title: "תמונה 4",
    description: "⁠עלומים בראשיתה",
    year: 1978,
    category: "כללי",
    imageUrl: photoFourImage,
    photographer: ""
  },
  {
    id: "photo_05",
    title: "תמונה 5",
    description: "⁠בית הכנסת בבנייה 1978",
    year: 1982,
    category: "כללי",
    imageUrl: photoFiveImage,
    photographer: ""
  },
  {
    id: "photo_06",
    title: "תמונה 6",
    description: "לפני עידן הטכנולוגיה- סמלי הקיבוץ",
    year: 1986,
    category: "כללי",
    imageUrl: photoSixImage,
    photographer: ""
  },
  {
    id: "photo_07",
    title: "תמונה 7",
    description: "חג המשק ה-20 1986",
    year: 1990,
    category: "כללי",
    imageUrl: photoSevenImage,
    photographer: ""
  },
  {
    id: "photo_08",
    title: "תמונה 8",
    description: "⁠עלומים חוגגת 25 1991",
    year: 1994,
    category: "כללי",
    imageUrl: photoEightImage,
    photographer: ""
  },
  {
    id: "photo_09",
    title: "תמונה 9",
    description: "יריד פורים",
    year: 1998,
    category: "כללי",
    imageUrl: photoNineImage,
    photographer: ""
  },
  {
    id: "photo_10",
    title: "תמונה 10",
    description: "⁠הגששים של עלומים- גבי בנג׳ו ויונה",
    year: 2002,
    category: "כללי",
    imageUrl: photoTenImage,
    photographer: ""
  },
  {
    id: "photo_11",
    title: "תמונה 11",
    description: "עלומים בהופעה- טוביה החולב",
    year: 2006,
    category: "כללי",
    imageUrl: photoElevenImage,
    photographer: ""
  },
  {
    id: "photo_12",
    title: "תמונה 12",
    description: "⁠מוסך עלומים",
    year: 2010,
    category: "כללי",
    imageUrl: photoTwelveImage,
    photographer: ""
  },
  {
    id: "photo_13",
    title: "תמונה 13",
    description: "⁠מהדקים כותנה",
    year: 2014,
    category: "כללי",
    imageUrl: photoThirteenImage,
    photographer: ""
  },
  {
    id: "photo_14",
    title: "תמונה 14",
    description: "⁠רפת עלומים",
    year: 2018,
    category: "כללי",
    imageUrl: photoFourteenImage,
    photographer: ""
  },
  {
    id: "photo_15",
    title: "תמונה 15",
    description: "⁠יקצרו ברינה- גד״ש עלומים",
    year: 2024,
    category: "כללי",
    imageUrl: photoFifteenImage,
    photographer: ""
  }
];
