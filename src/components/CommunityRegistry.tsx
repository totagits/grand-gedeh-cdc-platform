import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  MapPin, 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  Building2, 
  ExternalLink,
  ChevronRight,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../utils/context';
import { CommunityProfile } from '../types';

export const CommunityRegistry: React.FC = () => {
  const { communities, selectedCommunityId, setSelectedCommunityId, setActiveView, setSelectedProjectId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [activeModalCommunity, setActiveModalCommunity] = useState<CommunityProfile | null>(
    selectedCommunityId ? communities.find(c => c.id === selectedCommunityId) || null : null
  );

  const districts = ['All', 'Putu District', 'Tchien District', 'B\'hai District', 'Gbao District', 'Cavalla District'];

  const filteredCommunities = communities.filter((c) => {
    const matchesDistrict = selectedDistrict === 'All' || c.district.toLowerCase().includes(selectedDistrict.toLowerCase().replace(' district', ''));
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.traditionalLeader.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  return (
    <section className="py-12 bg-slate-900 text-slate-100 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Customary Governance & Civic Registry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Grand Gedeh Community & Stakeholder Registry
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
            Institutional profiles for Grand Gedeh's customary settlements, chiefdoms, and towns. Documenting authentic 
            traditional leadership, women and youth governance, baseline infrastructure, signed agreements, and direct consultation logs.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search community name, chief, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDistrict === d
                    ? 'bg-emerald-600 text-white font-semibold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((comm) => (
            <div
              key={comm.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 hover:border-emerald-500 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded">
                    {comm.district}
                  </span>
                  <span className="text-[11px] font-mono text-slate-300">
                    Pop: ~{comm.estimatedPopulation.toLocaleString()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                  {comm.name}
                </h3>
                
                <div className="text-xs text-slate-300 mt-2 space-y-1">
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <span className="font-semibold text-slate-300">Traditional Chief:</span>
                    <span>{comm.traditionalLeader}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <span className="font-semibold text-slate-300">Women's Rep:</span>
                    <span>{comm.womenRepresentative}</span>
                  </div>
                </div>

                {/* Infrastructure Baseline Pillbox */}
                <div className="mt-4 p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs grid grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Schools:</span>
                    <span className="font-bold text-white">{comm.infrastructure.schools} Facilities</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Health Clinics:</span>
                    <span className="font-bold text-white">{comm.infrastructure.clinics} Facilities</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Clean Water:</span>
                    <span className="font-bold text-emerald-400">{comm.infrastructure.cleanWaterAccessPct}% Coverage</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Electricity:</span>
                    <span className="font-medium text-amber-300 text-[11px] truncate">{comm.infrastructure.electricityAccess}</span>
                  </div>
                </div>

                {/* Affecting Projects */}
                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 block mb-1">Affecting Concessions & Projects:</span>
                  <div className="flex flex-wrap gap-1">
                    {comm.affectingProjects.map((p, idx) => (
                      <span key={idx} className="bg-slate-700/60 text-slate-200 text-[10px] px-2 py-0.5 rounded">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveModalCommunity(comm)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <span>Institutional Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                  <span>{comm.consultationsAttended} Consultations</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Full Institutional Profile */}
        {activeModalCommunity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
              <button
                onClick={() => setActiveModalCommunity(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <span>{activeModalCommunity.district}</span>
                <span>•</span>
                <span>Customary Community Profile</span>
              </div>

              <h2 className="text-2xl font-extrabold text-white">
                {activeModalCommunity.name}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Estimated Population: ~{activeModalCommunity.estimatedPopulation.toLocaleString()} • Customary Land Committee: {activeModalCommunity.customaryLandBody}
              </p>

              {/* Leadership Roster */}
              <div className="mt-5 bg-slate-800/80 p-4 rounded-xl border border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Traditional Leader:</span>
                  <span className="font-bold text-white mt-0.5 block">{activeModalCommunity.traditionalLeader}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Women's Representative:</span>
                  <span className="font-bold text-white mt-0.5 block">{activeModalCommunity.womenRepresentative}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Youth Leader:</span>
                  <span className="font-bold text-white mt-0.5 block">{activeModalCommunity.youthLeader}</span>
                </div>
              </div>

              {/* Development Priorities */}
              <div className="mt-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Top Community-Identified Priorities:
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {activeModalCommunity.topDevelopmentPriorities.map((pri, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-400 font-bold">{idx + 1}.</span>
                      <span>{pri}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Signed Agreements & Active Grievances */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block text-[11px] font-semibold">Signed Agreements / CDAs:</span>
                  <div className="mt-1 space-y-1">
                    {activeModalCommunity.signedAgreements.map((agr, idx) => (
                      <div key={idx} className="text-emerald-300 font-medium flex items-center space-x-1">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{agr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block text-[11px] font-semibold">Logged Community Grievances:</span>
                  <div className="mt-1 flex items-center space-x-2 text-amber-300">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>{activeModalCommunity.activeGrievanceCount} Active cases being mediated by GGCDC</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => {
                    setActiveModalCommunity(null);
                    setActiveView('consultations');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Submit Grievance / Recommendation
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
