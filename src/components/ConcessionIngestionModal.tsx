import React, { useState } from 'react';
import { useApp } from '../utils/context';
import { ConcessionInputData, ProjectStage } from '../types';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  X, 
  CheckCircle, 
  Sparkles
} from 'lucide-react';

const DISTRICT_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Gbarzon District': { lat: 6.05, lng: -8.32 },
  'Tchien District': { lat: 6.07, lng: -8.13 },
  'Putu District': { lat: 5.68, lng: -8.18 },
  'Konobo District': { lat: 5.75, lng: -7.95 },
  'Cavalla District': { lat: 5.92, lng: -8.02 },
  'B\'hai District': { lat: 6.22, lng: -8.25 },
  'Grand Gedeh Countywide': { lat: 5.95, lng: -8.15 }
};

export const ConcessionIngestionModal: React.FC = () => {
  const { 
    isConcessionModalOpen, 
    setIsConcessionModalOpen, 
    addConcession, 
    currentUser,
    setActiveView,
    setSelectedProjectId
  } = useApp();

  const [name, setName] = useState('');
  const [operator, setOperator] = useState('');
  const [investorOrigin, setInvestorOrigin] = useState('United Kingdom / Canada');
  const [sector, setSector] = useState<ConcessionInputData['sector']>('Mining & Extractives');
  const [govCounterpart, setGovCounterpart] = useState('Ministry of Mines & Energy (MME) / NBC');
  const [stage, setStage] = useState<ProjectStage>('Development');
  const [district, setDistrict] = useState('Gbarzon District');
  const [affectedCommunitiesInput, setAffectedCommunitiesInput] = useState('Gorbo Clan, Gaye Town, Zleh Town');
  const [duration, setDuration] = useState('25 Years (2026 - 2051)');
  const [landFootprint, setLandFootprint] = useState('45,000 Hectares');
  const [totalDisclosedPayments, setTotalDisclosedPayments] = useState('$1,250,000 USD (Signature Bonus & Year 1 Fees)');
  
  // Commitments
  const [socialDevFundAnnual, setSocialDevFundAnnual] = useState('$350,000 USD Annual CSDF Escrow');
  const [employmentGoal, setEmploymentGoal] = useState('75% Grand Gedean workforce quota within 24 months');
  const [localProcurementQuota, setLocalProcurementQuota] = useState('Mandatory Tier-1 local catering, fuel & civil haulage');
  const [infrastructureItem, setInfrastructureItem] = useState('20km all-weather paved access corridor & community clinic');
  const [environmentalObligations, setEnvironmentalObligations] = useState('Quarterly water table assays & EPA-certified tailings dam');

  // Treaty Ratification Details
  const [agreementTitle, setAgreementTitle] = useState('Mineral Development Agreement (MDA)');
  const [ratificationAct, setRatificationAct] = useState('Act of 55th Legislature Ratifying MDA (Executive Signed)');
  const [auditorName, setAuditorName] = useState(currentUser?.name || 'Hon. Emmanuel Clarke');
  const [isCertified, setIsCertified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isConcessionModalOpen) return null;

  const handleDistrictChange = (newDistrict: string) => {
    setDistrict(newDistrict);
  };

  const handlePresetFill = (presetType: 'gold' | 'timber' | 'solar') => {
    if (presetType === 'gold') {
      setName('Gbarzon Gold & Polymetallic Mineral Concession');
      setOperator('Avesoro / Hummingbird Liberia Ltd.');
      setInvestorOrigin('United Kingdom');
      setSector('Mining & Extractives');
      setGovCounterpart('Ministry of Mines & Energy (MME) / NBC');
      setStage('Development');
      setDistrict('Gbarzon District');
      setAffectedCommunitiesInput('Gorbo Clan, Gaye Town, Boundary Town');
      setDuration('25 Years (2026 - 2051)');
      setLandFootprint('52,000 Hectares');
      setTotalDisclosedPayments('$1,500,000 USD (Signature Bonus)');
      setSocialDevFundAnnual('$400,000 USD Annual CSDF Escrow');
      setEmploymentGoal('80% Grand Gedean workforce quota within 24 months');
      setLocalProcurementQuota('Mandatory Tier-1 local catering & earthmoving contracts');
      setInfrastructureItem('Paved bridge over Cavalla tributary & Zleh Health Clinic');
      setAgreementTitle('Mineral Development Agreement (MDA)');
      setRatificationAct('Act of 55th Legislature Ratifying Gbarzon Gold MDA');
    } else if (presetType === 'timber') {
      setName('Cavalla River Sustainable Forestry & Agro-Lease');
      setOperator('Greenwood Timber & Biomass Liberia Inc.');
      setInvestorOrigin('Germany / Ivory Coast');
      setSector('Forestry & Environment');
      setGovCounterpart('Forestry Development Authority (FDA)');
      setStage('Operations');
      setDistrict('Cavalla District');
      setAffectedCommunitiesInput('Cavalla Clan, Polar Town, Gbawe');
      setDuration('20 Years (2026 - 2046)');
      setLandFootprint('38,500 Hectares');
      setTotalDisclosedPayments('$750,000 USD (Annual Bid Premium)');
      setSocialDevFundAnnual('$200,000 USD Annual CSDF Escrow');
      setEmploymentGoal('70% Grand Gedean workforce quota');
      setLocalProcurementQuota('100% local timber logistics & driver subcontracting');
      setInfrastructureItem('35km feeder road grading & solar borehole installation');
      setAgreementTitle('Forest Management Contract (FMC-C)');
      setRatificationAct('Forestry Management Contract FMC-C Statutory Handbill');
    } else if (presetType === 'solar') {
      setName('Zwedru Metropolitan Solar Corridor & Mini-Grid PPP');
      setOperator('West Africa Clean Energy Corridors Ltd.');
      setInvestorOrigin('France / AfDB');
      setSector('Infrastructure & Public Utilities');
      setGovCounterpart('Rural & Renewable Energy Agency (RREA) / LEC');
      setStage('Development');
      setDistrict('Tchien District');
      setAffectedCommunitiesInput('Zwedru City Central, Tubmanville, Kudah');
      setDuration('15 Years (2026 - 2041)');
      setLandFootprint('850 Hectares');
      setTotalDisclosedPayments('$3,200,000 USD (Concessional Grant & Equity)');
      setSocialDevFundAnnual('$150,000 USD Annual Community Fund');
      setEmploymentGoal('90% Grand Gedean electrical apprentices');
      setLocalProcurementQuota('Local electrical maintenance & security procurement');
      setInfrastructureItem('10MW PV Solar Array & Zwedru Hospital 24/7 Power Connection');
      setAgreementTitle('Renewable Energy Public-Private Partnership (PPP)');
      setRatificationAct('Government of Liberia Clean Energy Concession Handbill');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !operator.trim()) {
      setErrorNotice('Concession Project Name and Operating Company are required.');
      return;
    }
    if (!isCertified) {
      setErrorNotice('You must certify statutory legislative ratification before formal ingestion.');
      return;
    }

    setIsSubmitting(true);
    setErrorNotice(null);

    const coords = DISTRICT_COORDINATES[district] || { lat: 5.95, lng: -8.15 };
    const affectedCommunities = affectedCommunitiesInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const newConcession: ConcessionInputData = {
      name: name.trim(),
      operator: operator.trim(),
      investorOrigin: investorOrigin.trim(),
      sector,
      govCounterpart: govCounterpart.trim(),
      district,
      affectedCommunities: affectedCommunities.length ? affectedCommunities : ['Customary Host Communities'],
      stage,
      duration: duration.trim(),
      landFootprint: landFootprint.trim(),
      totalDisclosedPayments: totalDisclosedPayments.trim(),
      lat: coords.lat,
      lng: coords.lng,
      statusNotes: `Ingested into Sovereign Ledger on ${new Date().toISOString().split('T')[0]} by Secretariat Auditor: ${auditorName}. Ratification Authority: ${ratificationAct}.`,
      agreements: [
        {
          title: agreementTitle.trim(),
          type: sector === 'Mining & Extractives' ? 'Mineral Development Agreement (MDA)' :
                sector === 'Forestry & Environment' ? 'Forest Management Contract (FMC)' :
                'Concession Agreement',
          signedDate: new Date().toISOString().split('T')[0],
          status: 'Ratified by National Legislature & Signed by President'
        }
      ],
      commitmentsSummary: {
        employmentGoal: employmentGoal.trim(),
        localProcurementQuota: localProcurementQuota.trim(),
        socialDevFundAnnual: socialDevFundAnnual.trim(),
        infrastructureItems: infrastructureItem.split(',').map(s => s.trim()).filter(Boolean),
        environmentalObligations: environmentalObligations.split(',').map(s => s.trim()).filter(Boolean)
      }
    };

    setTimeout(() => {
      const created = addConcession(newConcession);
      setIsSubmitting(false);
      setIsConcessionModalOpen(false);
      setSelectedProjectId(created.id);
      setActiveView('concessions');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-6 text-slate-800 dark:text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsConcessionModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sovereign Header */}
        <div className="flex items-start space-x-3.5 mb-6 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="flex-1 pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Secretariat Legal Directorate
              </span>
              <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Statutory Ingestion Protocol
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Ingest New Concession &amp; Legal Treaty
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Register newly gazetted Mineral Development Agreements (MDAs), Forestry Management Contracts (FMCs), and Agricultural Concessions into the Grand Gedeh Sovereign Transparency Observatory.
            </p>
          </div>
        </div>

        {/* Quick Fill Presets */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Fast-Track Template Presets (Auto-fills statutory Grand Gedeh terms):</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handlePresetFill('gold')}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 transition-colors"
            >
              + Mining: Gbarzon Gold MDA
            </button>
            <button
              type="button"
              onClick={() => handlePresetFill('timber')}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 transition-colors"
            >
              + Forestry: Cavalla FMC-C
            </button>
            <button
              type="button"
              onClick={() => handlePresetFill('solar')}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 transition-colors"
            >
              + Energy: Zwedru Solar PPP
            </button>
          </div>
        </div>

        {errorNotice && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-medium">
            {errorNotice}
          </div>
        )}

        {/* Main Intake Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Treaty Identity */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Building2 className="w-4 h-4" />
              <span>Section 1: Treaty &amp; Concessionaire Identity</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Concession Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gbarzon Gold &amp; Mineral Concession"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Operating Concessionaire Company *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Avesoro Mining Liberia Ltd."
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parent Investor Origin / Country
                </label>
                <input
                  type="text"
                  placeholder="e.g. United Kingdom / Canada"
                  value={investorOrigin}
                  onChange={(e) => setInvestorOrigin(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Sector Classification
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as ConcessionInputData['sector'])}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Mining & Extractives">Mining &amp; Extractives</option>
                  <option value="Forestry & Environment">Forestry &amp; Environment</option>
                  <option value="Agriculture & Food Systems">Agriculture &amp; Food Systems</option>
                  <option value="Infrastructure & Public Utilities">Infrastructure &amp; Public Utilities</option>
                  <option value="Concessions & PPPs">Concessions &amp; PPPs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Statutory Government Counterpart
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ministry of Mines &amp; Energy (MME) / NBC"
                  value={govCounterpart}
                  onChange={(e) => setGovCounterpart(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Current Operational Stage
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as ProjectStage)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Exploration">Exploration</option>
                  <option value="Feasibility">Feasibility</option>
                  <option value="Development">Development</option>
                  <option value="Operations">Operations</option>
                  <option value="Active">Active</option>
                  <option value="Rehabilitation">Rehabilitation</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Agreement Duration &amp; Term
                </label>
                <input
                  type="text"
                  placeholder="e.g. 25 Years (2026 - 2051)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Total Land Footprint
                </label>
                <input
                  type="text"
                  placeholder="e.g. 45,000 Hectares"
                  value={landFootprint}
                  onChange={(e) => setLandFootprint(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Spatial & Customary Demarcation */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <MapPin className="w-4 h-4" />
              <span>Section 2: Geographic District &amp; Customary Communities</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Host District in Grand Gedeh
                </label>
                <select
                  value={district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Gbarzon District">Gbarzon District</option>
                  <option value="Tchien District">Tchien District</option>
                  <option value="Putu District">Putu District</option>
                  <option value="Konobo District">Konobo District</option>
                  <option value="Cavalla District">Cavalla District</option>
                  <option value="B'hai District">B'hai District</option>
                  <option value="Grand Gedeh Countywide">Grand Gedeh Countywide</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Affected Customary Clans &amp; Towns (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gorbo Clan, Gaye Town, Zleh Town"
                  value={affectedCommunitiesInput}
                  onChange={(e) => setAffectedCommunitiesInput(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Statutory Socio-Economic Commitments */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400">
              <DollarSign className="w-4 h-4" />
              <span>Section 3: Contractual Covenants &amp; Commitments</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Annual County Social Development Fund (CSDF) Escrow
                </label>
                <input
                  type="text"
                  placeholder="e.g. $350,000 USD Annual CSDF Escrow"
                  value={socialDevFundAnnual}
                  onChange={(e) => setSocialDevFundAnnual(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Total Disclosed Signature &amp; Initial Payments
                </label>
                <input
                  type="text"
                  placeholder="e.g. $1,250,000 USD (Signature Bonus)"
                  value={totalDisclosedPayments}
                  onChange={(e) => setTotalDisclosedPayments(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Section 11 Local Labor &amp; TVET Quota
                </label>
                <input
                  type="text"
                  placeholder="e.g. 75% Grand Gedean workforce quota within 24 months"
                  value={employmentGoal}
                  onChange={(e) => setEmploymentGoal(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Section 13 Local Procurement Quota
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mandatory Tier-1 local catering &amp; civil haulage"
                  value={localProcurementQuota}
                  onChange={(e) => setLocalProcurementQuota(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Flagship Social &amp; Physical Infrastructure Deliverable
                </label>
                <input
                  type="text"
                  placeholder="e.g. 20km all-weather paved access corridor &amp; community clinic"
                  value={infrastructureItem}
                  onChange={(e) => setInfrastructureItem(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Ratification & Legal Sign-off */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Section 4: Legislative Ratification Sign-Off</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Treaty / Agreement Instrument
                </label>
                <input
                  type="text"
                  value={agreementTitle}
                  onChange={(e) => setAgreementTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ratification Act / Handbill Citation
                </label>
                <input
                  type="text"
                  value={ratificationAct}
                  onChange={(e) => setRatificationAct(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Secretariat Auditor Attestation
                </label>
                <input
                  type="text"
                  value={auditorName}
                  onChange={(e) => setAuditorName(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Certification Checkbox */}
            <div className="pt-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={isCertified}
                  onChange={(e) => setIsCertified(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>Statutory Certification:</strong> I hereby certify under the authority of the GGCDC Permanent Secretariat that this concession treaty has been ratified by the Legislature of the Republic of Liberia and officially signed into law. This action will permanently spawn compliance audit rows in the Commitments Tracker and dispatch public transparency telemetry.
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsConcessionModalOpen(false)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-black tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Ingesting Treaty...' : 'Ratify & Ingest Concession Treaty →'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
