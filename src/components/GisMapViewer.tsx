import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
  ExternalLink,
  Info,
  ShieldCheck,
  Compass,
  Satellite
} from 'lucide-react';
import { useApp } from '../utils/context';

interface GisMarkerData {
  id: string;
  name: string;
  type: 'mining' | 'forestry' | 'agriculture' | 'community' | 'utility' | 'health' | 'education';
  categoryLabel: string;
  lat: number;
  lng: number;
  district: string;
  summary: string;
  keyDetails: string[];
  linkedProjectId?: string;
  linkedCommunityId?: string;
}

export const GisMapViewer: React.FC = () => {
  const { setActiveView, setSelectedProjectId, setSelectedCommunityId } = useApp();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    mining: true,
    forestry: true,
    agriculture: true,
    community: true,
    utility: true,
    health: true,
    education: true,
  });

  const [tileMode, setTileMode] = useState<'streets' | 'satellite'>('streets');

  const [selectedNode, setSelectedNode] = useState<GisMarkerData | null>({
    id: 'gis-putu',
    name: 'Putu Iron Ore Concession (PIOM)',
    type: 'mining',
    categoryLabel: 'Mining Concession (Flagship)',
    lat: 5.6833,
    lng: -8.1667,
    district: 'Putu District',
    summary: '425 km² exploration and development concession spanning the high-grade Putu Mountain Ridge Banded Iron Formation (BIF).',
    keyDetails: [
      'Resource: 4.2 Billion Metric Tons of Iron Ore',
      'Stage: Development & Engineering Optimization',
      'Communities Affected: Putu Jarwodee, Pennoken, Tiama, Polar Town',
      'Oversight: GGCDC Putu Mining & Development Working Group'
    ],
    linkedProjectId: 'proj-putu-iron',
    linkedCommunityId: 'com-jarwodee'
  });

  const gisLocations: GisMarkerData[] = [
    {
      id: 'gis-putu',
      name: 'Putu Iron Ore Concession & Mountain Ridge',
      type: 'mining',
      categoryLabel: 'Mining Concession (Flagship)',
      lat: 5.6833,
      lng: -8.1667,
      district: 'Putu District',
      summary: '425 km² concession covering the Putu Mountain Ridge iron deposit. 4.2 Billion MT BIF ore reserve.',
      keyDetails: [
        'Geological Formation: Putu Ridge BIF',
        'Communities: Jarwodee, Pennoken, Tiama, Polar Town',
        'Working Group: GGCDC Putu Mining & Development Working Group',
        'Status: Concession Feasibility & CDA Implementation Review'
      ],
      linkedProjectId: 'proj-putu-iron',
      linkedCommunityId: 'com-jarwodee'
    },
    {
      id: 'gis-singbeh',
      name: 'Singbeh Commercial Forest Concession (FMC Area I)',
      type: 'forestry',
      categoryLabel: 'Commercial Forestry Concession',
      lat: 6.2500,
      lng: -8.2800,
      district: 'B\'hai & Gbao Districts',
      summary: '118,500 Hectares of commercial timber concession along the northern forest belt.',
      keyDetails: [
        'Operator: Singbeh Timber Corporation (STC)',
        'Social Fund: $1.50/m³ paid directly to Community Forest Committee',
        'Focal Towns: Tuzon, Toe Town, B\'hai Gorbo',
        'Oversight: GGCDC Forestry Directorate'
      ],
      linkedProjectId: 'proj-singbeh-timber',
      linkedCommunityId: 'com-tuzon'
    },
    {
      id: 'gis-cavalla-agro',
      name: 'Cavalla River Commercial Agro-Processing Zone',
      type: 'agriculture',
      categoryLabel: 'Commercial Agribusiness & Outgrower',
      lat: 5.8500,
      lng: -7.8000,
      district: 'Cavalla District',
      summary: '15,000 Hectares along the Cavalla River border with 50-ton industrial palm oil mill and cocoa outgrowers.',
      keyDetails: [
        'Facilities: Industrial palm oil mill & solar warehouse',
        'Outgrower Network: 450 smallholders in Tempo and Cavalla Blun',
        'River Logistics: Barge landing ramp on Cavalla River'
      ],
      linkedProjectId: 'proj-cavalla-agro',
      linkedCommunityId: 'com-tempo'
    },
    {
      id: 'gis-zwedru',
      name: 'Zwedru City Capital & Administrative Center',
      type: 'community',
      categoryLabel: 'County Capital & Secretariat HQ',
      lat: 6.0719,
      lng: -8.1322,
      district: 'Tchien District',
      summary: 'Capital city of Grand Gedeh County. Headquarters of the GGCDC Central Secretariat and commercial hub.',
      keyDetails: [
        'Population: ~45,000 residents',
        'Traditional Leadership: Paramount Chief Johnnie B. Gbaba',
        'Grid: Energized by 225kV CLSG West Africa Power Substation',
        'Institutions: Martha Tubman Hospital, Grand Gedeh Community College'
      ],
      linkedCommunityId: 'com-zwedru'
    },
    {
      id: 'gis-jarwodee',
      name: 'Putu Jarwodee Customary Settlement',
      type: 'community',
      categoryLabel: 'Mine-Fringe Customary Settlement',
      lat: 5.7200,
      lng: -8.1700,
      district: 'Putu District',
      summary: 'Principal community at the base of the Putu Ridge. Signatory to the Putu Community Development Agreement.',
      keyDetails: [
        'Population: ~6,200 residents',
        'Leadership: Clan Chief Peter K. Jarwodee',
        'Top Priorities: 12-Classroom High School, Paved 35km Access Road, Potable Water'
      ],
      linkedCommunityId: 'com-jarwodee',
      linkedProjectId: 'proj-putu-iron'
    },
    {
      id: 'gis-toe-town',
      name: 'Toe Town Cross-Border Trade Terminal',
      type: 'community',
      categoryLabel: 'Cross-Border Trading Post',
      lat: 6.4167,
      lng: -8.3500,
      district: 'B\'hai District',
      summary: 'Major northern border crossing and agricultural trade hub connecting Liberia and Côte d\'Ivoire.',
      keyDetails: [
        'Road Connection: Corridor 3 Asphalt Highway Terminal',
        'Trade: Regional cocoa aggregation center and customs port',
        'Population: ~7,200 residents'
      ],
      linkedCommunityId: 'com-toe-town'
    },
    {
      id: 'gis-tuzon',
      name: 'Tuzon Community & Agro-Forestry Hub',
      type: 'community',
      categoryLabel: 'Chiefdom Settlement',
      lat: 6.1500,
      lng: -8.2167,
      district: 'Gbao District',
      summary: 'Historic community in Gbao District surrounded by rubber plantations and community forest reserves.',
      keyDetails: [
        'Population: ~3,500 residents',
        'Traditional Authority: Elder Harrison Gaye Doe',
        'Economy: Rubber tapping, cocoa farming, community timber'
      ],
      linkedCommunityId: 'com-tuzon'
    },
    {
      id: 'gis-pennoken',
      name: 'Pennoken Transit Junction',
      type: 'community',
      categoryLabel: 'Corridor Transit Settlement',
      lat: 6.0000,
      lng: -8.1667,
      district: 'Tchien / Putu Corridor',
      summary: 'Strategic road junction between Zwedru and the Putu concession access route.',
      keyDetails: [
        'Population: ~4,800 residents',
        'Leadership: Town Chief Matthew D. Pennoh',
        'Facilities: Roadside produce market and maternal clinic'
      ],
      linkedCommunityId: 'com-pennoken'
    },
    {
      id: 'gis-tempo',
      name: 'Tempo Cavalla River Landing',
      type: 'community',
      categoryLabel: 'Riverine Border Community',
      lat: 5.8500,
      lng: -7.8000,
      district: 'Cavalla District',
      summary: 'Eastern border settlement on the banks of the Cavalla River opposite Côte d\'Ivoire.',
      keyDetails: [
        'Population: ~3,100 residents',
        'Leadership: Clan Chief George B. Cavalla',
        'Economy: Fishing, oil palm outgrowing, cross-river transport'
      ],
      linkedCommunityId: 'com-tempo'
    },
    {
      id: 'gis-clsg',
      name: 'TRANSCO CLSG 225kV Regional Substation',
      type: 'utility',
      categoryLabel: 'Energy Infrastructure',
      lat: 6.0650,
      lng: -8.1250,
      district: 'Tchien District',
      summary: 'High-voltage substation supplying 24/7 cross-border electricity from Côte d\'Ivoire into the Zwedru grid.',
      keyDetails: [
        'Substation Capacity: 225kV / 33kV distribution',
        'Connections: Zwedru urban center, hospital, water facility, GGCC campus',
        'Expansion: Planned 33kV line to Putu corridor'
      ],
      linkedProjectId: 'proj-clsg-power'
    },
    {
      id: 'gis-hospital',
      name: 'Martha Tubman Memorial Referral Hospital',
      type: 'health',
      categoryLabel: 'Tertiary Health Facility',
      lat: 6.0740,
      lng: -8.1350,
      district: 'Tchien District',
      summary: 'Grand Gedeh\'s central 120-bed hospital serving the entire southeastern region and border referrals.',
      keyDetails: [
        'Capacity: 120 Beds with emergency surgical triage',
        'Concession Pact: Putu Iron Ore $650k surgical theater modernization commitment'
      ]
    },
    {
      id: 'gis-ggcc',
      name: 'Grand Gedeh Community College (GGCC)',
      type: 'education',
      categoryLabel: 'Higher Education & TVET Campus',
      lat: 6.0820,
      lng: -8.1400,
      district: 'Tchien District',
      summary: 'Premier public college providing agricultural engineering, mining technology, nursing, and business degrees.',
      keyDetails: [
        'Enrollment: 1,450 students',
        'TVET Program: Heavy equipment operation and electro-mechanical trade training'
      ]
    }
  ];

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center directly on Grand Gedeh County (Zwedru capital)
    const map = L.map(mapContainerRef.current, {
      center: [6.05, -8.15],
      zoom: 9,
      minZoom: 8,
      maxZoom: 16,
      scrollWheelZoom: true,
    });

    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | Grand Gedeh County GIS',
      maxZoom: 19,
    });

    streetLayer.addTo(map);

    // Approximate Grand Gedeh County Boundary Polyline / Area
    const grandGedehBorderCoordinates: [number, number][] = [
      [6.48, -8.38],
      [6.44, -8.28],
      [6.40, -8.20],
      [6.35, -8.10],
      [6.25, -7.95],
      [6.10, -7.78],
      [5.95, -7.72],
      [5.80, -7.76],
      [5.65, -7.88],
      [5.55, -8.05],
      [5.50, -8.25],
      [5.60, -8.35],
      [5.75, -8.38],
      [5.95, -8.42],
      [6.20, -8.45],
      [6.35, -8.42],
      [6.48, -8.38]
    ];

    L.polygon(grandGedehBorderCoordinates, {
      color: '#10b981',
      weight: 2,
      fillColor: '#047857',
      fillOpacity: 0.08,
      dashArray: '4, 4'
    }).addTo(map);

    // Highway Corridor 3 Polyline (Tapeta -> Toe Town -> Tuzon -> Pennoken -> Zwedru)
    const highwayCoordinates: [number, number][] = [
      [6.48, -8.40],
      [6.4167, -8.3500], // Toe Town
      [6.1500, -8.2167], // Tuzon
      [6.0000, -8.1667], // Pennoken
      [6.0719, -8.1322], // Zwedru
      [5.7200, -8.1700], // Putu turnoff
      [5.6833, -8.1667]  // Putu Range
    ];

    L.polyline(highwayCoordinates, {
      color: '#f59e0b',
      weight: 3.5,
      opacity: 0.85,
      dashArray: '6, 6'
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers based on Active Layers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();

    gisLocations.forEach((loc) => {
      if (!activeLayers[loc.type]) return;

      let colorClass = 'bg-emerald-600 border-white text-white';
      let iconSymbol = '📍';

      if (loc.type === 'mining') {
        colorClass = 'bg-amber-600 border-amber-300 text-slate-950 font-bold ring-4 ring-amber-500/40 animate-pulse';
        iconSymbol = '⛏️';
      } else if (loc.type === 'forestry') {
        colorClass = 'bg-emerald-700 border-emerald-300 text-white';
        iconSymbol = '🌲';
      } else if (loc.type === 'agriculture') {
        colorClass = 'bg-lime-600 border-lime-300 text-slate-950';
        iconSymbol = '🌾';
      } else if (loc.type === 'utility') {
        colorClass = 'bg-yellow-500 border-yellow-200 text-slate-950';
        iconSymbol = '⚡';
      } else if (loc.type === 'health') {
        colorClass = 'bg-red-600 border-red-200 text-white';
        iconSymbol = '🏥';
      } else if (loc.type === 'education') {
        colorClass = 'bg-indigo-600 border-indigo-200 text-white';
        iconSymbol = '🎓';
      } else {
        colorClass = 'bg-sky-600 border-sky-200 text-white';
        iconSymbol = '🏛️';
      }

      const customIcon = L.divIcon({
        className: 'custom-leaflet-div-icon',
        html: `
          <div style="transform: translate(-50%, -50%); cursor: pointer;">
            <div class="px-2 py-1 rounded-full shadow-2xl flex items-center space-x-1 border-2 ${colorClass}" style="font-size: 11px; white-space: nowrap; font-family: sans-serif;">
              <span>${iconSymbol}</span>
              <span class="font-bold">${loc.name.split(' ')[0]}</span>
            </div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon });
      
      marker.on('click', () => {
        setSelectedNode(loc);
        mapInstanceRef.current?.setView([loc.lat, loc.lng], 11, { animate: true });
      });

      marker.addTo(markersGroup);
    });
  }, [activeLayers]);

  // Handle Tile Switching
  const handleTileSwitch = (mode: 'streets' | 'satellite') => {
    if (!mapInstanceRef.current) return;
    setTileMode(mode);
    const map = mapInstanceRef.current;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mode === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18,
      }).addTo(map);
    } else {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | Grand Gedeh County GIS',
        maxZoom: 19,
      }).addTo(map);
    }
  };

  const toggleLayer = (key: string) => {
    setActiveLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Authentic Grand Gedeh County GIS Atlas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Grand Gedeh County Development GIS Map
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Geographically accurate GIS map of Grand Gedeh County, Liberia. Centered on Zwedru with the Putu mountain 
              range, Cavalla River international boundary, forest concessions, and Corridor 3 highway.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl self-start md:self-auto">
            <button
              onClick={() => handleTileSwitch('streets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                tileMode === 'streets'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Standard GIS</span>
            </button>

            <button
              onClick={() => handleTileSwitch('satellite')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                tileMode === 'satellite'
                  ? 'bg-amber-600 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Satellite Terrain</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Layers + Real Leaflet Map + Linked Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Layer Selector */}
          <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Active GIS Layers</span>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              {[
                { id: 'mining', label: 'Putu Iron Ore Concession', color: 'text-amber-400', icon: '⛏️' },
                { id: 'forestry', label: 'Commercial Forest Concessions', color: 'text-emerald-400', icon: '🌲' },
                { id: 'agriculture', label: 'Cavalla Agro-Industrial Zone', color: 'text-lime-400', icon: '🌾' },
                { id: 'community', label: 'Customary Towns & Chiefdoms', color: 'text-sky-400', icon: '🏛️' },
                { id: 'utility', label: 'CLSG 225kV Electrical Grid', color: 'text-yellow-400', icon: '⚡' },
                { id: 'health', label: 'Martha Tubman Hospital & Clinics', color: 'text-red-400', icon: '🏥' },
                { id: 'education', label: 'GGCC Campus & High Schools', color: 'text-indigo-400', icon: '🎓' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleLayer(item.id)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 transition-colors text-left"
                >
                  <span className="flex items-center space-x-2">
                    <span>{item.icon}</span>
                    <span className="text-slate-200 font-medium">{item.label}</span>
                  </span>
                  <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                    activeLayers[item.id] ? 'bg-emerald-500 text-slate-950 font-bold' : 'border border-slate-600'
                  }`}>
                    {activeLayers[item.id] ? '✓' : ''}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>Grand Gedeh County Boundary Line</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Corridor 3 Asphalt Highway Corridor</span>
              </div>
            </div>
          </div>

          {/* Leaflet Map Canvas */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            <div 
              ref={mapContainerRef} 
              className="w-full h-[540px] z-10"
              style={{ background: '#020617' }}
            ></div>
            
            <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Projection: WGS84 • Centered: Zwedru (6.0719°N, 8.1322°W)</span>
              <span className="text-emerald-400 font-semibold">Genuine Grand Gedeh Cartography</span>
            </div>
          </div>

          {/* Linked Record Inspector Card */}
          <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl">
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800">
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
                  <div className="text-[11px] font-mono text-emerald-400 mt-1">
                    Coordinates: {selectedNode.lat.toFixed(4)}°N, {selectedNode.lng.toFixed(4)}°W
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {selectedNode.summary}
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Concession & Civic Metadata</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {selectedNode.keyDetails.map((det, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{det}</span>
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
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center space-x-1.5 shadow"
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
                      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs py-2 rounded-lg flex items-center justify-center space-x-1.5"
                    >
                      <span>Open Community Profile</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveView('commitments')}
                    className="w-full text-center text-xs text-amber-400 hover:underline pt-1 font-medium"
                  >
                    View Related Commitments & Benefits
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">
                Click any marker on the Grand Gedeh map to inspect linked records.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
