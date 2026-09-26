import { 
  Pillar, 
  ConcessionProject, 
  CommitmentRecord, 
  BusinessSupplier, 
  WorkforceProfile, 
  CommunityProfile, 
  ConsultationItem, 
  TechnicalExpert, 
  WorkingGroup, 
  DocumentItem, 
  OpportunityItem 
} from '../types';

export const PILLARS_DATA: Pillar[] = [
  {
    id: 'mining',
    name: 'Mining & Extractives',
    directorate: 'Directorate of Mineral Resources & Concessions',
    shortDesc: 'Putu and future mineral projects, agreements, local employment, royalties, environmental baselines, and concession compliance monitoring.',
    iconName: 'Pickaxe',
    stats: '1 Major Mine (Putu) • 3 Exploration • $1.6B Planned Capex',
    operationalTools: [
      'Concession & Exploration Registry',
      'Putu Mining Working Group Workspace',
      'Environmental Impact & Water Audit Log',
      'Local Employment & Quota Tracker',
      'Mineral Royalties & County CDF Ledger',
      'Artisanal Mining Formalization Desk'
    ],
    keyInitiatives: [
      'Putu Iron Ore Mineral Development Agreement (MDA) Review',
      'Konobo Basin Environmental Water Sampling',
      'Grand Gedeh Youth Mining Apprenticeship Pact'
    ]
  },
  {
    id: 'forestry',
    name: 'Forestry, Environment & Climate',
    directorate: 'Directorate of Forestry & Natural Capital',
    shortDesc: 'Forest concessions, community forests, Grebo-Krahn conservation buffer, logging operations, carbon initiatives, and reforestation.',
    iconName: 'Trees',
    stats: '2 Commercial Concessions • 4 Community Forests • 175k Hectares Protected',
    operationalTools: [
      'Timber Legality & Export Verification',
      'Community Forest Governance Registry',
      'Grebo-Krahn Biodiversity Buffer Tracker',
      'Carbon Credit & Conservation Fund Audit',
      'Stumpage & Cubic Meter Fee Disclosures',
      'Reforestation Compliance Monitor'
    ],
    keyInitiatives: [
      'Grebo-Krahn National Park Co-Management Protocol',
      'Singbeh & Alpha Logging Social Agreement Audits',
      'B\'hai Community Forest Carbon Baseline Survey'
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Food Systems',
    directorate: 'Directorate of Agriculture & Agribusiness Development',
    shortDesc: 'Smallholders, cooperatives, commercial rubber and oil palm, cocoa value chains, agro-processing, and farm-to-market feeder roads.',
    iconName: 'Wheat',
    stats: '42 Registered Cooperatives • 3 Processing Hubs • 18k MT Cocoa/Year',
    operationalTools: [
      'Farmer & Cooperative Directory',
      'Countywide Crop Production & Yield GIS',
      'Farm-to-Market Road Priority Index',
      'Agro-Processing Equipment & Facility Map',
      'Agricultural Input & Mechanization Desk',
      'Off-Taker & Commodity Price Dashboard'
    ],
    keyInitiatives: [
      'Zwedru Central Agro-Industrial Processing Zone',
      'Cavalla Valley High-Yield Oil Palm Revitalization',
      'Cocoa Smallholder Premium Price Coalition'
    ]
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & Public Utilities',
    directorate: 'Directorate of Infrastructure & Connectivity',
    shortDesc: 'Monrovia-Ganta-Zwedru-Harper road corridor, cross-border CLSG electricity grid, rural mini-grids, water systems, and telecom towers.',
    iconName: 'Building2',
    stats: '225kV CLSG Substation • 140km Paving Corridor • 68 Clean Water Hubs',
    operationalTools: [
      'Highway Corridor & Bridge Asset Tracker',
      'CLSG Power Grid & Feeder Distribution Map',
      'Rural Water Point Functionality Dashboard',
      'Telecom Coverage & Fiber Optic Route Map',
      'Public Works Contractor Verification Desk',
      'Solar Mini-Grid Reliability Monitor'
    ],
    keyInitiatives: [
      'Ganta-to-Zwedru Asphalt Corridor Monitoring',
      'Zwedru Urban Water Supply Expansion Phase II',
      'Rural District Solar Mini-Grid Deployment'
    ]
  },
  {
    id: 'concessions',
    name: 'Concessions, Investment & PPPs',
    directorate: 'Directorate of Strategic Investment & Public-Private Partnerships',
    shortDesc: 'Master database of all concessions, corporate owners, agreements, contractual obligations, and socio-economic investment footprints.',
    iconName: 'Handshake',
    stats: '7 Major Concessions • $2.4B Cumulative Pipeline • 100% Disclosed',
    operationalTools: [
      'Grand Gedeh Master Concessions Database',
      'Investor Compliance & Audit Scorecard',
      'Public-Private Partnership Deal Pipeline',
      'Due Diligence & Ultimate Beneficial Ownership',
      'Social Development Fund Escrow Tracker',
      'Dispute & Arbitration Warning System'
    ],
    keyInitiatives: [
      'Grand Gedeh County Investment Guide 2026-2030',
      'County Concession Compliance Audit 2026',
      'Investor Diaspora Co-Financing Desk'
    ]
  },
  {
    id: 'enterprise',
    name: 'Local Enterprise, Jobs & Skills',
    directorate: 'Directorate of Local Content & Human Capital',
    shortDesc: 'Grand Gedeh verified business registry, local procurement matching, skills inventory, workforce gap analysis, and youth apprenticeships.',
    iconName: 'Briefcase',
    stats: '184 Verified Enterprises • 2,450 Registered Workers • 13 Sectors',
    operationalTools: [
      'Verified Grand Gedeh Business Registry',
      'Skills & Workforce Inventory Database',
      'Concessionaire Local Procurement Portal',
      'Investor Workforce Gap Analysis Calculator',
      'Grand Gedeh Community College (GGCC) TVET Match',
      'Tenders & RFQ Broadcast Dispatcher'
    ],
    keyInitiatives: [
      'Grand Gedeh Local Content Mandatory 40% Target',
      'Heavy Equipment & Welding TVET Accelerator',
      'County Supplier Capacity & ISO Certification Drive'
    ]
  },
  {
    id: 'communities',
    name: 'Land, Communities & Social Development',
    directorate: 'Directorate of Customary Land & Social Equity',
    shortDesc: 'Customary communities, land rights, community agreements (CDAs), grievance redress, women and youth inclusion, clinics, and schools.',
    iconName: 'Users',
    stats: '46 Recognized Towns • 12 Customary Land Committees • 100% Free Prior & Informed Consent',
    operationalTools: [
      'Community Profile & Traditional Leadership Registry',
      'Customary Land Boundary & Deed Repository',
      'Community Development Agreement (CDA) Tracker',
      'Confidential Grievance & Incident Log',
      'Women & Youth Representation Scorecard',
      'Resettlement & Compensation Monitoring Unit'
    ],
    keyInitiatives: [
      'Jarwodee-Pennoken Customary Boundary Formalization',
      'Women in Natural Resource Governance Taskforce',
      'County Community Health Worker Logistics Pact'
    ]
  },
  {
    id: 'governance',
    name: 'Governance, Research & Citizen Participation',
    directorate: 'Directorate of Governance & Civic Accountability',
    shortDesc: 'Public consultations, citizen submissions, technical expert advisory network, policy briefs, resolutions, and commitment monitoring.',
    iconName: 'Scale',
    stats: '1,420 Submissions Processed • 18 Policy Briefs • 8 Active Working Groups',
    operationalTools: [
      'Citizen Consultation & Public Submission Portal',
      'Technical & Professional Experts Roster',
      'County Development Observatory Analytics',
      'Policy Research & Legislative Position Hub',
      'Resolution & Meeting Minutes Archive',
      'Independent Citizen Monitoring Desk'
    ],
    keyInitiatives: [
      'Presidential Emissary Consultation Follow-up Protocol',
      'Grand Gedeh Diaspora Expert Mobilization Network',
      'Quarterly County Development Accountability Brief'
    ]
  }
];

export const CONCESSIONS_DATA: ConcessionProject[] = [
  {
    id: 'proj-putu-iron',
    name: 'Putu Iron Ore Project',
    sector: 'Mining & Extractives',
    operator: 'Putu Iron Ore Mining Inc. (PIOM)',
    investorOrigin: 'International Mining Consortium / Severstal / MME Oversight',
    govCounterpart: 'Ministry of Mines & Energy (MME) / NIC',
    district: 'Putu District & Tchien District',
    affectedCommunities: ['Putu Jarwodee', 'Pennoken', 'Tiama Town', 'Polar Town', 'Pewee Village'],
    stage: 'Development',
    duration: '25-Year Mineral Development Agreement (2010-2035)',
    landFootprint: '425 km² (Putu Mountain Ridge & Buffer)',
    agreements: [
      {
        title: 'Mineral Development Agreement (MDA) between Rep. of Liberia & PIOM',
        type: 'MDA Concession Agreement',
        signedDate: 'September 2010',
        status: 'Ratified by Legislature'
      },
      {
        title: 'Putu Community Development Agreement (CDA) Framework',
        type: 'Tripartite Community Agreement',
        signedDate: 'March 2024 Revision',
        status: 'Active Implementation Review'
      },
      {
        title: 'Environmental and Social Impact Assessment (ESIA) Clearance',
        type: 'EPA Environmental Permit',
        signedDate: 'November 2023',
        status: 'Active Compliance Monitoring'
      }
    ],
    commitmentsSummary: {
      employmentGoal: 'Minimum 60% Liberian workforce; 70% unskilled labor from Putu District',
      localProcurementQuota: '25% of all non-specialized supply contracts reserved for Grand Gedeh vendors',
      socialDevFundAnnual: '$3,000,000 USD Annual County Development Contribution',
      infrastructureItems: [
        'Paving 35km haulage access feeder road connecting Jarwodee to Zwedru Highway',
        'Construction of 12-classroom modern comprehensive high school in Jarwodee',
        'Support Martha Tubman Memorial Hospital specialized emergency surgical wing'
      ],
      environmentalObligations: [
        'Continuous ambient dust abatement in inhabited village corridors',
        'Bi-weekly water quality testing across Cavalla tributary river system',
        'Zero-discharge tailings management facility with international dam safety standards'
      ]
    },
    totalDisclosedPayments: '$14,250,000 USD (Cumulative Royalties & Social Fund Escrow)',
    workingGroupId: 'wg-putu',
    statusNotes: 'Feasibility re-engineering ongoing. Working group actively monitoring infrastructure and labor hiring compliance ahead of main extraction phase.',
    lat: 5.6833,
    lng: -8.1667
  },
  {
    id: 'proj-singbeh-timber',
    name: 'Singbeh Forest Management Concession (FMC Area I)',
    sector: 'Forestry & Environment',
    operator: 'Singbeh Timber Corporation (STC)',
    investorOrigin: 'Liberia / Global Partner Joint Venture',
    govCounterpart: 'Forestry Development Authority (FDA)',
    district: 'B\'hai & Gbao Districts',
    affectedCommunities: ['Tuzon', 'Toe Town', 'B\'hai Gorbo', 'Zleh Town'],
    stage: 'Operations',
    duration: '25-Year Commercial Forestry Concession (2018-2043)',
    landFootprint: '118,500 Hectares',
    agreements: [
      {
        title: 'FDA Forest Management Contract FMC "I"',
        type: 'Timber Commercial Concession',
        signedDate: 'June 2018',
        status: 'Active'
      },
      {
        title: 'Social Agreement with B\'hai & Gbao Affected Community Forest Committees',
        type: 'Community Social Agreement',
        signedDate: 'January 2022 Renewal',
        status: 'Active Monitoring'
      }
    ],
    commitmentsSummary: {
      employmentGoal: '80% local logging & processing workforce',
      localProcurementQuota: '100% of fuel and catering from Grand Gedeh suppliers',
      socialDevFundAnnual: '$1.50 USD per cubic meter felled paid to Community Forest Committee',
      infrastructureItems: [
        'Maintenance of 48km timber bypass route preventing heavy truck damage to public highway',
        'Borehole clean water wells in 4 surrounding towns',
        'Quarterly scholarship allocation to GGCC forestry students'
      ],
      environmentalObligations: [
        'Strict 30-meter river buffer no-logging zone',
        'Selective harvesting adhering to Sustainable Forest Management (SFM) protocols',
        'Reforestation nursery cultivating 50,000 indigenous saplings annually'
      ]
    },
    totalDisclosedPayments: '$1,840,000 USD (Cubic Meter Fees & Land Rental)',
    workingGroupId: 'wg-forestry',
    statusNotes: 'Active operations. Community committee recently flagged delayed Q2 cubic meter fee reconciliation; GGCDC facilitating resolution.',
    lat: 6.2500,
    lng: -8.2800
  },
  {
    id: 'proj-cavalla-agro',
    name: 'Cavalla River Commercial Agro-Venture',
    sector: 'Agriculture & Food Systems',
    operator: 'Cavalla Natural Resources & Agribusiness Corp',
    investorOrigin: 'West Africa Agro-Development Group',
    govCounterpart: 'Ministry of Agriculture (MoA) / NIC',
    district: 'Cavalla District',
    affectedCommunities: ['Tempo', 'B\'hai Border', 'Glio Landing', 'Cavalla Blun'],
    stage: 'Development',
    duration: '20-Year Concession Agreement (2021-2041)',
    landFootprint: '15,000 Hectares (High-Yield Oil Palm & Cocoa Outgrower)',
    agreements: [
      {
        title: 'Agricultural Concession Agreement MoA/Cavalla Corp',
        type: 'Agro-Industrial Lease',
        signedDate: 'August 2021',
        status: 'Active'
      },
      {
        title: 'Outgrower Farmer Purchase Agreement & Price Floor Pact',
        type: 'Farmer Cooperative Agreement',
        signedDate: 'October 2023',
        status: 'Operational'
      }
    ],
    commitmentsSummary: {
      employmentGoal: '1,200 permanent farm workers; 85% local district hiring',
      localProcurementQuota: 'Fertilizer transport and seedling logistics contracted to Grand Gedeh trucking syndicates',
      socialDevFundAnnual: '$120,000 USD Outgrower Technical Extension Fund',
      infrastructureItems: [
        'Installation of industrial palm oil mini-mill in Tempo open to local cooperative farmers',
        'Construction of 2 solar-refrigerated produce holding depots'
      ],
      environmentalObligations: [
        'High Conservation Value (HCV) forest protection along Cavalla riverbed',
        'Organic waste composting of palm fruit bunches for circular soil enrichment'
      ]
    },
    totalDisclosedPayments: '$480,000 USD',
    workingGroupId: 'wg-agriculture',
    statusNotes: 'Nursery expansion complete; mini-mill equipment arriving via Harper port; commissioning in Q4 2026.',
    lat: 5.8500,
    lng: -7.8000
  },
  {
    id: 'proj-ganta-zwedru-road',
    name: 'Ganta-Tapeta-Zwedru Asphalt Highway Corridor',
    sector: 'Infrastructure & Public Utilities',
    operator: 'Ministry of Public Works (MPW) / Contracted Joint Venture',
    investorOrigin: 'Liberia / AfDB / World Bank Infrastructure Fund',
    govCounterpart: 'Ministry of Public Works (MPW)',
    district: 'Tchien, Gbao, B\'hai Corridors',
    affectedCommunities: ['Zwedru', 'Toe Town', 'Tuzon', 'Pennoken', 'Zleh Town'],
    stage: 'Operations',
    duration: 'Multi-Phase National Highway Infrastructure Program (2022-2027)',
    landFootprint: '112km Grand Gedeh Section (Right-of-Way 50m)',
    agreements: [
      {
        title: 'Corridor 3 Civil Works Paving Contract',
        type: 'Public Infrastructure Contract',
        signedDate: 'February 2022',
        status: 'Under Execution'
      }
    ],
    commitmentsSummary: {
      employmentGoal: '900 casual and skilled construction laborers sourced locally',
      localProcurementQuota: 'Aggregates, sand, and culvert fabrication bought from Grand Gedeh quarries',
      socialDevFundAnnual: 'Resettlement Action Plan (RAP) compensation fund: $1,400,000 USD',
      infrastructureItems: [
        'Bituminous double-surface asphalt pavement with drainage in all urban crossing towns',
        'Solar streetlights installed across 10 major town centers along highway route'
      ],
      environmentalObligations: [
        'Borrow pit rehabilitation and grading post-excavation',
        'Erosion barriers installed near stream crossings'
      ]
    },
    totalDisclosedPayments: '$48,000,000 USD (Total Contract Envelope)',
    workingGroupId: 'wg-infra',
    statusNotes: 'Section from Tapeta border to Toe Town 68% paved; Zwedru urban approach grading in progress. GGCDC monitoring local subcontracts.',
    lat: 6.0719,
    lng: -8.1322
  },
  {
    id: 'proj-clsg-power',
    name: 'CLSG Zwedru 225kV Regional Substation & City Grid',
    sector: 'Infrastructure & Public Utilities',
    operator: 'Liberia Electricity Corporation (LEC) / TRANSCO CLSG',
    investorOrigin: 'Cote d\'Ivoire - Liberia - Sierra Leone - Guinea Power Pool',
    govCounterpart: 'Ministry of Mines & Energy / LEC',
    district: 'Tchien District (Zwedru Urban & Peri-Urban)',
    affectedCommunities: ['Zwedru Urban', 'Boundary Community', 'Townsend Center', 'GGCC Campus'],
    stage: 'Operations',
    duration: 'Perpetual Regional Utility Interconnection',
    landFootprint: 'Substation Compound + 85km 33kV Distribution Lines',
    agreements: [
      {
        title: 'TRANSCO CLSG Power Purchase & Wheeling Agreement',
        type: 'Regional Utility Concession',
        signedDate: 'November 2021',
        status: 'Active Delivery'
      }
    ],
    commitmentsSummary: {
      employmentGoal: 'Local line maintenance technicians trained at GGCC',
      localProcurementQuota: 'Wooden treated utility poles sourced from certified Grand Gedeh forestry producers',
      socialDevFundAnnual: 'Community electrification lifeline tariff subsidy',
      infrastructureItems: [
        'Zwedru municipal 24/7 grid energization (5,500 domestic meters)',
        'Dedicated feeder line for Martha Tubman Memorial Hospital and water treatment plant'
      ],
      environmentalObligations: [
        'Transmission line right-of-way bird diverters installed',
        'Transformer oil containment bunds with zero ground leakage'
      ]
    },
    totalDisclosedPayments: '$12,500,000 USD (Infrastructure Asset Value)',
    workingGroupId: 'wg-infra',
    statusNotes: 'Substation operating reliably with over 94% uptime; second phase rural distribution lines to Putu corridor under procurement.',
    lat: 6.0650,
    lng: -8.1250
  }
];

export const COMMITMENTS_DATA: CommitmentRecord[] = [
  {
    id: 'com-001',
    title: 'Construction of 12-Classroom High School in Jarwodee',
    projectId: 'proj-putu-iron',
    projectName: 'Putu Iron Ore Project',
    obligor: 'Putu Iron Ore Mining Inc. (PIOM)',
    beneficiary: 'Putu Jarwodee Community & Ministry of Education',
    sector: 'Mining & Extractives',
    sourceDoc: 'Putu Community Development Agreement 2024',
    clauseRef: 'Section 4.1 (Social Infrastructure)',
    deadline: 'December 2026',
    responsibleAgency: 'County Education Officer (CEO) / PIOM Infrastructure Lead',
    location: 'Putu Jarwodee Center',
    monetaryValue: '$480,000 USD',
    status: 'In Progress',
    evidence: 'Architectural blueprints approved; foundation excavation 75% complete as of August 2026 inspection.',
    lastAudited: 'August 14, 2026',
    verificationNotes: 'Joint inspection team from GGCDC Putu Working Group verified building foundation; bricklaying commenced.'
  },
  {
    id: 'com-002',
    title: '70% Unskilled Workforce Local Hiring Quota',
    projectId: 'proj-putu-iron',
    projectName: 'Putu Iron Ore Project',
    obligor: 'Putu Iron Ore Mining Inc. (PIOM) & Contractors',
    beneficiary: 'Grand Gedeh County Residents (Putu District Priority)',
    sector: 'Mining & Extractives',
    sourceDoc: 'Mineral Development Agreement (MDA)',
    clauseRef: 'Article 11.3 (Employment & Training)',
    deadline: 'Ongoing Quarterly Audit',
    responsibleAgency: 'Ministry of Labour / GGCDC Local Content Desk',
    location: 'Countywide / Putu Camp',
    monetaryValue: '$2,200,000 USD (Estimated Annual Payroll)',
    status: 'In Progress',
    evidence: 'Q2 2026 Concession Payroll Audit: 382 out of 510 active workers verified as Grand Gedeh residents (74.9%).',
    lastAudited: 'July 10, 2026',
    verificationNotes: 'Exceeding target for unskilled labor; working group pushed for acceleration of TVET program for skilled operator transitions.'
  },
  {
    id: 'com-003',
    title: 'Martha Tubman Hospital Emergency & Surgical Wing Upgrade',
    projectId: 'proj-putu-iron',
    projectName: 'Putu Iron Ore Project',
    obligor: 'PIOM Social Development Escrow',
    beneficiary: 'Grand Gedeh County Health System',
    sector: 'Mining & Extractives',
    sourceDoc: 'Tripartite Health MOU (MOH / PIOM / County Council)',
    clauseRef: 'Schedule B, Clause 2',
    deadline: 'November 2025 (Overdue)',
    responsibleAgency: 'County Health Officer (CHO) / PIOM CSR Committee',
    location: 'Zwedru City',
    monetaryValue: '$650,000 USD',
    status: 'Delayed',
    evidence: 'Medical equipment container arrived in Monrovia port in May 2026; customs clearance documentation bottleneck identified.',
    lastAudited: 'September 2, 2026',
    verificationNotes: 'GGCDC Executive Council issued formal intervention notice to Ministry of Finance to expedite tax exemption release.'
  },
  {
    id: 'com-004',
    title: 'Quarterly Stumpage & Cubic Meter Royalty Disclosures',
    projectId: 'proj-singbeh-timber',
    projectName: 'Singbeh Forest Management Concession',
    obligor: 'Singbeh Timber Corporation & FDA',
    beneficiary: 'B\'hai & Gbao Affected Community Forest Committees',
    sector: 'Forestry & Environment',
    sourceDoc: 'FDA Commercial Timber Concession Agreement FMC-I',
    clauseRef: 'Section 14 (Fiscal Payments to Communities)',
    deadline: 'Quarterly (30 Days After Quarter End)',
    responsibleAgency: 'Forestry Development Authority (FDA) Commercial Dept',
    location: 'B\'hai & Gbao Districts',
    monetaryValue: '$180,000 USD Annual Average',
    status: 'Awaiting Verification',
    evidence: 'FDA published export log volume of 14,200 m³ for Q1 2026; community bank account shows receipt of $21,300 USD.',
    lastAudited: 'August 28, 2026',
    verificationNotes: 'Discrepancy of $3,200 USD being audited by GGCDC Forestry Working Group against log waybills.'
  },
  {
    id: 'com-005',
    title: 'Establishment of 50-Ton Industrial Palm Oil Processing Mill',
    projectId: 'proj-cavalla-agro',
    projectName: 'Cavalla River Commercial Agro-Venture',
    obligor: 'Cavalla Natural Resources Corp',
    beneficiary: 'Tempo & Cavalla Smallholder Farming Cooperatives',
    sector: 'Agriculture & Food Systems',
    sourceDoc: 'Agricultural Concession Agreement MoA/Cavalla',
    clauseRef: 'Article 8 (Value-Addition & Industrial Processing)',
    deadline: 'October 2026',
    responsibleAgency: 'Ministry of Agriculture / County Cooperative Union',
    location: 'Tempo Port Landing',
    monetaryValue: '$890,000 USD',
    status: 'In Progress',
    evidence: 'Main factory shed constructed; heavy steam boiler and expeller turbines positioned on concrete pads.',
    lastAudited: 'September 12, 2026',
    verificationNotes: 'Project on schedule. Electrical grid link connection to be finalized with LEC in October.'
  },
  {
    id: 'com-006',
    title: 'Installation of 200 Solar Streetlights in Corridor Towns',
    projectId: 'proj-ganta-zwedru-road',
    projectName: 'Ganta-Tapeta-Zwedru Asphalt Highway Corridor',
    obligor: 'Ministry of Public Works / Civil Works Contractor',
    beneficiary: 'Toe Town, Tuzon, Pennoken & Zwedru Approach Communities',
    sector: 'Infrastructure & Public Utilities',
    sourceDoc: 'Corridor 3 Environmental & Social Management Plan (ESMP)',
    clauseRef: 'ESMP Measure 7.4 (Public Safety & Urban Lighting)',
    deadline: 'June 2026',
    responsibleAgency: 'MPW Infrastructure Project Implementation Unit (PIU)',
    location: 'Corridor 3 Urban Segments',
    monetaryValue: '$320,000 USD',
    status: 'Completed',
    evidence: '200 integrated solar LED poles installed and verified operational; photo inventory published on GGCDC portal.',
    lastAudited: 'July 22, 2026',
    verificationNotes: 'Verified 100% complete and fully illuminated across all 4 designated town centers.'
  },
  {
    id: 'com-007',
    title: 'Bi-Weekly Cavalla Tributary River Water Quality Testing',
    projectId: 'proj-putu-iron',
    projectName: 'Putu Iron Ore Project',
    obligor: 'PIOM Environmental Dept & EPA Independent Laboratory',
    beneficiary: 'Downstream Riparian Communities (Polar Town, Tiama, Cavalla belt)',
    sector: 'Mining & Extractives',
    sourceDoc: 'Environmental Protection Agency (EPA) Permit No. EPA-GG-2023-09',
    clauseRef: 'Condition 18 (Surface & Groundwater Monitoring)',
    deadline: 'Continuous Every 14 Days',
    responsibleAgency: 'Environmental Protection Agency (EPA) / GGCDC Environment Desk',
    location: '6 River Gauging Stations',
    monetaryValue: '$45,000 USD Annual Lab Testing Budget',
    status: 'In Progress',
    evidence: 'Laboratory reports for 16 testing cycles published; turbidity and heavy metal counts within WHO potable stream baselines.',
    lastAudited: 'September 15, 2026',
    verificationNotes: 'All test parameters within safe boundaries. Turbidity slightly elevated after heavy August rainfall, normalized in September.'
  }
];

export const BUSINESSES_DATA: BusinessSupplier[] = [
  {
    id: 'biz-001',
    trackingNumber: 'GG-BIZ-2026-001',
    name: 'Zwedru Engineering & Heavy Civil Works Ltd.',
    sector: 'Construction',
    ownership: 'Corporation / LLC',
    location: 'Main Highway, Zwedru City',
    services: ['Road grading', 'Bridge culverts', 'Foundation casting', 'Heavy equipment operation', 'Aggregate quarrying'],
    contactPerson: 'Eng. Emmanuel Gaye Krahn',
    contactPhone: '+231 770 412 889',
    contactEmail: 'info@zwedru-engineering.lr',
    legalStatus: 'LBR Registered',
    taxStatus: 'LRA Tax Compliant',
    workforceSize: 42,
    equipmentSummary: '2 CAT 320 Excavators, 3 Graders, 4 Tipper Dump Trucks, 1 Concrete Mixer Plant',
    verifiedLocal: true,
    verificationStatus: 'Approved & Accredited',
    registrationDate: '2021-03-15',
    pastContracts: ['Toe Town Feeder Culverts ($180k)', 'Zwedru City Council Market Annex ($95k)'],
    secretariatAuditNotes: 'All corporate filings verified against LBR and LRA portal. Articles of Incorporation confirm 100% Grand Gedean ownership. Equipment physically audited at Zwedru yard.',
    accreditedBy: 'Cllr. Saydee M. Krahn (Secretariat Legal & Local Content Officer)',
    uploadedCredentials: [
      {
        id: 'cred-b01-1',
        name: 'Articles of Incorporation & LBR Certificate',
        docType: 'LBR Business Registration',
        fileName: 'Zwedru_Eng_Articles_LBR.pdf',
        fileSize: '1.4 MB',
        uploadedAt: '2026-01-10',
        status: 'Verified',
        verifiedBy: 'Secretariat Compliance Desk',
        verificationNotes: 'Articles of Incorporation and LBR active; valid through Dec 2026.'
      },
      {
        id: 'cred-b01-2',
        name: 'Liberia Revenue Authority (LRA) Tax Clearance',
        docType: 'LRA Tax Clearance',
        fileName: 'LRA_Tax_Clearance_Q1_2026.pdf',
        fileSize: '890 KB',
        uploadedAt: '2026-01-12',
        status: 'Verified',
        verifiedBy: 'Secretariat Compliance Desk',
        verificationNotes: 'Tax compliance verified in good standing.'
      },
      {
        id: 'cred-b01-3',
        name: 'Zwedru Physical Yard & Office Lease Title',
        docType: 'Proof of Address',
        fileName: 'Zwedru_Office_Physical_Lease.pdf',
        fileSize: '2.1 MB',
        uploadedAt: '2026-01-10',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'biz-002',
    trackingNumber: 'GG-BIZ-2026-002',
    name: 'Cavalla Valley Logistics & Heavy Haulage Syndicate',
    sector: 'Transportation',
    ownership: 'Sole Proprietorship',
    location: 'Pennoken Junction, Grand Gedeh',
    services: ['Heavy timber haulage', 'Mineral specimen transport', 'Diesel fuel tankers', 'Container drayage from Harper Port'],
    contactPerson: 'Madam Beatrice Dehgar',
    contactPhone: '+231 886 523 910',
    contactEmail: 'bdehgar@cavallalogistics.com',
    legalStatus: 'LBR Registered',
    taxStatus: 'LRA Tax Compliant',
    workforceSize: 28,
    equipmentSummary: '8 Mercedes Actros Prime Movers, 4 Flatbed Trailers, 2 Fuel Bowsers (30,000L)',
    verifiedLocal: true,
    verificationStatus: 'Approved & Accredited',
    registrationDate: '2020-08-11',
    pastContracts: ['Singbeh Timber Log Transport ($240k)', 'MPW Aggregate Delivery ($115k)'],
    secretariatAuditNotes: 'Business registration and sole proprietor Grand Gedean citizenship verified. Fleet inspected and vehicle titles authenticated.',
    accreditedBy: 'Executive Secretariat Audit Committee',
    uploadedCredentials: [
      {
        id: 'cred-b02-1',
        name: 'Articles of Registration & LBR Certificate',
        docType: 'LBR Business Registration',
        fileName: 'Cavalla_Logistics_LBR.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-02-05',
        status: 'Verified'
      },
      {
        id: 'cred-b02-2',
        name: 'Fleet Insurance & Road Worthiness Certificates',
        docType: 'Proof of Address',
        fileName: 'Truck_Fleet_Insurance_Pact.pdf',
        fileSize: '3.4 MB',
        uploadedAt: '2026-02-05',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'biz-003',
    trackingNumber: 'GG-BIZ-2026-003',
    name: 'Putu Green Horizon Catering & Camp Support Services',
    sector: 'Catering',
    ownership: 'Partnership / Joint Venture',
    location: 'Putu Jarwodee / Zwedru',
    services: ['Industrial camp meal catering (500+ meals/day)', 'Camp laundry & housekeeping', 'Food hygiene certified'],
    contactPerson: 'Comfort S. Gaye',
    contactPhone: '+231 777 904 213',
    legalStatus: 'Certified',
    taxStatus: 'LRA Tax Compliant',
    workforceSize: 34,
    equipmentSummary: 'Commercial bakery, 2 walk-in cold rooms, 2 refrigerated delivery vans',
    verifiedLocal: true,
    verificationStatus: 'Approved & Accredited',
    registrationDate: '2023-01-20',
    pastContracts: ['PIOM Exploration Camp Kitchen Support ($320k)'],
    secretariatAuditNotes: 'Partnership agreement and Articles of Incorporation verified by Secretariat. Grand Gedean ownership verified against corporate share register.',
    accreditedBy: 'Public Health & Nutrition Desk',
    uploadedCredentials: [
      {
        id: 'cred-b03-1',
        name: 'Articles of Incorporation & MOH Health Permit',
        docType: 'LBR Business Registration',
        fileName: 'Food_Safety_Cert_2026.pdf',
        fileSize: '950 KB',
        uploadedAt: '2026-03-01',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'biz-004',
    trackingNumber: 'GG-BIZ-2026-004',
    name: 'Grand Gedeh Tech Solutions & Solar Systems',
    sector: 'ICT',
    ownership: 'Sole Proprietorship',
    location: 'Commercial Street, Zwedru',
    services: ['Commercial solar mini-grid installation', 'Fiber optic pulling & splicing', 'CCTV & security telemetry', 'VSAT satellite comms'],
    contactPerson: 'David K. Tarley',
    contactPhone: '+231 880 771 490',
    legalStatus: 'LBR Registered',
    taxStatus: 'LRA Tax Compliant',
    workforceSize: 14,
    equipmentSummary: 'Optical fusion splicers, OTDR testers, solar inverter diagnostics, bucket truck',
    verifiedLocal: true,
    verificationStatus: 'Approved & Accredited',
    registrationDate: '2022-06-04',
    pastContracts: ['TRANSCO CLSG Auxiliary Solar Backup ($65k)', 'GGCC Computer Lab Networking ($42k)'],
    secretariatAuditNotes: 'Sole proprietorship registration verified. National ID and proof of Grand Gedeh origin verified.',
    uploadedCredentials: [
      {
        id: 'cred-b04-1',
        name: 'Certified Electrical Engineer License & LBR',
        docType: 'TVET Trade Certificate',
        fileName: 'Solar_Grid_Master_Lic.pdf',
        fileSize: '1.1 MB',
        uploadedAt: '2026-04-12',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'biz-005',
    trackingNumber: 'GG-BIZ-2026-005',
    name: 'Jarwodee Aggregate & Sand Crushing Syndicate',
    sector: 'Construction',
    ownership: 'Cooperative / Association',
    location: 'Putu District Quarry Zone',
    services: ['Crushed basalt rock supply', 'River sand washing', 'Quarry hauling'],
    contactPerson: 'Jackson K. Jarwodee',
    contactPhone: '+231 776 550 122',
    legalStatus: 'LBR Registered',
    taxStatus: 'LRA Tax Compliant',
    workforceSize: 18,
    equipmentSummary: 'Mobile jaw crusher (40 TPH), 2 wheel loaders, 3 dump trucks',
    verifiedLocal: false,
    verificationStatus: 'Pending Secretarial Audit',
    registrationDate: '2026-09-18',
    pastContracts: ['Jarwodee Feeder Culvert Aggregate ($45k)'],
    secretariatAuditNotes: 'Cooperative constitution and customary community resolution received. Secretariat scheduled on-site inspection for Oct 2, 2026.',
    uploadedCredentials: [
      {
        id: 'cred-b05-1',
        name: 'Articles of Association & LBR Certificate',
        docType: 'LBR Business Registration',
        fileName: 'MME_Quarry_Permit_App.pdf',
        fileSize: '2.4 MB',
        uploadedAt: '2026-09-18',
        status: 'Pending Verification',
        verificationNotes: 'Articles of Association under legal review by Secretariat.'
      },
      {
        id: 'cred-b05-2',
        name: 'Clan Chief Jarwodee Land Authorization Letter',
        docType: 'Proof of Address',
        fileName: 'Customary_Land_Auth_Letter.pdf',
        fileSize: '740 KB',
        uploadedAt: '2026-09-18',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'biz-006',
    trackingNumber: 'GG-BIZ-2026-006',
    name: 'Cavalla Basin Geotechnical & Drilling Services',
    sector: 'Construction',
    ownership: 'Partnership / Joint Venture',
    location: 'Zwedru Industrial Zone',
    services: ['Geotechnical drilling', 'Core sampling', 'Soil compaction testing'],
    contactPerson: 'Arthur Vance Gaye',
    contactPhone: '+231 777 882 109',
    legalStatus: 'LBR Registered',
    taxStatus: 'LRA Tax Compliant',
    workforceSize: 16,
    equipmentSummary: '2 Diamond core drill rigs, soil compaction lab',
    verifiedLocal: false,
    verificationStatus: 'Pending Secretarial Audit',
    registrationDate: '2026-09-21',
    pastContracts: [],
    secretariatAuditNotes: 'Articles of Incorporation and Partnership Agreement received. Secretariat legal desk auditing incorporator citizenship and shareholder registry.',
    uploadedCredentials: [
      {
        id: 'cred-b06-1',
        name: 'Articles of Incorporation & LBR Certificate',
        docType: 'LBR Business Registration',
        fileName: 'Cavalla_Geotech_Articles_LBR.pdf',
        fileSize: '1.8 MB',
        uploadedAt: '2026-09-21',
        status: 'Pending Verification',
        verificationNotes: 'Articles of Incorporation pending legal verification by Secretariat.'
      }
    ]
  },
  {
    id: 'biz-007',
    trackingNumber: 'GG-BIZ-2026-089',
    name: 'Monrovia Consolidated Logistics Ltd.',
    sector: 'Logistics',
    ownership: 'Corporation / LLC',
    location: 'Bushrod Island, Monrovia / Satellite Office Zwedru',
    services: ['Freight forwarding', 'Customs clearing', 'Container hauling'],
    contactPerson: 'Koffi A. Mensah',
    contactPhone: '+231 886 521 900',
    contactEmail: 'compliance@monrovia-logistics.lr',
    legalStatus: 'LBR Registered',
    taxStatus: 'LRA Tax Compliant',
    workforceSize: 28,
    equipmentSummary: '6 Flatbed trucks, 2 forklifts',
    verifiedLocal: false,
    verificationStatus: 'Denied & Disqualified',
    registrationDate: '2026-09-10',
    pastContracts: [],
    secretariatAuditNotes: 'Disqualified under Section 13 Beneficial Ownership Mandate. Corporate filings show 0% Grand Gedean indigenous ownership.',
    accreditedBy: 'Cllr. Saydee M. Krahn (Secretariat Legal Counsel)',
    uploadedCredentials: [
      {
        id: 'cred-b07-1',
        name: 'Articles of Incorporation (Monrovia)',
        docType: 'LBR Business Registration',
        fileName: 'MCL_Articles_Monrovia.pdf',
        fileSize: '1.9 MB',
        uploadedAt: '2026-09-10',
        status: 'Requires Re-upload',
        verificationNotes: 'Articles demonstrate 0% Grand Gedean indigenous ownership.'
      }
    ]
  }
];

export const WORKFORCE_DATA: WorkforceProfile[] = [
  {
    id: 'wf-001',
    trackingNumber: 'GG-TALENT-2026-001',
    fullName: 'Moses Glaydor Krahn',
    gender: 'Male',
    district: 'Putu District',
    isDiaspora: false,
    tradeCategory: 'Heavy-equipment operators',
    specialization: 'Excavator (CAT 349/390) & Dozer (D8/D9) Certified',
    qualificationLevel: 'Trade Certified',
    yearsExperience: 11,
    currentStatus: 'Available for Immediate Hire',
    verifiedSkills: ['Open Pit Bench Excavation', 'Grade Stake Reading', 'Heavy Hydraulics Inspection', 'MSHA Mining Safety'],
    verificationStatus: 'Approved & Accredited',
    secretariatAuditNotes: 'Operating licenses and TVET trade certification verified with Ministry of Transport and Bomi TVET center.',
    accreditedBy: 'GGCDC Human Capital Directorate',
    uploadedCredentials: [
      {
        id: 'cred-w01-1',
        name: 'Heavy Equipment Master Operator License',
        docType: 'Equipment Operator License',
        fileName: 'CAT_Heavy_Operator_Lic_Glaydor.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-01-20',
        status: 'Verified',
        verifiedBy: 'Workforce Accreditation Desk',
        verificationNotes: 'Class-C Commercial Operator License valid through 2028.'
      },
      {
        id: 'cred-w01-2',
        name: 'National TVET Certificate in Hydraulics',
        docType: 'TVET Trade Certificate',
        fileName: 'National_TVET_Cert_Hydraulics.pdf',
        fileSize: '890 KB',
        uploadedAt: '2026-01-20',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'wf-002',
    trackingNumber: 'GG-TALENT-2026-002',
    fullName: 'Helena Quaye Boley',
    gender: 'Female',
    district: 'Tchien District',
    isDiaspora: true,
    diasporaCountry: 'Canada (Calgary, AB)',
    tradeCategory: 'Geologists',
    specialization: 'Banded Iron Formation (BIF) Structural Geology & Leapfrog 3D',
    qualificationLevel: 'Master / PhD',
    yearsExperience: 14,
    currentStatus: 'Available for Advisory',
    verifiedSkills: ['Geostatistics', 'Diamond Core Logging', 'JORC Resource Classification', 'Mineral Economics'],
    verificationStatus: 'Approved & Accredited',
    secretariatAuditNotes: 'M.Sc. in Economic Geology from Univ. of Alberta verified. Registered with Professional Engineers & Geoscientists (APEGA).',
    accreditedBy: 'Dr. Archibald G. Boe (Technical Lead)',
    uploadedCredentials: [
      {
        id: 'cred-w02-1',
        name: 'M.Sc. Economic Geology Degree Certificate',
        docType: 'University Degree',
        fileName: 'MSc_Geology_Degree_Boley.pdf',
        fileSize: '2.5 MB',
        uploadedAt: '2026-02-14',
        status: 'Verified'
      },
      {
        id: 'cred-w02-2',
        name: 'Professional Geoscientist (P.Geo) License Canada',
        docType: 'University Degree',
        fileName: 'APEGA_PGeo_Lic_Boley.pdf',
        fileSize: '920 KB',
        uploadedAt: '2026-02-14',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'wf-003',
    trackingNumber: 'GG-TALENT-2026-003',
    fullName: 'Prince J. Wisseh',
    gender: 'Male',
    district: 'Gbao District',
    isDiaspora: false,
    tradeCategory: 'Welders',
    specialization: '6G Pipe Welding & Structural Arc (AWS D1.1 Certified)',
    qualificationLevel: 'Trade Certified',
    yearsExperience: 8,
    currentStatus: 'Available for Immediate Hire',
    verifiedSkills: ['TIG & MIG Welding', 'Structural Steel Erection', 'Pipeline Hydrostatic Testing', 'NDT Inspection Readiness'],
    verificationStatus: 'Approved & Accredited',
    uploadedCredentials: [
      {
        id: 'cred-w03-1',
        name: 'American Welding Society (AWS) 6G Certificate',
        docType: 'TVET Trade Certificate',
        fileName: 'AWS_6G_Pipe_Cert_Wisseh.pdf',
        fileSize: '1.3 MB',
        uploadedAt: '2026-03-10',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'wf-004',
    trackingNumber: 'GG-TALENT-2026-004',
    fullName: 'Dr. Josephus Tarwoe',
    gender: 'Male',
    district: 'B\'hai District',
    isDiaspora: true,
    diasporaCountry: 'United States (Atlanta, GA)',
    tradeCategory: 'Civil engineers',
    specialization: 'Tailings Dam Engineering & Hydrology Assessment',
    qualificationLevel: 'Master / PhD',
    yearsExperience: 22,
    currentStatus: 'Available for Advisory',
    verifiedSkills: ['Dam Safety Audits', 'HEC-RAS Flood Modeling', 'Sediment Transport', 'Environmental Permitting'],
    verificationStatus: 'Approved & Accredited',
    uploadedCredentials: [
      {
        id: 'cred-w04-1',
        name: 'Ph.D. Civil & Environmental Engineering Diploma',
        docType: 'University Degree',
        fileName: 'PhD_Civil_Eng_Tarwoe.pdf',
        fileSize: '3.1 MB',
        uploadedAt: '2026-01-05',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'wf-005',
    trackingNumber: 'GG-TALENT-2026-005',
    fullName: 'Ruth Dennis Freeman',
    gender: 'Female',
    district: 'B\'hai District',
    isDiaspora: true,
    diasporaCountry: 'United Kingdom (London)',
    tradeCategory: 'Surveyors',
    specialization: 'Cadastral & Mining Lease Geodetic GNSS Surveying',
    qualificationLevel: 'Master / PhD',
    yearsExperience: 12,
    currentStatus: 'Available for Advisory',
    verifiedSkills: ['RTK GPS', 'Drone Photogrammetry (LiDAR)', 'Boundary Demarcation', 'ArcGIS Pro'],
    verificationStatus: 'Pending Secretarial Audit',
    secretariatAuditNotes: 'Credentials submitted; awaiting notarized translation of UK RICS surveyor certification.',
    uploadedCredentials: [
      {
        id: 'cred-w05-1',
        name: 'Royal Institution of Chartered Surveyors (RICS) Diploma',
        docType: 'University Degree',
        fileName: 'RICS_Surveyor_Cert_Freeman.pdf',
        fileSize: '2.8 MB',
        uploadedAt: '2026-09-15',
        status: 'Pending Verification',
        verificationNotes: 'Pending secretarial background validation.'
      }
    ]
  },
  {
    id: 'wf-006',
    trackingNumber: 'GG-TALENT-2026-006',
    fullName: 'David K. Broh',
    gender: 'Male',
    district: 'Tchien District',
    isDiaspora: false,
    tradeCategory: 'Heavy Equipment Operators',
    specialization: 'Excavator & Bulldozer Operator',
    qualificationLevel: 'Trade Certified',
    yearsExperience: 4,
    currentStatus: 'Currently Employed',
    verifiedSkills: ['Earthmoving'],
    verificationStatus: 'Denied & Disqualified',
    secretariatAuditNotes: 'Disqualified due to forged / non-verifiable trade certificate. TVET certification serial number rejected by BWI accreditation database.',
    accreditedBy: 'Secretariat Technical Review Board',
    uploadedCredentials: [
      {
        id: 'cred-w06-1',
        name: 'Operator Certificate (Unverifiable)',
        docType: 'TVET Trade Certificate',
        fileName: 'Heavy_Equip_Cert_Unverified.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-09-08',
        status: 'Requires Re-upload',
        verificationNotes: 'Serial number could not be validated with issuing institution.'
      }
    ]
  }
];

export const COMMUNITIES_DATA: CommunityProfile[] = [
  {
    id: 'com-zwedru',
    name: 'Zwedru City Center',
    district: 'Tchien District',
    estimatedPopulation: 45000,
    traditionalLeader: 'Paramount Chief Johnnie B. Gbaba',
    womenRepresentative: 'Madam Mary Tweh Dennis',
    youthLeader: 'Amos G. Quiah',
    customaryLandBody: 'Zwedru Metropolitan Land & Urban Development Authority',
    majorLivelihoods: ['Commerce & Retail', 'Public Administration', 'Artisanal Services', 'Education & Transport'],
    infrastructure: {
      schools: 14,
      clinics: 4,
      roadAccessibility: 'Year-round Paved',
      cleanWaterAccessPct: 68,
      electricityAccess: 'National Grid (CLSG)'
    },
    affectingProjects: ['CLSG Zwedru 225kV Substation', 'Ganta-Zwedru Asphalt Corridor', 'Putu Logistics Hub'],
    signedAgreements: ['Zwedru Urban Infrastructure Accord 2023'],
    topDevelopmentPriorities: [
      'Completion of city asphalt ring road',
      'Expansion of municipal treated pipe-borne water system',
      'Construction of Grand Gedeh Sports & Cultural Stadium'
    ],
    activeGrievanceCount: 1,
    consultationsAttended: 12,
    lat: 6.0719,
    lng: -8.1322
  },
  {
    id: 'com-jarwodee',
    name: 'Putu Jarwodee',
    district: 'Putu District',
    estimatedPopulation: 6200,
    traditionalLeader: 'Clan Chief Peter K. Jarwodee',
    womenRepresentative: 'Madam Martha V. Poah',
    youthLeader: 'Eric T. Glay',
    customaryLandBody: 'Putu Customary Land Governance Committee (PCLGC)',
    majorLivelihoods: ['Smallholder Farming', 'Artisanal Gold Panning', 'Forest Harvesting', 'Mining Camp Commerce'],
    infrastructure: {
      schools: 2,
      clinics: 1,
      roadAccessibility: 'Seasonal Unpaved',
      cleanWaterAccessPct: 42,
      electricityAccess: 'Solar Mini-Grid'
    },
    affectingProjects: ['Putu Iron Ore Project', 'Putu Feeder Road Paving'],
    signedAgreements: ['Putu Community Development Agreement (CDA) 2024'],
    topDevelopmentPriorities: [
      'Completion of 12-Classroom High School with science lab',
      'Year-round asphalt surface on 35km access road from Zwedru highway',
      'Solar mini-grid expansion to 800 households'
    ],
    activeGrievanceCount: 3,
    consultationsAttended: 24,
    lat: 5.6833,
    lng: -8.1667
  },
  {
    id: 'com-pennoken',
    name: 'Pennoken',
    district: 'Tchien / Putu Corridor',
    estimatedPopulation: 4800,
    traditionalLeader: 'Town Chief Matthew D. Pennoh',
    womenRepresentative: 'Grace N. Weah',
    youthLeader: 'Francis B. Gaye',
    customaryLandBody: 'Pennoken Community Land Board',
    majorLivelihoods: ['Cassava & Rice Cultivation', 'Timber Trucking Support', 'Commercial Trading'],
    infrastructure: {
      schools: 2,
      clinics: 1,
      roadAccessibility: 'Year-round Paved',
      cleanWaterAccessPct: 55,
      electricityAccess: 'National Grid (CLSG)'
    },
    affectingProjects: ['Ganta-Zwedru Asphalt Corridor', 'Putu Logistics Corridor'],
    signedAgreements: ['Highway Corridor Right-of-Way Social Compact'],
    topDevelopmentPriorities: [
      'Construction of modern market building for roadside traders',
      'Upgrading community clinic to 24-hour maternal health facility'
    ],
    activeGrievanceCount: 0,
    consultationsAttended: 9,
    lat: 6.0000,
    lng: -8.1667
  },
  {
    id: 'com-tuzon',
    name: 'Tuzon',
    district: 'Gbao District',
    estimatedPopulation: 3500,
    traditionalLeader: 'Elder Harrison Gaye Doe',
    womenRepresentative: 'Theresa K. Sarnor',
    youthLeader: 'Jackson B. Tarley',
    customaryLandBody: 'Gbao Customary Land Council',
    majorLivelihoods: ['Rubber Tapping', 'Cocoa Farming', 'Timber Cooperative'],
    infrastructure: {
      schools: 1,
      clinics: 1,
      roadAccessibility: 'Seasonal Unpaved',
      cleanWaterAccessPct: 48,
      electricityAccess: 'Generators Only'
    },
    affectingProjects: ['Singbeh Forest Management Concession (FMC-I)'],
    signedAgreements: ['FMC-I Community Social Agreement'],
    topDevelopmentPriorities: [
      'Paving feeder road connecting to highway',
      'Installation of solar-powered borehole water network',
      'Construction of agricultural crop storage warehouse'
    ],
    activeGrievanceCount: 1,
    consultationsAttended: 11,
    lat: 6.1500,
    lng: -8.2167
  },
  {
    id: 'com-toe-town',
    name: 'Toe Town',
    district: 'B\'hai District (Border Hub)',
    estimatedPopulation: 7200,
    traditionalLeader: 'Paramount Chief David K. Toe',
    womenRepresentative: 'Agnes M. Konneh',
    youthLeader: 'Patrick Z. Freeman',
    customaryLandBody: 'B\'hai Border Land Governance Council',
    majorLivelihoods: ['Cross-Border Trade with Côte d\'Ivoire', 'Commercial Cocoa', 'Transport Services'],
    infrastructure: {
      schools: 3,
      clinics: 2,
      roadAccessibility: 'Year-round Paved',
      cleanWaterAccessPct: 62,
      electricityAccess: 'Solar Mini-Grid'
    },
    affectingProjects: ['Ganta-Zwedru Highway Section', 'B\'hai Community Forest'],
    signedAgreements: ['Cross-Border Trade Infrastructure Compact'],
    topDevelopmentPriorities: [
      'Modern border customs and immigration cargo holding facility',
      'Connection to 33kV electrical transmission feeder line',
      'Vocational training institute for border youth'
    ],
    activeGrievanceCount: 0,
    consultationsAttended: 15,
    lat: 6.4167,
    lng: -8.3500
  },
  {
    id: 'com-tempo',
    name: 'Tempo',
    district: 'Cavalla District',
    estimatedPopulation: 3100,
    traditionalLeader: 'Clan Chief George B. Cavalla',
    womenRepresentative: 'Ruth S. Sayon',
    youthLeader: 'Samuel K. Dweh',
    customaryLandBody: 'Cavalla River Community Land Trust',
    majorLivelihoods: ['Riverine Fishing', 'Oil Palm Farming', 'Canoe & Barge Logistics'],
    infrastructure: {
      schools: 1,
      clinics: 0,
      roadAccessibility: 'Severely Challenged',
      cleanWaterAccessPct: 35,
      electricityAccess: 'None'
    },
    affectingProjects: ['Cavalla Commercial Agro-Venture'],
    signedAgreements: ['Cavalla Outgrower Tripartite Agreement'],
    topDevelopmentPriorities: [
      'Construction of first comprehensive community health clinic',
      'Bridge or reliable mechanized ferry crossing on Cavalla river',
      'Clean treated drinking water distribution system'
    ],
    activeGrievanceCount: 2,
    consultationsAttended: 8,
    lat: 5.8500,
    lng: -7.8000
  }
];

export const CONSULTATIONS_DATA: ConsultationItem[] = [
  {
    id: 'cons-001',
    title: 'Review of Revised Putu Community Development Framework (2026-2030)',
    sector: 'Mining & Extractives',
    relatedProject: 'Putu Iron Ore Project',
    openedDate: '2026-08-01',
    closingDate: '2026-10-15',
    status: 'Open for Submissions',
    submissionCount: 437,
    communitiesParticipating: 23,
    summary: 'Public review and community input on proposed escrow funding allocation, local procurement quotas, and resettlement compensation schedules for Putu Iron Ore concession.',
    keyQuestions: [
      'What percentage of annual concession contributions should be earmarked directly for tertiary and TVET scholarships vs physical infrastructure?',
      'How should environmental monitoring committees in downstream Cavalla villages be funded and selected?',
      'What grievance escalation mechanisms should exist if local employment quotas are missed?'
    ]
  },
  {
    id: 'cons-002',
    title: 'Grebo-Krahn National Park Buffer Zone Co-Management & Livelihood Plan',
    sector: 'Forestry, Environment & Climate',
    openedDate: '2026-07-15',
    closingDate: '2026-09-30',
    status: 'Reviewing Submissions',
    submissionCount: 284,
    communitiesParticipating: 16,
    summary: 'Evaluating sustainable non-timber forest product harvesting, eco-tourism development, and agroforestry incentives for fringe forest communities bordering the national park.',
    keyQuestions: [
      'Which traditional honey, mushroom, and rattan harvesting rights should be formally recognized?',
      'How can community ecotourism rangers be integrated with FDA forest warden patrol teams?'
    ]
  },
  {
    id: 'cons-003',
    title: 'Grand Gedeh County 5-Year Farm-to-Market Road Prioritization',
    sector: 'Agriculture & Food Systems',
    openedDate: '2026-05-10',
    closingDate: '2026-06-30',
    status: 'Report Published',
    submissionCount: 512,
    communitiesParticipating: 34,
    summary: 'Community and cooperative ranking of 14 critical feeder roads to determine priority engineering allocations in the upcoming Ministry of Public Works budget.',
    keyQuestions: [
      'Which feeder roads transport the highest seasonal volume of perishable food crops?',
      'What bridge crossings consistently fail during peak rainy seasons?'
    ],
    publishedReportUrl: '/reports/GGCDC-Feeder-Road-Prioritization-2026.pdf'
  }
];

export const EXPERTS_DATA: TechnicalExpert[] = [
  {
    id: 'exp-001',
    fullName: 'Cllr. Saydee Momolu Krahn',
    primaryDiscipline: 'Natural Resources Law & Concessions',
    highestDegree: 'LL.M. (Energy & Mining Law, Univ. of Dundee)',
    institution: 'Grand Gedeh Bar Association / International Legal Advisory',
    location: 'Monrovia, Liberia & Zwedru',
    workingGroupAssigned: 'Putu Mining & Development Working Group',
    specializationArea: 'Concession negotiations, stabilization clauses, and local content legislation',
    biographySnippet: 'Over 18 years advising African governments and civic coalitions on extractives contracts, arbitration, and community development agreements.',
    yearsOfExperience: 19,
    accreditationStatus: 'Senior Fellow'
  },
  {
    id: 'exp-002',
    fullName: 'Dr. Archibald G. Boe',
    primaryDiscipline: 'Mining Engineering & Mineral Economics',
    highestDegree: 'Ph.D. (Mining Engineering, Colorado School of Mines)',
    institution: 'African Mining Insights & Consulting',
    location: 'Johannesburg, South Africa (Grand Gedeh Diaspora)',
    workingGroupAssigned: 'Putu Mining & Development Working Group',
    specializationArea: 'Iron ore beneficiation, open-pit optimization, rail logistics economics',
    biographySnippet: 'Former senior mining engineer with BHP and Rio Tinto; advises GGCDC on technical validation of Putu mine feasibility studies.',
    yearsOfExperience: 24,
    accreditationStatus: 'Senior Fellow'
  },
  {
    id: 'exp-003',
    fullName: 'Dr. Evelyn S. Dehgar',
    primaryDiscipline: 'Forest Ecology & Carbon Finance',
    highestDegree: 'Ph.D. (Tropical Forestry & Climate Finance, Wageningen)',
    institution: 'West African Forest Institute',
    location: 'Accra, Ghana & Zwedru',
    workingGroupAssigned: 'Forestry, Environment & Climate Working Group',
    specializationArea: 'REDD+ carbon credit validation, biodiversity offsets, customary forest tenure',
    biographySnippet: 'Lead author on Upper Guinean forest conservation; structured $4.5M in community carbon partnerships across West Africa.',
    yearsOfExperience: 16,
    accreditationStatus: 'Accredited'
  },
  {
    id: 'exp-004',
    fullName: 'Eng. Solomon T. Wolo',
    primaryDiscipline: 'Transportation & Civil Infrastructure',
    highestDegree: 'M.Sc. (Civil & Pavement Engineering, Leeds University)',
    institution: 'Liberia Institution of Engineers (LIE)',
    location: 'Monrovia, Liberia',
    workingGroupAssigned: 'Infrastructure & Connectivity Working Group',
    specializationArea: 'Tropical highway asphalt design, hydraulic culvert sizing, contractor quality audits',
    biographySnippet: 'Supervised major highway trunk lines in Liberia and Sierra Leone; currently auditing Corridor 3 asphalt execution for GGCDC.',
    yearsOfExperience: 21,
    accreditationStatus: 'Accredited'
  },
  {
    id: 'exp-005',
    fullName: 'Prof. Jeremiah P. Gaye',
    primaryDiscipline: 'Agricultural Economics & Agribusiness',
    highestDegree: 'Ph.D. (Agro-Enterprise Development, Univ. of Ibadan)',
    institution: 'Grand Gedeh Community College (GGCC) School of Agriculture',
    location: 'Zwedru City, Grand Gedeh',
    workingGroupAssigned: 'Agriculture & Food Systems Working Group',
    specializationArea: 'Smallholder value chains, cocoa cooperative governance, micro-processing finance',
    biographySnippet: 'Dean of Agricultural Sciences at GGCC; designer of Grand Gedeh Smallholder Outgrower Modernization Framework.',
    yearsOfExperience: 18,
    accreditationStatus: 'Senior Fellow'
  },
  {
    id: 'exp-006',
    fullName: 'Dr. Victoria Dennis-Boley',
    primaryDiscipline: 'Public Health & Environmental Epidemiology',
    highestDegree: 'DrPH (Environmental Health, Johns Hopkins)',
    institution: 'Global Health Equity Partners',
    location: 'Washington D.C., USA (Grand Gedeh Diaspora)',
    workingGroupAssigned: 'Health & Social Development Working Group',
    specializationArea: 'Mining dust respiratory impact, riverine heavy metal bio-monitoring, community clinics',
    biographySnippet: 'Advises GGCDC on environmental health surveillance protocols for communities adjacent to Putu mining operations.',
    yearsOfExperience: 17,
    accreditationStatus: 'Accredited'
  }
];

export const WORKING_GROUPS_DATA: WorkingGroup[] = [
  {
    id: 'wg-putu',
    name: 'GGCDC Putu Mining & Development Working Group',
    pillar: 'Mining & Extractives',
    leadCoordinator: 'Cllr. Saydee Momolu Krahn (Legal & Mining Policy Lead)',
    deputyLead: 'Dr. Archibald G. Boe (Technical & Operations Lead)',
    mandate: 'Permanent specialized operational working group dedicated to analyzing, monitoring, and representing Grand Gedeh interests regarding the Putu Iron Ore Project, including contractual compliance, local hiring quotas, environmental baseline verification, and community fund escrow integrity.',
    memberCount: 14,
    activeProjects: ['Putu Iron Ore Project'],
    publicReportsCount: 6,
    tasks: [
      {
        id: 'tsk-001',
        title: 'Review legal terms of proposed 2026 Putu Concession Addendum',
        assignedTo: 'Cllr. Saydee M. Krahn',
        dueDate: '2026-10-10',
        priority: 'Critical',
        status: 'In Review'
      },
      {
        id: 'tsk-002',
        title: 'Conduct Q3 independent water sampling at 4 Cavalla river points',
        assignedTo: 'Dr. Victoria Dennis-Boley & Lab Team',
        dueDate: '2026-10-18',
        priority: 'High',
        status: 'Drafting'
      },
      {
        id: 'tsk-003',
        title: 'Reconcile local hiring database with concession contractor rosters',
        assignedTo: 'Moses Glaydor (Workforce Desk)',
        dueDate: '2026-10-25',
        priority: 'High',
        status: 'In Review'
      }
    ],
    risks: [
      {
        id: 'rsk-001',
        risk: 'Potential dilution of community royalty percentages in legislative addendum review',
        severity: 'Extreme',
        mitigation: 'Publish formal GGCDC Legal Position Paper and brief County Legislative Caucus.'
      },
      {
        id: 'rsk-002',
        risk: 'Delay in Jarwodee high school roof construction before October torrential rains',
        severity: 'High',
        mitigation: 'Direct escalation with contractor; site visit scheduled for next Monday.'
      }
    ],
    meetingNotesSnippet: 'Working group convened on September 18, 2026. Reviewed draft position on Article 14 of the MDA. Approved technical advisory team to inspect tailings dam soil test boreholes.'
  },
  {
    id: 'wg-forestry',
    name: 'Forestry, Environment & Climate Working Group',
    pillar: 'Forestry, Environment & Climate',
    leadCoordinator: 'Dr. Evelyn S. Dehgar',
    deputyLead: 'Elder Harrison Gaye Doe',
    mandate: 'Monitor commercial timber concessions, support customary community forest governance, safeguard Grebo-Krahn conservation corridors, and explore carbon credit revenues.',
    memberCount: 11,
    activeProjects: ['Singbeh Forest Management Concession (FMC-I)', 'B\'hai Community Forest'],
    publicReportsCount: 4,
    tasks: [
      {
        id: 'tsk-f01',
        title: 'Audit Singbeh Q2 cubic meter fee transfer to community accounts',
        assignedTo: 'Financial Audit Committee',
        dueDate: '2026-10-05',
        priority: 'High',
        status: 'Drafting'
      }
    ],
    risks: [
      {
        id: 'rsk-f01',
        risk: 'Encroachment across Grebo-Krahn national park southern buffer boundary',
        severity: 'High',
        mitigation: 'Joint satellite GIS monitoring with FDA rangers.'
      }
    ],
    meetingNotesSnippet: 'Working group met September 10, 2026. Finalized guidelines for Community Forest Governance elections in B\'hai District.'
  },
  {
    id: 'wg-agriculture',
    name: 'Agriculture & Agribusiness Working Group',
    pillar: 'Agriculture & Food Systems',
    leadCoordinator: 'Prof. Jeremiah P. Gaye',
    deputyLead: 'Madam Comfort S. Gaye',
    mandate: 'Accelerate smallholder productivity, foster agro-processing value addition, monitor agricultural concessions, and coordinate farm-to-market feeder road maintenance.',
    memberCount: 12,
    activeProjects: ['Cavalla River Commercial Agro-Venture', 'Grand Gedeh Cocoa Modernization'],
    publicReportsCount: 5,
    tasks: [
      {
        id: 'tsk-a01',
        title: 'Inspect Tempo palm oil mini-mill installation progress',
        assignedTo: 'Prof. J. Gaye',
        dueDate: '2026-10-12',
        priority: 'Medium',
        status: 'In Review'
      }
    ],
    risks: [
      {
        id: 'rsk-a01',
        risk: 'Excess post-harvest cocoa spoilage due to rainy season road impassability',
        severity: 'High',
        mitigation: 'Distribute mobile solar drying tents to 18 key cooperatives.'
      }
    ],
    meetingNotesSnippet: 'Met with 14 cooperative chairs in Zwedru on September 5, 2026 to standardize wholesale pricing benchmarks.'
  },
  {
    id: 'wg-infra',
    name: 'Infrastructure & Connectivity Working Group',
    pillar: 'Infrastructure & Public Utilities',
    leadCoordinator: 'Eng. Solomon T. Wolo',
    deputyLead: 'David K. Tarley',
    mandate: 'Track major highway paving, monitor electrical utility expansion from CLSG substation, audit rural water point functionality, and advocate for universal broadband coverage.',
    memberCount: 9,
    activeProjects: ['Ganta-Tapeta-Zwedru Highway Corridor', 'CLSG Zwedru Substation'],
    publicReportsCount: 7,
    tasks: [
      {
        id: 'tsk-i01',
        title: 'Conduct pavement thickness core sample test on Toe Town bypass',
        assignedTo: 'Eng. S. Wolo',
        dueDate: '2026-10-15',
        priority: 'High',
        status: 'Drafting'
      }
    ],
    risks: [
      {
        id: 'rsk-i01',
        risk: 'Substation feeder overload during peak evening industrial demand',
        severity: 'Medium',
        mitigation: 'LEC requested to commission 2nd 15MVA transformer bank.'
      }
    ],
    meetingNotesSnippet: 'Completed monthly joint highway walk-through with MPW resident engineer on September 14, 2026.'
  },
  {
    id: 'wg-enterprise',
    name: 'Local Enterprise, Jobs & Skills Working Group',
    pillar: 'Local Enterprise, Jobs & Skills',
    leadCoordinator: 'Madam Beatrice Dehgar',
    deputyLead: 'Amos G. Quiah',
    mandate: 'Promote Grand Gedeh businesses for concession procurement, run the county workforce skills database, and coordinate TVET apprentice matching with concessionaires.',
    memberCount: 13,
    activeProjects: ['County Supplier Development Program', 'Youth TVET Fast-Track'],
    publicReportsCount: 3,
    tasks: [
      {
        id: 'tsk-e01',
        title: 'Verify 22 newly registered Grand Gedeh SME vendor credentials',
        assignedTo: 'Compliance Sub-committee',
        dueDate: '2026-10-02',
        priority: 'High',
        status: 'Completed'
      }
    ],
    risks: [
      {
        id: 'rsk-e01',
        risk: 'Concessionaires citing lack of certifications to bypass local suppliers',
        severity: 'High',
        mitigation: 'Partner with Ministry of Commerce to offer free ISO/HSE certification workshops in Zwedru.'
      }
    ],
    meetingNotesSnippet: 'Organized first Grand Gedeh Supplier & Buyer B2B Matchmaking Day in Zwedru with 42 enterprise attendees.'
  }
];

export const DOCUMENTS_DATA: DocumentItem[] = [
  {
    id: 'doc-001',
    title: 'Putu Iron Ore Mineral Development Agreement (Full Ratified Text)',
    sector: 'Mining & Extractives',
    projectName: 'Putu Iron Ore Project',
    docType: 'Mineral Development Agreement (MDA)',
    date: 'September 2010',
    classification: 'Public Document',
    size: '14.2 MB',
    fileFormat: 'PDF',
    concessionCode: 'MDA-PIOM-2010-09',
    parties: 'Republic of Liberia & Putu Iron Ore Mining Inc. (PIOM) / Severstal',
    ratificationStatus: 'Ratified by 52nd National Legislature & Enacted into Law',
    statutoryBasis: 'Mining Law of 2000 & LEITI Mandatory Public Disclosure Protocol',
    summary: 'The statutory 25-year concession agreement granting mineral exploration and commercial extraction rights over the Putu Mountain iron ore range (425 km²), establishing royalties, taxes, local employment quotas, and community development escrow.',
    keyClauses: [
      {
        article: 'Article 12: Employment, Training & Local Content',
        title: 'Local Workforce & Skill Transfer Mandate',
        summary: 'Requires minimum 60% Liberian management/supervisory personnel and 70% unskilled labor recruited exclusively from Putu and Tchien Districts.',
        statutoryDetail: 'PIOM shall give first priority in hiring to qualified Liberians. For unskilled positions, 100% shall be residents of Grand Gedeh County, with 70% from Putu District. The Concessionaire shall expend not less than $250,000 USD annually on technical training and scholarships for Grand Gedeh youth.'
      },
      {
        article: 'Article 15: Local Procurement Preference',
        title: 'Grand Gedean Business Procurement Quota',
        summary: '25% of all non-specialized supply, transport, catering, and construction contracts must be awarded to certified Grand Gedeh businesses.',
        statutoryDetail: 'The Concessionaire and its subcontractors shall procure goods and services from Liberian suppliers with physical presence in Grand Gedeh County, provided prices are competitive within a 10% tolerance margin.'
      },
      {
        article: 'Article 18: Social Development Fund Escrow',
        title: 'Annual County Development Contribution',
        summary: 'Mandates $3,000,000 USD paid annually into the dedicated Grand Gedeh County Social Development Escrow Account.',
        statutoryDetail: 'Commencing upon commercial production and escalating annually, PIOM shall disburse $3,000,000 USD directly to the Grand Gedeh County Social Development Fund escrow account administered jointly by the County Council and the Ministry of Finance.'
      },
      {
        article: 'Article 22: Infrastructure Development Covenants',
        title: 'Road, School & Hospital Infrastructure Obligations',
        summary: 'Mandates construction of 35km Jarwodee-to-Zwedru paved haul road, 12-classroom high school, and expansion of Martha Tubman Hospital surgical wing.',
        statutoryDetail: 'The Concessionaire covenants to construct and maintain an all-weather bituminous road connecting Jarwodee to the Zwedru corridor, construct a modern 12-classroom secondary school with laboratory in Jarwodee, and equip a specialized trauma wing at Martha Tubman Memorial Hospital.'
      },
      {
        article: 'Article 26: Environmental Safeguards & Tailings Security',
        title: 'Zero-Discharge Environmental Covenants',
        summary: 'Continuous Cavalla River watershed testing, dust abatement, and international dam safety standards for tailings containment.',
        statutoryDetail: 'PIOM shall maintain an ISO 14001 certified environmental management system. Toxic effluent discharge into Cavalla or Gee river tributaries is strictly prohibited. An environmental remediation bond of $15,000,000 USD shall be lodged with the Central Bank of Liberia.'
      }
    ],
    fullContractText: `REPUBLIC OF LIBERIA
MINERAL DEVELOPMENT AGREEMENT
BETWEEN THE REPUBLIC OF LIBERIA
AND PUTU IRON ORE MINING INC. (PIOM)

RATIFIED BY THE HONORABLE SENATE AND HOUSE OF REPRESENTATIVES
52ND LEGISLATURE OF THE REPUBLIC OF LIBERIA

CONCESSION CODE: MDA-PIOM-2010-09
LOCATION: PUTU MOUNTAIN RIDGE, GRAND GEDEH COUNTY
CONCESSION FOOTPRINT: 425 SQUARE KILOMETERS

PREAMBLE
WHEREAS, under the Constitution and the Minerals and Mining Law of 2000 of the Republic of Liberia, all minerals situated on, under, or within the land and continental shelf of Liberia are the property of the Republic; and
WHEREAS, the Republic desires to foster sustainable industrial development and maximize economic benefits for the people of Grand Gedeh County and Liberia as a whole; and
WHEREAS, the Concessionaire possesses the technical competence and financial resources required to execute commercial iron ore exploration, extraction, processing, and exportation;

NOW THEREFORE, the Parties hereby agree to the binding terms, articles, and enforceable covenants set forth herein:

ARTICLE I - GRANT OF CONCESSION RIGHTS
The Republic hereby grants to the Concessionaire the exclusive right and license to conduct Exploration and Commercial Operations within the Concession Area (Putu Range, Grand Gedeh County) for a term of twenty-five (25) years, subject to statutory renewal.

ARTICLE XII - EMPLOYMENT, TRAINING AND LOCAL CONTENT
1. The Concessionaire shall employ qualified Liberians in all job categories to the maximum extent feasible.
2. In respect of unskilled positions, 100% of all personnel shall be citizens of the Republic residing in Grand Gedeh County, of which not less than 70% shall be recruited directly from Putu and Tchien Districts.
3. Within five (5) years of commercial production, not less than 60% of supervisory and managerial staff shall be qualified Liberian citizens.
4. An annual scholarship and TVET fund of $250,000 USD shall be deposited to the Grand Gedeh Community College (GGCC) technical endowment.

ARTICLE XV - PROCUREMENT OF LOCAL GOODS AND SERVICES
1. The Concessionaire and its first-tier subcontractors shall accord preference to registered Grand Gedean contractors and suppliers for all civil works, haulage, catering, security, uniform fabrication, and general consumables.
2. A minimum target of 25% of all non-specialized procurement spend shall be allocated to enterprises certified by the GGCDC Local Business Registry.

ARTICLE XVIII - SOCIAL DEVELOPMENT FUND AND COMMUNITY DIVIDENDS
1. The Concessionaire shall pay into the Grand Gedeh County Social Development Fund (CSDF) an annual social contribution of Three Million United States Dollars ($3,000,000 USD).
2. All disbursements shall be audited annually by the General Auditing Commission (GAC) and LEITI, with audit findings posted publicly in Zwedru and Monrovia.

ARTICLE XXII - INFRASTRUCTURE COMMITMENTS
1. Pave and maintain the 35km arterial feeder road connecting Jarwodee to the primary Ganta-Zwedru highway.
2. Finance and erect a modern 12-classroom comprehensive high school with solar electrification in Jarwodee.
3. Construct and fully equip an emergency surgical wing at Martha Tubman Memorial Hospital in Zwedru.

ARTICLE XXVI - ENVIRONMENTAL PROTECTION & WATER SECURITY
1. Continuous ambient air and water sampling across the Cavalla and Gee river basins.
2. Tailings containment facilities shall strictly comply with Canadian Dam Association safety guidelines.
3. Zero discharge of unneutralized acidic or metallurgical effluents into community water sources.

IN WITNESS WHEREOF, the duly authorized representatives of the Parties have executed this Mineral Development Agreement in the City of Monrovia, Republic of Liberia.`
  },
  {
    id: 'doc-002',
    title: 'Putu Revised Community Development Agreement (CDA) Framework 2024-2028',
    sector: 'Mining & Extractives',
    projectName: 'Putu Iron Ore Project',
    docType: 'Community Development Agreement (CDA)',
    date: 'March 2024',
    classification: 'Public Document',
    size: '4.8 MB',
    fileFormat: 'PDF',
    concessionCode: 'CDA-PUTU-2024-R2',
    parties: 'Putu Affected Communities Committee, Ministry of Mines & Energy, & PIOM',
    ratificationStatus: 'Executed & Enacted into Community By-Laws',
    statutoryBasis: 'Mining Law 2000 Section 6.2 & Community Rights Guidelines',
    summary: 'Tripartite covenant delineating direct annual clan disbursements, local project committee governance, TVET scholarship quotas, clean water boreholes, and farm compensation schedules.',
    keyClauses: [
      {
        article: 'Section 3: Clan Revenue Allocations',
        title: 'Equitable Affected Clan Revenue Sharing',
        summary: 'Prescribes percentage allocation formula among the 5 affected communities: Jarwodee (40%), Pennoken (25%), Tiama (15%), Polar Town (10%), Pewee (10%).',
        statutoryDetail: 'All community social fund receipts shall be disbursed directly from escrow into community bank accounts co-signed by the District Superintendent, Paramount Chief, and Community Representative.'
      },
      {
        article: 'Section 7: Water & Sanitation Program',
        title: 'Solar Borehole Construction',
        summary: 'Guarantees 6 modern solar-powered potable water boreholes across the concession catchment corridor.',
        statutoryDetail: 'Water quality shall be verified quarterly by independent technicians against WHO drinking water guidelines.'
      }
    ],
    fullContractText: `TRIPARTITE COMMUNITY DEVELOPMENT AGREEMENT (CDA)
PUTU IRON ORE PROJECT - GRAND GEDEH COUNTY (2024-2028 REVISION)

PARTIES:
1. THE PUTU AFFECTED COMMUNITIES DEVELOPMENT COMMITTEE (PACDC)
2. THE MINISTRY OF MINES & ENERGY, REPUBLIC OF LIBERIA
3. PUTU IRON ORE MINING INC. (PIOM)

PURPOSE:
To guarantee that the host communities of Putu District directly receive statutory dividends, infrastructure, social investments, and employment opportunities arising from the commercial exploitation of Putu Mountain iron ore reserves.

ARTICLE 3 - ALLOCATION OF COMMUNITY SOCIAL FUNDS
The annual CDA social fund allocation of $3,000,000 USD shall be distributed transparently among host clans:
- Putu Jarwodee Clan (Epicenter): 40% ($1,200,000 USD)
- Pennoken Clan: 25% ($750,000 USD)
- Tiama Town Clan: 15% ($450,000 USD)
- Polar Town Clan: 10% ($300,000 USD)
- Pewee Village & Outlying Settlements: 10% ($300,000 USD)

ARTICLE 5 - COMMUNITY-DIRECTED INFRASTRUCTURE
1. Construction of 6 industrial solar-powered water boreholes with overhead distribution tanks.
2. Complete electrification of Jarwodee central clinic with 20kVA solar mini-grid.
3. Establishment of Putu Youth Technical Vocational Center providing accredited mechanical and electrical certifications.

ARTICLE 8 - GRIEVANCE AND REDRESS MECHANISM
Host communities retain the right to lodge binding complaints before the Joint Tripartite Steering Committee. Decisions shall be rendered within 14 calendar days.`
  },
  {
    id: 'doc-003',
    title: 'Environmental and Social Impact Assessment (ESIA) Executive Clearance - Putu Project',
    sector: 'Mining & Extractives',
    projectName: 'Putu Iron Ore Project',
    docType: 'ESIA / Environmental',
    date: 'November 2023',
    classification: 'Public Document',
    size: '8.6 MB',
    fileFormat: 'PDF',
    concessionCode: 'EPA-ESIA-PIOM-2023-REV',
    parties: 'Environmental Protection Agency of Liberia (EPA) & PIOM',
    ratificationStatus: 'EPA Operating Permit Issued & Active',
    statutoryBasis: 'Environment Protection and Management Law of Liberia (EPML)',
    summary: 'Comprehensive scientific baseline study assessing biodiversity, hydrological security across the Cavalla drainage basin, ambient noise/dust thresholds, and resettlement frameworks.',
    keyClauses: [
      {
        article: 'Clause 4: Cavalla Basin Hydrological Protection',
        title: 'Strict Effluent Neutralization Limits',
        summary: 'Zero untreated chemical discharge into Cavalla or Gee tributaries with weekly automated telemetry monitoring.',
        statutoryDetail: 'All process water shall pass through multi-stage neutralizing and sedimentation clarifiers before release.'
      },
      {
        article: 'Clause 9: Biological Buffer Zones',
        title: 'Putu Ridge Endemic Habitat Sanctuary',
        summary: 'Dedicates 85 km² of pristine high-elevation ridge forest as an undisturbed biodiversity sanctuary.',
        statutoryDetail: 'No mining excavation, road building, or explosive blasting permitted within the designated high-conservation zone.'
      }
    ]
  },
  {
    id: 'doc-004',
    title: 'FDA Commercial Forest Management Contract FMC Area "I" (Singbeh Concession)',
    sector: 'Forestry, Environment & Climate',
    projectName: 'Singbeh Forest Management Concession',
    docType: 'Forest Management Contract (FMC)',
    date: 'June 2018',
    classification: 'Public Document',
    size: '6.1 MB',
    fileFormat: 'PDF',
    concessionCode: 'FDA-FMC-001-AREA-I',
    parties: 'Forestry Development Authority (FDA) & Singbeh Timber Corporation (STC)',
    ratificationStatus: 'Ratified by National Legislature (25-Year Lease 2018-2043)',
    statutoryBasis: 'National Forestry Reform Law of 2006 (NFRL) & LEITI Forestry Matrix',
    summary: '25-year commercial timber concession covering 118,500 hectares across B\'hai and Gbao Districts, detailing annual allowable cut, cubic meter fees, 30m riverbuffer preservation, and CFDC social agreements.',
    keyClauses: [
      {
        article: 'Article 14: Community Social Benefits',
        title: 'Cubic Meter Fee Direct Payments',
        summary: 'Mandates $1.50 USD per cubic meter of timber felled paid directly to the B\'hai & Gbao Community Forest Development Committee (CFDC).',
        statutoryDetail: 'Payments must be deposited quarterly into the designated community account. Failure to disburse within 30 days triggers an automatic halt to log export barcoding.'
      },
      {
        article: 'Article 19: Environmental Harvest Guidelines',
        title: 'Selective Felling and River Buffers',
        summary: 'Strict prohibition on felling trees within 30 meters of perennial waterways; mandatory 30-year polycyclic harvest rotations.',
        statutoryDetail: 'No harvesting of endangered tree species (e.g. Sipo, Entandrophragma utile) below statutory diameter-at-breast-height thresholds.'
      },
      {
        article: 'Article 24: Local Workforce Quotas',
        title: '80% Local Labor Reservation',
        summary: '80% of all logging, trucking, yard operations, and sawmill personnel recruited from Grand Gedeh County.',
        statutoryDetail: 'The concessionaire shall operate an on-site technical training facility in Toe Town for heavy machinery maintenance.'
      }
    ],
    fullContractText: `REPUBLIC OF LIBERIA
FORESTRY DEVELOPMENT AUTHORITY (FDA)
FOREST MANAGEMENT CONTRACT (FMC) AREA "I"

CONCESSIONAIRE: SINGBEH TIMBER CORPORATION (STC)
LOCATION: B'HAI AND GBAO DISTRICTS, GRAND GEDEH COUNTY
LAND AREA: 118,500 HECTARES
CONCESSION CODE: FDA-FMC-001-AREA-I
VALIDITY: 2018 - 2043 (25 YEARS)

PART I - GRANT AND HARVEST RIGHTS
The Republic of Liberia, through the Forestry Development Authority, grants to STC the commercial harvest rights over 118,500 hectares within FMC Area "I", adhering strictly to the National Forestry Reform Law of 2006 and the Liberfor Chain-of-Custody protocol.

PART IV - STATUTORY FISCAL PAYMENTS
1. Area Fee: $2.50 USD per hectare per annum, paid to the Liberia Revenue Authority.
2. Stumpage and Export Fees: In accordance with FDA Regulation 107-07.
3. Cubic Meter Fee to Communities: $1.50 USD per cubic meter felled paid directly to the joint B'hai and Gbao Community Forest Development Committee (CFDC).

PART VII - COMMUNITY OBLIGATIONS & SOCIAL PACT
1. Maintenance of 48km timber bypass route preventing heavy truck destruction of the Zwedru public corridor.
2. Construction of 4 borehole clean water wells in Tuzon, Toe Town, B'hai Gorbo, and Zleh Town.
3. Annual grant of $15,000 USD to Grand Gedeh Community College Forestry Department.

PART IX - ENVIRONMENTAL SAFEGUARDS
1. 30-meter no-harvest buffer along all rivers, creeks, and permanent water bodies.
2. Maximum annual allowable cut of 3,950 hectares in compliance with the 30-year cutting cycle.
3. Maintenance of indigenous reforestation nursery cultivating 50,000 saplings per year.`
  },
  {
    id: 'doc-005',
    title: 'FDA Commercial Forest Management Contract FMC Area "K" (Grand Gedeh / River Gee Concession)',
    sector: 'Forestry, Environment & Climate',
    projectName: 'FMC Area "K" Commercial Forestry Concession',
    docType: 'Forest Management Contract (FMC)',
    date: 'April 2019',
    classification: 'Public Document',
    size: '5.7 MB',
    fileFormat: 'PDF',
    concessionCode: 'FDA-FMC-002-AREA-K',
    parties: 'Forestry Development Authority (FDA) & Euro-Liberia Logging Corp.',
    ratificationStatus: 'Ratified by National Legislature',
    statutoryBasis: 'National Forestry Reform Law 2006 & FDA Regulation 104-07',
    summary: '60,000-hectare commercial timber concession along the southern Grand Gedeh corridor, governing annual allowable cut, community cubic meter fees, and social development infrastructure.',
    keyClauses: [
      {
        article: 'Article 11: Community Cubic Meter Fees',
        title: 'Community Revenue Rights',
        summary: '$2.00 USD per m³ felled paid directly to surrounding clan development committees in Tuzon and Barte-Jam.',
        statutoryDetail: 'All log extractions logged electronically through Liberfor barcoding with quarterly reconciliation.'
      },
      {
        article: 'Article 17: Local Infrastructure',
        title: 'School & Clinic Rehabilitation',
        summary: 'Mandates full renovation of Tuzon Public School and provision of medical supplies to Barte-Jam health clinic.',
        statutoryDetail: 'Infrastructure deliverables verified annually by the County Forest Monitoring Taskforce.'
      }
    ]
  },
  {
    id: 'doc-006',
    title: 'B\'hai Authorized Community Forest Management Agreement (CFMA)',
    sector: 'Forestry, Environment & Climate',
    projectName: 'B\'hai Community Forest Governance',
    docType: 'Community Forest Agreement (CFMA)',
    date: 'October 2019',
    classification: 'Public Document',
    size: '3.9 MB',
    fileFormat: 'PDF',
    concessionCode: 'CFMA-BHAI-2019-FDA',
    parties: 'B\'hai Community Forest Management Body (CFMB) & FDA',
    ratificationStatus: 'Certified by FDA Board of Directors under Community Rights Law',
    statutoryBasis: 'Community Rights Law of 2009 with Respect to Forest Lands (CRL)',
    summary: '32,000-hectare customary forest agreement devolving complete legal ownership and management to the B\'hai Community Assembly, establishing conservation zones, non-timber forest product harvesting, and smallholder woodlot rights.',
    keyClauses: [
      {
        article: 'Clause 6: Community Sovereignty & Revenues',
        title: 'Direct Community Revenue Retention',
        summary: '100% of all timber, carbon credit, and non-timber forest revenues retained and managed by the B\'hai Community Assembly.',
        statutoryDetail: 'No third-party commercial logging agreements can be entered into without Free, Prior, and Informed Consent (FPIC) by two-thirds majority vote.'
      },
      {
        article: 'Clause 12: Grebo-Krahn Buffer Protection',
        title: 'Biodiversity Corridor Sanctuary',
        summary: 'Establishes a 5,000-hectare buffer zone protecting endangered western chimpanzee and pygmy hippopotamus migration routes.',
        statutoryDetail: 'Community ecoguards empowered to enforce anti-poaching ordinances across customary land boundaries.'
      }
    ]
  },
  {
    id: 'doc-007',
    title: 'Boe & Quilla Customary Community Forest Agreement (CFMA)',
    sector: 'Forestry, Environment & Climate',
    projectName: 'Boe & Quilla Community Forest',
    docType: 'Community Forest Agreement (CFMA)',
    date: 'January 2021',
    classification: 'Public Document',
    size: '3.2 MB',
    fileFormat: 'PDF',
    concessionCode: 'CFMA-BOE-QUILLA-2021',
    parties: 'Boe & Quilla Community Forest Assembly & FDA',
    ratificationStatus: 'Ratified by Community General Assembly & FDA',
    statutoryBasis: 'Community Rights Law of 2009 & Land Rights Act of 2018',
    summary: '24,500-hectare customary community forest in Gbarzon District recognizing customary ownership, sustainable agroforestry, and traditional sacred grove preservation.',
    keyClauses: [
      {
        article: 'Section 4: Customary Land Boundary Demarcation',
        title: 'Perimeter Boundary Demarcation',
        summary: 'GPS-surveyed customary boundary legally validated against neighboring clan holdings.',
        statutoryDetail: 'Boundary markers installed with participation of Land Authority and Council of Elders.'
      }
    ]
  },
  {
    id: 'doc-008',
    title: 'Hummingbird Resources / Avesoro Gold Exploration & Mineral Rights Accord',
    sector: 'Mining & Extractives',
    projectName: 'Konobo-Barwo Gold Exploration',
    docType: 'Mineral Development Agreement (MDA)',
    date: 'May 2021',
    classification: 'Public Document',
    size: '7.8 MB',
    fileFormat: 'PDF',
    concessionCode: 'MME-MEL-HB-2021-04',
    parties: 'Ministry of Mines & Energy & Hummingbird Resources Liberia Ltd.',
    ratificationStatus: 'Active Mineral Exploration License (MEL)',
    statutoryBasis: 'Minerals and Mining Law of 2000 Section 5.1',
    summary: 'Concession agreement covering core diamond drilling exploration rights across the Konobo and Barwo gold belts, mandating artisanal buffer demarcations, community water protection, and 75% local auxiliary workforce.',
    keyClauses: [
      {
        article: 'Article 9: Artisanal Mining Buffer Zones',
        title: 'Protection of Customary Miners',
        summary: 'Mandates a 3km exclusion perimeter safeguarding existing artisanal alluvial diggings from exploration disturbance.',
        statutoryDetail: 'Exploration activities shall not disrupt local community farming or traditional alluvial gold pits.'
      },
      {
        article: 'Article 14: Community Water Basins',
        title: 'Independent Water Sampling Protocol',
        summary: 'Quarterly environmental water sampling across Barwo creek to ensure no cyanide or heavy metal runoff occurs.',
        statutoryDetail: 'Independent laboratory reports shared with the Grand Gedeh County Mining Officer and local elders.'
      }
    ]
  },
  {
    id: 'doc-009',
    title: 'Grand Gedeh Artisanal Gold Mining Formalization Compact & Cooperatives Charter',
    sector: 'Mining & Extractives',
    projectName: 'Artisanal Mining Formalization Desk',
    docType: 'Policy Resolution',
    date: 'March 2025',
    classification: 'Public Document',
    size: '2.4 MB',
    fileFormat: 'PDF',
    concessionCode: 'GG-ARTISANAL-2025-ACT',
    parties: 'Ministry of Mines & Energy, GGCDC Artisanal Desk, & Grand Gedeh Gold Miners Union',
    ratificationStatus: 'Enacted by County Council & Ministry of Mines',
    statutoryBasis: 'Artisanal & Small-Scale Mining (ASM) National Policy Framework',
    summary: 'Countywide formalization agreement transitioning 14 informal artisanal alluvial pits into 4 registered Class-C mining cooperatives, establishing mercury-free gold wash systems, land reclamation bonds, and local youth dividends.',
    keyClauses: [
      {
        article: 'Section 2: Mercury & Cyanide Ban',
        title: 'Environmental Detoxification Mandate',
        summary: 'Zero tolerance for mercury or cyanide use in river washings; deployment of gravity-based retorts and shaking tables.',
        statutoryDetail: 'Any cooperative caught deploying toxic reagents shall have its Class-C license revoked immediately.'
      },
      {
        article: 'Section 5: District Development Royalty',
        title: '2% Local Gold Royalty Contribution',
        summary: '2% of all certified gold sales paid into the District Development Committee for rural schools and clinics.',
        statutoryDetail: 'Administered under the supervision of the Grand Gedeh County Mining Agent and GGCDC auditor.'
      }
    ]
  },
  {
    id: 'doc-010',
    title: 'Cavalla River Commercial Agro-Industrial Outgrower & Land Lease Concession Agreement',
    sector: 'Agriculture & Food Systems',
    projectName: 'Cavalla River Commercial Agro-Venture',
    docType: 'Agro-Industrial Concession',
    date: 'August 2021',
    classification: 'Public Document',
    size: '8.1 MB',
    fileFormat: 'PDF',
    concessionCode: 'MOA-NIC-CAVALLA-2021',
    parties: 'Ministry of Agriculture, National Investment Commission, & Cavalla Agribusiness Corp',
    ratificationStatus: 'Ratified by National Legislature (20-Year Lease 2021-2041)',
    statutoryBasis: 'Public Lands Act & Investment Incentive Code of Liberia',
    summary: '15,000-hectare agricultural concession along the Cavalla River corridor, establishing commercial oil palm and cocoa outgrower programs, 1,200 permanent farm jobs, an industrial processing mill in Tempo, and price floor guarantees.',
    keyClauses: [
      {
        article: 'Article 8: Smallholder Outgrower Guaranteed Pricing',
        title: 'Smallholder Price Floor & Offtake Covenant',
        summary: 'Guarantees purchase of all cooperative cocoa and fresh fruit palm bunches at minimum benchmark international prices.',
        statutoryDetail: 'The Concessionaire shall provide high-yielding Tenera oil palm seedlings and cocoa saplings at subsidized cost to 42 registered county cooperatives.'
      },
      {
        article: 'Article 13: Local Labor Quota & Worker Welfare',
        title: '85% Grand Gedean Workforce Obligation',
        summary: '85% of all estate laborers, tractor drivers, processing mill technicians, and supervisors must be Grand Gedeh residents.',
        statutoryDetail: 'Free healthcare provided at the estate clinic for all workers and their immediate dependents.'
      },
      {
        article: 'Article 18: Tempo Industrial Mini-Mill',
        title: 'Local Value-Addition Processing Hub',
        summary: 'Construction of 10 MT/hour palm oil processing mill in Tempo accessible to local smallholders.',
        statutoryDetail: 'Eliminates post-harvest spoilage and provides local farmers with direct industrial pressing capacity.'
      }
    ]
  },
  {
    id: 'doc-011',
    title: 'TRANSCO CLSG 225kV Cross-Border Power Interconnection Treaty & Zwedru PPA',
    sector: 'Infrastructure & Public Utilities',
    projectName: 'CLSG Zwedru 225kV Regional Substation & City Grid',
    docType: 'Infrastructure & Energy Treaty',
    date: 'October 2022',
    classification: 'Public Document',
    size: '6.4 MB',
    fileFormat: 'PDF',
    concessionCode: 'CLSG-LEC-PPA-ZWEDRU-2022',
    parties: 'TRANSCO CLSG, West African Power Pool (WAPP), & Liberia Electricity Corporation (LEC)',
    ratificationStatus: 'International Treaty Ratified by ECOWAS Heads of State & GoL',
    statutoryBasis: 'ECOWAS Energy Protocol & Liberian Electricity Law 2015',
    summary: 'Cross-border power purchase agreement governing 225kV high-voltage transmission from Man, Côte d\'Ivoire to the Zwedru Substation, establishing power supply quotas, commercial tariff ceilings, and grid expansion commitments.',
    keyClauses: [
      {
        article: 'Article 5: Substation Supply Reliability',
        title: 'Firm Power Commitment to Zwedru Grid',
        summary: 'Guarantees continuous 15MW baseload allocation dedicated to Zwedru urban center, hospitals, and agro-processing hubs.',
        statutoryDetail: 'Outages exceeding 12 aggregate hours per month trigger contractual compensation rebates.'
      },
      {
        article: 'Article 11: Feeder Grid Expansion',
        title: 'Rural Electrification Expansion Mandate',
        summary: 'Obligates phase-two distribution extension to Toe Town, Tuzon, Pennoken, and Martha Tubman Hospital campus.',
        statutoryDetail: 'Funded through the World Bank CLSG Rural Access Component with local civil works subcontracts.'
      }
    ]
  },
  {
    id: 'doc-012',
    title: 'Ganta-Tappita-Zwedru (Corridor 3) Asphalt Highway Civil Works Contract',
    sector: 'Infrastructure & Public Utilities',
    projectName: 'Ganta-Tapeta-Zwedru Asphalt Highway Corridor',
    docType: 'Infrastructure & Energy Treaty',
    date: 'February 2022',
    classification: 'Public Document',
    size: '11.5 MB',
    fileFormat: 'PDF',
    concessionCode: 'MPW-LRTF-CORRIDOR3-2022',
    parties: 'Ministry of Public Works (MPW), Liberia Reconstruction Trust Fund (LRTF), & World Bank',
    ratificationStatus: 'Executed National Public Works Contract',
    statutoryBasis: 'Public Procurement and Concessions Act (PPCA) 2010',
    summary: 'EPC contract governing the paving of the 112km Grand Gedeh section of Highway Corridor 3 with bituminous double surface dressing, reinforced concrete bridges, drainage culverts, and urban street lighting in Toe Town and Zwedru.',
    keyClauses: [
      {
        article: 'Clause 8: Local Employment & Subcontracting',
        title: '900 Local Construction Jobs',
        summary: 'Minimum 900 local laborers hired for grading, masonry, culverts, and traffic management.',
        statutoryDetail: '100% of crushed granite aggregate and river sand must be purchased from licensed Grand Gedeh quarries.'
      },
      {
        article: 'Clause 14: Resettlement Action Plan (RAP)',
        title: '$1,400,000 RAP Compensation Fund',
        summary: 'Direct cash compensation for verified homeowners and farm plot owners within the 50-meter right-of-way.',
        statutoryDetail: 'Every displaced household compensated prior to earthworks demolition under World Bank ESS5 standards.'
      }
    ]
  },
  {
    id: 'doc-013',
    title: 'Grand Gedeh Feeder Road Quality & Asphalt Thickness Technical Audit 2026',
    sector: 'Infrastructure & Public Utilities',
    projectName: 'Ganta-Tapeta-Zwedru Asphalt Highway Corridor',
    docType: 'Technical Audit',
    date: 'August 2026',
    classification: 'Public Document',
    size: '3.4 MB',
    fileFormat: 'PDF',
    concessionCode: 'AUDIT-GGCDC-ENG-2026-08',
    parties: 'GGCDC Infrastructure Directorate & Independent Civil Engineering Bench',
    ratificationStatus: 'Adopted by GGCDC Executive Council',
    statutoryBasis: 'Civil Engineering Standards & Freedom of Information Act 2010',
    summary: 'Independent technical evaluation examining core drill samples, asphalt compaction, culvert drainage durability, and bridge structural integrity across Corridor 3.',
    keyClauses: [
      {
        article: 'Finding 3: Asphalt Compaction Deficiency',
        title: 'Toe Town - Tuzon Sub-base Rectification',
        summary: 'Core drilling revealed 14% insufficient compaction along Kilometer 42-48 requiring contractor resurfacing.',
        statutoryDetail: 'Formal notice issued to MPW to withhold contractor retention payments pending core remediation.'
      }
    ]
  },
  {
    id: 'doc-014',
    title: 'County Social Development Fund (CSDF) Statutory Revenue Protocol & Escrow Act',
    sector: 'Governance, Research & Citizen Participation',
    projectName: 'County Social Development Fund (CSDF)',
    docType: 'Policy Resolution',
    date: 'May 2024',
    classification: 'Public Document',
    size: '2.8 MB',
    fileFormat: 'PDF',
    concessionCode: 'CSDF-STATUTE-ACT-2024',
    parties: 'Grand Gedeh Legislative Caucus, Ministry of Finance (MFDP), & County Council',
    ratificationStatus: 'Enacted into Law under National Budget Act & Local Governance Act 2018',
    statutoryBasis: 'Local Governance Act of 2018 Section 18 & PFM Law',
    summary: 'Statutory framework directing that 50% of all concession land rentals, forestry cubic meter fees, and mining royalties generated within Grand Gedeh must be paid directly into the County Treasury escrow account without central government diversion.',
    keyClauses: [
      {
        article: 'Section 4: Direct County Remittance Mandate',
        title: 'Anti-Sweeping Escrow Protection',
        summary: 'Prohibits the Ministry of Finance from diverting or sweeping concession dividends earmarked for Grand Gedeh.',
        statutoryDetail: 'Remittances must be made on the 15th of each month into the Grand Gedeh Development Escrow Account.'
      },
      {
        article: 'Section 9: Mandatory Public Budget Hearing',
        title: 'Annual Citizen Budget Assembly',
        summary: 'All project allocations must be vetted and voted upon during open County Council meetings in Zwedru.',
        statutoryDetail: 'No funds can be disbursed without prior public posting in all 8 district headquarters.'
      }
    ]
  },
  {
    id: 'doc-015',
    title: 'GGCDC Legal Position Paper: Proposed Revisions to Mining Stabilization Terms',
    sector: 'Mining & Extractives',
    projectName: 'Putu Iron Ore Project',
    docType: 'Policy Resolution',
    date: 'September 2026',
    classification: 'GGCDC Confidential',
    size: '1.8 MB',
    fileFormat: 'PDF',
    concessionCode: 'GGCDC-LEGAL-REV-2026',
    parties: 'GGCDC Legal Advisory Directorate & Grand Gedeh Legislative Caucus',
    ratificationStatus: 'Internal Working Document for Concession Review',
    statutoryBasis: 'Liberian Constitution Article 22 & Minerals Law 2000',
    summary: 'Strategic legal brief by Cllr. Saydee M. Krahn advising the County Council on protecting community revenue shares, indexing royalties to global benchmark iron ore prices, and shortening stabilization review windows.',
    keyClauses: [
      {
        article: 'Recommendation 1: Price-Indexed Royalties',
        title: 'Sliding Scale Royalty Mechanism',
        summary: 'Proposes replacing fixed royalties with a progressive 3.5% to 7.0% sliding scale indexed to Platts 62% Fe CFR China index.',
        statutoryDetail: 'Ensures Grand Gedeh captures windfalls during global commodity upswings while protecting mine viability.'
      }
    ]
  },
  {
    id: 'doc-016',
    title: 'Grand Gedeh County Multi-Sector Development Atlas & Spatial Concession Perimeters',
    sector: 'Governance, Research & Citizen Participation',
    projectName: 'County Observatory & Spatial Registry',
    docType: 'GIS Map',
    date: 'July 2026',
    classification: 'Public Document',
    size: '22.0 MB',
    fileFormat: 'GEOJSON',
    concessionCode: 'GIS-GGCDC-BOUNDARIES-2026',
    parties: 'GGCDC Cartography Directorate & Liberia Land Authority (LLA)',
    ratificationStatus: 'Certified Official GIS Dataset',
    statutoryBasis: 'Land Rights Act 2018 & National Spatial Data Infrastructure',
    summary: 'Complete digitized spatial dataset in GeoJSON and Shapefile formats detailing the 425 km² Putu concession perimeter, Singbeh FMC Area "I", Euro-Liberia FMC Area "K", B\'hai and Boe/Quilla Community Forests, CLSG 225kV transmission easement, health clinics, and schools.',
    keyClauses: [
      {
        article: 'Layer 1: Concession Boundary Perimeters',
        title: 'Accurate Polygon Geometry',
        summary: 'WGS-84 UTM Zone 29N projected coordinates for all statutory concession leases in Grand Gedeh.',
        statutoryDetail: 'Enables real-time satellite overlap verification and encroaching detection.'
      }
    ]
  }
];


export const OPPORTUNITIES_DATA: OpportunityItem[] = [
  {
    id: 'opp-001',
    title: 'Tender for Haulage & Aggregate Supply: Jarwodee Road Stabilization',
    type: 'Tender / RFQ',
    sector: 'Construction',
    issuer: 'PIOM Infrastructure Procurement Office',
    deadline: '2026-10-20',
    location: 'Putu District, Grand Gedeh',
    compensationOrValue: '$185,000 USD Contract Value',
    description: 'Procurement of 12,000 cubic meters of crushed basalt aggregate and tri-axle tipper transport for 35km Jarwodee access road. Grand Gedeh verified vendors prioritized.'
  },
  {
    id: 'opp-002',
    title: 'Commercial Camp Food & Fresh Produce Supply Contract',
    type: 'Tender / RFQ',
    sector: 'Agriculture & Food Systems',
    issuer: 'Putu Green Horizon Catering Consortium',
    deadline: '2026-10-15',
    location: 'Zwedru / Putu Camp',
    compensationOrValue: '$8,500 USD Monthly Standing Order',
    description: 'Long-term supply contract for local farmer cooperatives to supply fresh plantains, cassava, vegetables, palm oil, and poultry to the Putu mining exploration camp.'
  },
  {
    id: 'opp-003',
    title: '15 Full Scholarships: TVET Heavy Equipment & Electro-Mechanical Tech',
    type: 'Scholarship',
    sector: 'Local Enterprise, Jobs & Skills',
    issuer: 'GGCDC / Grand Gedeh Community College (GGCC) Foundation',
    deadline: '2026-10-30',
    location: 'GGCC Campus, Zwedru',
    compensationOrValue: 'Full Tuition + Monthly Stipend',
    description: 'Fully funded 18-month certification in heavy equipment operation, diagnostic electrical mechanics, and industrial welding with direct concession internship placements.'
  },
  {
    id: 'opp-004',
    title: 'Lead Surveyor & Geodetic Technician (2 Positions)',
    type: 'Employment',
    sector: 'Mining & Extractives',
    issuer: 'Putu Iron Ore Mining Inc.',
    deadline: '2026-10-18',
    location: 'Putu Mining Ridge Base Camp',
    compensationOrValue: 'Competitive Concession Scale + Medical & Housing',
    description: 'Responsible for topographic benchmark control, drill rig collar pickups, and bench grading. Minimum 3 years mining or civil survey experience.'
  },
  {
    id: 'opp-005',
    title: 'Cocoa Cooperative Post-Harvest Solar Dryer Grants',
    type: 'Grant / Loan',
    sector: 'Agriculture & Food Systems',
    issuer: 'County Agro-Development Facility / GGCDC Agribusiness Desk',
    deadline: '2026-11-15',
    location: 'B\'hai, Cavalla, and Gbao Districts',
    compensationOrValue: 'Up to $15,000 USD in Equipment & Installation',
    description: 'Matching grant for legally registered Grand Gedeh cocoa cooperatives to install modern parabolic solar drying sheds to achieve Grade-1 export certification.'
  }
];
