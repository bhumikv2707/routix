import React, { useState } from 'react';
import { WorkGig, WorkerProfile } from '../types';

interface JobsPortalScreenProps {
  onOpenDrawer: () => void;
  worker: WorkerProfile;
  activeGig: WorkGig;
  nearbyGigs: WorkGig[];
  onToggleDuty: () => void;
  onShowToast: (msg: string) => void;
}

export const JobsPortalScreen: React.FC<JobsPortalScreenProps> = ({
  onOpenDrawer,
  worker,
  activeGig: initialActiveGig,
  nearbyGigs: initialNearbyGigs,
  onToggleDuty,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'assigned' | 'available' | 'completed'>('assigned');
  const [activeGig, setActiveGig] = useState<WorkGig>(initialActiveGig);
  const [nearbyGigs, setNearbyGigs] = useState<WorkGig[]>(initialNearbyGigs);
  const [photoAdded, setPhotoAdded] = useState(false);
  const [tempLogged, setTempLogged] = useState(false);
  const [postPhotoUploaded, setPostPhotoUploaded] = useState(false);
  const [appliedGigs, setAppliedGigs] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleMaterial = (index: number) => {
    const updated = [...activeGig.materials];
    updated[index].checked = !updated[index].checked;
    setActiveGig({ ...activeGig, materials: updated });
    onShowToast(`Asset updated: ${updated[index].name}`);
  };

  const handleAddPhotoNote = () => {
    setPhotoAdded(true);
    onShowToast('Compaction layer photo & site note logged to BBMP audit ledger.');
  };

  const handleLogTemp = () => {
    setTempLogged(true);
    onShowToast('Infrared binder temperature 138°C registered (Within VG-30 tolerance).');
  };

  const handleUploadPostPhoto = () => {
    setPostPhotoUploaded(true);
    onShowToast('Post-repair finish photo uploaded with watermark stamp.');
  };

  const handleProceedAudit = () => {
    if (activeGig.currentStep < 5) {
      const nextStep = activeGig.currentStep + 1;
      setActiveGig({
        ...activeGig,
        currentStep: nextStep,
      });
      onShowToast(`Advanced to Step ${nextStep}: Post-repair audit and AEE verification.`);
    } else {
      onShowToast('Work Order submitted! ₹3,850 UPI sweep initiated pending AEE sign-off.');
    }
  };

  const handleApplyGig = (gigId: string, gigTitle: string, payout: number) => {
    setAppliedGigs([...appliedGigs, gigId]);
    onShowToast(`Application submitted for "${gigTitle}" (₹${payout.toLocaleString('en-IN')})!`);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast('Field crew tasks synchronized with Ward 85 dispatch control.');
    }, 700);
  };

  return (
    <div className="bg-background text-on-surface antialiased pb-28 selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* ================= TOP APP BAR ================= */}
      <header className="sticky top-0 z-40 bg-surface border-b border-outline-variant px-margin-mobile py-space-sm shadow-none">
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-space-sm">
            <button
              onClick={onOpenDrawer}
              aria-label="Menu"
              className="p-space-xs text-primary hover:bg-surface-container active:translate-y-px transition-transform duration-75 rounded flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tight">
              ROUTIX Civic
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container border border-outline-variant font-label-sm text-label-sm text-on-surface font-semibold">
              <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
              ONLINE SYNC
            </span>
            <button
              onClick={handleSync}
              aria-label="Sync Database"
              className="p-space-xs text-primary hover:bg-surface-container active:translate-y-px transition-transform duration-75 rounded flex items-center justify-center cursor-pointer"
            >
              <span className={`material-symbols-outlined text-[24px] ${isSyncing ? 'animate-spin' : ''}`}>
                sync
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN VIEW CONTAINER ================= */}
      <main className="max-w-4xl mx-auto px-margin-mobile pt-space-md space-y-space-md">
        {/* WORKER PROFILE & DUTY STATUS CARD */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-md shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            {/* Worker Profile Info */}
            <div className="flex items-start gap-space-md">
              <div className="relative w-14 h-14 rounded-xl bg-inverse-surface text-surface flex items-center justify-center shrink-0 border border-outline">
                <span className="material-symbols-outlined text-[32px] text-surface-tint">engineering</span>
                <span className="absolute -bottom-1 -right-1 bg-tertiary-container text-on-tertiary text-[10px] font-bold px-1 rounded-sm border border-surface-container-lowest">
                  L3
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {worker.name}
                  </h1>
                  <span className="bg-surface-container-high text-on-secondary-fixed border border-outline-variant px-2 py-0.5 rounded font-label-md text-label-md font-semibold">
                    {worker.role}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">verified</span>
                  {worker.certLevel} • {worker.division}
                </p>
              </div>
            </div>

            {/* Duty Toggle Switch */}
            <div className="flex items-center justify-between sm:justify-end gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-lg border border-outline-variant">
              <div className="text-left sm:text-right">
                <p className="font-label-md text-label-md font-bold text-on-surface">Available for Jobs</p>
                <p className={`font-label-sm text-label-sm font-semibold ${worker.isAvailable ? 'text-tertiary' : 'text-secondary'}`}>
                  STATUS: {worker.isAvailable ? 'ON DUTY' : 'OFF DUTY'}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={worker.isAvailable}
                onClick={onToggleDuty}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out p-0.5 ${
                  worker.isAvailable
                    ? 'border-primary bg-primary'
                    : 'border-outline-variant bg-surface-container'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    worker.isAvailable ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Wallet & Ledger Earnings Row */}
          <div className="mt-space-md pt-space-md border-t border-outline-variant grid grid-cols-1 md:grid-cols-2 gap-space-sm">
            <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-outline-variant">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[24px]">account_balance_wallet</span>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">WEEKLY EARNINGS</p>
                  <p className="font-label-lg text-label-lg font-bold text-on-surface">
                    ₹{worker.weeklyEarnings.toLocaleString('en-IN')} Earned this Week
                  </p>
                </div>
              </div>
              <span className="bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold px-2 py-1 rounded">
                PAID
              </span>
            </div>

            <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-outline-variant">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-outline text-[24px]">pending_actions</span>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">ESCROW CLEARANCE</p>
                  <p className="font-label-lg text-label-lg font-bold text-on-surface">
                    {worker.pendingApprovalsCount} Pending Approval
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold">
                ~ ₹{worker.escrowLocked.toLocaleString('en-IN')} Locked
              </span>
            </div>
          </div>
        </section>

        {/* FIELD SAFETY BANNER */}
        <aside className="bg-surface-container-highest border-l-4 border-l-primary-container border-y border-r border-outline-variant p-space-md rounded-xl flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">
            health_and_safety
          </span>
          <div>
            <p className="font-label-md text-label-md font-bold text-primary tracking-wide">
              MANDATORY BBMP WORKFORCE ADVISORY
            </p>
            <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
              Safety Protocol: High-visibility vest & road cones mandatory during daytime traffic hours. Keep beacon lights active during compaction.
            </p>
          </div>
        </aside>

        {/* JOB FEED & ASSIGNMENT TABS */}
        <nav aria-label="Job Filters" className="flex border-b border-outline-variant gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('assigned')}
            className={`flex items-center gap-1.5 px-space-md py-space-sm border-b-2 font-body-sm text-body-sm font-bold whitespace-nowrap rounded-t-lg cursor-pointer ${
              activeTab === 'assigned'
                ? 'border-primary text-primary bg-surface-container-low'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
            <span>Assigned to Me (1 Active)</span>
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`flex items-center gap-1.5 px-space-md py-space-sm border-b-2 font-body-sm text-body-sm font-semibold whitespace-nowrap rounded-t-lg cursor-pointer ${
              activeTab === 'available'
                ? 'border-primary text-primary bg-surface-container-low'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">work_history</span>
            <span>Available Gigs in Ward 85 (6)</span>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex items-center gap-1.5 px-space-md py-space-sm border-b-2 font-body-sm text-body-sm font-semibold whitespace-nowrap rounded-t-lg cursor-pointer ${
              activeTab === 'completed'
                ? 'border-primary text-primary bg-surface-container-low'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            <span>Completed & Payouts (28)</span>
          </button>
        </nav>

        {/* ACTIVE JOB EXECUTION CARD */}
        {activeTab === 'assigned' && (
          <section className="bg-surface-container-lowest border-2 border-primary-container rounded-xl overflow-hidden shadow-none">
            {/* Status Strip Header */}
            <div className="bg-primary-container text-on-primary-container px-space-md py-space-xs flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-surface-bright animate-ping"></span>
                <span className="font-label-md text-label-md tracking-wider font-bold">
                  CURRENT DISPATCH EXECUTION
                </span>
              </div>
              <span className="font-label-md text-label-md font-bold px-2 py-0.5 bg-on-primary-fixed text-on-primary-container rounded">
                {activeGig.workOrderNumber}
              </span>
            </div>

            <div className="p-space-md space-y-space-md">
              {/* Job Description & Spatial Location */}
              <div className="flex flex-col lg:flex-row justify-between gap-space-md">
                <div className="space-y-1">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {activeGig.title}
                  </h2>
                  <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">distance</span>
                    <span>{activeGig.location} ({activeGig.distanceKm} km away)</span>
                  </div>
                  {/* Monospace Telemetry Stamp */}
                  <div className="inline-block mt-1 font-label-sm text-label-sm bg-inverse-surface text-surface px-2 py-1 rounded">
                    {activeGig.station} | {activeGig.coordinatesStr}
                  </div>
                </div>

                {/* Guaranteed Payout & Approval Details */}
                <div className="bg-surface-container-low border border-outline-variant p-space-sm rounded-lg flex flex-col justify-center min-w-[260px]">
                  <p className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    GUARANTEED FIELD PAYOUT
                  </p>
                  <p className="font-headline-md text-headline-md text-primary font-bold">
                    ₹{activeGig.payout.toLocaleString('en-IN')}
                  </p>
                  <p className="font-label-sm text-label-sm text-secondary font-medium mt-0.5">
                    {activeGig.slotDuration}
                  </p>
                </div>
              </div>

              {/* Required Tools & Equipment Grid */}
              <div className="border border-outline-variant rounded-lg p-space-sm bg-surface">
                <p className="font-label-sm text-label-sm font-bold text-on-surface-variant mb-1.5 uppercase">
                  Mandatory Civic Assets & Raw Material Checklist
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeGig.materials.map((mat, idx) => (
                    <button
                      key={mat.name}
                      onClick={() => toggleMaterial(idx)}
                      className={`inline-flex items-center gap-1 border px-2.5 py-1 rounded text-body-sm font-medium cursor-pointer transition-all ${
                        mat.checked
                          ? 'bg-surface-container-lowest border-primary text-on-surface'
                          : 'bg-surface-container-low border-outline-variant text-secondary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        {mat.checked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      <span>{mat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Progress Stepper Header */}
              <div className="pt-space-sm">
                <div className="flex items-center justify-between mb-space-sm">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Field Execution Sequence
                  </h3>
                  <span className="font-label-md text-label-md text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded">
                    STEP {activeGig.currentStep} OF 5 ACTIVE
                  </span>
                </div>

                {/* Step-by-Step Vertical Stepper */}
                <div className="space-y-space-md border-l-2 border-outline ml-3 pl-space-md relative">
                  {/* Step 1: Check-in */}
                  <div className="relative">
                    <span className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center ring-4 ring-background">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </span>
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <p className="font-body-md text-body-md font-bold text-on-surface">Step 1: Check-in with GPS</p>
                      <span className="font-label-sm text-label-sm text-tertiary font-bold bg-secondary-fixed px-2 py-0.5 rounded">
                        Completed: 08:30 AM ✓
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Geo-fence lock within 15 meters of hazard pin.
                    </p>
                  </div>

                  {/* Step 2: Pre-Repair Photo Upload */}
                  <div className="relative">
                    <span className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center ring-4 ring-background">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </span>
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <p className="font-body-md text-body-md font-bold text-on-surface">Step 2: Pre-Repair Photo Upload</p>
                      <span className="font-label-sm text-label-sm text-tertiary font-bold bg-secondary-fixed px-2 py-0.5 rounded">
                        Captured & AI Verified ✓
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Cavity depth 8.2cm validated via Edge AI camera.
                    </p>
                  </div>

                  {/* Step 3: In-Progress Compaction Log (ACTIVE STEP) */}
                  <div className={`relative p-space-sm rounded-lg transition-all ${
                    activeGig.currentStep === 3
                      ? 'bg-surface-container-low border border-primary-container'
                      : 'border-0'
                  }`}>
                    <span className={`absolute -left-[35px] top-3 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-background ${
                      activeGig.currentStep === 3
                        ? 'bg-primary-container text-on-primary-container animate-pulse'
                        : activeGig.currentStep > 3
                        ? 'bg-tertiary text-white'
                        : 'bg-surface-container-highest text-secondary'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {activeGig.currentStep > 3 ? 'check' : 'hourglass_top'}
                      </span>
                    </span>
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <p className="font-body-md text-body-md font-bold text-primary">
                        Step 3: In-Progress Compaction Log
                      </p>
                      <span className="font-label-sm text-label-sm text-on-primary-container bg-primary-container px-2 py-0.5 rounded font-bold uppercase">
                        {activeGig.currentStep === 3 ? 'ACTIVE LOGGING' : 'LOGGED'}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface mt-1">
                      Record asphalt binder temperature and intermediate plate tamper passes.
                    </p>
                    <div className="mt-space-sm flex flex-wrap gap-space-sm">
                      <button
                        onClick={handleAddPhotoNote}
                        className={`px-space-md py-2 min-h-[44px] rounded font-label-md text-label-md font-bold flex items-center gap-1.5 active:translate-y-px transition-all shadow-none border border-outline cursor-pointer ${
                          photoAdded
                            ? 'bg-tertiary text-white'
                            : 'bg-primary text-on-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                        <span>{photoAdded ? 'Photo Logged ✓' : 'Add Photo / Note'}</span>
                      </button>
                      <button
                        onClick={handleLogTemp}
                        className={`bg-surface-container-lowest border border-outline px-space-md py-2 min-h-[44px] rounded font-label-md text-label-md font-bold flex items-center gap-1.5 active:translate-y-px transition-all cursor-pointer ${
                          tempLogged
                            ? 'border-tertiary text-tertiary bg-emerald-50'
                            : 'text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">thermostat</span>
                        <span>{tempLogged ? 'Logged: 138°C Mix' : 'Log 135°C Mix Temp'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 4: Post-Repair Photo & Texture */}
                  <div className={`relative ${activeGig.currentStep === 4 ? 'bg-surface-container-low p-space-sm rounded-lg border border-primary' : ''}`}>
                    <span className={`absolute -left-[27px] top-0 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-background ${
                      activeGig.currentStep >= 4 ? 'bg-primary text-white font-bold' : 'bg-surface-container-highest border border-outline text-on-surface-variant'
                    }`}>
                      <span className="font-label-sm text-label-sm font-bold">4</span>
                    </span>
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <p className="font-body-md text-body-md font-semibold text-on-surface">
                        Step 4: Post-Repair Finish Photo & Texture Verification
                      </p>
                      <button
                        onClick={handleUploadPostPhoto}
                        className={`border px-3 py-1 rounded font-label-sm text-label-sm font-bold flex items-center gap-1 active:translate-y-px cursor-pointer ${
                          postPhotoUploaded
                            ? 'bg-tertiary text-white border-tertiary'
                            : 'bg-surface-container-lowest border-outline-variant text-primary hover:bg-surface-container'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">upload</span>
                        <span>{postPhotoUploaded ? 'Uploaded ✓' : 'Upload Button'}</span>
                      </button>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Surface level feathering check with water runoff test.
                    </p>
                  </div>

                  {/* Step 5: Final Submission */}
                  <div className="relative">
                    <span className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-surface-container-highest border border-outline text-on-surface-variant flex items-center justify-center ring-4 ring-background">
                      <span className="font-label-sm text-label-sm font-bold">5</span>
                    </span>
                    <p className="font-body-md text-body-md font-semibold text-secondary">
                      Step 5: Submit Completion for Instant AEE Verification & Payment
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Ward 85 Assistant Executive Engineer sign-off releases UPI fund sweep within 30 minutes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Master Submit Action */}
              <div className="pt-space-sm border-t border-outline-variant">
                <button
                  onClick={handleProceedAudit}
                  className="w-full bg-primary hover:bg-primary-container text-on-primary py-space-sm px-space-md min-h-[48px] rounded font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 active:translate-y-px transition-transform duration-75 border-b-2 border-on-primary-fixed-variant cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">task_alt</span>
                  <span>CONFIRM & PROCEED TO FINAL POST-REPAIR AUDIT</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* NEARBY OPEN JOB OPPORTUNITIES */}
        <section className="space-y-space-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Nearby Open Job Opportunities
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Instant civic task allocations within 5km radius
              </p>
            </div>
            <span className="font-label-sm text-label-sm font-bold text-primary">
              Ward 85 Dispatch Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {nearbyGigs.map((gig) => {
              const isApplied = appliedGigs.includes(gig.id);
              return (
                <article
                  key={gig.id}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-md flex flex-col justify-between hover:border-outline transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`font-label-sm text-label-sm font-bold px-2 py-0.5 rounded ${
                          gig.urgency === 'urgent'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-secondary-fixed text-on-secondary-fixed-variant'
                        }`}
                      >
                        {gig.urgency === 'urgent' ? 'URGENT HAZARD' : 'CIVIC WORKS'}
                      </span>
                      <p className="font-headline-sm text-headline-sm text-primary font-bold">
                        ₹{gig.payout.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {gig.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                      <span>{gig.location}</span>
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">group</span>
                        <span>{gig.workersNeeded} Worker{gig.workersNeeded > 1 ? 's' : ''} needed</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        <span>Est. {gig.estHours} Hours</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-space-md pt-space-sm border-t border-outline-variant flex items-center justify-between gap-space-sm">
                    <button
                      onClick={() => handleApplyGig(gig.id, gig.title, gig.payout)}
                      disabled={isApplied}
                      className={`w-full py-2.5 px-space-md min-h-[44px] rounded font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 active:translate-y-px transition-all duration-75 cursor-pointer ${
                        isApplied
                          ? 'bg-tertiary text-white'
                          : 'bg-on-background text-on-primary hover:bg-opacity-90'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isApplied ? 'check_circle' : 'handyman'}
                      </span>
                      <span>{isApplied ? 'Application Sent' : 'Apply Now'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
