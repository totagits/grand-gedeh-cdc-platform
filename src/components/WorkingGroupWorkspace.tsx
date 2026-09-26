import React, { useState } from 'react';
import { 
  Users, 
  Lock, 
  Eye, 
  CheckSquare, 
  AlertTriangle, 
  FileText, 
  MessageSquare, 
  Calendar, 
  ShieldAlert, 
  ExternalLink,
  Plus,
  Briefcase
} from 'lucide-react';
import { useApp } from '../utils/context';
import { WorkingGroup } from '../types';

export const WorkingGroupWorkspace: React.FC = () => {
  const { workingGroups, currentRole, setSelectedProjectId, setActiveView } = useApp();
  const [selectedGroupId, setSelectedGroupId] = useState<string>(workingGroups[0]?.id || 'wg-putu');
  const [workspaceMode, setWorkspaceMode] = useState<'public' | 'secure'>('secure');
  const [secureTab, setSecureTab] = useState<'tasks' | 'risks' | 'legalNotes' | 'minutes'>('tasks');

  const activeGroup = workingGroups.find(w => w.id === selectedGroupId) || workingGroups[0];
  const isAuthorized = currentRole === 'expert' || currentRole === 'secretariat' || currentRole === 'community_rep';

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Specialized Operational Arms</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Working Group Workspaces & Directorates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl mt-1">
              GGCDC operates as a permanent multi-sector institution with specialized operational working groups. 
              The Putu Mining & Development Working Group functions as the flagship unit under Mining & Extractives.
            </p>
          </div>

          {/* Perspective Switcher: Public vs Secure */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-xl flex items-center space-x-2 self-start md:self-auto shadow-sm">
            <button
              onClick={() => setWorkspaceMode('public')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                workspaceMode === 'public'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Public Portal</span>
            </button>

            <button
              onClick={() => setWorkspaceMode('secure')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                workspaceMode === 'secure'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Secure Working Workspace</span>
            </button>
          </div>
        </div>

        {/* Working Group Selector Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-8 border-b border-slate-200 dark:border-slate-800">
          {workingGroups.map((group) => {
            const isSelected = group.id === activeGroup.id;
            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-emerald-600/80 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{group.name}</span>
                {group.id === 'wg-putu' && (
                  <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] px-1.5 py-0.2 rounded font-bold border border-amber-300 dark:border-amber-500/40">
                    Flagship
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Workspace Card Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 mb-6 shadow-xl text-slate-800 dark:text-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-1">
                <span>{activeGroup.pillar} Directorate</span>
                <span>•</span>
                <span className="text-emerald-700 dark:text-emerald-400">{activeGroup.memberCount} Working Group Members</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {activeGroup.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {activeGroup.mandate}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {activeGroup.id === 'wg-putu' && (
                <button
                  onClick={() => {
                    setSelectedProjectId('proj-putu-iron');
                    setActiveView('concessions');
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow"
                >
                  <span>Inspect Putu Concession Record</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-xs">
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Lead Coordinator:</span>
              <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{activeGroup.leadCoordinator}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Deputy Lead:</span>
              <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">{activeGroup.deputyLead}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Active Monitored Projects:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 block">{activeGroup.activeProjects.join(', ')}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Published Reports:</span>
              <span className="font-bold text-amber-800 dark:text-amber-300 mt-0.5 block">{activeGroup.publicReportsCount} Public Briefs</span>
            </div>
          </div>
        </div>

        {/* Perspective Content: Secure Institutional Workspace vs Public Portal */}
        {workspaceMode === 'secure' ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl text-slate-800 dark:text-slate-100">
            
            {/* RBAC Notification Banner */}
            {!isAuthorized && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/50 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Previewing Institutional Operational Workspace</span>
                    <span>You are currently viewing as Public Citizen. Switch role to Technical Expert or Secretariat to edit tasks or draft documents.</span>
                  </div>
                </div>
                <span className="bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded text-[11px] self-start sm:self-auto shadow-sm">
                  Read-Only Mode
                </span>
              </div>
            )}

            {/* Secure Tab Navigation */}
            <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto">
              {[
                { id: 'tasks', label: 'Action Tasks & Milestones', icon: CheckSquare },
                { id: 'risks', label: 'Risk Register & Red Flags', icon: AlertTriangle },
                { id: 'legalNotes', label: 'Legal Analysis & Position Drafting', icon: FileText },
                { id: 'minutes', label: 'Internal Meeting Minutes', icon: Calendar },
              ].map((tab) => {
                const Icon = tab.icon;
                const isCurrent = secureTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSecureTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Tasks */}
            {secureTab === 'tasks' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Current assigned tasks for this working group</span>
                  <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-emerald-700 dark:text-emerald-400 border border-slate-300 dark:border-slate-700 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 font-medium transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Task</span>
                  </button>
                </div>

                {activeGroup.tasks.map((task) => (
                  <div key={task.id} className="p-4 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          task.priority === 'Critical' 
                            ? 'bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800' 
                            : 'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        }`}>
                          {task.priority} Priority
                        </span>
                        <span className="font-mono text-slate-400">{task.id.toUpperCase()}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{task.title}</h4>
                      <div className="text-slate-500 dark:text-slate-400">
                        Assigned To: <span className="text-slate-800 dark:text-slate-200 font-medium">{task.assignedTo}</span> • Due: <span className="text-amber-700 dark:text-amber-300 font-mono font-medium">{task.dueDate}</span>
                      </div>
                    </div>

                    <span className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-auto">
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Risk Register */}
            {secureTab === 'risks' && (
              <div className="space-y-3">
                {activeGroup.risks.map((rsk) => (
                  <div key={rsk.id} className="p-4 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-red-700 dark:text-red-400 font-bold bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 px-2 py-0.5 rounded uppercase text-[10px]">
                        Severity: {rsk.severity}
                      </span>
                      <span className="font-mono text-slate-400">{rsk.id.toUpperCase()}</span>
                    </div>
                    <div className="text-slate-900 dark:text-white font-bold text-sm">{rsk.risk}</div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Agreed Working Group Mitigation Strategy: </span>
                      {rsk.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Legal Notes */}
            {secureTab === 'legalNotes' && (
              <div className="p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Working Group Legal & Technical Analysis Memo</span>
                  <span className="text-amber-700 dark:text-amber-400 font-mono text-[11px] font-semibold">Confidential Internal</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Working group technical team concluded initial review of concession addenda provisions. Primary recommendation: 
                  insist upon minimum 25% local vendor set-aside and strict escrow deposit milestones for the County Community Development Fund 
                  prior to authorizing expansion of ore washing facilities.
                </p>
                <div className="pt-2 text-slate-500 dark:text-slate-400 text-[11px]">
                  Drafted by: Legal Sub-committee • Cllr. Saydee Momolu Krahn
                </div>
              </div>
            )}

            {/* Tab 4: Meeting Minutes */}
            {secureTab === 'minutes' && (
              <div className="p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Latest Formal Session Summary</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] font-semibold">September 2026 Session</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeGroup.meetingNotesSnippet}
                </p>
              </div>
            )}

          </div>
        ) : (
          /* Public Portal Side */
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 text-slate-800 dark:text-slate-100">
            <div>
              <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
                Public Mandate & Purpose
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl">
                The {activeGroup.name} ensures that the people of Grand Gedeh County receive verified information, 
                equitable economic inclusion, and environmental protection regarding projects within the {activeGroup.pillar} sector.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <h5 className="font-bold text-slate-900 dark:text-white mb-2">Public Documentation Released</h5>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li>• Mineral Development Agreement (MDA) Public Summary</li>
                  <li>• Quarterly Water & Environmental Baseline Audits</li>
                  <li>• Community Development Agreement (CDA) Framework</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <h5 className="font-bold text-slate-900 dark:text-white mb-2">Citizen Participation Channels</h5>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li>• Open Consultations on CDA revisions</li>
                  <li>• Direct grievance lodging for affected chiefdoms</li>
                  <li>• Technical advisory inputs from diaspora professionals</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveView('consultations')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow"
              >
                Submit Citizen Feedback to this Working Group
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
