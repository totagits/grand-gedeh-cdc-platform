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
  Landmark,
  Award,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { useApp } from '../utils/context';
import { PhotoCarousel } from './PhotoCarousel';

export const Hero: React.FC = () => {
  const { setActiveView, setIsConcessionModalOpen } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white dark:from-slate-950 dark:via-emerald-950/80 dark:to-slate-950 text-slate-800 dark:text-white border-b border-slate-200 dark:border-amber-500/30 transition-colors">
      {/* Decorative Heraldic Background Elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-15 bg-[radial-gradient(#15803d_1px,transparent_1px)] dark:bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-emerald-900/60">
          <div className="inline-flex items-center space-x-2.5 bg-emerald-100/90 dark:bg-gradient-to-r dark:from-emerald-950 dark:to-slate-900 border border-emerald-300 dark:border-amber-500/40 rounded-full px-4 py-1.5 shadow-sm">
            <Landmark className="w-4 h-4 text-emerald-800 dark:text-amber-400" />
            <span className="text-xs font-bold text-emerald-900 dark:text-amber-300 uppercase tracking-widest">
              Advocator for Grand Gedeans • Permanent County Institution
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300">
            <span className="bg-emerald-50 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full font-mono font-semibold border border-emerald-200 dark:border-emerald-700/60">
              Authoritative Databases: Workers • Professionals • Businesses
            </span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className="text-amber-700 dark:text-amber-400 font-semibold">Grand Gedeh County, Liberia</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-stretch items-center pt-8 pb-4">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                <span className="inline-block sm:whitespace-nowrap">Grand Gedeh Citizens</span>{' '}
                <br className="hidden sm:inline" />
                <span className="inline-block sm:whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-700 dark:from-emerald-300 dark:via-amber-200 dark:to-amber-400">
                  Development Council
                </span>
              </h1>
              <p className="text-amber-700 dark:text-amber-400 font-display text-lg sm:text-2xl font-bold tracking-wide">
                One County • One Voice • Shared Development
              </p>
            </div>

            <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed max-w-3xl">
              <strong>GGCDC is the premier advocate for Grand Gedeans</strong>, building the authoritative countywide and diaspora 
              databases of certified workers, engineers, artisans, and registered local businesses. 
              We operate the Grand Gedeh Development Intelligence, Participation & Accountability Platform to guarantee 
              priority local employment, fair concession procurement quotas, and accountable wealth creation across the county.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveView('workforce')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all hover:scale-105"
              >
                <Users className="w-4 h-4 text-slate-950" />
                <span>Register as Worker / Talent</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setActiveView('businesses')}
                className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-emerald-600/30 transition-all hover:scale-105"
              >
                <Briefcase className="w-4 h-4 text-emerald-200" />
                <span>Register Local Enterprise</span>
              </button>

              <button
                onClick={() => setActiveView('gismap')}
                className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-700 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>County GIS Map</span>
              </button>

              <button
                onClick={() => setActiveView('concessions')}
                className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-slate-800 border border-amber-500/50 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-amber-300 dark:border-amber-900/60 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-sm transition-all"
              >
                <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Putu Concession Case Study</span>
              </button>

              <button
                type="button"
                onClick={() => setIsConcessionModalOpen(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 border-2 border-amber-300 ring-2 ring-amber-400/30"
              >
                <Building2 className="w-4 h-4 text-slate-950" />
                <span>+ Ingest New Concession / Treaty</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Photo Carousel */}
          <div className="lg:col-span-5 flex flex-col justify-start h-full">
            <PhotoCarousel className="h-full" />
          </div>

        </div>

        {/* Live Metrics Ticker */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 hover:border-emerald-500/50 dark:hover:border-amber-500/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1.5">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400">Pipeline</span>
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono tracking-tight">$2.4B</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">Concessions Monitored</div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 hover:border-amber-500/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1.5">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400">Governance</span>
              <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono tracking-tight">8 Directorates</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300 font-medium mt-1">Permanent State Arms</div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1.5">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400">Customary</span>
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono tracking-tight">46 Towns</div>
            <div className="text-[11px] text-blue-700 dark:text-blue-300 font-medium mt-1">FPIC & Clan Profiles</div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 hover:border-emerald-500/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1.5">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400">Suppliers</span>
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono tracking-tight">184 Verified</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium mt-1">13 Industrial Sectors</div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 hover:border-purple-500/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1.5">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400">Human Capital</span>
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono tracking-tight">2,450 Talent</div>
            <div className="text-[11px] text-purple-700 dark:text-purple-300 font-medium mt-1">Countywide & Diaspora</div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 hover:border-emerald-500/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1.5">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400">Compliance</span>
              <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white font-mono tracking-tight">68 Tracked</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium mt-1">Audited Obligations</div>
          </div>

        </div>

      </div>
    </div>
  );
};
