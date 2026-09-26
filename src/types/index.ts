export type UserRole = 
  | 'citizen' 
  | 'investor' 
  | 'expert' 
  | 'secretariat' 
  | 'community_rep'
  | 'business'
  | 'worker';

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  organization: string;
  avatarUrl?: string;
  department?: string;
  badgeLabel?: string;
}

export interface UploadedCredential {
  id: string;
  name: string;
  docType: 'LBR Business Registration' | 'LRA Tax Clearance' | 'Articles of Incorporation' | 'Proof of Address' | 'TVET Trade Certificate' | 'University Degree' | 'Equipment Operator License' | 'CV / Resume' | 'Letter of Support' | 'National ID';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: 'Verified' | 'Pending Verification' | 'Requires Re-upload';
  verifiedBy?: string;
  verificationNotes?: string;
}

export interface Pillar {
  id: string;
  name: string;
  shortDesc: string;
  directorate: string;
  iconName: string;
  stats: string;
  operationalTools: string[];
  keyInitiatives: string[];
}

export type ProjectStage = 'Exploration' | 'Feasibility' | 'Development' | 'Operations' | 'Rehabilitation' | 'Suspended' | 'Active';

export interface ConcessionProject {
  id: string;
  name: string;
  sector: 'Mining & Extractives' | 'Forestry & Environment' | 'Agriculture & Food Systems' | 'Infrastructure & Public Utilities' | 'Concessions & PPPs';
  operator: string;
  investorOrigin: string;
  govCounterpart: string;
  district: string;
  affectedCommunities: string[];
  stage: ProjectStage;
  duration: string;
  landFootprint: string;
  agreements: {
    title: string;
    type: string;
    signedDate: string;
    status: string;
  }[];
  commitmentsSummary: {
    employmentGoal: string;
    localProcurementQuota: string;
    socialDevFundAnnual: string;
    infrastructureItems: string[];
    environmentalObligations: string[];
  };
  totalDisclosedPayments: string;
  workingGroupId: string;
  statusNotes: string;
  lat: number;
  lng: number;
}

export type ConcessionInputData = Omit<ConcessionProject, 'id' | 'workingGroupId'> & { 
  id?: string; 
  workingGroupId?: string; 
};

export type NewCommitmentInputData = Omit<CommitmentRecord, 'id' | 'projectId' | 'projectName'> & {
  title: string;
  obligor?: string;
  beneficiary?: string;
  sector?: string;
  sourceDoc?: string;
  clauseRef?: string;
  deadline?: string;
  responsibleAgency?: string;
  location?: string;
  monetaryValue?: string;
  status?: CommitmentStatus;
  evidence?: string;
  lastAudited?: string;
  verificationNotes?: string;
};

export type CommitmentStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Delayed' | 'Awaiting Verification';

export interface CommitmentRecord {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  obligor: string;
  beneficiary: string;
  sector: string;
  sourceDoc: string;
  clauseRef: string;
  deadline: string;
  responsibleAgency: string;
  location: string;
  monetaryValue: string;
  status: CommitmentStatus;
  evidence: string;
  lastAudited: string;
  verificationNotes: string;
}

export type BusinessOwnershipType = 
  | 'Sole Proprietorship' 
  | 'Partnership / Joint Venture' 
  | 'Corporation / LLC' 
  | 'Cooperative / Association';

export interface BusinessSupplier {
  id: string;
  trackingNumber: string;
  name: string;
  sector: string;
  ownership: BusinessOwnershipType;
  localOwnershipPct?: number;
  isQualifiedGrandGedean?: boolean;
  location: string;
  services: string[];
  contactPerson: string;
  contactPhone: string;
  contactEmail?: string;
  legalStatus: 'LBR Registered' | 'MoCI Pending' | 'Certified';
  taxStatus: 'LRA Tax Compliant' | 'Pending Renewal';
  workforceSize: number;
  equipmentSummary: string;
  verifiedLocal: boolean;
  verificationStatus: 'Approved & Accredited' | 'Pending Secretarial Audit' | 'Under Review' | 'Information Required' | 'Requires Re-upload' | 'Denied & Disqualified';
  registrationDate: string;
  pastContracts: string[];
  uploadedCredentials: UploadedCredential[];
  secretariatAuditNotes?: string;
  accreditedBy?: string;
  // Fields for GGCDC Business & Contractor Registry Certificate
  beneficialOwnershipShare?: string;
  principalsAndClanOrigins?: string;
  lbrNumber?: string;
  tinNumber?: string;
  headquarters?: string;
  fleetCapacity?: string;
  localStaffRatio?: string;
  prequalificationStatus?: string;
}

export interface WorkforceProfile {
  id: string;
  trackingNumber: string;
  fullName: string;
  gender: 'Male' | 'Female';
  district: string;
  isDiaspora: boolean;
  diasporaCountry?: string;
  tradeCategory: string;
  specialization: string;
  qualificationLevel: 'Trade Certified' | 'Diploma' | 'BSc / BEng' | 'Master / PhD' | 'Apprentice';
  yearsExperience: number;
  currentStatus: 'Available for Immediate Hire' | 'Currently Employed' | 'Available for Advisory';
  verifiedSkills: string[];
  verificationStatus: 'Approved & Accredited' | 'Pending Secretarial Audit' | 'Under Review' | 'Information Required' | 'Denied & Disqualified';
  uploadedCredentials: UploadedCredential[];
  secretariatAuditNotes?: string;
  accreditedBy?: string;
  // Fields for GGCDC Talent Pool Engine & Recommendation Letter
  trackType?: 'Track A' | 'Track B';
  desiredTrade?: string;
  institution?: string;
  community?: string;
  contactPhone?: string;
  contactEmail?: string;
  communityEndorsement?: string;
  availability?: string;
  recommendationStatus?: string;
}

export interface CommunityProfile {
  id: string;
  name: string;
  district: string;
  estimatedPopulation: number;
  traditionalLeader: string;
  womenRepresentative: string;
  youthLeader: string;
  customaryLandBody: string;
  majorLivelihoods: string[];
  infrastructure: {
    schools: number;
    clinics: number;
    roadAccessibility: 'Year-round Paved' | 'Seasonal Unpaved' | 'Severely Challenged';
    cleanWaterAccessPct: number;
    electricityAccess: 'National Grid (CLSG)' | 'Solar Mini-Grid' | 'Generators Only' | 'None';
  };
  affectingProjects: string[];
  signedAgreements: string[];
  topDevelopmentPriorities: string[];
  activeGrievanceCount: number;
  consultationsAttended: number;
  lat: number;
  lng: number;
}

export interface ConsultationItem {
  id: string;
  title: string;
  sector: string;
  relatedProject?: string;
  openedDate: string;
  closingDate: string;
  status: 'Open for Submissions' | 'Reviewing Submissions' | 'Report Published' | 'Archived';
  submissionCount: number;
  communitiesParticipating: number;
  summary: string;
  keyQuestions: string[];
  publishedReportUrl?: string;
}

export interface TechnicalExpert {
  id: string;
  fullName: string;
  primaryDiscipline: string;
  highestDegree: string;
  institution: string;
  location: string;
  workingGroupAssigned: string;
  specializationArea: string;
  biographySnippet: string;
  yearsOfExperience: number;
  accreditationStatus: 'Accredited' | 'Nominated' | 'Senior Fellow';
}

export interface WorkingGroup {
  id: string;
  name: string;
  pillar: string;
  leadCoordinator: string;
  deputyLead: string;
  mandate: string;
  memberCount: number;
  activeProjects: string[];
  publicReportsCount: number;
  tasks: {
    id: string;
    title: string;
    assignedTo: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Critical';
    status: 'In Review' | 'Drafting' | 'Completed';
  }[];
  risks: {
    id: string;
    risk: string;
    severity: 'High' | 'Medium' | 'Extreme';
    mitigation: string;
  }[];
  meetingNotesSnippet: string;
}

export type DocumentType = 
  | 'Mineral Development Agreement (MDA)'
  | 'Forest Management Contract (FMC)'
  | 'Community Forest Agreement (CFMA)'
  | 'Community Development Agreement (CDA)'
  | 'Agro-Industrial Concession'
  | 'Infrastructure & Energy Treaty'
  | 'ESIA / Environmental'
  | 'Technical Audit'
  | 'Policy Resolution'
  | 'Meeting Minutes'
  | 'GIS Map';

export interface DocumentClause {
  article: string;
  title: string;
  summary: string;
  statutoryDetail: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  sector: string;
  projectName: string;
  docType: DocumentType;
  date: string;
  classification: 'Public Document' | 'GGCDC Confidential' | 'Executive Review Only';
  size: string;
  fileFormat: 'PDF' | 'GEOJSON' | 'DOCX' | 'TXT';
  summary: string;
  concessionCode?: string;
  parties?: string;
  ratificationStatus?: string;
  statutoryBasis?: string;
  keyClauses?: DocumentClause[];
  fullContractText?: string;
}


export interface OpportunityItem {
  id: string;
  title: string;
  type: 'Tender / RFQ' | 'Employment' | 'Internship' | 'Scholarship' | 'Grant / Loan';
  sector: string;
  issuer: string;
  deadline: string;
  location: string;
  compensationOrValue: string;
  description: string;
}

export type NotificationChannel = 'SMS' | 'Email' | 'Dual (SMS & Email)';

export type NotificationEventType = 
  | 'Registration Submitted' 
  | 'Secretariat Approved & Accredited' 
  | 'Application Denied & Disqualified'
  | 'Tender Prequalification Issued' 
  | 'Information Required'
  | 'Concession Dispatch Issued'
  | 'Concession Ingestion Approved';

export interface NotificationDispatchRecord {
  id: string;
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  entityType: 'workforce' | 'business' | 'concession' | 'secretariat';
  entityId: string;
  trackingNumber: string;
  eventType: NotificationEventType;
  smsMessage: string;
  emailSubject: string;
  emailBody: string;
  timestamp: string;
  gatewayStatus: 'Delivered via Orange/Lonestar GSM' | 'Sent via SMTP Relay';
  verificationUrl: string;
}
