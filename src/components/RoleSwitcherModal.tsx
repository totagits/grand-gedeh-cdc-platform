import React from 'react';
import { 
  Users, 
  Building2, 
  Award, 
  ShieldAlert, 
  Landmark, 
  Check, 
  X,
  Lock,
  Eye
} from 'lucide-react';
import { useApp } from '../utils/context';
import { UserRole } from '../types';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentRole, setCurrentRole } = useApp();

  if (!isOpen) return null;

  const roles: {
    id: UserRole;
    title: string;
    description: string;
    permissions: string[];
    icon: React.ElementType;
    badge: string;
  }[] = [
    {
      id: 'citizen',
      title: 'Public Citizen / Diaspora Member',
      description: 'Standard public transparency perspective for residents, students, and global diaspora.',
      permissions: [
        'Explore multi-layer GIS development map',
        'Review disclosed concessions & commitments',
        'Submit citizen concerns & consultation feedback',
        'Search verified local businesses & tenders',
        'Register personal skills & workforce profile'
      ],
      icon: Users,
      badge: 'bg-emerald-950 text-emerald-300 border-emerald-700'
    },
    {
      id: 'investor',
      title: 'Concessionaire / Investor Representative',
      description: 'Perspective for mining companies (e.g. Putu), logging firms, agribusinesses, and contractors.',
      permissions: [
        'Query verified Grand Gedeh supplier database',
        'Run Investor Skills Gap Calculator for workforce quotas',
        'Submit mandatory local procurement compliance filings',
        'Respond to community consultation inquiries'
      ],
      icon: Building2,
      badge: 'bg-blue-950 text-blue-300 border-blue-700'
    },
    {
      id: 'expert',
      title: 'GGCDC Technical & Advisory Expert',
      description: 'Accredited professional network member (lawyer, geologist, engineer, economist, ecologist).',
      permissions: [
        'Access private Working Group task managers',
        'Draft and peer-review legal position papers',
        'Inspect raw environmental water testing telemetry',
        'Evaluate contractor technical audit samples'
      ],
      icon: Award,
      badge: 'bg-amber-950 text-amber-300 border-amber-700'
    },
    {
      id: 'secretariat',
      title: 'Executive Secretariat Administrator',
      description: 'Full governance and administrative oversight for GGCDC Leadership and Directors.',
      permissions: [
        'Full administrative access across all 8 directorates',
        'Approve businesses for "Verified Local" badge',
        'Escalate community grievances to Legislative Caucus',
        'Publish formal Council resolutions & audits'
      ],
      icon: Landmark,
      badge: 'bg-red-950 text-red-300 border-red-700'
    },
    {
      id: 'community_rep',
      title: 'Community Traditional Representative',
      description: 'Paramount Chiefs, Clan Chiefs, Women Leaders, and Customary Land Committee Chairs.',
      permissions: [
        'Log formal community boundary disputes & grievances',
        'Review Social Development Fund bank reconciliations',
        'Certify authentic local consultation participation',
        'Update community priority infrastructure requests'
      ],
      icon: ShieldAlert,
      badge: 'bg-purple-950 text-purple-300 border-purple-700'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-900 dark:text-white">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
          <Lock className="w-4 h-4" />
          <span>Role-Based Access Control (RBAC) Switcher</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          Simulate User Role & Institutional Permissions
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 mb-6">
          Switch roles to experience how the GGCDC platform adapts interface views, data access, and workspace tools 
          for each civic stakeholder group.
        </p>

        <div className="space-y-3">
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = currentRole === r.id;

            return (
              <div
                key={r.id}
                onClick={() => {
                  setCurrentRole(r.id);
                  onClose();
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-50 dark:bg-slate-800/90 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                    : 'bg-white dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{r.title}</h4>
                      {isSelected && (
                        <span className="bg-emerald-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                          Active Persona
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{r.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {r.permissions.slice(0, 3).map((perm, idx) => (
                        <span key={idx} className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                          ✓ {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="self-end sm:self-center">
                  <span className={`text-xs px-3 py-1 rounded-lg border font-semibold ${r.badge}`}>
                    {isSelected ? 'Active' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
