import React, { useState } from 'react';
import { DefectTicket, ScreenTab } from '../types';

interface MapTrackerScreenProps {
  tickets: DefectTicket[];
  onSelectTicket: (ticket: DefectTicket) => void;
  onNavigateTab: (tab: ScreenTab) => void;
  onOpenDrawer: () => void;
  onOpenTelemetry: (ticketNumber: string) => void;
  onOpenCertificate: (ticketNumber: string) => void;
  onUpvoteTicket: (ticketId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const MapTrackerScreen: React.FC<MapTrackerScreenProps> = ({
  tickets,
  onNavigateTab,
  onOpenDrawer,
  onOpenTelemetry,
  onOpenCertificate,
  onUpvoteTicket,
  searchQuery,
  onSearchChange,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ward' | 'monsoon' | 'traffic' | 'audit'>('ward');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPinId, setSelectedPinId] = useState<string>('ticket-4092');
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // The featured ticket on Map Tracker is #BLR-85-4092
  const featuredTicket = tickets.find((t) => t.id === 'ticket-4092') || tickets[0];
  const nearbyClosedTicket = tickets.find((t) => t.id === 'ticket-1804') || tickets[2];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 900);
  };

  const handleShare = () => {
    setCopiedShare(true);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="bg-background text-on-surface antialiased pb-28 selection:bg-primary selection:text-on-primary min-h-screen">
      {/* ================= TOP APP BAR ================= */}
      <header className="bg-surface docked full-width top-0 sticky z-40 shadow-sm border-b border-outline-variant/50">
        <div className="flex justify-between items-center w-full px-margin-mobile py-space-sm max-w-5xl mx-auto">
          <div className="flex items-center gap-space-sm">
            <button
              onClick={onOpenDrawer}
              aria-label="Menu Drawer"
              className="p-space-xs text-primary hover:bg-surface-container rounded-lg active:translate-y-px transition-transform duration-75 flex items-center justify-center cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tight">
              ROUTIX Civic
            </span>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="hidden sm:inline-flex items-center gap-1 font-label-sm text-label-sm bg-surface-container px-2 py-1 rounded-md text-on-surface">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span> BBMP Live
            </span>
            <button
              onClick={handleSync}
              aria-label="Synchronize Records"
              className="p-space-xs text-primary hover:bg-surface-container rounded-lg active:translate-y-px transition-transform duration-75 flex items-center justify-center cursor-pointer"
              type="button"
            >
              <span className={`material-symbols-outlined text-[22px] ${isSyncing ? 'animate-spin' : ''}`}>
                sync
              </span>
            </button>
          </div>
        </div>

        {/* Search & Filter Ribbon */}
        <div className="px-margin-mobile pb-space-sm pt-space-xs bg-surface max-w-5xl mx-auto">
          <div className="flex items-center gap-space-xs">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-outline"
                placeholder="Search Ward, Pin Code or Landmark e.g. Koramangala, Indiranagar"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <button
              onClick={() => setActiveFilter(activeFilter === 'ward' ? 'monsoon' : 'ward')}
              className="flex items-center justify-center h-[44px] px-3.5 bg-surface-container text-on-surface rounded-lg border border-outline-variant hover:bg-surface-container-high active:translate-y-px transition-transform cursor-pointer"
              type="button"
              title="Toggle Filter View"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">tune</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="w-full max-w-5xl mx-auto px-margin-mobile space-y-space-md pt-space-sm">
        {/* OVERLAY CONTROLS PILL CAROUSEL */}
        <section aria-label="Map Overlays and Filters" className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-nowrap">
          <button
            onClick={() => setActiveFilter('ward')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-sm text-label-sm active:translate-y-px transition-transform cursor-pointer ${
              activeFilter === 'ward'
                ? 'bg-primary text-on-primary shadow-xs font-bold'
                : 'bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">domain</span>
            <span>Ward Boundary: Ward 85 (HAL Airport / Marathahalli)</span>
          </button>
          <button
            onClick={() => setActiveFilter('monsoon')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-sm text-label-sm active:translate-y-px transition-transform cursor-pointer ${
              activeFilter === 'monsoon'
                ? 'bg-primary text-on-primary shadow-xs font-bold'
                : 'bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-primary">rainy</span>
            <span>Monsoon Damage Heatmap</span>
          </button>
          <button
            onClick={() => setActiveFilter('traffic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-sm text-label-sm active:translate-y-px transition-transform cursor-pointer ${
              activeFilter === 'traffic'
                ? 'bg-primary text-on-primary shadow-xs font-bold'
                : 'bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">traffic</span>
            <span>Filter: High Traffic Corridors</span>
          </button>
          <button
            onClick={() => setActiveFilter('audit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-sm text-label-sm active:translate-y-px transition-transform cursor-pointer ${
              activeFilter === 'audit'
                ? 'bg-primary text-on-primary shadow-xs font-bold'
                : 'bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-tertiary">verified</span>
            <span>Passed Audit Only</span>
          </button>
        </section>

        {/* ================= INTERACTIVE MAP VIEWPORT ================= */}
        <section className="relative w-full rounded-xl border border-outline-variant overflow-hidden bg-surface-dim shadow-xs">
          {/* Geospatial Map Canvas Container */}
          <div className="relative w-full h-[320px] sm:h-[400px] bg-slate-900 overflow-hidden" data-location="Bengaluru, India">
            {/* Photographic/Spatial Base Plate */}
            <img
              className="w-full h-full object-cover opacity-85 transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
              alt="Satellite and cartographic topographical road network map of East Bengaluru showing major arterial flyovers, Kadubeesanahalli intersection, and arterial roads"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMn2B9D97mN0a2tCeGaf96aiVaEZ_HuIwhuO7smMJp4bA1Zcnx_3aeCQTS9PuAtLtKH3R801xQ-Gy6jWOSwI_Vbszk-vQY5MkvZl5O-8Wij2qsLmRuXOj4KhP4rl6D9_aW2JS42BBB65flG0i3cHzEaKmGhZ7TCAG32UHuCHFAYp7wQvnR_Q8hyMl6E77MvINg9es0wXKvqx9DNxFBD8aNtE31YF7UqV9x-qh6yuZNr1jJkKUORd4Dhw"
            />

            {/* Heatmap overlay if monsoon filter active */}
            {activeFilter === 'monsoon' && (
              <div className="absolute inset-0 bg-radial from-red-500/30 via-amber-500/20 to-transparent pointer-events-none mix-blend-overlay"></div>
            )}

            {/* Tactical Map HUD & Telemetry Top-Right */}
            <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-20">
              <div className="bg-inverse-surface/90 text-inverse-on-surface px-2.5 py-1 rounded font-label-sm text-label-sm border border-outline-variant/30 backdrop-blur-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px] text-primary-fixed">my_location</span>
                <span>[STN 24+400] | 12.9352° N, 77.6946° E</span>
              </div>
              <div className="bg-surface-container-lowest/95 text-on-surface px-2 py-0.5 rounded font-label-sm text-label-sm border border-outline-variant flex items-center gap-1 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span>14 Open</span>
                <span className="text-outline">|</span>
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>8 Active</span>
                <span className="text-outline">|</span>
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span>31 Repaired</span>
              </div>
            </div>

            {/* Defect Pins & Spatial Overlay Markers */}
            {/* Pin 1: Critical (Featured BLR-85-4092) */}
            <div
              onClick={() => setSelectedPinId('ticket-4092')}
              className="absolute top-[48%] left-[42%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              title="Click to focus #BLR-85-4092 Kadubeesanahalli"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-error/40 animate-ping"></span>
                <div className={`w-7 h-7 rounded-full bg-error border-2 ${selectedPinId === 'ticket-4092' ? 'border-amber-300 ring-2 ring-error' : 'border-surface-container-lowest'} flex items-center justify-center text-on-error shadow-md`}>
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                </div>
                {/* Pin Tooltip Callout */}
                <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded font-label-sm text-label-sm whitespace-nowrap shadow-lg flex items-center gap-1">
                  <span className="font-bold text-error-container">BLR-85-4092</span>
                  <span>Kadubeesanahalli</span>
                </div>
              </div>
            </div>

            {/* Pin 2: Amber (In Progress) */}
            <div
              onClick={() => setSelectedPinId('ticket-4108')}
              className="absolute top-[28%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
              title="Active Work Order #BLR-85-4108"
            >
              <div className="w-6 h-6 rounded-full bg-primary-container border-2 border-surface-container-lowest flex items-center justify-center text-on-primary-container shadow-sm hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[14px]">engineering</span>
              </div>
            </div>

            {/* Pin 3: Green (Verified Repair) */}
            <div
              onClick={() => setSelectedPinId('ticket-1804')}
              className="absolute top-[68%] left-[24%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
              title="Verified Repair #BLR-84-1804"
            >
              <div className="w-6 h-6 rounded-full bg-tertiary border-2 border-surface-container-lowest flex items-center justify-center text-on-tertiary shadow-sm hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
            </div>

            {/* Pin 4: Critical Pin */}
            <div className="absolute top-[35%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-error border-2 border-surface-container-lowest flex items-center justify-center text-on-error shadow-sm hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[12px]">priority_high</span>
              </div>
            </div>

            {/* Pin 5: Green Verified */}
            <div className="absolute top-[75%] left-[65%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-tertiary border-2 border-surface-container-lowest flex items-center justify-center text-on-tertiary shadow-sm hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[12px]">check</span>
              </div>
            </div>

            {/* Map Layer Controls (Bottom Left) */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-xs p-1 rounded-lg border border-outline-variant shadow-sm">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.0))}
                className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
              <div className="w-px h-4 bg-outline-variant"></div>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 1.0))}
                className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <div className="w-px h-4 bg-outline-variant"></div>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 text-on-surface hover:bg-surface-container rounded cursor-pointer"
                title="Recenter to Current Location"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">near_me</span>
              </button>
            </div>

            {/* Map Legend Drawer (Bottom Right) */}
            <div className="absolute bottom-3 right-3 z-20 hidden sm:flex items-center gap-3 bg-surface-container-lowest/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-outline-variant text-[11px] font-label-sm">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-error"></span> Critical/Pending
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span> In Progress
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Verified Repaired
              </span>
            </div>
          </div>
        </section>

        {/* ================= FEATURED ACTIVE TICKET CARD ================= */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-xs">
          {/* Top Priority Indicator Strip */}
          <div className="h-1.5 w-full bg-primary-container"></div>
          <div className="p-space-md space-y-space-md">
            {/* Header: Ticket Identifier & SLA Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-label-md text-label-md px-2 py-0.5 rounded bg-error-container text-on-error-container font-bold border border-error/20">
                    #{featuredTicket.ticketNumber}
                  </span>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-secondary font-semibold">
                    {featuredTicket.severityLabel}
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface pt-1">
                  {featuredTicket.title}
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
                  {featuredTicket.location}
                </p>
              </div>

              {/* SLA Indicator Badge */}
              <div className="self-start sm:self-auto bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-right min-w-[190px]">
                <div className="flex items-center gap-1.5 justify-end text-primary font-label-sm text-label-sm font-bold">
                  <span className="material-symbols-outlined text-[18px]">timer</span>
                  <span>SLA Target: {featuredTicket.slaTargetHours} hrs</span>
                </div>
                <p className="font-label-md text-label-md text-error font-bold mt-0.5">
                  {featuredTicket.slaRemainingHours} hrs remaining
                </p>
                <div className="w-full bg-surface-container rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${featuredTicket.slaPercentRemaining}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Telemetry & Impact Stats Bar (Bento Split) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-xs bg-surface-container-low p-space-sm rounded-lg border border-outline-variant/60">
              <div className="flex items-center gap-space-sm p-1.5">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">traffic</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    Estimated Traffic Impact
                  </p>
                  <p className="font-body-sm text-body-sm font-semibold text-on-surface">
                    {featuredTicket.trafficImpact}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm p-1.5">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    Community Validation
                  </p>
                  <p className="font-body-sm text-body-sm font-semibold text-tertiary flex items-center gap-1">
                    <span>▲ {featuredTicket.communityVotes} citizens verified this</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm p-1.5 sm:col-span-2 md:col-span-1">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    Assigned Contractor
                  </p>
                  <p className="font-body-sm text-body-sm font-semibold text-on-surface">
                    {featuredTicket.assignedContractor}
                  </p>
                </div>
              </div>
            </div>

            {/* 6-Stage Progress Stepper */}
            <div className="space-y-space-xs pt-space-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Civic Lifecycle Audit</h3>
                <span className="font-label-sm text-label-sm text-primary font-bold">Stage 4 of 6 (Live Deployment)</span>
              </div>

              {/* Stepper Graphic */}
              <div className="relative pt-2">
                <div className="grid grid-cols-6 gap-1 sm:gap-2">
                  {/* Step 1: Reported */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-xs font-bold shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                    <p className="font-label-sm text-label-sm font-semibold text-on-surface mt-1.5">1. Reported</p>
                    <p className="font-label-sm text-label-sm text-secondary hidden sm:block">Oct 12</p>
                  </div>
                  {/* Step 2: Verified */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-xs font-bold shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                    <p className="font-label-sm text-label-sm font-semibold text-on-surface mt-1.5">2. Verified</p>
                    <p className="font-label-sm text-label-sm text-secondary hidden sm:block">Oct 13</p>
                  </div>
                  {/* Step 3: Work Order */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-xs font-bold shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                    <p className="font-label-sm text-label-sm font-semibold text-on-surface mt-1.5">3. Work Order</p>
                    <p className="font-label-sm text-label-sm text-secondary hidden sm:block">Oct 14</p>
                  </div>
                  {/* Step 4: Dispatched (ACTIVE) */}
                  <div className="flex flex-col items-center text-center relative">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-primary-fixed">
                      <span className="material-symbols-outlined text-[16px] animate-pulse">bolt</span>
                    </div>
                    <p className="font-label-sm text-label-sm font-bold text-primary mt-1.5">4. Dispatched</p>
                    <span className="font-label-sm text-label-sm bg-primary/10 text-primary px-1.5 py-0.2 rounded font-bold">
                      Today
                    </span>
                  </div>
                  {/* Step 5: Repair In Progress */}
                  <div className="flex flex-col items-center text-center opacity-45">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-container text-secondary flex items-center justify-center text-xs font-bold border border-outline-variant">
                      5
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface mt-1.5">5. Repairing</p>
                    <p className="font-label-sm text-label-sm text-secondary hidden sm:block">Pending</p>
                  </div>
                  {/* Step 6: Resolved */}
                  <div className="flex flex-col items-center text-center opacity-45">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-container text-secondary flex items-center justify-center text-xs font-bold border border-outline-variant">
                      6
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface mt-1.5">6. Resolved</p>
                    <p className="font-label-sm text-label-sm text-secondary hidden sm:block">Audit Target</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Interactive Actions */}
            <div className="pt-space-xs flex items-center justify-between border-t border-outline-variant/60 flex-wrap gap-space-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpvoteTicket(featuredTicket.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant font-label-md text-label-md active:translate-y-px transition-all cursor-pointer ${
                    featuredTicket.hasUserVoted
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary font-bold'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[16px] text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    thumb_up
                  </span>
                  <span>
                    {featuredTicket.hasUserVoted ? 'Verified by You' : 'Upvote Defect'} ({featuredTicket.communityVotes})
                  </span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant font-label-md text-label-md active:translate-y-px transition-transform cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    {copiedShare ? 'check' : 'share'}
                  </span>
                  <span>{copiedShare ? 'Copied!' : 'Share Link'}</span>
                </button>
              </div>
              <button
                onClick={() => onOpenTelemetry(featuredTicket.ticketNumber)}
                className="font-label-md text-label-md text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
              >
                <span>View Asphalt Truck GPS Telemetry</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* ================= RECENT NEARBY REPAIRS FEED ================= */}
        <section className="space-y-space-sm pt-space-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Recent Nearby Repairs
              </h2>
              <p className="font-body-sm text-body-sm text-secondary">
                Verified municipal work orders across Indiranagar & HAL Division
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="font-label-md text-label-md text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All (29)</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* Before & After Comparison Showcase Card */}
          <article className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-xs">
            <div className="p-space-md border-b border-outline-variant flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-bold px-2 py-0.5 rounded">
                    <span className="material-symbols-outlined text-[14px]">verified</span> VERIFIED CLOSED
                  </span>
                  <span className="font-label-md text-label-md text-secondary">
                    TICKET #{nearbyClosedTicket.ticketNumber}
                  </span>
                </div>
                <h3 className="font-body-lg text-body-lg font-bold text-on-surface mt-1">
                  {nearbyClosedTicket.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {nearbyClosedTicket.location}
                </p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <span className="font-label-sm text-label-sm text-secondary block">Civil Expenditure</span>
                <span className="font-label-lg text-label-lg font-bold text-on-surface">
                  {nearbyClosedTicket.repairCost}
                </span>
              </div>
            </div>

            {/* Before / After Photo Comparison Split View */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-outline-variant bg-surface-container-low">
              {/* Before Card */}
              <div className="p-space-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold bg-error-container text-on-error-container px-2 py-0.5 rounded">
                    BEFORE ({nearbyClosedTicket.beforeDate})
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">
                    Depth: {nearbyClosedTicket.depthCm}cm • Severe Degradation
                  </span>
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden border border-outline-variant group">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt="Photographic evidence of deep jagged pothole cluster on a busy city asphalt road in India."
                    src={nearbyClosedTicket.beforePhoto}
                  />
                  <div className="absolute bottom-2 left-2 bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded">
                    Reported by Citizen Ankit R.
                  </div>
                </div>
              </div>

              {/* After Card */}
              <div className="p-space-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold bg-tertiary text-on-tertiary px-2 py-0.5 rounded">
                    AFTER ({nearbyClosedTicket.afterDate})
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold">
                    Passed Friction Audit
                  </span>
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden border border-outline-variant group">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt="Pristine freshly paved black bitumen asphalt surface on urban Indian boulevard."
                    src={nearbyClosedTicket.afterPhoto}
                  />
                  <div className="absolute bottom-2 left-2 bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-tertiary-fixed">shield</span>
                    <span>3-Year Contractor Warranty Seal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Ledger Footer */}
            <div className="px-space-md py-space-sm bg-surface-container-lowest flex items-center justify-between flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm">
              <div className="flex items-center gap-3">
                <span>Inspector: <strong>{nearbyClosedTicket.inspector}</strong></span>
                <span>Bitumen Grade: <strong>{nearbyClosedTicket.bitumenGrade}</strong></span>
              </div>
              <button
                onClick={() => onOpenCertificate(nearbyClosedTicket.ticketNumber)}
                className="text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
              >
                <span>Download BBMP Completion Certificate PDF</span>
                <span className="material-symbols-outlined text-[14px]">download</span>
              </button>
            </div>
          </article>
        </section>
      </main>

      {/* ================= CITIZEN ENGAGEMENT FLOATING ACTION BUTTON (FAB) ================= */}
      <aside className="fixed bottom-20 right-4 sm:right-8 z-40">
        <button
          onClick={() => onNavigateTab('reporter')}
          className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-5 py-3.5 rounded-full shadow-lg border border-primary-container active:translate-y-0.5 transition-all group cursor-pointer"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            add_a_photo
          </span>
          <span className="font-headline-sm text-headline-sm text-[16px] font-bold tracking-tight">
            Report New Defect
          </span>
        </button>
      </aside>
    </div>
  );
};
