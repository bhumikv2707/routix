/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ScreenTab, DefectTicket, WorkerProfile, WorkGig } from './types';
import { INITIAL_TICKETS, INITIAL_WORKER, INITIAL_ACTIVE_GIG, NEARBY_GIGS } from './data/mockData';
import { MapTrackerScreen } from './components/MapTrackerScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ReporterScreen } from './components/ReporterScreen';
import { JobsPortalScreen } from './components/JobsPortalScreen';
import { BottomNavBar } from './components/BottomNavBar';
import { NavigationDrawer } from './components/NavigationDrawer';
import { GpsTelemetryModal } from './components/GpsTelemetryModal';
import { CompletionCertificateModal } from './components/CompletionCertificateModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('map');
  const [tickets, setTickets] = useState<DefectTicket[]>(INITIAL_TICKETS);
  const [worker, setWorker] = useState<WorkerProfile>(INITIAL_WORKER);
  const [activeGig] = useState<WorkGig>(INITIAL_ACTIVE_GIG);
  const [nearbyGigs] = useState<WorkGig[]>(NEARBY_GIGS);

  const [currentWard, setCurrentWard] = useState('Ward 85 (HAL Airport / Marathahalli)');
  const [searchQuery, setSearchQuery] = useState('Ward 85 (HAL Airport / Marathahalli)');
  const [language, setLanguage] = useState<'EN' | 'ಕನ್ನಡ' | 'हिंदी'>('EN');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [telemetryTicketNumber, setTelemetryTicketNumber] = useState<string | null>(null);
  const [certificateTicketNumber, setCertificateTicketNumber] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUpvoteTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const hasVoted = !!t.hasUserVoted;
          const delta = hasVoted ? -1 : 1;
          const updatedVotes = Math.max(0, t.communityVotes + delta);
          showToast(
            hasVoted
              ? `Verification removed from #${t.ticketNumber}`
              : `▲ You verified defect #${t.ticketNumber} (+1 community validation)`
          );
          return {
            ...t,
            communityVotes: updatedVotes,
            hasUserVoted: !hasVoted,
          };
        }
        return t;
      })
    );
  };

  const handleAddNewReport = (newTicketData: Partial<DefectTicket>) => {
    const newTicket: DefectTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: newTicketData.ticketNumber || `BLR-85-${Math.floor(4100 + Math.random() * 800)}`,
      title: newTicketData.title || 'New Road Defect Report',
      location: newTicketData.location || 'Outer Ring Road, Ward 85, Bengaluru',
      landmark: newTicketData.landmark || 'Ward 85 Area',
      coordinates: {
        lat: 12.9568,
        lng: 77.7011,
        station: '[STN ORR-44+120]',
        latStr: '12.9568° N',
        lngStr: '77.7011° E',
      },
      severity: newTicketData.severity || 4,
      severityLabel: `SEVERITY ${newTicketData.severity || 4} • REPORTED`,
      depthCm: newTicketData.depthCm || 14,
      areaSqM: newTicketData.areaSqM || 1.2,
      category: newTicketData.category || 'pothole',
      slaTargetHours: 48,
      slaRemainingHours: 48,
      slaPercentRemaining: 100,
      trafficImpact: '18,000 PCU/hr (High Congestion)',
      communityVotes: 1,
      hasUserVoted: true,
      assignedContractor: 'East Div. Municipal Squad (Triage Pending)',
      currentStage: 1,
      stages: [
        { number: 1, name: 'Reported', date: 'Today', status: 'completed' },
        { number: 2, name: 'Verified', date: 'Pending', status: 'active' },
        { number: 3, name: 'Work Order', date: 'Pending', status: 'pending' },
        { number: 4, name: 'Dispatched', date: 'Pending', status: 'pending' },
        { number: 5, name: 'Repairing', date: 'Pending', status: 'pending' },
        { number: 6, name: 'Resolved', date: 'Pending', status: 'pending' },
      ],
      beforePhoto:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA4jpmXNYpIwWbODvNG45BDFL9p0e6PH7Vpja4E9nJIT6V0igvQC5EvN7cqCeOQ1fe4F7FFe_DwoaON1nwsZMRCt_OGAl9-RkNbcqcyWKZwqrVd3G6LKr2yNGxtjzpmVteQYntpHTU5cYtOupqeqD7fI_3qY_hlDbnNqMGV4cn0_Rc4gaFU7FqWhNQuFOhKYsX-tCVoMReQEaQBxwlGYAbKOsgavShwbdB3WSDSq5gmmid7Dkqx6pHPNA',
      beforeDate: 'TODAY',
      status: 'in_progress',
    };

    setTickets((prev) => [newTicket, ...prev]);
    showToast(`Ticket #${newTicket.ticketNumber} created under Sakala 48h SLA.`);
  };

  const handleToggleDuty = () => {
    const nextStatus = !worker.isAvailable;
    setWorker((prev) => ({
      ...prev,
      isAvailable: nextStatus,
    }));
    showToast(
      nextStatus
        ? 'Ramesh Gowda is now ON DUTY. Available for rapid road repair gigs.'
        : 'Ramesh Gowda is now OFF DUTY.'
    );
  };

  return (
    <div className="relative min-h-screen bg-background text-on-surface font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-2xl border border-primary flex items-center justify-between gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed text-[20px]">
              info
            </span>
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-surface-dim hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Screen Render */}
      {activeTab === 'map' && (
        <MapTrackerScreen
          tickets={tickets}
          onSelectTicket={() => {}}
          onNavigateTab={setActiveTab}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenTelemetry={(ticketNo) => setTelemetryTicketNumber(ticketNo)}
          onOpenCertificate={(ticketNo) => setCertificateTicketNumber(ticketNo)}
          onUpvoteTicket={handleUpvoteTicket}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {activeTab === 'dashboard' && (
        <DashboardScreen
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigateTab={setActiveTab}
          onShowToast={showToast}
        />
      )}

      {activeTab === 'reporter' && (
        <ReporterScreen
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigateTab={setActiveTab}
          onSubmitReport={handleAddNewReport}
          language={language}
          onSelectLanguage={(lang) => setLanguage(lang as 'EN' | 'ಕನ್ನಡ' | 'हिंदी')}
        />
      )}

      {activeTab === 'jobs' && (
        <JobsPortalScreen
          onOpenDrawer={() => setIsDrawerOpen(true)}
          worker={worker}
          activeGig={activeGig}
          nearbyGigs={nearbyGigs}
          onToggleDuty={handleToggleDuty}
          onShowToast={showToast}
        />
      )}

      {/* Persistent Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentWard={currentWard}
        onSelectWard={(w) => {
          setCurrentWard(w);
          setSearchQuery(w);
          showToast(`Switched view to ${w}`);
        }}
        language={language}
        onSelectLanguage={(lang) => {
          setLanguage(lang as 'EN' | 'ಕನ್ನಡ' | 'हिंदी');
          showToast(`Language set to ${lang}`);
        }}
      />

      {/* Modals */}
      <GpsTelemetryModal
        isOpen={!!telemetryTicketNumber}
        onClose={() => setTelemetryTicketNumber(null)}
        ticketNumber={telemetryTicketNumber || ''}
      />

      <CompletionCertificateModal
        isOpen={!!certificateTicketNumber}
        onClose={() => setCertificateTicketNumber(null)}
        ticketNumber={certificateTicketNumber || ''}
      />
    </div>
  );
}
