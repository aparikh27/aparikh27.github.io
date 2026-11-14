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

/** A demo recording shown inside the accordion panel. */
export interface ProjectVideo {
  /** Path under `public/`. Encoded at render time, same as slide paths. */
  src: string;
  /** MIME type for the `<source>` element. */
  type: string;
  /** Still frame shown before playback, so the player is never a black box. */
  poster: string;
  /** Accessible name for the player — it is the control's only label. */
  label: string;
  /**
   * The *displayed* box, which may be smaller than the file's intrinsic size
   * when the recording is letter- or pillar-boxed. The player crops to this
   * ratio with `object-fit: cover`, so bars never reach the page.
   */
  width: number;
  height: number;
  /** Visible one-line description under the player. */
  caption?: string;
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
  /** Optional demo recording, rendered as a player inside the accordion panel. */
  video?: ProjectVideo;
  /** Featured projects appear on the homepage, ordered by array position. */
  isFeatured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'warwick-investment-group',
    title: 'Warwick Investment Group',
    tagline:
      'Predictive modeling software to forecast oil well failures and reduce downtime before equipment breaks.',
    description:
      'I’m developing predictive modeling software to forecast when oil wells are likely to fail, allowing the company to identify potential failures early and take preventative action. The goal is to help optimize maintenance decisions, reduce costly equipment failures, and most importantly, minimize operational downtime and save money.',
    highlights: [
      { label: 'Use case', value: 'Oil well failure forecasting' },
      { label: 'Objective', value: 'Preventative maintenance' },
      { label: 'Impact', value: 'Reduced downtime + cost savings' },
    ],
    stack: ['Predictive Modeling', 'Time-Series Forecasting', 'Maintenance Optimization'],
    role: 'Predictive Modeling Engineer',
    time: 'October 2026 — Present',
    place: 'Warwick Investment Group',
    visionLink:
      'Forecasting failure earlier means maintenance can happen before a problem becomes expensive downtime.',
    isFeatured: true,
  },
  {
    slug: 'ucla-biomedical-engineering-society',
    title: 'UCLA Biomedical Engineering Society',
    tagline:
      'Academic chair and full-stack engineer building smart recovery and clinical monitoring systems for biomechanical health.',
    description:
      'I’m the Academic Chair and a full stack dev on a smart post-op knee brace project. I built the iOS BLE protocols that stream ECG, EMG, and IMU data into our App Store app, plus the Django REST API and MySQL backend on AWS that processes it all, including an integration with the Claude API to auto-generate patient recovery summaries. I’m also working on a Smart Forceps project, developing an instrumented obstetric forceps system integrated with AR glasses. We’re incorporating force and IMU sensors into the forceps to capture real-time measurements during delivery, which are used to generate a 3D model and pressure heat map of the baby’s head. These visualizations are overlaid onto the clinician’s AR glasses, allowing them to monitor force distribution and positioning in real time. We’re also developing predictive models to assess forceps technique, identify improper application, and determine whether excessive force is being applied, with the goal of improving procedural safety and clinical decision-making.',
    highlights: [
      { label: 'Sensor streams', value: 'ECG · EMG · IMU' },
      { label: 'Clinical tooling', value: 'AR-assisted forceps monitoring' },
      { label: 'Patient summaries', value: 'Claude-powered recovery notes' },
    ],
    stack: [
      'iOS · BLE',
      'Django REST Framework',
      'MySQL',
      'AWS',
      'Claude API',
      'React',
      'TypeScript',
      'AR',
      'Medical Devices',
      'Clinical Monitoring',
    ],
    role: 'Academic Chair & Full Stack Developer',
    time: 'October 2025 — Present',
    place: 'UCLA Biomedical Engineering Society',
    visionLink:
      'Smart monitoring tools should make care more precise, safer, and easier to act on in real time.',
    video: {
      src: '/bmes/Copy of mobileapp.mp4',
      type: 'video/mp4',
      poster: '/bmes/mobileapp-poster.jpg',
      label: 'Demo recording of the patient iOS app: the home screen shows patient information, an upcoming appointment, and the Bluetooth sensor connection state, with tabs for Home, Calendar, Data and Settings.',
      width: 496,
      height: 1080,
      caption: 'Patient iOS app — home, live sensor connection, and recovery data.',
    },
    isFeatured: true,
  },
  {
    slug: 'chromatin-state-prediction-ernst-lab',
    title: 'The Ernst Lab, UCLA',
    tagline:
      'Computational biology research fine-tuning genomic foundation models to predict chromatin states from DNA sequence at scale.',
    description:
      'Computational biology research fine-tuning genomic foundation models (DNABERT-2, Enformer) to predict chromatin states directly from DNA sequence. A lot of the actual engineering work here is in handling scale: distributed training with DeepSpeed, mixed precision, and chunked HDF5 pipelines so we can process gigabyte-scale genomic datasets without running into memory walls.',
    highlights: [
      { label: 'Models', value: 'DNABERT-2 · Enformer' },
      { label: 'Training scale', value: 'DeepSpeed + mixed precision' },
      { label: 'Data pipeline', value: 'Chunked HDF5 at GB-scale' },
    ],
    stack: [
      'DNABERT-2',
      'Enformer',
      'DeepSpeed',
      'HDF5',
      'Python',
      'Mixed Precision',
      'Distributed Training',
      'Computational Biology',
    ],
    role: 'Research Engineer',
    time: 'October 2025 — Present',
    place: 'The Ernst Lab, UCLA',
    visionLink:
      'Better genomic models at scale help uncover the regulatory logic hidden in DNA without running into computational bottlenecks.',
    isFeatured: true,
  },
  {
    slug: 'cardiac-arrhythmia-detection',
    title: 'Software Developer, Crely Health',
    tagline:
      'Built ML pipelines to classify, detect, and predict arrhythmias from real-time heart sensor data for early cardiac risk detection.',
    description:
      'Built ML pipelines to classify, detect, and predict arrhythmias from real-time heart sensor data. Developed sliding-window feature extraction, unsupervised anomaly detection models (Isolation Forest, One-Class SVM), and low-latency XGBoost models designed to run on-device and flag cardiac risk before it becomes an emergency.',
    highlights: [
      { label: 'Anomaly detection', value: 'Isolation Forest · One-Class SVM' },
      { label: 'Forecasting', value: 'On-device XGBoost' },
      { label: 'Signal processing', value: 'Sliding-window feature extraction' },
    ],
    stack: ['Machine Learning', 'Time-Series Analysis', 'Python', 'XGBoost'],
    role: 'Software Developer',
    time: 'January 2026 — September 2026',
    place: 'Crely Health',
    visionLink:
      'Real-time cardiac monitoring should surface risk before it becomes an emergency rather than after the fact.',
    isFeatured: false,
  },
  {
    slug: 'multi-agent-robotic-assistant',
    title: 'BAI - Behavioral Autonomy Infrastructure',
    tagline:
      'Built a multi-agent robotics framework combining an event-driven agent architecture with a C++20 embedded runtime in Webots.',
    description:
      'Built a multi-agent robotics framework from the ground up. It pairs an event-driven agent architecture (Vision, Speech, Planning, Execution, Memory, all coordinated through a central message bus) with a C++20 embedded runtime running in Webots. The Python side handles high-level coordination through an async FastAPI backend and a React dashboard for telemetry, while the C++ layer is a lightweight, thread-safe runtime with a priority-based scheduler, lock-free queues, and custom memory pools to keep things running clean on constrained hardware.',
    highlights: [
      { label: 'Agent architecture', value: 'Vision · Speech · Planning · Execution · Memory' },
      { label: 'Runtime', value: 'C++20 embedded' },
      { label: 'Stack', value: 'FastAPI · React · Webots' },
    ],
    stack: ['C++20', 'Multi-Agent Systems', 'Robotics', 'Embedded Systems', 'FastAPI'],
    role: 'Founder & Lead Engineer',
    time: 'June 2026 — September 2026',
    place: 'BAI - Behavioral Autonomy Infrastructure',
    visionLink:
      'A robot that can perceive, plan, and act reliably on constrained hardware is one that can serve real-world environments without constant cloud dependency.',
    isFeatured: false,
  },
  {
    slug: 'radiation-dosimetry-pipeline',
    title: 'Data Science Research Intern, The Roncali Lab',
    tagline:
      'Built an asynchronous Python pipeline to process gigabyte-scale 3D volumetric imaging datasets for organ-level radiation dosimetry.',
    description:
      'Built an asynchronous Python pipeline to process gigabyte-scale 3D volumetric imaging datasets for organ-level radiation dosimetry. Engineered DICOM-to-MHD converters that serialized medical imaging series into contiguous NumPy arrays for sub-second voxel indexing, and interfaced Python processing modules with C++ Monte Carlo simulation frameworks (GATE) to map energy fields across 3D mesh geometries. Also developed custom 3D Slicer modules for dose distribution analysis.',
    highlights: [
      { label: 'Data scale', value: 'Gigabyte-scale 3D imaging' },
      { label: 'Simulation', value: 'GATE Monte Carlo (C++)' },
      { label: 'Indexing', value: 'Sub-second voxel access' },
    ],
    stack: ['Spatial Data Analytics', 'Statistical Visualization', 'Data Engineering'],
    role: 'Data Science Research Intern',
    time: 'June 2024 — January 2025',
    place: 'The Roncali Lab (UC Davis)',
    visionLink:
      'More precise dosimetry lets treatment target the tumor instead of the surrounding healthy tissue.',
    slideshow: {
      label: 'Organ-Level Dosimetry — UC Davis Roncali Lab project deck, 15 slides',
      slides: [
        {
          src: '/ucdavis/Arav Parikh UC Davis Roncali Lab STEM Portfolio.png',
          alt: 'Title slide — UC Davis Roncali Lab portfolio overview.',
        },
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
    slug: 'medical-imaging-verification-stanford',
    title: 'AI Research Intern, Stanford Center for AI in Medicine and Imaging',
    tagline:
      'Helped build an end-to-end multi-modal ML pipeline that verified spatial alignment and object placement across 10,000+ medical images.',
    description:
      'Helped build an end-to-end multi-modal ML pipeline that verified spatial alignment and object placement across 10,000+ medical images. Fine-tuned a Hugging Face NLP model to extract spatial metrics from unstructured clinical reports for automated dataset labeling, and benchmarked CNN, YOLOv8, and ResNet50 architectures, ultimately selecting a production ResNet50 model that hit an AUROC of 0.8623.',
    highlights: [
      { label: 'Images processed', value: '10,000+' },
      { label: 'Production model', value: 'ResNet50' },
      { label: 'AUROC', value: '0.8623' },
    ],
    stack: ['Computer Vision', 'Natural Language Processing', 'Image Classification'],
    role: 'AI Research Intern',
    time: 'June 2023',
    place: 'Stanford Center for AI in Medicine and Imaging',
    visionLink:
      'Automating verification at this scale turns diagnostic bottlenecks into a process that can keep up with real patient demand.',
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
  {
    slug: 'solar-wildlife-tracking',
    title: 'Robotics Intern, Yolo Basin Foundation',
    tagline:
      'Designed and prototyped a ruggedized, solar-powered IoT sensor platform for wildlife tracking in remote habitats.',
    description:
      'Designed and prototyped a ruggedized, solar-powered IoT sensor platform for wildlife tracking in remote habitats. Deployed an edge computer vision pipeline on Raspberry Pi hardware for real-time object detection and multi-target tracking directly on-device, and built low-power wireless communication protocols to stream live telemetry and video to mobile client nodes for conservation research.',
    highlights: [
      { label: 'Compute', value: 'Raspberry Pi + edge CV' },
      { label: 'Power', value: 'Solar-powered IoT' },
      { label: 'Tracking', value: 'Real-time, multi-target' },
    ],
    stack: ['IoT', 'Telemetry', 'Microcontrollers'],
    role: 'Robotics Intern',
    time: 'August 2024 — June 2025',
    place: 'Yolo Basin Foundation',
    visionLink:
      'Remote conservation work needs tools that function with limited power and bandwidth, not assumptions of infrastructure.',
    isFeatured: false,
  },
  {
    slug: 'emc2-math-enrichment',
    title: 'Co-Founder, E=MC² Math Enrichment Program',
    tagline:
      'Co-founded an after-school math enrichment initiative that grew to serve 400+ district students.',
    description:
      'Co-founded an after-school math enrichment initiative that grew to serve 400+ district students. Designed diagnostic testing frameworks for personalized curriculum across visual, auditory, and project-based learning modules. Managed program operations end to end, including recruiting instructors, translating materials for international transfer students, building the org’s website, and running guest lecturer events. This is honestly where I first learned how to manage a team and ship something real, tracked a 70%+ average performance gain across students on diagnostic evaluations.',
    highlights: [
      { label: 'Students served', value: '400+' },
      { label: 'Performance gain', value: '70%+ average' },
    ],
    stack: ['Personalized Learning', 'Team Management', 'Project Management'],
    role: 'Co-Founder',
    time: 'August 2022 — August 2025',
    place: 'E=MC² Math Enrichment Program',
    visionLink:
      'Access to strong math instruction should not depend on a student’s background, and this program was built around that idea.',
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
