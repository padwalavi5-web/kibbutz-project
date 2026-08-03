/**
 * =========================================================================
 * דף 1: דף הוראות (ScreenInstructions.tsx)
 * =========================================================================
* מציג דף הוראות צבעוני, ברור וידידותי למובייל.
 */

import React from 'react';
import { SITE_CONFIG } from '../content';
import { ArrowLeft, CalendarDays, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

interface ScreenInstructionsProps {
 onStartDrag: () => void;
}

export const ScreenInstructions: React.FC<ScreenInstructionsProps> = ({ onStartDrag }) => {
 const { instructionsPage, eventDetails } = SITE_CONFIG;

 return (
   <div className="mx-auto max-w-4xl animate-fadeIn space-y-6 px-3 py-6 sm:px-4 sm:py-8 lg:py-10">
     <div className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-gradient-to-br from-[#f5fff8] via-white to-[#eefbff] p-6 shadow-[0_20px_50px_rgba(11,122,68,0.12)] sm:p-8">
       <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-emerald-400/15 via-cyan-400/10 to-transparent" />
       <div className="relative z-10 space-y-4 text-center">
         <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm">
           <Sparkles className="h-3.5 w-3.5" />
           <span>{instructionsPage.subtitle}</span>
         </div>

         <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
           {eventDetails.title} <span className="font-light text-slate-500">|</span> {eventDetails.subTitle}
         </h1>

         <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
           {instructionsPage.title}
         </p>

         <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-700">
           <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">
             <CalendarDays className="h-4 w-4 text-emerald-600" />
             {eventDetails.dateText}
           </span>
           <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">
             <MapPin className="h-4 w-4 text-sky-600" />
             {eventDetails.locationText}
           </span>
         </div>
       </div>
     </div>

     <div className="rounded-[30px] border border-emerald-100 bg-white/85 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-7">
       <h2 className="flex items-center gap-2 border-b border-emerald-100 pb-4 text-lg font-semibold text-slate-900 sm:text-xl">
         <CheckCircle2 className="h-5 w-5 text-emerald-600" />
         <span>{instructionsPage.subtitle}</span>
       </h2>

       <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
         {instructionsPage.steps.map((step) => (
           <div
             key={step.number}
             className="flex flex-col justify-between space-y-4 rounded-[24px] border border-emerald-50 bg-gradient-to-br from-white via-emerald-50/70 to-cyan-50/60 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
           >
             <div className="flex items-center gap-3">
               <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0b7a44] to-[#05b7d8] text-sm font-bold text-white shadow-sm">
                 {step.number}
               </span>
               <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
             </div>
             <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
           </div>
         ))}
       </div>
     </div>

     <div className="text-center">
       <button
         onClick={onStartDrag}
         className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0b7a44] via-[#18c06a] to-[#05b7d8] px-8 py-4 text-base font-semibold text-white shadow-[0_16px_35px_rgba(11,122,68,0.24)] transition-all duration-300 active:scale-95"
       >
         <span>{instructionsPage.startButtonText}</span>
         <ArrowLeft className="h-5 w-5 text-white" />
       </button>
     </div>
   </div>
 );
};
