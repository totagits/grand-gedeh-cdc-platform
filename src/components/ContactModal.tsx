import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Building2, 
  Globe, 
  CheckCircle2,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useApp } from '../utils/context';

export const ContactModal: React.FC = () => {
  const { isContactModalOpen, setIsContactModalOpen } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Public Inquiry',
    subject: '',
    message: ''
  });

  if (!isContactModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsContactModalOpen(false);
            setSubmitted(false);
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
            <Compass className="w-3.5 h-3.5" />
            <span>Official Communications Directorate</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Contact the GGCDC Secretariat
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Reach out to our county headquarters in Zwedru, national liaison desks, or diaspora coordination offices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Office Directory (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Zwedru HQ */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>County Secretariat Headquarters</span>
              </div>
              <p className="text-xs text-slate-300">
                Commercial Avenue, Zwedru City<br />
                Grand Gedeh County, Republic of Liberia
              </p>
              <div className="pt-2 text-xs space-y-1 text-slate-400 border-t border-slate-800/60">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+231 776 550 120 / +231 886 420 310</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>secretariat@ggcdc.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mon – Fri: 8:30 AM – 5:00 PM GMT</span>
                </div>
              </div>
            </div>

            {/* National & Diaspora Liaison */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Monrovia Liaison Desk</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  12th Street, Sinkor, Monrovia, Liberia<br />
                  Email: monrovia.desk@ggcdc.org
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60">
                <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>Diaspora Coordination (USA & Global)</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Philadelphia, PA & Minneapolis, MN, USA<br />
                  Email: diaspora@ggcdc.org
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form (Right 3 cols) */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-emerald-950/40 border border-emerald-600 rounded-2xl p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-900/60 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Transmitted</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                  Thank you for contacting the Grand Gedeh Citizens Development Council. Your submission has been assigned tracking code <strong className="text-amber-400">GG-INQ-{Math.floor(1000 + Math.random() * 9000)}</strong> and routed to the Secretariat Desk in Zwedru.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Samuel B. Gbayee"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. s.gbayee@example.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+231 776 000 000"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option>General Public Inquiry</option>
                      <option>Concession & Putu Working Group</option>
                      <option>Enterprise / Supplier Registration</option>
                      <option>Workforce & Diaspora Accreditation</option>
                      <option>Customary Community Rights & Grievance</option>
                      <option>Media & Public Disclosures</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your inquiry"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide full details or questions for the Secretariat team..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-md flex items-center space-x-2 transition-all hover:scale-105"
                  >
                    <span>Transmit Message to Secretariat</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
