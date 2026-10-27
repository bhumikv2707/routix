import React, { useState } from 'react';
import { ScreenTab } from '../types';

interface DashboardScreenProps {
  onOpenDrawer: () => void;
  onNavigateTab: (tab: ScreenTab) => void;
  onShowToast: (message: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onOpenDrawer,
  onNavigateTab,
  onShowToast,
}) => {
  const [selectedCrew, setSelectedCrew] = useState<'tier1' | 'inhouse'>('tier1');
  const [triageTab, setTriageTab] = useState<'urgent' | 'pending' | 'ongoing' | 'payout'>('urgent');
  const [workOrderIssued, setWorkOrderIssued] = useState(false);
  const [payoutApproved, setPayoutApproved] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  const handleIssueWorkOrder = () => {
    setWorkOrderIssued(true);
    const contractor = selectedCrew === 'tier1' ? 'Sri Sai Road Infrastructure Ltd' : 'Ward 85 Rapid Patch Crew';
    onShowToast(`Work Order #WO-85-4108 successfully dispatched to ${contractor}!`);
  };

  const handleApprovePayout = () => {
    setPayoutApproved(true);
    onShowToast('WO #7741 Closeout Approved: ₹64,000 Payout released to Apex Infra Works!');
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast('BBMP Civic Command data synced with Central PWD server.');
    }, 700);
  };

  return (
    <div className="bg-background text-on-surface antialiased font-body-md text-body-md min-h-screen pb-28">
      {/* ================= TOP APP BAR ================= */}
      <header className="bg-surface docked full-width top-0 shadow-none border-b border-outline-variant flex justify-between items-center w-full px-margin-mobile py-space-sm sticky top-0 z-40 max-w-md mx-auto sm:max-w-xl">
        <div className="flex items-center gap-space-sm">
          <button
            onClick={onOpenDrawer}
            aria-label="Menu"
            className="text-primary hover:bg-surface-container active:translate-y-px transition-transform duration-75 p-space-xs rounded-lg flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex flex-col">
            <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tight">
              ROUTIX Civic
            </span>
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              CIVIC COMMAND | BENGALURU
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs">
          <div className="relative">
            <button
              onClick={() => setShowAlerts(!showAlerts)}
              aria-label="Alerts"
              className="relative text-on-surface-variant hover:bg-surface-container active:translate-y-px transition-transform duration-75 p-space-xs rounded-lg flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface"></span>
            </button>
            {showAlerts && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl p-3 z-50 text-xs">
                <div className="font-bold text-on-surface pb-1 border-b border-outline-variant flex justify-between">
                  <span>Emergency Alerts</span>
                  <span className="text-primary font-mono">3 New</span>
                </div>
                <div className="py-2 space-y-2">
                  <div className="p-1.5 bg-error-container/40 rounded border border-error/20">
                    <p className="font-bold text-error">Critical Crater on ORR 500D</p>
                    <p className="text-[10px] text-on-surface-variant">SLA expiring in 5h 22m</p>
                  </div>
                  <div className="p-1.5 bg-amber-50 rounded border border-amber-200">
                    <p className="font-bold text-amber-900">Rain Alert: Marathahalli</p>
                    <p className="text-[10px] text-amber-800">High waterlogging risk on service lanes</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleSync}
            aria-label="Sync"
            className="text-primary hover:bg-surface-container active:translate-y-px transition-transform duration-75 p-space-xs rounded-lg flex items-center justify-center cursor-pointer"
          >
            <span className={`material-symbols-outlined ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
          </button>
        </div>
      </header>

      {/* ================= SUB-HEADER: INSPECTOR BADGE ================= */}
      <section className="bg-inverse-surface text-inverse-on-surface px-margin-mobile py-space-sm border-b border-outline max-w-md mx-auto sm:max-w-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold font-label-md text-label-md border border-outline-variant">
              AEE
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm font-semibold text-surface-bright leading-tight">
                AEE K. Venkatraman
              </div>
              <div className="font-label-sm text-label-sm text-surface-dim">
                East Div. • BBMP Ward 85, Indiranagar
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-lowest/10 px-2 py-1 rounded border border-surface-container-high/20">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-inverse-on-surface uppercase tracking-wider">
              LIVE SLA
            </span>
          </div>
        </div>
      </section>

      {/* ================= MAIN DASHBOARD CONTENT ================= */}
      <main className="max-w-md mx-auto sm:max-w-xl px-margin-mobile py-space-md space-y-space-md">
        {/* 1. KEY METRICS BENTO GRID */}
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Metric 1: Total Active Defects */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="font-label-sm text-label-sm">ACTIVE DEFECTS</span>
              <span className="material-symbols-outlined text-primary text-base">warning</span>
            </div>
            <div className="my-space-xs">
              <div className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight leading-none">
                148
              </div>
              <p className="font-label-sm text-label-sm text-primary font-semibold mt-1 flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">north</span> +12 post-monsoon
              </p>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '72%' }}></div>
            </div>
          </div>

          {/* Metric 2: Critical Hazards */}
          <div className="bg-error-container/30 p-space-md rounded-xl border-2 border-primary shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-primary">
              <span className="font-label-sm text-label-sm font-bold">CRITICAL HAZARDS</span>
              <span className="material-symbols-outlined text-primary text-base">fmd_bad</span>
            </div>
            <div className="my-space-xs">
              <div className="font-headline-xl text-headline-xl font-bold text-error tracking-tight leading-none">
                19
              </div>
              <p className="font-label-sm text-label-sm text-error font-semibold mt-1 flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">timer</span> SLA &lt; 24h Emergency
              </p>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-error" style={{ width: '90%' }}></div>
            </div>
          </div>

          {/* Metric 3: Crews in Field */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="font-label-sm text-label-sm">CREWS IN FIELD</span>
              <span className="material-symbols-outlined text-tertiary text-base">engineering</span>
            </div>
            <div className="my-space-xs">
              <div className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight leading-none">
                24
              </div>
              <p className="font-label-sm text-label-sm text-tertiary font-semibold mt-1">
                Active teams deployed
              </p>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
              92% Field Occupancy
            </span>
          </div>

          {/* Metric 4: Budget Allocated */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="font-label-sm text-label-sm">BUDGET ALLOCATED</span>
              <span className="material-symbols-outlined text-secondary text-base">currency_rupee</span>
            </div>
            <div className="my-space-xs">
              <div className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight leading-none">
                ₹18.4L
              </div>
              <p className="font-label-sm text-label-sm text-secondary font-semibold mt-1">
                Ward 85 Capex Pool
              </p>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-mono">
              Utilized: ₹7.20L
            </span>
          </div>
        </div>

        {/* 2. PRIORITY TRIAGE MATRIX TABS */}
        <div className="pt-space-xs">
          <div className="flex items-center justify-between pb-space-xs">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Triage Matrix
            </h2>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              Priority Descending
            </span>
          </div>
          {/* Horizontal Scrollable Tabs */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 custom-scrollbar">
            <button
              onClick={() => setTriageTab('urgent')}
              className={`whitespace-nowrap px-space-md py-1.5 rounded-lg font-label-md text-label-md font-bold shadow-sm flex items-center gap-1.5 active:translate-y-px cursor-pointer ${
                triageTab === 'urgent'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-secondary-fixed-variant border border-outline-variant'
              }`}
            >
              <span>Urgent Action</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                triageTab === 'urgent' ? 'bg-on-primary text-primary' : 'bg-surface-container-high'
              }`}>
                19
              </span>
            </button>
            <button
              onClick={() => setTriageTab('pending')}
              className={`whitespace-nowrap px-space-md py-1.5 rounded-lg font-label-md text-label-md font-semibold border border-outline-variant active:translate-y-px cursor-pointer ${
                triageTab === 'pending'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-secondary-fixed-variant'
              }`}
            >
              <span>Pending Verification</span>
              <span className="bg-surface-container-high px-1.5 py-0.2 rounded-full text-[10px]">
                34
              </span>
            </button>
            <button
              onClick={() => setTriageTab('ongoing')}
              className={`whitespace-nowrap px-space-md py-1.5 rounded-lg font-label-md text-label-md font-semibold border border-outline-variant active:translate-y-px cursor-pointer ${
                triageTab === 'ongoing'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-secondary-fixed-variant'
              }`}
            >
              <span>Ongoing Works</span>
              <span className="bg-surface-container-high px-1.5 py-0.2 rounded-full text-[10px]">
                42
              </span>
            </button>
            <button
              onClick={() => setTriageTab('payout')}
              className={`whitespace-nowrap px-space-md py-1.5 rounded-lg font-label-md text-label-md font-semibold border border-outline-variant active:translate-y-px cursor-pointer ${
                triageTab === 'payout'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-secondary-fixed-variant'
              }`}
            >
              <span>Audit & Payout</span>
              <span className="bg-surface-container-high px-1.5 py-0.2 rounded-full text-[10px]">
                15
              </span>
            </button>
          </div>
        </div>

        {/* 3. HIGH PRIORITY DEFECT TRIAGE CARD WITH WORKFLOW */}
        <div className="bg-surface-container-lowest rounded-xl border-2 border-primary shadow-sm overflow-hidden">
          {/* Status Band */}
          <div className="bg-primary px-space-md py-1.5 text-on-primary flex items-center justify-between font-label-sm text-label-sm font-semibold">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">crisis_alert</span>
              EMERGENCY SLA ACTIVE: 05h 22m REMAINING
            </span>
            <span className="font-mono">#BLR-85-4108</span>
          </div>

          <div className="p-space-md space-y-space-md">
            {/* Defect Header & Location */}
            <div>
              <div className="flex items-start justify-between gap-space-sm">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">
                  Deep Crater on Bus Route 500D
                </h3>
                <div className="bg-error-container text-on-error-container border border-error px-2 py-0.5 rounded font-label-sm text-label-sm font-bold whitespace-nowrap">
                  CRITICAL
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                Outer Ring Road, near Marathahalli Footbridge
              </p>
            </div>

            {/* Telemetry Badge */}
            <div className="bg-inverse-surface text-surface-bright rounded-lg p-space-xs font-label-md text-label-md flex flex-wrap items-center justify-between border border-outline">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary-fixed text-sm">pin_drop</span>
                <span className="text-primary-fixed">[STN 24+400]</span>
              </div>
              <div className="text-surface-dim font-mono text-[11px]">
                LAT: 12.9591° N | LON: 77.6974° E
              </div>
            </div>

            {/* AI Score & Impact Metrics Bento Strip */}
            <div className="grid grid-cols-2 gap-space-xs bg-surface-container p-space-sm rounded-lg border border-outline-variant">
              <div className="space-y-0.5">
                <span className="font-label-sm text-label-sm text-secondary block">AI SEVERITY INDEX</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg font-bold text-primary">96</span>
                  <span className="font-label-sm text-label-sm text-secondary font-mono">/ 100</span>
                </div>
                <span className="font-label-sm text-label-sm text-error font-medium block">
                  3 Accidents Reported
                </span>
              </div>
              <div className="space-y-0.5 border-l border-outline-variant pl-space-sm">
                <span className="font-label-sm text-label-sm text-secondary block">TRANSIT CORRIDOR</span>
                <div className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-base text-primary">directions_bus</span>
                  <span>BMTC High Vol.</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                  School Bus Lane Impact
                </span>
              </div>
            </div>

            {/* Repair Estimate Breakdown */}
            <div className="border border-outline-variant rounded-lg p-space-sm space-y-1 bg-surface-container-low">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-label-sm text-secondary">
                  ESTIMATED REPAIR EXPENDITURE
                </span>
                <span className="font-label-lg text-label-lg font-bold text-on-surface">₹42,500</span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface flex items-center justify-between text-xs pt-1 border-t border-outline-variant/60">
                <span className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-xs">construction</span>
                  <span>Cold-mix Bituminous Macadam + Roller</span>
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-mono">
                  ~8 Hours Turnaround
                </span>
              </div>
            </div>

            {/* Contractor & Crew Quick Triage Selector */}
            <div className="space-y-space-xs pt-space-xs">
              <div className="flex justify-between items-center">
                <label className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                  Recommended Deployment
                </label>
                <span className="font-label-sm text-label-sm text-tertiary font-bold">
                  2 Units Standby
                </span>
              </div>
              <div className="space-y-2">
                {/* Contractor Choice 1 */}
                <label
                  onClick={() => setSelectedCrew('tier1')}
                  className={`flex items-center justify-between p-space-sm rounded-lg cursor-pointer transition-all ${
                    selectedCrew === 'tier1'
                      ? 'border-2 border-primary bg-surface-container-lowest'
                      : 'border border-outline-variant bg-surface-container-lowest opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    <input
                      checked={selectedCrew === 'tier1'}
                      onChange={() => setSelectedCrew('tier1')}
                      className="w-4 h-4 text-primary focus:ring-primary border-outline"
                      name="crew-choice"
                      type="radio"
                    />
                    <div>
                      <div className="font-label-md text-label-md font-bold text-on-surface">
                        Sri Sai Road Infrastructure Ltd
                      </div>
                      <div className="font-label-sm text-label-sm text-secondary flex items-center gap-2">
                        <span className="text-primary font-bold">4.8 ★</span>
                        <span>• Empanelled Tier-1</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-fixed px-2 py-0.5 rounded">
                    Immediate
                  </span>
                </label>

                {/* Contractor Choice 2 */}
                <label
                  onClick={() => setSelectedCrew('inhouse')}
                  className={`flex items-center justify-between p-space-sm rounded-lg cursor-pointer transition-all ${
                    selectedCrew === 'inhouse'
                      ? 'border-2 border-primary bg-surface-container-lowest'
                      : 'border border-outline-variant bg-surface-container-lowest opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    <input
                      checked={selectedCrew === 'inhouse'}
                      onChange={() => setSelectedCrew('inhouse')}
                      className="w-4 h-4 text-primary focus:ring-primary border-outline"
                      name="crew-choice"
                      type="radio"
                    />
                    <div>
                      <div className="font-label-md text-label-md font-bold text-on-surface">
                        Ward 85 Rapid Patch Crew
                      </div>
                      <div className="font-label-sm text-label-sm text-secondary">
                        In-house Municipal Squad
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded font-mono">
                    3 Free
                  </span>
                </label>
              </div>
            </div>

            {/* Action Workflow Buttons */}
            <div className="pt-space-xs space-y-2">
              <button
                onClick={handleIssueWorkOrder}
                className={`w-full h-12 text-on-primary font-label-md text-label-md font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 border-b-2 active:translate-y-px transition-all duration-75 cursor-pointer ${
                  workOrderIssued
                    ? 'bg-tertiary border-tertiary-container'
                    : 'bg-primary border-primary-container hover:bg-primary-container'
                }`}
              >
                <span className="material-symbols-outlined">
                  {workOrderIssued ? 'check_circle' : 'assignment_turned_in'}
                </span>
                <span>
                  {workOrderIssued ? 'Work Order Dispatched to Field Crew' : 'Issue Work Order & Dispatch Crew'}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-space-sm">
                <button
                  onClick={() => onShowToast('Ticket reassigned to PWD Central Division')}
                  className="h-10 bg-inverse-surface hover:bg-opacity-90 text-surface-bright font-label-sm text-label-sm font-semibold rounded-lg flex items-center justify-center gap-1 active:translate-y-px cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">swap_horiz</span>
                  <span>Reassign Div</span>
                </button>
                <button
                  onClick={() => onShowToast('Ticket flagged as duplicate of #BLR-85-4092')}
                  className="h-10 border-2 border-error text-error hover:bg-error-container/30 bg-surface-container-lowest font-label-sm text-label-sm font-semibold rounded-lg flex items-center justify-center gap-1 active:translate-y-px cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">cancel</span>
                  <span>Reject / Duplicate</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. AUDIT & PROOF APPROVAL QUICK PREVIEW SECTION */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden p-space-md space-y-space-md">
          <div className="flex items-center justify-between border-b border-outline-variant pb-space-xs">
            <div>
              <span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span> READY FOR CLOSEOUT AUDIT
              </span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                WO #7741: HAL Old Airport Rd
              </h3>
            </div>
            <span className="font-label-md text-label-md font-mono font-bold text-on-surface">
              ₹64,000
            </span>
          </div>

          {/* Before / After Visual Inspection Container */}
          <div className="grid grid-cols-2 gap-space-xs">
            {/* BEFORE IMAGE */}
            <div className="space-y-1">
              <div className="relative rounded-lg overflow-hidden border border-outline-variant h-32 bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Municipal site photograph showing a jagged road asphalt pothole filled with rainwater"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAetE3LcNw9Jbysuz155V0u5m11XA49sE5hyWxTZK8coAISF9PeclIlANaLTT2Vf9Yi_bCKMqlLfX_Z8iBbMt1DfyGnRZwi3VgJV-hWVaUNUiMhnKKRf8bW4mtwhxhPcZnCUKCWX4_u0MeqJ8aaxtzY5syxNzEV0wWZYaRZAxmFD1TAobO6k56VjuuFju5wpCM0AMiwuSydIarDGSYO1QyYq3IyyOvMPIDG3GJQhjObjBfThi4G31mFgQ"
                />
                <div className="absolute bottom-1 left-1 bg-inverse-surface/80 text-surface-bright text-[10px] font-label-sm px-1.5 py-0.5 rounded">
                  BEFORE (12-Oct)
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-secondary block truncate">
                Depth: 14cm | 2.4 sq.m
              </span>
            </div>

            {/* AFTER IMAGE */}
            <div className="space-y-1">
              <div className="relative rounded-lg overflow-hidden border-2 border-tertiary h-32 bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Newly compacted asphalt patch repair on city street under sunny daylight"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR-lexWKNohBw5NfRbk_R1n96AFe01AAE0glH2Zciv43IJodzRl4MFZPRi2exIXEMaDUPNQD0A-Kgss1h1KTumqcHlry6Azsh6G6BX0UJ4xLo0rTb8U9O6h-lqydJsbITyGxZqvPmHUzxs5WUKR8rqRqzLSqLfQKvk7f_pYmfHF1oKWjgH6Vl4KCrkGbDhynLFfx8fV1VFo5e2gN1t5JJp_YiBOBBXeqhjBau4zmxYqJwiyCV-eesDog"
                />
                <div className="absolute bottom-1 left-1 bg-tertiary text-on-tertiary text-[10px] font-label-sm px-1.5 py-0.5 rounded font-bold">
                  COMPLETED (Today)
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary font-bold block truncate">
                Patch Compaction Cleared
              </span>
            </div>
          </div>

          {/* Verification Proof Badge */}
          <div className="bg-surface-container-high p-space-xs rounded-lg border border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-base">check_circle</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                GPS Verified at Site
              </span>
            </div>
            <span className="font-label-sm text-label-sm bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded font-mono font-bold">
              Match 100%
            </span>
          </div>

          {/* Quick Approval Button */}
          <button
            onClick={handleApprovePayout}
            className={`w-full h-12 text-on-tertiary font-label-md text-label-md font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 active:translate-y-px transition-transform duration-75 cursor-pointer ${
              payoutApproved
                ? 'bg-secondary'
                : 'bg-tertiary hover:bg-tertiary/90'
            }`}
          >
            <span className="material-symbols-outlined">
              {payoutApproved ? 'task_alt' : 'verified'}
            </span>
            <span>
              {payoutApproved ? '✓ Payout of ₹64,000 Authorized' : 'Approve Repair & Authorize ₹ Payout'}
            </span>
          </button>

          <div className="text-center">
            <span className="font-label-sm text-label-sm text-secondary">
              Contractor: Apex Infra Works • Ward 85 Sub-div
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
