import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Building2, 
  Bell, 
  CheckCircle,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../utils/context';

export const OpportunitiesHub: React.FC = () => {
  const { opportunities } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');

  const types = ['All', 'Tender / RFQ', 'Employment', 'Scholarship', 'Grant / Loan'];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesType = selectedType === 'All' || opp.type === selectedType;
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;
    setSubscribedSuccess(true);
    setSubscriberEmail('');
    setTimeout(() => setSubscribedSuccess(false), 4000);
  };

  return (
    <section className="py-12 bg-slate-900 text-slate-100 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Economic Opportunity Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Grand Gedeh Opportunities Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Converting development information into tangible economic opportunity. Aggregating concession tenders, 
              local supplier RFQs, direct employment, TVET scholarships, and agricultural grants.
            </p>
          </div>

          {/* Quick Subscribe Trigger */}
          <form onSubmit={handleSubscribe} className="flex items-center space-x-2 self-start md:self-auto">
            <input
              type="email"
              required
              placeholder="Your email for alerts..."
              value={subscriberEmail}
              onChange={(e) => setSubscriberEmail(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs px-3 py-2 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center space-x-1 shadow"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </button>
          </form>
        </div>

        {subscribedSuccess && (
          <div className="mb-6 p-3 bg-emerald-950 border border-emerald-600 rounded-xl text-xs text-emerald-200 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Success! You have subscribed to Grand Gedeh Opportunity Alerts.</span>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tenders, scholarships, jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedType === t
                    ? 'bg-emerald-600 text-white font-semibold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 hover:border-emerald-500 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    opp.type === 'Tender / RFQ'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : opp.type === 'Scholarship'
                      ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {opp.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Deadline: {opp.deadline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mt-1 leading-snug">
                  {opp.title}
                </h3>
                
                <div className="text-xs text-slate-400 mt-1">
                  Issued by: <span className="font-semibold text-slate-300">{opp.issuer}</span>
                </div>

                <div className="mt-3 p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Sector:</span>
                    <span className="text-white font-medium">{opp.sector}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-300">{opp.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Value / Scope:</span>
                    <span className="text-emerald-400 font-bold">{opp.compensationOrValue}</span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {opp.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-700/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">ID: {opp.id.toUpperCase()}</span>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors">
                  Apply / Express Interest
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
