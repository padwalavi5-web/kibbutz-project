/**
 * =========================================================================
 * דף 1: דף ההוראות (ScreenInstructions.tsx)
 * =========================================================================
 * מציג דף הוראות צבעוני, ברור וידידותי למובייל.
 */

import React from 'react';
import { SITE_CONFIG } from '../content';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import openingHeroImage from '../assets/images/kibbutz_opening_hero_2026.jpg';

interface ScreenInstructionsProps {
  onStartDrag: () => void;
}

export const ScreenInstructions: React.FC<ScreenInstructionsProps> = ({ onStartDrag }) => {
  const { instructionsPage, eventDetails } = SITE_CONFIG;
  const heroImageUrl = instructionsPage.heroImageUrl || openingHeroImage;
  const heroImageAlt = instructionsPage.heroImageAlt || 'תמונה לדף ההוראות';

  const displayFont = "'Noto Serif Hebrew', serif";
  const bodyFont = "'Noto Sans Hebrew', sans-serif";

  return (
    <div className="mx-auto max-w-5xl animate-fadeIn space-y-6 px-3 py-6 sm:px-4 sm:py-8 lg:py-10">
      <div className="relative overflow-hidden rounded-[32px] border border-sky-100 bg-gradient-to-br from-[#dff5fb] via-[#f4fbf7] to-[#f4ead2] shadow-[0_22px_60px_rgba(33,75,85,0.10)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-14 top-8 h-40 w-40 rounded-full bg-sky-200/35 blur-3xl" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-amber-200/30 blur-3xl" />
          <div
            className="absolute inset-x-0 bottom-0 h-28 opacity-90"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(244,232,196,0.45) 72%, rgba(216,176,104,0.24) 100%)'
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-14 opacity-60"
            style={{
              background:
                'repeating-linear-gradient(90deg, rgba(130, 92, 40, 0.16) 0 18px, rgba(130, 92, 40, 0.04) 18px 34px)'
            }}
          />
        </div>

        <div className="relative z-10 px-5 pt-6 text-center sm:px-8 sm:pt-8">
          <div className="mt-2 space-y-3">
            <h2
              className="text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.85)] sm:text-5xl lg:text-7xl"
              style={{ fontFamily: displayFont }}
            >
              עלומים בת 60!
            </h2>
            <p
              className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl lg:text-2xl"
              style={{ fontFamily: bodyFont }}
            >
              לאורך השנים נוצרו כמה תמונות אייקוניות ומרגשות במיוחד, מוזמנים לצפות, להתרשם ו... לדרג!
            </p>
          </div>
        </div>

        <div className="relative mt-6 px-4 sm:px-6">
          <div className="overflow-hidden rounded-[30px] border border-white/70 bg-[#f8f2e4] shadow-[0_18px_38px_rgba(33,75,85,0.12)]">
            <img
              src={heroImageUrl}
              alt={heroImageAlt}
              className="h-[20rem] w-full object-contain object-center p-2 sm:h-[28rem] lg:h-[36rem]"
            />
          </div>
        </div>

        <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8">
          <div className="mt-2 space-y-3 text-center">
            <h1
              className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: displayFont }}
            >
              {eventDetails.title} <span className="font-light text-slate-500">|</span> {eventDetails.subTitle}
            </h1>
            <p
              className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-slate-700 sm:text-xl lg:text-2xl"
              style={{ fontFamily: bodyFont }}
            >
              {instructionsPage.title}
            </p>
          </div>
        </div>
      </div>

      <div className="instructions-panel rounded-[32px] border border-sky-100 p-5 shadow-[0_18px_40px_rgba(33,75,85,0.09)] sm:p-7">
        <h2
          className="flex items-center gap-3 border-b border-sky-100 pb-4 text-2xl font-semibold text-slate-900 sm:text-3xl"
          style={{ fontFamily: bodyFont }}
        >
          <CheckCircle2 className="h-6 w-6 text-[#7c5c22]" />
          <span>{instructionsPage.subtitle}</span>
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {instructionsPage.steps.map((step) => (
            <div
              key={step.number}
              className="instruction-step flex flex-col justify-between space-y-4 rounded-[26px] border border-sky-100 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c5c22] to-[#5fb7e8] text-lg font-bold text-white shadow-sm"
                  style={{ width: '3.25rem', height: '3.25rem' }}
                >
                  {step.number}
                </span>
                <h3
                  className="text-xl font-semibold text-slate-900 sm:text-2xl"
                  style={{ fontFamily: bodyFont }}
                >
                  {step.title}
                </h3>
              </div>
              <p
                className="text-lg leading-relaxed text-slate-600 sm:text-xl"
                style={{ fontFamily: bodyFont }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 text-center">
          <button
            onClick={onStartDrag}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5c22] via-[#c99b54] to-[#5fb7e8] px-9 py-4 text-lg font-semibold text-white shadow-[0_16px_35px_rgba(124,92,34,0.22)] transition-all duration-300 hover:shadow-lg active:scale-95 sm:px-10 sm:py-5 sm:text-xl"
            style={{ fontFamily: bodyFont }}
          >
            <span>{instructionsPage.startButtonText}</span>
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
