import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Calculator, 
  CheckCircle, 
  GraduationCap, 
  Globe, 
  PlusCircle, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../utils/context';

export const WorkforceRegistry: React.FC = () => {
  const { workforce, registerWorkforce } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrade, setSelectedTrade] = useState<string>('All');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Investor Skills Gap Calculator State
  const [calcTrade, setCalcTrade] = useState('Heavy-equipment operators');
  const [calcDemand, setCalcDemand] = useState<number>(400);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male' as const,
    district: 'Putu District',
    isDiaspora: false,
    diasporaCountry: '',
    tradeCategory: 'Heavy-equipment operators',
    specialization: '',
    qualificationLevel: 'Trade Certified' as const,
    yearsExperience: 5,
    currentStatus: 'Available for Immediate Hire' as const,
    verifiedSkillsStr: ''
  });

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

  // Calculate Skills Gap Breakdown
  const availableInDb = workforce.filter(w => w.tradeCategory.toLowerCase().includes(calcTrade.toLowerCase().split(' ')[0]));
  const countInDb = availableInDb.length;
  // Scaled modeling based on database sample
  const verifiedQualified = Math.min(calcDemand, Math.round(countInDb * 66));
  const partialQualified = Math.min(calcDemand - verifiedQualified, Math.round(calcDemand * 0.22));
  const trainingRequired = Math.max(0, calcDemand - verifiedQualified - partialQualified);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerWorkforce({
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
      verifiedSkills: formData.verifiedSkillsStr.split(',').map(s => s.trim()).filter(Boolean)
    });
    setShowRegisterModal(false);
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Human Capital & Local Content Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Grand Gedeh Skills & Workforce Registry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Countywide and diaspora professional registry. Transforming employment advocacy from vague demands 
              into verified skills data, precise labor gap analysis, and targeted training covenants.
            </p>
          </div>

          <button
            onClick={() => setShowRegisterModal(true)}
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-lg transition-colors self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Your Skills Profile</span>
          </button>
        </div>

        {/* Dynamic Investor Skills Gap Calculator Banner */}
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
                When an investor or concessionaire requires skilled workers, this system replaces guesswork with empirical Grand Gedeh talent data.
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

          {/* Calculator Output Breakdown Cards */}
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
                Allocated to GGCC TVET accelerator funded under Concession Article 11 training fund.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Trade Category Filter */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, skill, district, degree..."
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

        {/* Workforce Profiles Grid */}
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
                  {person.isDiaspora ? (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-sky-300 bg-sky-950 border border-sky-800 px-2 py-0.5 rounded-full">
                      <Globe className="w-3 h-3 text-sky-400" />
                      <span>Diaspora: {person.diasporaCountry?.split('(')[0]}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">
                      {person.district}
                    </span>
                  )}
                </div>

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
                    <span className="text-slate-400">Availability:</span>
                    <span className="text-amber-300 font-medium">{person.currentStatus}</span>
                  </div>
                </div>

                {/* Verified Skills Badges */}
                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 block mb-1">Verified Technical Competencies:</span>
                  <div className="flex flex-wrap gap-1">
                    {person.verifiedSkills.map((sk, idx) => (
                      <span key={idx} className="bg-slate-800 text-slate-200 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[10px]">ID: {person.id.toUpperCase()}</span>
                <button className="text-emerald-400 hover:text-emerald-300 font-semibold underline text-xs">
                  Request Roster Verification
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Register Workforce Profile */}
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Countywide & Diaspora Talent Pool</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Register Your Qualifications & Skills
              </h2>
              <p className="text-xs text-slate-300 mt-1 mb-6">
                Your profile is reviewed by the GGCDC Human Capital Desk to match with concession vacancies, TVET scholarships, and advisory panels.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Moses Glaydor Krahn"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Trade / Profession Category</label>
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
                      <option value="Agricultural specialists">Agricultural Extension & Agronomy</option>
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
                      <option value="Trade Certified">Trade Certified (TVET / Apprenticeship)</option>
                      <option value="Diploma">Diploma / Associate Degree</option>
                      <option value="BSc / BEng">BSc / Bachelor of Engineering</option>
                      <option value="Master / PhD">Master / PhD</option>
                      <option value="Apprentice">Apprentice / Entry Level</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Grand Gedeh Origin District</label>
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
                  <label className="block text-slate-300 mb-1 font-medium">Primary Specialization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CAT 349 Excavator operator, AWS 6G pipe welding, or Tailings dam hydrology"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Verified Technical Skills (Comma-separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Open Pit Excavation, Grade Stakes, Safety Audits, Hydraulic Maintenance"
                    value={formData.verifiedSkillsStr}
                    onChange={(e) => setFormData({ ...formData, verifiedSkillsStr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

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
                      placeholder="e.g. Houston, Texas, USA"
                      value={formData.diasporaCountry}
                      onChange={(e) => setFormData({ ...formData, diasporaCountry: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}

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
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow"
                  >
                    Save & Submit Profile
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
