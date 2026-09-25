import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  CheckCircle, 
  ShieldCheck, 
  PlusCircle, 
  Phone, 
  MapPin, 
  Users, 
  Wrench,
  Award
} from 'lucide-react';
import { useApp } from '../utils/context';

export const BusinessRegistry: React.FC = () => {
  const { businesses, registerBusiness } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sector: 'Construction',
    ownership: '100% Grand Gedeh' as const,
    location: 'Zwedru City',
    servicesStr: '',
    contactPerson: '',
    contactPhone: '',
    legalStatus: 'LBR Registered' as const,
    taxStatus: 'LRA Tax Compliant' as const,
    workforceSize: 10,
    equipmentSummary: '',
    pastContractsStr: ''
  });

  const sectors = [
    'All',
    'Construction',
    'Transportation',
    'Fuel supply',
    'Catering',
    'ICT',
    'Security',
    'Environmental services',
    'Equipment rental'
  ];

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSector = selectedSector === 'All' || b.sector === selectedSector;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSector && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerBusiness({
      name: formData.name,
      sector: formData.sector,
      ownership: formData.ownership,
      location: formData.location,
      services: formData.servicesStr.split(',').map(s => s.trim()).filter(Boolean),
      contactPerson: formData.contactPerson,
      contactPhone: formData.contactPhone,
      legalStatus: formData.legalStatus,
      taxStatus: formData.taxStatus,
      workforceSize: Number(formData.workforceSize),
      equipmentSummary: formData.equipmentSummary,
      pastContracts: formData.pastContractsStr.split(',').map(s => s.trim()).filter(Boolean)
    });
    setShowRegisterModal(false);
    // Reset form
    setFormData({
      name: '',
      sector: 'Construction',
      ownership: '100% Grand Gedeh',
      location: 'Zwedru City',
      servicesStr: '',
      contactPerson: '',
      contactPhone: '',
      legalStatus: 'LBR Registered',
      taxStatus: 'LRA Tax Compliant',
      workforceSize: 10,
      equipmentSummary: '',
      pastContractsStr: ''
    });
  };

  return (
    <section className="py-12 bg-slate-900 text-slate-100 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Local Content & Enterprise Empowerment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Grand Gedeh Business & Supplier Registry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Connecting Putu, timber concessions, highway contractors, and commercial investors 
              with verified Grand Gedeh businesses capable of supplying goods, services, and works.
            </p>
          </div>

          <button
            onClick={() => setShowRegisterModal(true)}
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-lg transition-colors self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Your Enterprise</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search vendor name, capability, contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedSector === sec
                    ? 'bg-emerald-600 text-white font-semibold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 hover:border-emerald-600 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded">
                    {biz.sector}
                  </span>
                  {biz.verifiedLocal && (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-300 bg-emerald-950 border border-emerald-700 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Verified Local</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mt-1 leading-snug">
                  {biz.name}
                </h3>
                
                <div className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{biz.location}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-medium">{biz.ownership}</span>
                </div>

                {/* Services list */}
                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 block mb-1">Products & Services:</span>
                  <div className="flex flex-wrap gap-1">
                    {biz.services.map((svc, idx) => (
                      <span key={idx} className="bg-slate-900 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Capacity & Compliance */}
                <div className="mt-4 p-3 bg-slate-900/70 border border-slate-800 rounded-lg text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Legal Registration:</span>
                    <span className="text-emerald-400 font-medium">{biz.legalStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Tax Compliance:</span>
                    <span className="text-emerald-400 font-medium">{biz.taxStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Workforce Size:</span>
                    <span className="text-white font-medium">{biz.workforceSize} Personnel</span>
                  </div>
                  <div className="pt-1 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Equipment: </span>
                    <span>{biz.equipmentSummary}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Contact Person:</span>
                  <span className="font-semibold text-white">{biz.contactPerson}</span>
                </div>
                <a
                  href={`tel:${biz.contactPhone}`}
                  className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-700/60 px-2.5 py-1.5 rounded-lg flex items-center space-x-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Vendor</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Register Local Business */}
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Grand Gedeh Local Content Protocol</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Register Your Grand Gedeh Enterprise
              </h2>
              <p className="text-xs text-slate-300 mt-1 mb-6">
                Submitted businesses are verified by the GGCDC Local Content Directorate for concession procurement matchmaking.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Enterprise / Business Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zwedru Logistics & Aggregate Works"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Industrial Sector</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Construction">Construction & Civil Works</option>
                      <option value="Transportation">Transportation & Logistics</option>
                      <option value="Fuel supply">Fuel & Petroleum Supply</option>
                      <option value="Catering">Catering & Food Provision</option>
                      <option value="ICT">ICT & Telecommunications</option>
                      <option value="Security">Security & Facility Protection</option>
                      <option value="Environmental services">Environmental & Sanitation</option>
                      <option value="Equipment rental">Heavy Equipment Rental</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Ownership Structure</label>
                    <select
                      value={formData.ownership}
                      onChange={(e) => setFormData({ ...formData, ownership: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="100% Grand Gedeh">100% Grand Gedeh Resident Owned</option>
                      <option value="Liberian Majority">Liberian Majority Owned</option>
                      <option value="Joint Venture">Joint Venture</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Town / District Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zwedru City Center"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Permanent Workforce Size</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.workforceSize}
                      onChange={(e) => setFormData({ ...formData, workforceSize: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Products / Services Offered (Comma-separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Road grading, Bridge culverts, Concrete casting, Fuel tanker delivery"
                    value={formData.servicesStr}
                    onChange={(e) => setFormData({ ...formData, servicesStr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Major Equipment & Facilities Owned</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 CAT Excavators, 3 Tipper Dump Trucks, Cold storage facility"
                    value={formData.equipmentSummary}
                    onChange={(e) => setFormData({ ...formData, equipmentSummary: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Contact Person</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eng. Emmanuel Gaye"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+231 770 000 000"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow"
                  >
                    Submit Enterprise for Verification
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
