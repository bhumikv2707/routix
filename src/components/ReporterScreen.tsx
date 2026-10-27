import React, { useState } from 'react';
import { DefectCategory, DefectTicket, ScreenTab } from '../types';

interface ReporterScreenProps {
  onOpenDrawer: () => void;
  onNavigateTab: (tab: ScreenTab) => void;
  onSubmitReport: (ticket: Partial<DefectTicket>) => void;
  language: string;
  onSelectLanguage: (lang: string) => void;
}

export const ReporterScreen: React.FC<ReporterScreenProps> = ({
  onOpenDrawer,
  onNavigateTab,
  onSubmitReport,
  language,
  onSelectLanguage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DefectCategory>('pothole');
  const [severityGrade, setSeverityGrade] = useState<number>(4);
  const [notes, setNotes] = useState(
    'Severe pothole after monsoon rains causing two-wheeler skids. Water accumulation hides deep cavity during night.'
  );
  const [trackingMode, setTrackingMode] = useState<'anonymous' | 'verified'>('verified');
  const [phoneNumber, setPhoneNumber] = useState('98450 12894');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicketNo, setSubmittedTicketNo] = useState<string | null>(null);

  const getSeverityBadge = (level: number) => {
    switch (level) {
      case 1:
        return 'Level 1 - Minor Wear';
      case 2:
        return 'Level 2 - Surface Pitting';
      case 3:
        return 'Level 3 - Moderate Crater';
      case 4:
        return 'Level 4 - Critical';
      case 5:
        return 'Level 5 - Emergency Hazard';
      default:
        return 'Level 4 - Critical';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedNumber = `BLR-85-${Math.floor(4100 + Math.random() * 899)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicketNo(generatedNumber);

      onSubmitReport({
        ticketNumber: generatedNumber,
        title: `${selectedCategory === 'pothole' ? 'Edge-Collapse Pothole' : 'Road Defect'} near Marathahalli`,
        location: 'Outer Ring Road, Near Marathahalli Bridge, Bengaluru, Karnataka 560037',
        landmark: '[STN ORR-44+120] Near Marathahalli Flyover',
        severity: severityGrade as 1 | 2 | 3 | 4 | 5,
        category: selectedCategory,
        depthCm: 14,
        areaSqM: 1.2,
        communityVotes: 1,
        slaTargetHours: severityGrade >= 4 ? 24 : 48,
        slaRemainingHours: severityGrade >= 4 ? 24 : 48,
        slaPercentRemaining: 100,
        status: severityGrade >= 4 ? 'critical' : 'in_progress',
        currentStage: 1,
      });
    }, 700);
  };

  return (
    <div className="bg-background text-on-surface antialiased flex flex-col min-h-screen pb-28 selection:bg-primary selection:text-on-primary">
      {/* ================= TOP APP BAR ================= */}
      <header className="bg-surface docked full-width top-0 z-40 shadow-sm border-b border-outline-variant/40 sticky">
        <div className="flex justify-between items-center w-full px-margin-mobile py-space-sm max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDrawer}
              aria-label="Open Navigation Drawer"
              className="p-1 rounded text-on-surface-variant hover:bg-surface-container active:translate-y-px transition-transform duration-75 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[26px]">menu</span>
            </button>
            <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tight">
              ROUTIX Civic
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Offline sync status chip */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container text-tertiary font-label-sm text-label-sm font-semibold border border-outline-variant/30">
              <span
                className="material-symbols-outlined text-[16px] text-tertiary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                sync
              </span>
              <span className="hidden sm:inline">Ready to sync</span>
              <span className="px-1 py-0.2 rounded bg-tertiary text-on-tertiary text-[10px]">0</span>
            </div>
            <button
              aria-label="Sync telemetry data"
              className="p-1.5 rounded text-on-surface hover:bg-surface-container active:translate-y-px transition-transform duration-75 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">sync</span>
            </button>
          </div>
        </div>

        {/* Ward Context & Language Selector Sub-Bar */}
        <div className="bg-inverse-surface text-inverse-on-surface px-margin-mobile py-1.5 flex items-center justify-between font-label-md text-label-md border-t border-outline/20">
          <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap max-w-[70%]">
            <span className="material-symbols-outlined text-[16px] text-primary-fixed">location_city</span>
            <span className="text-white font-semibold tracking-wide truncate">
              BBMP Ward 85, Bengaluru East
            </span>
          </div>
          {/* Multi-language trigger (EN | ಕನ್ನಡ | हिंदी) */}
          <div className="flex items-center gap-1 text-[11px] font-label-sm font-medium bg-black/40 px-2 py-0.5 rounded border border-white/10 shrink-0">
            <button
              onClick={() => onSelectLanguage('EN')}
              className={`transition-colors cursor-pointer ${language === 'EN' ? 'text-primary-fixed font-bold' : 'text-white/60 hover:text-white'}`}
            >
              EN
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={() => onSelectLanguage('ಕನ್ನಡ')}
              className={`transition-colors cursor-pointer ${language === 'ಕನ್ನಡ' ? 'text-primary-fixed font-bold' : 'text-white/60 hover:text-white'}`}
            >
              ಕನ್ನಡ
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={() => onSelectLanguage('हिंदी')}
              className={`transition-colors cursor-pointer ${language === 'हिंदी' ? 'text-primary-fixed font-bold' : 'text-white/60 hover:text-white'}`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN REPORTING CANVAS ================= */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-gutter-mobile sm:px-margin pt-space-md space-y-space-md">
        {/* Screen Identifier Badge & Daylight Guidance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
              AI Defect Scanner
            </h1>
          </div>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">wb_sunny</span> Outdoor Calibrated
          </span>
        </div>

        {/* ================= CAMERA VIEWFINDER HUD (AI DETECTION) ================= */}
        <section className="bg-surface-container-lowest rounded-xl border-2 border-outline-variant overflow-hidden shadow-sm relative">
          {/* Camera Preview Viewport */}
          <div className="relative w-full aspect-[4/3] bg-inverse-surface overflow-hidden">
            {/* Live Asphalt Defect Imagery */}
            <img
              className="w-full h-full object-cover select-none"
              alt="Real-world Indian suburban road showing edge collapse pothole with standing water"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4jpmXNYpIwWbODvNG45BDFL9p0e6PH7Vpja4E9nJIT6V0igvQC5EvN7cqCeOQ1fe4F7FFe_DwoaON1nwsZMRCt_OGAl9-RkNbcqcyWKZwqrVd3G6LKr2yNGxtjzpmVteQYntpHTU5cYtOupqeqD7fI_3qY_hlDbnNqMGV4cn0_Rc4gaFU7FqWhNQuFOhKYsX-tCVoMReQEaQBxwlGYAbKOsgavShwbdB3WSDSq5gmmid7Dkqx6pHPNA"
            />
            {/* Optical Reticle / Grid Overlay Lines */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-30">
              <div className="border-r border-b border-white/40"></div>
              <div className="border-r border-b border-white/40"></div>
              <div className="border-b border-white/40"></div>
              <div className="border-r border-b border-white/40"></div>
              <div className="border-r border-b border-white/40"></div>
              <div className="border-b border-white/40"></div>
              <div className="border-r border-b border-white/40"></div>
              <div className="border-r border-b border-white/40"></div>
              <div></div>
            </div>

            {/* AI Real-Time Bounding Box (Pothole Defect Identified) */}
            <div className="absolute top-[28%] left-[18%] w-[64%] h-[56%] border-2 border-dashed border-primary bg-primary/10 rounded-lg pointer-events-none flex flex-col justify-between p-2 shadow-[0_0_15px_rgba(230,81,0,0.5)]">
              {/* Bounding Box Corner Reticles */}
              <div className="flex justify-between items-start">
                <span className="bg-primary text-on-primary font-label-sm text-label-sm px-1.5 py-0.5 rounded font-bold tracking-wider uppercase flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    warning
                  </span>
                  DEFECT #01 • CRITICAL
                </span>
                <span className="bg-black/75 text-amber-300 font-label-sm text-label-sm px-1.5 py-0.5 rounded border border-amber-400/40 font-mono">
                  CONF: 94.2%
                </span>
              </div>
              {/* Bottom Metric Marker on Box */}
              <div className="self-end bg-black/85 text-white font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1 border border-white/20">
                <span className="material-symbols-outlined text-[12px] text-tertiary-fixed">straighten</span>
                <span>~14cm Depth | 1.2m²</span>
              </div>
            </div>

            {/* Top Live HUD Bar */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center pointer-events-none">
              <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-xs text-white px-2 py-1 rounded font-label-sm text-label-sm border border-white/20">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span className="font-bold tracking-wider">LIVE EDGE-AI CAM</span>
              </div>
              <div className="flex items-center gap-1 bg-black/80 text-white px-2 py-1 rounded font-label-sm text-label-sm border border-white/20">
                <span className="material-symbols-outlined text-[14px] text-primary-fixed">auto_fix_high</span>
                <span>TENSOR ENGINE v4.2</span>
              </div>
            </div>

            {/* Telemetry Data Strip Overlay (Bottom of Viewfinder) */}
            <div className="absolute bottom-0 inset-x-0 bg-inverse-surface/95 text-white px-3 py-2 border-t border-primary/40 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs font-label-md text-label-md">
                <div className="flex items-center gap-1.5 text-primary-fixed">
                  <span className="material-symbols-outlined text-[16px] text-primary-fixed">radar</span>
                  <span className="font-bold uppercase tracking-wider">Telemetry:</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <span>Depth: <strong className="text-white font-mono">~14 cm</strong></span>
                  <span className="text-white/30">|</span>
                  <span>Area: <strong className="text-white font-mono">1.2 m²</strong></span>
                  <span className="text-white/30">|</span>
                  <span className="bg-red-600/90 text-white font-bold px-1.5 py-0.2 rounded text-[10px]">
                    HAZARD: 4/5
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Detection Result Banner (High Contrast Card Body) */}
          <div className="p-3 bg-amber-50 border-t-2 border-primary flex items-start gap-2.5">
            <span
              className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              error
            </span>
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center justify-between">
                <p className="font-headline-sm text-sm font-bold text-on-surface">
                  Edge-Collapse Pothole & Standing Monsoon Water
                </p>
                <span className="font-label-sm text-label-sm font-semibold text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/30">
                  94.2% Verified
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Classified as severe two-wheeler hazard. Immediate asphalt patching requested.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SMART DUPLICATE PREVENTION SAFEGUARD ================= */}
        <section className="bg-surface-container-low rounded-lg p-3.5 border-l-4 border-l-primary border-r border-t border-b border-outline-variant shadow-xs">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">merge_type</span>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-label-lg text-label-lg font-bold text-on-surface">
                  Duplicate Detection Guard
                </h2>
                <span className="bg-amber-200 text-amber-900 font-label-sm text-label-sm px-1.5 py-0.2 rounded font-bold">
                  Smart Merge
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                <strong className="text-on-surface">2 similar reports</strong> detected within 45m of this coordinate. Submitting will bundle your photo evidence into{' '}
                <span className="font-label-md text-label-md font-bold px-1 py-0.5 bg-secondary-container text-on-secondary-fixed rounded">
                  Ticket #BLR-85-4092
                </span>{' '}
                to accelerate municipal crew dispatch.
              </p>
            </div>
          </div>
        </section>

        {/* ================= GEOSPATIAL & TELEMETRY BANNER ================= */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-outline-variant/50">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[18px] text-tertiary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                gps_fixed
              </span>
              <span className="font-label-md text-label-md font-bold text-on-surface">
                Verified Geolocation Coordinates
              </span>
            </div>
            <div className="bg-inverse-surface text-cyan-300 font-label-sm text-label-sm px-2 py-0.5 rounded font-mono font-semibold">
              ±2.8m Accuracy
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Monospace Coordinates Badge */}
            <div className="bg-inverse-surface text-white p-2.5 rounded font-label-md text-label-md flex flex-col justify-center space-y-0.5">
              <div className="text-white/60 font-label-sm text-[10px] uppercase tracking-wider">
                Lat / Long Coordinates
              </div>
              <div className="text-tertiary-fixed font-bold font-mono tracking-wide">
                12.9568° N, 77.7011° E
              </div>
            </div>
            {/* Municipal Landmark / Chainage */}
            <div className="bg-surface-container-low p-2.5 rounded border border-outline-variant/60 flex flex-col justify-center">
              <div className="text-on-surface-variant font-label-sm text-[10px] uppercase font-bold tracking-wider">
                Chainage / Landmark
              </div>
              <div className="font-label-md text-label-md text-on-surface font-semibold truncate">
                [STN ORR-44+120] Near Marathahalli Flyover
              </div>
            </div>
          </div>
          {/* Human Readable Civic Address */}
          <div className="pt-1 flex items-start gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">pin_drop</span>
            <span>Outer Ring Road, Near Marathahalli Bridge, Bengaluru, Karnataka 560037</span>
          </div>
        </section>

        {/* ================= DEFECT CATEGORY PILLS ================= */}
        <section className="space-y-2">
          <label className="block font-label-lg text-label-lg font-bold text-on-surface">
            Road Defect Classification <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Pill 1: Pothole */}
            <button
              type="button"
              onClick={() => setSelectedCategory('pothole')}
              className={`flex items-center justify-between p-2.5 rounded-lg border-2 font-body-sm text-body-sm font-bold shadow-xs active:translate-y-px transition-all cursor-pointer ${
                selectedCategory === 'pothole'
                  ? 'border-primary bg-primary text-on-primary'
                  : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">
                  {selectedCategory === 'pothole' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
                <span>Pothole (Active)</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-white"></span>
            </button>

            {/* Pill 2: Waterlogging */}
            <button
              type="button"
              onClick={() => setSelectedCategory('waterlogging')}
              className={`flex items-center gap-1.5 p-2.5 rounded-lg border font-body-sm text-body-sm font-medium active:translate-y-px transition-all cursor-pointer ${
                selectedCategory === 'waterlogging'
                  ? 'border-2 border-primary bg-primary text-on-primary font-bold'
                  : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">water</span>
              <span>Waterlogging</span>
            </button>

            {/* Pill 3: Cracked Surface */}
            <button
              type="button"
              onClick={() => setSelectedCategory('cracked')}
              className={`flex items-center gap-1.5 p-2.5 rounded-lg border font-body-sm text-body-sm font-medium active:translate-y-px transition-all cursor-pointer ${
                selectedCategory === 'cracked'
                  ? 'border-2 border-primary bg-primary text-on-primary font-bold'
                  : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">broken_image</span>
              <span>Cracked Surface</span>
            </button>

            {/* Pill 4: Broken Kerb / Manhole */}
            <button
              type="button"
              onClick={() => setSelectedCategory('manhole')}
              className={`flex items-center gap-1.5 p-2.5 rounded-lg border font-body-sm text-body-sm font-medium active:translate-y-px transition-all cursor-pointer ${
                selectedCategory === 'manhole'
                  ? 'border-2 border-primary bg-primary text-on-primary font-bold'
                  : 'border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span>Broken Kerb / Manhole</span>
            </button>
          </div>
        </section>

        {/* ================= SEVERITY & DESCRIPTION INPUT FORM ================= */}
        <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 space-y-4 shadow-xs">
          {/* Severity Slider Gauge */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg font-bold text-on-surface" htmlFor="severity-range">
                Hazard Severity Grade
              </label>
              <span className="font-label-md text-label-md font-bold px-2 py-0.5 rounded bg-red-100 text-red-900 border border-red-300">
                {getSeverityBadge(severityGrade)}
              </span>
            </div>
            <input
              id="severity-range"
              type="range"
              min="1"
              max="5"
              value={severityGrade}
              onChange={(e) => setSeverityGrade(Number(e.target.value))}
              className="w-full h-3 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
            />
            <div className="flex justify-between font-label-sm text-[11px] text-on-surface-variant px-0.5">
              <span>Level 1 (Minor)</span>
              <span>Level 2</span>
              <span>Level 3 (Moderate)</span>
              <span className="font-bold text-primary">Level 4 (Critical)</span>
              <span className="font-bold text-red-700">Level 5 (Emergency)</span>
            </div>
          </div>

          {/* Description Note */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-label-md text-label-md font-bold text-on-surface" htmlFor="defect-notes">
                Field Observation Notes
              </label>
              <span className="text-xs text-on-surface-variant">Auto-Assisted</span>
            </div>
            <textarea
              id="defect-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white border border-outline-variant rounded-lg p-2.5 font-body-sm text-body-sm text-on-surface placeholder-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Privacy & Tracking Contact Mode */}
          <div className="pt-2 border-t border-outline-variant/60 space-y-3">
            <label className="block font-label-md text-label-md font-bold text-on-surface">
              Citizen Privacy & Tracking Updates
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Anonymous Option */}
              <label
                onClick={() => setTrackingMode('anonymous')}
                className={`flex items-center gap-2 cursor-pointer p-2.5 rounded-lg border flex-1 transition-all ${
                  trackingMode === 'anonymous'
                    ? 'border-2 border-primary bg-surface-container-lowest'
                    : 'bg-surface-container-low border-outline-variant'
                }`}
              >
                <input
                  type="radio"
                  name="reporting_mode"
                  value="anonymous"
                  checked={trackingMode === 'anonymous'}
                  onChange={() => setTrackingMode('anonymous')}
                  className="w-4 h-4 text-primary focus:ring-primary border-outline-variant"
                />
                <span className="font-body-sm text-body-sm text-on-surface font-medium">
                  Anonymous Submission
                </span>
              </label>

              {/* Verified SMS Option */}
              <label
                onClick={() => setTrackingMode('verified')}
                className={`flex items-center gap-2 cursor-pointer p-2.5 rounded-lg border-2 flex-1 transition-all ${
                  trackingMode === 'verified'
                    ? 'border-primary bg-surface-container-lowest'
                    : 'border-outline-variant bg-surface-container-low'
                }`}
              >
                <input
                  type="radio"
                  name="reporting_mode"
                  value="verified"
                  checked={trackingMode === 'verified'}
                  onChange={() => setTrackingMode('verified')}
                  className="w-4 h-4 text-primary focus:ring-primary border-outline-variant"
                />
                <div className="leading-tight">
                  <span className="font-body-sm text-body-sm font-bold text-on-surface block">
                    SMS Ticket Tracking
                  </span>
                  <span className="text-[11px] text-on-surface-variant">Real-time resolution alerts</span>
                </div>
              </label>
            </div>

            {/* Phone Number Input with +91 Indian Prefix */}
            {trackingMode === 'verified' && (
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-2.5 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container text-on-surface font-label-md text-label-md font-bold">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="flex-1 rounded-r-lg border border-outline-variant p-2.5 font-label-md text-label-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                />
              </div>
            )}
          </div>

          {/* ================= STICKY SUBMIT ACTION BUTTON ================= */}
          <div className="pt-2 pb-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] py-3.5 px-4 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-headline-sm text-sm sm:text-base font-bold tracking-tight shadow-md border-b-2 border-[#BF360C] flex items-center justify-center gap-2.5 active:translate-y-px transition-all duration-75 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isSubmitting ? 'hourglass_top' : 'send'}
              </span>
              <span>
                {isSubmitting
                  ? 'Generating Civic Ticket...'
                  : 'Submit Defect Report & Generate Civic Ticket'}
              </span>
            </button>
            <div className="text-center mt-1.5">
              <span className="font-label-sm text-[11px] text-on-surface-variant">
                Guaranteed under Karnataka Sakala Services Act • Ward SLA: 48 Hours
              </span>
            </div>
          </div>
        </form>

        {/* Successful Submission Modal */}
        {submittedTicketNo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-xl border-2 border-primary max-w-sm w-full p-5 space-y-4 shadow-2xl text-center">
              <div className="w-12 h-12 bg-tertiary-fixed text-on-tertiary-fixed rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px] text-tertiary">task_alt</span>
              </div>
              <div>
                <span className="text-xs font-bold text-secondary uppercase font-label-sm">
                  Civic Ticket Generated
                </span>
                <h3 className="font-headline-sm text-lg font-bold text-primary mt-0.5">
                  #{submittedTicketNo}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Your defect has been logged under BBMP Ward 85 dispatch queue. Live updates will be sent via SMS to +91 {phoneNumber}.
                </p>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded text-xs border border-outline-variant text-left space-y-1">
                <div className="flex justify-between">
                  <span className="text-secondary">Statutory SLA:</span>
                  <span className="font-bold text-error">48 Hours (Emergency)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Assigned Division:</span>
                  <span className="font-bold">East Div. AEE Sub-unit</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSubmittedTicketNo(null);
                    onNavigateTab('map');
                  }}
                  className="flex-1 py-2.5 px-3 bg-primary text-white font-bold rounded-lg text-xs hover:bg-primary-container"
                >
                  Track on Map
                </button>
                <button
                  onClick={() => setSubmittedTicketNo(null)}
                  className="py-2.5 px-3 bg-surface-container text-on-surface font-bold rounded-lg text-xs hover:bg-surface-container-high"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
