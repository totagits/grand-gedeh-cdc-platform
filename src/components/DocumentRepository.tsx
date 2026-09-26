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
  Eye,
  ShieldCheck,
  Scale,
  X,
  Copy,
  Printer,
  BookOpen,
  Info,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../utils/context';
import { DocumentItem } from '../types';

export const DocumentRepository: React.FC = () => {
  const { documents } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [activeModalDoc, setActiveModalDoc] = useState<DocumentItem | null>(null);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'clauses' | 'fulltext' | 'metadata'>('clauses');

  const docTypes = [
    'All',
    'Mineral Development Agreement (MDA)',
    'Forest Management Contract (FMC)',
    'Community Forest Agreement (CFMA)',
    'Community Development Agreement (CDA)',
    'Agro-Industrial Concession',
    'Infrastructure & Energy Treaty',
    'ESIA / Environmental',
    'Technical Audit',
    'Policy Resolution',
    'GIS Map'
  ];

  const sectors = [
    'All',
    'Mining & Extractives',
    'Forestry, Environment & Climate',
    'Agriculture & Food Systems',
    'Infrastructure & Public Utilities',
    'Governance, Research & Citizen Participation'
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesType = selectedType === 'All' || doc.docType === selectedType;
    const matchesSector = selectedSector === 'All' || doc.sector === selectedSector;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      doc.title.toLowerCase().includes(q) ||
      doc.projectName.toLowerCase().includes(q) ||
      doc.sector.toLowerCase().includes(q) ||
      doc.summary.toLowerCase().includes(q) ||
      (doc.concessionCode && doc.concessionCode.toLowerCase().includes(q)) ||
      (doc.parties && doc.parties.toLowerCase().includes(q));
    return matchesType && matchesSector && matchesSearch;
  });

  // Generates complete authentic legal document text for client-side download
  const generateDocumentText = (doc: DocumentItem): string => {
    const line = '='.repeat(80);
    const subline = '-'.repeat(80);
    
    let clausesFormatted = '';
    if (doc.keyClauses && doc.keyClauses.length > 0) {
      clausesFormatted = doc.keyClauses.map((c, i) => `
[SECTION ${i + 1}]: ${c.article.toUpperCase()}
Subject: ${c.title}
Summary of Obligation: ${c.summary}
Statutory Legal Text / Enforceable Covenant:
${c.statutoryDetail}
`).join(`\n${subline}\n`);
    } else {
      clausesFormatted = `Standard statutory covenants apply in accordance with the ${doc.statutoryBasis || 'applicable Republic of Liberia concession law'}.`;
    }

    const contractBody = doc.fullContractText ? `
${line}
FULL RATIFIED STATUTORY TEXT & ARTICLES
${line}

${doc.fullContractText}
` : '';

    return `${line}
REPUBLIC OF LIBERIA | GRAND GEDEH COUNTY CENTRAL ARCHIVE
CITIZENS DEVELOPMENT COUNCIL (GGCDC) - INSTITUTIONAL REPOSITORY
MANDATORY STATUTORY PUBLIC DISCLOSURE (LEITI ACT 2009 / FOI ACT 2010)
${line}

DOCUMENT TITLE:        ${doc.title}
CONCESSION / ACT CODE: ${doc.concessionCode || 'GG-DOC-' + doc.id.toUpperCase()}
PRIMARY SECTOR:        ${doc.sector}
ASSOCIATED PROJECT:    ${doc.projectName}
DOCUMENT CLASSIFICATION: ${doc.classification.toUpperCase()} (UNRESTRICTED PUBLIC ACCESS)
CONTRACTING PARTIES:   ${doc.parties || 'Republic of Liberia & Designated Stakeholders'}
RATIFICATION STATUS:   ${doc.ratificationStatus || 'Ratified & Enacted into Law'}
STATUTORY AUTHORITY:   ${doc.statutoryBasis || 'Constitution of Liberia, FOI Act 2010 & LEITI Mandate'}
ORIGINAL FILING DATE:  ${doc.date}
FILE SPECIFICATION:    ${doc.fileFormat} (${doc.size})
VERIFICATION STATUS:   GGCDC PERMANENT INSTITUTIONAL ARCHIVE - AUTHENTICATED COPY

${line}
EXECUTIVE STATUTORY SUMMARY
${line}
${doc.summary}

${line}
KEY ENFORCEABLE COVENANTS, FISCAL TERMS & STATUTORY CLAUSES
${line}
${clausesFormatted}
${contractBody}

${line}
PUBLIC TRANSPARENCY & STATUTORY COMPLIANCE SEAL
${line}
In accordance with Section 4.1 of the Liberia Extractive Industries Transparency 
Initiative (LEITI) Act of 2009 and the Freedom of Information (FOI) Act of 2010, 
all natural resource agreements, commercial forestry contracts, agricultural 
leases, and public infrastructure works contracts within Grand Gedeh County are 
matters of public record. Any citizen has the constitutional right to inspect, 
reproduce, and audit these instruments to ensure compliance with community 
benefits, local employment quotas, and environmental protections.

Digitally Cataloged and Issued by:
Grand Gedeh Citizens Development Council (GGCDC) Central Secretariat
Directorate of Legal Affairs & Natural Resource Governance
Zwedru City, Grand Gedeh County, Republic of Liberia
Official Verification Stamp: GGCDC-VERIFIED-ARCHIVE-SEC-${doc.id.toUpperCase()}
${line}
`;
  };

  // Triggers genuine client-side file download via Blob and <a> download
  const handleDownload = (doc: DocumentItem) => {
    const textContent = generateDocumentText(doc);
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedTitle = (doc.concessionCode || doc.id) + '_' + doc.title.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 40);
    link.download = `${sanitizedTitle}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice(`Downloaded: "${doc.title}" (.txt plain text file generated with full statutory clauses).`);
    setTimeout(() => setDownloadNotice(null), 5000);
  };

  const copyModalContractText = (doc: DocumentItem) => {
    const text = generateDocumentText(doc);
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 3000);
  };

  const printModalContract = () => {
    window.print();
  };

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Public Disclosures &amp; Statutory Treaties</span>
            </div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>LEITI Act 2009 &amp; FOI Act 2010 Certified</span>
            </div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-800 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 px-3 py-1 rounded-full">
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Unrestricted Public Access</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Grand Gedeh Central Concession &amp; Document Archive
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-4xl mt-1">
            Preserving institutional memory across generations. In Grand Gedeh County, all natural resource concessions, 
            commercial forestry agreements, community forestry charters, agricultural leases, and public infrastructure 
            works are open public records. Every citizen, traditional leader, student, and researcher has the right to 
            inspect, audit, and download the full ratified text.
          </p>
        </div>

        {/* Public Transparency & Citizen Right-to-Know Banner */}
        <div className="mb-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/50 dark:via-slate-900 dark:to-emerald-950/50 border border-emerald-300 dark:border-emerald-700/60 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm mt-0.5">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm sm:text-base text-emerald-950 dark:text-emerald-200">
                    Universal Public Access &amp; LEITI Open Concession Disclosure
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded-full">
                    Statutory Right
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  Under the <strong>Liberia Extractive Industries Transparency Initiative (LEITI) Act 2009 (Sec. 4.1)</strong>, 
                  the <strong>Freedom of Information (FOI) Act 2010</strong>, and the <strong>Land Rights Act 2018</strong>, 
                  natural resource contracts are <em>never</em> private or secret. Grand Gedeans own the ancestral land and minerals; 
                  complete contracts, employment quotas, social funds, and royalty streams are published here for community scrutiny.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto text-xs text-slate-500 dark:text-slate-400 border-t sm:border-t-0 pt-2 sm:pt-0 border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">16 Active Treaties</span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400">100% Downloadable</span>
            </div>
          </div>
        </div>

        {/* Download notification alert */}
        {downloadNotice && (
          <div className="mb-6 p-4 bg-emerald-100 dark:bg-emerald-950 border-2 border-emerald-500 rounded-xl text-xs text-emerald-950 dark:text-emerald-100 flex items-center justify-between shadow-md animate-in fade-in duration-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold">{downloadNotice}</div>
                <div className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  GGCDC institutional seal and LEITI transparency certification embedded into document payload.
                </div>
              </div>
            </div>
            <button 
              onClick={() => setDownloadNotice(null)}
              className="p-1 hover:bg-emerald-200 dark:hover:bg-emerald-900 rounded-lg text-emerald-800 dark:text-emerald-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter and Search Toolbar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search contract title, concession code, company, district, sector, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sector Selector */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">Sector:</span>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Doc Type Pills */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
              <span>Filter by Legal Classification ({filteredDocs.length} Found)</span>
              {selectedType !== 'All' && (
                <button
                  onClick={() => setSelectedType('All')}
                  className="text-emerald-700 dark:text-emerald-400 hover:underline normal-case font-medium text-[11px]"
                >
                  Reset to All Types
                </button>
              )}
            </div>
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
              {docTypes.map((dt) => (
                <button
                  key={dt}
                  onClick={() => setSelectedType(dt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedType === dt
                      ? 'bg-emerald-600 text-white font-bold shadow'
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {dt.replace('Agreement', 'Agrmt.').replace('Contract', 'Contr.')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Table View */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/90 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Contract / Instrument</th>
                  <th className="p-4 hidden md:table-cell">Associated Concession</th>
                  <th className="p-4 hidden sm:table-cell">Statutory Type</th>
                  <th className="p-4">Filing Date</th>
                  <th className="p-4">Disclosure Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-500 dark:text-slate-400">
                      <FileText className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                      <p className="font-bold text-sm text-slate-700 dark:text-slate-300">No documents found matching your filter criteria.</p>
                      <p className="text-xs mt-1">Try resetting the search query or selecting "All" under classifications.</p>
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc) => {
                    const isConfidential = doc.classification.includes('Confidential');

                    return (
                      <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                        <td className="p-4 max-w-md">
                          <div className="flex items-start space-x-2">
                            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white text-sm leading-snug">
                                {doc.title}
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                {doc.concessionCode && (
                                  <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 font-bold">
                                    {doc.concessionCode}
                                  </span>
                                )}
                                <span className="text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                                  {doc.sector}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                {doc.summary}
                              </p>
                              {doc.keyClauses && doc.keyClauses.length > 0 && (
                                <div className="mt-1.5 flex items-center space-x-1 text-[10px] text-amber-700 dark:text-amber-400">
                                  <ShieldCheck className="w-3 h-3 shrink-0" />
                                  <span>{doc.keyClauses.length} Enforceable Statutory Covenants Indexed</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="p-4 hidden md:table-cell align-top">
                          <span className="font-semibold text-slate-900 dark:text-slate-200">
                            {doc.projectName}
                          </span>
                          {doc.parties && (
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                              Parties: {doc.parties}
                            </div>
                          )}
                        </td>

                        <td className="p-4 hidden sm:table-cell align-top whitespace-nowrap">
                          <span className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[10px] block w-fit">
                            {doc.docType.split('(')[0].trim()}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">
                            {doc.fileFormat} • {doc.size}
                          </span>
                        </td>

                        <td className="p-4 whitespace-nowrap align-top">
                          <div className="font-mono text-slate-900 dark:text-slate-200 font-medium">{doc.date}</div>
                          {doc.ratificationStatus && (
                            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                              Ratified
                            </div>
                          )}
                        </td>

                        <td className="p-4 whitespace-nowrap align-top">
                          {isConfidential ? (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-full">
                              <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                              <span>Executive Advisory</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                              <Globe className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span>Public Open Record</span>
                            </span>
                          )}
                          <div className="text-[10px] text-slate-400 mt-1">LEITI Mandate</div>
                        </td>

                        <td className="p-4 text-right whitespace-nowrap align-top">
                          <div className="flex items-center justify-end space-x-2">
                            {/* Read / Inspect Contract Modal Trigger */}
                            <button
                              onClick={() => {
                                setActiveModalDoc(doc);
                                setActiveTab('clauses');
                              }}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 font-semibold px-3 py-1.5 rounded-lg inline-flex items-center space-x-1.5 transition-colors shadow-sm text-xs"
                              title="Inspect full contract clauses and statutory text"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                              <span>Inspect</span>
                            </button>

                            {/* Direct Download Trigger */}
                            <button
                              onClick={() => handleDownload(doc)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg inline-flex items-center space-x-1.5 transition-all shadow-sm text-xs hover:shadow"
                              title="Download complete contract (.txt with legal clauses)"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Statistics & Legal Advisory */}
        <div className="mt-8 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-xs text-slate-600 dark:text-slate-400 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                GGCDC Institutional Memory &amp; Permanent Custody Guarantee
              </div>
              <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                All uploaded instruments are archived under dual cryptographic hash verification to prevent document tampering or retrospective redactions.
              </p>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-lg font-mono font-bold">
                16 Ratified Records
              </span>
              <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 rounded-lg font-mono font-bold">
                LEITI Verified
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">Freedom of Information Request:</div>
              <p className="mt-0.5">Need certified paper copies of concession maps or statutory instruments? Contact the Secretariat Records Desk at Zwedru City Hall.</p>
            </div>
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">Community FPIC Protection:</div>
              <p className="mt-0.5">Under the Land Rights Act 2018, customary communities hold sovereignty over ancestral lands; no concession is valid without prior written community consent.</p>
            </div>
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">Secretariat Ingestion Desk:</div>
              <p className="mt-0.5">Newly ratified concessions, FDA harvesting permits, or mining licenses can be ingested directly by Secretariat Auditors for permanent cataloging.</p>
            </div>
          </div>
        </div>

      </div>

      {/* FULL CONTRACT INSPECTION MODAL */}
      {activeModalDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Top Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50 dark:bg-slate-950/80">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5 shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      {activeModalDoc.concessionCode || 'STATUTORY CONTRACT'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {activeModalDoc.docType}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      LEITI Open Record
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {activeModalDoc.title}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activeModalDoc.projectName} • {activeModalDoc.sector} • Filing Date: {activeModalDoc.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDownload(activeModalDoc)}
                  className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
                  title="Download contract text file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>
                <button
                  onClick={() => setActiveModalDoc(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Tab Switcher */}
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950 px-4 pt-2 space-x-2">
              <button
                onClick={() => setActiveTab('clauses')}
                className={`px-3 py-2 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
                  activeTab === 'clauses'
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Enforceable Clauses ({activeModalDoc.keyClauses?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('fulltext')}
                className={`px-3 py-2 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
                  activeTab === 'fulltext'
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Full Statutory Agreement Text</span>
              </button>

              <button
                onClick={() => setActiveTab('metadata')}
                className={`px-3 py-2 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
                  activeTab === 'metadata'
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Parties &amp; Legal Authorities</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-700 dark:text-slate-300">
              
              {/* Tab 1: Enforceable Clauses */}
              {activeTab === 'clauses' && (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-900 dark:text-emerald-200 flex items-start space-x-2.5">
                    <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Key Enforceable Covenants Summary:</span> These clauses govern community employment quotas, royalty payments, local vendor preferences, and environmental safeguards legally enforceable under Liberian law.
                    </div>
                  </div>

                  {activeModalDoc.keyClauses && activeModalDoc.keyClauses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {activeModalDoc.keyClauses.map((clause, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2 hover:border-emerald-400 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-emerald-800 dark:text-emerald-400 font-mono text-[11px]">
                              {clause.article}
                            </span>
                            <span className="text-[10px] uppercase font-black bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded">
                              Binding Obligation
                            </span>
                          </div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm">
                            {clause.title}
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-xs">
                            {clause.summary}
                          </p>
                          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-[11px] font-mono text-slate-800 dark:text-slate-200">
                            <span className="text-slate-400 block mb-1 uppercase text-[9px] font-bold tracking-wider">Statutory Text Extraction:</span>
                            {clause.statutoryDetail}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-400">
                      No standalone clause extractions available. View the full contract text tab to review the complete statutory agreement.
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Full Contract Text */}
              {activeTab === 'fulltext' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
                      Official Transcribed Document Text
                    </span>
                    <button
                      onClick={() => copyModalContractText(activeModalDoc)}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg flex items-center space-x-1 font-semibold text-[11px] transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedNotice ? 'Copied to Clipboard!' : 'Copy Entire Text'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-slate-100 dark:bg-black dark:text-slate-200 p-4 sm:p-5 rounded-xl font-mono text-[11px] leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-[50vh] border border-slate-800">
                    {activeModalDoc.fullContractText || generateDocumentText(activeModalDoc)}
                  </pre>
                </div>
              )}

              {/* Tab 3: Metadata & Legal Authority */}
              {activeTab === 'metadata' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Document Code</span>
                      <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                        {activeModalDoc.concessionCode || 'GG-DOC-' + activeModalDoc.id.toUpperCase()}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Ratification Status</span>
                      <div className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                        {activeModalDoc.ratificationStatus || 'Ratified by Legislature'}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1 sm:col-span-2">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Contracting Parties</span>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">
                        {activeModalDoc.parties || 'Republic of Liberia & Stakeholders'}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1 sm:col-span-2">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Statutory Authority &amp; Legal Precedent</span>
                      <div className="text-slate-800 dark:text-slate-200 text-xs">
                        {activeModalDoc.statutoryBasis || 'Minerals and Mining Law of 2000, Freedom of Information Act 2010, LEITI Act 2009.'}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1 sm:col-span-2">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Summary Statement</span>
                      <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                        {activeModalDoc.summary}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Verified LEITI &amp; GGCDC Permanent Record</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyModalContractText(activeModalDoc)}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg text-xs transition-colors flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedNotice ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  onClick={printModalContract}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg text-xs transition-colors flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  onClick={() => handleDownload(activeModalDoc)}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-all shadow-sm flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full Contract (.txt)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
