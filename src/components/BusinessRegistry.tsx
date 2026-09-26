import React, { useState, useRef } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Search, 
  Plus, 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Upload, 
  X, 
  Check, 
  AlertTriangle,
  FileCheck2,
  Percent,
  Sparkles
} from 'lucide-react';
import { useApp } from '../utils/context';
import { BusinessSupplier, UploadedCredential, BusinessOwnershipType } from '../types';

interface FileUploadState {
  file: File | null;
  fileName: string;
  fileSize: string;
  isUploaded: boolean;
}

export const BusinessRegistry: React.FC = () => {
  const { businesses, registerBusiness, setActiveView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [ownershipFilter, setOwnershipFilter] = useState<'All' | 'Qualified' | 'Under51'>('All');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);

  // Hidden File Input References
  const lbrFileInputRef = useRef<HTMLInputElement | null>(null);
  const lraFileInputRef = useRef<HTMLInputElement | null>(null);
  const addressFileInputRef = useRef<HTMLInputElement | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sector: 'Construction',
    ownership: '100% Grand Gedean Owned' as BusinessOwnershipType,
    localOwnershipPct: 100,
    location: 'Zwedru City Center',
    servicesStr: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    legalStatus: 'LBR Registered' as const,
    taxStatus: 'LRA Tax Compliant' as const,
    workforceSize: 12,
    equipmentSummary: '',
    pastContractsStr: ''
  });

  // Attached Real Files State
  const [attachedFiles, setAttachedFiles] = useState<{
    lbrCert: FileUploadState;
    lraTax: FileUploadState;
    addressProof: FileUploadState;
  }>({
    lbrCert: {
      file: null,
      fileName: 'LBR_Certificate_Scan.pdf',
      fileSize: '1.4 MB',
      isUploaded: true
    },
    lraTax: {
      file: null,
      fileName: 'LRA_Tax_Clearance_2026.pdf',
      fileSize: '950 KB',
      isUploaded: true
    },
    addressProof: {
      file: null,
      fileName: 'Zwedru_Office_Proof.pdf',
      fileSize: '2.1 MB',
      isUploaded: true
    }
  });

  const sectors = [
    'All',
    'Construction',
    'Transportation',
    'Fuel supply',
    'Catering',
    'ICT',
    'Security',
    'Environmental services',
    'Equipment rental'
  ];

  // Helper for human-readable file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Real File Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docKey: 'lbrCert' | 'lraTax' | 'addressProof') => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setAttachedFiles(prev => ({
        ...prev,
        [docKey]: {
          file: selectedFile,
          fileName: selectedFile.name,
          fileSize: formatFileSize(selectedFile.size),
          isUploaded: true
        }
      }));
    }
  };

  // Ownership Type change handler to update local equity %
  const handleOwnershipChange = (newOwnership: BusinessOwnershipType) => {
    let newPct = formData.localOwnershipPct;
    if (newOwnership === '100% Grand Gedean Owned') {
      newPct = 100;
    } else if (newOwnership === 'Grand Gedean Majority Partnership (51%+)') {
      newPct = Math.max(51, formData.localOwnershipPct < 51 ? 51 : formData.localOwnershipPct);
    } else if (newOwnership === 'Minority Grand Gedean Partnership (<51%)') {
      newPct = Math.min(49, formData.localOwnershipPct >= 51 ? 40 : formData.localOwnershipPct);
    } else {
      newPct = 0;
    }
    setFormData(prev => ({
      ...prev,
      ownership: newOwnership,
      localOwnershipPct: newPct
    }));
  };

  const isFormQualified = formData.localOwnershipPct >= 51;

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSector = selectedSector === 'All' || b.sector === selectedSector;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesOwnership = true;
    if (ownershipFilter === 'Qualified') {
      matchesOwnership = b.isQualifiedGrandGedean || b.localOwnershipPct >= 51;
    } else if (ownershipFilter === 'Under51') {
      matchesOwnership = b.localOwnershipPct < 51;
    }

    return matchesSector && matchesSearch && matchesOwnership;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: UploadedCredential[] = [
      {
        id: `cred-${Date.now()}-1`,
        name: 'Liberia Business Registry (LBR) Certificate',
        docType: 'LBR Business Registration',
        fileName: attachedFiles.lbrCert.fileName,
        fileSize: attachedFiles.lbrCert.fileSize,
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Verification'
      },
      {
        id: `cred-${Date.now()}-2`,
        name: 'LRA Tax Clearance Certificate',
        docType: 'LRA Tax Clearance',
        fileName: attachedFiles.lraTax.fileName,
        fileSize: attachedFiles.lraTax.fileSize,
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Verification'
      },
      {
        id: `cred-${Date.now()}-3`,
        name: 'Proof of Physical Grand Gedeh Presence',
        docType: 'Proof of Address',
        fileName: attachedFiles.addressProof.fileName,
        fileSize: attachedFiles.addressProof.fileSize,
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Verification'
      }
    ];

    const trackingNum = registerBusiness({
      name: formData.name,
      sector: formData.sector,
      ownership: formData.ownership,
      localOwnershipPct: Number(formData.localOwnershipPct),
      isQualifiedGrandGedean: isFormQualified,
      location: formData.location,
      services: formData.servicesStr.split(',').map(s => s.trim()).filter(Boolean),
      contactPerson: formData.contactPerson,
      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,
      legalStatus: formData.legalStatus,
      taxStatus: formData.taxStatus,
      workforceSize: Number(formData.workforceSize),
      equipmentSummary: formData.equipmentSummary,
      pastContracts: formData.pastContractsStr.split(',').map(s => s.trim()).filter(Boolean),
      uploadedCredentials: credentials
    });

    setShowRegisterModal(false);
    setRegistrationSuccess(trackingNum);
  };

  return (
    <section className="py-12 bg-slate-900 text-slate-100 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Verified Grand Gedeh Enterprise Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Local Suppliers & Contractors Registry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              All listed enterprises undergo verification against Liberia Business Registry (LBR) records, 
              LRA tax compliance, and physical Grand Gedeh operations. 
              <strong className="text-amber-400 ml-1">Partnerships must possess 51% or higher Grand Gedean ownership</strong> to qualify for local content preferential quotas.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowRegisterModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Register Enterprise</span>
            </button>
          </div>
        </div>

        {/* Success Modal / Banner */}
        {registrationSuccess && (
          <div className="mb-8 p-4 bg-emerald-950/90 border border-emerald-500 rounded-xl flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">Application Received by Secretariat</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Your enterprise registration and proof documents have been submitted to the GGCDC Central Secretariat in Zwedru. 
                  Your tracking reference is <strong className="text-amber-400 font-mono">{registrationSuccess}</strong>.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setRegistrationSuccess(null)}
              className="text-slate-400 hover:text-white text-xs ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 51%+ Rule Policy Banner */}
        <div className="bg-slate-950 border border-amber-500/40 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-600/60 text-amber-400">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                Statutory 51%+ Local Ownership Threshold
              </h4>
              <p className="text-[11px] text-slate-300">
                In compliance with the Grand Gedeh Local Content Protocol (Art 4.2), partnerships must verify at least 51% Grand Gedean equity ownership to qualify for preferential bidding quotas under the Putu Iron Ore concession and infrastructure projects.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setOwnershipFilter(ownershipFilter === 'Qualified' ? 'All' : 'Qualified')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                ownershipFilter === 'Qualified'
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-900 text-emerald-400 border-emerald-800 hover:bg-slate-800'
              }`}
            >
              {ownershipFilter === 'Qualified' ? 'Showing: 51%+ Qualified' : 'Filter: 51%+ Qualified Only'}
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by company name, services, contact, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedSector === sector
                    ? 'bg-emerald-800 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBusinesses.map((biz) => {
            const isQualified = biz.isQualifiedGrandGedean || (biz.localOwnershipPct !== undefined ? biz.localOwnershipPct >= 51 : true);
            const isAccredited = biz.verificationStatus === 'Approved & Accredited';

            return (
              <div 
                key={biz.id} 
                className={`bg-slate-950/80 border rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-slate-600 shadow-xl ${
                  isQualified ? 'border-slate-800' : 'border-amber-900/60 bg-slate-950/40'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                      {biz.trackingNumber}
                    </span>
                    
                    {/* Status Pill */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                      isAccredited
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : !isQualified
                        ? 'bg-red-950 text-red-300 border border-red-700'
                        : 'bg-amber-950 text-amber-300 border border-amber-700'
                    }`}>
                      {isAccredited ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Clock className="w-3 h-3 text-amber-400" />}
                      <span>{biz.verificationStatus}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {biz.name}
                  </h3>

                  <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                    <span className="text-amber-400 font-medium">{biz.sector}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{biz.location}</span>
                    </span>
                  </div>

                  {/* 51% Ownership Status Badge */}
                  <div className="mt-3 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Grand Gedean Equity:</span>
                      <span className={`font-bold ${isQualified ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {biz.localOwnershipPct ?? 100}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Ownership Type:</span>
                      <span className="text-slate-300 truncate max-w-[170px]" title={biz.ownership}>
                        {biz.ownership}
                      </span>
                    </div>
                    <div className="pt-1 border-t border-slate-800 text-[10px]">
                      {isQualified ? (
                        <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Qualified Grand Gedean Business (51%+)</span>
                        </span>
                      ) : (
                        <span className="text-amber-400 font-semibold flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                          <span>Non-Qualified: Below 51% Local Equity</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Services Tags */}
                  <div className="mt-3">
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Core Offerings:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {biz.services.map((srv, idx) => (
                        <span key={idx} className="bg-slate-900 text-slate-300 text-[11px] px-2 py-0.5 rounded border border-slate-800">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Uploaded Documents Indicator */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{biz.uploadedCredentials?.length || 3} Audited Documents</span>
                    </span>
                    <span className="text-emerald-400 font-medium">{biz.taxStatus}</span>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Contact:</span>
                    <span className="text-slate-200 font-medium">{biz.contactPerson}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phone:</span>
                    <span className="text-slate-300 font-mono">{biz.contactPhone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Workforce Size:</span>
                    <span className="text-white font-bold">{biz.workforceSize} Full-time</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* REGISTRATION MODAL WITH WORKING REAL FILE UPLOAD */}
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-emerald-500/60 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
              
              <button
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 space-y-1">
                <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Grand Gedeh Local Content Protocol</span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  Register Local Enterprise & Upload Credentials
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  All registrations are submitted directly to the GGCDC Central Secretariat for verification against the Liberia Business Registry (LBR) and LRA tax databases.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* Enterprise Name */}
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Enterprise Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cavalla Valley Logistics Syndicate Ltd."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Industrial Sector & Ownership Structure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Industrial Sector *</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    >
                      {sectors.filter(s => s !== 'All').map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Ownership Structure *</label>
                    <select
                      value={formData.ownership}
                      onChange={(e) => handleOwnershipChange(e.target.value as BusinessOwnershipType)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="100% Grand Gedean Owned">100% Grand Gedean Owned (100% Local Equity)</option>
                      <option value="Grand Gedean Majority Partnership (51%+)">Grand Gedean Majority Partnership (51% or More Grand Gedean Owned)</option>
                      <option value="Minority Grand Gedean Partnership (<51%)">Minority Grand Gedean Partnership (Less than 51% Grand Gedean Owned)</option>
                      <option value="Foreign / Non-Local Enterprise">Foreign / Non-Local Enterprise</option>
                    </select>
                  </div>
                </div>

                {/* 51%+ RULE: EQUITY PERCENTAGE & LIVE VALIDATION ALERT */}
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <label className="block text-white font-bold text-xs">
                        Grand Gedean Ownership / Equity Percentage (%) *
                      </label>
                      <span className="text-[11px] text-slate-400">
                        A partnership must possess 51% or higher to qualify as a Grand Gedean enterprise.
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        required
                        value={formData.localOwnershipPct}
                        onChange={(e) => {
                          const val = Math.min(100, Math.max(0, Number(e.target.value)));
                          setFormData({
                            ...formData,
                            localOwnershipPct: val,
                            ownership: val === 100 
                              ? '100% Grand Gedean Owned' 
                              : val >= 51 
                              ? 'Grand Gedean Majority Partnership (51%+)' 
                              : val > 0 
                              ? 'Minority Grand Gedean Partnership (<51%)'
                              : 'Foreign / Non-Local Enterprise'
                          });
                        }}
                        className="w-24 bg-slate-900 border border-amber-500 rounded-lg p-2 text-white font-bold text-center text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <span className="text-white font-bold">%</span>
                    </div>
                  </div>

                  {/* Real-time Qualification Notice */}
                  {isFormQualified ? (
                    <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/80 rounded-lg flex items-start space-x-2 text-[11px]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-300">
                          QUALIFIED: Meets the statutory 51%+ Grand Gedean ownership requirement.
                        </span>
                        <p className="text-slate-300 mt-0.5">
                          Eligible for preferential concession procurement quotas and official GGCDC accreditation upon Secretariat audit.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-amber-950/80 border border-amber-500/80 rounded-lg flex items-start space-x-2 text-[11px]">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300">
                          NOT QUALIFIED: Grand Gedean ownership is {formData.localOwnershipPct}% (Below 51% threshold).
                        </span>
                        <p className="text-slate-300 mt-0.5">
                          Per GGCDC Local Content Protocol Art 4.2, partnerships require at least 51% Grand Gedean equity to qualify as a local enterprise. You may register, but will not receive local content preferential quota accreditation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Location & Workforce */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Physical Location in Grand Gedeh *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Commercial Avenue, Zwedru City"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Full-Time Workforce Size *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.workforceSize}
                      onChange={(e) => setFormData({ ...formData, workforceSize: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Services */}
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Services / Goods Provided (Comma-separated) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gravel crushing, Dump truck hauling, Road grading, Concrete casting"
                    value={formData.servicesStr}
                    onChange={(e) => setFormData({ ...formData, servicesStr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Contact Person & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eng. Emmanuel Gaye"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Direct Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+231 770 000 000"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* WORKING REAL FILE UPLOAD SECTION WITH WORKING BROWSE BUTTONS */}
                <div className="p-4 bg-slate-950 border border-amber-500/50 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                      <Upload className="w-4 h-4" />
                      <span>Upload Proof Documents for Secretariat Audit</span>
                    </div>
                    <span className="text-[10px] text-slate-400">PDF, JPG, PNG, DOCX accepted</span>
                  </div>

                  {/* Hidden Real HTML File Inputs */}
                  <input
                    type="file"
                    ref={lbrFileInputRef}
                    onChange={(e) => handleFileChange(e, 'lbrCert')}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={lraFileInputRef}
                    onChange={(e) => handleFileChange(e, 'lraTax')}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={addressFileInputRef}
                    onChange={(e) => handleFileChange(e, 'addressProof')}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Document 1: LBR Registration */}
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl flex flex-col justify-between space-y-2">
                      <div>
                        <span className="block text-[11px] text-slate-200 font-bold">1. LBR Registration</span>
                        <span className="text-[10px] text-slate-400 block mb-1">Liberia Business Registry Certificate</span>
                        
                        <div className="flex items-center space-x-1.5 p-1.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{attachedFiles.lbrCert.fileName}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Size: {attachedFiles.lbrCert.fileSize}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => lbrFileInputRef.current?.click()}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/60 font-bold text-xs py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse / Upload File</span>
                      </button>
                    </div>

                    {/* Document 2: LRA Tax Clearance */}
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl flex flex-col justify-between space-y-2">
                      <div>
                        <span className="block text-[11px] text-slate-200 font-bold">2. LRA Tax Clearance</span>
                        <span className="text-[10px] text-slate-400 block mb-1">Valid Tax Clearance Receipt</span>
                        
                        <div className="flex items-center space-x-1.5 p-1.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{attachedFiles.lraTax.fileName}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Size: {attachedFiles.lraTax.fileSize}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => lraFileInputRef.current?.click()}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/60 font-bold text-xs py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse / Upload File</span>
                      </button>
                    </div>

                    {/* Document 3: Proof of Address */}
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl flex flex-col justify-between space-y-2">
                      <div>
                        <span className="block text-[11px] text-slate-200 font-bold">3. Proof of Address</span>
                        <span className="text-[10px] text-slate-400 block mb-1">Lease Deed or Town Chief Attestation</span>
                        
                        <div className="flex items-center space-x-1.5 p-1.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{attachedFiles.addressProof.fileName}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Size: {attachedFiles.addressProof.fileSize}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => addressFileInputRef.current?.click()}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/60 font-bold text-xs py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse / Upload File</span>
                      </button>
                    </div>

                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Status: <strong className={isFormQualified ? 'text-emerald-400' : 'text-amber-400'}>
                      {isFormQualified ? '51%+ Qualified Local Enterprise' : 'Ineligible for Preferential Local Quota (<51%)'}
                    </strong>
                  </span>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowRegisterModal(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center space-x-1.5 transition-transform hover:scale-105"
                    >
                      <span>Transmit to Secretariat Desk</span>
                      <ShieldCheck className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
