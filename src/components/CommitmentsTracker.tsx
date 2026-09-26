import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  Building2, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../utils/context';
import { CommitmentRecord, CommitmentStatus } from '../types';

export const CommitmentsTracker: React.FC = () => {
  const { commitments, concessions } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('All');
  const [expandedCommitmentId, setExpandedCommitmentId] = useState<string | null>(null);

  const statuses = ['All', 'In Progress', 'Completed', 'Delayed', 'Awaiting Verification', 'Not Started'];

  const filteredCommitments = commitments.filter((item) => {
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesProject = selectedProjectFilter === 'All' || item.projectId === selectedProjectFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.obligor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.beneficiary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesProject && matchesSearch;
  });

  const getStatusBadge = (status: CommitmentStatus) => {
    switch (status) {
      case 'Completed':
        return <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center space-x-1"><CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400 mr-1" />Completed</span>;
      case 'In Progress':
        return <span className="bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center space-x-1"><Clock className="w-3 h-3 text-blue-600 dark:text-blue-400 mr-1" />In Progress</span>;
      case 'Delayed':
        return <span className="bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center space-x-1"><AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400 mr-1" />Delayed</span>;
      case 'Awaiting Verification':
        return <span className="bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center space-x-1"><HelpCircle className="w-3 h-3 text-amber-600 dark:text-amber-400 mr-1" />Awaiting Verification</span>;
      default:
        return <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">Not Started</span>;
    }
  };

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Sovereign Audit Ledger Header */}
        <div className="bg-gradient-to-br from-emerald-950 via-[#0d2a24] to-slate-950 text-white p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-800/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Directorate of Compliance &amp; Accountability</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2.5">
                Grand Gedeh Commitments &amp; Benefits Tracker
              </h1>
              <p className="text-emerald-100/85 text-xs sm:text-sm md:text-base leading-relaxed">
                Tracking every material promise made to the people of Grand Gedeh across mining, forestry, agriculture, and road projects. Statuses are strictly factual, supported by documented evidence, escrow receipts, and physical field audits.
              </p>
            </div>

            {/* Executive KPI Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 shrink-0">
              <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-3 backdrop-blur-md">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Audited Ledger</div>
                <div className="text-lg font-black text-white font-mono">{commitments.length} Obligations</div>
                <div className="text-[10px] text-slate-400">100% Evidence Verified</div>
              </div>
              <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-3 backdrop-blur-md">
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Compliance Status</div>
                <div className="text-lg font-black text-white font-mono">Active SLA Audit</div>
                <div className="text-[10px] text-slate-400">Section 13 Monitored</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-sm backdrop-blur-md">
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search commitment, obligor, beneficiary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Project Filter */}
            <select
              value={selectedProjectFilter}
              onChange={(e) => setSelectedProjectFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-colors"
            >
              <option value="All">All Concession Projects</option>
              {concessions.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {/* Status Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                    selectedStatus === st
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-400/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Commitments Table & Expandable Cards */}
        <div className="space-y-3">
          {filteredCommitments.map((item) => {
            const isExpanded = expandedCommitmentId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm"
              >
                {/* Main Row Summary */}
                <div 
                  onClick={() => setExpandedCommitmentId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">{item.id.toUpperCase()}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-amber-700 dark:text-amber-400 font-semibold">{item.projectName}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-slate-500 dark:text-slate-400">{item.sector}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 pt-1">
                      <div>
                        <span className="text-slate-500">Obligor: </span>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{item.obligor}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Beneficiary: </span>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{item.beneficiary}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Deadline: </span>
                        <span className="text-amber-700 dark:text-amber-300 font-mono font-medium">{item.deadline}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Value: </span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">{item.monetaryValue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end space-x-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
                    <div>{getStatusBadge(item.status)}</div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''}`} />
                  </div>
                </div>

                {/* Expanded Detailed Audit Record */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-slate-900/90 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Source Document:</div>
                        <div className="text-slate-800 dark:text-slate-200 font-medium mt-1">{item.sourceDoc}</div>
                        <div className="text-amber-700 dark:text-amber-400 text-[11px] mt-0.5 font-mono">{item.clauseRef}</div>
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Supervising Agency:</div>
                        <div className="text-slate-800 dark:text-slate-200 font-medium mt-1">{item.responsibleAgency}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Location: {item.location}</div>
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Last Audited by GGCDC:</div>
                        <div className="text-emerald-700 dark:text-emerald-400 font-semibold mt-1">{item.lastAudited}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Formal Field Inspection</div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
                      <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                        Documented Evidence of Completion:
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                        {item.evidence}
                      </p>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200">
                      <span className="font-bold">GGCDC Independent Verification Audit Note: </span>
                      {item.verificationNotes}
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
