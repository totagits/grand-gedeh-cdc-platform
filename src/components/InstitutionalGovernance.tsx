import React from 'react';
import { 
  Landmark, 
  ShieldCheck, 
  Scale, 
  Users, 
  CheckCircle2, 
  Compass, 
  MapPin, 
  Phone, 
  Mail,
  Building2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../utils/context';

export const InstitutionalGovernance: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Executive Sovereign Header */}
        <div className="bg-gradient-to-br from-emerald-950 via-[#0d2a24] to-slate-950 text-white p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-800/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
                <Landmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Statutory Mandate &amp; Institutional Charter</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-1">
                Grand Gedeh Citizens Development Council
              </h1>
              <p className="text-amber-400 font-display text-base font-semibold mb-2.5">
                One County • One Voice • Shared Development
              </p>
              <p className="text-emerald-100/85 text-xs sm:text-sm md:text-base leading-relaxed">
                GGCDC is established as a permanent, non-partisan county development institution. Putu operates as its flagship extractive case study—not the entire reason for its existence. The Council organizes informed participation, accountable investment, and sustainable wealth creation across all sectors of Grand Gedeh.
              </p>
            </div>

            {/* Sovereign Institutional Badge */}
            <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-md shrink-0">
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">County Governance Authority</div>
              <div className="text-base font-black text-white font-mono mt-0.5">Permanent State Body</div>
              <div className="text-[11px] text-amber-300 flex items-center gap-1.5 mt-1">
                <span>Section 13 Enforcement Mandate</span>
              </div>
            </div>
          </div>
        </div>

        {/* The 5 Integrated Systems Diagram */}
        <div className="bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-md">
          <div className="mb-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>The Five Integrated Digital Systems of GGCDC.org</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              A single unified relational platform rather than disconnected mini-sites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div 
              onClick={() => setActiveView('gismap')}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl hover:border-emerald-500 cursor-pointer transition-all flex flex-col justify-between group shadow-sm hover:shadow"
            >
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">01. Observatory</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">County Development Observatory</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Interactive GIS map, district spatial boundary data, resource surveys, and economic analytics.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center">
                <span>Explore Map</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => setActiveView('consultations')}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl hover:border-blue-500 cursor-pointer transition-all flex flex-col justify-between group shadow-sm hover:shadow"
            >
              <div>
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block mb-1">02. Participation</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Citizens Participation Platform</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Customary communities, public consultation portals, grievances, and authentic town attendance logs.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-blue-700 dark:text-blue-400 font-semibold flex items-center">
                <span>View Consultations</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => setActiveView('concessions')}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl hover:border-amber-500 cursor-pointer transition-all flex flex-col justify-between group shadow-sm hover:shadow"
            >
              <div>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-1">03. Accountability</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">Investment &amp; Accountability</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Concession master registry, contractual promises, public revenue disclosures, and commitments tracker.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center">
                <span>Inspect Concessions</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => setActiveView('businesses')}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl hover:border-purple-500 cursor-pointer transition-all flex flex-col justify-between group shadow-sm hover:shadow"
            >
              <div>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-400 block mb-1">04. Opportunity</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">Economic Opportunity Platform</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Verified local supplier database, countywide workforce registry, skills gap modeler, and tenders hub.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-purple-700 dark:text-purple-400 font-semibold flex items-center">
                <span>Browse Registry</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => setActiveView('working-groups')}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl hover:border-rose-500 cursor-pointer transition-all flex flex-col justify-between group shadow-sm hover:shadow"
            >
              <div>
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block mb-1">05. Governance</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">GGCDC Institutional Workspace</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Specialized directorates, technical advisory network, risk registers, confidential briefs, and archive.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-rose-700 dark:text-rose-400 font-semibold flex items-center">
                <span>Enter Workspace</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>

        {/* Council Structure & Answers to Essential Questions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <div className="bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm backdrop-blur-md">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Answering Essential Questions with Empirical Evidence</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Before GGCDC, citizens had to rely on rumors or vague announcements. The Council empowers Grand Gedeh to answer systematically:
            </p>

            <ul className="text-xs space-y-2.5 text-slate-700 dark:text-slate-200">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>What resources does Grand Gedeh have?</strong> Mapped in our multi-layer GIS atlas.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>What investments are coming?</strong> Disclosed in our Concession Master Registry.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Who is affected?</strong> Documented in our Customary Community Registry.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>What has been promised?</strong> Monitored in our Commitments Tracker.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Who is benefiting?</strong> Quantified in local procurement and payroll audits.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>What opportunities exist?</strong> Broadcast live in the Opportunities Hub.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm backdrop-blur-md">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Secretariat &amp; Institutional Headquarters</span>
            </h3>

            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-3.5">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Central Secretariat:</span>
                  <span>GGCDC County Headquarters, Commercial Avenue, Zwedru City, Grand Gedeh County, Liberia</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Official Secretariat Line:</span>
                  <span>+231 (0) 770 412 889 / +231 (0) 886 523 910</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Official Communications:</span>
                  <span>secretariat@ggcdc.org • engagement@ggcdc.org</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 mt-4 text-[11px] text-slate-600 dark:text-slate-400">
                <span className="text-amber-700 dark:text-amber-300 font-bold block mb-0.5">Diaspora Liaison Desk:</span>
                Partnered with Grand Gedeh Association in the Americas (GGAA) and European Diaspora Chapters for professional accreditation and technical advisory co-leadership.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
