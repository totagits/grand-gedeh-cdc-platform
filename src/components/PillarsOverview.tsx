import React, { useState } from 'react';
import { 
  Pickaxe, 
  Trees, 
  Wheat, 
  Building2, 
  Handshake, 
  Briefcase, 
  Users, 
  Scale, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { PILLARS_DATA } from '../data/mockData';
import { Pillar } from '../types';
import { useApp } from '../utils/context';

export const PillarsOverview: React.FC = () => {
  const { setActiveView, setSelectedProjectId } = useApp();
  const [selectedPillar, setSelectedPillar] = useState<Pillar>(PILLARS_DATA[0]);

  const iconMap: Record<string, React.ElementType> = {
    Pickaxe,
    Trees,
    Wheat,
    Building2,
    Handshake,
    Briefcase,
    Users,
    Scale
  };

  const handlePillarAction = (toolName: string) => {
    if (toolName.includes('Putu') || toolName.includes('Concession')) {
      setSelectedProjectId('proj-putu-iron');
      setActiveView('concessions');
    } else if (toolName.includes('GIS') || toolName.includes('Map')) {
      setActiveView('gismap');
    } else if (toolName.includes('Business') || toolName.includes('Procurement')) {
      setActiveView('businesses');
    } else if (toolName.includes('Workforce') || toolName.includes('Skills') || toolName.includes('Apprenticeship')) {
      setActiveView('workforce');
    } else if (toolName.includes('Community') || toolName.includes('Customary')) {
      setActiveView('communities');
    } else if (toolName.includes('Commitment') || toolName.includes('Royalties') || toolName.includes('Audit')) {
      setActiveView('commitments');
    } else if (toolName.includes('Consultation') || toolName.includes('Submission')) {
      setActiveView('consultations');
    } else if (toolName.includes('Workspace') || toolName.includes('Working Group')) {
      setActiveView('working-groups');
    } else {
      setActiveView('concessions');
    }
  };

  return (
    <section className="py-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-800/80 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Permanent Institutional Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Eight Permanent Development Directorates
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            GGCDC operates across permanent directorates—not static web pages. Each specialized sector arm 
            houses a complete operational workspace of data, tools, experts, and community feedback.
          </p>
        </div>

        {/* 8 Pillar Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {PILLARS_DATA.map((pillar) => {
            const Icon = iconMap[pillar.iconName] || Layers;
            const isSelected = selectedPillar.id === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar)}
                className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 text-left relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/30 dark:bg-gradient-to-br dark:from-emerald-950 dark:via-slate-800 dark:to-slate-900 dark:border-emerald-500'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 dark:bg-slate-800/70 dark:border-slate-700/80 dark:hover:bg-slate-800 dark:hover:border-slate-600'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none"></div>
                )}
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-emerald-700 dark:bg-slate-700 dark:text-emerald-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {pillar.id === 'mining' && (
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 px-2 py-0.5 rounded">
                        Putu Case
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {pillar.name}
                  </h3>
                  <div className="text-[11px] text-amber-700 dark:text-amber-400/90 font-medium mt-0.5 line-clamp-1">
                    {pillar.directorate}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {pillar.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium truncate">
                    {pillar.operationalTools.length} Operational Tools
                  </span>
                  <span className={`text-[11px] font-semibold flex items-center ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Pillar Deep Dive Operational Workspace */}
        <div className="bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-emerald-800/60 rounded-2xl p-6 sm:p-8 shadow-md dark:shadow-2xl backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
                <span>Active Directorate Workspace</span>
                <span>•</span>
                <span className="text-amber-700 dark:text-amber-400">{selectedPillar.directorate}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-3">
                <span>{selectedPillar.name}</span>
                {selectedPillar.id === 'mining' && (
                  <span className="text-xs font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full">
                    Flagship Implementation
                  </span>
                )}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
                {selectedPillar.shortDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  if (selectedPillar.id === 'mining') {
                    setSelectedProjectId('proj-putu-iron');
                    setActiveView('concessions');
                  } else {
                    setActiveView('concessions');
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center space-x-1.5 shadow"
              >
                <span>Open Project Registry</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveView('working-groups')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white dark:border-transparent text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center space-x-1.5 transition-colors"
              >
                <span>Working Group Workspace</span>
              </button>
            </div>
          </div>

          {/* Operational Toolset Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            
            {/* Column 1: Operational Tools */}
            <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Dedicated Operational Toolset</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Specialized working modules for systematic governance rather than cosmetic overviews.
              </p>
              <ul className="space-y-2">
                {selectedPillar.operationalTools.map((tool, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handlePillarAction(tool)}
                      className="w-full text-left flex items-start space-x-2.5 text-xs text-slate-700 hover:text-emerald-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:text-emerald-300 dark:hover:bg-slate-800 p-2 rounded transition-colors group"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{tool}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Key Active Initiatives */}
            <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 shadow-sm">
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Key Active Initiatives</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Current priority cases actively supervised by GGCDC specialized working groups.
              </p>
              <div className="space-y-3">
                {selectedPillar.keyInitiatives.map((init, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-3 rounded-lg">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">{init}</div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="text-emerald-700 dark:text-emerald-400 font-mono">Status: Active Supervision</span>
                      <button 
                        onClick={() => setActiveView('commitments')}
                        className="text-amber-600 dark:text-amber-400 hover:underline font-bold"
                      >
                        Track
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Sector Statistics & Institutional Reach */}
            <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Directorate Baseline</span>
                </h4>
                <div className="bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-3.5 rounded-lg mb-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Coverage & Scale:</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">{selectedPillar.stats}</div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Every project within this directorate generates linked records: Company → Project → Agreements → Commitments → Affected Communities → Working Group oversight.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80">
                <button
                  onClick={() => setActiveView('consultations')}
                  className="w-full text-center bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-slate-800 dark:hover:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-700/60 text-xs font-bold py-2.5 rounded-lg transition-colors"
                >
                  Submit Directorate Feedback or Grievance
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
