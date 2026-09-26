import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  PlusCircle, 
  CheckCircle2, 
  Globe, 
  ShieldCheck,
  Landmark
} from 'lucide-react';
import { useApp } from '../utils/context';

export const ExpertsNetwork: React.FC = () => {
  const { experts, nominateExpert } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [showNominateModal, setShowNominateModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    primaryDiscipline: 'Natural Resources Law & Concessions',
    highestDegree: '',
    institution: '',
    location: '',
    workingGroupAssigned: 'Putu Mining & Development Working Group',
    specializationArea: '',
    biographySnippet: '',
    yearsOfExperience: 10
  });

  const disciplines = [
    'All',
    'Law',
    'Mining',
    'Forest Ecology',
    'Infrastructure',
    'Agriculture',
    'Public Health'
  ];

  const filteredExperts = experts.filter((exp) => {
    const matchesDisc = selectedDiscipline === 'All' || exp.primaryDiscipline.toLowerCase().includes(selectedDiscipline.toLowerCase());
    const matchesSearch = exp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exp.specializationArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exp.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDisc && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nominateExpert({
      fullName: formData.fullName,
      primaryDiscipline: formData.primaryDiscipline,
      highestDegree: formData.highestDegree,
      institution: formData.institution,
      location: formData.location,
      workingGroupAssigned: formData.workingGroupAssigned,
      specializationArea: formData.specializationArea,
      biographySnippet: formData.biographySnippet,
      yearsOfExperience: Number(formData.yearsOfExperience)
    });
    setShowNominateModal(false);
  };

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-[85vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Institutional Knowledge Asset</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              GGCDC Technical & Professional Advisory Network
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1">
              Aligned with President Poah's GGAA initiative. Mobilizing Grand Gedeh's engineers, lawyers, geologists, 
              economists, and scientists into organized technical taskforces for county governance.
            </p>
          </div>

          <button
            onClick={() => setShowNominateModal(true)}
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-lg transition-colors self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nominate / Join Advisory Roster</span>
          </button>
        </div>

        {/* President Poah Pronouncement Callout Banner */}
        <div className="bg-gradient-to-r from-amber-50 via-white to-emerald-50 dark:from-amber-950/40 dark:via-slate-900 dark:to-emerald-950/40 border border-amber-300 dark:border-amber-500/40 rounded-xl p-4 mb-8 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm block">President Poah GGAA Diaspora Engagement Alignment</span>
              <span className="text-slate-600 dark:text-slate-300">
                Grand Gedeh expertise stops being scattered across WhatsApp groups and countries. It becomes an institutional asset.
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full font-mono text-[11px] border border-emerald-300 dark:border-emerald-700 font-semibold">
              18 Technical Disciplines
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search experts by name, specialty, institution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {disciplines.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDiscipline(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDiscipline === d
                    ? 'bg-emerald-600 text-white font-semibold shadow'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded">
                    {exp.primaryDiscipline}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {exp.yearsOfExperience} Yrs Exp
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                  {exp.fullName}
                </h3>
                
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{exp.highestDegree}</span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                  <span className="truncate">{exp.location}</span>
                </div>

                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg text-xs space-y-1">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Specialization Area:</div>
                  <div className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{exp.specializationArea}</div>
                </div>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {exp.biographySnippet}
                </p>
              </div>

              {/* Card Footer: Working Group Assignment */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Working Group Desk:</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300 truncate max-w-[200px] block">
                    {exp.workingGroupAssigned}
                  </span>
                </div>
                <span className="inline-flex items-center space-x-1 text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Nominate Expert */}
        {showNominateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-900 dark:text-white">
              <button
                onClick={() => setShowNominateModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                <span>Technical & Professional Network Roster</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Nominate or Join the Advisory Network
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 mb-6">
                Help populate GGCDC's standing advisory committees across law, mining, environment, economics, and infrastructure.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Expert Full Name & Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cllr. Saydee Momolu Krahn / Dr. Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Primary Discipline</label>
                    <select
                      value={formData.primaryDiscipline}
                      onChange={(e) => setFormData({ ...formData, primaryDiscipline: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Natural Resources Law & Concessions">Natural Resources Law & Concessions</option>
                      <option value="Mining Engineering & Mineral Economics">Mining Engineering & Mineral Economics</option>
                      <option value="Forest Ecology & Carbon Finance">Forest Ecology & Carbon Finance</option>
                      <option value="Transportation & Civil Infrastructure">Transportation & Civil Infrastructure</option>
                      <option value="Agricultural Economics & Agribusiness">Agricultural Economics & Agribusiness</option>
                      <option value="Public Health & Environmental Epidemiology">Public Health & Environmental Epidemiology</option>
                      <option value="GIS & Cadastral Mapping">GIS & Cadastral Mapping</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Highest Academic Degree</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. LL.M. / Ph.D. / M.Sc."
                      value={formData.highestDegree}
                      onChange={(e) => setFormData({ ...formData, highestDegree: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Current Institution / Affiliation</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. University of Liberia / Private Practice"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Current Location (City & Country)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Monrovia, Liberia (or Diaspora)"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">Specialization Area & Relevant Experience</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe specific advisory experience, publications, or technical project leadership..."
                    value={formData.biographySnippet}
                    onChange={(e) => setFormData({ ...formData, biographySnippet: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNominateModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow"
                  >
                    Submit for Council Accreditation
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
