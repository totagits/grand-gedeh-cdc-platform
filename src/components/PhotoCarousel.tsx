import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Camera 
} from 'lucide-react';

export interface CarouselSlide {
  id: number;
  tag: string;
  title: string;
  caption: string;
  imageUrl: string;
  alt: string;
}

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    tag: 'PUTU MOUNTAIN RANGE • MINERAL WEALTH',
    title: 'Putu Mountain Iron Ore Ridge',
    caption: 'The authentic towering ridge and mineral reserves of Putu Mountain in Grand Gedeh County, showing natural forest cover and resource exploration cuts.',
    imageUrl: './images/putu_mountain_ridge.png',
    alt: 'Putu Mountain Iron Ore Ridge in Grand Gedeh County'
  },
  {
    id: 2,
    tag: 'COUNTY SEAT • URBAN CORRIDOR',
    title: 'Zwedru City Center & Administrative Square',
    caption: 'Iconic aerial view of Zwedru City center, showing the administrative complex, commercial boulevard, and central square connecting county districts.',
    imageUrl: './images/zwedru_city_aerial_center.png',
    alt: 'Aerial view of Zwedru City Center, Grand Gedeh County'
  },
  {
    id: 3,
    tag: 'HUMAN CAPITAL • NEXT-GEN EDUCATION',
    title: 'Barwo Town Public School Students (Konobo District)',
    caption: 'Smiling students and teachers at Barwo Town Public School in Konobo District, demonstrating the vital human capital and youth education needing mineral revenue investment.',
    imageUrl: './images/konobo_barwo_school_children.png',
    alt: 'Students of Barwo Town Public School, Konobo District, Grand Gedeh'
  },
  {
    id: 4,
    tag: 'AGRARIAN COOPERATIVES • LOCAL CONTENT',
    title: 'Grand Gedeh Agrarian Farmers & Rice Harvest',
    caption: 'Bona fide county farmers and women harvesting golden swamp rice, demonstrating agricultural capacity to supply mine catering and county food security.',
    imageUrl: './images/grand_gedeh_agrarian_farmers.jpg',
    alt: 'Grand Gedean women farmers harvesting golden rice in the field'
  },
  {
    id: 5,
    tag: 'ALLUVIAL GOLD MINING • LOCAL EXTRACTION',
    title: 'Grand Gedeh Gold Mining & Alluvial Operations',
    caption: 'Local artisanal miners, heavy machinery operators, and youth engaged in gold mining in Grand Gedeh County, underscoring the urgent need for environmental safeguards, formalization, and fair local benefits.',
    imageUrl: './images/grand_gedeh_gold_mining.jpg',
    alt: 'Gold mining excavation and local miners in Grand Gedeh County'
  },
  {
    id: 6,
    tag: 'ALL-WEATHER CONNECTIVITY • INFRASTRUCTURE',
    title: 'Zwedru Corridor Highway & Regional Trade Routes',
    caption: 'Elevated view of the main corridor thoroughfare through Zwedru, demonstrating essential all-weather road connectivity required for countywide commerce.',
    imageUrl: './images/zwedru_corridor_highway.png',
    alt: 'Corridor Highway and boulevard in Zwedru, Grand Gedeh'
  },
  {
    id: 7,
    tag: 'CUSTOMARY GOVERNANCE • CHIEFLY CONSENSUS',
    title: 'Community Stakeholder & Palava Hut Assembly',
    caption: 'Traditional chiefs, clan elders, women leaders, youth, and county stakeholders meeting to deliberate on land rights, FPIC consent, and community development.',
    imageUrl: './images/customary_stakeholder_assembly.png',
    alt: 'Grand Gedeh customary community stakeholders gathered in palava consultation'
  },
  {
    id: 8,
    tag: 'COMMUNITY BENEFITS • SOCIAL INFRASTRUCTURE',
    title: 'Modern Community Clinics & Health Facilities',
    caption: 'New civic social infrastructure constructed in the county, demonstrating the tangible healthcare and educational benefits required from mineral royalties.',
    imageUrl: './images/community_clinic_school.png',
    alt: 'Newly constructed community health clinic and school building in Grand Gedeh'
  }
];

export const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(4); // Default to slide 5 (Alluvial Gold Mining) as in user reference
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
      }, 5500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden border-2 border-emerald-600/30 dark:border-amber-500/40 shadow-2xl bg-slate-950 group">
      
      {/* Aspect Ratio Box with Image */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[560px] w-full overflow-hidden bg-slate-950">
        {CAROUSEL_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.alt}
              className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const fileName = slide.imageUrl.split('/').pop();
                target.src = `https://totagits.github.io/GGCDC/images/${fileName}`;
              }}
            />
          </div>
        ))}

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none"></div>

        {/* Top Control Bar (Pill with Pause, Prev, Next, Counter) */}
        <div className="absolute top-4 right-4 z-30 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white shadow-lg">
          <button
            onClick={togglePlay}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            title={isPlaying ? 'Pause Autoplay' : 'Play Slideshow'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          <span className="w-px h-3.5 bg-white/20"></span>

          <button
            onClick={handlePrev}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            title="Previous Photo"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            title="Next Photo"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          <span className="w-px h-3.5 bg-white/20"></span>

          <span className="text-[11px] font-mono font-bold text-amber-300 pl-0.5">
            {currentIndex + 1} / {CAROUSEL_SLIDES.length}
          </span>
        </div>

        {/* Top Left Live Indicator */}
        <div className="absolute top-4 left-4 z-30 flex items-center space-x-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white text-[11px] font-semibold">
          <Camera className="w-3 h-3 text-emerald-400" />
          <span>County Observatory</span>
        </div>

        {/* Bottom Slide Content Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-30 flex flex-col justify-end text-left space-y-2">
          
          <div>
            <span className="inline-block bg-amber-400 text-slate-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded shadow tracking-wider uppercase font-mono">
              {currentSlide.tag}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white leading-tight drop-shadow-md">
            {currentSlide.title}
          </h3>

          <p className="text-xs sm:text-[13px] text-slate-200 line-clamp-1 leading-relaxed drop-shadow">
            {currentSlide.caption}
          </p>

          {/* Dots Indicator */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1.5">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all rounded-full h-1.5 ${
                    idx === currentIndex
                      ? 'w-6 bg-amber-400'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Grand Gedeh Field Records
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
