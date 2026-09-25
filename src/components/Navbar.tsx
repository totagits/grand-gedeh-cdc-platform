import React, { useState, useRef, useEffect } from 'react';
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
  ChevronDown,
  FileCheck2,
  Phone,
  Scale,
  PanelLeftClose,
  PanelLeft,
  UserCheck
} from 'lucide-react';
import { useApp } from '../utils/context';
import logoImg from '../assets/logo.jpg';

export const Navbar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    currentUser, 
    isSignedIn, 
    setIsSignInModalOpen, 
    setIsContactModalOpen,
    isSidebarOpen,
    toggleSidebar,
    businesses,
    workforce
  } = useApp();

  const [platformsDropdownOpen, setPlatformsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPlatformsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pendingCount = 
    businesses.filter(b => b.verificationStatus === 'Pending Secretarial Audit').length +
    workforce.filter(w => w.verificationStatus === 'Pending Secretarial Audit').length;

  const handleNav = (id: string) => {
    setActiveView(id);
    setPlatformsDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 border-b border-amber-500/40 shadow-2xl backdrop-blur-md">
      
      {/* Top Sovereignty Header Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-slate-300 text-xs py-1 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-emerald-400"></span>
            <span className="font-bold tracking-wider text-amber-400 uppercase text-[11px]">
              Grand Gedeh Citizens Development Council
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline italic text-slate-400 text-[11px]">
              Republic of Liberia • Permanent County Development Institution
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {isSignedIn && currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-400 hidden md:inline">Logged in as:</span>
                <span className="text-[11px] font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-amber-500/40">
                  {currentUser.name} ({currentUser.badgeLabel || currentUser.role})
                </span>
                <button
                  onClick={() => setIsSignInModalOpen(true)}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 underline font-medium"
                >
                  Switch Role
                </button>
              </div>
            ) : (
              <span className="text-[11px] text-slate-400">
                Official Public Portal
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Brand Identity with ENLARGED Logo */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center space-x-3.5 cursor-pointer group py-2"
          >
            {/* Enlarged Crest */}
            <div className="relative shrink-0">
              <img 
                src={logoImg} 
                alt="Grand Gedeh Citizens Development Council Official Crest" 
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-amber-400 shadow-2xl object-cover group-hover:scale-105 transition-transform ring-4 ring-emerald-900/60"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow border border-amber-300">
                GG
              </span>
            </div>

            {/* Typography */}
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-black text-lg sm:text-xl md:text-2xl tracking-tight leading-tight group-hover:text-emerald-300 transition-colors">
                  Grand Gedeh Citizens Development Council
                </span>
                <span className="hidden lg:inline-block bg-emerald-950 text-emerald-300 text-xs font-black px-2 py-0.5 rounded border border-emerald-700/80">
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

          {/* Clean Desktop Navigation: Home, About Us, Platforms & Portals (dropdown), Contact */}
          <nav className="hidden lg:flex items-center space-x-2">
            
            {/* 1. Home */}
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeView === 'home'
                  ? 'bg-emerald-800 text-white shadow-inner ring-1 ring-emerald-500'
                  : 'text-slate-200 hover:text-white hover:bg-slate-900'
              }`}
            >
              Home
            </button>

            {/* 2. About Us */}
            <button
              onClick={() => handleNav('governance')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeView === 'governance'
                  ? 'bg-emerald-800 text-white shadow-inner ring-1 ring-emerald-500'
                  : 'text-slate-200 hover:text-white hover:bg-slate-900'
              }`}
            >
              About Us
            </button>

            {/* 3. Master Dropdown: Platforms & Portals */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setPlatformsDropdownOpen(!platformsDropdownOpen)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  platformsDropdownOpen || ['gismap', 'concessions', 'commitments', 'businesses', 'workforce', 'verification', 'communities', 'consultations', 'experts', 'working-groups', 'opportunities', 'documents'].includes(activeView)
                    ? 'bg-slate-800 text-amber-400 border border-amber-500/50 shadow'
                    : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>Platforms & Portals</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${platformsDropdownOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
              </button>

              {/* Master Dropdown Megamenu */}
              {platformsDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-[540px] bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Spatial & Resources Column */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 px-2 py-1 bg-amber-950/40 rounded border border-amber-800/40">
                        Spatial & Resources
                      </div>
                      
                      <button
                        onClick={() => handleNav('gismap')}
                        className={`w-full text-left flex items-start space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                          activeView === 'gismap' ? 'bg-emerald-900 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-xs text-white">Interactive GIS Development Map</div>
                          <div className="text-[10px] text-slate-400">Putu mountain, corridor 3, clinics, CLSG grid</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNav('concessions')}
                        className={`w-full text-left flex items-start space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                          activeView === 'concessions' ? 'bg-emerald-900 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Building2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-xs text-white">Concessions & Extractives Registry</div>
                          <div className="text-[10px] text-slate-400">Putu Iron Ore case study, forestry & rubber</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNav('commitments')}
                        className={`w-full text-left flex items-start space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                          activeView === 'commitments' ? 'bg-emerald-900 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-xs text-white">Commitments & Benefits Tracker</div>
                          <div className="text-[10px] text-slate-400">68 tracked obligations, escrow & social funds</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNav('working-groups')}
                        className={`w-full text-left flex items-start space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                          activeView === 'working-groups' ? 'bg-emerald-900 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Users className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-xs text-white">Specialized Working Groups</div>
                          <div className="text-[10px] text-slate-400">Putu mining, forestry, agriculture directorates</div>
                        </div>
                      </button>
                    </div>

                    {/* Local Content & Governance Column */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400 px-2 py-1 bg-emerald-950/40 rounded border border-emerald-800/40">
                        Local Content & Civic Governance
                      </div>

                      <button
                        onClick={() => handleNav('businesses')}
                        className={`w-full text-left flex items-start space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                          activeView === 'businesses' ? 'bg-emerald-900 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Briefcase className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-xs text-white">Verified Business Directory</div>
                          <div className="text-[10px] text-slate-400">LBR and tax verified local contractors</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNav('workforce')}
                        className={`w-full text-left flex items-start space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                          activeView === 'workforce' ? 'bg-emerald-900 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Users className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-xs text-white">Skills Registry & Gap Modeler</div>
                          <div className="text-[10px] text-slate-400">TVET certified artisans & diaspora talent</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNav('verification')}
                        className={`w-full text-left flex items-start space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                          activeView === 'verification' ? 'bg-emerald-900 text-white font-bold' : 'text-amber-300 hover:bg-amber-950/40'
                        }`}
                      >
                        <FileCheck2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-amber-300">Secretariat Verification Desk</span>
                            {pendingCount > 0 && (
                              <span className="bg-red-600 text-white font-black text-[9px] px-1.5 rounded-full">
                                {pendingCount}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400">Credential check & accreditation issuance</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNav('opportunities')}
                        className={`w-full text-left flex items-start space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                          activeView === 'opportunities' ? 'bg-emerald-900 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-xs text-white">Opportunities & Tenders Hub</div>
                          <div className="text-[10px] text-slate-400">Concession procurement and jobs</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNav('communities')}
                        className={`w-full text-left flex items-start space-x-2.5 p-2 rounded-xl text-xs transition-colors ${
                          activeView === 'communities' ? 'bg-emerald-900 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Layers className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-xs text-white">Customary Communities</div>
                          <div className="text-[10px] text-slate-400">Clan boundaries & customary rights</div>
                        </div>
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* 4. Contact */}
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-900 transition-colors"
            >
              Contact
            </button>

          </nav>

          {/* Right Header Actions: Sign In / RBAC Sidebar Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            {isSignedIn && currentUser ? (
              <div className="flex items-center space-x-2">
                {/* Sidebar Toggle Button */}
                <button
                  onClick={toggleSidebar}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                    isSidebarOpen 
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                      : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/50'
                  }`}
                  title={isSidebarOpen ? 'Close Role Sidebar' : 'Open Role Sidebar'}
                >
                  {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
                  <span>{isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-1.5 transition-transform hover:scale-105"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Portal Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            {isSignedIn && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-amber-400 bg-slate-900 border border-slate-700"
                title="Toggle Sidebar"
              >
                <PanelLeft className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => handleNav('home')}
              className="p-2 rounded-lg bg-slate-900 text-left text-xs font-bold text-white hover:bg-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('governance')}
              className="p-2 rounded-lg bg-slate-900 text-left text-xs font-bold text-white hover:bg-slate-800"
            >
              About Us
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsContactModalOpen(true);
              }}
              className="p-2 rounded-lg bg-slate-900 text-left text-xs font-bold text-white hover:bg-slate-800"
            >
              Contact Us
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSignInModalOpen(true);
              }}
              className="p-2 rounded-lg bg-amber-500 text-slate-950 text-left text-xs font-black shadow"
            >
              {isSignedIn ? 'Switch RBAC Role' : 'Sign In'}
            </button>
          </div>

          <div className="text-[11px] font-black uppercase text-amber-400 pt-1">
            Platforms & Portals
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
            <button onClick={() => handleNav('gismap')} className="p-2 rounded hover:bg-slate-900 text-left text-slate-300">
              Interactive GIS Map
            </button>
            <button onClick={() => handleNav('concessions')} className="p-2 rounded hover:bg-slate-900 text-left text-slate-300">
              Concessions & Putu
            </button>
            <button onClick={() => handleNav('commitments')} className="p-2 rounded hover:bg-slate-900 text-left text-slate-300">
              Commitments Tracker
            </button>
            <button onClick={() => handleNav('businesses')} className="p-2 rounded hover:bg-slate-900 text-left text-slate-300">
              Verified Business Directory
            </button>
            <button onClick={() => handleNav('workforce')} className="p-2 rounded hover:bg-slate-900 text-left text-slate-300">
              Workforce & Skills Registry
            </button>
            <button onClick={() => handleNav('verification')} className="p-2 rounded hover:bg-slate-900 text-left text-amber-300 font-semibold">
              Secretariat Verification Desk
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
