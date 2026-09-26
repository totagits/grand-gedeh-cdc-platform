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
  const { 
    concessions, 
    selectedProjectId, 
    setSelectedProjectId, 
    setActiveView, 
    setSelectedCommunityId,
    setIsConcessionModalOpen,
    currentUser
  } = useApp();
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
    <section className="py-10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Master Observatory Header */}
        <div className="bg-gradient-to-br from-emerald-950 via-[#0d2a24] to-slate-950 text-white p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-800/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Directorate of Concessions &amp; Mineral Intelligence</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2.5">
                County Investment &amp; Concession Registry
              </h1>
              <p className="text-emerald-100/85 text-xs sm:text-sm md:text-base leading-relaxed">
                Tracking every major investor, concession agreement, fiscal payment, and socio-economic obligation in Grand Gedeh. Putu operates as a flagship case study under the Mining &amp; Extractives arm, alongside forestry, agriculture, energy, and road concessions.
              </p>
            </div>

            {/* Executive KPI Stat Badges & Ingestion Trigger */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              {currentUser?.role === 'secretariat' && (
                <button
                  type="button"
                  onClick={() => setIsConcessionModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <Building2 className="w-4 h-4 text-slate-950" />
                  <span>+ Ingest New Concession / Treaty</span>
                </button>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
                <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-3 backdrop-blur-md">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Concession Portfolio</div>
                  <div className="text-lg font-black text-white font-mono">$2.4 Billion</div>
                  <div className="text-[10px] text-slate-400">Total CapEx Tracked</div>
                </div>
                <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-3 backdrop-blur-md">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Audited Agreements</div>
                  <div className="text-lg font-black text-white font-mono">{concessions.length} Concessions</div>
                  <div className="text-[10px] text-slate-400">Section 13 Monitored</div>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Hierarchy Diagram Banner */}
          <div className="mt-6 pt-4 border-t border-emerald-800/50 flex flex-wrap items-center gap-2 text-xs text-emerald-200">
            <span className="font-bold text-amber-400">Institutional Chain:</span>
            <span className="bg-emerald-900/80 px-2.5 py-0.5 rounded-lg border border-emerald-700/60 font-medium">GGCDC Council</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400/70" />
            <span className="bg-emerald-900/80 px-2.5 py-0.5 rounded-lg border border-emerald-700/60 font-medium">Natural Resources Directorate</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400/70" />
            <span className="bg-emerald-900/80 px-2.5 py-0.5 rounded-lg border border-emerald-700/60 font-medium">Putu Mining &amp; Extractives Arm</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400/70" />
            <span className="bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-lg border border-amber-400/40 font-bold">Public Oversight Dossier</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm backdrop-blur-md">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search concessions, operators, districts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                  selectedSector === sec
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-400/30'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {sec}
              </button>
            ))}
            {currentUser?.role === 'secretariat' && (
              <button
                type="button"
                onClick={() => setIsConcessionModalOpen(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1 transition-all ml-1"
              >
                <span>+ Ingest</span>
              </button>
            )}
          </div>
        </div>

        {/* Concessions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm dark:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800/80 px-2 py-0.5 rounded">
                    {project.sector}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 rounded">
                    Stage: {project.stage}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                  {project.name}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center space-x-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Operator:</span>
                  <span>{project.operator}</span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Location:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{project.district}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Land Footprint:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{project.landFootprint}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Duration:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{project.duration.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Disclosed Payments:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{project.totalDisclosedPayments.split('(')[0]}</span>
                  </div>
                </div>

                {/* Affected Communities Tags */}
                <div className="mt-3">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Affected Communities:</div>
                  <div className="flex flex-wrap gap-1">
                    {project.affectedCommunities.map((comm, idx) => (
                      <span key={idx} className="bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-200 dark:border-transparent">
                        {comm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <span>Inspect Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveView('commitments')}
                  className="text-xs text-amber-700 dark:text-amber-400 font-semibold hover:underline"
                >
                  Track Commitments
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive Profile Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-800 dark:text-slate-100">
              
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full transition-colors"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2">
                <span>{activeModalProject.sector}</span>
                <span>•</span>
                <span>{activeModalProject.stage} Stage</span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {activeModalProject.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Concession Oversight Profile • Monitored under GGCDC Institutional Framework
              </p>

              {/* Grid of Key Properties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Operator / Investor:</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{activeModalProject.operator}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{activeModalProject.investorOrigin}</div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Government Counterpart:</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{activeModalProject.govCounterpart}</div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Duration & Timeline:</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{activeModalProject.duration}</div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Disclosed Financial Payments:</div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">{activeModalProject.totalDisclosedPayments}</div>
                </div>
              </div>

              {/* Contractual Commitments Summary */}
              <div className="mt-6 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Contractual Commitments & Obligations</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Employment Goal:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{activeModalProject.commitmentsSummary.employmentGoal}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Local Procurement Quota:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{activeModalProject.commitmentsSummary.localProcurementQuota}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Social Development Fund:</span>
                    <span className="text-amber-800 dark:text-amber-300 font-medium">{activeModalProject.commitmentsSummary.socialDevFundAnnual}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Environmental Oversight:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{activeModalProject.commitmentsSummary.environmentalObligations[0]}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Key Infrastructure Pledges:</span>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {activeModalProject.commitmentsSummary.infrastructureItems.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-emerald-600 dark:text-emerald-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status & Oversight Notes */}
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-lg text-xs text-amber-900 dark:text-amber-200">
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
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700"
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
