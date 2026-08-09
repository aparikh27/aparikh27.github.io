/**
 * Single source of truth for every project surfaced on the site.
 *
 * The homepage renders `getFeaturedProjects()` (concise cards); `/projects`
 * renders `getAllProjects()` (expanded cards). Adding a project here is the
 * only edit required to surface it in both places.
 */

/** A key outcome worth calling out on the card — ideally quantified. */
export interface ProjectHighlight {
  /** Short label, e.g. "p95 latency" or "Users". */
  label: string;
  /** The number or claim itself, e.g. "42ms" or "12k+". */
  value: string;
  /** Optional deep link backing up the claim (benchmark, PR, write-up). */
  href?: string;
}

export interface Project {
  /** Stable, URL-safe id. Used for React keys and `#anchor` links. */
  slug: string;
  title: string;
  /** One-sentence hook. Kept short — it renders as the card subtitle. */
  tagline: string;
  /** One paragraph. Shown in full on `/projects`, clamped on the homepage. */
  description: string;
  /** Key tech/impact metrics to highlight. */
  highlights: ProjectHighlight[];
  /** Technologies, rendered as uniform chips. */
  stack: string[];
  role: string;
  /** Human-readable range, e.g. "2024 — Present". */
  time: string;
  place: string;
  /** One sentence tying this work back to the overall mission. */
  visionLink: string;
  github?: string;
  demo?: string;
  /** Path under `public/`, or a remote URL. */
  image?: string;
  /** Featured projects appear on the homepage, ordered by array position. */
  isFeatured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'multi-agent-robotic-assistant',
    title: 'Multi-Agent AI Robotic Assistant',
    tagline:
      'A full-stack robotics architecture pairing an event-driven multi-agent framework with a real-time embedded C++ runtime.',
    description:
      'A full-stack robotics architecture combining an event-driven multi-agent framework with a C++20 embedded middleware runtime in Webots for complex human-robot interaction. To coordinate high-level perception and planning, I decoupled five core agents — Vision (YOLO), Speech (Whisper), Planning (LLMs), Execution (PPO RL), and Memory — around a central Coordinator message bus, an asynchronous FastAPI backend, and a React telemetry dashboard. Beneath that agentic layer, I engineered a lightweight C++20 runtime with a thread-safe, priority-based task scheduler, lock-free queues, custom memory pools, and a ROS-inspired publish-subscribe bus to prevent heap fragmentation. Hardware peripherals are abstracted behind clean HAL interfaces with CMake and GoogleTest integration, so the same stack runs reliably across both bare-metal microcontrollers and simulated environments.',
    highlights: [
      { label: 'Coordinated agents', value: '5' },
      { label: 'Runtime', value: 'C++20 embedded' },
      { label: 'Simulation', value: 'Webots' },
    ],
    stack: [
      'C++20',
      'FastAPI',
      'React',
      'YOLO',
      'Whisper',
      'LLM Planning',
      'PPO Reinforcement Learning',
      'CMake',
      'GoogleTest',
      'Edge AI',
      'Multi-Agent Systems',
      'Middleware Engineering',
    ],
    role: 'Founder & Lead Engineer',
    time: 'June 2026 — Present',
    place: 'BAI',
    visionLink:
      'A robot that can perceive, plan, and act without depending on a cloud connection is a robot that can serve communities the cloud never reaches.',
    isFeatured: true,
  },
  {
    slug: 'smart-knee-brace-bes',
    title: 'Smart Post-Operative Knee Brace Platform',
    tagline:
      'An end-to-end IoT ecosystem streaming real-time sensor telemetry from a post-op knee brace to clinicians and patients.',
    description:
      'An end-to-end IoT software ecosystem for a smart post-operative knee brace, establishing real-time telemetry pipelines from embedded sensors to cloud and mobile applications to help track and accelerate patient recovery. I engineered custom iOS Bluetooth Low Energy protocols to stream low-latency sensor data — ECG, EMG, and IMU — directly into a production App Store app. On the backend, I built a Django REST API with MySQL on AWS EC2 to process high-frequency time-series streams, integrating the Claude API to generate automated longitudinal patient summaries. To deliver actionable recovery metrics, I designed and implemented responsive React/TypeScript interfaces, prototyped in Figma, to visualize live device analytics for clinicians and patients.',
    highlights: [
      { label: 'Sensor streams', value: 'ECG · EMG · IMU' },
      { label: 'Delivery', value: 'Live on the App Store' },
      { label: 'Patient summaries', value: 'Automated via Claude API' },
    ],
    stack: [
      'iOS · BLE',
      'Django REST Framework',
      'MySQL',
      'AWS EC2',
      'Claude API',
      'React',
      'TypeScript',
      'Figma',
    ],
    role: 'Full Stack Developer, Academic Chair',
    time: 'October 2025 — Present',
    place: 'Biomedical Engineering Society',
    visionLink:
      'Recovery shouldn’t depend on how often a patient can get to a clinic — this closes that loop with data instead of a waiting room.',
    isFeatured: true,
  },
  {
    slug: 'chromatin-state-prediction-ernst-lab',
    title: 'Chromatin State Prediction',
    tagline:
      'Fine-tuning genomic foundation models to predict regulatory chromatin states directly from raw DNA sequence.',
    description:
      'Accurate chromatin state prediction is essential for mapping non-coding genomic regions and identifying the gene regulation mechanisms that drive disease. I fine-tuned genomic foundation models — DNABERT-2 and Enformer — to predict regulatory states from raw DNA sequences. To manage extreme label imbalance across millions of genomic sites, I integrated DeepSpeed distributed execution, bfloat16 mixed precision, and class-weighted loss functions into training. I also architected high-throughput data ingestion pipelines using chunked HDF5 streaming, so gigabyte-scale genomic sequence arrays could be processed without memory bottlenecks.',
    highlights: [
      { label: 'Foundation models', value: 'DNABERT-2 · Enformer' },
      { label: 'Genomic data', value: 'Millions, class-imbalanced' },
      { label: 'Training scale', value: 'DeepSpeed + bfloat16' },
    ],
    stack: [
      'DNABERT-2',
      'Enformer',
      'DeepSpeed',
      'HDF5',
      'Python',
      'High-Throughput Computing',
      'Deep Learning',
      'Bioinformatics',
    ],
    role: 'Computational Biology Research Intern',
    time: 'October 2025 — Present',
    place: 'The Ernst Lab, UCLA',
    visionLink:
      'The genome doesn’t read differently for the well-funded lab — better models for interpreting it are a direct line to more equitable diagnosis.',
    isFeatured: true,
  },
  {
    slug: 'cardiac-arrhythmia-detection',
    title: 'Real-Time Cardiac Arrhythmia Detection',
    tagline:
      'ML pipelines that classify, detect, and forecast arrhythmias from live cardiac sensor streams for continuous monitoring.',
    description:
      'Machine learning pipelines to classify, detect, and predict arrhythmias from real-time heart sensor streams, helping advance personalized medicine through continuous cardiac monitoring. I architected sliding-window feature extraction workflows over raw time-series data to compute statistical and frequency-domain metrics for early-warning systems, implemented Isolation Forest and One-Class SVM models for unsupervised anomaly detection alongside Random Forest classifiers for multi-class sequence detection, and deployed lightweight XGBoost models optimized for low-latency, on-device prediction — forecasting critical cardiac events before threshold breaches occur.',
    highlights: [
      { label: 'Anomaly detection', value: 'Isolation Forest · One-Class SVM' },
      { label: 'Classification', value: 'Random Forest' },
      { label: 'Forecasting', value: 'On-device XGBoost' },
    ],
    stack: [
      'Predictive Modeling',
      'Unsupervised Learning',
      'Feature Engineering',
      'Isolation Forest',
      'One-Class SVM',
      'Random Forest',
      'XGBoost',
    ],
    role: 'Full Stack Developer',
    time: 'January 2026 — Present',
    place: 'Crely Inc',
    visionLink:
      'Continuous, on-device monitoring means a warning sign doesn’t have to wait for a scheduled appointment to be caught.',
    isFeatured: false,
  },
  {
    slug: 'solar-wildlife-tracking',
    title: 'Solar-Powered Wildlife Tracking Platform',
    tagline:
      'A ruggedized, solar-powered IoT sensor platform running on-device computer vision for remote wildlife tracking.',
    description:
      'Wildlife tracking in remote habitats often fails due to limited power infrastructure and heavy bandwidth constraints on live video streaming. I designed and prototyped a ruggedized, solar-powered IoT sensor platform to monitor animal movements in field environments, deploying an edge computer vision pipeline on Raspberry Pi hardware with OpenCV to run real-time object detection and multi-target tracking directly on-device. I also engineered low-power wireless communication protocols and lightweight video streaming pipelines, transmitting live telemetry and video feeds to mobile client nodes for remote, real-time observation.',
    highlights: [
      { label: 'Compute', value: 'Raspberry Pi, on-device CV' },
      { label: 'Power', value: 'Solar IoT platform' },
      { label: 'Tracking', value: 'Real-time, multi-target' },
    ],
    stack: ['IoT', 'Telemetry', 'Microcontrollers', 'OpenCV', 'Raspberry Pi'],
    role: 'Robotics Intern',
    time: 'August 2024 — June 2025',
    place: 'Yolo Basin Foundation',
    visionLink:
      'Conservation work in low-infrastructure habitats needed tools that don’t assume reliable power or bandwidth — this platform doesn’t.',
    isFeatured: false,
  },
  {
    slug: 'radiation-dosimetry-pipeline',
    title: '3D Dosimetry Pipeline for Radiation Therapy',
    tagline:
      'An asynchronous pipeline for gigabyte-scale 3D dose calculation, built to target tumors while sparing healthy tissue.',
    description:
      'Precise 3D spatial mapping and dose calculation are critical in radiation therapy to target tumors accurately while sparing healthy tissue. I architected an asynchronous Python pipeline to process gigabyte-scale 3D volumetric imaging datasets for organ-level dosimetry, engineering DICOM-to-MHD converters that serialized medical imaging series into contiguous NumPy arrays to reduce disk I/O overhead and enable sub-second voxel indexing. I also interfaced Python processing modules with C++ Monte Carlo simulation frameworks (GATE) to map continuous energy fields across 3D mesh geometries, and developed custom 3D Slicer modules to compute spatial dose distribution histograms for clinical analysis.',
    highlights: [
      { label: 'Imaging scale', value: 'Gigabyte-scale 3D volumes' },
      { label: 'Simulation', value: 'GATE Monte Carlo (C++)' },
      { label: 'Indexing', value: 'Sub-second voxel lookup' },
    ],
    stack: [
      'Spatial Data Analytics',
      'Statistical Visualization',
      'Data Engineering',
      'Python',
      'C++',
      '3D Slicer',
    ],
    role: 'Data Science Research Intern',
    time: 'June 2024 — January 2025',
    place: 'The Roncali Lab, UC Davis',
    visionLink:
      'Faster, more precise dosimetry is what lets treatment target the tumor instead of the surrounding tissue a patient needs.',
    isFeatured: false,
  },
  {
    slug: 'medical-imaging-verification-stanford',
    title: 'Multi-Modal Verification Pipeline for Medical Imaging',
    tagline:
      'A multi-modal ML pipeline that automates spatial-alignment verification across large medical imaging datasets.',
    description:
      'Manual verification of object placement in medical imaging is a time-consuming process prone to inter-observer variability. My team and I engineered an end-to-end multi-modal machine learning pipeline that verified spatial alignment and object placement across 10,000+ medical images. I fine-tuned a Hugging Face NLP model to extract spatial metrics from unstructured clinical reports, enabling automated labeling for unannotated image datasets, and built and benchmarked CNN, YOLOv8, and ResNet50 vision architectures using cross-validation and AUROC metrics — selecting a production ResNet50 model that achieved an AUROC of 0.8623 to accelerate diagnostic verification workflows.',
    highlights: [
      { label: 'Images verified', value: '10,000+' },
      { label: 'Production model', value: 'ResNet50' },
      { label: 'AUROC', value: '0.8623' },
    ],
    stack: [
      'Computer Vision',
      'Natural Language Processing',
      'Image Classification',
      'Hugging Face',
      'YOLOv8',
      'ResNet50',
    ],
    role: 'AI Research Intern',
    time: 'June 2023',
    place: 'Stanford Center for AI in Medicine and Imaging',
    visionLink:
      'Automating verification at this scale is what turns a diagnostic bottleneck into something that scales with the patients who need it.',
    isFeatured: false,
  },
  {
    slug: 'mathematics-instruction-ardent',
    title: 'Personalized & Olympiad Mathematics Instruction',
    tagline:
      'One-on-one and competitive-track math instruction, from foundational arithmetic through Olympiad problem-solving.',
    description:
      'One-on-one mathematics instruction for 1st–10th grade students, developing customized lesson plans across foundational arithmetic, algebra, and geometry. I expanded this into group coaching for competitive Olympiad math, creating targeted curricula focused on advanced problem-solving techniques, combinatorics, and logic puzzles, while evaluating student progress through continuous diagnostic tracking.',
    highlights: [
      { label: 'Grade range', value: '1st – 10th' },
      { label: 'Track', value: 'Olympiad problem-solving' },
    ],
    stack: ['Mentorship', 'Curriculum Design', 'Classroom Management'],
    role: 'Mathematics Instructor',
    time: 'October 2025 — Present',
    place: 'Ardent Academy',
    visionLink:
      'A student’s access to strong math instruction shouldn’t hinge on their school’s budget — one-on-one teaching closes that gap directly.',
    isFeatured: false,
  },
  {
    slug: 'emc2-math-enrichment',
    title: 'E=MC² Math Enrichment Program',
    tagline:
      'A co-founded after-school math enrichment program serving 400+ district students with personalized, diagnostic-driven curricula.',
    description:
      'Co-founded an after-school math enrichment initiative serving 400+ district students. I designed diagnostic testing frameworks to deliver personalized curricula spanning visual, auditory, and project-based learning modules, and managed program operations — recruiting a diverse team of high school instructors, creating translated instructional materials for international transfer students, building the organization’s website, and directing guest lecturer events. Tracking student progress across gamified learning units measured a 70%+ average performance gain on diagnostic evaluations.',
    highlights: [
      { label: 'Students served', value: '400+' },
      { label: 'Performance gain', value: '70%+ average' },
    ],
    stack: ['Personalized Learning', 'Team Management', 'Project Management'],
    role: 'Co-Founder',
    time: 'August 2022 — August 2025',
    place: 'E=MC² Math Enrichment Program',
    visionLink:
      'Translated materials for transfer students and diagnostic-driven curricula both come from the same premise: access shouldn’t depend on background.',
    isFeatured: false,
  },
];

/** Featured projects for the homepage, capped at `limit` (default 3). */
export function getFeaturedProjects(limit = 3): Project[] {
  return projects.filter((project) => project.isFeatured).slice(0, limit);
}

/** Every project, for the `/projects` archive. */
export function getAllProjects(): Project[] {
  return projects;
}
