import type { Project, ProjectHighlight } from '../data/projects';
import type { StyleWithVars } from '../types';
import { Chip, ChipList } from './Chip';
import { ExternalLinkIcon, GitHubIcon } from './Icons';

export type ProjectCardVariant = 'concise' | 'expanded';

export interface ProjectCardProps {
  project: Project;
  /** `concise` for the homepage grid, `expanded` for the `/projects` archive. */
  variant?: ProjectCardVariant;
  /**
   * Heading level for the project title. The homepage nests cards under an
   * `<h2>` section heading, so cards there must be `h3` to keep the outline
   * valid; the archive page uses the same pattern.
   */
  headingLevel?: 2 | 3;
  className?: string;
  /** Escape hatch for per-card CSS variables — chiefly `--reveal-delay`. */
  style?: StyleWithVars;
}

/** A highlight renders as a link only when it has evidence to point at. */
function Highlight({ highlight }: { highlight: ProjectHighlight }) {
  const content = (
    <>
      <span className="font-medium text-accent-700" data-numeric>
        {highlight.value}
      </span>
      <span className="text-slate-500">{highlight.label}</span>
    </>
  );

  if (!highlight.href) {
    return <Chip variant="solid">{content}</Chip>;
  }

  return (
    <a
      href={highlight.href}
      rel="noopener noreferrer"
      target="_blank"
      className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-700"
    >
      <Chip variant="solid" className="transition-colors hover:bg-accent-500/15">
        {content}
        <ExternalLinkIcon width="10" height="10" />
      </Chip>
    </a>
  );
}

const LINK_CLASS =
  'inline-flex items-center gap-1.5 font-mono text-xs text-slate-600 underline-offset-4 transition-colors hover:text-accent-700 hover:underline';

export function ProjectCard({
  project,
  variant = 'concise',
  headingLevel = 3,
  className = '',
  style,
}: ProjectCardProps) {
  const isExpanded = variant === 'expanded';
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  const titleId = `project-${project.slug}-title`;

  return (
    /*
     * ANIMATION HOOKS — deliberately split across two elements.
     *
     * The wrapper owns the scroll reveal; the <article> owns the hover
     * lift. They cannot share an element: both animate `transform`, so a
     * card hovered mid-reveal would have the two effects overwrite each
     * other, and their `transition` shorthands would clobber one another
     * outright. Nesting gives each its own transform context.
     *
     *  - wrapper `.reveal`  → fade-up on scroll (observer in BaseLayout);
     *                         stagger via --reveal-delay from the page.
     *  - article `.card-interactive` → hover/focus-within lift + border.
     *  - article `.group`   → lets the nested image zoom on card hover.
     */
    <div className={`reveal h-full ${className}`} style={style}>
      <article
        id={project.slug}
        aria-labelledby={titleId}
        className="group card-interactive flex h-full flex-col rounded-xl border border-navy-950/10 bg-[--color-white] p-7 sm:p-8"
      >
        {isExpanded && project.image && (
          // `overflow-hidden` crops the zoom to the frame; without it the
          // scaled image bleeds past the card's rounded corners.
          // `data-parallax` sits here rather than on the card: the reveal
          // wrapper and the hover lift already own transforms on their own
          // nodes, and the image frame is the one free transform context.
          <div
            data-parallax="0.05"
            className="mb-7 overflow-hidden rounded-lg border border-navy-950/10 bg-cream-100"
          >
            <img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              width={1200}
              height={630}
              className="card-media aspect-[1200/630] w-full object-cover"
            />
          </div>
        )}

        <header>
          {/* Metadata leads in mono — it reads as a filing label above the title. */}
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.6875rem] text-slate-500">
            <time>{project.time}</time>
            <span aria-hidden="true">/</span>
            <span className="text-slate-600">{project.role}</span>
            <span aria-hidden="true">/</span>
            <span>{project.place}</span>
          </p>

          <Heading id={titleId} className="mt-3 text-xl text-navy-950">
            {project.title}
          </Heading>

          <p className="mt-2.5 leading-relaxed text-pretty text-slate-600">{project.tagline}</p>
        </header>

        {isExpanded && (
          <p className="mt-5 text-sm leading-relaxed text-pretty text-slate-600">
            {project.description}
          </p>
        )}

        {project.highlights.length > 0 && (
          <ul
            aria-label={`Key results for ${project.title}`}
            className="mt-6 flex flex-wrap gap-1.5"
          >
            {(isExpanded ? project.highlights : project.highlights.slice(0, 2)).map((highlight) => (
              <li key={highlight.label}>
                <Highlight highlight={highlight} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2.5">
          <ChipList items={project.stack} label={`Tech stack for ${project.title}`} />
        </div>

        {isExpanded && (
          <p className="mt-6 border-l-2 border-accent-500/35 pl-4 text-sm leading-relaxed text-pretty text-slate-600 italic">
            {project.visionLink}
          </p>
        )}

        {/* `mt-auto` pins the link row to the bottom so cards in a grid align. */}
        {(project.github || project.demo) && (
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-navy-950/10 pt-5">
            {project.github && (
              <a
                href={project.github}
                rel="noopener noreferrer"
                target="_blank"
                className={LINK_CLASS}
              >
                <GitHubIcon width="14" height="14" />
                Code
                <span className="sr-only">for {project.title} on GitHub</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                rel="noopener noreferrer"
                target="_blank"
                className={LINK_CLASS}
              >
                <ExternalLinkIcon width="14" height="14" />
                Live demo
                <span className="sr-only">of {project.title}</span>
              </a>
            )}
          </div>
        )}
      </article>
    </div>
  );
}

export default ProjectCard;
