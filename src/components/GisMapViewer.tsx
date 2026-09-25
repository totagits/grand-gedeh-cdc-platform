import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  Pickaxe, 
  Trees, 
  Wheat, 
  Building2, 
  Activity, 
  GraduationCap, 
  Zap, 
  CheckSquare, 
  Square, 
  ExternalLink,
  Info
} from 'lucide-react';
import { useApp } from '../utils/context';

interface GisNode {
  id: string;
  name: string;
  type: 'mining' | 'forestry' | 'agriculture' | 'community' | 'road' | 'health' | 'education' | 'utility';
  categoryLabel: string;
  x: number; // 0 to 100 percentage
  y: number;
  district: string;
  summary: string;
  keyDetails: string[];
  linkedProjectId?: string;
  linkedCommunityId?: string;
}

export const GisMapViewer: React.FC = () => {
  const { setActiveView, setSelectedProjectId, setSelectedCommunityId } = useApp();

  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    mining: true,
    forestry: true,
    agriculture: true,
    community: true,
    infrastructure: true,
    health: true,
    education: true,
    energy: true,
  });

  const [selectedNode, setSelectedNode] = useState<GisNode | null>({
    id: 'gis-putu',
    name: 'Putu Iron Ore Concession (PIOM)',
    type: 'mining',
    categoryLabel: 'Mining Concession (Flagship)',
    x: 58,
    y: 44,
    district: 'Putu District',
    summary: '425 km² exploration and development concession spanning the high-grade Putu Mountain Ridge Banded Iron Formation (BIF).',
    keyDetails: [
      'Resource: 4.2 Billion Metric Tons of Iron Ore',
      'Stage: Development & Engineering Optimization',
      'Communities Affected: Putu Jarwodee, Pennoken, Tiama, Polar Town',
      'Related Working Group: GGCDC Putu Mining & Development Working Group'
    ],
    linkedProjectId: 'proj-putu-iron',
    linkedCommunityId: 'com-jarwodee'
  });

  const gisNodes: GisNode[] = [
    {
      id: 'gis-putu',
      name: 'Putu Iron Ore Concession (PIOM)',
      type: 'mining',
      categoryLabel: 'Mining Concession (Flagship)',
      x: 58,
      y: 44,
      district: 'Putu District',
      summary: '425 km² exploration and development concession spanning the high-grade Putu Mountain Ridge Banded Iron Formation (BIF).',
      keyDetails: [
        'Resource: 4.2 Billion Metric Tons of Iron Ore',
        'Stage: Development & Engineering Optimization',
        'Communities Affected: Putu Jarwodee, Pennoken, Tiama, Polar Town',
        'Related Working Group: GGCDC Putu Mining & Development Working Group'
      ],
      linkedProjectId: 'proj-putu-iron',
      linkedCommunityId: 'com-jarwodee'
    },
    {
      id: 'gis-singbeh',
      name: 'Singbeh Commercial Timber Concession (FMC-I)',
      type: 'forestry',
      categoryLabel: 'Commercial Forestry Concession',
      x: 38,
      y: 32,
      district: 'B\'hai & Gbao Districts',
      summary: '118,500 Hectares of sustainable commercial forest management contract with active social agreements.',
      keyDetails: [
        'Operator: Singbeh Timber Corporation',
        'Cubic Meter Fee: $1.50/m³ paid directly to Community Forest Committee',
        'Key Towns: Tuzon, Toe Town, B\'hai Gorbo',
        'Monitored by: GGCDC Forestry & Environment Directorate'
      ],
      linkedProjectId: 'proj-singbeh-timber',
      linkedCommunityId: 'com-tuzon'
    },
    {
      id: 'gis-cavalla-agro',
      name: 'Cavalla River Commercial Agro-Processing Zone',
      type: 'agriculture',
      categoryLabel: 'Commercial Agribusiness & Outgrower',
      x: 74,
      y: 68,
      district: 'Cavalla District',
      summary: '15,000 Hectare agro-industrial venture with 50-ton industrial palm oil mill and smallholder cocoa outgrower network.',
      keyDetails: [
        'Industrial Mill: Tempo River Port Landing',
        'Outgrowers: 450 contracted smallholder farmers',
        'Infrastructure: River barge loading ramp & 2 solar storage hubs',
        'Monitored by: GGCDC Agriculture Working Group'
      ],
      linkedProjectId: 'proj-cavalla-agro',
      linkedCommunityId: 'com-tempo'
    },
    {
      id: 'gis-zwedru-city',
      name: 'Zwedru City Capital & Administrative Center',
      type: 'community',
      categoryLabel: 'County Capital & Commercial Hub',
      x: 50,
      y: 55,
      district: 'Tchien District',
      summary: 'County capital, headquarters of Grand Gedeh Citizens Development Council Secretariat, central market, and regional transit nexus.',
      keyDetails: [
        'Population: ~45,000 residents',
        'Public Facilities: Martha Tubman Hospital, Grand Gedeh Community College',
        'Utility: Connected to 225kV CLSG Regional Electrical Grid',
        'Paramount Chief: Johnnie B. Gbaba'
      ],
      linkedCommunityId: 'com-zwedru'
    },
    {
      id: 'gis-jarwodee-town',
      name: 'Putu Jarwodee Customary Community',
      type: 'community',
      categoryLabel: 'Mine-Fringe Customary Settlement',
      x: 59,
      y: 46,
      district: 'Putu District',
      summary: 'Principal customary community situated at base of Putu Mountain ridge; holder of 2024 Community Development Agreement.',
      keyDetails: [
        'Population: ~6,200 residents',
        'Key Priorities: 12-Classroom High School, 35km Paved Road, Clean Water',
        'Traditional Leadership: Clan Chief Peter K. Jarwodee',
        'Supervision: Putu Mining Working Group Community Liaison'
      ],
      linkedCommunityId: 'com-jarwodee',
      linkedProjectId: 'proj-putu-iron'
    },
    {
      id: 'gis-toe-town',
      name: 'Toe Town Border Commercial Port',
      type: 'community',
      categoryLabel: 'Cross-Border Trading Post',
      x: 32,
      y: 28,
      district: 'B\'hai District',
      summary: 'Vital border trade hub with Côte d\'Ivoire, major regional cocoa and commodities aggregation point.',
      keyDetails: [
        'Highway: Direct connection on Corridor 3 asphalt highway',
        'Trading: Customs cargo depot and solar street lighting',
        'Population: ~7,200 residents'
      ],
      linkedCommunityId: 'com-toe-town'
    },
    {
      id: 'gis-clsg-substation',
      name: 'CLSG Zwedru 225kV Interconnection Substation',
      type: 'utility',
      categoryLabel: 'Regional Energy Infrastructure',
      x: 48,
      y: 57,
      district: 'Tchien District',
      summary: 'Key regional high-voltage substation delivering 24/7 power from the West African Power Pool (TRANSCO CLSG).',
      keyDetails: [
        'Capacity: 225kV Transmission to 33kV Municipal Distribution',
        'Connections: 5,500+ households, hospital, university campus',
        'Expansion: Planned feeder line to Putu and Toe Town'
      ],
      linkedProjectId: 'proj-clsg-power'
    },
    {
      id: 'gis-martha-tubman',
      name: 'Martha Tubman Memorial Referral Hospital',
      type: 'health',
      categoryLabel: 'County Tertiary Healthcare Referral Facility',
      x: 51,
      y: 54,
      district: 'Tchien District',
      summary: 'Grand Gedeh\'s principal referral hospital featuring 120 beds, surgical theater, and emergency trauma triage.',
      keyDetails: [
        'Capacity: Serving ~126,000 residents countywide + border referrals',
        'Concession Commitment: PIOM $650k surgical wing upgrade currently pending clearance',
        'Solar Backup: 40kW hospital priority feeder'
      ]
    },
    {
      id: 'gis-ggcc-university',
      name: 'Grand Gedeh Community College (GGCC)',
      type: 'education',
      categoryLabel: 'Tertiary & TVET Technical Academy',
      x: 49,
      y: 53,
      district: 'Tchien District',
      summary: 'Premier public higher education and TVET institution offering engineering, agriculture, forestry, and business disciplines.',
      keyDetails: [
        'Programs: Mining Technology, Heavy Equipment Maintenance, Agronomy, Nursing',
        'Student Enrollment: 1,450 students',
        'Pact: GGCDC 15-scholarship heavy equipment program partner'
      ]
    }
  ];

  const toggleLayer = (layerKey: string) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const isNodeVisible = (node: GisNode) => {
    if (node.type === 'mining' && !activeLayers.mining) return false;
    if (node.type === 'forestry' && !activeLayers.forestry) return false;
    if (node.type === 'agriculture' && !activeLayers.agriculture) return false;
    if (node.type === 'community' && !activeLayers.community) return false;
    if (node.type === 'health' && !activeLayers.health) return false;
    if (node.type === 'education' && !activeLayers.education) return false;
    if (node.type === 'utility' && !activeLayers.energy) return false;
    return true;
  };

  return (
    <section className="py-12 bg-slate-950 text-white min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Introduction */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Spatial Development Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Grand Gedeh Interactive GIS Development Map
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              The digital spatial atlas of Grand Gedeh County. Toggle layers to explore mining concessions, 
              community forests, agricultural zones, customary towns, and critical infrastructure corridors.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-300">
            <span className="font-mono text-emerald-400 font-bold">10,448 km²</span>
            <span>Total County Landmass</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-bold">6 Administrative Districts</span>
          </div>
        </div>

        {/* Map Layout: Control Panel + SVG Interactive GIS Canvas + Selected Entity Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: GIS Layer Toggle Switcher */}
          <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Interactive Map Layers</span>
            </div>

            <div className="mt-4 space-y-2">
              {[
                { id: 'mining', label: 'Mining Concessions (Putu)', icon: Pickaxe, color: 'text-amber-400' },
                { id: 'forestry', label: 'Forest Concessions & Woods', icon: Trees, color: 'text-emerald-400' },
                { id: 'agriculture', label: 'Commercial Agriculture', icon: Wheat, color: 'text-lime-400' },
                { id: 'community', label: 'Customary Communities & Towns', icon: Building2, color: 'text-sky-400' },
                { id: 'infrastructure', label: 'Corridor 3 Asphalt Highway', icon: MapPin, color: 'text-slate-400' },
                { id: 'energy', label: 'CLSG Grid & Mini-Grids', icon: Zap, color: 'text-yellow-400' },
                { id: 'health', label: 'Hospitals & Health Clinics', icon: Activity, color: 'text-red-400' },
                { id: 'education', label: 'Schools & GGCC TVET', icon: GraduationCap, color: 'text-indigo-400' },
              ].map((layer) => {
                const Icon = layer.icon;
                const isChecked = activeLayers[layer.id];
                return (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className="w-full flex items-center justify-between p-2 rounded-lg text-xs hover:bg-slate-800 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${layer.color}`} />
                      <span className="text-slate-200">{layer.label}</span>
                    </div>
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Flagship: Putu Iron Ore Mining Ridge</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Forest Reserves & Community Forests</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span>Cavalla River International Border</span>
              </div>
            </div>
          </div>

          {/* Center Column: High Precision Interactive SVG GIS Canvas */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative flex flex-col items-center justify-center p-2 min-h-[500px]">
            
            {/* GIS Canvas Header Bar */}
            <div className="w-full flex items-center justify-between px-3 py-2 bg-slate-950/80 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="font-mono">Spatial Projection: WGS84 / UTM Zone 29N</span>
              <span className="text-emerald-400 font-semibold">Live County GIS View</span>
            </div>

            {/* Interactive County Map Graphic */}
            <div className="relative w-full h-[460px] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 rounded-lg p-2 select-none overflow-hidden">
              
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full filter drop-shadow-md"
              >
                {/* Background Grid Lines */}
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.3" strokeDasharray="1,1" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />

                {/* Grand Gedeh County Boundary Polygon */}
                <path
                  d="M 24,18 L 48,12 L 68,16 L 86,30 L 92,54 L 84,84 L 62,88 L 40,82 L 22,66 L 16,42 Z"
                  fill="#064e3b"
                  fillOpacity="0.25"
                  stroke="#10b981"
                  strokeWidth="0.8"
                  strokeDasharray="none"
                />

                {/* Cavalla River Flowing along the Southeastern Border */}
                <path
                  d="M 68,16 Q 82,34 88,52 T 84,84 T 62,88"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <text x="82" y="60" fill="#38bdf8" fontSize="2.2" fontStyle="italic" opacity="0.8">
                  Cavalla River
                </text>

                {/* Grebo-Krahn Protected National Park Buffer (South) */}
                {activeLayers.forestry && (
                  <path
                    d="M 65,72 L 82,75 L 78,86 L 60,85 Z"
                    fill="#15803d"
                    fillOpacity="0.4"
                    stroke="#22c55e"
                    strokeWidth="0.5"
                    strokeDasharray="1,0.5"
                  />
                )}

                {/* Corridor 3 National Highway Trunk (Ganta -> Toe Town -> Tuzon -> Pennoken -> Zwedru) */}
                {activeLayers.infrastructure && (
                  <path
                    d="M 22,20 L 32,28 L 38,36 L 52,48 L 50,55 L 46,75"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.0"
                    strokeLinecap="round"
                    strokeDasharray="1.5,0.8"
                  />
                )}

                {/* Putu Mountain Range Contour Highlighting */}
                {activeLayers.mining && (
                  <ellipse
                    cx="58"
                    cy="44"
                    rx="9"
                    ry="5"
                    fill="#78350f"
                    fillOpacity="0.45"
                    stroke="#d97706"
                    strokeWidth="0.6"
                    strokeDasharray="1,1"
                  />
                )}

                {/* District Names in Background */}
                <text x="32" y="38" fill="#64748b" fontSize="2.4" fontWeight="bold" opacity="0.5">Gbao</text>
                <text x="26" y="24" fill="#64748b" fontSize="2.4" fontWeight="bold" opacity="0.5">B'hai</text>
                <text x="44" y="50" fill="#64748b" fontSize="2.6" fontWeight="bold" opacity="0.5">Tchien</text>
                <text x="64" y="44" fill="#64748b" fontSize="2.6" fontWeight="bold" opacity="0.5">Putu</text>
                <text x="68" y="66" fill="#64748b" fontSize="2.4" fontWeight="bold" opacity="0.5">Cavalla</text>
                <text x="46" y="76" fill="#64748b" fontSize="2.4" fontWeight="bold" opacity="0.5">Konobo</text>

              </svg>

              {/* Interactive HTML Markers Placed Precisely over Coordinates */}
              {gisNodes.filter(isNodeVisible).map((node) => {
                const isSelected = selectedNode?.id === node.id;
                
                let markerBg = 'bg-emerald-500';
                if (node.type === 'mining') markerBg = 'bg-amber-500 ring-4 ring-amber-500/30 animate-pulse';
                else if (node.type === 'forestry') markerBg = 'bg-emerald-600';
                else if (node.type === 'agriculture') markerBg = 'bg-lime-500';
                else if (node.type === 'community') markerBg = 'bg-sky-500';
                else if (node.type === 'health') markerBg = 'bg-red-500';
                else if (node.type === 'education') markerBg = 'bg-indigo-500';
                else if (node.type === 'utility') markerBg = 'bg-yellow-400';

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-transform z-20 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                    title={node.name}
                  >
                    <div className={`w-4 h-4 rounded-full ${markerBg} border-2 border-white shadow-lg flex items-center justify-center`}>
                      <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>
                    </div>

                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] whitespace-nowrap shadow-md pointer-events-none transition-opacity ${
                      isSelected 
                        ? 'bg-amber-400 text-slate-950 font-bold opacity-100' 
                        : 'bg-slate-900/90 text-slate-200 border border-slate-700 opacity-80 group-hover:opacity-100'
                    }`}>
                      {node.name.split(' ')[0]}
                    </div>
                  </button>
                );
              })}

            </div>

            {/* Canvas Bottom Legend */}
            <div className="w-full flex flex-wrap items-center justify-between px-3 py-1.5 bg-slate-950/80 border-t border-slate-800 text-[10px] text-slate-400">
              <span>Click any marker to inspect concessions, agreements, and community records.</span>
              <span className="text-emerald-400">Showing {gisNodes.filter(isNodeVisible).length} active spatial assets</span>
            </div>
          </div>

          {/* Right Column: Linked Record Detail Card */}
          <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/80">
                    {selectedNode.categoryLabel}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {selectedNode.district}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {selectedNode.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {selectedNode.summary}
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                    <Info className="w-3 h-3" />
                    <span>Key Institutional Data</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {selectedNode.keyDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 space-y-2">
                  {selectedNode.linkedProjectId && (
                    <button
                      onClick={() => {
                        setSelectedProjectId(selectedNode.linkedProjectId || null);
                        setActiveView('concessions');
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center space-x-1.5 shadow"
                    >
                      <span>Open Concession Registry Record</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {selectedNode.linkedCommunityId && (
                    <button
                      onClick={() => {
                        setSelectedCommunityId(selectedNode.linkedCommunityId || null);
                        setActiveView('communities');
                      }}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold py-2 rounded-lg flex items-center justify-center space-x-1.5"
                    >
                      <span>Open Community Profile</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveView('commitments')}
                    className="w-full text-center text-xs text-amber-400 hover:underline pt-1"
                  >
                    View Related Commitments & Benefits
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Select any location on the map to display its linked institutional profile.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
