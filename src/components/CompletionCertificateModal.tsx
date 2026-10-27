import React, { useState } from 'react';

interface CompletionCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketNumber: string;
}

export const CompletionCertificateModal: React.FC<CompletionCertificateModalProps> = ({
  isOpen,
  onClose,
  ticketNumber,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-xl border-2 border-tertiary shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Certificate Header */}
        <div className="bg-inverse-surface text-inverse-on-surface px-4 py-3 flex items-center justify-between border-b border-outline">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">verified</span>
            <div>
              <h3 className="font-headline-sm text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Municipal Completion Certificate
                <span className="bg-tertiary text-on-tertiary font-label-sm text-[10px] px-1.5 py-0.2 rounded font-bold">BBMP FORM 4-A</span>
              </h3>
              <p className="font-label-sm text-[11px] text-surface-dim">
                Audit Record for {ticketNumber}
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

        {/* Certificate Document Body */}
        <div className="p-5 space-y-4 overflow-y-auto bg-amber-50/30">
          <div className="bg-white border-2 border-outline-variant p-5 rounded-lg shadow-sm space-y-4 text-xs font-body-sm text-on-surface relative">
            {/* Watermark Seal */}
            <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
              <span className="material-symbols-outlined text-[100px] text-tertiary">verified_user</span>
            </div>

            {/* Official Header */}
            <div className="text-center pb-3 border-b border-outline-variant">
              <p className="font-bold text-[13px] tracking-wide text-primary">
                GOVERNMENT OF KARNATAKA • BRUHAT BENGALURU MAHANAGARA PALIKE
              </p>
              <p className="font-semibold text-secondary text-[11px]">
                Office of Executive Engineer • East Zone, Indiranagar Sub-Division
              </p>
              <h4 className="font-headline-sm text-sm font-extrabold uppercase mt-1 tracking-wider text-on-surface">
                CIVIL ROAD REPAIR QUALITY & AUDIT CERTIFICATE
              </h4>
              <p className="font-mono text-[11px] text-secondary">REF: BBMP/WZ/ENG/2024-25/CR-8104</p>
            </div>

            {/* Work Details Table */}
            <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-3 rounded border border-outline-variant text-[11px]">
              <div>
                <span className="text-secondary block font-label-sm">WORK ORDER / TICKET:</span>
                <span className="font-mono font-bold text-on-surface">{ticketNumber}</span>
              </div>
              <div>
                <span className="text-secondary block font-label-sm">LOCATION / WARD:</span>
                <span className="font-semibold text-on-surface">100ft Road, Indiranagar (Ward 84)</span>
              </div>
              <div>
                <span className="text-secondary block font-label-sm">TOTAL EXPENDITURE:</span>
                <span className="font-mono font-bold text-tertiary text-xs">₹4,85,000 (Sanctioned)</span>
              </div>
              <div>
                <span className="text-secondary block font-label-sm">BITUMEN GRADE:</span>
                <span className="font-bold text-on-surface">VG-30 Hot Mix Macadam</span>
              </div>
              <div>
                <span className="text-secondary block font-label-sm">CONTRACTOR ASSIGNED:</span>
                <span className="font-semibold text-on-surface">Apex Infra Works Pvt Ltd</span>
              </div>
              <div>
                <span className="text-secondary block font-label-sm">WARRANTY CLAUSE:</span>
                <span className="font-bold text-primary">3-Year Defect Liability Bond</span>
              </div>
            </div>

            {/* Engineering Friction & Compaction Test Results */}
            <div className="space-y-1.5">
              <h5 className="font-bold text-on-surface uppercase font-label-sm text-[11px]">
                Engineering Quality Audit Parameters
              </h5>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
                  <span>Surface Friction Skid Resistance:</span>
                  <span className="font-mono font-bold text-tertiary">68 BPN (Passed ≥ 55)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
                  <span>Compaction Density (Nuclear Gauge):</span>
                  <span className="font-mono font-bold text-tertiary">98.4% (Passed ≥ 97%)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
                  <span>Water Runoff Infiltration Check:</span>
                  <span className="font-mono font-bold text-tertiary">0% Seepage (Cleared)</span>
                </div>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-3 border-t border-outline-variant flex items-center justify-between text-[11px]">
              <div>
                <p className="font-semibold text-on-surface">Eng. V. Sreenivas</p>
                <p className="text-secondary text-[10px]">Assistant Executive Engineer (AEE)</p>
                <p className="font-mono text-[9px] text-tertiary">DIGITALLY SIGNED & HASHED</p>
              </div>
              <div className="border border-tertiary bg-emerald-50 text-tertiary px-2 py-1 rounded text-center">
                <span className="material-symbols-outlined text-[16px] block mx-auto">verified</span>
                <span className="font-label-sm text-[9px] font-bold block">3-YEAR BOND ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-3 bg-surface border-t border-outline-variant flex items-center justify-between">
          <span className="font-label-sm text-[11px] text-secondary">
            Verified under Karnataka Transparency in Public Procurements
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-outline-variant font-label-md text-xs font-semibold hover:bg-surface-container"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white font-label-md text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-[16px]">
                {downloaded ? 'check' : 'download'}
              </span>
              <span>{downloaded ? 'Saved to Device' : 'Download Certificate PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
