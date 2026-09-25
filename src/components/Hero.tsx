import React from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  FileCheck2, 
  ArrowRight,
  TrendingUp,
  Landmark
} from 'lucide-react';
import { useApp } from '../utils/context';

export const Hero: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 text-white border-b border-emerald-900/60">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        
        {/* Top Institutional Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-emerald-900/40">
          <div className="inline-flex items-center space-x-2.5 bg-emerald-900/50 border border-emerald-700/60 rounded-full px-4 py-1.5 shadow-inner">
            <Landmark className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              Permanent County-Development Institution
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <span className="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-mono font-medium border border-amber-500/30">
              Flagship Case 01: Putu Mining Concession
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Grand Gedeh County, Liberia</span>
          </div>
        </div>

        {/* Main Hero Header & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 pb-4">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Grand Gedeh Citizens <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-amber-300">
                  Development Council
                </span>
              </h1>
              <p className="text-amber-400 font-display text-lg sm:text-xl font-medium tracking-wide">
                One County • One Voice • Shared Development
              </p>
            </div>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-3xl">
              Operating the <strong>Grand Gedeh Development Intelligence, Participation & Accountability Platform</strong>: 
              a unified digital system where citizens, customary communities, professionals, local businesses, 
              diaspora leaders, investors, and public authorities track commitments, evaluate natural resources, and organize around shared prosperity.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveView('gismap')}
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-5 py-3 rounded-lg shadow-lg hover:shadow-emerald-600/30 transition-all"
              >
                <MapPin className="w-4 h-4 text-emerald-200" />
                <span>County GIS Map</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setActiveView('concessions')}
                className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm px-5 py-3 rounded-lg shadow transition-all"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Investment & Concession Registry</span>
              </button>

              <button
                onClick={() => setActiveView('commitments')}
                className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-emerald-200 border border-emerald-900 font-semibold text-sm px-5 py-3 rounded-lg shadow transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Commitments Tracker</span>
              </button>

              <button
                onClick={() => setActiveView('consultations')}
                className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-sm px-5 py-3 rounded-lg shadow transition-all"
              >
                <Users className="w-4 h-4 text-slate-950" />
                <span>Citizen Submissions</span>
              </button>
            </div>
          </div>

          {/* Official Emblem & Institutional Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative p-3 bg-gradient-to-b from-amber-500/20 via-emerald-800/30 to-slate-900/80 rounded-2xl border border-amber-400/40 shadow-2xl backdrop-blur-md max-w-sm w-full text-center">
              <div className="relative mx-auto w-36 h-36 mb-3">
                <img 
                  src="/logo.jpg" 
                  alt="Official Crest of Grand Gedeh Citizens Development Council" 
                  className="w-full h-full rounded-full object-cover border-4 border-amber-400 shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
              </div>

              <h2 className="text-white font-bold text-base leading-snug">
                Grand Gedeh Citizens Development Council
              </h2>
              <div className="inline-block my-1 text-[11px] font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/40">
                Institutional Authority
              </div>
              <p className="text-xs text-slate-300 mt-1 px-2 leading-relaxed">
                Permanent civic governance structure spanning Mining, Forestry, Agriculture, Infrastructure, and Citizen Empowerment.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-around text-xs text-slate-300">
                <div>
                  <span className="block font-bold text-white">8 Directorates</span>
                  <span className="text-[10px] text-slate-400">Permanent Arms</span>
                </div>
                <div className="h-6 w-px bg-slate-700"></div>
                <div>
                  <span className="block font-bold text-emerald-400">Putu Group</span>
                  <span className="text-[10px] text-slate-400">Specialized Unit</span>
                </div>
                <div className="h-6 w-px bg-slate-700"></div>
                <div>
                  <span className="block font-bold text-amber-400">Zwedru HQ</span>
                  <span className="text-[10px] text-slate-400">Secretariat</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Live Metrics Ticker across Grand Gedeh */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-emerald-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Concession Cap</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-black text-white">$2.4 Billion</div>
            <div className="text-[11px] text-emerald-400 font-medium mt-0.5">Pipeline Monitored</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-emerald-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Pillars</span>
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg font-black text-white">8 Directorates</div>
            <div className="text-[11px] text-amber-300 font-medium mt-0.5">Permanent Arms</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-emerald-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Communities</span>
              <Users className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-lg font-black text-white">46 Towns</div>
            <div className="text-[11px] text-blue-300 font-medium mt-0.5">Customary Profiles</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-emerald-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Local Suppliers</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-black text-white">184 Verified</div>
            <div className="text-[11px] text-emerald-300 font-medium mt-0.5">13 Industrial Sectors</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-emerald-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Workforce Skills</span>
              <Users className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-lg font-black text-white">2,450 Registered</div>
            <div className="text-[11px] text-purple-300 font-medium mt-0.5">Countywide & Diaspora</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 hover:border-emerald-700/60 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Commitments</span>
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-black text-white">68 Tracked</div>
            <div className="text-[11px] text-emerald-300 font-medium mt-0.5">Audited & Verified</div>
          </div>

        </div>

      </div>
    </div>
  );
};
