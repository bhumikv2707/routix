import React from 'react';
import { ScreenTab } from '../types';

interface BottomNavBarProps {
  activeTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const navItems: { id: ScreenTab; label: string; icon: string }[] = [
    { id: 'reporter', label: 'Reporter', icon: 'report_problem' },
    { id: 'map', label: 'Map Tracker', icon: 'map' },
    { id: 'dashboard', label: 'Dashboard', icon: 'analytics' },
    { id: 'jobs', label: 'Jobs Portal', icon: 'engineering' },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="bg-surface-container-lowest docked full-width fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-gutter-mobile py-space-xs h-16 border-t border-outline-variant/60 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]"
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-75 active:translate-y-px cursor-pointer ${
              isActive
                ? 'bg-primary-container text-on-primary-container rounded-xl px-space-sm py-space-xs font-semibold shadow-xs'
                : 'text-on-surface-variant px-space-sm py-space-xs hover:bg-surface-container rounded-lg'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-[11px] mt-0.5 tracking-tight font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
