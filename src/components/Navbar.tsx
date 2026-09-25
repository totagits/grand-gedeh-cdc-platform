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
  Award
} from 'lucide-react';
import { useApp } from '../utils/context';

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
    { id: 'communities', label: 'Communities', icon: Layers },
    { id: 'consultations', label: 'Citizen Participation', icon: HelpCircle },
    { id: 'experts', label: 'Experts Network', icon: Award },
    { id: 'working-groups', label: 'Working Groups', icon: Users },
    { id: 'opportunities', label: 'Opportunities', icon: Sparkles },
    { id: 'documents', label: 'Document Archive', icon: FileText },
  ];

  const roleLabels: Record<string, { label: string; badge: string }> = {
    citizen: { label: 'Public Citizen / Diaspora', badge: 'bg-emerald-800 text-emerald-100' },
    investor: { label: 'Concessionaire / Investor', badge: 'bg-blue-800 text-blue-100' },
    expert: { label: 'Technical Advisory Expert', badge: 'bg-amber-800 text-amber-100' },
    secretariat: { label: 'GGCDC Secretariat Admin', badge: 'bg-red-800 text-red-100' },
    community_rep: { label: 'Community Traditional Rep', badge: 'bg-purple-800 text-purple-100' },
  };

  const handleNav = (id: string) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-emerald-800/60 shadow-xl backdrop-blur-md bg-opacity-95">
      {/* Top Administrative Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-slate-200 text-xs py-1.5 px-4 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wider text-emerald-300 uppercase">Official Civic Development Platform</span>
            <span className="text-slate-500">|</span>
            <span className="hidden sm:inline italic text-slate-300">Republic of Liberia • Grand Gedeh County</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-slate-800/80 rounded px-2.5 py-0.5 border border-slate-700">
              <span className="text-[11px] text-slate-400">Viewing as:</span>
              <span className={`text-[11px] font-medium px-1.5 py-0.2 rounded ${roleLabels[currentRole]?.badge}`}>
                {roleLabels[currentRole]?.label}
              </span>
              <button 
                onClick={onOpenRoleModal}
                className="text-[11px] underline text-emerald-400 hover:text-emerald-300 ml-1 font-semibold transition-colors"
                title="Switch role to preview specific permissions and tools"
              >
                Switch
              </button>
            </div>

            <button 
              onClick={() => handleNav('working-groups')}
              className="text-[11px] bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-2 py-0.5 rounded transition-colors flex items-center space-x-1"
            >
              <span>Institutional Workspace</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Council Identity */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center space-x-3.5 cursor-pointer group"
          >
            <div className="relative">
              <img 
                src="/logo.jpg" 
                alt="Grand Gedeh Citizens Development Council Official Crest" 
                className="h-14 w-14 rounded-full border-2 border-amber-400/80 object-cover shadow-lg group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 font-black text-[9px] px-1 rounded-full shadow">
                GG
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight group-hover:text-emerald-300 transition-colors">
                  Grand Gedeh Citizens Development Council
                </span>
                <span className="hidden md:inline-block bg-emerald-900/80 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded border border-emerald-700">
                  GGCDC
                </span>
              </div>
              <p className="text-amber-400 text-xs font-medium tracking-wide flex items-center space-x-1.5">
                <span>One County</span>
                <span className="text-emerald-500">•</span>
                <span>One Voice</span>
                <span className="text-emerald-500">•</span>
                <span>Shared Development</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Quick Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-inner font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Dropdown / More Actions */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800">
                <span>More Portals</span>
                <svg className="w-3 h-3 ml-0.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl py-2 hidden group-hover:block z-50">
                {navItems.slice(7).map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full text-left flex items-center space-x-2.5 px-4 py-2.5 text-xs transition-colors ${
                        isActive ? 'bg-emerald-900 text-emerald-200 font-semibold' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
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

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-md text-xs font-medium w-full text-left ${
                    isActive
                      ? 'bg-emerald-800 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400">Current Role: {roleLabels[currentRole]?.label}</span>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRoleModal();
              }}
              className="text-xs text-emerald-400 font-semibold underline"
            >
              Change Persona
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
