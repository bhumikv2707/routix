export type ScreenTab = 'reporter' | 'map' | 'dashboard' | 'jobs';

export type DefectCategory = 'pothole' | 'waterlogging' | 'cracked' | 'manhole';

export interface DefectTicket {
  id: string;
  ticketNumber: string; // e.g. BLR-85-4092
  title: string;
  location: string;
  landmark: string;
  coordinates: {
    lat: number;
    lng: number;
    station: string; // e.g. [STN 24+400]
    latStr: string;
    lngStr: string;
  };
  severity: 1 | 2 | 3 | 4 | 5;
  severityLabel: string;
  depthCm: number;
  areaSqM: number;
  category: DefectCategory;
  slaTargetHours: number;
  slaRemainingHours: number;
  slaPercentRemaining: number;
  trafficImpact: string; // "18,000 PCU/hr (High Congestion)"
  communityVotes: number;
  hasUserVoted?: boolean;
  assignedContractor: string;
  currentStage: number; // 1 to 6
  stages: {
    number: number;
    name: string;
    date: string;
    status: 'completed' | 'active' | 'pending';
  }[];
  beforePhoto: string;
  beforeDate?: string;
  afterPhoto?: string;
  afterDate?: string;
  repairCost?: string;
  inspector?: string;
  bitumenGrade?: string;
  status: 'critical' | 'in_progress' | 'repaired' | 'verified_closed';
}

export interface WorkGig {
  id: string;
  workOrderNumber: string; // e.g. WO-9021
  title: string;
  location: string;
  station: string;
  coordinatesStr: string;
  distanceKm: number;
  payout: number;
  slotDuration: string;
  status: 'active_assigned' | 'available' | 'completed';
  urgency: 'urgent' | 'civic_works';
  workersNeeded: number;
  estHours: number;
  materials: {
    name: string;
    icon: string;
    checked: boolean;
  }[];
  currentStep: number;
  steps: {
    step: number;
    title: string;
    statusText: string;
    description: string;
    completed: boolean;
    active: boolean;
  }[];
  mixTempLogged?: number;
  notes?: string;
}

export interface WorkerProfile {
  name: string;
  role: string;
  certLevel: string;
  division: string;
  isAvailable: boolean;
  weeklyEarnings: number;
  escrowLocked: number;
  pendingApprovalsCount: number;
}
