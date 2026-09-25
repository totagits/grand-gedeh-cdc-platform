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
  UploadedCredential
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

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
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

  return (
    <AppContext.Provider value={{
      currentRole,
      setCurrentRole,
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
