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
  const { setActiveView } = useApp();

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 pb-4">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Grand Gedeh Citizens <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-700 dark:from-emerald-300 dark:via-amber-200 dark:to-amber-400">
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
            </div>
          </div>

          {/* Right Column: Interactive Photo Carousel */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <PhotoCarousel />
          </div>

        </div>

        {/* Live Metrics Ticker */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm hover:border-emerald-600 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
              <span>Concession Cap</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white">$2.4 Billion</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">Pipeline Monitored</div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm hover:border-emerald-600 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
              <span>Directorates</span>
              <Building2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white">8 Directorates</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300 font-medium mt-0.5">Permanent Arms</div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm hover:border-emerald-600 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
              <span>Communities</span>
              <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white">46 Towns</div>
            <div className="text-[11px] text-blue-700 dark:text-blue-300 font-medium mt-0.5">Customary Profiles</div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm hover:border-emerald-600 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
              <span>Local Suppliers</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white">184 Verified</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium mt-0.5">13 Industrial Sectors</div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm hover:border-emerald-600 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
              <span>Workforce Skills</span>
              <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white">2,450 Registered</div>
            <div className="text-[11px] text-purple-700 dark:text-purple-300 font-medium mt-0.5">Countywide & Diaspora</div>
          </div>

          <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm hover:border-emerald-600 transition-colors">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
              <span>Commitments</span>
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white">68 Tracked</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium mt-0.5">Audited & Verified</div>
          </div>

        </div>

      </div>
    </div>
  );
};
