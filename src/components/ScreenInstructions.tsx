/**
 * =========================================================================
 * דף 1: דף הוראות (ScreenInstructions.tsx)
 * =========================================================================
* מציג דף הוראות צבעוני, ברור וידידותי למובייל.
 */

import React from 'react';
import { SITE_CONFIG } from '../content';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ScreenInstructionsProps {
 onStartDrag: () => void;
}

export const ScreenInstructions: React.FC<ScreenInstructionsProps> = ({ onStartDrag }) => {
 const { instructionsPage, eventDetails } = SITE_CONFIG;
 const heroImageUrl = instructionsPage.heroImageUrl;
 const heroImageAlt = instructionsPage.heroImageAlt || 'תמונה לדף הוראות';
 
 return (
   <div className="mx-auto max-w-4xl animate-fadeIn space-y-6 px-3 py-6 sm:px-4 sm:py-8 lg:py-10">
     <div className="rounded-[28px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-0 shadow-[0_20px_50px_rgba(33,75,85,0.08)]">
       {heroImageUrl ? (
         <div className="overflow-hidden rounded-[28px]">
           <img
             src={heroImageUrl}
             alt={heroImageAlt}
             className="h-56 w-full object-cover sm:h-72"
           />
         </div>
       ) : (
         <div className="flex h-56 items-center justify-center rounded-[28px] border border-dashed border-sky-200 bg-sky-50/70 px-6 text-center text-base text-slate-600 sm:h-72 sm:text-lg">
           הוסף כאן תמונה לדף ההוראות על ידי עדכון <span className="font-semibold text-slate-900">site-config.ts → instructionsPage.heroImageUrl</span>
         </div>
       )}

       <div className="relative overflow-hidden rounded-b-[28px] bg-gradient-to-br from-white via-sky-50 to-emerald-50 p-6 sm:p-9">
         <div className="relative z-10 text-center space-y-3">
           <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
             {eventDetails.title} <span className="font-light text-slate-500">|</span> {eventDetails.subTitle}
           </h1>
           <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
             {instructionsPage.title}
           </p>
         </div>
       </div>
     </div>
 
     <div className="rounded-[30px] border border-sky-100 bg-white/90 p-5 shadow-[0_18px_40px_rgba(33,75,85,0.06)] sm:p-7">
       <h2 className="flex items-center gap-2 border-b border-sky-100 pb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
         <CheckCircle2 className="h-5 w-5 text-[#2c7a66]" />
         <span>{instructionsPage.subtitle}</span>
       </h2>

       <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
         {instructionsPage.steps.map((step) => (
           <div
             key={step.number}
             className="flex flex-col justify-between space-y-4 rounded-[24px] border border-sky-50 bg-gradient-to-br from-white via-sky-50/70 to-emerald-50/60 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
           >
             <div className="flex items-center gap-3">
               <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2c7a66] to-[#5fb7e8] text-base font-bold text-white shadow-sm">
                 {step.number}
               </span>
               <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">{step.title}</h3>
             </div>
             <p className="text-base leading-relaxed text-slate-600 sm:text-lg">{step.description}</p>
           </div>
         ))}
       </div>

       <div className="mt-6 text-center">
         <button
           onClick={onStartDrag}
           className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2c7a66] via-[#63c7a9] to-[#5fb7e8] px-8 py-4 text-lg font-semibold text-white shadow-[0_16px_35px_rgba(44,122,102,0.2)] transition-all duration-300 hover:shadow-lg active:scale-95"
         >
           <span>{instructionsPage.startButtonText}</span>
           <ArrowLeft className="h-5 w-5 text-white" />
         </button>
       </div>
     </div>

   </div>
 );
};
