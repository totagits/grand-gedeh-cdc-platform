import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Heart, 
  Layers, 
  ExternalLink,
  Award,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../utils/context';
import logoImg from '../assets/logo.jpg';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-emerald-900/60 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand & Motto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('home')}>
              <img 
                src={logoImg} 
                alt="Grand Gedeh Citizens Development Council Official Crest" 
                className="w-14 h-14 rounded-full border-2 border-amber-400 shadow-md object-cover"
              />
              <div>
                <span className="text-white font-extrabold text-base tracking-tight block">
                  Grand Gedeh Citizens Development Council
                </span>
                <span className="text-amber-400 text-xs font-medium tracking-wide">
                  One County • One Voice • Shared Development
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The permanent county-development institution operating the Grand Gedeh Development Intelligence, 
              Participation & Accountability Platform. Ensuring informed participation, verified local content, 
              and accountable natural resource governance.
            </p>

            <div className="text-xs text-slate-400 space-y-1 pt-1">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>County Secretariat, Commercial Avenue, Zwedru City, Liberia</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>secretariat@ggcdc.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Platforms */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Digital Platforms</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveView('gismap')} className="hover:text-emerald-400 transition-colors">
                  Interactive GIS Development Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('concessions')} className="hover:text-emerald-400 transition-colors">
                  Investment & Concession Registry
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('commitments')} className="hover:text-emerald-400 transition-colors">
                  Commitments & Benefits Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('businesses')} className="hover:text-emerald-400 transition-colors">
                  Verified Local Business Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('workforce')} className="hover:text-emerald-400 transition-colors">
                  Skills Registry & Gap Modeler
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('verification')} className="text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1.5 transition-colors">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Secretariat Verification Desk</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Citizen Action */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Civic Engagement</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveView('consultations')} className="hover:text-emerald-400 transition-colors">
                  Citizen Consultation Center
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('communities')} className="hover:text-emerald-400 transition-colors">
                  Customary Communities Registry
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('experts')} className="hover:text-emerald-400 transition-colors">
                  Technical Experts Network
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('opportunities')} className="hover:text-emerald-400 transition-colors">
                  Opportunities & Tenders Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('documents')} className="hover:text-emerald-400 transition-colors">
                  Central Document Repository
                </button>
              </li>
            </ul>
          </div>

          {/* Directorates */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Specialized Directorates</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveView('working-groups')} className="hover:text-amber-400 transition-colors text-amber-300 font-semibold">
                  Putu Mining Working Group
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('working-groups')} className="hover:text-emerald-400 transition-colors">
                  Forestry & Environment
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('working-groups')} className="hover:text-emerald-400 transition-colors">
                  Agriculture & Food Security
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('working-groups')} className="hover:text-emerald-400 transition-colors">
                  Infrastructure & Connectivity
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('governance')} className="hover:text-emerald-400 transition-colors">
                  Institutional Charter & Secretariat
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Grand Gedeh Citizens Development Council (GGCDC). All Rights Reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer" onClick={() => setActiveView('governance')}>Institutional Charter</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer" onClick={() => setActiveView('documents')}>Public Disclosures</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Grand Gedeh County, Republic of Liberia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
