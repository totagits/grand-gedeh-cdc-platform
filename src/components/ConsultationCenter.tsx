import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Send, 
  FileText, 
  CheckCircle, 
  Calendar, 
  Users, 
  AlertCircle,
  ExternalLink,
  Download
} from 'lucide-react';
import { useApp } from '../utils/context';

export const ConsultationCenter: React.FC = () => {
  const { consultations, submitConsultation } = useApp();
  const [selectedConsultationId, setSelectedConsultationId] = useState<string>(consultations[0]?.id || '');
  const [feedbackType, setFeedbackType] = useState<'Concern' | 'Recommendation' | 'Survey'>('Recommendation');
  const [authorName, setAuthorName] = useState('');
  const [authorCommunity, setAuthorCommunity] = useState('Putu Jarwodee');
  const [feedbackText, setFeedbackText] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const activeConsultation = consultations.find(c => c.id === selectedConsultationId) || consultations[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    submitConsultation(activeConsultation.id, feedbackText, authorName, authorCommunity);
    setSubmittedSuccess(true);
    setFeedbackText('');
    setTimeout(() => setSubmittedSuccess(false), 5000);
  };

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Civic Participation & Consultation Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Consultation & Citizen Participation Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl mt-1">
            Institutionalizing genuine civic participation across Grand Gedeh. Review draft position papers, submit community concerns, 
            contribute technical recommendations, and track questions posed to concessionaires and government authorities.
          </p>
        </div>

        {/* Consultations Overview & Active Discussions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Consultations Selector */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Active Consultations & Draft Position Reviews</span>
            </h3>

            {consultations.map((item) => {
              const isSelected = item.id === activeConsultation.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedConsultationId(item.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all shadow-sm ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-emerald-500 shadow-xl ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-amber-800 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      {item.sector}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === 'Open for Submissions' 
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700' 
                        : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{item.submissionCount} Submissions Received</span>
                    </div>
                    <span>{item.communitiesParticipating} Towns Involved</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Consultation Details & Submission Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl text-slate-800 dark:text-slate-100">
            
            <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold block mb-1">
                Consultation Case: {activeConsultation.id.toUpperCase()} • Sector: {activeConsultation.sector}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeConsultation.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {activeConsultation.summary}
              </p>

              {/* Consultation Timetable & Participation Baseline */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Opened:</span>
                  <span className="font-mono text-slate-900 dark:text-white font-medium">{activeConsultation.openedDate}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Closing Date:</span>
                  <span className="font-mono text-amber-700 dark:text-amber-300 font-medium">{activeConsultation.closingDate}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Total Submissions:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{activeConsultation.submissionCount}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Towns Participating:</span>
                  <span className="font-bold text-sky-700 dark:text-sky-400">{activeConsultation.communitiesParticipating} Communities</span>
                </div>
              </div>

              {/* Key Consultation Questions */}
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
                  Key Questions for Citizen & Expert Review:
                </span>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                  {activeConsultation.keyQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Q{idx + 1}:</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeConsultation.publishedReportUrl && (
                <div className="mt-3 flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-lg text-xs">
                  <span className="text-emerald-800 dark:text-emerald-300 font-medium">Published Consultation Synthesis Report Available</span>
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded flex items-center space-x-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>
              )}
            </div>

            {/* Submission Form */}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center space-x-2">
                <Send className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Submit Your Position, Community Concern, or Technical Recommendation</span>
              </h4>

              {submittedSuccess && (
                <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-950 border border-emerald-400 dark:border-emerald-600 rounded-lg text-xs text-emerald-900 dark:text-emerald-200 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>
                    Thank you! Your submission has been officially logged into the GGCDC Institutional Record.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="flex flex-wrap gap-2">
                  {(['Recommendation', 'Concern', 'Survey'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFeedbackType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        feedbackType === type
                          ? 'bg-emerald-600 text-white font-bold shadow'
                          : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {type === 'Recommendation' && 'Technical Recommendation'}
                      {type === 'Concern' && 'Community Grievance / Concern'}
                      {type === 'Survey' && 'Structured Survey Response'}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Your Name / Organization</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Martha V. Poah (or Anonymous)"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Community / District of Origin</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Putu Jarwodee (or Diaspora)"
                      value={authorCommunity}
                      onChange={(e) => setAuthorCommunity(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
                    Detailed Submission Text / Evidence
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide your specific input, questions for the concessionaire, or recommended amendments to the agreement..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Submissions are reviewed by the specialized Working Group prior to position paper publication.
                  </span>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-lg flex items-center space-x-1.5 self-start sm:self-auto"
                  >
                    <span>Transmit Submission</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
