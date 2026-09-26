import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UserRole, 
  ConcessionProject, 
  ConcessionInputData,
  NewCommitmentInputData,
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
  AuthenticatedUser,
  NotificationDispatchRecord,
  NotificationEventType
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

export const INITIAL_NOTIFICATIONS: NotificationDispatchRecord[] = [
  {
    id: 'notif-001',
    recipientName: 'Jackson Glaydor Krahn',
    recipientPhone: '+231 770 412 889',
    recipientEmail: 'jdoe.operator@gmail.com',
    entityType: 'workforce',
    entityId: 'wf-001',
    trackingNumber: 'GG-TALENT-2026-001',
    eventType: 'Secretariat Approved & Accredited',
    smsMessage: 'GGCDC-GOV: Jackson Glaydor Krahn, your Class-A Operator profile is ACCREDITED for Putu Iron Ore Concession direct-hire under Sec 11 MDA. Ref: GG-TALENT-2026-001. View letter: https://totagits.github.io/grand-gedeh-cdc-platform/',
    emailSubject: '[OFFICIAL GGCDC NOTICE] Concession Direct-Hire Recommendation Approved - Ref: GG-TALENT-2026-001',
    emailBody: 'Dear Jackson Glaydor Krahn,\n\nThe GGCDC Technical Secretariat has completed audit of your credentials and formally approved your placement on the Grand Gedeh Concession Direct-Hire Roster under Section 11 of the Putu MDA.\n\nDispatch Reference: GG-TALENT-2026-001\nTrade: Heavy Equipment Operator\nAccredited by: GGCDC Technical Secretariat\n\nYour official Recommendation Letter has been dispatched to Putu Iron Ore Mining Inc. HR.',
    timestamp: '2026-09-24 14:32 GMT',
    gatewayStatus: 'Delivered via Orange/Lonestar GSM',
    verificationUrl: 'https://totagits.github.io/grand-gedeh-cdc-platform/'
  },
  {
    id: 'notif-002',
    recipientName: 'Zwedru Engineering & Heavy Civil Works Ltd.',
    recipientPhone: '+231 770 412 889',
    recipientEmail: 'info@zwedru-engineering.lr',
    entityType: 'business',
    entityId: 'biz-001',
    trackingNumber: 'GG-BIZ-2026-001',
    eventType: 'Tender Prequalification Issued',
    smsMessage: 'GGCDC-GOV: Zwedru Engineering Ltd is ACCREDITED as Tier 1 Local Contractor under Sec 13 Putu MDA. Prequalified for Camp Infrastructure Tenders. Ref: GG-BIZ-2026-001. Verify: https://totagits.github.io/grand-gedeh-cdc-platform/',
    emailSubject: '[OFFICIAL GGCDC NOTICE] Certificate of Beneficial Ownership & Prequalification Approved - Ref: GG-BIZ-2026-001',
    emailBody: 'To the Management of Zwedru Engineering & Heavy Civil Works Ltd.,\n\nFollowing forensic audit of your corporate filings and operational yard, GGCDC has officially issued your Certificate of Grand Gedean Beneficial Ownership & Contractor Prequalification.\n\nClassification: Tier 1 Priority (100% Grand Gedean Owned)\nAudit Ref: GG-BIZ-2026-001\nAuthorized Sectors: Civil Engineering, Earthmoving & Camp Works.',
    timestamp: '2026-09-25 09:15 GMT',
    gatewayStatus: 'Delivered via Orange/Lonestar GSM',
    verificationUrl: 'https://totagits.github.io/grand-gedeh-cdc-platform/'
  },
  {
    id: 'notif-003',
    recipientName: 'Monrovia Consolidated Logistics Ltd.',
    recipientPhone: '+231 886 521 900',
    recipientEmail: 'compliance@monrovia-logistics.lr',
    entityType: 'business',
    entityId: 'biz-007',
    trackingNumber: 'GG-BIZ-2026-089',
    eventType: 'Application Denied & Disqualified',
    smsMessage: 'GGCDC-GOV NOTICE: Application for Monrovia Consolidated Logistics was DISQUALIFIED. Grounds: Failed Sec 13 Beneficial Ownership Mandate (<51% Grand Gedean ownership). Appeal within 14 days at Zwedru Admin Complex. Ref: GG-BIZ-2026-089',
    emailSubject: '[OFFICIAL GGCDC DISQUALIFICATION ORDER] Status: Denied & Disqualified - Monrovia Consolidated Logistics Ltd.',
    emailBody: 'OFFICIAL SECRETARIAT DISQUALIFICATION ORDER\n\nEnterprise: Monrovia Consolidated Logistics Ltd.\nTracking Ref: GG-BIZ-2026-089\nDecision: Denied & Disqualified from Local Content Prequalification\n\nAdministrative Grounds & Audit Findings:\nForensic inspection of Articles of Incorporation and corporate registry reveals 0% Grand Gedean beneficial ownership and lack of verified permanent operational base in Grand Gedeh County. Disqualified pursuant to Section 13 of Putu MDA and Section 44 of the PPCA.\n\nAppeals Process:\nIf you believe this decision was rendered in error, a formal Petition for Reconsideration may be lodged with the GGCDC Secretariat Review Board within 14 working days at the Zwedru Administrative Complex.',
    timestamp: '2026-09-25 11:20 GMT',
    gatewayStatus: 'Delivered via Orange/Lonestar GSM',
    verificationUrl: 'https://totagits.github.io/grand-gedeh-cdc-platform/'
  }
];

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

  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (open: boolean) => void;

  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;

  isConcessionModalOpen: boolean;
  setIsConcessionModalOpen: (open: boolean) => void;

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
  
  addConcession: (
    concessionData: ConcessionInputData, 
    customCommitments?: NewCommitmentInputData[]
  ) => ConcessionProject;
  registerBusiness: (business: Omit<BusinessSupplier, 'id' | 'trackingNumber' | 'verifiedLocal' | 'verificationStatus' | 'registrationDate'> & { uploadedCredentials?: UploadedCredential[] }) => BusinessSupplier;
  registerWorkforce: (profile: Omit<WorkforceProfile, 'id' | 'trackingNumber' | 'verificationStatus'> & { uploadedCredentials?: UploadedCredential[] }) => WorkforceProfile;
  submitConsultation: (consultationId: string, concern: string, authorName: string, community: string) => void;
  nominateExpert: (expert: Omit<TechnicalExpert, 'id' | 'accreditationStatus'>) => void;
  
  // Secretariat Verification Actions
  updateBusinessVerification: (id: string, status: BusinessSupplier['verificationStatus'], notes: string, auditor: string) => void;
  updateWorkforceVerification: (id: string, status: WorkforceProfile['verificationStatus'], notes: string, auditor: string) => void;
  verifyCredentialDoc: (entityType: 'business' | 'workforce', entityId: string, credId: string, status: UploadedCredential['status'], notes?: string) => void;

  // SMS & Official Email Transparency Dispatch
  notifications: NotificationDispatchRecord[];
  sendDispatchNotification: (record: Omit<NotificationDispatchRecord, 'id' | 'timestamp' | 'gatewayStatus' | 'verificationUrl'> & Partial<NotificationDispatchRecord>) => NotificationDispatchRecord;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('citizen');
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ggcdc_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light'; // Light theme is default!
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ggcdc_theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (t: 'light' | 'dark') => {
    setThemeState(t);
  };

  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isConcessionModalOpen, setIsConcessionModalOpen] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [selectedWorkingGroupId, setSelectedWorkingGroupId] = useState<string | null>(null);

  const [concessions, setConcessions] = useState<ConcessionProject[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ggcdc_concessions');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved concessions', e);
      }
    }
    return CONCESSIONS_DATA;
  });

  const [commitments, setCommitments] = useState<CommitmentRecord[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ggcdc_commitments');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved commitments', e);
      }
    }
    return COMMITMENTS_DATA;
  });

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ggcdc_concessions', JSON.stringify(concessions));
    }
  }, [concessions]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ggcdc_commitments', JSON.stringify(commitments));
    }
  }, [commitments]);

  const [businesses, setBusinesses] = useState<BusinessSupplier[]>(BUSINESSES_DATA);
  const [workforce, setWorkforce] = useState<WorkforceProfile[]>(WORKFORCE_DATA);
  const [communities] = useState<CommunityProfile[]>(COMMUNITIES_DATA);
  const [consultations, setConsultations] = useState<ConsultationItem[]>(CONSULTATIONS_DATA);
  const [experts, setExperts] = useState<TechnicalExpert[]>(EXPERTS_DATA);
  const [workingGroups] = useState<WorkingGroup[]>(WORKING_GROUPS_DATA);
  const [documents] = useState<DocumentItem[]>(DOCUMENTS_DATA);
  const [opportunities] = useState<OpportunityItem[]>(OPPORTUNITIES_DATA);
  const [notifications, setNotifications] = useState<NotificationDispatchRecord[]>(INITIAL_NOTIFICATIONS);

  const sendDispatchNotification = (record: Omit<NotificationDispatchRecord, 'id' | 'timestamp' | 'gatewayStatus' | 'verificationUrl'> & Partial<NotificationDispatchRecord>): NotificationDispatchRecord => {
    const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const fullRecord: NotificationDispatchRecord = {
      ...record,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      gatewayStatus: record.gatewayStatus || 'Delivered via Orange/Lonestar GSM',
      verificationUrl: record.verificationUrl || 'https://totagits.github.io/grand-gedeh-cdc-platform/'
    };
    setNotifications(prev => [fullRecord, ...prev]);
    return fullRecord;
  };

  const addConcession = (
    concessionData: ConcessionInputData, 
    customCommitments?: NewCommitmentInputData[]
  ): ConcessionProject => {
    const slug = concessionData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 20);
    const newId = concessionData.id || `proj-${slug || Date.now()}`;
    
    const newProject: ConcessionProject = {
      ...concessionData,
      id: newId,
      lat: concessionData.lat || 5.95,
      lng: concessionData.lng || -8.15,
      workingGroupId: concessionData.workingGroupId || (
        concessionData.sector === 'Mining & Extractives' ? 'wg-mining' :
        concessionData.sector === 'Forestry & Environment' ? 'wg-forestry' :
        concessionData.sector === 'Agriculture & Food Systems' ? 'wg-agriculture' : 'wg-infrastructure'
      ),
      agreements: concessionData.agreements?.length ? concessionData.agreements : [
        {
          title: `${concessionData.name} Agreement`,
          type: concessionData.sector === 'Mining & Extractives' ? 'Mineral Development Agreement (MDA)' :
                concessionData.sector === 'Forestry & Environment' ? 'Forestry Management Contract (FMC)' :
                'Concession Agreement',
          signedDate: new Date().toISOString().split('T')[0],
          status: 'Ratified by National Legislature & Signed by President'
        }
      ],
      commitmentsSummary: concessionData.commitmentsSummary || {
        employmentGoal: '70% Grand Gedean workforce quota within 24 months',
        localProcurementQuota: 'Mandatory Tier-1 local catering & civil haulage',
        socialDevFundAnnual: '$250,000 USD Annual CSDF Escrow Deposit',
        infrastructureItems: ['Feeder road maintenance', 'Community health post electrification'],
        environmentalObligations: ['EPA-compliant Environmental Social Impact Assessment (ESIA)', 'Quarterly ground water testing']
      }
    };

    setConcessions(prev => [newProject, ...prev]);

    // Build associated commitments
    const generatedCommitments: CommitmentRecord[] = [];

    if (customCommitments && customCommitments.length > 0) {
      customCommitments.forEach((c, idx) => {
        generatedCommitments.push({
          id: `cmt-${newId}-${idx + 1}`,
          projectId: newId,
          projectName: newProject.name,
          title: c.title,
          obligor: c.obligor || newProject.operator,
          beneficiary: c.beneficiary || `Grand Gedeh County / ${newProject.district}`,
          sector: c.sector || newProject.sector,
          sourceDoc: c.sourceDoc || `${newProject.name} Treaty`,
          clauseRef: c.clauseRef || `Section ${idx + 8}.1`,
          deadline: c.deadline || 'Statutory Annual',
          responsibleAgency: c.responsibleAgency || newProject.govCounterpart,
          location: c.location || newProject.district,
          monetaryValue: c.monetaryValue || 'Contractual Covenants',
          status: c.status || 'In Progress',
          evidence: c.evidence || 'Ratified Agreement on File with Secretariat',
          lastAudited: new Date().toISOString().split('T')[0],
          verificationNotes: c.verificationNotes || 'Ingested by GGCDC Secretariat upon legislative gazetting.'
        });
      });
    } else {
      // Auto-generate standard sovereign commitments from summary
      generatedCommitments.push({
        id: `cmt-${newId}-csdf`,
        projectId: newId,
        projectName: newProject.name,
        title: `Annual County Social Development Fund (CSDF) Escrow`,
        obligor: newProject.operator,
        beneficiary: `Grand Gedeh County Administrative Complex, Zwedru`,
        sector: newProject.sector,
        sourceDoc: `${newProject.name} Ratified Handbill`,
        clauseRef: 'Section 14: Social Development Contribution',
        deadline: 'Annual Statutory Schedule',
        responsibleAgency: 'Ministry of Finance & Development Planning (MFDP) / GGCDC Secretariat',
        location: newProject.district,
        monetaryValue: newProject.commitmentsSummary.socialDevFundAnnual,
        status: 'In Progress',
        evidence: 'Ratification Handbill / Joint Account Escrow Deposit Slip',
        lastAudited: new Date().toISOString().split('T')[0],
        verificationNotes: 'Baseline fiscal obligation established upon platform treaty ingestion.'
      });

      generatedCommitments.push({
        id: `cmt-${newId}-workforce`,
        projectId: newId,
        projectName: newProject.name,
        title: `Section 11 Local Labor & TVET Apprenticeship Quota`,
        obligor: newProject.operator,
        beneficiary: `Grand Gedeh Indigenes & TVET Graduates`,
        sector: newProject.sector,
        sourceDoc: `${newProject.name} Concession Agreement`,
        clauseRef: 'Section 11: Employment & Training of Citizens',
        deadline: 'Quarterly Staff Audit',
        responsibleAgency: 'Ministry of Labour (MOL) / GGCDC Labor Directorate',
        location: newProject.district,
        monetaryValue: 'Mandatory Non-Expatriate Quota',
        status: 'In Progress',
        evidence: 'Quarterly Personnel Payroll & Local Content Audit Roster',
        lastAudited: new Date().toISOString().split('T')[0],
        verificationNotes: `Target: ${newProject.commitmentsSummary.employmentGoal}`
      });

      if (newProject.commitmentsSummary.infrastructureItems?.length > 0) {
        generatedCommitments.push({
          id: `cmt-${newId}-infra`,
          projectId: newId,
          projectName: newProject.name,
          title: `Infrastructure Mandate: ${newProject.commitmentsSummary.infrastructureItems[0]}`,
          obligor: newProject.operator,
          beneficiary: `${newProject.district} Affected Communities`,
          sector: 'Infrastructure & Public Utilities',
          sourceDoc: `${newProject.name} Article 9 Infrastructure Accords`,
          clauseRef: 'Article 9: Social Infrastructure & Roads',
          deadline: 'Year 2 Operating Phase',
          responsibleAgency: 'Ministry of Public Works (MPW) / GGCDC Infrastructure Directorate',
          location: newProject.district,
          monetaryValue: 'Capital Expenditure Covenant',
          status: 'In Progress',
          evidence: 'Engineering Blueprint & MPW Environmental Clearance',
          lastAudited: new Date().toISOString().split('T')[0],
          verificationNotes: `Obligations: ${newProject.commitmentsSummary.infrastructureItems.join('; ')}`
        });
      }
    }

    setCommitments(prev => [...generatedCommitments, ...prev]);

    // Dispatch SMS & Email Notification to Secretariat & Public Ledger
    const trackingRef = `GG-CONCESSION-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    sendDispatchNotification({
      recipientName: 'GGCDC Permanent Secretariat & County Council',
      recipientPhone: '+231 770 412 889',
      recipientEmail: 'secretariat@grandgedeh.gov.lr',
      entityType: 'secretariat',
      entityId: newId,
      trackingNumber: trackingRef,
      eventType: 'Concession Ingestion Approved',
      smsMessage: `GGCDC-GOV GAZETTE: New Concession ${newProject.name} (Operator: ${newProject.operator}, District: ${newProject.district}) INGESTED into Sovereign Ledger. Ref: ${trackingRef}. Live at https://totagits.github.io/grand-gedeh-cdc-platform/`,
      emailSubject: `[OFFICIAL GGCDC GAZETTE] New Concession Ingested & Commitments Spawned - Ref: ${trackingRef}`,
      emailBody: `OFFICIAL SECRETARIAT GAZETTE RECORD\n\nConcession: ${newProject.name}\nOperator: ${newProject.operator}\nSector: ${newProject.sector}\nDistrict: ${newProject.district}\nStatutory Counterpart: ${newProject.govCounterpart}\nTracking Ref: ${trackingRef}\n\nContractual Commitments Spawned:\n1. CSDF Escrow: ${newProject.commitmentsSummary.socialDevFundAnnual}\n2. Local Employment Mandate: ${newProject.commitmentsSummary.employmentGoal}\n3. Infrastructure Deliverables: ${newProject.commitmentsSummary.infrastructureItems?.join(', ') || 'N/A'}\n\nThis record is permanently verifiable on the Grand Gedeh Sovereign Transparency Platform.`
    });

    return newProject;
  };

  const registerBusiness = (businessData: Omit<BusinessSupplier, 'id' | 'trackingNumber' | 'verifiedLocal' | 'verificationStatus' | 'registrationDate'> & { uploadedCredentials?: UploadedCredential[] }): BusinessSupplier => {
    const trackingNum = `GG-BIZ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newBiz: BusinessSupplier = {
      ...businessData,
      id: `biz-${Date.now()}`,
      trackingNumber: trackingNum,
      verifiedLocal: true,
      verificationStatus: 'Approved & Accredited',
      prequalificationStatus: businessData.prequalificationStatus || 'Prequalified Tier 1 Contractor (Sec. 13)',
      registrationDate: new Date().toISOString().split('T')[0],
      uploadedCredentials: businessData.uploadedCredentials || []
    };
    setBusinesses(prev => [newBiz, ...prev]);

    // Automated Transparency Dispatch: SMS & Email
    sendDispatchNotification({
      recipientName: newBiz.contactPerson || newBiz.name,
      recipientPhone: newBiz.contactPhone,
      recipientEmail: newBiz.contactEmail || 'procurement@grandgedeh.gov.lr',
      entityType: 'business',
      entityId: newBiz.id,
      trackingNumber: trackingNum,
      eventType: 'Registration Submitted',
      smsMessage: `GGCDC-GOV: Enterprise ${newBiz.name} registered. Ref: ${trackingNum}. Prequalification Certificate issued under Sec 13 Putu MDA. Verify: https://totagits.github.io/grand-gedeh-cdc-platform/`,
      emailSubject: `[OFFICIAL GGCDC NOTICE] Local Enterprise Registered - Ref: ${trackingNum}`,
      emailBody: `Dear Management of ${newBiz.name},\n\nYour enterprise has been officially registered in the Grand Gedeh Business & Local Contractor Registry.\n\nSector: ${newBiz.sector}\nOwnership: ${newBiz.beneficialOwnershipShare || newBiz.ownership}\nTracking Code: ${trackingNum}\n\nYour digital Certificate of Grand Gedean Beneficial Ownership & Contractor Prequalification is active and verifiable online.`
    });

    return newBiz;
  };

  const registerWorkforce = (profileData: Omit<WorkforceProfile, 'id' | 'trackingNumber' | 'verificationStatus'> & { uploadedCredentials?: UploadedCredential[] }): WorkforceProfile => {
    const trackingNum = `GG-TALENT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const isTrackA = profileData.trackType === 'Track A' || (profileData.qualificationLevel !== 'Apprentice');
    const newProfile: WorkforceProfile = {
      ...profileData,
      id: `wf-${Date.now()}`,
      trackingNumber: trackingNum,
      verificationStatus: 'Approved & Accredited',
      recommendationStatus: profileData.recommendationStatus || (isTrackA ? 'Endorsed for Concessionaire Direct Hire' : 'Recommended for TVET Sponsorship'),
      uploadedCredentials: profileData.uploadedCredentials || []
    };
    setWorkforce(prev => [newProfile, ...prev]);

    // Automated Transparency Dispatch: SMS & Email
    sendDispatchNotification({
      recipientName: newProfile.fullName,
      recipientPhone: newProfile.contactPhone || '+231 770 000 000',
      recipientEmail: newProfile.contactEmail || 'talent@citizens.lr',
      entityType: 'workforce',
      entityId: newProfile.id,
      trackingNumber: trackingNum,
      eventType: 'Registration Submitted',
      smsMessage: `GGCDC-GOV: Hello ${newProfile.fullName}, your ${newProfile.tradeCategory} profile is registered. Ref: ${trackingNum}. Endorsed for Putu MDA placement. View letter: https://totagits.github.io/grand-gedeh-cdc-platform/`,
      emailSubject: `[OFFICIAL GGCDC NOTICE] Candidate Registered & Recommendation Issued - Ref: ${trackingNum}`,
      emailBody: `Dear ${newProfile.fullName},\n\nYou have been officially registered in the Grand Gedeh Talent Pool & TVET Apprenticeship Engine.\n\nDesignated Trade: ${newProfile.specialization || newProfile.tradeCategory}\nCounty Status: Indigene of ${newProfile.district}\nTracking Ref: ${trackingNum}\n\nYour Official GGCDC Recommendation Letter is ready and verifiable online.`
    });

    return newProfile;
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

    const targetBiz = businesses.find(b => b.id === id);
    if (targetBiz) {
      const isApproved = status === 'Approved & Accredited';
      const isDenied = status === 'Denied & Disqualified';
      const eventType: NotificationEventType = isApproved 
        ? 'Secretariat Approved & Accredited' 
        : isDenied 
        ? 'Application Denied & Disqualified' 
        : 'Information Required';

      const smsMessage = isApproved
        ? `GGCDC-GOV: CONGRATULATIONS! ${targetBiz.name} is ACCREDITED by Secretariat as Tier 1 Contractor under Sec 13 Putu MDA. Audited by ${auditor}. Ref: ${targetBiz.trackingNumber}`
        : isDenied
        ? `GGCDC-GOV NOTICE: Application for ${targetBiz.name} was NOT APPROVED / DISQUALIFIED by Secretariat. Grounds: "${notes}". Right of appeal within 14 days at Zwedru Admin Complex. Ref: ${targetBiz.trackingNumber}`
        : `GGCDC-GOV: ATTENTION ${targetBiz.name}: Secretariat audit requires additional documentation: "${notes}". Log in to update. Ref: ${targetBiz.trackingNumber}`;

      const emailSubject = isApproved
        ? `[OFFICIAL GGCDC AUDIT NOTICE] Status: Approved & Accredited - ${targetBiz.name}`
        : isDenied
        ? `[OFFICIAL GGCDC DISQUALIFICATION ORDER] Status: Denied & Disqualified - ${targetBiz.name}`
        : `[OFFICIAL GGCDC AUDIT NOTICE] Information Required - ${targetBiz.name}`;

      const emailBody = isDenied
        ? `OFFICIAL SECRETARIAT DISQUALIFICATION ORDER\n\nEnterprise: ${targetBiz.name}\nTracking Ref: ${targetBiz.trackingNumber}\nAuditor: ${auditor}\nDecision: Denied & Disqualified from Local Content Prequalification\n\nAdministrative Grounds & Audit Findings:\n${notes}\n\nStatutory Citation: Pursuant to Section 13 (Local Content & Beneficial Ownership Mandate) of Putu Iron Ore Mining MDA and Section 44 of the PPCA.\n\nAppeals Process:\nIf you believe this decision was rendered in error or have certified supplementary documents from the Liberian Business Registry (LBR) or Clan Elder Council, you may submit a formal petition to the GGCDC Secretariat Review Board within 14 working days at the Zwedru Administrative Complex.`
        : `Official Secretariat Audit Notice:\n\nEnterprise: ${targetBiz.name}\nAuditor: ${auditor}\nStatus: ${status}\nNotes: ${notes}\n\nReference: ${targetBiz.trackingNumber}`;

      sendDispatchNotification({
        recipientName: targetBiz.contactPerson || targetBiz.name,
        recipientPhone: targetBiz.contactPhone,
        recipientEmail: targetBiz.contactEmail || 'procurement@grandgedeh.gov.lr',
        entityType: 'business',
        entityId: targetBiz.id,
        trackingNumber: targetBiz.trackingNumber,
        eventType,
        smsMessage,
        emailSubject,
        emailBody
      });
    }
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

    const targetWf = workforce.find(w => w.id === id);
    if (targetWf) {
      const isApproved = status === 'Approved & Accredited';
      const isDenied = status === 'Denied & Disqualified';
      const eventType: NotificationEventType = isApproved 
        ? 'Secretariat Approved & Accredited' 
        : isDenied 
        ? 'Application Denied & Disqualified' 
        : 'Information Required';

      const smsMessage = isApproved
        ? `GGCDC-GOV: CONGRATULATIONS! ${targetWf.fullName}, your credentials have been ACCREDITED by Secretariat for direct hire. Audited by ${auditor}. Ref: ${targetWf.trackingNumber}`
        : isDenied
        ? `GGCDC-GOV NOTICE: Application for ${targetWf.fullName} was NOT APPROVED / DISQUALIFIED by Secretariat. Grounds: "${notes}". Right of appeal within 14 days at Zwedru Admin Complex. Ref: ${targetWf.trackingNumber}`
        : `GGCDC-GOV: ATTENTION ${targetWf.fullName}: Secretariat audit notice: "${notes}". Ref: ${targetWf.trackingNumber}`;

      const emailSubject = isApproved
        ? `[OFFICIAL GGCDC AUDIT NOTICE] Accreditation Status: Approved & Accredited - ${targetWf.fullName}`
        : isDenied
        ? `[OFFICIAL GGCDC DISQUALIFICATION NOTICE] Candidate Profile Not Approved - ${targetWf.fullName}`
        : `[OFFICIAL GGCDC AUDIT NOTICE] Information Required - ${targetWf.fullName}`;

      const emailBody = isDenied
        ? `OFFICIAL SECRETARIAT DISQUALIFICATION NOTICE\n\nCandidate: ${targetWf.fullName}\nTracking Ref: ${targetWf.trackingNumber}\nTrade Category: ${targetWf.tradeCategory}\nAuditor: ${auditor}\nDecision: Denied & Disqualified from Direct-Hire Roster\n\nAdministrative Grounds & Audit Findings:\n${notes}\n\nRight of Appeal:\nYou may lodge a formal appeal with supporting proof of qualifications and clan indigeneity at the GGCDC Secretariat Desk, Zwedru Administrative Hall within 14 working days.`
        : `Official Secretariat Audit Notice:\n\nCandidate: ${targetWf.fullName}\nTrade: ${targetWf.tradeCategory}\nAuditor: ${auditor}\nStatus: ${status}\nNotes: ${notes}\n\nReference: ${targetWf.trackingNumber}`;

      sendDispatchNotification({
        recipientName: targetWf.fullName,
        recipientPhone: targetWf.contactPhone || '+231 770 000 000',
        recipientEmail: targetWf.contactEmail || 'talent@citizens.lr',
        entityType: 'workforce',
        entityId: targetWf.id,
        trackingNumber: targetWf.trackingNumber,
        eventType,
        smsMessage,
        emailSubject,
        emailBody
      });
    }
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
      theme,
      setTheme,
      toggleTheme,
      isSignInModalOpen,
      setIsSignInModalOpen,
      isContactModalOpen,
      setIsContactModalOpen,
      isConcessionModalOpen,
      setIsConcessionModalOpen,
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
      addConcession,
      registerBusiness,
      registerWorkforce,
      submitConsultation,
      nominateExpert,
      updateBusinessVerification,
      updateWorkforceVerification,
      verifyCredentialDoc,
      notifications,
      sendDispatchNotification
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
