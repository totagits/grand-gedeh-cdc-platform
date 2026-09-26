import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  Award, 
  Layers, 
  Building2, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { useApp, DEMO_USERS } from '../utils/context';
import { UserRole } from '../types';

export const SignInModal: React.FC = () => {
  const { isSignInModalOpen, setIsSignInModalOpen, login } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('secretariat');

  if (!isSignInModalOpen) return null;

  const roleCards: {
    role: UserRole;
    title: string;
    samplePerson: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badge: string;
  }[] = [
    {
      role: 'secretariat',
      title: 'Secretariat Executive Officer / Auditor',
      samplePerson: 'Hon. Emmanuel Clarke',
      description: 'Audit & verify enterprise filings, authenticate uploaded TVET certs & tax clearance, issue official GGCDC local content accreditations.',
      icon: ShieldCheck,
      accentColor: 'border-red-500/60 bg-red-950/30 text-red-400',
      badge: 'Accreditation Desk & Audit Clearance'
    },
    {
      role: 'business',
      title: 'Grand Gedean Local Business / Contractor',
      samplePerson: 'Kollie Mensah (Zwedru Engineering)',
      description: 'Manage registered enterprise profile, upload LBR and LRA tax certificates, bid on concession procurement tenders, track local content quotas.',
      icon: Briefcase,
      accentColor: 'border-blue-500/60 bg-blue-950/30 text-blue-400',
      badge: 'Procurement Tenders & Verified Registry'
    },
    {
      role: 'worker',
      title: 'Grand Gedean Artisan / Diaspora Talent',
      samplePerson: 'Jackson K. Doe (Heavy Machinery Operator)',
      description: 'Submit credentials, TVET degrees, operator licenses, calculate skills gaps against Putu mine quotas, apply for concession jobs.',
      icon: Users,
      accentColor: 'border-amber-500/60 bg-amber-950/30 text-amber-400',
      badge: 'Skills Profile & Concession Jobs'
    },
    {
      role: 'expert',
      title: 'Technical Advisory Expert / Scholar',
      samplePerson: 'Dr. Florence Gaye (Mining Hydrologist)',
      description: 'Join specialized working groups (Putu, Forestry, Agriculture), author technical reviews, examine environmental baseline audits.',
      icon: Award,
      accentColor: 'border-emerald-500/60 bg-emerald-950/30 text-emerald-400',
      badge: 'Working Groups & Technical Review'
    },
    {
      role: 'community_rep',
      title: 'Customary Clan Elder / Community Rep',
      samplePerson: 'Elder Gbarbo Tarpeh (Putu Clan Council)',
      description: 'Monitor customary clan boundaries, track escrow & Social Development Fund disbursements, file citizen grievances, verify benefits.',
      icon: Layers,
      accentColor: 'border-purple-500/60 bg-purple-950/30 text-purple-400',
      badge: 'Escrow Oversight & Ancestral Rights'
    },
    {
      role: 'investor',
      title: 'Concessionaire / Investor Partner',
      samplePerson: 'Marcus Vance (Putu Iron Ore Mining Corp)',
      description: 'Track concession agreement milestones, source verified local contractors and certified Grand Gedean labor, file compliance reports.',
      icon: Building2,
      accentColor: 'border-cyan-500/60 bg-cyan-950/30 text-cyan-400',
      badge: 'Concession Obligations & Local Hiring'
    },
    {
      role: 'citizen',
      title: 'Public Citizen / Resident / Youth',
      samplePerson: 'Evelyn Gaye (Civic Forum, Zwedru)',
      description: 'Full public civic transparency, explore interactive GIS maps, participate in community consultations, inspect public disclosures.',
      icon: Compass,
      accentColor: 'border-teal-500/60 bg-teal-950/30 text-teal-400',
      badge: 'Civic Participation & Open Data'
    }
  ];

  const handleInstantSignIn = (role: UserRole) => {
    login(role);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/50 rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-800 dark:text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSignInModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800/60">
            <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Role-Based Access Control (RBAC) Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Sign In to Grand Gedeh Development Workspace
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Select your official stakeholder role to activate your customized operating sidebar and tools.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 max-h-[50vh] overflow-y-auto pr-1">
          {roleCards.map((rc) => {
            const Icon = rc.icon;
            const isSelected = selectedRole === rc.role;

            return (
              <div
                key={rc.role}
                onClick={() => setSelectedRole(rc.role)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 dark:bg-slate-800/80 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-slate-50/80 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                      <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{rc.title}</h4>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">{rc.samplePerson}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInstantSignIn(rc.role);
                    }}
                    className="text-[10px] bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-md shadow-sm transition-transform hover:scale-105 shrink-0"
                  >
                    Quick Sign In
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {rc.description}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{rc.badge}</span>
                  </span>
                  {isSelected && <span className="text-amber-700 dark:text-amber-400 font-black">Selected ✓</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Currently selected: <span className="text-amber-700 dark:text-amber-400 font-bold">{DEMO_USERS[selectedRole].name}</span> ({selectedRole.toUpperCase()})
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsSignInModalOpen(false)}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleInstantSignIn(selectedRole)}
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 rounded-lg shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <span>Activate {selectedRole.toUpperCase()} Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
