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
    ownership: '100% Grand Gedean Owned',
    localOwnershipPct: 100,
    isQualifiedGrandGedean: true,
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
    secretariatAuditNotes: 'All corporate filings verified against LBR and LRA portal on Jan 14, 2026. Equipment physically audited at Zwedru yard.',
    accreditedBy: 'Cllr. Saydee M. Krahn (Secretariat Legal & Local Content Officer)',
    uploadedCredentials: [
      {
        id: 'cred-b01-1',
        name: 'Liberia Business Registry (LBR) Certificate',
        docType: 'LBR Business Registration',
        fileName: 'Zwedru_Eng_LBR_Reg_2026.pdf',
        fileSize: '1.4 MB',
        uploadedAt: '2026-01-10',
        status: 'Verified',
        verifiedBy: 'Secretariat Compliance Desk',
        verificationNotes: 'Registration active; valid through Dec 2026.'
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
    ownership: '100% Grand Gedean Owned',
    localOwnershipPct: 100,
    isQualifiedGrandGedean: true,
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
    secretariatAuditNotes: 'Fleet inspected and vehicle titles authenticated.',
    accreditedBy: 'Executive Secretariat Audit Committee',
    uploadedCredentials: [
      {
        id: 'cred-b02-1',
        name: 'LBR Business Registration Certificate',
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
    ownership: 'Grand Gedean Majority Partnership (51%+)',
    localOwnershipPct: 65,
    isQualifiedGrandGedean: true,
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
    secretariatAuditNotes: '65% Grand Gedean partnership ownership verified against corporate share register. MOH Food Handler certificates verified.',
    accreditedBy: 'Public Health & Nutrition Desk',
    uploadedCredentials: [
      {
        id: 'cred-b03-1',
        name: 'MOH Health & Food Safety Inspection Permit',
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
    ownership: '100% Grand Gedean Owned',
    localOwnershipPct: 100,
    isQualifiedGrandGedean: true,
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
    uploadedCredentials: [
      {
        id: 'cred-b04-1',
        name: 'Certified Electrical Engineer License',
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
    ownership: '100% Grand Gedean Owned',
    localOwnershipPct: 100,
    isQualifiedGrandGedean: true,
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
    secretariatAuditNotes: 'Application submitted recently. Secretariat scheduled on-site quarry permit inspection for Oct 2, 2026.',
    uploadedCredentials: [
      {
        id: 'cred-b05-1',
        name: 'Mining & Energy Quarry License Application',
        docType: 'LBR Business Registration',
        fileName: 'MME_Quarry_Permit_App.pdf',
        fileSize: '2.4 MB',
        uploadedAt: '2026-09-18',
        status: 'Pending Verification',
        verificationNotes: 'Awaiting formal stamped renewal from Ministry of Mines & Energy.'
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
    name: 'Cavalla Basin International Geotech Consortium',
    sector: 'Construction',
    ownership: 'Minority Grand Gedean Partnership (<51%)',
    localOwnershipPct: 40,
    isQualifiedGrandGedean: false,
    location: 'Zwedru Industrial Zone',
    services: ['Geotechnical drilling', 'Core sampling', 'Soil lab testing'],
    contactPerson: 'Arthur Vance',
    contactPhone: '+231 777 882 109',
    legalStatus: 'LBR Registered',
    taxStatus: 'LRA Tax Compliant',
    workforceSize: 12,
    equipmentSummary: '2 Diamond core drill rigs, soil compaction lab',
    verifiedLocal: false,
    verificationStatus: 'Disqualified (<51% Local Equity)',
    registrationDate: '2026-09-21',
    pastContracts: [],
    secretariatAuditNotes: 'DISQUALIFIED: Partnership agreement indicates only 40% Grand Gedean equity ownership. Under the GGCDC Local Content Protocol, partnerships must possess at least 51% Grand Gedean equity to qualify for local content preferential procurement.',
    uploadedCredentials: [
      {
        id: 'cred-b06-1',
        name: 'LBR Business Registration Certificate',
        docType: 'LBR Business Registration',
        fileName: 'Cavalla_Geotech_LBR.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-09-21',
        status: 'Requires Re-upload',
        verificationNotes: 'Joint venture agreement shows 40% local equity. Minimum 51% required for local content status.'
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
    summary: 'The complete legal agreement between the Republic of Liberia and Putu Iron Ore Mining Inc. detailing mineral rights, royalties, taxes, local employment clauses, and community obligations.'
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
    summary: 'Tripartite agreement delineating annual social fund disbursements, local committee management, education, health, and road infrastructure requirements.'
  },
  {
    id: 'doc-003',
    title: 'Environmental and Social Impact Assessment (ESIA) Executive Summary - Putu Project',
    sector: 'Mining & Extractives',
    projectName: 'Putu Iron Ore Project',
    docType: 'ESIA / Environmental',
    date: 'November 2023',
    classification: 'Public Document',
    size: '8.6 MB',
    fileFormat: 'PDF',
    summary: 'EPA-approved assessment of biodiversity, hydrological systems, noise, dust, and social baseline studies for the Putu mountain open-pit development.'
  },
  {
    id: 'doc-004',
    title: 'FDA Commercial Forest Management Contract FMC Area "I" (Singbeh)',
    sector: 'Forestry & Environment',
    projectName: 'Singbeh Forest Management Concession',
    docType: 'Mineral Development Agreement (MDA)',
    date: 'June 2018',
    classification: 'Public Document',
    size: '6.1 MB',
    fileFormat: 'PDF',
    summary: 'Forest concession contract detailing annual allowable cut, stumpage fees, social agreements, and environmental harvest guidelines.'
  },
  {
    id: 'doc-005',
    title: 'Grand Gedeh Feeder Road Quality & Asphalt Thickness Technical Audit 2026',
    sector: 'Infrastructure & Public Utilities',
    projectName: 'Ganta-Tapeta-Zwedru Asphalt Highway Corridor',
    docType: 'Technical Audit',
    date: 'August 2026',
    classification: 'Public Document',
    size: '3.4 MB',
    fileFormat: 'PDF',
    summary: 'Independent engineering evaluation prepared by GGCDC Infrastructure Working Group on civil works quality, culvert stability, and drainage along Corridor 3.'
  },
  {
    id: 'doc-006',
    title: 'GGCDC Legal Position Paper: Proposed Revisions to Mining Stabilization Terms',
    sector: 'Mining & Extractives',
    projectName: 'Putu Iron Ore Project',
    docType: 'Policy Resolution',
    date: 'September 2026',
    classification: 'GGCDC Confidential',
    size: '1.8 MB',
    fileFormat: 'PDF',
    summary: 'Internal legal analysis by Cllr. Saydee M. Krahn advising the Executive Council and Legislative Caucus on protecting community revenue shares in future addenda.'
  },
  {
    id: 'doc-007',
    title: 'Grand Gedeh County Multi-Sector Development Atlas & GIS Boundary Dataset',
    sector: 'Governance, Research & Citizen Participation',
    projectName: 'County Observatory',
    docType: 'GIS Map',
    date: 'July 2026',
    classification: 'Public Document',
    size: '22.0 MB',
    fileFormat: 'GEOJSON',
    summary: 'Complete digitized spatial dataset of district boundaries, concession perimeters, customary clan lands, healthcare facilities, and water distribution points.'
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
