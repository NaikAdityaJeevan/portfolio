import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, ChevronRight, Code2, Cpu, Menu, Radio, Send, X, Zap } from 'lucide-react';
import { achievements, interests, journey, portfolio, projects, skills } from './data/portfolio';
import './App.css';
const LidarScene = lazy(() => import('./models/LidarScene'));
const navigation = [['HOME', 'home'], ['ABOUT', 'about'], ['SKILLS', 'skills'], ['PROJECTS', 'projects'], ['JOURNEY', 'journey'], ['RESEARCH', 'research'], ['CONTACT', 'contact']];
function SectionHeading({
  index,
  eyebrow,
  title
}) {
  return <div className="section-heading reveal"><div className="section-meta"><span>{index}</span><i />{eyebrow}</div><h2>{title}</h2></div>;
}
function ProjectArtwork({
  project
}) {
  return <div className={`project-art art-${project.id}`} aria-hidden="true"><div className="art-grid" />{project.id === 'air-mouse' && <div className="art-drone"><span /><i /><b /></div>}{project.id === 'carbot' && <div className="art-car"><span /><i /><b /><em /></div>}{project.id === 'optical-network' && <div className="art-network"><i /><i /><i /><b /><span /></div>}{project.id === 'civic-mysuru' && <div className="art-city"><i /><i /><i /><i /><b /></div>}<div className="art-coordinate">{project.number} / {project.type}</div><div className="art-scanline" /></div>;
}
const selectedSystemsProjects = [{
  id: 'air-mouse',
  number: '01',
  name: 'AIR MOUSE',
  title: 'AIR MOUSE',
  subtitle: 'Autonomous GPS-Denied Indoor Search, Mapping & Survivor Localisation System',
  description: 'Autonomous GPS-denied indoor search, mapping and survivor localisation system built around perception, planning and situational awareness.',
  type: 'Autonomous Systems',
  tags: ['SLAM', 'Autonomous Navigation', 'Thermal Imaging', 'RGB Vision', 'Computer Vision'],
  technologies: ['SLAM', 'Autonomous Navigation', 'Thermal Imaging', 'RGB Vision', 'Computer Vision', 'AI', 'NVIDIA Jetson Orin Nano'],
  problem: 'The mission objective was to localise survivors and map unknown indoor spaces without GPS, even in degraded visibility conditions.',
  solution: 'A multi-sensor autonomous stack combining visual odometry, thermal perception, mapping and exploration logic for robust indoor operation.',
  architecture: 'Feature extraction, occupancy mapping, navigation planning, local path execution and sensor fusion across RGB and thermal inputs.',
  contribution: 'I helped define the perception and navigation workflow, sensor integration strategy and system-level testing for autonomous field operations.',
  results: 'The system is designed to improve situational awareness and exploration effectiveness in GPS-denied environments.',
  gallery: 'Sensor imagery, mapping overlays and field deployment visuals to be added.',
  variant: 'large'
}, {
  id: 'carbot',
  number: '02',
  name: 'CARBOT',
  title: 'CARBOT',
  subtitle: '',
  description: 'Smart automotive assistant for vehicle management, predictive maintenance guidance and service assistance.',
  type: 'Automotive Intelligence',
  tags: ['Vehicle Management', 'Engine Health Prediction', 'Nearby Workshops', 'Automotive Intelligence', 'Car Parts Assistance'],
  technologies: ['Vehicle Management', 'Engine Health Prediction', 'Nearby Workshops', 'Automotive Intelligence', 'Car Parts Assistance'],
  problem: 'Drivers often lack intelligent support for service planning, vehicle diagnostics and workshop discovery while on the road.',
  solution: 'A system to assist users with vehicle health awareness, route-aware workshop suggestions and practical automotive guidance.',
  architecture: 'Vehicle data interpretation, service recommendation logic and user-facing guidance layers.',
  contribution: 'The platform concept and information architecture were shaped around practical automotive assistance and decision support.',
  results: 'The design emphasises convenience, reliability and faster maintenance decision-making for vehicle owners.',
  gallery: 'Concept visuals and workflow diagrams to be added.',
  variant: 'medium'
}, {
  id: 'optical-network',
  number: '03',
  name: '3-LAYER OPTICAL NETWORK',
  title: '3-LAYER OPTICAL NETWORK',
  subtitle: 'Self-healing Optical Communication Network',
  description: 'A proposed architecture for a resilient optical communication network spanning access, aggregation and core layers.',
  type: 'Communication Networks',
  tags: ['DWDM', 'Optical Ring', 'PON', 'Single Mode Fiber', 'APS'],
  technologies: ['DWDM', 'Optical Ring', 'PON', 'Single Mode Fiber', 'APS', 'Traffic Control Centre', 'Zonal Hubs / POPs'],
  problem: 'High-capacity fibre networks require resilience, efficient traffic routing and self-healing behaviour under disruptions.',
  solution: 'A layered optical network model that distributes traffic across ring and hub architectures with protection switching.',
  architecture: 'Access layer, aggregation layer and core layer coordination with zonal hubs and APS-based recovery flows.',
  contribution: 'The network architecture was developed around scalable communication design and resilience-driven topology planning.',
  results: 'The proposed model focuses on fault tolerance and long-haul communication efficiency.',
  gallery: 'Maps, topologies and optical layer diagrams to be added.',
  variant: 'large'
}, {
  id: 'civic-mysuru',
  number: '04',
  name: 'CIVIC MYSURU',
  title: 'CIVIC MYSURU',
  subtitle: '',
  description: 'Technology-driven civic governance and clean-city management platform designed to improve accountability in urban operations.',
  type: 'Connected Cities',
  tags: ['Civic Governance', 'Smart City', 'Clean-City Management'],
  technologies: ['Civic Governance', 'Clean-City Management', 'Smart City'],
  problem: 'Urban governance systems need transparent monitoring and timely action for civic service improvement.',
  solution: 'A civic technology concept for tracking urban operations, service responsiveness and city cleanliness workflows.',
  architecture: 'Operational dashboards, data layers and service reporting workflows connected to urban governance decisions.',
  contribution: 'The project focused on structured civic technology thinking, service design and operational visibility.',
  results: 'The framework prioritises transparency, accountability and service delivery efficiency in city systems.',
  gallery: 'Smart-city interface and civic dashboards to be added.',
  variant: 'medium'
}, {
  id: 'sarvagya',
  number: '05',
  name: 'SARVAGYA',
  title: 'SARVAGYA',
  subtitle: 'AI-Based Agriculture Robot',
  description: 'An intelligent agricultural robotics system designed to assist with autonomous operations using AI, robotics and computer vision.',
  type: 'Agricultural Robotics',
  tags: ['AI', 'Agricultural Robotics', 'Computer Vision', 'Autonomous Systems', 'Robotics'],
  technologies: ['AI', 'Agricultural Robotics', 'Computer Vision', 'Autonomous Systems', 'Robotics'],
  problem: 'Precision agriculture requires autonomous perception and navigation in dynamic crop environments.',
  solution: 'A field robot concept that combines machine vision, navigation and task automation for agricultural workflows.',
  architecture: 'Vision-guided perception, movement planning, crop-row localisation and autonomous task execution logic.',
  contribution: 'The system concept centred on autonomous agricultural operations using embedded sensing and AI-based perception.',
  results: 'The design supports efficient and safer agricultural automation in complex operating conditions.',
  gallery: 'Agricultural robot sketches and field operation visualisations to be added.',
  variant: 'large'
}, {
  id: 'robot-arm',
  number: '06',
  name: '5-DOF ROBOTIC ARM',
  title: '5-DOF ROBOTIC ARM',
  subtitle: 'Inverse Kinematics',
  description: 'A 5-degree-of-freedom robotic arm controlled using inverse kinematics for accurate motion planning and execution.',
  type: 'Robotics',
  tags: ['Robotics', 'Inverse Kinematics', '5-DOF', 'Motion Planning', 'Control Systems'],
  technologies: ['Robotics', 'Inverse Kinematics', '5-DOF', 'Motion Planning', 'Control Systems'],
  problem: 'Precise positioning in robotic manipulation needs accurate joint control and kinematic resolution.',
  solution: 'A kinematics-driven control framework for planning and executing accurate arm trajectory movements.',
  architecture: 'Joint-space and Cartesian-space control with inverse kinematics mapping and motion planning logic.',
  contribution: 'The arm model focused on how reachability, trajectory control and kinematic accuracy translate from theory to practice.',
  results: 'The design supports stable and accurate controlled motion for engineered manipulation tasks.',
  gallery: 'Arm geometry diagrams and motion frames to be added.',
  variant: 'medium'
}, {
  id: 'cyclofusion-net',
  number: '07',
  name: 'CYCLOFUSION-NET',
  title: 'CYCLOFUSION-NET',
  subtitle: '',
  description: 'A computer vision and perception system focused on multimodal visual information fusion for robust scene understanding.',
  type: 'Perception Systems',
  tags: ['Computer Vision', 'Deep Learning', 'Sensor Fusion', 'AI'],
  technologies: ['Computer Vision', 'Deep Learning', 'Sensor Fusion', 'AI'],
  problem: 'Scene understanding becomes more reliable when multi-source visual information is fused into one consistent representation.',
  solution: 'A fusion-focused AI perception approach that combines complementary visual signals into a richer understanding model.',
  architecture: 'Feature extraction, modality fusion, perception filtering and robust downstream inference.',
  contribution: 'The concept centred on perception architecture design and feature-level integration for intelligent scene reasoning.',
  results: 'The system aims to improve robustness and information completeness in computer vision tasks.',
  gallery: 'Multimodal sensor diagrams and perception flow visuals to be added.',
  variant: 'large'
}, {
  id: 'more-systems',
  number: '08',
  name: 'MORE SYSTEMS',
  title: 'MORE SYSTEMS',
  subtitle: 'COMING SOON',
  description: 'More autonomous systems, robotics and AI projects are currently being developed in this portfolio pipeline.',
  type: 'Future Systems',
  tags: ['Robotics', 'AI', 'Autonomy', 'Research'],
  technologies: ['Robotics', 'AI', 'Autonomy', 'Research'],
  problem: 'The portfolio is growing with new research directions and system prototypes still in development.',
  solution: 'A teaser section highlighting future autonomous robotics and AI work currently under active progress.',
  architecture: 'Pipeline of prototypes, systems and research exploration underway for upcoming portfolio additions.',
  contribution: 'This tile signals future technical directions and active portfolio expansion.',
  results: 'It acts as a forward-looking teaser for upcoming systems across autonomous robotics and intelligence.',
  gallery: 'Future system visual concepts to be added.',
  variant: 'medium'
}];
function ProjectShowcaseVisual({
  project
}) {
  return <div className={`project-showcase-visual visual-${project.id}`} aria-hidden="true"><span className="visual-grid" /><span className="visual-badge">{project.number}</span><span className="visual-arc arc-one" /><span className="visual-arc arc-two" /><span className="visual-core" /></div>;
}
function ProjectsHorizontalGallery({
  onSelectProject
}) {
  const galleryRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startScrollLeft: 0
  });
  const updateScrollState = () => {
    const element = galleryRef.current;
    if (!element) return;
    const maxScroll = element.scrollWidth - element.clientWidth;
    setIsAtStart(element.scrollLeft <= 8);
    setIsAtEnd(element.scrollLeft >= maxScroll - 8);
  };
  const scrollGallery = direction => {
    const element = galleryRef.current;
    if (!element) return;
    const firstCard = element.querySelector('.project-panel');
    const scrollStep = firstCard ? firstCard.getBoundingClientRect().width + 28 : 420;
    element.scrollTo({
      left: element.scrollLeft + direction * scrollStep,
      behavior: 'smooth'
    });
  };
  const handleWheel = event => {
    const element = galleryRef.current;
    if (!element) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) {
      event.preventDefault();
      element.scrollTo({
        left: element.scrollLeft + event.deltaX + event.deltaY * 0.55,
        behavior: 'auto'
      });
      return;
    }
    if (Math.abs(event.deltaY) > 0) {
      event.preventDefault();
      element.scrollTo({
        left: element.scrollLeft + event.deltaY * 1.2,
        behavior: 'auto'
      });
    }
  };
  const handlePointerDown = event => {
    const element = galleryRef.current;
    if (!element) return;
    dragState.current = {
      dragging: true,
      startX: event.clientX,
      startScrollLeft: element.scrollLeft
    };
    element.setPointerCapture(event.pointerId);
    element.classList.add('is-dragging');
  };
  const handlePointerMove = event => {
    const element = galleryRef.current;
    if (!dragState.current.dragging || !element) return;
    const delta = event.clientX - dragState.current.startX;
    element.scrollLeft = dragState.current.startScrollLeft - delta;
  };
  const handlePointerUp = event => {
    const element = galleryRef.current;
    if (!element) return;
    dragState.current.dragging = false;
    element.releasePointerCapture?.(event.pointerId);
    element.classList.remove('is-dragging');
    updateScrollState();
  };
  useEffect(() => {
    updateScrollState();
    const handler = () => updateScrollState();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  useEffect(() => {
    const onKeyDown = event => {
      const tagName = document.activeElement && document.activeElement.tagName;
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        scrollGallery(1);
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        scrollGallery(-1);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        const element = galleryRef.current;
        if (element) element.scrollTo({ left: 0, behavior: 'smooth' });
      }
      if (event.key === 'End') {
        event.preventDefault();
        const element = galleryRef.current;
        if (element) element.scrollTo({ left: element.scrollWidth, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  return <div className="projects-showcase-shell"><div className="projects-gallery-controls">{!isAtStart && <button type="button" className="gallery-nav-button" aria-label="Scroll to previous project" onClick={() => scrollGallery(-1)}>←</button>}<button type="button" className="gallery-scroll-button" aria-label={isAtEnd ? 'Restart project gallery' : 'Scroll to next project'} onClick={() => {
        const element = galleryRef.current;
        if (!element) return;
        if (isAtEnd) {
          element.scrollTo({ left: 0, behavior: 'smooth' });
          return;
        }
        scrollGallery(1);
      }}>{isAtEnd ? 'RESTART →' : 'SCROLL →'}</button></div><div className="projects-scrollview" ref={galleryRef} onWheel={handleWheel} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} onScroll={updateScrollState} role="region" aria-label="Selected systems project gallery" tabIndex={0}>{selectedSystemsProjects.map(project => <article key={project.id} className={`project-panel ${project.variant === 'large' ? 'is-large' : 'is-medium'}`}><ProjectShowcaseVisual project={project} /><div className="project-panel-copy"><div className="project-panel-topline"><span>{project.number}</span><span>{project.type}</span></div><h3>{project.title}</h3>{project.subtitle && <p className="project-panel-subtitle">{project.subtitle}</p>}<p className="project-panel-description">{project.description}</p><div className="project-panel-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button type="button" className="project-panel-link" aria-label={`View project ${project.title}`} onClick={() => onSelectProject(project)}>VIEW PROJECT <ArrowUpRight size={14} /></button></div></article>)}</div></div>;
}
function AboutLidarGraphic() {
  const container = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, {
      rootMargin: '180px'
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div className="about-lidar-background" ref={container} aria-hidden="true">{visible && <Suspense fallback={null}><LidarScene /></Suspense>}<div className="about-lidar-wash" /></div>;
}
function ProjectDialog({
  project,
  onClose
}) {
  useEffect(() => {
    const onKeyDown = event => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    document.body.classList.add('dialog-open');
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('dialog-open');
    };
  }, [onClose]);
  const details = [['Problem', project.problem], ['Solution', project.solution], ['Architecture', project.architecture], ['My contribution', project.contribution], ['Results', project.results], ['Gallery', project.gallery]];
  return <motion.div className="dialog-backdrop" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} onMouseDown={event => event.target === event.currentTarget && onClose()}><motion.section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" initial={{
      opacity: 0,
      y: 24,
      scale: 0.98
    }} animate={{
      opacity: 1,
      y: 0,
      scale: 1
    }} exit={{
      opacity: 0,
      y: 16,
      scale: 0.98
    }} transition={{
      duration: 0.25
    }}><div className="dialog-topline"><span>PROJECT FILE / {project.number}</span><button className="icon-button" onClick={onClose} aria-label="Close project details"><X size={18} /></button></div><ProjectArtwork project={project} /><div className="dialog-content"><div className="section-meta"><span>{project.number}</span><i />{project.type}</div><h2 id="dialog-title">{project.name}</h2><p className="dialog-subtitle">{project.title}</p><div className="detail-grid">{details.map(([label, value]) => <div className="detail-cell" key={label}><span>{label}</span><p>{value}</p></div>)}</div><div className="tag-row">{project.technologies.map(technology => <span className="tag" key={technology}>{technology}</span>)}</div><div className="dialog-actions">{project.github ? <a className="outline-button" href={project.github} target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub <ArrowUpRight size={14} /></a> : <span className="unavailable-link"><Code2 size={15} /> GitHub link pending</span>}{project.demo ? <a className="outline-button" href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14} /></a> : <span className="unavailable-link">Demo link pending</span>}</div></div></motion.section></motion.div>;
}
function StackedCardCarousel() {
  const carouselData = [
    { id: 1, title: 'SIGNAL PROCESSING', subtitle: 'Advanced Algorithms', description: 'Extracting meaningful data from noisy environments using advanced mathematical models and digital signal processors.', bg: 'linear-gradient(135deg, #1a2a3a 0%, #0d151d 100%)' },
    { id: 2, title: 'EMBEDDED SYSTEMS', subtitle: 'Hardware Integration', description: 'Low-latency hardware integrations for robust real-time autonomy, utilizing ARM Cortex-M and embedded Linux.', bg: 'linear-gradient(135deg, #2a3a2a 0%, #151d15 100%)' },
    { id: 3, title: 'INTELLIGENT CONTROL', subtitle: 'Robotics & AI', description: 'Applying modern AI to physical feedback loops, combining classical control theory with reinforcement learning.', bg: 'linear-gradient(135deg, #3a2a2a 0%, #1d1515 100%)' },
    { id: 4, title: 'PERCEPTION NETWORKS', subtitle: 'Computer Vision', description: 'Transforming complex sensor data into situational awareness for autonomous navigation and object detection.', bg: 'linear-gradient(135deg, #3a3a1a 0%, #1d1d0d 100%)' }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="stacked-carousel-wrapper">
      <div className="stacked-carousel-container">
        {carouselData.map((item, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;
          const isVisible = offset <= 0 && offset >= -4;
          
          let left = '100%';
          let scale = 1;
          let opacity = 0;
          let zIndex = 0;

          if (isActive) {
            left = '55%';
            scale = 1;
            opacity = 1;
            zIndex = 10;
          } else if (isVisible) {
            left = `${30 + offset * 8}%`;
            scale = 0.85 + offset * 0.05;
            opacity = 1 + offset * 0.2;
            zIndex = 10 + offset;
          }

          return (
            <motion.div
              key={item.id}
              className={`stacked-card ${isActive ? 'active' : 'stacked'}`}
              initial={false}
              animate={{ left, scale, opacity, zIndex }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={() => setActiveIndex(index)}
              style={{ background: item.bg, x: '-50%' }}
            >
              <div className="stacked-card-overlay" />
              {isActive && (
                <motion.div 
                  className="stacked-card-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="stacked-subtitle">{item.subtitle}</span>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <button className="play-button"><Zap size={20} /> EXPLORE</button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="stacked-indicators">
        {carouselData.map((_, index) => (
          <button 
            key={index} 
            className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeSkill, setActiveSkill] = useState(skills[0].category);
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const activeSkillGroup = skills.find(group => group.category === activeSkill) ?? skills[0];
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach(element => gsap.fromTo(element, {
        y: 22,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true
        }
      }));
    });
    return () => context.revert();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)), {
      rootMargin: '-35% 0px -55% 0px'
    });
    navigation.forEach(([, id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  const submitContact = event => {
    event.preventDefault();
    if (!portfolio.email) {
      setFormStatus('Contact email has not been configured yet.');
      return;
    }
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(form.get('subject')));
    const body = encodeURIComponent(`From: ${form.get('name')} (${form.get('reply')})\n\n${form.get('message')}`);
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
    setFormStatus('Your email app is ready with this message.');
  };
  return <>
    <div className="ambient-grid" aria-hidden="true" />
    <header className="topbar"><a href="#home" className="wordmark" aria-label="Aditya Jeevan Naik home"><span className="wordmark-icon"><Cpu size={15} /></span><span>AJN<span className="wordmark-dot">.</span></span><small>ECE / SYSTEMS</small></a><nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">{navigation.map(([label, id]) => <a key={id} className={activeSection === id ? 'nav-active' : ''} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><a className="top-contact" href="#contact"><span className="online-dot" /> AVAILABLE FOR COLLABORATION</a><button className="menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></header>

    <main className="relative">
      <section className="hero-section" id="home"><div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="pulse-dot" /> SIGNAL <ChevronRight size={12} /> INTELLIGENCE <ChevronRight size={12} /> AUTONOMY</div><h1>ADITYA JEEVAN<br /><span>NAIK</span></h1><div className="hero-role"><span className="role-line" />{portfolio.role}</div><p className="hero-statement">{portfolio.statement}</p><div className="hero-actions"><a className="primary-button" href="#projects">EXPLORE MY WORK <ArrowRight size={16} /></a>{portfolio.resumeReady ? <a className="outline-button" href={portfolio.resumePath} download>DOWNLOAD RESUME <ArrowDown size={15} /></a> : <span className="resume-pending">RESUME / FILE PENDING</span>}</div><div className="hero-footnote"><span>01 — ENGINEERING</span><span>BUILT FOR THE REAL WORLD</span></div></div>
        <div className="hero-visual" aria-label="Portrait of Aditya Jeevan Naik"><div className="hero-portrait" role="img" aria-label="Aditya Jeevan Naik" /><div className="visual-label label-top"><span>FIG. 01</span><i /> ENGINEER / ECE</div><div className="visual-coordinate">ADITYA JEEVAN NAIK<br />HARDWARE / INTELLIGENCE</div><div className="visual-glow" /><div className="visual-ring ring-one" /><div className="visual-ring ring-two" /><div className="visual-caption"><span>01</span> SIGNAL / SYSTEMS / AUTONOMY</div><div className="visual-crosshair crosshair-a" /><div className="visual-crosshair crosshair-b" /></div>
        <aside className="system-status"><div className="status-title"><span><Radio size={14} /> SYSTEM STATUS</span><span className="status-live">● LIVE</span></div>{['ECE ENGINEER ONLINE', 'EMBEDDED SYSTEMS ACTIVE', 'ROBOTICS ACTIVE', 'AI / COMPUTER VISION ACTIVE'].map((item, index) => <div className="status-row" key={item}><span className="status-number">0{index + 1}</span><span>{item}</span><i /></div>)}</aside><a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><div><ArrowDown size={14} /></div></a><div className="hero-index">PORTFOLIO / 2026<br />ECE / INDIA</div>
      </section>

      <section id="about" className="content-section about-section"><AboutLidarGraphic /><SectionHeading index="01" eyebrow="THE ENGINEER" title="ENGINEERING THE CONNECTION BETWEEN HARDWARE AND INTELLIGENCE" />
        <StackedCardCarousel />
      </section>


      <section id="skills" className="content-section skills-section"><SectionHeading index="02" eyebrow="CAPABILITY MATRIX" title="BUILT FROM THE BOARD UP." /><div className="skills-layout reveal"><div className="skill-console"><div className="console-label"><span>SKILL MATRIX / SELECT DOMAIN</span><span>4 CHANNELS</span></div><div className="skill-select" role="tablist" aria-label="Skill categories">{skills.map(group => <button role="tab" aria-selected={activeSkill === group.category} className={activeSkill === group.category ? 'skill-tab selected' : 'skill-tab'} key={group.category} onClick={() => setActiveSkill(group.category)}><span>{group.code}</span>{group.category}<ChevronRight size={14} /></button>)}</div><div className="skill-readout"><div className="readout-top"><span>CHANNEL {activeSkillGroup.code}</span><span><i /> ACTIVE</span></div><h3>{activeSkillGroup.category}</h3><div className="skill-chip-grid">{activeSkillGroup.items.map((skill, index) => <motion.span key={skill} initial={{
                  opacity: 0,
                  y: 7
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: index * 0.035
                }}><Check size={12} />{skill}</motion.span>)}</div></div></div><div className="skills-diagram"><div className="diagram-orbit orbit-a" /><div className="diagram-orbit orbit-b" /><div className="diagram-core"><Cpu size={29} /><span>ECE</span></div><div className="diagram-label diagram-label-a">HARDWARE <span>01</span></div><div className="diagram-label diagram-label-b">SIGNAL <span>02</span></div><div className="diagram-label diagram-label-c">INTELLIGENCE <span>03</span></div><div className="diagram-label diagram-label-d">AUTONOMY <span>04</span></div><div className="diagram-node node-a" /><div className="diagram-node node-b" /><div className="diagram-node node-c" /></div></div></section>

      <section id="projects" className="content-section projects-section"><SectionHeading index="03" eyebrow="SELECTED SYSTEMS" title="FROM SIGNAL TO SOMETHING REAL." /><ProjectsHorizontalGallery onSelectProject={setSelectedProject} /></section>

      <section id="journey" className="content-section journey-section"><SectionHeading index="04" eyebrow="FIELD NOTES" title="A JOURNEY IN PROGRESS." /><div className="journey-layout"><div className="journey-intro reveal"><span className="terminal-prompt">log --follow / life</span><p>Each milestone will be documented here as it happens. The timeline is intentionally open-ended.</p><div className="journey-stamp"><span>STATUS</span><b>ONGOING</b><i /></div></div><div className="timeline">{journey.map((item, index) => <div className="timeline-row reveal" key={item}><div className="timeline-node"><span>{String(index + 1).padStart(2, '0')}</span></div><div className="timeline-entry"><h3>{item}</h3><span>ENTRY AWAITING DETAILS</span></div><ChevronRight size={16} /></div>)}</div></div></section>

      <section id="research" className="content-section research-section"><SectionHeading index="05" eyebrow="SIGNAL INTELLIGENCE" title="QUESTIONS WORTH FOLLOWING." /><div className="research-layout"><div className="research-copy reveal"><span className="terminal-prompt">radar.sweep --interests</span><h3>Curiosity is the first instrument.</h3><p>Exploring where sensing, computation and communication become real-world capability.</p><div className="radar-legend"><span><i className="legend-primary" /> ACTIVE INTERESTS</span><span><i className="legend-grid" /> RESEARCH SPACE</span></div></div><div className="radar-panel reveal"><div className="radar-grid"><div className="radar-sweep" /><div className="radar-cross radar-cross-h" /><div className="radar-cross radar-cross-v" />{interests.map((interest, index) => <span key={interest} className={`radar-point radar-point-${index + 1}`}><i />{interest}</span>)}</div><span className="radar-coord">SCAN / 09 VECTORS</span></div></div></section>

      <section className="content-section achievements-section"><SectionHeading index="06" eyebrow="MILESTONES" title="EVIDENCE OVER CLAIMS." /><div className="achievements-grid">{achievements.map((item, index) => <article className="achievement-card reveal" key={item}><span>0{index + 1} / RECORD</span><div className="achievement-symbol">{index === 0 ? <Zap /> : index === 1 ? <Radio /> : index === 2 ? <Check /> : index === 3 ? <Cpu /> : index === 4 ? <ChevronRight /> : <ArrowUpRight />}</div><h3>{item}</h3><p>Details will be added once verified.</p><i /></article>)}</div></section>

      <section className="resume-band"><div className="resume-id"><span className="resume-monogram">AJN</span><div><span>ENGINEERING PROFILE / PDF</span><h2>{portfolio.name}</h2><p>{portfolio.role}</p></div></div><div className="resume-actions">{portfolio.resumeReady ? <><a className="outline-button" href={portfolio.resumePath} target="_blank" rel="noreferrer">VIEW RESUME <ArrowUpRight size={15} /></a><a className="primary-button" href={portfolio.resumePath} download>DOWNLOAD RESUME <ArrowDown size={15} /></a></> : <span className="resume-file-note">RESUME FILE AWAITING UPLOAD<br /><small>Replace public/resume.pdf to enable these actions.</small></span>}</div></section>

      <section id="contact" className="content-section contact-section"><SectionHeading index="07" eyebrow="OPEN CHANNEL" title="LET'S BUILD SOMETHING INTELLIGENT." /><div className="contact-layout"><div className="contact-copy reveal"><span className="terminal-prompt"><span className="pulse-dot" /> transmission.ready</span><p>Have a research question, a system to prototype, or an idea worth testing? Send a signal.</p><div className="contact-links"><div className="contact-link"><span><Radio size={16} /> EMAIL</span><b>{portfolio.email || 'ADDRESS NOT CONFIGURED'}</b></div><a className="contact-link" href={portfolio.links.linkedin || undefined} aria-disabled={!portfolio.links.linkedin} onClick={event => !portfolio.links.linkedin && event.preventDefault()}><span><BriefcaseBusiness size={16} /> LINKEDIN</span><b>{portfolio.links.linkedin ? 'OPEN PROFILE' : 'LINK PENDING'} <ArrowUpRight size={13} /></b></a><a className="contact-link" href={portfolio.links.github || undefined} aria-disabled={!portfolio.links.github} onClick={event => !portfolio.links.github && event.preventDefault()}><span><Code2 size={16} /> GITHUB</span><b>{portfolio.links.github ? 'OPEN PROFILE' : 'LINK PENDING'} <ArrowUpRight size={13} /></b></a>{portfolio.phone && <div className="contact-link"><span><Radio size={16} /> PHONE</span><b>{portfolio.phone}</b></div>}</div></div><form className="contact-form reveal" onSubmit={submitContact}><div className="form-title"><span>COMMUNICATION CONSOLE</span><span><i /> LOCAL DRAFT / MAILTO</span></div><label>YOUR NAME<input name="name" autoComplete="name" placeholder="Name" required /></label><div className="form-row"><label>REPLY ADDRESS<input name="reply" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label>SUBJECT<input name="subject" placeholder="What are you building?" required /></label></div><label>MESSAGE<textarea name="message" rows={4} placeholder="Tell me a little about it..." required /></label><div className="form-footer"><span>{formStatus || 'MESSAGE TRANSMISSION / READY'}</span><button className="primary-button" type="submit">SEND SIGNAL <Send size={14} /></button></div></form></div><div className="contact-signal" aria-hidden="true"><span /><span /><span /></div></section>
    </main>

    <footer className="site-footer"><a href="#home" className="wordmark"><span className="wordmark-icon"><Cpu size={15} /></span><span>AJN<span className="wordmark-dot">.</span></span><small>ECE / SYSTEMS</small></a><span>DESIGNED AROUND SIGNAL, INTELLIGENCE & AUTONOMY</span><a href="#home">BACK TO TOP <ArrowUpRight size={13} /></a><small>© 2026 ADITYA JEEVAN NAIK</small></footer>
    <AnimatePresence>{selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
  </>;
}
export default App;