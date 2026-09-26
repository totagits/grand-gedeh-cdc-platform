import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  UserRole, 
  ConcessionProject, 
  CommitmentRecord, 
  BusinessSupplier, 
  WorkforceProfile, 
  CommunityProfile, 
  ConsultationItem, 
  TechnicalExpert, 
  WorkingGroup, 
  DocumentItem, 
  OpportunityItem,
  UploadedCredential,
  AuthenticatedUser
} from '../types';
import { 
  CONCESSIONS_DATA, 
  COMMITMENTS_DATA, 
  BUSINESSES_DATA, 
  WORKFORCE_DATA, 
  COMMUNITIES_DATA, 
  CONSULTATIONS_DATA, 
  EXPERTS_DATA, 
  WORKING_GROUPS_DATA, 
  DOCUMENTS_DATA, 
  OPPORTUNITIES_DATA 
} from '../data/mockData';

export const DEMO_USERS: Record<UserRole, AuthenticatedUser> = {
  secretariat: {
    id: 'user-sec-01',
    name: 'Hon. Emmanuel Clarke',
    email: 'e.clarke@ggcdc.org',
    role: 'secretariat',
    title: 'Chief Verification & Compliance Officer',
    organization: 'GGCDC Permanent Secretariat, Zwedru',
    department: 'Accreditation & Legal Directorate',
    badgeLabel: 'Secretariat Officer'
  },
  business: {
    id: 'user-biz-01',
    name: 'Kollie Mensah',
    email: 'kmensah@zwedru-engineering.com',
    role: 'business',
    title: 'Managing Director & Founder',
    organization: 'Zwedru Engineering & Heavy Civil Works Ltd.',
    department: 'Commercial Contractors Guild',
    badgeLabel: 'Accredited Supplier'
  },
  worker: {
    id: 'user-wrk-01',
    name: 'Jackson K. Doe',
    email: 'jdoe.operator@gmail.com',
    role: 'worker',
    title: 'Master Heavy Equipment Operator & Certified TVET Specialist',
    organization: 'Grand Gedeh Workforce Guild',
    department: 'Mining Operations & Earthmoving',
    badgeLabel: 'Certified Artisan'
  },
  expert: {
    id: 'user-exp-01',
    name: 'Dr. Florence Gaye',
    email: 'fgaye.phd@earth-hydrology.org',
    role: 'expert',
    title: 'Senior Mining Hydrologist & Diaspora Fellow',
    organization: 'Grand Gedeh Technical Advisory Network',
    department: 'Environment & Tailings Management',
    badgeLabel: 'Advisory Fellow'
  },
  community_rep: {
    id: 'user-com-01',
    name: 'Elder Gbarbo Tarpeh',
    email: 'elder.tarpeh@putu-clan.org',
    role: 'community_rep',
    title: 'Customary Land Council Chair',
    organization: 'Putu Customary Community Assembly',
    department: 'Traditional Leadership Council',
    badgeLabel: 'Customary Elder'
  },
  investor: {
    id: 'user-inv-01',
    name: 'Marcus Vance',
    email: 'm.vance@putu-mining.com',
    role: 'investor',
    title: 'VP of Concession Operations & Government Relations',
    organization: 'Putu Iron Ore Mining Corp',
    department: 'Executive Concession Liaison',
    badgeLabel: 'Concessionaire'
  },
  citizen: {
    id: 'user-cit-01',
    name: 'Evelyn Gaye',
    email: 'evelyn.gaye@zwedru.lr',
    role: 'citizen',
    title: 'Youth Development Representative',
    organization: 'Grand Gedeh Civic Forum, Zwedru City',
    department: 'Public Advocacy',
    badgeLabel: 'Citizen'
  }
};

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: AuthenticatedUser | null;
  isSignedIn: boolean;
  login: (role: UserRole, customUser?: Partial<AuthenticatedUser>) => void;
  logout: () => void;
  
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (open: boolean) => void;

  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;

  activeView: string;
  setActiveView: (view: string) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedCommunityId: string | null;
  setSelectedCommunityId: (id: string | null) => void;
  selectedWorkingGroupId: string | null;
  setSelectedWorkingGroupId: (id: string | null) => void;
  
  concessions: ConcessionProject[];
  commitments: CommitmentRecord[];
  businesses: BusinessSupplier[];
  workforce: WorkforceProfile[];
  communities: CommunityProfile[];
  consultations: ConsultationItem[];
  experts: TechnicalExpert[];
  workingGroups: WorkingGroup[];
  documents: DocumentItem[];
  opportunities: OpportunityItem[];
  
  registerBusiness: (business: Omit<BusinessSupplier, 'id' | 'trackingNumber' | 'verifiedLocal' | 'verificationStatus' | 'registrationDate'> & { uploadedCredentials?: UploadedCredential[] }) => string;
  registerWorkforce: (profile: Omit<WorkforceProfile, 'id' | 'trackingNumber' | 'verificationStatus'> & { uploadedCredentials?: UploadedCredential[] }) => string;
  submitConsultation: (consultationId: string, concern: string, authorName: string, community: string) => void;
  nominateExpert: (expert: Omit<TechnicalExpert, 'id' | 'accreditationStatus'>) => void;
  
  // Secretariat Verification Actions
  updateBusinessVerification: (id: string, status: BusinessSupplier['verificationStatus'], notes: string, auditor: string) => void;
  updateWorkforceVerification: (id: string, status: WorkforceProfile['verificationStatus'], notes: string, auditor: string) => void;
  verifyCredentialDoc: (entityType: 'business' | 'workforce', entityId: string, credId: string, status: UploadedCredential['status'], notes?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('citizen');
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [selectedWorkingGroupId, setSelectedWorkingGroupId] = useState<string | null>(null);

  const [concessions] = useState<ConcessionProject[]>(CONCESSIONS_DATA);
  const [commitments] = useState<CommitmentRecord[]>(COMMITMENTS_DATA);
  const [businesses, setBusinesses] = useState<BusinessSupplier[]>(BUSINESSES_DATA);
  const [workforce, setWorkforce] = useState<WorkforceProfile[]>(WORKFORCE_DATA);
  const [communities] = useState<CommunityProfile[]>(COMMUNITIES_DATA);
  const [consultations, setConsultations] = useState<ConsultationItem[]>(CONSULTATIONS_DATA);
  const [experts, setExperts] = useState<TechnicalExpert[]>(EXPERTS_DATA);
  const [workingGroups] = useState<WorkingGroup[]>(WORKING_GROUPS_DATA);
  const [documents] = useState<DocumentItem[]>(DOCUMENTS_DATA);
  const [opportunities] = useState<OpportunityItem[]>(OPPORTUNITIES_DATA);

  const registerBusiness = (businessData: Omit<BusinessSupplier, 'id' | 'trackingNumber' | 'verifiedLocal' | 'verificationStatus' | 'registrationDate'> & { uploadedCredentials?: UploadedCredential[] }): string => {
    const trackingNum = `GG-BIZ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newBiz: BusinessSupplier = {
      ...businessData,
      id: `biz-${Date.now()}`,
      trackingNumber: trackingNum,
      verifiedLocal: false,
      verificationStatus: 'Pending Secretarial Audit',
      registrationDate: new Date().toISOString().split('T')[0],
      uploadedCredentials: businessData.uploadedCredentials || []
    };
    setBusinesses(prev => [newBiz, ...prev]);
    return trackingNum;
  };

  const registerWorkforce = (profileData: Omit<WorkforceProfile, 'id' | 'trackingNumber' | 'verificationStatus'> & { uploadedCredentials?: UploadedCredential[] }): string => {
    const trackingNum = `GG-TALENT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newProfile: WorkforceProfile = {
      ...profileData,
      id: `wf-${Date.now()}`,
      trackingNumber: trackingNum,
      verificationStatus: 'Pending Secretarial Audit',
      uploadedCredentials: profileData.uploadedCredentials || []
    };
    setWorkforce(prev => [newProfile, ...prev]);
    return trackingNum;
  };

  const submitConsultation = (consultationId: string, _concern: string, _authorName: string, _community: string) => {
    setConsultations(prev => prev.map(c => {
      if (c.id === consultationId) {
        return {
          ...c,
          submissionCount: c.submissionCount + 1
        };
      }
      return c;
    }));
  };

  const nominateExpert = (expertData: Omit<TechnicalExpert, 'id' | 'accreditationStatus'>) => {
    const newExp: TechnicalExpert = {
      ...expertData,
      id: `exp-${Date.now()}`,
      accreditationStatus: 'Nominated'
    };
    setExperts(prev => [newExp, ...prev]);
  };

  const updateBusinessVerification = (id: string, status: BusinessSupplier['verificationStatus'], notes: string, auditor: string) => {
    setBusinesses(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          verificationStatus: status,
          verifiedLocal: status === 'Approved & Accredited',
          secretariatAuditNotes: notes,
          accreditedBy: auditor
        };
      }
      return b;
    }));
  };

  const updateWorkforceVerification = (id: string, status: WorkforceProfile['verificationStatus'], notes: string, auditor: string) => {
    setWorkforce(prev => prev.map(w => {
      if (w.id === id) {
        return {
          ...w,
          verificationStatus: status,
          secretariatAuditNotes: notes,
          accreditedBy: auditor
        };
      }
      return w;
    }));
  };

  const verifyCredentialDoc = (entityType: 'business' | 'workforce', entityId: string, credId: string, status: UploadedCredential['status'], notes?: string) => {
    if (entityType === 'business') {
      setBusinesses(prev => prev.map(b => {
        if (b.id === entityId) {
          return {
            ...b,
            uploadedCredentials: b.uploadedCredentials.map(c => {
              if (c.id === credId) {
                return { ...c, status, verificationNotes: notes, verifiedBy: 'GGCDC Secretariat' };
              }
              return c;
            })
          };
        }
        return b;
      }));
    } else {
      setWorkforce(prev => prev.map(w => {
        if (w.id === entityId) {
          return {
            ...w,
            uploadedCredentials: w.uploadedCredentials.map(c => {
              if (c.id === credId) {
                return { ...c, status, verificationNotes: notes, verifiedBy: 'GGCDC Secretariat' };
              }
              return c;
            })
          };
        }
        return w;
      }));
    }
  };

  const login = (role: UserRole, customUser?: Partial<AuthenticatedUser>) => {
    const base = DEMO_USERS[role] || DEMO_USERS.citizen;
    const user: AuthenticatedUser = {
      ...base,
      ...customUser,
      role
    };
    setCurrentRole(role);
    setCurrentUser(user);
    setIsSignedIn(true);
    setIsSidebarOpen(true);
    setIsSignInModalOpen(false);
  };

  const logout = () => {
    setIsSignedIn(false);
    setCurrentUser(null);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider value={{
      currentRole,
      setCurrentRole,
      currentUser,
      isSignedIn,
      login,
      logout,
      isSidebarOpen,
      setIsSidebarOpen,
      toggleSidebar,
      isSignInModalOpen,
      setIsSignInModalOpen,
      isContactModalOpen,
      setIsContactModalOpen,
      activeView,
      setActiveView,
      selectedProjectId,
      setSelectedProjectId,
      selectedCommunityId,
      setSelectedCommunityId,
      selectedWorkingGroupId,
      setSelectedWorkingGroupId,
      concessions,
      commitments,
      businesses,
      workforce,
      communities,
      consultations,
      experts,
      workingGroups,
      documents,
      opportunities,
      registerBusiness,
      registerWorkforce,
      submitConsultation,
      nominateExpert,
      updateBusinessVerification,
      updateWorkforceVerification,
      verifyCredentialDoc
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
