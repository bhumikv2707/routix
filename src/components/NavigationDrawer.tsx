import React from 'react';
import { ScreenTab } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  currentWard: string;
  onSelectWard: (ward: string) => void;
  language: string;
  onSelectLanguage: (lang: string) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  currentWard,
  onSelectWard,
  language,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-80 max-w-[85vw] bg-surface-container-lowest h-full shadow-2xl flex flex-col z-10 border-r border-outline-variant">
        {/* Drawer Header */}
        <div className="p-4 bg-inverse-surface text-inverse-on-surface flex items-center justify-between border-b border-outline">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-fixed text-[24px]">domain</span>
              <span className="font-headline-lg-mobile text-lg font-bold text-white tracking-tight">
                ROUTIX Civic
              </span>
            </div>
            <p className="font-label-sm text-xs text-surface-dim mt-0.5">
              BBMP Integrated Civic Command
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-surface-dim hover:text-white p-1 rounded"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Ward Selector Quick Switch */}
        <div className="p-3 bg-surface-container-low border-b border-outline-variant">
          <label className="font-label-sm text-[11px] text-secondary font-bold uppercase tracking-wider block mb-1">
            Active Municipal Ward
          </label>
          <select
            value={currentWard}
            onChange={(e) => onSelectWard(e.target.value)}
            className="w-full text-xs font-semibold bg-white border border-outline-variant rounded-lg p-2 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
          >
            <option value="Ward 85 (HAL Airport / Marathahalli)">Ward 85 (HAL Airport / Marathahalli)</option>
            <option value="Ward 84 (Indiranagar / 100ft Rd)">Ward 84 (Indiranagar / 100ft Rd)</option>
            <option value="Ward 150 (Bellandur / Outer Ring Rd)">Ward 150 (Bellandur / Outer Ring Rd)</option>
            <option value="Ward 174 (HSR Layout Sector 1-7)">Ward 174 (HSR Layout Sector 1-7)</option>
          </select>
        </div>

        {/* Primary View Navigation */}
        <div className="p-3 flex-1 overflow-y-auto space-y-1">
          <div className="font-label-sm text-[11px] text-secondary font-bold uppercase tracking-wider px-2 py-1">
            Core Portals
          </div>

          <button
            onClick={() => {
              onSelectTab('reporter');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-bold transition-colors ${
              activeTab === 'reporter'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">report_problem</span>
            <div className="flex-1">
              <span>Citizen Defect Scanner</span>
              <span className="block text-[10px] font-normal opacity-85">AI camera & geotagging</span>
            </div>
          </button>

          <button
            onClick={() => {
              onSelectTab('map');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-bold transition-colors ${
              activeTab === 'map'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">map</span>
            <div className="flex-1">
              <span>Map Tracker & Live Status</span>
              <span className="block text-[10px] font-normal opacity-85">Spatial GIS & nearby repairs</span>
            </div>
          </button>

          <button
            onClick={() => {
              onSelectTab('dashboard');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-bold transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">analytics</span>
            <div className="flex-1">
              <span>Civic Command (AEE View)</span>
              <span className="block text-[10px] font-normal opacity-85">Triage matrix & audit payouts</span>
            </div>
          </button>

          <button
            onClick={() => {
              onSelectTab('jobs');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-bold transition-colors ${
              activeTab === 'jobs'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">engineering</span>
            <div className="flex-1">
              <span>Workforce & Jobs Portal</span>
              <span className="block text-[10px] font-normal opacity-85">Field execution & daily payout</span>
            </div>
          </button>

          {/* Language Selector */}
          <div className="pt-4 mt-4 border-t border-outline-variant space-y-2">
            <div className="font-label-sm text-[11px] text-secondary font-bold uppercase tracking-wider px-2">
              Interface Language
            </div>
            <div className="grid grid-cols-3 gap-1 px-1">
              {(['EN', 'ಕನ್ನಡ', 'हिंदी'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onSelectLanguage(lang)}
                  className={`py-1.5 text-xs font-bold rounded-lg border ${
                    language === lang
                      ? 'bg-primary-container text-white border-primary'
                      : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Statutory Charter & Emergency Info */}
          <div className="pt-4 mt-4 border-t border-outline-variant px-2 space-y-2 text-[11px]">
            <div className="bg-amber-50 border border-amber-200 rounded p-2 text-amber-900">
              <p className="font-bold">Karnataka Sakala Services Act</p>
              <p className="text-[10px] mt-0.5">
                Statutory guarantee: Potholes on arterial roads must be repaired within 48h SLA.
              </p>
            </div>
            <div className="text-secondary space-y-0.5">
              <p>BBMP Sahaya 24x7: <strong className="text-on-surface">1533</strong></p>
              <p>Control Room: <strong className="text-on-surface">080-22660000</strong></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface border-t border-outline-variant text-center text-[10px] text-secondary">
          ROUTIX Civic Platform v4.2 • BBMP East
        </div>
      </div>
    </div>
  );
};
