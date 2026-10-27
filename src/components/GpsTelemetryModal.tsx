import React from 'react';

interface GpsTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketNumber: string;
}

export const GpsTelemetryModal: React.FC<GpsTelemetryModalProps> = ({
  isOpen,
  onClose,
  ticketNumber,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl border-2 border-primary shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-inverse-surface text-inverse-on-surface px-4 py-3 flex items-center justify-between border-b border-outline">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed text-[22px]">local_shipping</span>
            <div>
              <h3 className="font-headline-sm text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Asphalt Truck GPS Telemetry
                <span className="bg-tertiary text-on-tertiary font-label-sm text-[10px] px-1.5 py-0.2 rounded font-bold">LIVE</span>
              </h3>
              <p className="font-label-sm text-[11px] text-surface-dim">
                Tracking Dispatch for {ticketNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-surface-dim hover:text-white p-1 rounded hover:bg-white/10"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Live Truck Status Card */}
        <div className="p-4 space-y-3 overflow-y-auto">
          {/* Telemetry metrics bar */}
          <div className="grid grid-cols-3 gap-2 bg-inverse-surface text-white p-3 rounded-lg border border-outline">
            <div className="text-center border-r border-white/10">
              <span className="text-[10px] font-label-sm text-white/60 block">VEHICLE REG</span>
              <span className="font-mono text-xs font-bold text-primary-fixed">KA-01-EA-4921</span>
            </div>
            <div className="text-center border-r border-white/10">
              <span className="text-[10px] font-label-sm text-white/60 block">HOT-MIX TEMP</span>
              <span className="font-mono text-xs font-bold text-amber-300">142°C (Optimal)</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-label-sm text-white/60 block">SPEED & ETA</span>
              <span className="font-mono text-xs font-bold text-tertiary-fixed">24 km/h · 12m</span>
            </div>
          </div>

          {/* Graphical GPS Route Viewport */}
          <div className="relative h-44 rounded-lg overflow-hidden border border-outline-variant bg-slate-900">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMn2B9D97mN0a2tCeGaf96aiVaEZ_HuIwhuO7smMJp4bA1Zcnx_3aeCQTS9PuAtLtKH3R801xQ-Gy6jWOSwI_Vbszk-vQY5MkvZl5O-8Wij2qsLmRuXOj4KhP4rl6D9_aW2JS42BBB65flG0i3cHzEaKmGhZ7TCAG32UHuCHFAYp7wQvnR_Q8hyMl6E77MvINg9es0wXKvqx9DNxFBD8aNtE31YF7UqV9x-qh6yuZNr1jJkKUORd4Dhw"
              alt="Satellite dispatch telemetry route map"
              className="w-full h-full object-cover opacity-70"
            />
            {/* Pulsing truck marker */}
            <div className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-8 h-8 rounded-full bg-primary/40 animate-ping absolute"></span>
              <div className="w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              </div>
              <span className="bg-black/80 text-white font-label-sm text-[10px] px-1.5 py-0.5 rounded mt-1 font-mono">
                Truck #04 · 650m away
              </span>
            </div>

            {/* Destination Pin */}
            <div className="absolute top-[65%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-error text-white font-label-sm text-[10px] px-1.5 py-0.5 rounded shadow">
              <span className="material-symbols-outlined text-[12px]">location_on</span>
              <span>Kadubeesanahalli Site</span>
            </div>
          </div>

          {/* Live Dispatch Steps */}
          <div className="space-y-2 pt-1">
            <h4 className="font-label-md text-xs font-bold text-on-surface uppercase tracking-wider">
              Transit Checkpoints
            </h4>
            <div className="space-y-2 border-l-2 border-outline-variant ml-2 pl-3 text-xs">
              <div className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary absolute -left-[17px] top-1"></span>
                <p className="font-bold text-on-surface">Asphalt Plant Dispense Cleared</p>
                <p className="text-secondary text-[11px]">HAL Plant Unit 2 · 09:15 AM (Loaded 4.2MT Hot-mix)</p>
              </div>
              <div className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary absolute -left-[17px] top-1"></span>
                <p className="font-bold text-on-surface">Marathahalli Flyover Transit</p>
                <p className="text-secondary text-[11px]">Passed ORR signal · 09:42 AM</p>
              </div>
              <div className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse absolute -left-[17px] top-1"></span>
                <p className="font-bold text-primary">Service Lane Ingress (Active)</p>
                <p className="text-on-surface-variant text-[11px]">Approaching Kadubeesanahalli Underpass</p>
              </div>
            </div>
          </div>

          {/* Crew Info */}
          <div className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant flex items-center justify-between text-xs">
            <div>
              <span className="text-secondary block font-label-sm text-[10px]">CREW SUPERVISOR</span>
              <span className="font-bold text-on-surface">Manjunath K. (K.R. Infra)</span>
            </div>
            <a
              href="tel:+919845012345"
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-surface-container text-primary font-bold hover:bg-surface-container-high border border-outline-variant"
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span>Contact Driver</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface border-t border-outline-variant flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-on-background text-on-primary font-label-md text-xs font-bold rounded-lg hover:bg-opacity-90"
          >
            Close Telemetry HUD
          </button>
        </div>
      </div>
    </div>
  );
};
