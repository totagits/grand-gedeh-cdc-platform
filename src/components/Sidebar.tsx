import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  FileText, 
  HelpCircle, 
  Compass, 
  Sparkles, 
  Layers, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  UserCheck, 
  FileCheck2,
  Scale
} from 'lucide-react';
import { useApp } from '../utils/context';
import { UserRole } from '../types';

export const Sidebar: React.FC = () => {
  const { 
    currentUser, 
    isSignedIn, 
    logout, 
    activeView, 
    setActiveView, 
    isSidebarOpen, 
    setIsSignInModalOpen,
    businesses,
    workforce
  } = useApp();

  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isSignedIn || !currentUser || !isSidebarOpen) {
    return null;
  }

  // Count pending items for badges
  const pendingBusinesses = businesses.filter(b => b.verificationStatus === 'Pending Secretarial Audit').length;
  const pendingWorkforce = workforce.filter(w => w.verificationStatus === 'Pending Secretarial Audit').length;
  const totalPendingSecretariat = pendingBusinesses + pendingWorkforce;

  // Role Badge Styling
  const roleThemes: Record<UserRole, { border: string; bg: string; text: string; badge: string; pill: string }> = {
    secretariat: {
      border: 'border-red-600/60',
      bg: 'bg-red-950/40',
      text: 'text-red-400',
      badge: 'bg-red-900/80 text-red-200 border border-red-700',
      pill: 'bg-red-600 text-white'
    },
    business: {
      border: 'border-blue-600/60',
      bg: 'bg-blue-950/40',
      text: 'text-blue-400',
      badge: 'bg-blue-900/80 text-blue-200 border border-blue-700',
      pill: 'bg-blue-600 text-white'
    },
    worker: {
      border: 'border-amber-600/60',
      bg: 'bg-amber-950/40',
      text: 'text-amber-400',
      badge: 'bg-amber-900/80 text-amber-200 border border-amber-700',
      pill: 'bg-amber-600 text-slate-950'
    },
    expert: {
      border: 'border-emerald-600/60',
      bg: 'bg-emerald-950/40',
      text: 'text-emerald-400',
      badge: 'bg-emerald-900/80 text-emerald-200 border border-emerald-700',
      pill: 'bg-emerald-600 text-white'
    },
    community_rep: {
      border: 'border-purple-600/60',
      bg: 'bg-purple-950/40',
      text: 'text-purple-400',
      badge: 'bg-purple-900/80 text-purple-200 border border-purple-700',
      pill: 'bg-purple-600 text-white'
    },
    investor: {
      border: 'border-cyan-600/60',
      bg: 'bg-cyan-950/40',
      text: 'text-cyan-400',
      badge: 'bg-cyan-900/80 text-cyan-200 border border-cyan-700',
      pill: 'bg-cyan-600 text-slate-950'
    },
    citizen: {
      border: 'border-teal-600/60',
      bg: 'bg-teal-950/40',
      text: 'text-teal-400',
      badge: 'bg-teal-900/80 text-teal-200 border border-teal-700',
      pill: 'bg-teal-600 text-white'
    }
  };

  const currentTheme = roleThemes[currentUser.role] || roleThemes.citizen;

  interface NavMenuItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }

  const getRoleMenus = (): { section: string; items: NavMenuItem[] }[] => {
    switch (currentUser.role) {
      case 'secretariat':
        return [
          {
            section: 'Secretariat Executive Desk',
            items: [
              { id: 'verification', label: 'Accreditation & Verification', icon: FileCheck2, badge: totalPendingSecretariat, badgeColor: 'bg-red-600 text-white' },
              { id: 'concessions', label: 'Concessions Oversight', icon: Building2 },
              { id: 'commitments', label: 'Commitments & Escrow Tracker', icon: ShieldCheck, badge: '68 Recs', badgeColor: 'bg-amber-600 text-slate-950' },
              { id: 'gismap', label: 'County GIS Cartography', icon: MapPin },
            ]
          },
          {
            section: 'Institutional Governance',
            items: [
              { id: 'communities', label: 'Customary Communities', icon: Layers },
              { id: 'consultations', label: 'Public Consultations Audit', icon: HelpCircle },
              { id: 'documents', label: 'Official Disclosures Archive', icon: FileText },
              { id: 'governance', label: 'Institutional Charter', icon: Scale },
            ]
          }
        ];

      case 'business':
        return [
          {
            section: 'Commercial Enterprise Hub',
            items: [
              { id: 'businesses', label: 'My Enterprise & Filings', icon: Briefcase, badge: 'LBR Active', badgeColor: 'bg-emerald-600 text-white' },
              { id: 'opportunities', label: 'Concession Tenders Hub', icon: Sparkles, badge: '12 Active', badgeColor: 'bg-amber-500 text-slate-950' },
              { id: 'workforce', label: 'Grand Gedeh Talent Pool', icon: Users },
              { id: 'gismap', label: 'Infrastructure & Spatial Map', icon: MapPin },
            ]
          },
          {
            section: 'Compliance & Standards',
            items: [
              { id: 'commitments', label: 'Local Content Quotas', icon: ShieldCheck },
              { id: 'verification', label: 'Accreditation Status', icon: FileCheck2 },
              { id: 'documents', label: 'Procurement Regulations', icon: FileText },
            ]
          }
        ];

      case 'worker':
        return [
          {
            section: 'Artisan & Professional Desk',
            items: [
              { id: 'workforce', label: 'My Skills & Credentials', icon: Users, badge: 'TVET Reg', badgeColor: 'bg-emerald-600 text-white' },
              { id: 'opportunities', label: 'Concession Job Postings', icon: Sparkles, badge: 'New', badgeColor: 'bg-amber-500 text-slate-950' },
              { id: 'experts', label: 'Technical Experts Guild', icon: Award },
            ]
          },
          {
            section: 'Civic Engagement',
            items: [
              { id: 'consultations', label: 'Citizen Consultation Forums', icon: HelpCircle },
              { id: 'commitments', label: 'Local Employment Tracking', icon: ShieldCheck },
              { id: 'gismap', label: 'County Worksite GIS Map', icon: MapPin },
            ]
          }
        ];

      case 'expert':
        return [
          {
            section: 'Technical Advisory Directorate',
            items: [
              { id: 'experts', label: 'Advisory Experts Network', icon: Award, badge: 'Active', badgeColor: 'bg-emerald-600 text-white' },
              { id: 'working-groups', label: 'Putu Technical Working Group', icon: Users, badge: 'Lead', badgeColor: 'bg-amber-500 text-slate-950' },
              { id: 'concessions', label: 'Technical Concession Reviews', icon: Building2 },
              { id: 'gismap', label: 'Geological & Ecological GIS', icon: MapPin },
            ]
          },
          {
            section: 'Knowledge Base',
            items: [
              { id: 'documents', label: 'Technical Baseline Reports', icon: FileText },
              { id: 'commitments', label: 'Environmental Compliance', icon: ShieldCheck },
            ]
          }
        ];

      case 'community_rep':
        return [
          {
            section: 'Customary Clan Assembly',
            items: [
              { id: 'communities', label: 'Customary Clan Registry', icon: Layers, badge: 'Putu Clan', badgeColor: 'bg-purple-600 text-white' },
              { id: 'commitments', label: 'Escrow & Social Fund Payments', icon: ShieldCheck, badge: '$1.4M', badgeColor: 'bg-emerald-600 text-white' },
              { id: 'consultations', label: 'Community Grievances & Forums', icon: HelpCircle, badge: 'Active', badgeColor: 'bg-amber-500 text-slate-950' },
              { id: 'gismap', label: 'Ancestral Boundaries Map', icon: MapPin },
            ]
          },
          {
            section: 'Oversight & Rights',
            items: [
              { id: 'concessions', label: 'Concession Agreements', icon: Building2 },
              { id: 'documents', label: 'Customary Land Deeds & Law', icon: FileText },
            ]
          }
        ];

      case 'investor':
        return [
          {
            section: 'Concessionaire Executive Portal',
            items: [
              { id: 'concessions', label: 'Concession Obligations & CDA', icon: Building2, badge: 'Putu Iron', badgeColor: 'bg-cyan-600 text-slate-950' },
              { id: 'commitments', label: 'CDA Milestone Fulfillment', icon: ShieldCheck, badge: '68 Tasks', badgeColor: 'bg-amber-500 text-slate-950' },
              { id: 'businesses', label: 'Verified Local Suppliers', icon: Briefcase },
              { id: 'workforce', label: 'Qualified Local Workforce', icon: Users },
            ]
          },
          {
            section: 'Regional Spatial & Law',
            items: [
              { id: 'gismap', label: 'Infrastructure & Port Corridor', icon: MapPin },
              { id: 'documents', label: 'Statutory Filings & Mining Law', icon: FileText },
            ]
          }
        ];

      case 'citizen':
      default:
        return [
          {
            section: 'Citizen Development Hub',
            items: [
              { id: 'home', label: 'County Overview & Pillars', icon: Compass },
              { id: 'gismap', label: 'Interactive GIS Map', icon: MapPin },
              { id: 'consultations', label: 'Citizen Consultation Forums', icon: HelpCircle },
              { id: 'commitments', label: 'Track Resource Royalties', icon: ShieldCheck },
            ]
          },
          {
            section: 'Public Transparency',
            items: [
              { id: 'concessions', label: 'Concessions & Extractives', icon: Building2 },
              { id: 'documents', label: 'Central Document Archive', icon: FileText },
              { id: 'governance', label: 'About GGCDC & Charter', icon: Scale },
            ]
          }
        ];
    }
  };

  const menuSections = getRoleMenus();

  return (
    <aside 
      className={`bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 relative z-30 shrink-0 select-none shadow-2xl ${
        isCollapsed ? 'w-16' : 'w-64 sm:w-72'
      }`}
      aria-label="Role-Based Workspace Sidebar"
    >
      {/* Top Header: User Profile Card */}
      <div className={`p-4 border-b border-slate-800 ${currentTheme.bg}`}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-amber-500/50 ${currentTheme.pill}`}>
                {currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="truncate">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-white truncate block">
                    {currentUser.name}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Active Verified Session" />
                </div>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full inline-block mt-0.5 ${currentTheme.badge}`}>
                  {currentUser.badgeLabel || currentUser.role.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-auto"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4 text-amber-400" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {!isCollapsed && (
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 truncate">
            <span className="block truncate font-medium text-slate-300">{currentUser.title}</span>
            <span className="block truncate text-[10px] text-slate-400 mt-0.5">{currentUser.organization}</span>
          </div>
        )}
      </div>

      {/* Role Navigation Items */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {menuSections.map((sec, idx) => (
          <div key={idx}>
            {!isCollapsed && (
              <h4 className="px-2.5 mb-1.5 text-[10px] font-black uppercase tracking-wider text-slate-300">
                {sec.section}
              </h4>
            )}
            <ul className="space-y-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveView(item.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center rounded-xl text-xs transition-all ${
                        isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2 space-x-2.5'
                      } ${
                        isActive
                          ? 'bg-emerald-900/90 text-white font-bold border border-emerald-500/80 shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-emerald-400'}`} />
                      
                      {!isCollapsed && (
                        <div className="flex-1 flex items-center justify-between overflow-hidden">
                          <span className="truncate">{item.label}</span>
                          {item.badge !== undefined && (
                            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ml-1 shrink-0 ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Actions: Switch Role & Logout */}
      <div className="p-2 border-t border-slate-800 bg-slate-950/80 space-y-1">
        <button
          onClick={() => setIsSignInModalOpen(true)}
          className={`w-full flex items-center text-xs text-amber-400 hover:text-amber-300 hover:bg-slate-900 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center p-2' : 'px-3 py-2 space-x-2'
          }`}
          title="Switch RBAC Persona"
        >
          <UserCheck className="w-4 h-4 shrink-0 text-amber-400" />
          {!isCollapsed && <span className="font-semibold text-xs truncate">Switch Role</span>}
        </button>

        <button
          onClick={logout}
          className={`w-full flex items-center text-xs text-red-400 hover:text-red-300 hover:bg-slate-900 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center p-2' : 'px-3 py-2 space-x-2'
          }`}
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 shrink-0 text-red-400" />
          {!isCollapsed && <span className="font-semibold text-xs truncate">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
