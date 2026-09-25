import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  PlusCircle, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Upload, 
  CheckCircle, 
  FileText, 
  ExternalLink,
  Clock,
  Building2,
  Mail
} from 'lucide-react';
import { useApp } from '../utils/context';
import { UploadedCredential } from '../types';

export const BusinessRegistry: React.FC = () => {
  const { businesses, registerBusiness, setActiveView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sector: 'Construction',
    ownership: '100% Grand Gedeh' as const,
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

  // Attached files state
  const [attachedFiles, setAttachedFiles] = useState<{
    lbrCert: string;
    lraTax: string;
    addressProof: string;
  }>({
    lbrCert: 'LBR_Certificate_Scan.pdf',
    lraTax: 'LRA_Tax_Clearance_2026.pdf',
    addressProof: 'Zwedru_Office_Proof.pdf'
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

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSector = selectedSector === 'All' || b.sector === selectedSector;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSector && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: UploadedCredential[] = [
      {
        id: `cred-${Date.now()}-1`,
        name: 'Liberia Business Registry (LBR) Certificate',
        docType: 'LBR Business Registration',
        fileName: attachedFiles.lbrCert,
        fileSize: '1.4 MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Verification'
      },
      {
        id: `cred-${Date.now()}-2`,
        name: 'LRA Tax Clearance Certificate',
        docType: 'LRA Tax Clearance',
        fileName: attachedFiles.lraTax,
        fileSize: '950 KB',
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Verification'
      },
      {
        id: `cred-${Date.now()}-3`,
        name: 'Proof of Physical Grand Gedeh Presence',
        docType: 'Proof of Address',
        fileName: attachedFiles.addressProof,
        fileSize: '2.1 MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Verification'
      }
    ];

    const trackingNum = registerBusiness({
      name: formData.name,
      sector: formData.sector,
      ownership: formData.ownership,
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
              Grand Gedeh Business & Supplier Registry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Concessionaires (Putu Mining Corp, Singbeh, Cavalla Agro) are mandated to procure from verified local suppliers. 
              Register your enterprise with uploaded LBR and Tax credentials to receive accreditation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveView('verification')}
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-600/80 font-bold text-xs px-4 py-2.5 rounded-lg shadow transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Secretariat Audit Desk</span>
            </button>

            <button
              onClick={() => setShowRegisterModal(true)}
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-lg transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register Enterprise & Upload Docs</span>
            </button>
          </div>
        </div>

        {/* Tracking Success Notification */}
        {registrationSuccess && (
          <div className="mb-8 p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500 rounded-2xl shadow-2xl space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Enterprise Application Successfully Registered!</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Your application and 3 uploaded credentials (LBR, Tax, Proof of Address) have been transmitted to the 
              <strong> GGCDC Secretariat Verification Desk</strong> under Tracking Number:
            </p>
            <div className="inline-block bg-slate-950 border border-amber-500/80 text-amber-400 font-mono font-bold text-sm px-3 py-1 rounded-lg">
              {registrationSuccess}
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              Secretariat officers will audit your uploaded documents and award the official "Verified Local Supplier" accreditation badge.
            </p>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search vendor name, capability, contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedSector === sec
                    ? 'bg-emerald-600 text-white font-semibold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 hover:border-emerald-500 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded">
                    {biz.sector}
                  </span>
                  {biz.verificationStatus === 'Approved & Accredited' ? (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-300 bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Verified Supplier</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-300 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Audit Pending</span>
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-mono text-slate-500">Tracking: {biz.trackingNumber}</div>
                <h3 className="text-base font-bold text-white mt-1 leading-snug">
                  {biz.name}
                </h3>
                
                <div className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{biz.location}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-medium">{biz.ownership}</span>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 block mb-1">Products & Services:</span>
                  <div className="flex flex-wrap gap-1">
                    {biz.services.map((svc, idx) => (
                      <span key={idx} className="bg-slate-900 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-900/70 border border-slate-800 rounded-lg text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Legal Registration:</span>
                    <span className="text-emerald-400 font-medium">{biz.legalStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Tax Compliance:</span>
                    <span className="text-emerald-400 font-medium">{biz.taxStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Verified Credentials:</span>
                    <span className="text-white font-medium">{biz.uploadedCredentials?.length || 0} Documents On File</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Contact Person:</span>
                  <span className="font-semibold text-white">{biz.contactPerson}</span>
                </div>
                <a
                  href={`tel:${biz.contactPhone}`}
                  className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-700/60 px-2.5 py-1.5 rounded-lg flex items-center space-x-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Vendor</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Register Local Business WITH Credential Uploads */}
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Grand Gedeh Local Content Protocol</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Register Local Enterprise & Upload Credentials
              </h2>
              <p className="text-xs text-slate-300 mt-1 mb-6">
                All registrations are submitted directly to the GGCDC Central Secretariat for verification 
                against the Liberia Business Registry (LBR) and LRA tax databases.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Enterprise Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cavalla Aggregate & Civil Quarrying Ltd."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Industrial Sector</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Construction">Construction & Civil Engineering</option>
                      <option value="Transportation">Transportation & Logistics</option>
                      <option value="Fuel supply">Fuel & Bulk Petroleum</option>
                      <option value="Catering">Catering & Camp Support</option>
                      <option value="ICT">ICT & Electrical Power</option>
                      <option value="Security">Security & Facility Protection</option>
                      <option value="Environmental services">Environmental Sanitation</option>
                      <option value="Equipment rental">Heavy Machinery Hire</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Ownership Structure</label>
                    <select
                      value={formData.ownership}
                      onChange={(e) => setFormData({ ...formData, ownership: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="100% Grand Gedeh">100% Grand Gedeh Resident Owned</option>
                      <option value="Liberian Majority">Liberian Majority Owned (51%+)</option>
                      <option value="Joint Venture">Joint Venture with Foreign Partner</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Physical Location in Grand Gedeh</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zwedru City Center / Putu Jarwodee"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Full-Time Workforce Size</label>
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

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Services / Goods Provided (Comma-separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gravel crushing, Dump truck hauling, Road grading, Concrete casting"
                    value={formData.servicesStr}
                    onChange={(e) => setFormData({ ...formData, servicesStr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Contact Person</label>
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
                    <label className="block text-slate-300 mb-1 font-medium">Direct Phone Number</label>
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

                {/* MANDATORY CREDENTIAL UPLOAD SECTION */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <Upload className="w-4 h-4" />
                    <span>Upload Proof Documents for Secretariat Audit</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-2.5 bg-slate-900 border border-slate-700 rounded-lg">
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">1. LBR Registration</label>
                      <input
                        type="text"
                        value={attachedFiles.lbrCert}
                        onChange={(e) => setAttachedFiles({ ...attachedFiles, lbrCert: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-[11px] text-emerald-400"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">PDF or Stamped Scan</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 border border-slate-700 rounded-lg">
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">2. LRA Tax Clearance</label>
                      <input
                        type="text"
                        value={attachedFiles.lraTax}
                        onChange={(e) => setAttachedFiles({ ...attachedFiles, lraTax: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-[11px] text-emerald-400"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">Valid Tax Receipt</span>
                    </div>

                    <div className="p-2.5 bg-slate-900 border border-slate-700 rounded-lg">
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">3. Proof of Address</label>
                      <input
                        type="text"
                        value={attachedFiles.addressProof}
                        onChange={(e) => setAttachedFiles({ ...attachedFiles, addressProof: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-[11px] text-emerald-400"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">Lease or Town Letter</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center space-x-1.5"
                  >
                    <span>Transmit to Secretariat Desk</span>
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
