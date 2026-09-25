import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle2, 
  Users, 
  MapPin, 
  Calendar, 
  Coins, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../utils/context';
import { ConcessionProject } from '../types';

export const ConcessionRegistry: React.FC = () => {
  const { concessions, selectedProjectId, setSelectedProjectId, setActiveView, setSelectedCommunityId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ConcessionProject | null>(
    selectedProjectId ? concessions.find(c => c.id === selectedProjectId) || null : null
  );

  const sectors = ['All', 'Mining & Extractives', 'Forestry & Environment', 'Agriculture & Food Systems', 'Infrastructure & Public Utilities'];

  const filteredProjects = concessions.filter((p) => {
    const matchesSector = selectedSector === 'All' || p.sector === selectedSector;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <section className="py-12 bg-slate-900 text-slate-100 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Hierarchy Explanation */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Master Concessions & Investment Observatory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            County Investment & Concession Registry
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
            Tracking every major investor, concession agreement, fiscal payment, and socio-economic obligation in Grand Gedeh. 
            Putu operates as a flagship case study under the Mining & Extractives arm, alongside forestry, agriculture, energy, and road concessions.
          </p>

          {/* Institutional Hierarchy Diagram Banner */}
          <div className="mt-4 p-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs flex flex-wrap items-center gap-2 text-slate-300">
            <span className="font-bold text-amber-400">Institutional Hierarchy:</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded text-white border border-slate-700">GGCDC Council</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="bg-slate-900 px-2 py-0.5 rounded text-white border border-slate-700">Natural Resources Portfolio</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="bg-emerald-900/80 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700 font-semibold">Specialized Sector Arms (8)</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="bg-amber-900/80 text-amber-200 px-2 py-0.5 rounded border border-amber-700 font-semibold">Individual Projects (e.g. Putu Iron Ore Working Group)</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search concessions, operators, districts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedSector === sec
                    ? 'bg-emerald-600 text-white font-semibold shadow'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Concessions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 hover:border-emerald-500 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded">
                    {project.sector}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                    Stage: {project.stage}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-2 leading-snug">
                  {project.name}
                </h3>
                <div className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
                  <span className="font-semibold text-slate-300">Operator:</span>
                  <span>{project.operator}</span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-medium text-slate-200">{project.district}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Land Footprint:</span>
                    <span className="font-medium text-slate-200">{project.landFootprint}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-medium text-slate-200">{project.duration.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Disclosed Payments:</span>
                    <span className="font-bold text-emerald-400">{project.totalDisclosedPayments.split('(')[0]}</span>
                  </div>
                </div>

                {/* Affected Communities Tags */}
                <div className="mt-3">
                  <div className="text-[11px] text-slate-400 mb-1">Affected Communities:</div>
                  <div className="flex flex-wrap gap-1">
                    {project.affectedCommunities.map((comm, idx) => (
                      <span key={idx} className="bg-slate-700/60 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                        {comm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-slate-700/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <span>Inspect Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveView('commitments')}
                  className="text-xs text-amber-400 hover:underline"
                >
                  Track Commitments
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive Profile Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
              
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <span>{activeModalProject.sector}</span>
                <span>•</span>
                <span>{activeModalProject.stage} Stage</span>
              </div>

              <h2 className="text-2xl font-extrabold text-white">
                {activeModalProject.name}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Concession Oversight Profile • Monitored under GGCDC Institutional Framework
              </p>

              {/* Grid of Key Properties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <div className="text-[11px] text-slate-400">Operator / Investor:</div>
                  <div className="text-xs font-bold text-white mt-0.5">{activeModalProject.operator}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{activeModalProject.investorOrigin}</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <div className="text-[11px] text-slate-400">Government Counterpart:</div>
                  <div className="text-xs font-bold text-white mt-0.5">{activeModalProject.govCounterpart}</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <div className="text-[11px] text-slate-400">Duration & Timeline:</div>
                  <div className="text-xs font-bold text-white mt-0.5">{activeModalProject.duration}</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <div className="text-[11px] text-slate-400">Disclosed Financial Payments:</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">{activeModalProject.totalDisclosedPayments}</div>
                </div>
              </div>

              {/* Contractual Commitments Summary */}
              <div className="mt-6 bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Contractual Commitments & Obligations</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Employment Goal:</span>
                    <span className="text-slate-200 font-medium">{activeModalProject.commitmentsSummary.employmentGoal}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Local Procurement Quota:</span>
                    <span className="text-slate-200 font-medium">{activeModalProject.commitmentsSummary.localProcurementQuota}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Social Development Fund:</span>
                    <span className="text-amber-300 font-medium">{activeModalProject.commitmentsSummary.socialDevFundAnnual}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Environmental Oversight:</span>
                    <span className="text-slate-200 font-medium">{activeModalProject.commitmentsSummary.environmentalObligations[0]}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">Key Infrastructure Pledges:</span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {activeModalProject.commitmentsSummary.infrastructureItems.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-emerald-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status & Oversight Notes */}
              <div className="mt-4 p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs text-amber-200">
                <span className="font-bold">Current GGCDC Working Group Audit Note: </span>
                {activeModalProject.statusNotes}
              </div>

              {/* Modal Actions */}
              <div className="mt-6 flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    setActiveView('commitments');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  View All Commitments for this Concession
                </button>
                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    setActiveView('working-groups');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Open Dedicated Working Group
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
