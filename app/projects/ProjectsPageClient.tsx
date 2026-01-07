'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/types/projects'
import ProjectFilter from '@/components/projects/ProjectFilter'
import ProjectCard from '@/components/projects/ProjectCard'
import CaseStudyModal from '@/components/projects/CaseStudyModal'

type Category = 'all' | 'energy' | 'containers' | 'metal'

const PROJECTS_DATA: Project[] = [
  {
    id: 'PRJ-001',
    title: 'Industrial Park Backup System',
    category: 'energy',
    client: 'Industrial Dev Zone, Athi River',
    challenge: 'Unreliable grid power causing manufacturing downtime.',
    solution: 'Synchronized 500kVA generator array with auto-transfer.',
    metrics: [
      { label: 'Capacity', value: '1.5 MW Total' },
      { label: 'Timeline', value: '6 Weeks' },
      { label: 'Efficiency', value: '94.2%' },
      { label: 'Uptime', value: '99.99%' },
    ],
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1704ed9?auto=format&fit=crop&q=80&w=1200',
    technicalSpecs: {
      'Engine': 'Cummins QSK60-G4',
      'Alternator': 'Stamford HCI734',
      'Controller': 'DeepSea 8610 MKII',
      'Fuel System': '2000L Bulk Tank',
    },
    details: {
      problemStatement: 'The client experienced frequent power fluctuations and outages, leading to millions in lost production every month. Existing backup systems were aged and failed to synchronize during peak loads.',
      engineeringApproach: 'We designed a multi-unit synchronized solution using three 500kVA units. This allowed for redundant operation and load-sharing, ensuring that critical machinery remained powered even during maintenance cycles.',
      results: 'Zero downtime recorded since commissioning. The system provides seamless transition within 8 seconds of grid failure.',
    }
  },
  {
    id: 'PRJ-002',
    title: 'Hospital Redundancy Upgrade',
    category: 'energy',
    client: 'Metropolitan General Hospital',
    challenge: 'Critical life support systems requiring zero-latency failover.',
    solution: 'Tier 3 redundant power system with 1250kVA standby unit.',
    metrics: [
      { label: 'Response', value: '< 10ms' },
      { label: 'Scale', value: 'Tier 3' },
      { label: 'Reliability', value: '100%' },
      { label: 'Control', value: 'PLC Based' },
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    technicalSpecs: {
      'Prime Power': '1250kVA',
      'Standby': '1400kVA',
      'Transfer': 'Automatic Static Switch',
      'Monitoring': 'Remote SCADA',
    },
    details: {
      problemStatement: 'As a Level 5 hospital, zero power failure is non-negotiable. The existing single-gen setup had no redundancy and took 30 seconds to start, which was unacceptable for operating theaters.',
      engineeringApproach: 'Implemented a dual-redundant configuration with an online UPS system for instantaneous takeover, backed by a high-capacity standby generator with a dedicated fuel polishing system.',
      results: 'The hospital now meets international Tier 3 standards for power reliability. Successfully handled 14 grid failures in the first quarter with zero impact on operations.',
    }
  },
  {
    id: 'PRJ-003',
    title: 'Port Storage Modular Expansion',
    category: 'containers',
    client: 'East Africa Gateway Logistics',
    challenge: 'Rapid surge in cargo volume requiring immediate secure storage.',
    solution: '40-unit modular container system with integrated inventory tracking.',
    metrics: [
      { label: 'Units', value: '40 x 40ft HC' },
      { label: 'Timeline', value: '3 Weeks' },
      { label: 'Capacity', value: '2,700 m³' },
      { label: 'Setup', value: 'Inter-locked' },
    ],
    image: 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=1200',
    technicalSpecs: {
      'Grade': 'Cargo Worthy (CW)',
      'Flooring': 'Bamboo / Marine Plywood',
      'Security': 'Smart Lock Integration',
      'Stacking': '4-High Certified',
    },
    details: {
      problemStatement: 'A sudden increase in trans-shipment cargo left the client with a 20% storage deficit. Traditional warehouse construction would have taken 12 months.',
      engineeringApproach: 'Utilized high-cube 40ft containers configured in a high-density inter-locked layout. We engineered a custom foundation pad and integrated a wireless RFID tracking system into each unit.',
      results: 'Storage capacity increased by 30% in 21 days. The modular nature allows for further expansion or relocation based on seasonal demand.',
    }
  },
  {
    id: 'PRJ-004',
    title: 'Pharma Reefer Hub',
    category: 'containers',
    client: 'AfriPharma Distribution',
    challenge: 'Strict temperature control requirements for vaccine storage.',
    solution: 'Precision-controlled 20ft reefers with multi-zone monitoring.',
    metrics: [
      { label: 'Temp Range', value: '-30° to +20°C' },
      { label: 'Precision', value: '±0.5°C' },
      { label: 'Alerts', value: 'SMS/Email' },
      { label: 'Backup', value: 'Dual Compressor' },
    ],
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200',
    technicalSpecs: {
      'Unit': 'Carrier ThinLINE',
      'Insulation': 'CFC-free Polyurethane',
      'Controller': 'Micro-Link 3',
      'Data Logger': 'Partlow Electronic',
    },
    details: {
      problemStatement: 'The client needed to store high-value vaccines across multiple regional transit points where ambient temperatures exceed 35°C.',
      engineeringApproach: 'Engineered a fleet of 20ft refrigerated containers with dual-compressor redundancy and external backup power inlets. Each unit was fitted with satellite-linked temperature logging.',
      results: 'Maintained perfect cold chain integrity across 5000+km of transport. Zero product loss reported over 12 months of operation.',
    }
  },
  {
    id: 'PRJ-005',
    title: 'Custom Architectural Facade',
    category: 'metal',
    client: 'Horizon Office Tower, Nairobi',
    challenge: 'High-wind load architectural glass system with thermal breaks.',
    solution: 'Custom engineered aluminum curtain wall with 316L stainless steel supports.',
    metrics: [
      { label: 'Wind Load', value: '3.5 kPa' },
      { label: 'Tolerance', value: '±0.5mm' },
      { label: 'Glass', value: 'Double Glazed' },
      { label: 'Height', value: '45 Meters' },
    ],
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
    technicalSpecs: {
      'Alloy': '6063-T6 Aluminum',
      'Steel': 'Grade 316 Stainless',
      'Finish': 'Anodized 25 Micron',
      'Sealant': 'Dow Corning 791',
    },
    details: {
      problemStatement: 'The project required a modern glass facade that could withstand the high seasonal winds of the upper hill area while providing superior thermal insulation.',
      engineeringApproach: 'Designed a custom unitized curtain wall system. We fabricated 316L stainless steel bracketry in-house to support the aluminum frames, ensuring zero galvanic corrosion and maximum structural integrity.',
      results: 'Reduced HVAC energy consumption by 25% through thermal break technology. The building achieved its LEED silver certification target.',
    }
  },
  {
    id: 'PRJ-006',
    title: 'Industrial Heavy-Duty Racking',
    category: 'metal',
    client: 'Global Beverage Logistics',
    challenge: 'High-density seismic-certified racking for 2-ton pallet loads.',
    solution: 'Full-steel structural racking with high-tensile bolt systems.',
    metrics: [
      { label: 'Load Cap', value: '2,500kg / level' },
      { label: 'Positions', value: '5,000 Pallets' },
      { label: 'Material', value: 'Q345B Steel' },
      { label: 'Safety', value: 'Factor 2.5' },
    ],
    image: 'https://images.unsplash.com/photo-1586864387917-f729a8c81741?auto=format&fit=crop&q=80&w=1200',
    technicalSpecs: {
      'Upright': '120mm x 95mm',
      'Beam': '160mm x 50mm Box',
      'Coating': 'Electrostatic Powder',
      'Anchor': 'M16 Chemical Bolt',
    },
    details: {
      problemStatement: 'The client needed to maximize vertical storage space in a high-activity warehouse where floor space was at a premium and safety was the top priority.',
      engineeringApproach: 'Engineered a structural steel racking system using Q345B high-tensile steel. We implemented a double-diagonal bracing system and utilized high-strength chemical anchors for seismic stability.',
      results: 'Storage density increased by 40% within the same footprint. The system was independently certified for 2.5 ton static loads per level.',
    }
  }
]

export default function ProjectsPageClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return PROJECTS_DATA
    return PROJECTS_DATA.filter(p => p.category === activeCategory)
  }, [activeCategory])

  return (
    <main className="bg-light dark:bg-black text-light-text dark:text-white selection:bg-primary selection:text-light-text dark:selection:text-white min-h-screen">
      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-20 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">Section 01</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-light-text dark:text-white tracking-tight uppercase">
              Engineering Projects
            </h1>
          </div>
          <div className="h-px w-24 bg-primary/40 mb-8" />
          <p className="text-xl font-light text-gray-400 max-w-2xl leading-relaxed">
            Technical case studies of precision engineering solutions delivered across East Africa. From power infrastructure to modular logistics.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Filter System */}
          <ProjectFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <CaseStudyModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Final CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-dark-light border-t border-gray-900 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] text-primary uppercase tracking-[0.4em] font-mono mb-8 block">Project Briefing</span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight uppercase mb-12">
            Discuss Your Technical Requirements
          </h2>
          <Link 
            href="/contact"
            className="inline-block px-12 py-5 bg-primary text-white hover:bg-primary-dark transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium"
          >
            Start Project Assessment
          </Link>
        </div>
      </section>
    </main>
  )
}

// Simple internal Link component wrapper if needed or use Next Link
import Link from 'next/link'

