import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  FileText, 
  HelpCircle, 
  Menu, 
  X, 
  Compass, 
  Sparkles,
  Layers,
  Award,
  Lock,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../utils/context';
import logoImg from '../assets/logo.jpg';

interface NavbarProps {
  onOpenRoleModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRoleModal }) => {
  const { activeView, setActiveView, currentRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home & Pillars', icon: Compass },
    { id: 'gismap', label: 'County GIS Map', icon: MapPin },
    { id: 'concessions', label: 'Concessions & Putu', icon: Building2 },
    { id: 'commitments', label: 'Commitments Tracker', icon: ShieldCheck },
    { id: 'businesses', label: 'Business Registry', icon: Briefcase },
    { id: 'workforce', label: 'Workforce & Skills', icon: Users },
    { id: 'verification', label: 'Secretariat Verification', icon: ShieldCheck, highlight: true },
    { id: 'communities', label: 'Communities', icon: Layers },
    { id: 'consultations', label: 'Citizen Participation', icon: HelpCircle },
    { id: 'experts', label: 'Experts Network', icon: Award },
    { id: 'working-groups', label: 'Working Groups', icon: Users },
    { id: 'opportunities', label: 'Opportunities', icon: Sparkles },
    { id: 'documents', label: 'Document Archive', icon: FileText },
  ];

  const roleLabels: Record<string, { label: string; badge: string }> = {
    citizen: { label: 'Public Citizen / Diaspora', badge: 'bg-emerald-900 text-emerald-200 border-emerald-700' },
    investor: { label: 'Concessionaire / Investor', badge: 'bg-blue-900 text-blue-200 border-blue-700' },
    expert: { label: 'Technical Advisory Expert', badge: 'bg-amber-900 text-amber-200 border-amber-700' },
    secretariat: { label: 'GGCDC Secretariat Admin', badge: 'bg-red-900 text-red-200 border-red-700' },
    community_rep: { label: 'Community Traditional Rep', badge: 'bg-purple-900 text-purple-200 border-purple-700' },
  };

  const handleNav = (id: string) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-amber-500/40 shadow-2xl backdrop-blur-md">
      
      {/* Sovereignty Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-slate-200 text-xs py-1.5 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-emerald-400"></span>
            <span className="font-bold tracking-wider text-amber-400 uppercase text-[11px]">
              Grand Gedeh Citizens Development Council
            </span>
            <span className="text-slate-600">|</span>
            <span className="hidden md:inline italic text-slate-300 text-[11px]">
              Republic of Liberia • Permanent County Development Institution
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-slate-900 rounded-lg px-2.5 py-0.5 border border-slate-700">
              <span className="text-[10px] text-slate-400">Role:</span>
              <span className={`text-[10px] font-bold px-2 py-0.2 rounded border ${roleLabels[currentRole]?.badge}`}>
                {roleLabels[currentRole]?.label}
              </span>
              <button 
                onClick={onOpenRoleModal}
                className="text-[10px] underline text-amber-400 hover:text-amber-300 ml-1 font-bold"
              >
                Change
              </button>
            </div>

            <button 
              onClick={() => handleNav('verification')}
              className="text-[11px] bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-2.5 py-1 rounded shadow-md transition-all flex items-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secretariat Audit Desk</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Council Identity with Imported Asset */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center space-x-3.5 cursor-pointer group"
          >
            <div className="relative">
              <img 
                src={logoImg} 
                alt="Grand Gedeh Citizens Development Council Emblem" 
                className="h-14 w-14 rounded-full border-2 border-amber-400 shadow-xl object-cover group-hover:scale-105 transition-transform ring-2 ring-emerald-500/40"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded-full shadow">
                GG
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-black text-lg sm:text-xl tracking-tight leading-tight group-hover:text-emerald-300 transition-colors">
                  Grand Gedeh Citizens Development Council
                </span>
                <span className="hidden md:inline-block bg-emerald-900/90 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded border border-emerald-700">
                  GGCDC
                </span>
              </div>
              <p className="text-amber-400 text-xs font-semibold tracking-wide flex items-center space-x-1.5 mt-0.5">
                <span>One County</span>
                <span className="text-emerald-500">•</span>
                <span>One Voice</span>
                <span className="text-emerald-500">•</span>
                <span>Shared Development</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white font-bold shadow-inner ring-1 ring-emerald-500'
                      : item.highlight
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800/80 hover:bg-amber-900/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.highlight ? 'text-amber-400' : 'text-emerald-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More Menu Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800">
                <span>More Directorates</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-60 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 hidden group-hover:block z-50">
                {navItems.slice(7).map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full text-left flex items-center space-x-2.5 px-4 py-2.5 text-xs transition-colors ${
                        isActive ? 'bg-emerald-900 text-emerald-200 font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-emerald-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-medium w-full text-left ${
                    isActive
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Current Role: {roleLabels[currentRole]?.label}</span>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRoleModal();
              }}
              className="text-amber-400 font-bold underline"
            >
              Switch Role
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
