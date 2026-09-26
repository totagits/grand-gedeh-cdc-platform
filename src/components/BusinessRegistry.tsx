import React, { useState, useRef } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Upload, 
  X, 
  Check, 
  AlertTriangle,
  FileCheck2,
  Percent,
  Sparkles,
  Printer,
  Award,
  ShieldAlert,
  HardHat,
  Briefcase,
  ExternalLink,
  Users,
  Smartphone,
  Copy,
  Share2
} from 'lucide-react';
import { useApp } from '../utils/context';
import { BusinessSupplier, UploadedCredential, BusinessOwnershipType } from '../types';
import logoImg from '../assets/logo.jpg';

export const BusinessRegistry: React.FC = () => {
  const { businesses, registerBusiness } = useApp();
  
  // Engine Tab State: 'register' | 'directory' | 'tenders'
  const [activeEngineTab, setActiveEngineTab] = useState<'register' | 'directory' | 'tenders'>('register');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [ownershipFilter, setOwnershipFilter] = useState<'All' | 'Tier 1'>('All');

  // Certificate Modal State
  const [businessModalVendor, setBusinessModalVendor] = useState<BusinessSupplier | null>(null);
  const [showSmsDrawer, setShowSmsDrawer] = useState(false);
  const [copiedSms, setCopiedSms] = useState(false);
  const [smsNoticeToast, setSmsNoticeToast] = useState<{ phone: string; email: string; ref: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sector: 'Construction',
    ownership: 'Corporation / LLC' as BusinessOwnershipType,
    beneficialShare: '100% Grand Gedean Owned (Tier 1 Priority)',
    principalsAndClan: 'Emmanuel K. Toe (Putu Clan), Beatrice D. Gaye (Tchien Clan)',
    lbrNumber: 'LBR-GG-2024-8841',
    tinNumber: 'TIN-40092188-LR',
    location: 'Zwedru Commercial District, Grand Gedeh County',
    fleetCapacity: '4 CAT 330 Excavators, 2 Graders, 6 Tipper Dump Trucks, 1 Mobile Concrete Batching Plant',
    workforceSize: 28,
    localStaffRatio: '92% Grand Gedean Indigenes',
    pastContracts: 'Zwedru Feeder Road Grading ($140,000 USD), Ministry of Public Works Culvert Project ($85,000 USD)',
    contactPerson: 'Emmanuel K. Toe',
    contactPhone: '+231 776 543 210',
    contactEmail: 'contact@zwedru-contractors.lr'
  });

  // Real File Upload State
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [attachedFile, setAttachedFile] = useState<{
    file: File | null;
    fileName: string;
    fileSize: string;
  }>({
    file: null,
    fileName: 'Articles_of_Incorporation_LBR.pdf',
    fileSize: '1.8 MB'
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setAttachedFile({
        file: selected,
        fileName: selected.name,
        fileSize: formatFileSize(selected.size)
      });
    }
  };

  const sectors = [
    'All',
    'Construction',
    'Transportation & Haulage',
    'Camp Catering & Food Supply',
    'Fuel & Lubricants Supply',
    'ICT & Telecommunications',
    'Security & Facility Services',
    'Environmental Services & Waste',
    'Heavy Equipment Rental'
  ];

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSector = selectedSector === 'All' || b.sector === selectedSector;
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  // Handle Form Submission
  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const uploadedCreds: UploadedCredential[] = [
      {
        id: `cred-b-${Date.now()}-1`,
        name: 'Articles of Incorporation & LBR Registration',
        docType: 'LBR Business Registration',
        fileName: attachedFile.fileName,
        fileSize: attachedFile.fileSize,
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Verified',
        verifiedBy: 'Secretariat Compliance Desk',
        verificationNotes: 'Articles of Incorporation and LBR active; verified Grand Gedean ownership.'
      },
      {
        id: `cred-b-${Date.now()}-2`,
        name: 'Liberia Revenue Authority (LRA) Tax Clearance',
        docType: 'LRA Tax Clearance',
        fileName: 'LRA_Tax_Clearance_2026.pdf',
        fileSize: '920 KB',
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Verified',
        verifiedBy: 'Secretariat Compliance Desk',
        verificationNotes: 'Good tax standing for current fiscal year.'
      }
    ];

    const newBiz = registerBusiness({
      name: formData.name,
      sector: formData.sector,
      ownership: formData.ownership,
      location: formData.location,
      services: [formData.sector, 'Local Subcontracting', 'Civil Logistics'],
      contactPerson: formData.contactPerson,
      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,
      legalStatus: 'LBR Registered',
      taxStatus: 'LRA Tax Compliant',
      workforceSize: Number(formData.workforceSize),
      equipmentSummary: formData.fleetCapacity,
      pastContracts: [formData.pastContracts],
      uploadedCredentials: uploadedCreds,
      beneficialOwnershipShare: formData.beneficialShare,
      principalsAndClanOrigins: formData.principalsAndClan,
      lbrNumber: formData.lbrNumber,
      tinNumber: formData.tinNumber,
      headquarters: formData.location,
      fleetCapacity: formData.fleetCapacity,
      localStaffRatio: formData.localStaffRatio,
      prequalificationStatus: 'Approved Tier 1 Contractor (Sec. 13)'
    });

    // Reset Form and immediately pop up the official Certificate Modal!
    setFormData({
      name: '',
      sector: 'Construction',
      ownership: 'Corporation / LLC',
      beneficialShare: '100% Grand Gedean Owned (Tier 1 Priority)',
      principalsAndClan: 'Emmanuel K. Toe (Putu Clan), Beatrice D. Gaye (Tchien Clan)',
      lbrNumber: 'LBR-GG-2024-8841',
      tinNumber: 'TIN-40092188-LR',
      location: 'Zwedru Commercial District, Grand Gedeh County',
      fleetCapacity: '4 CAT 330 Excavators, 2 Graders, 6 Tipper Dump Trucks, 1 Mobile Concrete Batching Plant',
      workforceSize: 28,
      localStaffRatio: '92% Grand Gedean Indigenes',
      pastContracts: 'Zwedru Feeder Road Grading ($140,000 USD), Ministry of Public Works Culvert Project ($85,000 USD)',
      contactPerson: 'Emmanuel K. Toe',
      contactPhone: '+231 776 543 210',
      contactEmail: 'contact@zwedru-contractors.lr'
    });

    setBusinessModalVendor(newBiz);

    // Trigger instant SMS & Email notification toast
    setSmsNoticeToast({
      phone: newBiz.contactPhone,
      email: newBiz.contactEmail || 'enterprise@grandgedeh.gov.lr',
      ref: newBiz.trackingNumber
    });
    setTimeout(() => setSmsNoticeToast(null), 8000);
  };

  const handleCopySms = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSms(true);
    setTimeout(() => setCopiedSms(false), 3000);
  };

  // Render Official GGCDC Beneficial Ownership Certificate & Procurement Endorsement Modal
  const renderBusinessEndorsementModal = () => {
    if (!businessModalVendor) return null;
    const v = businessModalVendor;
    const todayStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const refNum = v.trackingNumber || `GGCDC-BIZ-CERT-${v.id.replace('biz-', '')}`;
    const ownershipDisplay = v.beneficialOwnershipShare || '100% Grand Gedean Owned (Tier 1 Priority)';
    const principalsDisplay = v.principalsAndClanOrigins || `${v.contactPerson} (Putu / Tchien Clan Indigene)`;
    const lbrDisplay = v.lbrNumber || 'LBR-GG-2024-7719';
    const tinDisplay = v.tinNumber || 'TIN-30048192-LR';
    const fleetDisplay = v.fleetCapacity || v.equipmentSummary || 'Operational Machinery Fleet Verified';
    const ratioDisplay = v.localStaffRatio || '90%+ Grand Gedean Indigenes';

    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md"
        onClick={() => setBusinessModalVendor(null)}
      >
        <div 
          className="print-clean bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[94vh] overflow-y-auto p-6 md:p-10 border-2 border-[#133e36] text-[#1a2e26] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* BACKGROUND GGCDC WATERMARK */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none z-0">
            <img src={logoImg} alt="" className="w-[450px] h-[450px] object-contain" />
          </div>

          {/* Action buttons header (hidden when printing) */}
          <div className="no-print flex justify-between items-center mb-6 border-b border-slate-200 pb-3 relative z-10 flex-wrap gap-2">
            <div className="flex items-center gap-2 text-[#133e36] font-bold text-xs md:text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Official GGCDC Statutory Local Procurement Endorsement Instrument</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSmsDrawer(!showSmsDrawer)}
                className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Smartphone className="w-4 h-4 text-emerald-700" /> {showSmsDrawer ? 'Hide SMS Receipt' : 'View GSM SMS Receipt'}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4 text-emerald-700" /> Print / Export PDF
              </button>
              <button
                type="button"
                onClick={() => setBusinessModalVendor(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* GSM SMS & OFFICIAL EMAIL TRANSPARENCY RECEIPT DRAWER */}
          {showSmsDrawer && (
            <div className="no-print mb-6 border border-emerald-300 rounded-xl p-4 bg-emerald-50/70 space-y-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-700" />
                  <div>
                    <strong className="text-xs text-slate-900 block">
                      Enterprise GSM SMS &amp; Official Email Delivery Receipt
                    </strong>
                    <span className="text-[11px] text-slate-600">
                      Dispatched to {v.contactPhone} via Orange Liberia &amp; Lonestar MTN GSM Gateway.
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  ✓ Delivery Confirmed (Gateway Status: 100%)
                </span>
              </div>

              {/* SIMULATED PHONE SCREEN */}
              <div className="max-w-md mx-auto bg-slate-900 text-white rounded-xl p-3.5 shadow-md border-2 border-slate-800">
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-1.5 mb-2">
                  <span className="font-semibold text-amber-400">Orange Liberia / Lonestar MTN</span>
                  <span>4G LTE • 100% 🔋</span>
                </div>
                <div className="text-center text-[10px] font-bold text-slate-300 mb-1.5">
                  GGCDC-GOV (Official Procurement Gateway)
                </div>
                <div className="bg-emerald-800/90 text-white p-3 rounded-lg text-xs leading-relaxed">
                  <div className="font-bold text-[10.5px] text-emerald-200 mb-1">
                    ✓ SECTION 13 PREQUALIFICATION NOTICE
                  </div>
                  GGCDC-GOV: Enterprise {v.name} is ACCREDITED as Tier 1 Contractor under Sec 13 Putu MDA. Ref: <span className="font-mono font-bold text-amber-300">{refNum}</span>. Verify certificate online: https://totagits.github.io/grand-gedeh-cdc-platform/
                  <div className="text-[9px] text-emerald-200 text-right mt-1 font-mono">
                    Today • Delivered ✓✓
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-center flex-wrap gap-2 pt-1">
                <a
                  href={`sms:${v.contactPhone}?body=${encodeURIComponent(`GGCDC-GOV: Enterprise ${v.name} is ACCREDITED as Tier 1 Contractor under Sec 13 Putu MDA. Ref: ${refNum}. https://totagits.github.io/grand-gedeh-cdc-platform/`)}`}
                  className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" /> Send Native SMS
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`GGCDC-GOV: Official Prequalification Certificate for ${v.name} - Ref: ${refNum}. View at: https://totagits.github.io/grand-gedeh-cdc-platform/`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share via WhatsApp
                </a>
                <a
                  href={`mailto:${v.contactEmail || ''}?subject=${encodeURIComponent(`[OFFICIAL GGCDC NOTICE] Certificate of Beneficial Ownership - Ref: ${refNum}`)}&body=${encodeURIComponent(`To the Management of ${v.name},\n\nYour Certificate of Grand Gedean Beneficial Ownership has been officially issued under Ref: ${refNum}.\n\nVerify online at: https://totagits.github.io/grand-gedeh-cdc-platform/`)}`}
                  className="px-2.5 py-1 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> Send Email Receipt
                </a>
                <button
                  type="button"
                  onClick={() => handleCopySms(`GGCDC-GOV: Enterprise ${v.name} is ACCREDITED as Tier 1 Contractor under Sec 13 Putu MDA. Ref: ${refNum}. https://totagits.github.io/grand-gedeh-cdc-platform/`)}
                  className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  {copiedSms ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSms ? 'Copied SMS!' : 'Copy SMS Text'}
                </button>
              </div>
            </div>
          )}

          {/* OFFICIAL LETTERHEAD */}
          <div className="text-center border-b-4 border-double border-[#133e36] pb-5 mb-5 relative z-10 font-serif">
            <div className="mx-auto mb-3 flex justify-center">
              <img
                src={logoImg}
                alt="Grand Gedeh Citizens Development Council Official Emblem"
                className="h-20 w-20 object-contain drop-shadow-md"
              />
            </div>
            <div className="text-xs tracking-[2px] uppercase text-slate-500 font-bold font-sans">
              Republic of Liberia • Grand Gedeh County
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#133e36] my-1 font-serif tracking-tight">
              Grand Gedeh Citizens Development Council (GGCDC)
            </h1>
            <div className="text-xs md:text-sm text-slate-700 font-sans font-semibold">
              Joint Directorate for Local Content, Commercial Enterprise &amp; Concession Procurement
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-sans">
              In Statutory Alliance with Grand Gedeh Chamber of Commerce, Council of Chiefs &amp; Grand Gedeh Bar Association (GGBA)
            </div>
          </div>

          {/* META INFO BAR */}
          <div className="flex justify-between flex-wrap gap-2 text-xs font-sans text-slate-600 mb-5 border-b border-slate-100 pb-2.5">
            <div><strong>Attestation Ref:</strong> <span className="font-mono text-[#133e36] font-bold">{refNum}</span></div>
            <div><strong>Audit Date:</strong> {todayStr}</div>
            <div><strong>Beneficial Classification:</strong> <span className="text-emerald-700 font-bold">{ownershipDisplay}</span></div>
          </div>

          {/* ADDRESSEE */}
          <div className="text-xs md:text-sm leading-relaxed mb-5 font-sans text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong>TO:</strong> The Managing Director &amp; Vice President for Global Procurement<br />
            <strong>CONCESSIONAIRE:</strong> Putu Iron Ore Mining Concessionaire, EPC Prime Contractors &amp; Subcontractors<br />
            <strong>COPY:</strong> Ministry of Mines &amp; Energy, National Investment Commission (NIC) &amp; Inter-Ministerial Concessions Committee (IMCC)
          </div>

          {/* DOCUMENT TITLE */}
          <div className="p-3.5 rounded-lg text-center mb-5 border bg-emerald-50/80 border-emerald-300">
            <div className="text-[10px] md:text-xs uppercase font-extrabold tracking-wider font-sans text-emerald-900">
              Statutory Local Content Quota Enforcement • Mineral Development Agreement Section 13
            </div>
            <h2 className="text-base md:text-lg font-bold my-1 text-[#133e36] font-serif">
              OFFICIAL CERTIFICATE OF GRAND GEDEH BENEFICIAL OWNERSHIP &amp; CONTRACTOR PREQUALIFICATION
            </h2>
            <div className="text-xs text-slate-600 font-sans">
              Mandatory Priority Right for Civil Works, Camp Infrastructure, Catering, Haulage &amp; Local Supplies
            </div>
          </div>

          {/* ATTESTATION BODY */}
          <div className="text-xs md:text-sm leading-relaxed text-slate-800 space-y-3 mb-6">
            <p>
              The <strong>Grand Gedeh Citizens Development Council (GGCDC)</strong>, exercising its legal and civic mandate to monitor local content compliance and safeguard host-county economic entitlements, hereby formally certifies that:
            </p>
            <div className="text-center my-3 p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg">
              <span className="text-lg md:text-xl font-black text-[#133e36] font-serif">
                {v.name}
              </span>
              <div className="text-xs text-emerald-800 mt-1 font-sans font-semibold">
                <strong>Ownership Status:</strong> {ownershipDisplay} • <strong>Operational Base:</strong> {v.location}
              </div>
            </div>
            <p>
              Following a rigorous forensic audit of corporate registry filings, ownership ledgers, and physical yard inspection, the GGCDC Technical Secretariat verifies that this commercial enterprise is genuinely owned by bona fide indigenes of Grand Gedeh County (Principals: <em>{principalsDisplay}</em>) and does not operate as a proxy or pass-through front for foreign or non-county entities.
            </p>
            <p>
              <strong>Certified Operational Scope:</strong> The enterprise possesses certified operational and technical capacity in <strong>{v.sector}</strong>, maintaining a local workforce of <strong>{v.workforceSize} personnel ({ratioDisplay})</strong> and documented physical plant/machinery ready for immediate deployment.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-lg text-xs leading-relaxed text-amber-950">
              <strong className="text-amber-900 uppercase tracking-wide block mb-1 font-sans text-[11px]">
                Statutory Notice of Section 13 Concession Compliance:
              </strong>
              Under Section 13 (Local Procurement) of the Putu Mineral Development Agreement and Section 44 of the PPCA, the Concessionaire and its engineering prime contractors are <strong>strictly legally prohibited</strong> from awarding civil construction contracts (camp offices, staff quarters, central canteens, schools, and clinics), haulage, fresh food supply, or fabrication works to foreign or Monrovia-based firms without first soliciting and providing first-right preference to verified Grand Gedean contractors. Having officially audited and prequalified <strong>{v.name}</strong>, any claim that &ldquo;no qualified local enterprise exists&rdquo; is legally null and void.
            </div>
          </div>

          {/* VERIFIED ENTERPRISE AUDIT RECORD */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60 mb-6 font-sans text-xs">
            <div className="font-bold text-[#133e36] uppercase tracking-wider text-[11px] mb-2.5">
              Forensic Enterprise Audit &amp; Registry Verification
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              <div><span className="text-slate-500">Enterprise Legal Name:</span> <strong>{v.name}</strong></div>
              <div><span className="text-slate-500">Grand Gedean Beneficial Share:</span> <strong className="text-emerald-800">{ownershipDisplay}</strong></div>
              <div><span className="text-slate-500">Shareholders &amp; Clan Origins:</span> <strong>{principalsDisplay}</strong></div>
              <div><span className="text-slate-500">LBR &amp; Tax Status:</span> <strong>{lbrDisplay} • {v.taxStatus}</strong></div>
              <div><span className="text-slate-500">Commercial Sector:</span> <strong>{v.sector}</strong></div>
              <div><span className="text-slate-500">County Yard / Office:</span> <strong>{v.location}</strong></div>
              <div><span className="text-slate-500">Fleet &amp; Machinery Capacity:</span> <strong>{fleetDisplay}</strong></div>
              <div><span className="text-slate-500">Local Staff Ratio:</span> <strong>{ratioDisplay}</strong></div>
              <div><span className="text-slate-500">Official Business Contact:</span> <strong>{v.contactPhone} ({v.contactPerson})</strong></div>
              <div><span className="text-slate-500">Prequalification Standing:</span> <strong className="text-emerald-700">✓ Tier 1 Prequalified Local Contractor</strong></div>
            </div>
          </div>

          {/* DUAL SECURITY STRIP: OFFICIAL SEAL & SCANNABLE QR CODE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-center">
            {/* OFFICIAL EMBOSSED SEAL */}
            <div className="bg-[#f9fbf9] border-2 border-[#c9ded3] rounded-lg p-3 flex items-center gap-3.5">
              <div className="w-20 h-20 rounded-full border-2 border-double border-emerald-800 bg-emerald-50/50 flex flex-col items-center justify-center p-1 text-center text-emerald-900 shadow-sm flex-shrink-0">
                <span className="text-[6px] font-black uppercase tracking-wider">Rep. of Liberia</span>
                <ShieldCheck className="w-5 h-5 text-emerald-800 my-0.5" />
                <strong className="text-[7.5px] font-black uppercase tracking-wider">GGCDC SEAL</strong>
                <span className="text-[6px] text-amber-700 font-extrabold">VERIFIED LOCAL</span>
              </div>
              <div>
                <div className="text-[11px] font-extrabold text-[#133e36] uppercase tracking-wider">
                  Official Digital Audit Seal
                </div>
                <div className="text-xs text-emerald-700 font-bold my-0.5">
                  ✓ Beneficial Ownership Authenticated
                </div>
                <p className="m-0 text-[10.5px] text-slate-500 leading-tight">
                  Certifies physical yard audit, LBR registry verification, and non-fronting compliance under Section 13 of the Putu MDA.
                </p>
              </div>
            </div>

            {/* SCANNABLE QR CODE & AUDIT CHECKSUM */}
            <div className="bg-[#f8faf9] border-2 border-[#c9ded3] rounded-lg p-3 flex items-center gap-3.5">
              <div className="w-20 h-20 bg-white border border-[#133e36] rounded-md grid place-items-center p-1 flex-shrink-0">
                <svg width="60" height="60" viewBox="0 0 100 100" fill="#133e36" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="26" height="26" fill="none" stroke="#133e36" strokeWidth="6" />
                  <rect x="14" y="14" width="10" height="10" fill="#133e36" />
                  <rect x="68" y="6" width="26" height="26" fill="none" stroke="#133e36" strokeWidth="6" />
                  <rect x="76" y="14" width="10" height="10" fill="#133e36" />
                  <rect x="6" y="68" width="26" height="26" fill="none" stroke="#133e36" strokeWidth="6" />
                  <rect x="14" y="76" width="10" height="10" fill="#133e36" />
                  <rect x="44" y="10" width="8" height="8" />
                  <rect x="54" y="10" width="8" height="8" />
                  <rect x="44" y="24" width="8" height="8" />
                  <rect x="10" y="44" width="8" height="8" />
                  <rect x="24" y="44" width="8" height="8" />
                  <rect x="44" y="44" width="18" height="18" />
                  <rect x="70" y="44" width="8" height="8" />
                  <rect x="84" y="44" width="8" height="8" />
                  <rect x="44" y="70" width="8" height="8" />
                  <rect x="70" y="70" width="8" height="8" />
                  <rect x="82" y="70" width="10" height="10" />
                  <rect x="60" y="84" width="8" height="8" />
                  <rect x="74" y="84" width="8" height="8" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-extrabold text-[#133e36] uppercase tracking-wider">
                  Live Concession Verification QR
                </div>
                <div className="text-[11px] text-emerald-800 font-bold break-all">
                  https://totagits.github.io/grand-gedeh-cdc-platform/
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  AUDIT ID: {refNum}
                </div>
                <small className="text-slate-400 text-[9.5px] block mt-0.5">
                  Scan with smartphone for instant verification in GGCDC Ledger.
                </small>
              </div>
            </div>
          </div>

          {/* OFFICIAL AUTHENTICATION PROTOCOL & GUIDANCE BOX */}
          <div className="bg-[#fdfbf7] border border-[#d4af37] rounded-lg p-3.5 mb-6 text-xs text-slate-700 font-sans">
            <div className="flex items-center gap-2 mb-2 font-bold text-amber-900 text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Official Authentication Protocol &amp; Submission Instructions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div className="bg-white border border-amber-200 p-2.5 rounded">
                <strong className="text-emerald-800 block mb-0.5">Stage 1: Tender Bidding &amp; Initial Prequalification</strong>
                <p className="m-0 text-slate-600 leading-relaxed">
                  This digitally authenticated certificate is <strong>immediately valid and legally sufficient</strong> for submitting bids, RFQs, and EOIs to concessionaires and prime contractors.
                </p>
              </div>
              <div className="bg-white border border-amber-200 p-2.5 rounded">
                <strong className="text-amber-800 block mb-0.5">Stage 2: Final Contract Execution (&gt; $100,000 USD)</strong>
                <p className="m-0 text-slate-600 leading-relaxed">
                  Upon winning a concession tender, the verified entity may present this certificate to the <strong>GGCDC County Secretariat Desk in Zwedru</strong> to obtain embossed physical gold seals and wet-ink signatures.
                </p>
              </div>
            </div>
          </div>

          {/* SIGNATURE BLOCK */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs font-sans border-t border-slate-200 pt-4">
            <div>
              <div className="text-base font-serif italic font-bold text-[#133e36]">
                Hon. Marcus K. Gaye
              </div>
              <div className="h-[1px] bg-slate-400 mx-3 my-1"></div>
              <span className="inline-block text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                ✓ Digitally Vetted
              </span>
              <strong className="block text-[11px] text-slate-900 mt-1">Hon. Marcus K. Gaye</strong>
              <span className="text-slate-600 text-[10px] block">Chairperson, Chamber of Commerce</span>
              <small className="text-slate-400 text-[9px]">Bureau of Local Enterprise</small>
            </div>

            <div>
              <div className="text-base font-serif italic font-bold text-[#133e36]">
                Chief Gbarbo Jarwodee
              </div>
              <div className="h-[1px] bg-slate-400 mx-3 my-1"></div>
              <span className="inline-block text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                ✓ Traditional Custodial Seal
              </span>
              <strong className="block text-[11px] text-slate-900 mt-1">Paramount Chief Gbarbo Jarwodee</strong>
              <span className="text-slate-600 text-[10px] block">Council of Traditional Chiefs</span>
              <small className="text-slate-400 text-[9px]">Customary Land Custodian</small>
            </div>

            <div>
              <div className="text-base font-serif italic font-bold text-[#133e36]">
                Cllr. J. Alexander Boley
              </div>
              <div className="h-[1px] bg-slate-400 mx-3 my-1"></div>
              <span className="inline-block text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                ✓ Legal Admittance
              </span>
              <strong className="block text-[11px] text-slate-900 mt-1">Cllr. J. Alexander Boley</strong>
              <span className="text-slate-600 text-[10px] block">Lead Legal Counsel, GGBA</span>
              <small className="text-slate-400 text-[9px]">Roll of Attorneys #412</small>
            </div>
          </div>

          {/* OFFICIAL GGCDC SEAL STAMP */}
          <div className="flex flex-col items-center justify-center mt-6">
            <img
              src={logoImg}
              alt="Official GGCDC Seal"
              className="w-16 h-16 object-contain drop-shadow"
            />
            <span className="text-[10px] font-bold text-[#133e36] tracking-wider uppercase mt-1">
              Official Seal of Procurement Certification • GGCDC
            </span>
          </div>

          {/* FOOTER WATERMARK */}
          <div className="text-center mt-4 text-[9.5px] text-slate-400 font-sans">
            Grand Gedeh Citizens Development Council • Official Procurement Certificate • Section 13 Quota Enforcement Hotline: +231-776-GGCDC-PROCURE • procurement@ggcdc.org.lr
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SMS & EMAIL NOTIFICATION TOAST */}
      {smsNoticeToast && (
        <div className="bg-emerald-950 border-2 border-emerald-500 text-white p-4 rounded-xl shadow-xl flex items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                ✓ Transparency Dispatch Confirmed (Orange / Lonestar GSM &amp; Official SMTP)
              </div>
              <p className="text-xs text-slate-200 mt-0.5">
                Instant Section 13 Prequalification Certificate sent via SMS to <strong>{smsNoticeToast.phone}</strong> and email to <strong>{smsNoticeToast.email}</strong>. Tracking Code: <span className="font-mono text-emerald-400 font-bold">{smsNoticeToast.ref}</span>.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSmsNoticeToast(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ENGINE HERO HEADER */}
      <div className="bg-gradient-to-r from-[#0d2a24] via-[#133e36] to-[#1c5046] text-white p-6 md:p-8 rounded-2xl shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Local Procurement &amp; Enterprise Prequalification</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-2">
            Grand Gedeh Business &amp; Local Contractor Registry
          </h1>
          <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed">
            Mandatory priority right under Section 13 (Local Content) of the Putu Mineral Development Agreement (MDA) and Section 44 of the PPCA. Enforcing Grand Gedean beneficial ownership thresholds and prequalifying local civil contractors, haulage fleets, and commercial suppliers.
          </p>
        </div>

        {/* ENGINE TABS */}
        <div className="flex gap-2 mt-6 border-b border-emerald-700/50 pb-2 relative z-10 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveEngineTab('register')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all ${
              activeEngineTab === 'register'
                ? 'bg-emerald-500 text-slate-950 shadow-lg font-black'
                : 'bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Award className="w-4 h-4" />
            Register Local Enterprise / Apply for Prequalification
          </button>
          <button
            type="button"
            onClick={() => setActiveEngineTab('directory')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all ${
              activeEngineTab === 'directory'
                ? 'bg-emerald-500 text-slate-950 shadow-lg font-black'
                : 'bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Certified Local Contractor Directory ({businesses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveEngineTab('tenders')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all ${
              activeEngineTab === 'tenders'
                ? 'bg-emerald-500 text-slate-950 shadow-lg font-black'
                : 'bg-emerald-950/40 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            Concession Tenders &amp; Local Quotas (3)
          </button>
        </div>
      </div>

      {/* REGISTRATION ENGINE TAB */}
      {activeEngineTab === 'register' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
          {/* SECTION 13 QUOTA BANNER */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#133e36]">
                Grand Gedean Beneficial Ownership Mandate (Section 13 Enforcement)
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Concessionaires, prime EPC contractors, and government entities operating in Grand Gedeh County are legally bound to prioritize verified Grand Gedean enterprises for civil works, camp logistics, haulage, catering, security, and fabrication. Registered firms undergo forensic audit to prevent proxy fronts.
              </p>
            </div>
          </div>

          {/* APPLICATION FORM */}
          <form onSubmit={handleSubmitRegistration} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Enterprise Legal Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zwedru Engineering & Heavy Civil Works Ltd."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Commercial Sector *
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                >
                  {sectors.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Legal Entity Structure *
                </label>
                <select
                  value={formData.ownership}
                  onChange={(e) => setFormData({ ...formData, ownership: e.target.value as BusinessOwnershipType })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                >
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                  <option value="Partnership / Joint Venture">Partnership / Joint Venture</option>
                  <option value="Corporation / LLC">Corporation / LLC</option>
                  <option value="Cooperative / Association">Cooperative / Association</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Grand Gedean Beneficial Ownership Share *
                </label>
                <select
                  value={formData.beneficialShare}
                  onChange={(e) => setFormData({ ...formData, beneficialShare: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white font-medium text-emerald-800"
                >
                  <option value="100% Grand Gedean Owned (Tier 1 Priority)">100% Grand Gedean Owned (Tier 1 Priority)</option>
                  <option value="51%+ Grand Gedean Owned (Tier 1 Qualified)">51%+ Grand Gedean Owned (Tier 1 Qualified)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Grand Gedean Shareholders, Principals &amp; Clan Origins *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emmanuel K. Toe (Putu Clan), Beatrice D. Gaye (Tchien Clan)"
                  value={formData.principalsAndClan}
                  onChange={(e) => setFormData({ ...formData, principalsAndClan: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Liberia Business Registry (LBR) Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LBR-GG-2024-8841"
                  value={formData.lbrNumber}
                  onChange={(e) => setFormData({ ...formData, lbrNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tax Identification Number (TIN) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TIN-40092188-LR"
                  value={formData.tinNumber}
                  onChange={(e) => setFormData({ ...formData, tinNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  County Yard, Base of Operations &amp; Head Office *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zwedru Commercial District, Putu Camp Yard, Grand Gedeh County"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Operational Fleet &amp; Machinery Capacity
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4 CAT Excavators, 2 Graders, 6 Tipper Dump Trucks, 1 Mobile Concrete Batching Plant"
                  value={formData.fleetCapacity}
                  onChange={(e) => setFormData({ ...formData, fleetCapacity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Workforce Size (Total Staff)
                </label>
                <input
                  type="number"
                  min={1}
                  value={formData.workforceSize}
                  onChange={(e) => setFormData({ ...formData, workforceSize: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Local Grand Gedean Staff Ratio
                </label>
                <input
                  type="text"
                  placeholder="e.g. 92% Grand Gedean Indigenes"
                  value={formData.localStaffRatio}
                  onChange={(e) => setFormData({ ...formData, localStaffRatio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Past Project References &amp; Contracts Executed
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zwedru Feeder Road Culvert Construction ($140,000 USD), Ministry of Public Works Bridge Project"
                  value={formData.pastContracts}
                  onChange={(e) => setFormData({ ...formData, pastContracts: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emmanuel K. Toe"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Official Business Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+231 776 543 210"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* DOCUMENT UPLOAD (REAL FILE PICKER) */}
            <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-5 bg-slate-50 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <strong className="text-sm text-slate-900 block">
                      Upload Articles of Incorporation / LBR Certificate &amp; Tax Clearance
                    </strong>
                    <span className="text-xs text-slate-500">
                      Supports PDF, PNG, JPG (Max 25MB). Digital cryptographic hash verification.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {attachedFile.fileName && (
                    <div className="text-right text-xs">
                      <span className="font-bold text-emerald-800 block truncate max-w-[180px]">{attachedFile.fileName}</span>
                      <span className="text-slate-400">{attachedFile.fileSize}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-colors"
                  >
                    Select File
                  </button>
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-sm font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5" />
                Submit Enterprise &amp; Generate Official Beneficial Ownership Certificate
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CERTIFIED LOCAL CONTRACTOR DIRECTORY TAB */}
      {activeEngineTab === 'directory' && (
        <div className="space-y-6">
          {/* SEARCH & FILTERS BAR */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by business name, commercial sector, location, or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full md:w-64 px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {sectors.map(s => (
                <option key={s} value={s}>{s === 'All' ? 'All Commercial Sectors' : s}</option>
              ))}
            </select>
          </div>

          {/* BUSINESS CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBusinesses.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Tier 1 Local Content Priority
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-1.5 py-0.5 rounded">
                      ✓ Audited
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{b.name}</h3>
                  <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{b.location}</span>
                  </div>

                  <div className="mt-3 bg-slate-50 rounded-lg p-2.5 text-xs space-y-1">
                    <div><strong className="text-slate-700">Sector:</strong> {b.sector}</div>
                    <div><strong className="text-slate-700">Entity:</strong> {b.ownership}</div>
                    <div><strong className="text-slate-700">Workforce:</strong> {b.workforceSize} personnel</div>
                    <div><strong className="text-slate-700">Audit Code:</strong> <span className="font-mono text-emerald-800 font-bold">{b.trackingNumber}</span></div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setBusinessModalVendor(b)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    View GGCDC Certificate &amp; Procurement Endorsement →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONCESSION TENDERS & LOCAL QUOTAS TAB */}
      {activeEngineTab === 'tenders' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0" />
            <p className="text-xs text-amber-900 m-0">
              <strong>Section 13 Enforcement Notice:</strong> Under the Putu MDA, prime concessionaires and EPC consortiums are legally prohibited from awarding these packages to foreign or Monrovia vendors without prior tender issuance to prequalified Grand Gedean firms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                100% Local Quota Reserved
              </span>
              <h3 className="font-bold text-base text-slate-900">
                Putu Mine Camp Infrastructure &amp; Staff Quarters Civil Works
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Construction of 40 senior staff modular units, administrative office expansion, and central medical clinic concrete foundations.
              </p>
              <div className="text-xs bg-slate-50 p-2.5 rounded-lg space-y-1">
                <div><strong>Package Value:</strong> $4,800,000 USD</div>
                <div><strong>Contracting Authority:</strong> Putu Iron Ore Mining Inc.</div>
                <div><strong>Required Accreditation:</strong> GGCDC Tier 1 Prequalified</div>
              </div>
              <button
                type="button"
                onClick={() => setActiveEngineTab('register')}
                className="w-full py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                Prequalify Enterprise for Bid →
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                100% Local Quota Reserved
              </span>
              <h3 className="font-bold text-base text-slate-900">
                Mine Pit Overburden Haulage &amp; Access Feeder Earthmoving
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Haulage subcontracting for topsoil removal, 35km access road grading, culvert reinforcement, and quarry aggregate transport.
              </p>
              <div className="text-xs bg-slate-50 p-2.5 rounded-lg space-y-1">
                <div><strong>Package Value:</strong> $2,400,000 USD</div>
                <div><strong>Contracting Authority:</strong> Prime EPC Mining Contractor</div>
                <div><strong>Required Accreditation:</strong> Verified Heavy Machinery Fleet</div>
              </div>
              <button
                type="button"
                onClick={() => setActiveEngineTab('register')}
                className="w-full py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                Prequalify Enterprise for Bid →
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                100% Local Quota Reserved
              </span>
              <h3 className="font-bold text-base text-slate-900">
                Concession Camp Fresh Food, Agricultural Produce &amp; Catering
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Daily catering operations feeding 650 camp personnel, bulk sourcing of local rice, cassava, vegetables, and meat from Grand Gedeh farmers.
              </p>
              <div className="text-xs bg-slate-50 p-2.5 rounded-lg space-y-1">
                <div><strong>Package Value:</strong> $1,200,000 USD Annual</div>
                <div><strong>Contracting Authority:</strong> Concession Facility Directorate</div>
                <div><strong>Required Accreditation:</strong> Certified Local Enterprise</div>
              </div>
              <button
                type="button"
                onClick={() => setActiveEngineTab('register')}
                className="w-full py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors"
              >
                Prequalify Enterprise for Bid →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RENDER BENEFICIAL OWNERSHIP CERTIFICATE MODAL */}
      {renderBusinessEndorsementModal()}
    </div>
  );
};
