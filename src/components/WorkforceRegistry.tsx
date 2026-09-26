import React, { useState, useRef } from 'react';
import { 
  Users, 
  Search, 
  Calculator, 
  CheckCircle, 
  CheckCircle2,
  GraduationCap, 
  Globe, 
  PlusCircle, 
  ShieldCheck, 
  TrendingUp,
  Upload,
  Clock,
  Award
} from 'lucide-react';
import { useApp } from '../utils/context';
import { UploadedCredential } from '../types';

export const WorkforceRegistry: React.FC = () => {
  const { workforce, registerWorkforce, setActiveView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrade, setSelectedTrade] = useState<string>('All');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);

  // Investor Skills Gap Calculator State
  const [calcTrade, setCalcTrade] = useState('Heavy-equipment operators');
  const [calcDemand, setCalcDemand] = useState<number>(400);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male' as 'Male' | 'Female',
    district: 'Putu District',
    isDiaspora: false,
    diasporaCountry: '',
    tradeCategory: 'Heavy-equipment operators',
    specialization: '',
    qualificationLevel: 'Trade Certified' as 'Trade Certified' | 'Diploma' | 'BSc / BEng' | 'Master / PhD' | 'Apprentice',
    yearsExperience: 5,
    currentStatus: 'Available for Immediate Hire' as 'Available for Immediate Hire' | 'Currently Employed' | 'Available for Advisory',
    verifiedSkillsStr: ''
  });

  // Hidden File Input References
  const tradeCertFileRef = useRef<HTMLInputElement | null>(null);
  const operatingLicenseFileRef = useRef<HTMLInputElement | null>(null);
  const resumeFileRef = useRef<HTMLInputElement | null>(null);

  // Attached files state with real file metadata
  const [attachedFiles, setAttachedFiles] = useState<{
    tradeCert: { file: File | null; fileName: string; fileSize: string };
    operatingLicense: { file: File | null; fileName: string; fileSize: string };
    resume: { file: File | null; fileName: string; fileSize: string };
  }>({
    tradeCert: { file: null, fileName: 'TVET_Trade_Certification.pdf', fileSize: '1.8 MB' },
    operatingLicense: { file: null, fileName: 'Heavy_Machinery_License.pdf', fileSize: '1.1 MB' },
    resume: { file: null, fileName: 'Curriculum_Vitae_Resume.pdf', fileSize: '750 KB' }
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docKey: 'tradeCert' | 'operatingLicense' | 'resume') => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setAttachedFiles(prev => ({
        ...prev,
        [docKey]: {
          file: selected,
          fileName: selected.name,
          fileSize: formatFileSize(selected.size)
        }
      }));
    }
  };

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
    const matchesSearch = w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.verifiedSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTrade && matchesSearch;
  });

  const availableInDb = workforce.filter(w => w.tradeCategory.toLowerCase().includes(calcTrade.toLowerCase().split(' ')[0]));
  const countInDb = availableInDb.length;
  const verifiedQualified = Math.min(calcDemand, Math.round(countInDb * 66));
  const partialQualified = Math.min(calcDemand - verifiedQualified, Math.round(calcDemand * 0.22));
  const trainingRequired = Math.max(0, calcDemand - verifiedQualified - partialQualified);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: UploadedCredential[] = [
      {
        id: `cred-${Date.now()}-1`,
        name: 'Technical Trade Certificate or University Degree',
        docType: formData.qualificationLevel === 'BSc / BEng' || formData.qualificationLevel === 'Master / PhD' ? 'University Degree' : 'TVET Trade Certificate',
        fileName: attachedFiles.tradeCert.fileName,
        fileSize: attachedFiles.tradeCert.fileSize,
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Verification'
      },
      {
        id: `cred-${Date.now()}-2`,
        name: 'Professional Operator or Engineering License',
        docType: 'Equipment Operator License',
        fileName: attachedFiles.operatingLicense.fileName,
        fileSize: attachedFiles.operatingLicense.fileSize,
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Verification'
      },
      {
        id: `cred-${Date.now()}-3`,
        name: 'Curriculum Vitae / Work History',
        docType: 'CV / Resume',
        fileName: attachedFiles.resume.fileName,
        fileSize: attachedFiles.resume.fileSize,
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Verification'
      }
    ];

    const trackingNum = registerWorkforce({
      fullName: formData.fullName,
      gender: formData.gender,
      district: formData.district,
      isDiaspora: formData.isDiaspora,
      diasporaCountry: formData.isDiaspora ? formData.diasporaCountry : undefined,
      tradeCategory: formData.tradeCategory,
      specialization: formData.specialization,
      qualificationLevel: formData.qualificationLevel,
      yearsExperience: Number(formData.yearsExperience),
      currentStatus: formData.currentStatus,
      verifiedSkills: formData.verifiedSkillsStr.split(',').map(s => s.trim()).filter(Boolean),
      uploadedCredentials: credentials
    });

    setShowRegisterModal(false);
    setRegistrationSuccess(trackingNum);
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Countywide & Diaspora Professional Roster</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Grand Gedeh Skills & Workforce Registry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Organizing talent across Grand Gedeh and the global diaspora. Upload trade certifications 
              and professional diplomas to receive accreditation for mining, infrastructure, and forestry contracts.
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
              <span>Register Skills & Upload Credentials</span>
            </button>
          </div>
        </div>

        {/* Tracking Success Alert */}
        {registrationSuccess && (
          <div className="mb-8 p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500 rounded-2xl shadow-2xl space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Professional Registration Successfully Received!</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Your profile and uploaded credential files have been transmitted to the 
              <strong> GGCDC Secretariat Verification Desk</strong> under Tracking Number:
            </p>
            <div className="inline-block bg-slate-950 border border-amber-500/80 text-amber-400 font-mono font-bold text-sm px-3 py-1 rounded-lg">
              {registrationSuccess}
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              Once verified by Secretariat officers, your profile will be flagged as Accredited and prioritized for concession hiring quotas.
            </p>
          </div>
        )}

        {/* Dynamic Investor Skills Gap Calculator */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border border-emerald-800/80 rounded-2xl p-6 mb-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-emerald-900/60">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Investor & Concessionaire Skills Gap Calculator</span>
              </div>
              <h3 className="text-xl font-black text-white">
                Factual Labor Capability & Training Obligation Modeler
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                When an investor requires workers, this tool calculates verified talent vs TVET training obligations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Required Occupation</label>
                <select
                  value={calcTrade}
                  onChange={(e) => setCalcTrade(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Heavy-equipment operators">Heavy-Equipment Operators</option>
                  <option value="Welders">6G Pipe Welders & Fabricators</option>
                  <option value="Electricians">High-Voltage Substation Electricians</option>
                  <option value="Civil engineers">Civil & Hydraulic Engineers</option>
                  <option value="Geologists">Mining Geologists & Surveyors</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Worker Quota Demand</label>
                <input
                  type="number"
                  min={10}
                  max={5000}
                  step={10}
                  value={calcDemand}
                  onChange={(e) => setCalcDemand(Number(e.target.value))}
                  className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 w-28 focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="bg-slate-950/80 border border-emerald-700/60 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
                <span>Verified Already Qualified</span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white">{verifiedQualified} Workers</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Immediate hire from Grand Gedeh verified talent pool meeting international standards.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-amber-700/60 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
                <span>Partially Qualified (Cross-Skilling)</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white">{partialQualified} Workers</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Requires 4 to 8 week conversion or OEM equipment refresher training program.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-blue-700/60 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-blue-400 mb-1">
                <span>Concession Training Obligation</span>
                <GraduationCap className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white">{trainingRequired} Trainees</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Allocated to GGCC TVET accelerator funded under Concession training funds.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, skill, district, tracking..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {trades.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTrade(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedTrade === t
                    ? 'bg-emerald-600 text-white font-semibold shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Talent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkforce.map((person) => (
            <div
              key={person.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-600 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded">
                    {person.tradeCategory}
                  </span>
                  {person.verificationStatus === 'Approved & Accredited' ? (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-300 bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Accredited</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-300 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Audit Pending</span>
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-mono text-slate-500">ID: {person.trackingNumber}</div>
                <h3 className="text-base font-bold text-white mt-1 leading-snug">
                  {person.fullName}
                </h3>
                
                <div className="text-xs text-slate-300 mt-1 font-medium">
                  {person.specialization}
                </div>

                <div className="mt-3 p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Credential Level:</span>
                    <span className="text-emerald-400 font-semibold">{person.qualificationLevel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Experience:</span>
                    <span className="text-white font-medium">{person.yearsExperience} Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-300">{person.isDiaspora ? `Diaspora (${person.diasporaCountry})` : person.district}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Verified Files:</span>
                    <span className="text-amber-300 font-mono">{person.uploadedCredentials?.length || 0} Docs</span>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 block mb-1">Technical Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {person.verifiedSkills.map((sk, idx) => (
                      <span key={idx} className="bg-slate-800 text-slate-200 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">{person.currentStatus}</span>
                <button 
                  onClick={() => setActiveView('verification')}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs"
                >
                  Inspect in Secretariat
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Register Workforce Profile with Credential Uploads */}
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden">
              
              {/* Pinned Header */}
              <div className="p-5 sm:p-6 pb-4 border-b border-slate-800 bg-slate-900 shrink-0 relative">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
                >
                  ✕
                </button>

                <div className="pr-10">
                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Countywide & Diaspora Talent Pool</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white">
                    Register Skills & Upload Credentials
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Accredited profiles are matched with concession jobs, TVET apprenticeships, and advisory panels.
                  </p>
                </div>
              </div>

              {/* Scrollable Form Body with Visible Scrollbar */}
              <form id="talent-reg-form" onSubmit={handleSubmit} className="overflow-y-auto modal-scrollbar p-5 sm:p-6 space-y-4 text-xs flex-1">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Helena Quaye Boley"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Trade / Discipline Category</label>
                    <select
                      value={formData.tradeCategory}
                      onChange={(e) => setFormData({ ...formData, tradeCategory: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Heavy-equipment operators">Heavy-equipment operators</option>
                      <option value="Welders">Welders & Pipefitters</option>
                      <option value="Electricians">Electricians (HV / LV)</option>
                      <option value="Civil engineers">Civil Engineers</option>
                      <option value="Geologists">Geologists & Mining Specialists</option>
                      <option value="Environmental specialists">Environmental Specialists</option>
                      <option value="Agricultural specialists">Agricultural Extension</option>
                      <option value="Accountants">Accountants & Finance</option>
                      <option value="Surveyors">Surveyors & GIS Technicians</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Highest Credential Level</label>
                    <select
                      value={formData.qualificationLevel}
                      onChange={(e) => setFormData({ ...formData, qualificationLevel: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Trade Certified">Trade Certified (TVET)</option>
                      <option value="Diploma">Diploma / Associate Degree</option>
                      <option value="BSc / BEng">BSc / Bachelor of Engineering</option>
                      <option value="Master / PhD">Master / PhD</option>
                      <option value="Apprentice">Apprentice / Entry Level</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">District of Origin</label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Putu District">Putu District</option>
                      <option value="Tchien District">Tchien District (Zwedru)</option>
                      <option value="B'hai District">B'hai District</option>
                      <option value="Gbao District">Gbao District</option>
                      <option value="Cavalla District">Cavalla District</option>
                      <option value="Konobo District">Konobo District</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Years of Experience</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Specialization Summary</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CAT 390 Excavator bench digging, structural steel AWS welding"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Diaspora Checkbox */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="isDiaspora"
                    checked={formData.isDiaspora}
                    onChange={(e) => setFormData({ ...formData, isDiaspora: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="isDiaspora" className="text-slate-300 font-medium">
                    I currently reside in the Diaspora (Outside Liberia)
                  </label>
                </div>

                {formData.isDiaspora && (
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Diaspora City & Country</label>
                    <input
                      type="text"
                      placeholder="e.g. Houston, USA / Calgary, Canada"
                      value={formData.diasporaCountry}
                      onChange={(e) => setFormData({ ...formData, diasporaCountry: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}

                {/* WORKING REAL FILE UPLOAD SECTION WITH WORKING BROWSE BUTTONS */}
                <div className="p-4 bg-slate-950 border border-amber-500/50 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                      <Upload className="w-4 h-4" />
                      <span>Upload Credentials for Secretariat Accreditation</span>
                    </div>
                    <span className="text-[10px] text-slate-400">PDF, JPG, PNG, DOCX accepted</span>
                  </div>

                  {/* Hidden Real HTML File Inputs */}
                  <input
                    type="file"
                    ref={tradeCertFileRef}
                    onChange={(e) => handleFileChange(e, 'tradeCert')}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={operatingLicenseFileRef}
                    onChange={(e) => handleFileChange(e, 'operatingLicense')}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={resumeFileRef}
                    onChange={(e) => handleFileChange(e, 'resume')}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Document 1: Certificate / Degree */}
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl flex flex-col justify-between space-y-2">
                      <div>
                        <span className="block text-[11px] text-slate-200 font-bold">1. Technical Certificate</span>
                        <span className="text-[10px] text-slate-400 block mb-1">TVET Diploma or University Degree</span>
                        
                        <div className="flex items-center space-x-1.5 p-1.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{attachedFiles.tradeCert.fileName}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Size: {attachedFiles.tradeCert.fileSize}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => tradeCertFileRef.current?.click()}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/60 font-bold text-xs py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse / Upload File</span>
                      </button>
                    </div>

                    {/* Document 2: Operator / License */}
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl flex flex-col justify-between space-y-2">
                      <div>
                        <span className="block text-[11px] text-slate-200 font-bold">2. Operator / License</span>
                        <span className="text-[10px] text-slate-400 block mb-1">Heavy Machinery or Engineering License</span>
                        
                        <div className="flex items-center space-x-1.5 p-1.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{attachedFiles.operatingLicense.fileName}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Size: {attachedFiles.operatingLicense.fileSize}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => operatingLicenseFileRef.current?.click()}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/60 font-bold text-xs py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse / Upload File</span>
                      </button>
                    </div>

                    {/* Document 3: CV / Resume */}
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl flex flex-col justify-between space-y-2">
                      <div>
                        <span className="block text-[11px] text-slate-200 font-bold">3. CV / Resume</span>
                        <span className="text-[10px] text-slate-400 block mb-1">Work History & Technical References</span>
                        
                        <div className="flex items-center space-x-1.5 p-1.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{attachedFiles.resume.fileName}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Size: {attachedFiles.resume.fileSize}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => resumeFileRef.current?.click()}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/60 font-bold text-xs py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse / Upload File</span>
                      </button>
                    </div>

                  </div>
                </div>

              </form>

              {/* Pinned Bottom Footer with Always-Visible Submit Button */}
              <div className="p-4 sm:px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0 shadow-2xl">
                <span className="text-[11px] text-slate-400 hidden sm:inline-block">
                  Status: <strong className="text-emerald-400">Ready for Secretarial Audit</strong>
                </span>

                <div className="flex space-x-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="talent-reg-form"
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-transform hover:scale-105"
                  >
                    <span>Transmit to Secretariat</span>
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
