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
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center space-x-1"><CheckCircle className="w-3 h-3 text-emerald-400 mr-1" />Completed</span>;
      case 'In Progress':
        return <span className="bg-blue-950 text-blue-300 border border-blue-700 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center space-x-1"><Clock className="w-3 h-3 text-blue-400 mr-1" />In Progress</span>;
      case 'Delayed':
        return <span className="bg-red-950 text-red-300 border border-red-700 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center space-x-1"><AlertTriangle className="w-3 h-3 text-red-400 mr-1" />Delayed</span>;
      case 'Awaiting Verification':
        return <span className="bg-amber-950 text-amber-300 border border-amber-700 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center space-x-1"><HelpCircle className="w-3 h-3 text-amber-400 mr-1" />Awaiting Verification</span>;
      default:
        return <span className="bg-slate-800 text-slate-300 border border-slate-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">Not Started</span>;
    }
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Factual Accountability Ledger</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Grand Gedeh Commitments & Benefits Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
            Tracking every material promise made to the people of Grand Gedeh across mining, forestry, agriculture, 
            and road projects. Statuses are strictly factual, supported by documented evidence and field audits.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search commitment, obligor, beneficiary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Project Filter */}
            <select
              value={selectedProjectFilter}
              onChange={(e) => setSelectedProjectFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Concession Projects</option>
              {concessions.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {/* Status Tabs */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedStatus === st
                      ? 'bg-emerald-600 text-white font-semibold shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
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
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all shadow-md"
              >
                {/* Main Row Summary */}
                <div 
                  onClick={() => setExpandedCommitmentId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-slate-400 font-semibold">{item.id.toUpperCase()}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-amber-400 font-medium">{item.projectName}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{item.sector}</span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      <div>
                        <span className="text-slate-500">Obligor: </span>
                        <span className="text-slate-200">{item.obligor}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Beneficiary: </span>
                        <span className="text-slate-200">{item.beneficiary}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Deadline: </span>
                        <span className="text-amber-300 font-mono">{item.deadline}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Value: </span>
                        <span className="text-emerald-400 font-semibold">{item.monetaryValue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end space-x-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                    <div>{getStatusBadge(item.status)}</div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-emerald-400' : ''}`} />
                  </div>
                </div>

                {/* Expanded Detailed Audit Record */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 bg-slate-950/80 border-t border-slate-800 space-y-4 text-xs">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="text-[11px] text-slate-400 uppercase font-semibold">Source Document:</div>
                        <div className="text-slate-200 font-medium mt-1">{item.sourceDoc}</div>
                        <div className="text-amber-400 text-[11px] mt-0.5 font-mono">{item.clauseRef}</div>
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-400 uppercase font-semibold">Supervising Agency:</div>
                        <div className="text-slate-200 font-medium mt-1">{item.responsibleAgency}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">Location: {item.location}</div>
                      </div>

                      <div>
                        <div className="text-[11px] text-slate-400 uppercase font-semibold">Last Audited by GGCDC:</div>
                        <div className="text-emerald-400 font-medium mt-1">{item.lastAudited}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">Formal Field Inspection</div>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                        Documented Evidence of Completion:
                      </div>
                      <p className="text-slate-200 leading-relaxed">
                        {item.evidence}
                      </p>
                    </div>

                    <div className="bg-amber-950/30 p-3 rounded-lg border border-amber-800/40 text-amber-200">
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
