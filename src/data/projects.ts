/**
 * Single source of truth for every role and project on the site.
 *
 * The site is a single page. `getFeaturedProjects()` drives the "Selected
 * work" card grid; `getAllProjects()` drives the Experience accordion, which
 * holds the full write-ups that used to live on the separate archive route.
 *
 * Array order is the display order and is reverse-chronological, which the
 * accordion renders directly. Because the featured filter preserves array
 * order, the featured trio follows from the same sequence — there is no
 * second ordering to keep in sync.
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

/** One frame of a project slideshow. */
export interface ProjectSlide {
  /**
   * Path under `public/`. Stored raw and passed through `encodeURI()` at
   * render time — these are exported presentation files whose names contain
   * spaces and parentheses, and renaming the originals would break the link
   * back to the source deck.
   */
  src: string;
  /**
   * What the slide actually shows. A carousel of unlabelled images is
   * meaningless without this, so it describes content rather than position —
   * the position is already announced by the slide's `aria-label`.
   */
  alt: string;
}

export interface ProjectSlideshow {
  /** Names the carousel for assistive tech, e.g. "…project deck, 14 slides". */
  label: string;
  slides: ProjectSlide[];
}

export interface Project {
  /** Stable, URL-safe id. Used for React keys and `#anchor` links. */
  slug: string;
  title: string;
  /** One-sentence hook. Kept short — it renders as the card subtitle. */
  tagline: string;
  /** One paragraph. Shown in full inside the expanded accordion panel. */
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
  /** Optional project deck, rendered as a carousel inside the accordion panel. */
  slideshow?: ProjectSlideshow;
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
    slideshow: {
      label: 'Organ-Level Dosimetry — UC Davis Roncali Lab project deck, 14 slides',
      slides: [
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (1).png',
          alt: 'Background — research concepts. Radiation therapy is cancer treatment using high-energy beams to kill cancer cells; dosimetry is measuring or calculating the radiation absorbed by matter or tissue; medical imaging covers PET, CT and SPECT scans that create visual representations of organs. The Roncali Lab develops quantitative methods for nuclear imaging and therapy, with an emphasis on new technology for positron emission tomography and dosimetry for radionuclide therapy.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (2).png',
          alt: 'Background — resources. DICOM, the international standard for medical images; MHD, a MetaImage header storing only metadata; NRRD, Nearly Raw Raster Data for n-dimensional raster data; 3D Slicer for visualisation, processing, segmentation and registration; GATE, the Geant4 Application for Tomographic Emission Monte Carlo simulation; and MIM, Medical Image Merge, for receiving, transmitting and processing digital medical images.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (3).png',
          alt: 'Background — challenges with current dosimetry methods. Accuracy: measurements are often inaccurate because of complex organ geometries. Integration: clinicians find dosimetry difficult to fold into routine practice. Project goal: create a method to quantitatively measure radiation dosage in organs, improving personalised cancer treatment and decreasing side effects.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (4).png',
          alt: 'Pipeline Part 1 method, in three steps: file conversion from DICOM to MHD to cut metadata overhead; preprocessing to extract dimensions from the MHD file and resample the SPECT dose and CT organ files; and GATE simulation to track radiation particle interactions with tissue and build personalised dose calculations from CT images.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (5).png',
          alt: 'Pipeline Part 1 — absorbed dose files. Three SPECT scans of a whole body rendered as green intensity maps, with red and yellow hotspots along the torso marking regions of higher absorbed dose.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (6).png',
          alt: 'Pipeline Part 2 method, in four steps: segmentation using the TotalSegmentator module in 3D Slicer or Medical Image Merge to segment organs with AI; voxel extraction of 3D coordinates from RTStruct files into a NumPy array stored as NRRD; visualisation via a Python script mapping voxels to volume indices and launching 3D Slicer; and calculation matching dose spatial coordinates to organ contours to compute total absorbed dose in Grays per organ.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (7).png',
          alt: 'Pipeline Part 2 — contoured organs superimposed on the dose map, shown in axial and sagittal views. A 3D Slicer segment list labels the liver, thyroid gland, whole body, rest of body, lungs and kidneys, each in its own colour over the pink dose distribution.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (8).png',
          alt: 'Pipeline Part 2 — Python source that voxelises region-of-interest contours into a labelled 3D voxel volume, iterating the RTStruct structure set and contour sequences, converting contour points to grid indices by resolution, and bounds-checking each point before writing its label.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (9).png',
          alt: 'Pipeline Part 3 method, in two steps: processing voxels to extract activity values for each time point from the MHD dosage file, analysing temporal changes in radiation distribution; and graph visualisation using Python’s Matplotlib to plot how activity changes over time.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (10).png',
          alt: 'Pipeline Part 3 — time activity curve. Python code fits an exponential to label data and plots Total Ionizing Dose against time on a log scale, beside the resulting graph showing TID in Gray-seconds as a function of time for Lutetium-177 in the liver.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (12).png',
          alt: 'Pipeline Part 4 method, in three steps: extract dose values from the MHD file and match them to the corresponding organ contour; sort the dose values, determine cumulative volume at each level and compute the volume fraction receiving dose; and visualise the result as a Dose-Volume Histogram using Matplotlib.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (13).png',
          alt: 'Pipeline Part 4 — Dose-Volume Histogram plotting percentage of tissue against dose in Gray for the right kidney, left kidney and liver, beside the Python source that calculates the DVH from segmentation masks and dose arrays and plots each selected segment.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (14).png',
          alt: 'Final results. Improved accuracy: voxelisation gives a precise representation of anatomical structures, minimising errors. Processing time: automation reduces manual effort and speeds up processing of medical data. Streamlined workflow: a single pipeline runs from RTStruct input to data output, removing complex multi-step processes. Broader accessibility: the simplified workflow can be adopted across diverse healthcare settings, including smaller clinics with limited resources.',
        },
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio (15).png',
          alt: 'Future plans. Quality: expand to higher-resolution models and advanced visualisation for clearer contours and more accurate 3D models. Scope: incorporate CT, MRI and PET data into a unified segmentation workflow. User experience: build an intuitive graphical interface so medical professionals can load RTStruct files and adjust parameters without programming expertise.',
        },
      ],
    },
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
    slideshow: {
      label: 'AI-Based Endotracheal Intubation — Stanford AIMI project deck, 14 slides',
      slides: [
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio.png',
          alt: 'Title slide: AI-Based Endotracheal Intubation, by Arav Parikh at the Stanford Center for Artificial Intelligence in Medicine and Imaging, in collaboration with Joy, Krish, Dhanush, Penny, Jeffrey and Aayushi.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (1).png',
          alt: 'Table of contents: Background, Program Part 1, Program Part 2, and Results.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (2).png',
          alt: 'Foundational concepts, annotated on a chest X-ray: the endotracheal tube inserted into the trachea, the carina where the trachea divides into the bronchi, and the ETT–carina distance, normally 5 cm plus or minus 2 cm. Too close risks pneumothorax; too far risks hypoxia.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (3).png',
          alt: 'Goals. Part 1: use natural language processing to extract the ETT–carina distance from radiology reports. Part 2: categorise that distance as normal or abnormal, then use a regression model to predict the correct distance and suggest changes.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (4).png',
          alt: 'Program Part 1 method: a radiology report annotated by the d4data biomedical NER model, beside four steps — unzip and access the data, isolate the sentence containing the ETT–carina distance, tokenise with Hugging Face to find the distance, and add distances to an array with true/false categorisations.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (5).png',
          alt: 'Problems and solutions across three areas: complex JSON structure causing missed entities, solved with nested loops; exceptions from differing spellings, solved with regex and conditionals; and debugging a loop in the cut function, solved with conditions and print statements.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (6).png',
          alt: 'Python source for the cut_sentence function, which locates the endotracheal tube mention in a report and returns just the sentence containing the ETT–carina distance measurement.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (7).png',
          alt: 'Python source running the named-entity-recognition pipeline across every report, parsing results as JSON and collecting the extracted distances into an array, with exception handling that skips corrupt records.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (8).png',
          alt: 'Program Part 2 method in six steps: correcting data imbalance by removing 3,000 images from a set where tubes were correctly placed 71% of the time, building a CNN from scratch in PyTorch, fine-tuning pre-trained YOLOv8 over 200 epochs, building a ResNet-based model, evaluating with AUROC, mean absolute error and confusion matrices, and building a CNN regression model to recommend adjustments.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (9).png',
          alt: 'The first CNN, built in PyTorch: model architecture on the left and training loop on the right. It reached 71% accuracy but an AUROC of only 0.5.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (10).png',
          alt: 'YOLOv8 classification results as normalised confusion matrices. The imbalanced dataset trained over 100 epochs reached an AUROC of 0.8623 but performed 10% worse at detecting incorrectly placed tubes; the balanced dataset trained over 200 epochs reached 0.8223 and was better at identifying incorrectly positioned tubes.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (11).png',
          alt: 'ResNet-50 results by epoch count, with training code alongside: AUROC of 0.7923 at 5 epochs, 0.8623 at 10, 0.7785 at 15, 0.7471 at 20, and 0.7614 at 35 — making 10 epochs optimal before overfitting.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (12).png',
          alt: 'CNN regression: the final model predicts the optimal ETT–carina distance from X-ray images and recommends placement adjustments to reduce the risk of pneumothorax, pneumomediastinum or hypoxia. Trained on one epoch, it achieved a mean absolute error of 1.5.',
        },
        {
          src: '/stanford/Arav Parikh Stanford AIMI STEM Portfolio (13).png',
          alt: 'Results: the ResNet-50 and CNN regression models were chosen for their performance on AUROC and mean absolute error. The method was vetted by Stanford AIMI Center professors and is expected to make endotracheal intubation more personalised, efficient and cost-effective.',
        },
      ],
    },
    isFeatured: false,
  },
];

/** Featured projects for the homepage, capped at `limit` (default 3). */
export function getFeaturedProjects(limit = 3): Project[] {
  return projects.filter((project) => project.isFeatured).slice(0, limit);
}

/** Every role, in reverse-chronological order, for the Experience accordion. */
export function getAllProjects(): Project[] {
  return projects;
}
