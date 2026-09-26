import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  Building2, 
  Lock, 
  Globe, 
  CheckCircle,
  Eye
} from 'lucide-react';
import { useApp } from '../utils/context';

export const DocumentRepository: React.FC = () => {
  const { documents, currentRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const docTypes = [
    'All',
    'Mineral Development Agreement (MDA)',
    'Community Development Agreement (CDA)',
    'ESIA / Environmental',
    'Technical Audit',
    'Policy Resolution',
    'GIS Map'
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesType = selectedType === 'All' || doc.docType === selectedType;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDownload = (docTitle: string) => {
    setDownloadNotice(`Downloading: ${docTitle}`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Permanent Institutional Memory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Grand Gedeh Central Document Repository
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl mt-1">
            Preserving institutional memory across generations. Years from now, future Grand Gedeh leaders 
            will never have to wonder where the Putu agreement, forestry permits, or environmental audits are stored.
          </p>
        </div>

        {downloadNotice && (
          <div className="mb-6 p-3 bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-600 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>{downloadNotice} (GGCDC Document Verification Stamp Verified).</span>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search document title, project, sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {docTypes.map((dt) => (
              <button
                key={dt}
                onClick={() => setSelectedType(dt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedType === dt
                    ? 'bg-emerald-600 text-white font-semibold shadow'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {dt.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Table View */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Document Title & Sector</th>
                  <th className="p-4 hidden md:table-cell">Associated Project</th>
                  <th className="p-4 hidden sm:table-cell">Type</th>
                  <th className="p-4">Date & Size</th>
                  <th className="p-4">Classification</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredDocs.map((doc) => {
                  const isConfidential = doc.classification.includes('Confidential');

                  return (
                    <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{doc.title}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{doc.sector}</div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 max-w-md">{doc.summary}</p>
                      </td>

                      <td className="p-4 hidden md:table-cell">
                        <span className="font-medium text-amber-800 dark:text-amber-300">{doc.projectName}</span>
                      </td>

                      <td className="p-4 hidden sm:table-cell">
                        <span className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 font-mono text-[10px]">
                          {doc.fileFormat}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <div className="font-mono text-slate-900 dark:text-slate-200">{doc.date}</div>
                        <div className="text-slate-500 text-[10px]">{doc.size}</div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {isConfidential ? (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full">
                            <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            <span>Executive Review</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                            <Globe className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>Public Archive</span>
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDownload(doc.title)}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-600/20 dark:hover:bg-emerald-600/40 dark:text-emerald-300 dark:border-emerald-700/60 font-semibold px-3 py-1.5 rounded-lg inline-flex items-center space-x-1 transition-colors shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
