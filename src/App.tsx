import React from 'react';
import { AppProvider, useApp } from './utils/context';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { PillarsOverview } from './components/PillarsOverview';
import { GisMapViewer } from './components/GisMapViewer';
import { ConcessionRegistry } from './components/ConcessionRegistry';
import { CommitmentsTracker } from './components/CommitmentsTracker';
import { BusinessRegistry } from './components/BusinessRegistry';
import { WorkforceRegistry } from './components/WorkforceRegistry';
import { CommunityRegistry } from './components/CommunityRegistry';
import { ConsultationCenter } from './components/ConsultationCenter';
import { ExpertsNetwork } from './components/ExpertsNetwork';
import { WorkingGroupWorkspace } from './components/WorkingGroupWorkspace';
import { OpportunitiesHub } from './components/OpportunitiesHub';
import { DocumentRepository } from './components/DocumentRepository';
import { InstitutionalGovernance } from './components/InstitutionalGovernance';
import { SecretariatVerificationDesk } from './components/SecretariatVerificationDesk';
import { SignInModal } from './components/SignInModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  PanelLeft
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    setSelectedProjectId, 
    isSignedIn, 
    currentUser, 
    isSidebarOpen, 
    toggleSidebar,
    setIsSignInModalOpen 
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white transition-colors">
      <Navbar />

      {/* Main Workspace with Role-Based Sidebar */}
      <div className="flex-grow flex flex-row relative min-h-[calc(100vh-140px)]">
        
        {/* RBAC Collapsible Sidebar */}
        <Sidebar />

        {/* Primary Content Area */}
        <main className="flex-grow overflow-x-hidden min-w-0 flex flex-col">
          {activeView === 'home' && (
            <>
              <Hero />

              {/* Featured Focus: Putu Iron Ore Project in Perspective */}
              <section className="py-10 bg-gradient-to-r from-emerald-50/60 via-slate-50 to-amber-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-white dark:bg-slate-900/90 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-xs px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                      Flagship Case Study
                    </div>

                    <div className="max-w-3xl space-y-3">
                      <div className="flex items-center space-x-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                        <span>Mining & Extractives Directorate</span>
                        <span>•</span>
                        <span>Putu Mining & Development Working Group</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        The Putu Iron Ore Project: Setting the Standard for Accountable Development
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Putu represents Grand Gedeh's first major case study under the permanent GGCDC institutional model. 
                        Instead of reacting ad-hoc, GGCDC deploys legal review, environmental baseline monitoring, 
                        verified local hiring quotas, and transparent community fund escrow oversight—establishing 
                        a precedent that protects Grand Gedeh across all future natural resource projects.
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={() => {
                            setSelectedProjectId('proj-putu-iron');
                            setActiveView('concessions');
                          }}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-1.5 shadow"
                        >
                          <span>Open Putu Concession Record</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setActiveView('working-groups')}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-1.5 transition-colors"
                        >
                          <span>Putu Working Group Workspace</span>
                        </button>

                        <button
                          onClick={() => setActiveView('commitments')}
                          className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold ml-2"
                        >
                          View Putu 68 Tracked Commitments
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <PillarsOverview />

              {/* Quick Preview of GIS Map and Opportunities on Homepage */}
              <section className="py-14 bg-slate-100/70 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    
                    {/* Left: GIS Map Promo */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
                      <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-transparent px-3 py-1 rounded-full uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Countywide Spatial Atlas</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Explore the Interactive Grand Gedeh Development Map
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Visualize mining boundaries, community forests along the Grebo-Krahn corridor, 
                        paved road progress from Ganta to Zwedru, health clinics, and the 225kV CLSG substation.
                      </p>
                      <button
                        onClick={() => setActiveView('gismap')}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow"
                      >
                        <span>Launch Interactive GIS Map</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>

                    {/* Right: Local Business & Skills Promo */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
                      <div className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-transparent px-3 py-1 rounded-full uppercase tracking-wider">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Local Content & Economic Inclusion</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Verified Grand Gedeh Supplier & Workforce Directories
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Ensure concession procurement and employment flows directly to qualified Grand Gedeh 
                        enterprises and certified operators. Calculate labor gaps with our empirical modeler.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          onClick={() => setActiveView('businesses')}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors"
                        >
                          Supplier Registry
                        </button>
                        <button
                          onClick={() => setActiveView('workforce')}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg shadow"
                        >
                          Skills Gap Calculator
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </>
          )}

          {activeView === 'gismap' && <GisMapViewer />}
          {activeView === 'concessions' && <ConcessionRegistry />}
          {activeView === 'commitments' && <CommitmentsTracker />}
          {activeView === 'businesses' && <BusinessRegistry />}
          {activeView === 'workforce' && <WorkforceRegistry />}
          {activeView === 'communities' && <CommunityRegistry />}
          {activeView === 'consultations' && <ConsultationCenter />}
          {activeView === 'experts' && <ExpertsNetwork />}
          {activeView === 'working-groups' && <WorkingGroupWorkspace />}
          {activeView === 'opportunities' && <OpportunitiesHub />}
          {activeView === 'documents' && <DocumentRepository />}
          {(activeView === 'governance' || activeView === 'about') && <InstitutionalGovernance />}
          {activeView === 'verification' && <SecretariatVerificationDesk />}
        </main>
      </div>

      <Footer />

      {/* RBAC Sign In & Persona Selector Modal */}
      <SignInModal />

      {/* Official Secretariat Contact Modal */}
      <ContactModal />

      {/* Floating RBAC Pill for Quick Role Switching */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          onClick={() => setIsSignInModalOpen(true)}
          className="bg-white/95 hover:bg-slate-100 text-slate-800 border border-slate-300 dark:bg-slate-900/95 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-amber-500/80 px-3.5 py-2 rounded-full shadow-xl flex items-center space-x-2 text-xs backdrop-blur-md transition-transform hover:scale-105"
          title="Switch RBAC Persona or View Role Access"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-bold text-amber-600 dark:text-amber-400">
            {isSignedIn && currentUser ? currentUser.role.toUpperCase() : 'PORTAL'}
          </span>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 font-semibold">
            {isSignedIn ? 'Switch Role' : 'Sign In'}
          </span>
        </button>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
