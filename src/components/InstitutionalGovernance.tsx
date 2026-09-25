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
    <section className="py-12 bg-slate-900 text-slate-100 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Landmark className="w-3.5 h-3.5" />
            <span>Institutional Charter & Governance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            About the Grand Gedeh Citizens Development Council
          </h2>
          <p className="text-amber-400 font-display text-base font-semibold mt-1">
            One County • One Voice • Shared Development
          </p>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            GGCDC is established as a permanent, non-partisan county development institution. 
            Putu is its first major case study—not the entire reason for its existence. The Council organizes 
            informed participation, accountable investment, and sustainable wealth creation across all sectors of Grand Gedeh.
          </p>
        </div>

        {/* The 5 Integrated Systems Diagram */}
        <div className="bg-slate-950 border border-emerald-900/80 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl">
          <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>The Five Integrated Digital Systems of GGCDC.org</span>
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            A single unified relational platform rather than disconnected mini-sites.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div 
              onClick={() => setActiveView('gismap')}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-emerald-600 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-emerald-400 block mb-1">01. Observatory</span>
                <h4 className="font-bold text-white text-sm">County Development Observatory</h4>
                <p className="text-xs text-slate-300 mt-2">
                  Interactive GIS map, district spatial boundary data, resource surveys, and economic analytics.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-emerald-400 font-semibold flex items-center">
                <span>Explore Map</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>

            <div 
              onClick={() => setActiveView('consultations')}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-emerald-600 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-blue-400 block mb-1">02. Participation</span>
                <h4 className="font-bold text-white text-sm">Citizens Participation Platform</h4>
                <p className="text-xs text-slate-300 mt-2">
                  Customary communities, public consultation portals, grievances, and authentic town attendance logs.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-blue-400 font-semibold flex items-center">
                <span>View Consultations</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>

            <div 
              onClick={() => setActiveView('concessions')}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-emerald-600 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-amber-400 block mb-1">03. Accountability</span>
                <h4 className="font-bold text-white text-sm">Investment & Accountability</h4>
                <p className="text-xs text-slate-300 mt-2">
                  Concession master registry, contractual promises, public revenue disclosures, and commitments tracker.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-amber-400 font-semibold flex items-center">
                <span>Inspect Concessions</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>

            <div 
              onClick={() => setActiveView('businesses')}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-emerald-600 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-purple-400 block mb-1">04. Opportunity</span>
                <h4 className="font-bold text-white text-sm">Economic Opportunity Platform</h4>
                <p className="text-xs text-slate-300 mt-2">
                  Verified local supplier database, countywide workforce registry, skills gap modeler, and tenders hub.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-purple-400 font-semibold flex items-center">
                <span>Browse Registry</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>

            <div 
              onClick={() => setActiveView('working-groups')}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-emerald-600 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-red-400 block mb-1">05. Governance</span>
                <h4 className="font-bold text-white text-sm">GGCDC Institutional Workspace</h4>
                <p className="text-xs text-slate-300 mt-2">
                  Specialized directorates, technical advisory network, risk registers, confidential briefs, and archive.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-red-400 font-semibold flex items-center">
                <span>Enter Workspace</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>

          </div>
        </div>

        {/* Council Structure & Answers to Essential Questions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Answering Essential Questions with Empirical Evidence</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Before GGCDC, citizens had to rely on rumors or vague announcements. The Council empowers Grand Gedeh 
              to answer systematically:
            </p>

            <ul className="text-xs space-y-2.5 text-slate-200">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>What resources does Grand Gedeh have?</strong> Mapped in our multi-layer GIS atlas.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>What investments are coming?</strong> Disclosed in our Concession Master Registry.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Who is affected?</strong> Documented in our Customary Community Registry.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>What has been promised?</strong> Monitored in our Commitments Tracker.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Who is benefiting?</strong> Quantified in local procurement and payroll audits.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>What opportunities exist?</strong> Broadcast live in the Opportunities Hub.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Secretariat & Institutional Headquarters</span>
            </h3>

            <div className="text-xs text-slate-300 space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Central Secretariat:</span>
                  <span>GGCDC County Headquarters, Commercial Avenue, Zwedru City, Grand Gedeh County, Liberia</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Official Secretariat Line:</span>
                  <span>+231 (0) 770 412 889 / +231 (0) 886 523 910</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Official Communications:</span>
                  <span>secretariat@ggcdc.org • engagement@ggcdc.org</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 mt-4 text-[11px] text-slate-400">
                <span className="text-amber-300 font-bold block mb-0.5">Diaspora Liaison Desk:</span>
                Partnered with Grand Gedeh Association in the Americas (GGAA) and European Diaspora Chapters 
                for professional accreditation and technical advisory co-leadership.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
