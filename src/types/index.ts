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
  docType: 'LBR Business Registration' | 'LRA Tax Clearance' | 'Articles of Incorporation' | 'Proof of Address' | 'TVET Trade Certificate' | 'University Degree' | 'Equipment Operator License' | 'CV / Resume';
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
  verificationStatus: 'Approved & Accredited' | 'Pending Secretarial Audit' | 'Under Review' | 'Information Required' | 'Requires Re-upload';
  registrationDate: string;
  pastContracts: string[];
  uploadedCredentials: UploadedCredential[];
  secretariatAuditNotes?: string;
  accreditedBy?: string;
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
  verificationStatus: 'Approved & Accredited' | 'Pending Secretarial Audit' | 'Under Review' | 'Information Required';
  uploadedCredentials: UploadedCredential[];
  secretariatAuditNotes?: string;
  accreditedBy?: string;
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

export interface DocumentItem {
  id: string;
  title: string;
  sector: string;
  projectName: string;
  docType: 'Mineral Development Agreement (MDA)' | 'Community Development Agreement (CDA)' | 'ESIA / Environmental' | 'Technical Audit' | 'Policy Resolution' | 'Meeting Minutes' | 'GIS Map';
  date: string;
  classification: 'Public Document' | 'GGCDC Confidential' | 'Executive Review Only';
  size: string;
  fileFormat: 'PDF' | 'GEOJSON' | 'DOCX';
  summary: string;
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
