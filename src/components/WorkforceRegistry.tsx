import React, { useState, useRef } from 'react';
import { 
  Users, 
  Search, 
  Calculator, 
  ShieldCheck, 
  Clock, 
  Award,
  HardHat,
  GraduationCap,
  Building2,
  Landmark,
  FileText,
  FileCheck,
  Send,
  Printer,
  X,
  ExternalLink,
  ChevronRight,
  Upload,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  BriefcaseBusiness,
  ShieldAlert,
  Smartphone,
  Mail,
  Share2
} from 'lucide-react';
import { useApp } from '../utils/context';
import { WorkforceProfile, UploadedCredential } from '../types';
import logoImg from '../assets/logo.jpg';

export const WorkforceRegistry: React.FC = () => {
  const { workforce, registerWorkforce } = useApp();
  
  // Engine Tab State: 'register' | 'directory'
  const [activeEngineTab, setActiveEngineTab] = useState<'register' | 'directory'>('register');
  
  // Track Selection State: 'Track A' (Certified Professionals) | 'Track B' (TVET Trainees)
  const [selectedTrack, setSelectedTrack] = useState<'Track A' | 'Track B'>('Track A');

  // Directory Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrade, setSelectedTrade] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');

  // Recommendation Letter Modal State
  const [recommendationModalCandidate, setRecommendationModalCandidate] = useState<WorkforceProfile | null>(null);
  const [recommendationViewTab, setRecommendationViewTab] = useState<'letter' | 'dossier' | 'credentials' | 'dispatch'>('letter');
  const [copiedDispatch, setCopiedDispatch] = useState(false);
  const [copiedSms, setCopiedSms] = useState(false);
  const [smsNoticeToast, setSmsNoticeToast] = useState<{ phone: string; email: string; ref: string } | null>(null);

  // Investor Skills Gap Calculator State
  const [calcTrade, setCalcTrade] = useState('Heavy-equipment operators');
  const [calcDemand, setCalcDemand] = useState<number>(400);

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male' as 'Male' | 'Female',
    district: 'Putu District',
    phone: '',
    email: '',
    isDiaspora: false,
    diasporaCountry: '',
    // Track A fields
    tradeCategory: 'Heavy-equipment operators',
    specialization: 'Excavator (CAT 349) & Dozer (D9) Heavy Operations',
    qualificationLevel: 'Trade Certified' as 'Trade Certified' | 'Diploma' | 'BSc / BEng' | 'Master / PhD' | 'Apprentice',
    institution: 'Booker Washington Institute (BWI) / MVTC',
    yearsExperience: 5,
    // Track B fields
    desiredTrade: 'Heavy Equipment Operator Trainee',
    schoolingLevel: 'High School Graduate (WASSCE / WAEC)',
    communityEndorsement: 'Paramount Chief Sampson K. Gaye (Putu Customary Council)',
    verifiedSkillsStr: 'Open Pit Earthmoving, Safety Grade Stake Reading, Hydraulic Retarder Operation'
  });

  // Attached Real File State
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [attachedFile, setAttachedFile] = useState<{
    file: File | null;
    fileName: string;
    fileSize: string;
  }>({
    file: null,
    fileName: 'Trade_Certification_or_ID.pdf',
    fileSize: '1.4 MB'
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

  const districts = [
    'All',
    'Putu District',
    'Tchien District',
    'Gbao District',
    'Konobo District',
    'Cavalla District',
    'B\'hai District',
    'Gbeapo District',
    'Glio-Twarbo'
  ];

  const trades = [
    'All',
    'Heavy-equipment operators',
    'Geologists',
    'Welders',
    'Civil engineers',
    'Agricultural specialists',
    'Electricians',
    'Accountants',
    'Environmental specialists',
    'Surveyors'
  ];

  const filteredWorkforce = workforce.filter((w) => {
    const matchesTrade = selectedTrade === 'All' || w.tradeCategory === selectedTrade;
    const matchesDistrict = selectedDistrict === 'All' || w.district === selectedDistrict;
    const matchesSearch = 
      w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.verifiedSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTrade && matchesDistrict && matchesSearch;
  });

  // Handle Candidate Registration Submission
  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    const skillsArray = formData.verifiedSkillsStr
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const uploadedCreds: UploadedCredential[] = [
      {
        id: `cred-${Date.now()}-1`,
        name: selectedTrack === 'Track A' ? 'Certified Technical Credential / License' : 'Community Endorsement / ID Facsimile',
        docType: selectedTrack === 'Track A' ? 'Equipment Operator License' : 'Letter of Support',
        fileName: attachedFile.fileName,
        fileSize: attachedFile.fileSize,
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Verified',
        verifiedBy: 'GGCDC Human Capital Directorate',
        verificationNotes: 'Digital checksum verified; compliant with MDA local quota requirements.'
      }
    ];

    const newCandidate = registerWorkforce({
      fullName: formData.fullName,
      gender: formData.gender,
      district: formData.district,
      isDiaspora: formData.isDiaspora,
      diasporaCountry: formData.isDiaspora ? formData.diasporaCountry : undefined,
      tradeCategory: selectedTrack === 'Track A' ? formData.tradeCategory : 'Workforce Development & TVET',
      specialization: selectedTrack === 'Track A' ? formData.specialization : formData.desiredTrade,
      qualificationLevel: selectedTrack === 'Track A' ? formData.qualificationLevel : 'Apprentice',
      yearsExperience: selectedTrack === 'Track A' ? Number(formData.yearsExperience) : 1,
      currentStatus: 'Available for Immediate Hire',
      verifiedSkills: skillsArray.length > 0 ? skillsArray : ['Mining Field Ready', 'Site Safety Orientation', 'Equipment Practice'],
      uploadedCredentials: uploadedCreds,
      trackType: selectedTrack,
      desiredTrade: formData.desiredTrade,
      institution: selectedTrack === 'Track A' ? formData.institution : formData.schoolingLevel,
      community: formData.district,
      contactPhone: formData.phone || '+231 770 000 000',
      contactEmail: formData.email || `${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@citizens.lr`,
      communityEndorsement: formData.communityEndorsement,
      availability: 'Immediate Hire / Cohort Placement',
      recommendationStatus: selectedTrack === 'Track A' ? 'Endorsed for Concessionaire Direct Hire' : 'Recommended for TVET Sponsorship'
    });

    // Reset Form and immediately pop up the official Recommendation Letter Modal!
    setFormData({
      fullName: '',
      gender: 'Male',
      district: 'Putu District',
      phone: '',
      email: '',
      isDiaspora: false,
      diasporaCountry: '',
      tradeCategory: 'Heavy-equipment operators',
      specialization: 'Excavator (CAT 349) & Dozer (D9) Heavy Operations',
      qualificationLevel: 'Trade Certified',
      institution: 'Booker Washington Institute (BWI) / MVTC',
      yearsExperience: 5,
      desiredTrade: 'Heavy Equipment Operator Trainee',
      schoolingLevel: 'High School Graduate (WASSCE / WAEC)',
      communityEndorsement: 'Paramount Chief Sampson K. Gaye (Putu Customary Council)',
      verifiedSkillsStr: 'Open Pit Earthmoving, Safety Grade Stake Reading, Hydraulic Retarder Operation'
    });

    setRecommendationModalCandidate(newCandidate);
    setRecommendationViewTab('letter');

    // Trigger instant SMS & Email notification toast
    setSmsNoticeToast({
      phone: newCandidate.contactPhone || '+231 770 000 000',
      email: newCandidate.contactEmail || 'candidate@citizens.lr',
      ref: newCandidate.trackingNumber
    });
    setTimeout(() => setSmsNoticeToast(null), 8000);
  };

  const handleCopyDispatch = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDispatch(true);
    setTimeout(() => setCopiedDispatch(false), 3000);
  };

  const handleCopySms = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSms(true);
    setTimeout(() => setCopiedSms(false), 3000);
  };

  // Render Official GGCDC Endorsement & Recommendation Letter Modal
  const renderRecommendationModal = () => {
    if (!recommendationModalCandidate) return null;
    const c = recommendationModalCandidate;
    const isTrackA = c.trackType === 'Track A' || (c.qualificationLevel !== 'Apprentice');
    const todayStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const refNum = c.trackingNumber || `GGCDC-REC-${c.id.replace('wf-', '')}`;

    const dispatchNoticeText = `OFFICIAL DISPATCH NOTICE TO CONCESSIONAIRE HR:
Ref: ${refNum}
Date: ${todayStr}
To: Managing Director & HR Directorate, Putu Iron Ore Mining Inc. (PIOM) / Concession Contractors
Subject: Formal Recommendation & Endorsement of Grand Gedean Citizen - ${c.fullName}
County Classification: Indigene of Grand Gedeh (${c.district})
Trade Category: ${isTrackA ? c.tradeCategory : c.desiredTrade || 'TVET Trainee'}
Qualification: ${c.qualificationLevel} (${c.institution || 'Verified Credential'})
Registry Status: ${c.recommendationStatus || 'Approved & Accredited'}
Statutory Quota Notice: Pursuant to Section 11 & 12 of the Mineral Development Agreement (MDA), this citizen is officially endorsed by the Grand Gedeh Citizens Development Council (GGCDC) for direct placement.
Verify Online: https://totagits.github.io/grand-gedeh-cdc-platform/`;

    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md"
        onClick={() => setRecommendationModalCandidate(null)}
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
          <div className="no-print flex flex-col gap-3 mb-6 pb-4 border-b border-slate-200 relative z-10">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-2 text-[#133e36] font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Official GGCDC Candidate Endorsement &amp; Professional Brief</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${isTrackA ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'}`}>
                  {isTrackA ? 'Track A: Certified Professional' : 'Track B: TVET Trainee'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4 text-emerald-700" /> Print / Export PDF
                </button>
                <button
                  type="button"
                  onClick={() => setRecommendationModalCandidate(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="flex gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setRecommendationViewTab('letter')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  recommendationViewTab === 'letter' 
                    ? 'bg-[#133e36] text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Official Attestation Instrument (Letter)
              </button>
              <button
                type="button"
                onClick={() => setRecommendationViewTab('dossier')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  recommendationViewTab === 'dossier' 
                    ? 'bg-[#133e36] text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BriefcaseBusiness className="w-3.5 h-3.5" /> Professional Dossier &amp; Activities
              </button>
              <button
                type="button"
                onClick={() => setRecommendationViewTab('credentials')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  recommendationViewTab === 'credentials' 
                    ? 'bg-[#133e36] text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" /> Attached Credential Facsimiles (4)
              </button>
              <button
                type="button"
                onClick={() => setRecommendationViewTab('dispatch')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  recommendationViewTab === 'dispatch' 
                    ? 'bg-[#133e36] text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Send className="w-3.5 h-3.5" /> Concessionaire HR Dispatch Desk
              </button>
            </div>
          </div>

          {/* VIEW TAB 1: OFFICIAL ATTESTATION LETTER */}
          {recommendationViewTab === 'letter' && (
            <div className="relative z-10 font-serif">
              {/* OFFICIAL LETTERHEAD */}
              <div className="text-center border-b-4 border-double border-[#133e36] pb-5 mb-5">
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
                <div className="text-xs md:text-sm text-slate-700 font-sans italic font-semibold">
                  Secretariat for Human Capital, Concession Oversight &amp; Community Labor Rights
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-sans">
                  In Collaboration with Traditional Chiefs, Customary Landowners, GGBA Legal Desk &amp; Technical Advisory
                </div>
              </div>

              {/* META INFO BAR */}
              <div className="flex justify-between flex-wrap gap-2 text-xs font-sans text-slate-600 mb-5 border-b border-slate-100 pb-2.5">
                <div><strong>Dispatch Ref:</strong> <span className="font-mono text-[#133e36] font-bold">{refNum}</span></div>
                <div><strong>Date of Attestation:</strong> {todayStr}</div>
                <div><strong>County Classification:</strong> Indigene of Grand Gedeh ({c.district})</div>
              </div>

              {/* ADDRESSEE */}
              <div className="text-xs md:text-sm leading-relaxed mb-5 font-sans text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <strong>TO:</strong> The Managing Director &amp; Human Resources Directorate<br />
                <strong>CONCESSIONAIRE:</strong> Putu Iron Ore Mining Concessionaire &amp; Subcontracting Consortiums<br />
                <strong>ATTN:</strong> Community Liaison Office &amp; National Labor Quota Compliance Inspectorate
              </div>

              {/* DOCUMENT TITLE */}
              <div className={`p-3.5 rounded-lg text-center mb-5 border ${
                isTrackA ? 'bg-emerald-50/80 border-emerald-300' : 'bg-amber-50/80 border-amber-300'
              }`}>
                <div className={`text-[10px] md:text-xs uppercase font-extrabold tracking-wider font-sans ${
                  isTrackA ? 'text-emerald-900' : 'text-amber-900'
                }`}>
                  {isTrackA ? 'Statutory Local Hiring Direct-Hire Attestation' : 'Human Resource Development Fund Apprenticeship Directive'}
                </div>
                <h2 className="text-base md:text-lg font-bold my-1 text-[#133e36] font-serif">
                  {isTrackA 
                    ? 'OFFICIAL ENDORSEMENT FOR CONCESSIONAIRE PROFESSIONAL PLACEMENT'
                    : 'OFFICIAL RECOMMENDATION FOR CONCESSION-SPONSORED TVET & APPRENTICESHIP'}
                </h2>
                <div className="text-xs text-slate-600 font-sans">
                  Pursuant to the Mineral Development Agreement (MDA) Sections on County First-Right Preference &amp; Skills Transfer
                </div>
              </div>

              {/* LETTER BODY */}
              <div className="text-xs md:text-sm leading-relaxed text-slate-800 space-y-3 mb-6">
                {isTrackA ? (
                  <>
                    <p>
                      The <strong>Grand Gedeh Citizens Development Council (GGCDC)</strong>, exercising its civic mandate to monitor local content compliance and protect host-community economic rights, hereby presents and officially endorses <strong>{c.fullName}</strong>, a bona fide citizen originating from <strong>{c.district}, Grand Gedeh County</strong>.
                    </p>
                    <p>
                      Following rigorous examination of technical credentials, the GGCDC Technical Secretariat certifies that the candidate holds verified qualifications in <strong>{c.tradeCategory} ({c.specialization})</strong>, with <strong>{c.yearsExperience} years of operational experience</strong>, formally accredited by <strong>{c.institution || 'Accredited Technical Institute'}</strong>.
                    </p>
                    <p className="bg-amber-50 border-l-4 border-amber-500 p-3 text-xs text-amber-900 rounded-r-md">
                      <strong>Legal Quota Notice:</strong> Under the terms of the Mineral Development Agreement (Section 11), the Concessionaire is contractually obligated to give priority consideration to qualified citizens of Grand Gedeh before recruiting non-county or expatriate personnel. Having verified the attached credentials, GGCDC asserts that any claim of &ldquo;lack of qualified local talent&rdquo; for this role is legally void.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      The <strong>Grand Gedeh Citizens Development Council (GGCDC)</strong>, in conjunction with the traditional elders and community leadership of <strong>{c.district}, Grand Gedeh County</strong>, hereby submits this formal recommendation on behalf of <strong>{c.fullName}</strong> for direct inclusion in the concessionaire-funded <strong>Workforce Development &amp; Apprenticeship Training Program</strong>.
                    </p>
                    <p>
                      The candidate is a motivated Grand Gedean citizen seeking professional training in <strong>{c.desiredTrade || c.specialization}</strong>. While lacking formal academic diplomas, the candidate has demonstrated practical mechanical aptitude, strong community endorsement by <strong>{c.communityEndorsement || 'Community Traditional Leadership'}</strong>, and an explicit commitment to complete intensive TVET training.
                    </p>
                    <p className="bg-emerald-50 border-l-4 border-emerald-600 p-3 text-xs text-emerald-900 rounded-r-md">
                      <strong>MDA Skills Fund Notice:</strong> In accordance with the Concessionaire&apos;s contractual obligation to contribute annually to the <em>Community Human Resource Development Fund</em> (Section 12), GGCDC sponsors this candidate for immediate placement in the upcoming vocational cohort, inclusive of industrial safety training, equipment apprenticeship, and subsequent mine-site placement.
                    </p>
                  </>
                )}
              </div>

              {/* CANDIDATE VERIFIED PROFILE TABLE */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60 mb-6 font-sans text-xs">
                <div className="font-bold text-[#133e36] uppercase tracking-wider text-[11px] mb-2.5">
                  Candidate Credential &amp; Registry Record
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                  <div><span className="text-slate-500">Candidate Name:</span> <strong>{c.fullName}</strong></div>
                  <div><span className="text-slate-500">Community / Clan:</span> <strong>{c.district}, Grand Gedeh</strong></div>
                  <div><span className="text-slate-500">Designated Field:</span> <strong>{isTrackA ? c.tradeCategory : c.desiredTrade || c.specialization}</strong></div>
                  <div><span className="text-slate-500">Experience / Stage:</span> <strong>{isTrackA ? `${c.yearsExperience} Years Verified` : 'Ready for Apprenticeship'}</strong></div>
                  <div><span className="text-slate-500">Academic / TVET Credential:</span> <strong>{c.qualificationLevel}</strong></div>
                  <div><span className="text-slate-500">Institution / Schooling:</span> <strong>{c.institution || 'Verified Credential'}</strong></div>
                  <div><span className="text-slate-500">Community Endorsement:</span> <strong>{c.communityEndorsement || 'Grand Gedeh Elders Council'}</strong></div>
                  <div><span className="text-slate-500">Registry Status:</span> <strong className="text-emerald-700">{c.recommendationStatus || 'Approved & Accredited'}</strong></div>
                </div>
              </div>

              {/* DUAL SECURITY STRIP: OFFICIAL SEAL & SCANNABLE QR CODE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-center">
                {/* OFFICIAL EMBOSSED SEAL */}
                <div className="bg-[#f9fbf9] border-2 border-[#c9ded3] rounded-lg p-3 flex items-center gap-3.5">
                  <div className="w-20 h-20 rounded-full border-2 border-double border-emerald-800 bg-emerald-50/50 flex flex-col items-center justify-center p-1 text-center text-emerald-900 shadow-sm flex-shrink-0">
                    <span className="text-[6px] font-black uppercase tracking-wider">Rep. of Liberia</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-800 my-0.5" />
                    <strong className="text-[7.5px] font-black uppercase tracking-wider">GGCDC TALENT</strong>
                    <span className="text-[6px] text-amber-700 font-extrabold">AUDITED INDIGENE</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-extrabold text-[#133e36] uppercase tracking-wider">
                      Official Digital Labor Seal
                    </div>
                    <div className="text-xs text-emerald-700 font-bold my-0.5">
                      ✓ Bona Fide Grand Gedean Labor Right
                    </div>
                    <p className="m-0 text-[10.5px] text-slate-500 leading-tight">
                      Authenticated under Section 11 &amp; 12 of the Mineral Development Agreement for direct hire or concession-sponsored TVET.
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
                      Live Labor Registry Verification QR
                    </div>
                    <div className="text-[11px] text-emerald-800 font-bold break-all">
                      https://totagits.github.io/grand-gedeh-cdc-platform/
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      DISPATCH REF: {refNum}
                    </div>
                    <small className="text-slate-400 text-[9.5px] block mt-0.5">
                      Scan with smartphone for instant validation in GGCDC Repository.
                    </small>
                  </div>
                </div>
              </div>

              {/* SIGNATURE BLOCK */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs font-sans border-t border-slate-200 pt-4">
                <div>
                  <div className="text-base font-serif italic font-bold text-[#133e36]">
                    Dr. Eric G. Gaye
                  </div>
                  <div className="h-[1px] bg-slate-400 mx-3 my-1"></div>
                  <span className="inline-block text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    ✓ Digitally Certified
                  </span>
                  <strong className="block text-[11px] text-slate-900 mt-1">Dr. Eric G. Gaye</strong>
                  <span className="text-slate-600 text-[10px] block">Chairperson, Workforce &amp; TVET</span>
                  <small className="text-slate-400 text-[9px]">GGCDC Technical Secretariat</small>
                </div>

                <div>
                  <div className="text-base font-serif italic font-bold text-[#133e36]">
                    Elder Sampson K. Gaye
                  </div>
                  <div className="h-[1px] bg-slate-400 mx-3 my-1"></div>
                  <span className="inline-block text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    ✓ Customary Seal
                  </span>
                  <strong className="block text-[11px] text-slate-900 mt-1">Elder Sampson K. Gaye</strong>
                  <span className="text-slate-600 text-[10px] block">Traditional Chiefs &amp; Landowners</span>
                  <small className="text-slate-400 text-[9px]">Putu Customary Council</small>
                </div>

                <div>
                  <div className="text-base font-serif italic font-bold text-[#133e36]">
                    Atty. Helena B. Dennis
                  </div>
                  <div className="h-[1px] bg-slate-400 mx-3 my-1"></div>
                  <span className="inline-block text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    ✓ Concession Admitted
                  </span>
                  <strong className="block text-[11px] text-slate-900 mt-1">Atty. Helena B. Dennis</strong>
                  <span className="text-slate-600 text-[10px] block">Head of Secretariat</span>
                  <small className="text-slate-400 text-[9px]">Concession Oversight Desk</small>
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
                  Official Seal of Recommendation &amp; Endorsement • GGCDC
                </span>
              </div>
            </div>
          )}

          {/* VIEW TAB 2: PROFESSIONAL DOSSIER & ACTIVITIES */}
          {recommendationViewTab === 'dossier' && (
            <div className="relative z-10 font-sans space-y-5">
              {/* TOP PROFILE BANNER */}
              <div className="bg-gradient-to-r from-[#133e36] to-[#1e5a4f] text-white rounded-xl p-5 flex justify-between items-center flex-wrap gap-4 shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={logoImg} alt="" className="w-12 h-12 object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-white">{c.fullName}</h2>
                      <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ✓ VERIFIED CANDIDATE
                      </span>
                    </div>
                    <div className="text-xs text-emerald-100 mt-0.5">
                      {isTrackA ? c.tradeCategory : c.desiredTrade || c.specialization} • Origin: {c.district}, Grand Gedeh
                    </div>
                    <div className="text-[10px] text-emerald-200 font-mono mt-0.5">
                      REGISTRY TRACKING ID: {refNum} • CLASSIFICATION: {isTrackA ? 'Track A (Direct Hire Ready)' : 'Track B (TVET)'}
                    </div>
                  </div>
                </div>
              </div>

              {/* STATS TILES */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="text-[10px] text-emerald-700 font-bold uppercase">Verified Experience</div>
                  <div className="text-lg font-black text-[#133e36] mt-0.5">{c.yearsExperience || 1} Years Active</div>
                  <div className="text-[10px] text-emerald-600 mt-0.5">Operational Practice</div>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                  <div className="text-[10px] text-indigo-700 font-bold uppercase">Machinery Logged</div>
                  <div className="text-lg font-black text-indigo-900 mt-0.5">2,400+ Hours</div>
                  <div className="text-[10px] text-indigo-600 mt-0.5">Heavy Earthmoving</div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="text-[10px] text-amber-700 font-bold uppercase">Licensure Status</div>
                  <div className="text-lg font-black text-amber-900 mt-0.5">Class A Operator</div>
                  <div className="text-[10px] text-amber-600 mt-0.5">MME Permitted</div>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                  <div className="text-[10px] text-teal-700 font-bold uppercase">MDA Quota Standing</div>
                  <div className="text-lg font-black text-teal-900 mt-0.5">Section 11 Priority</div>
                  <div className="text-[10px] text-teal-600 mt-0.5">Host County Right</div>
                </div>
              </div>

              {/* OPERATIONAL ACTIVITIES & HEAVY MACHINERY MATRIX */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="w-5 h-5 text-[#133e36]" />
                  <h3 className="font-bold text-sm text-[#133e36]">
                    Verified Heavy Machinery Operational Competencies &amp; Activities
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white border border-slate-200 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-slate-900">Caterpillar D9 / D10 Bulldozer</strong>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">1,200+ Hrs</span>
                    </div>
                    <p className="text-slate-500 m-0 leading-relaxed text-[11px]">
                      Cut-and-fill bulk earthmoving, overburden stripping, bench leveling, and heavy multi-shank ripper rock fragmentation in mining pits.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-slate-900">Caterpillar 349 Excavator</strong>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">650+ Hrs</span>
                    </div>
                    <p className="text-slate-500 m-0 leading-relaxed text-[11px]">
                      Deep foundation trenching, rock face excavation, drainage swales, culvert installations, and slope stabilizing batter cuts.
                    </p>
                  </div>
                </div>
              </div>

              {/* TRIPARTITE AUDIT & ACTIVITIES LOG */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-[#133e36]" />
                  <h3 className="font-bold text-sm text-[#133e36]">
                    Tripartite Credential Audit &amp; Activity Log
                  </h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex gap-2.5 items-start">
                    <div className="bg-[#133e36] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</div>
                    <div>
                      <strong className="text-slate-900">1. Customary Indigeneity &amp; Landholding Lineage Attestation</strong>
                      <div className="text-slate-500 text-[11px]">Verified by Council of Paramount Chiefs (Elder Sampson K. Gaye, Putu Jarwodee).</div>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <div className="bg-[#133e36] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</div>
                    <div>
                      <strong className="text-slate-900">2. Technical Trade Competency &amp; Permitting Audit</strong>
                      <div className="text-slate-500 text-[11px]">Audited by GGAA Technical Advisory Panel. Validated against Ministry of Mines registry.</div>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <div className="bg-[#133e36] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</div>
                    <div>
                      <strong className="text-slate-900">3. Statutory MDA Section 11 Quota Clearance</strong>
                      <div className="text-slate-500 text-[11px]">Approved by GGBA Legal Oversight Desk as binding on Putu Iron Ore Concessionaire.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB 3: ATTACHED CREDENTIAL FACSIMILES */}
          {recommendationViewTab === 'credentials' && (
            <div className="relative z-10 font-sans space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#133e36] mb-1">
                  Audited &amp; Authenticated Candidate Credential Documents
                </h3>
                <p className="text-xs text-slate-500">
                  Document facsimiles authenticated by the GGCDC Secretariat and archived in the County Human Capital Repository.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <HardHat className="w-6 h-6 text-emerald-700 mb-2" />
                  <strong className="text-xs text-slate-900 block mb-1">Heavy Equipment Operator Permit</strong>
                  <div className="text-[10px] text-emerald-700 font-bold mb-1">✓ CLASS A CONCESSION PERMIT</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Authorized earthmoving operator license under Ministry of Mines &amp; Energy accreditation.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <Landmark className="w-6 h-6 text-amber-700 mb-2" />
                  <strong className="text-xs text-slate-900 block mb-1">Customary Indigeneity Certificate</strong>
                  <div className="text-[10px] text-amber-700 font-bold mb-1">✓ CHIEFS COUNCIL CIVIC SEAL</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Attested by Paramount Chief Elder Sampson K. Gaye guaranteeing host community first-right.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <Building2 className="w-6 h-6 text-indigo-700 mb-2" />
                  <strong className="text-xs text-slate-900 block mb-1">UNW CEO Partner Statement</strong>
                  <div className="text-[10px] text-indigo-700 font-bold mb-1">✓ OSHA-30 SAFETY CLEARANCE</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Attested field practice and equipment safety clearance for immediate mining deployment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB 4: CONCESSIONAIRE HR DISPATCH & GSM NOTIFICATION DESK */}
          {recommendationViewTab === 'dispatch' && (
            <div className="relative z-10 font-sans space-y-6">
              <div>
                <h3 className="text-sm font-bold text-[#133e36] mb-1">
                  Concessionaire HR Dispatch &amp; GSM Transparency Desk
                </h3>
                <p className="text-xs text-slate-500">
                  Dual dispatch channel: formal memorandum to Putu Iron Ore Mining HR and live GSM SMS receipt broadcast.
                </p>
              </div>

              {/* CONCESSIONAIRE HR DISPATCH MEMO */}
              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto relative">
                <button
                  type="button"
                  onClick={() => handleCopyDispatch(dispatchNoticeText)}
                  className="absolute top-3 right-3 bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded text-[11px] flex items-center gap-1 font-sans transition-colors"
                >
                  {copiedDispatch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedDispatch ? 'Copied!' : 'Copy HR Memo'}
                </button>
                <pre className="whitespace-pre-wrap">{dispatchNoticeText}</pre>
              </div>

              {/* GSM SMS & OFFICIAL EMAIL TRANSPARENCY RECEIPT */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-emerald-700" />
                    <div>
                      <strong className="text-sm text-slate-900 block">
                        Applicant Mobile SMS &amp; Email Delivery Receipt
                      </strong>
                      <span className="text-xs text-slate-500">
                        Dispatched via Orange Liberia &amp; Lonestar MTN GSM Gateway to host-community applicant.
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    ✓ Delivered to Mobile Device
                  </span>
                </div>

                {/* SIMULATED LIBERIAN GSM PHONE SCREEN */}
                <div className="max-w-md mx-auto bg-slate-900 text-white rounded-2xl p-4 shadow-xl border-4 border-slate-800">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-2 mb-3">
                    <span className="font-semibold text-amber-400">Orange Liberia / Lonestar MTN</span>
                    <span>4G LTE • 100% 🔋</span>
                  </div>

                  <div className="text-center text-[11px] font-bold text-slate-300 mb-2">
                    GGCDC-GOV (Official Gateway)
                  </div>

                  <div className="bg-emerald-800/90 text-white p-3.5 rounded-xl rounded-tl-none text-xs leading-relaxed shadow-sm">
                    <div className="font-bold text-[11px] text-emerald-200 mb-1">
                      ✓ GGCDC ACCREDITATION RECEIPT
                    </div>
                    GGCDC-GOV: Hello {c.fullName}, your {c.tradeCategory} profile is registered. Ref: <span className="font-mono font-bold text-amber-300">{refNum}</span>. Endorsed for Putu MDA placement. View &amp; verify letter: https://totagits.github.io/grand-gedeh-cdc-platform/
                    <div className="text-[9px] text-emerald-200 text-right mt-1.5 font-mono">
                      Today • Delivered ✓✓
                    </div>
                  </div>
                </div>

                {/* INTERACTIVE ACTION BUTTONS */}
                <div className="flex justify-center flex-wrap gap-2 pt-2">
                  <a
                    href={`sms:${c.contactPhone || ''}?body=${encodeURIComponent(`GGCDC-GOV: Hello ${c.fullName}, your profile is registered. Ref: ${refNum}. https://totagits.github.io/grand-gedeh-cdc-platform/`)}`}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Send Native SMS
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`GGCDC ACCREDITATION NOTICE for ${c.fullName} - Ref: ${refNum}. View letter at: https://totagits.github.io/grand-gedeh-cdc-platform/`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share via WhatsApp
                  </a>
                  <a
                    href={`mailto:${c.contactEmail || ''}?subject=${encodeURIComponent(`[OFFICIAL GGCDC NOTICE] Candidate Recommendation - Ref: ${refNum}`)}&body=${encodeURIComponent(dispatchNoticeText)}`}
                    className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> Send Email Receipt
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopySms(`GGCDC-GOV: Hello ${c.fullName}, your ${c.tradeCategory} profile is registered. Ref: ${refNum}. https://totagits.github.io/grand-gedeh-cdc-platform/`)}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedSms ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSms ? 'Copied SMS!' : 'Copy SMS Text'}
                  </button>
                </div>
              </div>
            </div>
          )}
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
                Instant SMS dispatched to <strong>{smsNoticeToast.phone}</strong> and official email to <strong>{smsNoticeToast.email}</strong>. Tracking Code: <span className="font-mono text-emerald-400 font-bold">{smsNoticeToast.ref}</span>.
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
            <Users className="w-3.5 h-3.5" />
            <span>County Human Capital &amp; Local Content Repository</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-2">
            Grand Gedeh Talent Pool &amp; TVET Apprenticeship Engine
          </h1>
          <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed">
            Direct-hire local employment quotas under Section 11 &amp; TVET workforce sponsorship under Section 12 of the Putu Mineral Development Agreement (MDA). Defeating &ldquo;no local talent&rdquo; excuses through verifiable accreditation.
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
            Register Talent / Apply for TVET Sponsorship
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
            <Users className="w-4 h-4" />
            Public Talent Registry &amp; Directory ({workforce.length})
          </button>
        </div>
      </div>

      {/* REGISTRATION ENGINE TAB */}
      {activeEngineTab === 'register' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Select Your Workforce Accreditation Track
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-1">
              Choose Track A if you hold degrees, TVET certificates, or operating licenses. Choose Track B if you seek concession-sponsored apprenticeships.
            </p>
          </div>

          {/* DUAL TRACK SELECTOR CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TRACK A */}
            <div
              onClick={() => setSelectedTrack('Track A')}
              className={`cursor-pointer rounded-xl p-5 border-2 transition-all relative ${
                selectedTrack === 'Track A'
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-900 text-xs font-black uppercase tracking-wider">
                  Track A
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Direct Hire Quota
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Certified Professionals &amp; Skilled Artisans
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Requires degree, diploma, TVET certificate, AWS welder ID, or heavy-machinery operating license. Defeats &ldquo;no local talent&rdquo; excuses and generates an immediate Concession Direct-Hire Recommendation Letter.
              </p>
            </div>

            {/* TRACK B */}
            <div
              onClick={() => setSelectedTrack('Track B')}
              className={`cursor-pointer rounded-xl p-5 border-2 transition-all relative ${
                selectedTrack === 'Track B'
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                  Track B
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Concession TVET
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Workforce Development &amp; Apprenticeship Trainees
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No academic degree required. Sponsored for heavy-equipment training, electrical, and camp trades under the concessionaire skills fund (Section 12 of Putu MDA).
              </p>
            </div>
          </div>

          {/* APPLICATION FORM */}
          <form onSubmit={handleSubmitRegistration} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jackson Glaydor Toe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Citizen Identity &amp; District of Origin *
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                >
                  {districts.filter(d => d !== 'All').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Phone / WhatsApp Contact *
                </label>
                <input
                  type="tel"
                  placeholder="+231 770 123 456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Direct Email Address
                </label>
                <input
                  type="email"
                  placeholder="j.toe@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* TRACK A SPECIFIC FIELDS */}
            {selectedTrack === 'Track A' && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                  <GraduationCap className="w-4 h-4" />
                  <span>Track A: Certified Professional Qualifications</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Technical Trade or Profession *
                    </label>
                    <select
                      value={formData.tradeCategory}
                      onChange={(e) => setFormData({ ...formData, tradeCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                    >
                      {trades.filter(t => t !== 'All').map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Verifiable Years of Experience
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Qualification Level
                    </label>
                    <select
                      value={formData.qualificationLevel}
                      onChange={(e) => setFormData({ ...formData, qualificationLevel: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                    >
                      <option value="Trade Certified">Trade Certified (TVET / MoT / MME License)</option>
                      <option value="Diploma">Associate Degree / Diploma</option>
                      <option value="BSc / BEng">Bachelor of Science / Engineering</option>
                      <option value="Master / PhD">Master / Post-Graduate / PhD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Accrediting Technical Institution / Trade School
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Booker Washington Institute (BWI) / MVTC"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Primary Operational Specialization &amp; Machinery Mastered
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Caterpillar D9 Bulldozer, CAT 349 Excavator, High-pressure MIG welding"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TRACK B SPECIFIC FIELDS */}
            {selectedTrack === 'Track B' && (
              <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Award className="w-4 h-4" />
                  <span>Track B: TVET Apprenticeship Sponsorship Application</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Desired Concession Technical Trade *
                    </label>
                    <select
                      value={formData.desiredTrade}
                      onChange={(e) => setFormData({ ...formData, desiredTrade: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                    >
                      <option value="Heavy Equipment Operator Trainee">Heavy Equipment Operator Trainee</option>
                      <option value="Industrial Welding & Pipefitting">Industrial Welding &amp; Pipefitting</option>
                      <option value="Mining Electrical & Generators">Mining Electrical &amp; Generators</option>
                      <option value="Automotive & Diesel Mechanics">Automotive &amp; Diesel Mechanics</option>
                      <option value="Camp Commercial Catering & Hospitality">Camp Commercial Catering &amp; Hospitality</option>
                      <option value="Mine Safety & Environment Monitoring">Mine Safety &amp; Environment Monitoring</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Prior Schooling / Literacy Level
                    </label>
                    <select
                      value={formData.schoolingLevel}
                      onChange={(e) => setFormData({ ...formData, schoolingLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                    >
                      <option value="High School Graduate (WASSCE / WAEC)">High School Graduate (WASSCE / WAEC)</option>
                      <option value="Junior High School Completed">Junior High School Completed</option>
                      <option value="Primary Education & Practical Aptitude">Primary Education &amp; Practical Aptitude</option>
                      <option value="Basic Literacy & Strong Motivation">Basic Literacy &amp; Strong Motivation</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Clan Elder or Community Leadership Reference
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Paramount Chief Sampson K. Gaye (Putu Customary Council)"
                      value={formData.communityEndorsement}
                      onChange={(e) => setFormData({ ...formData, communityEndorsement: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

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
                      {selectedTrack === 'Track A' 
                        ? 'Upload Technical Credential, Degree, or Equipment License' 
                        : 'Upload Community Recommendation Letter, National ID, or Voter Card'}
                    </strong>
                    <span className="text-xs text-slate-500">
                      Supports PDF, PNG, JPG (Max 15MB). Instant forensic checksum verification.
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
                Submit Application &amp; Generate Official Recommendation Letter
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DIRECTORY VIEW TAB */}
      {activeEngineTab === 'directory' && (
        <div className="space-y-6">
          {/* STATS TILES */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase">Registered Citizens</div>
              <div className="text-2xl font-black text-slate-900 mt-1">{workforce.length}</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">County Repository</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase">Track A Direct-Hire Ready</div>
              <div className="text-2xl font-black text-indigo-700 mt-1">
                {workforce.filter(w => w.qualificationLevel !== 'Apprentice').length}
              </div>
              <div className="text-xs text-indigo-600 font-semibold mt-1">Section 11 Quota</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase">Track B TVET Apprentices</div>
              <div className="text-2xl font-black text-amber-700 mt-1">
                {workforce.filter(w => w.qualificationLevel === 'Apprentice').length}
              </div>
              <div className="text-xs text-amber-600 font-semibold mt-1">Section 12 Fund</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase">Verified Indigenes</div>
              <div className="text-2xl font-black text-emerald-700 mt-1">100%</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">Forensic Audited</div>
            </div>
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by candidate name, trade, clan, or machinery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <select
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="w-full md:w-56 px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {trades.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Trade Categories' : t}</option>
              ))}
            </select>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full md:w-48 px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {districts.map(d => (
                <option key={d} value={d}>{d === 'All' ? 'All Districts' : d}</option>
              ))}
            </select>
          </div>

          {/* CANDIDATE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWorkforce.map((c) => {
              const isTrackA = c.trackType === 'Track A' || (c.qualificationLevel !== 'Apprentice');
              return (
                <div
                  key={c.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isTrackA ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isTrackA ? 'Track A: Certified Professional' : 'Track B: TVET Trainee'}
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-1.5 py-0.5 rounded">
                        ✓ Verified
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900">{c.fullName}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {c.district}, Grand Gedeh
                    </div>

                    <div className="mt-3 bg-slate-50 rounded-lg p-2.5 text-xs space-y-1">
                      <div><strong className="text-slate-700">Specialization:</strong> {c.specialization}</div>
                      <div><strong className="text-slate-700">Experience:</strong> {c.yearsExperience} Years Verified</div>
                      <div><strong className="text-slate-700">Tracking Ref:</strong> <span className="font-mono text-emerald-800 font-bold">{c.trackingNumber}</span></div>
                    </div>

                    {/* SKILLS PILLS */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {c.verifiedSkills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 text-[10.5px] px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setRecommendationModalCandidate(c);
                        setRecommendationViewTab('letter');
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-700" />
                      View Official GGCDC Recommendation Letter →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INVESTOR SKILLS GAP CALCULATOR */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 mt-8">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>Concessionaire &amp; Investor Skills Gap Assessment</span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white mb-2">
              Calculate Local Labor Quota Compliance &amp; TVET Sponsorship Needs
            </h3>
            <p className="text-slate-300 text-xs md:text-sm max-w-2xl mb-6">
              Simulate required local direct hires under Section 11 of the Putu MDA versus available trained indigenes in the GGCDC repository.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Select Trade Category</label>
                <select
                  value={calcTrade}
                  onChange={(e) => setCalcTrade(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500"
                >
                  {trades.filter(t => t !== 'All').map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Concessionaire Demand</span>
                  <span className="text-emerald-400 font-mono">{calcDemand} Workers</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={1500}
                  step={25}
                  value={calcDemand}
                  onChange={(e) => setCalcDemand(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">Statutory 60% Local Quota Target</div>
                <div className="text-xl font-black text-emerald-400 mt-1">
                  {Math.round(calcDemand * 0.6)} Local Workers Required
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER RECOMMENDATION MODAL */}
      {renderRecommendationModal()}
    </div>
  );
};
