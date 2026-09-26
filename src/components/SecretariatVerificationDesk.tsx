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
  AlertTriangle,
  Clock,
  Radio,
  Smartphone,
  Mail,
  Send,
  CheckCheck,
  ExternalLink,
  MessageSquare,
  Copy,
  Filter,
  XCircle
} from 'lucide-react';
import { useApp } from '../utils/context';
import { BusinessSupplier, WorkforceProfile, UploadedCredential, NotificationDispatchRecord } from '../types';

export const SecretariatVerificationDesk: React.FC = () => {
  const { 
    businesses, 
    workforce, 
    updateBusinessVerification, 
    updateWorkforceVerification, 
    verifyCredentialDoc,
    notifications,
    sendDispatchNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState<'businesses' | 'workforce' | 'audit_log'>('businesses');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationChannelFilter, setNotificationChannelFilter] = useState<'All' | 'sms' | 'email'>('All');
  const [copiedNotificationId, setCopiedNotificationId] = useState<string | null>(null);
  
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

  const filteredNotifications = notifications.filter((notif) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      notif.recipientName.toLowerCase().includes(q) ||
      notif.recipientPhone.toLowerCase().includes(q) ||
      notif.recipientEmail.toLowerCase().includes(q) ||
      notif.trackingNumber.toLowerCase().includes(q) ||
      notif.smsMessage.toLowerCase().includes(q) ||
      notif.emailSubject.toLowerCase().includes(q) ||
      notif.emailBody.toLowerCase().includes(q);
    return matchesSearch;
  });

  const handleCopyNotification = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotificationId(id);
    setTimeout(() => setCopiedNotificationId(null), 2500);
  };

  const handleApproveBusiness = (biz: BusinessSupplier) => {
    updateBusinessVerification(biz.id, 'Approved & Accredited', auditNotes || 'Credentials, LBR registration, and physical Grand Gedeh presence authenticated.', auditorName);
    setActionSuccessNotice(`Enterprise ${biz.name} has been formally ACCREDITED! Liberian GSM SMS (+231) & Official Secretariat Accreditation Email automatically dispatched.`);
    setTimeout(() => setActionSuccessNotice(null), 6000);
  };

  const handleFlagBusiness = (biz: BusinessSupplier) => {
    updateBusinessVerification(biz.id, 'Information Required', auditNotes || 'Additional tax clearance documentation required.', auditorName);
    setActionSuccessNotice(`Notice dispatched to ${biz.name} requesting supplementary documentation via GSM SMS & Email.`);
    setTimeout(() => setActionSuccessNotice(null), 6000);
  };

  const handleDenyBusiness = (biz: BusinessSupplier) => {
    const reason = auditNotes || 'Failed Section 13 Grand Gedean Beneficial Ownership Mandate (<51% indigenous ownership) or non-verifiable operational presence.';
    updateBusinessVerification(biz.id, 'Denied & Disqualified', reason, auditorName);
    setActionSuccessNotice(`Enterprise ${biz.name} has been formally DISQUALIFIED & DENIED. Formal Disqualification Order & Right to Appeal dispatched via SMS and Email.`);
    setTimeout(() => setActionSuccessNotice(null), 6000);
  };

  const handleApproveWorkforce = (wf: WorkforceProfile) => {
    updateWorkforceVerification(wf.id, 'Approved & Accredited', auditNotes || 'Trade certificates and professional licenses verified.', auditorName);
    setActionSuccessNotice(`Professional ${wf.fullName} has been ACCREDITED into the Grand Gedeh Talent Roster! Instant GSM SMS notification dispatched.`);
    setTimeout(() => setActionSuccessNotice(null), 6000);
  };

  const handleDenyWorkforce = (wf: WorkforceProfile) => {
    const reason = auditNotes || 'Credentials failed verification protocol or counterfeit certification detected.';
    updateWorkforceVerification(wf.id, 'Denied & Disqualified', reason, auditorName);
    setActionSuccessNotice(`Candidate ${wf.fullName} has been DISQUALIFIED & DENIED. Formal Denial Notice dispatched via GSM SMS and Email.`);
    setTimeout(() => setActionSuccessNotice(null), 6000);
  };

  const handleDocToggle = (entityType: 'business' | 'workforce', entityId: string, cred: UploadedCredential) => {
    const nextStatus = cred.status === 'Verified' ? 'Requires Re-upload' : 'Verified';
    verifyCredentialDoc(entityType, entityId, cred.id, nextStatus, `Audited by ${auditorName}`);
    setActionSuccessNotice(`Credential "${cred.name}" updated to: ${nextStatus}`);
    setTimeout(() => setActionSuccessNotice(null), 3000);
  };

  return (
    <section className="py-12 bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 min-h-[90vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GGCDC Secretariat Institutional Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Accreditation & Credential Verification Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl mt-1">
            Used by the GGCDC Secretariat to verify enterprise filings, inspect uploaded LBR/LRA tax clearances, 
            authenticate qualifications, and award official local content accreditation for concession procurement (Putu, Singbeh, MPW).
          </p>
        </div>

        {/* Global Statistics Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Registered Enterprises</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{businesses.length}</span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block mt-1">
              {businesses.filter(b => b.verificationStatus === 'Approved & Accredited').length} Accredited
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Pending Business Audits</span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
              {businesses.filter(b => b.verificationStatus === 'Pending Secretarial Audit').length}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">Awaiting Credential Check</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Talent & Diaspora Roster</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{workforce.length}</span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block mt-1">
              {workforce.filter(w => w.verificationStatus === 'Approved & Accredited').length} Accredited
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Pending Talent Audits</span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
              {workforce.filter(w => w.verificationStatus === 'Pending Secretarial Audit').length}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">Trade/Degree Validation</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 col-span-2 sm:col-span-1 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Disqualified / Denied</span>
            <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
              {businesses.filter(b => b.verificationStatus === 'Denied & Disqualified').length +
               workforce.filter(w => w.verificationStatus === 'Denied & Disqualified').length}
            </span>
            <span className="text-[11px] text-rose-600/80 dark:text-rose-400/80 block mt-1">Appeals Window Active</span>
          </div>
        </div>

        {/* Action Success Alert */}
        {actionSuccessNotice && (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-500 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-center space-x-3 shadow-md">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="font-semibold">{actionSuccessNotice}</span>
          </div>
        )}

        {/* Primary Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('businesses')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'businesses'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white dark:border-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Business Verification Queue ({filteredBusinesses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('workforce')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'workforce'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white dark:border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Talent & Diaspora Queue ({filteredWorkforce.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit_log')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'audit_log'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white dark:border-slate-800'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Dispatched Alerts & Transparency Ledger ({notifications.length})</span>
          </button>
        </div>

        {/* Content: Businesses */}
        {activeTab === 'businesses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Queue List */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Enterprise Applications</span>
                <span className="text-slate-500 dark:text-slate-400">{filteredBusinesses.length} Records</span>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter name, tracking number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center space-x-1 overflow-x-auto pb-1 text-[11px]">
                {['All', 'Pending Secretarial Audit', 'Approved & Accredited', 'Information Required', 'Denied & Disqualified'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                      filterStatus === st 
                        ? 'bg-amber-500 text-slate-950 font-bold' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {st === 'Pending Secretarial Audit' ? 'Pending' : st === 'Approved & Accredited' ? 'Accredited' : st === 'Denied & Disqualified' ? 'Disqualified' : st}
                  </button>
                ))}
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredBusinesses.map((biz) => {
                  const isSelected = selectedBiz?.id === biz.id;
                  const isApproved = biz.verificationStatus === 'Approved & Accredited';
                  const isDenied = biz.verificationStatus === 'Denied & Disqualified';

                  return (
                    <div
                      key={biz.id}
                      onClick={() => setSelectedBiz(biz)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-50/70 border-amber-500 shadow-md ring-1 ring-amber-500/30 dark:bg-slate-800 dark:border-amber-500'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 dark:bg-slate-950/70 dark:border-slate-800 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-mono text-amber-700 dark:text-amber-400 font-semibold">{biz.trackingNumber}</span>
                        <span className={`px-2 py-0.2 rounded-full font-bold text-[10px] ${
                          isApproved 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700' 
                            : isDenied 
                            ? 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-700' 
                            : 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
                        }`}>
                          {biz.verificationStatus}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{biz.name}</h4>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                        <span>{biz.sector} • {biz.location}</span>
                        <span className="text-slate-600 dark:text-slate-300 font-mono">{biz.uploadedCredentials?.length || 0} Docs</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dossier & Document Inspector */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-2xl">
              {selectedBiz ? (
                <div className="space-y-6">
                  
                  <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-mono text-amber-800 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">
                          {selectedBiz.trackingNumber}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500">•</span>
                        <span className="text-slate-600 dark:text-slate-300">{selectedBiz.sector}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                        {selectedBiz.name}
                      </h3>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Location: <span className="text-slate-800 dark:text-slate-200">{selectedBiz.location}</span> • Ownership: <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{selectedBiz.ownership}</span>
                      </div>
                    </div>

                    <span className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold ${
                      selectedBiz.verificationStatus === 'Approved & Accredited'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-600'
                        : selectedBiz.verificationStatus === 'Denied & Disqualified'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-600'
                        : 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-600'
                    }`}>
                      {selectedBiz.verificationStatus}
                    </span>
                  </div>

                  {/* Articles of Incorporation & Ownership Verification Audit Alert */}
                  <div className={`p-3.5 rounded-xl border flex items-start space-x-2.5 text-xs ${
                    selectedBiz.verificationStatus === 'Approved & Accredited'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-600/80 dark:text-emerald-200'
                      : 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/60 dark:border-amber-600/80 dark:text-amber-200'
                  }`}>
                    {selectedBiz.verificationStatus === 'Approved & Accredited' ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {selectedBiz.verificationStatus === 'Approved & Accredited'
                          ? `✓ Articles of Incorporation & Grand Gedean Ownership Verified`
                          : `⏳ Secretariat Legal Audit: Articles of Incorporation & Ownership In Progress`}
                      </span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                        {selectedBiz.verificationStatus === 'Approved & Accredited'
                          ? `The Secretariat Legal & Compliance Desk has verified the uploaded Articles of Incorporation, LBR registration, and shareholder origin, confirming authentic Grand Gedean ownership per county standards.`
                          : `Auditor is cross-referencing incorporator names, shareholder registries, and citizenship records from the uploaded Articles of Incorporation against LBR records to confirm Grand Gedean ownership.`}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 dark:bg-slate-950/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Contact Person:</span>
                      <span className="font-bold text-white">{selectedBiz.contactPerson}</span>
                      <span className="text-slate-400 text-[11px] block">{selectedBiz.contactPhone}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px]">Workforce & Tax:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{selectedBiz.workforceSize} Personnel</span>
                      <span className="text-emerald-600 dark:text-emerald-400 text-[11px] block">{selectedBiz.taxStatus}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Machinery:</span>
                      <span className="text-slate-700 dark:text-slate-300 text-[11px] line-clamp-2">{selectedBiz.equipmentSummary}</span>
                    </div>
                  </div>

                  {/* Document Inspection Cards */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Uploaded Credentials & Legal Filing Verification</span>
                    </h4>

                    <div className="space-y-2">
                      {selectedBiz.uploadedCredentials && selectedBiz.uploadedCredentials.length > 0 ? (
                        selectedBiz.uploadedCredentials.map((cred) => {
                          const isDocVerified = cred.status === 'Verified';

                          return (
                            <div 
                              key={cred.id} 
                              className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${isDocVerified ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'}`}>
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 dark:text-white">{cred.name}</div>
                                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                                    {cred.fileName} • {cred.fileSize} • Uploaded {cred.uploadedAt}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDocToggle('business', selectedBiz.id, cred)}
                                className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1 transition-all ${
                                  isDocVerified
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                                    : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-400 border border-amber-400 dark:border-amber-600'
                                }`}
                              >
                                {isDocVerified ? <Check className="w-3.5 h-3.5" /> : null}
                                <span>{isDocVerified ? 'Verified' : 'Verify'}</span>
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 text-center text-xs">
                          No digital credentials uploaded yet.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Secretarial Action Decision Box */}
                  <div className="p-4 bg-amber-50/50 dark:bg-slate-950 border border-amber-200 dark:border-amber-500/40 rounded-xl space-y-3">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                      Secretariat Determination
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">Auditing Officer:</label>
                        <input
                          type="text"
                          value={auditorName}
                          onChange={(e) => setAuditorName(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">Audit Notes:</label>
                        <input
                          type="text"
                          placeholder="e.g. LBR & Tax certified in order."
                          value={auditNotes}
                          onChange={(e) => setAuditNotes(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handleFlagBusiness(selectedBiz)}
                          className="bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                        >
                          Request Documents
                        </button>

                        <button
                          onClick={() => handleDenyBusiness(selectedBiz)}
                          className="bg-rose-100 hover:bg-rose-200 dark:bg-rose-950 dark:hover:bg-rose-900 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700 text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
                        >
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                          <span>Deny & Disqualify</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleApproveBusiness(selectedBiz)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2 rounded-lg shadow-md flex items-center space-x-1.5 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Issue Official Accreditation Badge</span>
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 dark:text-slate-400 text-xs">
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
            <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Talent Applications</span>
                <span className="text-slate-500 dark:text-slate-400 font-semibold">{filteredWorkforce.length} Records</span>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter name, trade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center space-x-1 overflow-x-auto pb-1 text-[11px]">
                {['All', 'Pending Secretarial Audit', 'Approved & Accredited', 'Information Required', 'Denied & Disqualified'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                      filterStatus === st 
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {st === 'Pending Secretarial Audit' ? 'Pending' : st === 'Approved & Accredited' ? 'Accredited' : st === 'Denied & Disqualified' ? 'Disqualified' : st}
                  </button>
                ))}
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredWorkforce.map((person) => {
                  const isSelected = selectedWf?.id === person.id;
                  const isApproved = person.verificationStatus === 'Approved & Accredited';
                  const isDenied = person.verificationStatus === 'Denied & Disqualified';

                  return (
                    <div
                      key={person.id}
                      onClick={() => setSelectedWf(person)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-50/70 dark:bg-slate-800 border-amber-500 shadow-sm ring-1 ring-amber-500/30'
                          : 'bg-slate-50/70 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-mono text-amber-700 dark:text-amber-400 font-semibold">{person.trackingNumber}</span>
                        <span className={`px-2 py-0.2 rounded-full font-bold text-[10px] ${
                          isApproved 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700' 
                            : isDenied 
                            ? 'bg-rose-50 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-700' 
                            : 'bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
                        }`}>
                          {person.verificationStatus}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{person.fullName}</h4>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                        <span>{person.tradeCategory}</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-mono font-medium">{person.qualificationLevel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Talent Inspector */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-2xl">
              {selectedWf ? (
                <div className="space-y-6">
                  
                  <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-mono text-amber-800 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">
                          {selectedWf.trackingNumber}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{selectedWf.district}</span>
                        {selectedWf.isDiaspora && (
                          <span className="bg-sky-50 dark:bg-sky-950 text-sky-800 dark:text-sky-300 px-2 py-0.2 rounded text-[10px] border border-sky-300 dark:border-sky-800 font-semibold">
                            Diaspora: {selectedWf.diasporaCountry}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                        {selectedWf.fullName}
                      </h3>
                      <div className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
                        {selectedWf.specialization} • <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{selectedWf.yearsExperience} Yrs Exp</span>
                      </div>
                    </div>

                    <span className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold ${
                      selectedWf.verificationStatus === 'Approved & Accredited'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-600'
                        : selectedWf.verificationStatus === 'Denied & Disqualified'
                        ? 'bg-rose-50 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-600'
                        : 'bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-600'
                    }`}>
                      {selectedWf.verificationStatus}
                    </span>
                  </div>

                  {/* Uploaded Qualifications */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Uploaded Qualifications & Professional Licenses</span>
                    </h4>

                    <div className="space-y-2">
                      {selectedWf.uploadedCredentials && selectedWf.uploadedCredentials.length > 0 ? (
                        selectedWf.uploadedCredentials.map((cred) => {
                          const isVerified = cred.status === 'Verified';

                          return (
                            <div 
                              key={cred.id} 
                              className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${isVerified ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'}`}>
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 dark:text-white">{cred.name}</div>
                                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                                    {cred.fileName} • {cred.fileSize} • Uploaded {cred.uploadedAt}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDocToggle('workforce', selectedWf.id, cred)}
                                className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1 transition-all ${
                                  isVerified
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                                    : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-400 border border-amber-400 dark:border-amber-600'
                                }`}
                              >
                                {isVerified ? <Check className="w-3.5 h-3.5" /> : null}
                                <span>{isVerified ? 'Verified' : 'Verify'}</span>
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 text-center text-xs">
                          No credentials uploaded yet.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      Secretariat Decision & Accreditation Order
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">Auditing Officer:</label>
                        <input
                          type="text"
                          value={auditorName}
                          onChange={(e) => setAuditorName(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1 font-semibold">Audit Notes / Decision Reason:</label>
                        <input
                          type="text"
                          placeholder="e.g. Validated trade license or disqualification reason."
                          value={auditNotes}
                          onChange={(e) => setAuditNotes(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => handleDenyWorkforce(selectedWf)}
                        className="bg-rose-100 hover:bg-rose-200 dark:bg-rose-950 dark:hover:bg-rose-900 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700 text-xs font-bold px-4 py-2.5 rounded-lg flex items-center space-x-1.5 transition-colors"
                      >
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span>Deny & Disqualify Candidate</span>
                      </button>

                      <button
                        onClick={() => handleApproveWorkforce(selectedWf)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-md flex items-center space-x-1.5 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Accredit Professional into Grand Gedeh Concession Roster</span>
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 dark:text-slate-400 text-xs">
                  Select a worker profile from the queue to inspect credentials.
                </div>
              )}
            </div>

          </div>
        )}

        {/* Content: Dispatched Alerts & Transparency Audit Ledger */}
        {activeTab === 'audit_log' && (
          <div className="space-y-6">
            
            {/* Header / Context Banner */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  <Radio className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Dual-Channel Automated Dispatch Engine</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Dispatched Alerts & Transparency Audit Ledger</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
                  Immutable record of real-time alerts transmitted across the Liberian GSM Network (Orange Liberia +231-77 / Lonestar MTN +231-88) 
                  and Official Secretariat Email (@ggcdc-liberia.org) directly to local enterprise owners and professionals.
                </p>
              </div>

              {/* Quick Summary Badges */}
              <div className="flex flex-wrap gap-2">
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-center min-w-[85px]">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Total Alerts</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">{notifications.length}</span>
                </div>
                <div className="bg-emerald-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-900/40 px-3 py-2 rounded-xl text-center min-w-[85px]">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-semibold">Accredited</span>
                  <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                    {notifications.filter(n => n.eventType === 'Secretariat Approved & Accredited' || n.eventType === 'Tender Prequalification Issued').length}
                  </span>
                </div>
                <div className="bg-rose-50 dark:bg-slate-950 border border-rose-200 dark:border-rose-900/40 px-3 py-2 rounded-xl text-center min-w-[85px]">
                  <span className="text-[10px] text-rose-700 dark:text-rose-400 block font-semibold">Disqualified</span>
                  <span className="text-lg font-black text-rose-700 dark:text-rose-400">
                    {notifications.filter(n => n.eventType === 'Application Denied & Disqualified').length}
                  </span>
                </div>
                <div className="bg-amber-50 dark:bg-slate-950 border border-amber-200 dark:border-amber-900/40 px-3 py-2 rounded-xl text-center min-w-[85px]">
                  <span className="text-[10px] text-amber-800 dark:text-amber-400 block font-semibold">GSM SMS</span>
                  <span className="text-lg font-black text-amber-800 dark:text-amber-400">{notifications.length}</span>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 px-3 py-2 rounded-xl text-center min-w-[85px]">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-semibold">Carrier Health</span>
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 block mt-1">100% OK</span>
                </div>
              </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
              <div className="relative w-full md:w-80">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search recipient, +231 phone, ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto text-xs">
                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold flex items-center space-x-1 pl-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Channel Focus:</span>
                </span>
                {(['All', 'sms', 'email'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setNotificationChannelFilter(ch)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                      notificationChannelFilter === ch
                        ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                        : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {ch === 'All' ? 'Dual Channels (Both)' : ch === 'sms' ? '📱 Liberian GSM SMS' : '✉️ Official Email'}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications Feed */}
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                  <MessageSquare className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto mb-2" />
                  No dispatched notifications found matching your search.
                </div>
              ) : (
                filteredNotifications.map((notif) => {
                  const isCopied = copiedNotificationId === notif.id;
                  const showSms = notificationChannelFilter === 'All' || notificationChannelFilter === 'sms';
                  const showEmail = notificationChannelFilter === 'All' || notificationChannelFilter === 'email';
                  const isDeniedNotice = notif.eventType === 'Application Denied & Disqualified';

                  return (
                    <div 
                      key={notif.id}
                      className={`bg-white dark:bg-slate-900/90 border rounded-2xl p-5 shadow-sm dark:shadow-lg transition-all space-y-4 ${
                        isDeniedNotice 
                          ? 'border-rose-200 dark:border-rose-900/60 hover:border-rose-400 dark:hover:border-rose-700' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {/* Top Meta Line */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
                            <Smartphone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            <span>Orange / Lonestar GSM</span>
                          </span>

                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800">
                            <Mail className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                            <span>SMTP Relay</span>
                          </span>

                          <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>{notif.gatewayStatus}</span>
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400 text-xs">
                          <span className="font-mono text-amber-700 dark:text-amber-400/90 font-semibold">{notif.trackingNumber}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                            <span>{notif.timestamp}</span>
                          </span>
                        </div>
                      </div>

                      {/* Recipient Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{notif.recipientName}</h4>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300 mt-1">
                            <span className="flex items-center space-x-1 text-amber-700 dark:text-amber-400 font-mono font-medium">
                              <Smartphone className="w-3.5 h-3.5" />
                              <span>{notif.recipientPhone}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center space-x-1 text-sky-700 dark:text-sky-400 font-medium">
                              <Mail className="w-3.5 h-3.5" />
                              <span>{notif.recipientEmail}</span>
                            </span>
                          </div>
                        </div>

                        <span className={`self-start sm:self-center px-3 py-1 rounded-full text-[11px] font-bold ${
                          notif.eventType === 'Secretariat Approved & Accredited' || notif.eventType === 'Tender Prequalification Issued'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700'
                            : notif.eventType === 'Application Denied & Disqualified'
                            ? 'bg-rose-50 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-700'
                            : notif.eventType === 'Registration Submitted'
                            ? 'bg-blue-50 text-blue-800 border border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-700'
                            : 'bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
                        }`}>
                          {notif.eventType === 'Secretariat Approved & Accredited' 
                            ? '✓ Accreditation Approved' 
                            : notif.eventType === 'Tender Prequalification Issued'
                            ? '📜 Prequalification Issued'
                            : notif.eventType === 'Application Denied & Disqualified'
                            ? '❌ Application Disqualified / Denied'
                            : notif.eventType === 'Registration Submitted' 
                            ? '📝 Application Filed' 
                            : notif.eventType}
                        </span>
                      </div>

                      {/* Message Content Container */}
                      <div className="space-y-3">
                        {showSms && (
                          <div className={`rounded-xl p-4 font-mono text-xs space-y-1 shadow-inner border ${
                            isDeniedNotice
                              ? 'bg-rose-50/70 dark:bg-slate-950 border-rose-200 dark:border-rose-900/60 text-rose-950 dark:text-rose-200/90'
                              : 'bg-amber-50/70 dark:bg-slate-950 border-amber-200 dark:border-amber-900/40 text-amber-950 dark:text-amber-200/90'
                          }`}>
                            <div className={`flex items-center justify-between text-[10px] uppercase font-bold tracking-wider pb-1 border-b ${
                              isDeniedNotice
                                ? 'text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/40'
                                : 'text-amber-700 dark:text-amber-400/80 border-amber-200 dark:border-amber-900/30'
                            }`}>
                              <span>Liberian GSM SMS Broadcast (077 / 088 Relay)</span>
                              <span>{isDeniedNotice ? 'Disqualification Notice Served ✓✓' : 'Handshake Confirmed ✓✓'}</span>
                            </div>
                            <p className="pt-1 whitespace-pre-line leading-relaxed">{notif.smsMessage}</p>
                          </div>
                        )}

                        {showEmail && (
                          <div className={`rounded-xl p-4 text-xs space-y-2 shadow-inner border ${
                            isDeniedNotice
                              ? 'bg-rose-50/50 dark:bg-slate-950 border-rose-200 dark:border-rose-900/60 text-slate-800 dark:text-slate-200'
                              : 'bg-sky-50/50 dark:bg-slate-950 border-sky-200 dark:border-sky-900/40 text-slate-800 dark:text-slate-200'
                          }`}>
                            <div className={`font-bold pb-1 border-b flex items-center justify-between ${
                              isDeniedNotice
                                ? 'text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-900/40'
                                : 'text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-900/30'
                            }`}>
                              <span>Subject: {notif.emailSubject}</span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">From: secretariat@ggcdc-liberia.org</span>
                            </div>
                            <p className="whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300 font-mono text-[11px]">{notif.emailBody}</p>
                          </div>
                        )}
                      </div>

                      {/* Quick Communication & Audit Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                        <button
                          onClick={() => handleCopyNotification(notif.id, showSms ? notif.smsMessage : notif.emailBody)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                            isCopied
                              ? 'bg-emerald-600 text-white font-bold'
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
                          <span>{isCopied ? 'Copied to Clipboard' : 'Copy Notice Text'}</span>
                        </button>

                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={`https://wa.me/${notif.recipientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(notif.smsMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/70 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-lg font-semibold"
                          >
                            <span>WhatsApp (+231)</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <a
                            href={`sms:${notif.recipientPhone}?body=${encodeURIComponent(notif.smsMessage)}`}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/70 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 rounded-lg font-semibold"
                          >
                            <span>Direct GSM SMS</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <a
                            href={`mailto:${notif.recipientEmail}?subject=${encodeURIComponent(notif.emailSubject)}&body=${encodeURIComponent(notif.emailBody)}`}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/70 dark:hover:bg-sky-900 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-700 rounded-lg font-semibold"
                          >
                            <span>Official Email</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
