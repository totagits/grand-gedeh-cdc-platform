import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  CheckCircle, 
  Building2, 
  Users, 
  Award, 
  Check, 
  FileCheck2,
} from 'lucide-react';
import { useApp } from '../utils/context';
import { BusinessSupplier, WorkforceProfile, UploadedCredential } from '../types';

export const SecretariatVerificationDesk: React.FC = () => {
  const { 
    businesses, 
    workforce, 
    updateBusinessVerification, 
    updateWorkforceVerification, 
    verifyCredentialDoc 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'businesses' | 'workforce'>('businesses');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedBiz, setSelectedBiz] = useState<BusinessSupplier | null>(businesses[businesses.length - 1] || businesses[0]);
  const [selectedWf, setSelectedWf] = useState<WorkforceProfile | null>(workforce[workforce.length - 1] || workforce[0]);

  const [auditorName, setAuditorName] = useState('Secretariat Compliance Officer');
  const [auditNotes, setAuditNotes] = useState('');
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null);

  const filteredBusinesses = businesses.filter((b) => {
    const matchesStatus = filterStatus === 'All' || b.verificationStatus === filterStatus;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredWorkforce = workforce.filter((w) => {
    const matchesStatus = filterStatus === 'All' || w.verificationStatus === filterStatus;
    const matchesSearch = w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApproveBusiness = (biz: BusinessSupplier) => {
    updateBusinessVerification(biz.id, 'Approved & Accredited', auditNotes || 'Credentials, LBR registration, and physical Grand Gedeh presence authenticated.', auditorName);
    setActionSuccessNotice(`Enterprise ${biz.name} has been formally ACCREDITED and awarded Verified Local Supplier status!`);
    setTimeout(() => setActionSuccessNotice(null), 5000);
  };

  const handleFlagBusiness = (biz: BusinessSupplier) => {
    updateBusinessVerification(biz.id, 'Information Required', auditNotes || 'Additional tax clearance documentation required.', auditorName);
    setActionSuccessNotice(`Notice dispatched to ${biz.name} requesting supplementary documentation.`);
    setTimeout(() => setActionSuccessNotice(null), 5000);
  };

  const handleApproveWorkforce = (wf: WorkforceProfile) => {
    updateWorkforceVerification(wf.id, 'Approved & Accredited', auditNotes || 'Trade certificates and professional licenses verified.', auditorName);
    setActionSuccessNotice(`Professional ${wf.fullName} has been ACCREDITED into the Grand Gedeh Talent Roster!`);
    setTimeout(() => setActionSuccessNotice(null), 5000);
  };

  const handleDocToggle = (entityType: 'business' | 'workforce', entityId: string, cred: UploadedCredential) => {
    const nextStatus = cred.status === 'Verified' ? 'Requires Re-upload' : 'Verified';
    verifyCredentialDoc(entityType, entityId, cred.id, nextStatus, `Audited by ${auditorName}`);
    setActionSuccessNotice(`Credential "${cred.name}" updated to: ${nextStatus}`);
    setTimeout(() => setActionSuccessNotice(null), 3000);
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-400 bg-amber-950/80 border border-amber-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GGCDC Secretariat Institutional Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Accreditation & Credential Verification Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
            Used by the GGCDC Secretariat to verify enterprise filings, inspect uploaded LBR/LRA tax clearances, 
            authenticate qualifications, and award official local content accreditation for concession procurement (Putu, Singbeh, MPW).
          </p>
        </div>

        {/* Global Statistics Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">Registered Enterprises</span>
            <span className="text-2xl font-black text-white">{businesses.length}</span>
            <span className="text-[11px] text-emerald-400 block mt-1">
              {businesses.filter(b => b.verificationStatus === 'Approved & Accredited').length} Accredited
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">Pending Business Audits</span>
            <span className="text-2xl font-black text-amber-400">
              {businesses.filter(b => b.verificationStatus === 'Pending Secretarial Audit').length}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Awaiting Credential Check</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">Talent & Diaspora Roster</span>
            <span className="text-2xl font-black text-white">{workforce.length}</span>
            <span className="text-[11px] text-emerald-400 block mt-1">
              {workforce.filter(w => w.verificationStatus === 'Approved & Accredited').length} Accredited
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">Pending Talent Audits</span>
            <span className="text-2xl font-black text-amber-400">
              {workforce.filter(w => w.verificationStatus === 'Pending Secretarial Audit').length}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Trade/Degree Validation</span>
          </div>
        </div>

        {/* Action Success Alert */}
        {actionSuccessNotice && (
          <div className="mb-6 p-4 bg-emerald-950/90 border border-emerald-500 rounded-xl text-xs text-emerald-200 flex items-center space-x-3 shadow-2xl">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="font-semibold">{actionSuccessNotice}</span>
          </div>
        )}

        {/* Primary Tabs */}
        <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('businesses')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'businesses'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Business Verification Queue ({filteredBusinesses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('workforce')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'workforce'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Talent & Diaspora Queue ({filteredWorkforce.length})</span>
          </button>
        </div>

        {/* Content: Businesses */}
        {activeTab === 'businesses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Queue List */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-white uppercase tracking-wider">Enterprise Applications</span>
                <span className="text-slate-400">{filteredBusinesses.length} Records</span>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter name, tracking number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center space-x-1 overflow-x-auto pb-1 text-[11px]">
                {['All', 'Pending Secretarial Audit', 'Approved & Accredited', 'Information Required'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                      filterStatus === st ? 'bg-amber-600 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st === 'Pending Secretarial Audit' ? 'Pending' : st === 'Approved & Accredited' ? 'Accredited' : st}
                  </button>
                ))}
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredBusinesses.map((biz) => {
                  const isSelected = selectedBiz?.id === biz.id;
                  const isApproved = biz.verificationStatus === 'Approved & Accredited';

                  return (
                    <div
                      key={biz.id}
                      onClick={() => setSelectedBiz(biz)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-amber-500 shadow-lg ring-1 ring-amber-500/30'
                          : 'bg-slate-950/70 border-slate-800 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-mono text-amber-400 font-semibold">{biz.trackingNumber}</span>
                        <span className={`px-2 py-0.2 rounded-full font-bold ${
                          isApproved ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-amber-950 text-amber-300 border border-amber-700'
                        }`}>
                          {biz.verificationStatus}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm leading-snug">{biz.name}</h4>
                      <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                        <span>{biz.sector} • {biz.location}</span>
                        <span className="text-slate-300 font-mono">{biz.uploadedCredentials?.length || 0} Docs</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dossier & Document Inspector */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {selectedBiz ? (
                <div className="space-y-6">
                  
                  <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-mono text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                          {selectedBiz.trackingNumber}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300">{selectedBiz.sector}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white mt-1">
                        {selectedBiz.name}
                      </h3>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Location: <span className="text-slate-200">{selectedBiz.location}</span> • Ownership: <span className="text-emerald-400 font-semibold">{selectedBiz.ownership}</span>
                      </div>
                    </div>

                    <span className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold ${
                      selectedBiz.verificationStatus === 'Approved & Accredited'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : 'bg-amber-950 text-amber-300 border border-amber-600'
                    }`}>
                      {selectedBiz.verificationStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Contact Person:</span>
                      <span className="font-bold text-white">{selectedBiz.contactPerson}</span>
                      <span className="text-slate-400 text-[11px] block">{selectedBiz.contactPhone}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px]">Workforce & Tax:</span>
                      <span className="font-bold text-white">{selectedBiz.workforceSize} Personnel</span>
                      <span className="text-emerald-400 text-[11px] block">{selectedBiz.taxStatus}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px]">Machinery:</span>
                      <span className="text-slate-300 text-[11px] line-clamp-2">{selectedBiz.equipmentSummary}</span>
                    </div>
                  </div>

                  {/* Document Inspection Cards */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-400" />
                      <span>Uploaded Credentials & Legal Filing Verification</span>
                    </h4>

                    <div className="space-y-2">
                      {selectedBiz.uploadedCredentials && selectedBiz.uploadedCredentials.length > 0 ? (
                        selectedBiz.uploadedCredentials.map((cred) => {
                          const isDocVerified = cred.status === 'Verified';

                          return (
                            <div 
                              key={cred.id} 
                              className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${isDocVerified ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-bold text-white">{cred.name}</div>
                                  <div className="text-slate-400 text-[11px]">
                                    {cred.fileName} • {cred.fileSize} • Uploaded {cred.uploadedAt}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDocToggle('business', selectedBiz.id, cred)}
                                className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1 transition-all ${
                                  isDocVerified
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                                    : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-600'
                                }`}
                              >
                                {isDocVerified ? <Check className="w-3.5 h-3.5" /> : null}
                                <span>{isDocVerified ? 'Verified' : 'Verify'}</span>
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 text-center text-xs">
                          No digital credentials uploaded yet.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Secretarial Action Decision Box */}
                  <div className="p-4 bg-slate-950 border border-amber-500/40 rounded-xl space-y-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Secretariat Determination
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1">Auditing Officer:</label>
                        <input
                          type="text"
                          value={auditorName}
                          onChange={(e) => setAuditorName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Audit Notes:</label>
                        <input
                          type="text"
                          placeholder="e.g. LBR & Tax certified in order."
                          value={auditNotes}
                          onChange={(e) => setAuditNotes(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => handleFlagBusiness(selectedBiz)}
                        className="bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-semibold px-4 py-2 rounded-lg"
                      >
                        Request Additional Documents
                      </button>

                      <button
                        onClick={() => handleApproveBusiness(selectedBiz)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2 rounded-lg shadow-lg flex items-center space-x-1.5"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Issue Official Accreditation Badge</span>
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 text-xs">
                  Select an enterprise from the queue to inspect credentials.
                </div>
              )}
            </div>

          </div>
        )}

        {/* Content: Workforce */}
        {activeTab === 'workforce' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Talent Queue */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-white uppercase tracking-wider">Talent Applications</span>
                <span className="text-slate-400">{filteredWorkforce.length} Records</span>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter name, trade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredWorkforce.map((person) => {
                  const isSelected = selectedWf?.id === person.id;
                  const isApproved = person.verificationStatus === 'Approved & Accredited';

                  return (
                    <div
                      key={person.id}
                      onClick={() => setSelectedWf(person)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-amber-500 shadow-lg ring-1 ring-amber-500/30'
                          : 'bg-slate-950/70 border-slate-800 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-mono text-amber-400 font-semibold">{person.trackingNumber}</span>
                        <span className={`px-2 py-0.2 rounded-full font-bold ${
                          isApproved ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-amber-950 text-amber-300 border border-amber-700'
                        }`}>
                          {person.verificationStatus}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm leading-snug">{person.fullName}</h4>
                      <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                        <span>{person.tradeCategory}</span>
                        <span className="text-emerald-400 font-mono">{person.qualificationLevel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Talent Inspector */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {selectedWf ? (
                <div className="space-y-6">
                  
                  <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-mono text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                          {selectedWf.trackingNumber}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300">{selectedWf.district}</span>
                        {selectedWf.isDiaspora && (
                          <span className="bg-sky-950 text-sky-300 px-2 py-0.2 rounded text-[10px] border border-sky-800 font-semibold">
                            Diaspora: {selectedWf.diasporaCountry}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-extrabold text-white mt-1">
                        {selectedWf.fullName}
                      </h3>
                      <div className="text-xs text-slate-300 mt-0.5">
                        {selectedWf.specialization} • <span className="text-emerald-400 font-semibold">{selectedWf.yearsExperience} Yrs Exp</span>
                      </div>
                    </div>

                    <span className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold ${
                      selectedWf.verificationStatus === 'Approved & Accredited'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : 'bg-amber-950 text-amber-300 border border-amber-600'
                    }`}>
                      {selectedWf.verificationStatus}
                    </span>
                  </div>

                  {/* Uploaded Qualifications */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>Uploaded Qualifications & Professional Licenses</span>
                    </h4>

                    <div className="space-y-2">
                      {selectedWf.uploadedCredentials && selectedWf.uploadedCredentials.length > 0 ? (
                        selectedWf.uploadedCredentials.map((cred) => {
                          const isVerified = cred.status === 'Verified';

                          return (
                            <div 
                              key={cred.id} 
                              className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${isVerified ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-bold text-white">{cred.name}</div>
                                  <div className="text-slate-400 text-[11px]">
                                    {cred.fileName} • {cred.fileSize} • Uploaded {cred.uploadedAt}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDocToggle('workforce', selectedWf.id, cred)}
                                className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1 ${
                                  isVerified
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                    : 'bg-slate-800 text-amber-400 border border-amber-600'
                                }`}
                              >
                                {isVerified ? <Check className="w-3.5 h-3.5" /> : null}
                                <span>{isVerified ? 'Verified' : 'Verify'}</span>
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 text-center text-xs">
                          No credentials uploaded yet.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 border border-amber-500/40 rounded-xl space-y-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Accreditation Certification
                    </span>
                    <button
                      onClick={() => handleApproveWorkforce(selectedWf)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-lg shadow-lg flex items-center justify-center space-x-1.5"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Accredit Professional into Grand Gedeh Concession Roster</span>
                    </button>
                  </div>

                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 text-xs">
                  Select a worker profile from the queue to inspect credentials.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
