import type { ReactNode } from 'react';
import type { StyleWithVars } from '../types';
import { site } from '../data/site';
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export interface HeroProps {
  name?: string;
  headline?: string;
  mission?: string;
  links?: {
    github: string;
    linkedin: string;
    email: string;
    resume: string;
  };
  /**
   * Headshot slot. Pass an element (e.g. an Astro-optimized `<Image />`) to
   * override the plain `<img>` default — this keeps the component usable with
   * `astro:assets` without importing it into the React tree.
   */
  headshot?: ReactNode;
  headshotSrc?: string;
  headshotAlt?: string;
}

export function Hero({
  name = site.name,
  headline = site.headline,
  mission = site.mission,
  links = site.links,
  headshot,
  headshotSrc = site.headshot.src,
  headshotAlt = site.headshot.alt,
}: HeroProps) {
  return (
    /*
     * ANIMATION HOOKS ON THIS SECTION
     *  - `hero-recede`: scroll-driven fade + scale as the hero exits the
     *    viewport (CSS `animation-timeline: view()`, compositor-driven).
     *  - `.rise` + `--rise-delay` on children: staggered load-in entry.
     *
     * The stagger ramp is deliberately uneven — 0 / 80 / 160 / 260ms. The
     * eye reads the headline first, so the elements after it are given a
     * slightly wider gap; a perfectly linear ramp reads mechanical.
     */
    <section
      data-hero
      aria-labelledby="hero-heading"
      className="hero-recede mx-auto max-w-5xl px-6 pt-24 pb-24 sm:pt-32 sm:pb-32"
    >
      <div className="flex flex-col-reverse items-start gap-12 md:flex-row md:items-center md:gap-16">
        {/*
          `data-parallax` is read by the canvas engine. Depth values are
          intentionally tiny — the text column drifts less than the headshot,
          which is what produces the sense of layers without ever moving type
          far enough to hurt readability. Ignored entirely when the WebGL
          gate fails.
        */}
        <div data-parallax="0.04" className="min-w-0 flex-1">
          <p className="eyebrow rise">{site.jobTitle}</p>

          {/*
            The name is set small and mono — it's a label, not the message.
            The headline carries the visual weight, which is what a visitor
            actually needs to read first.
          */}
          <h1 id="hero-heading" className="sr-only">
            {name}
          </h1>
          <p
            aria-hidden="true"
            className="rise mt-4 font-mono text-sm text-slate-400"
            style={{ '--rise-delay': '80ms' } as StyleWithVars}
          >
            {name}
          </p>

          <p
            className="rise mt-5 max-w-2xl text-3xl leading-[1.25] tracking-tightest text-balance text-cream-50 sm:text-[2.6rem]"
            style={{ '--rise-delay': '160ms' } as StyleWithVars}
          >
            {headline}
          </p>

          <nav
            aria-label="Contact and profile links"
            className="rise mt-10 flex flex-wrap gap-3"
            style={{ '--rise-delay': '260ms' } as StyleWithVars}
          >
            <a href={links.resume} download className="btn btn-solid">
              <DownloadIcon />
              Resume
              <span className="sr-only">(PDF, downloads)</span>
            </a>

            <a
              href={links.github}
              rel="noopener noreferrer"
              target="_blank"
              className="btn btn-ghost"
            >
              <GitHubIcon />
              GitHub
            </a>

            <a
              href={links.linkedin}
              rel="noopener noreferrer"
              target="_blank"
              className="btn btn-ghost"
            >
              <LinkedInIcon />
              LinkedIn
            </a>

            <a href={`mailto:${links.email}`} className="btn btn-ghost">
              <MailIcon />
              Email
            </a>
          </nav>
        </div>

        {/*
          Headshot — fixed dimensions so it reserves space and never shifts
          layout. It rises alongside the eyebrow rather than last: on desktop
          it sits to the right of the text, and delaying it there would read
          as a straggler rather than as part of the same gesture.
        */}
        <div
          className="rise shrink-0"
          style={{ '--rise-delay': '120ms' } as StyleWithVars}
        >
          {/*
            Parallax lives on an inner wrapper, not on the `.rise` element
            itself: `.rise` animates `transform` on load, and GSAP writing
            transform to the same node would have the two overwrite each
            other. Nesting gives each its own transform.
          */}
          <div data-parallax="0.09">
            {headshot ?? (
              <img
                src={headshotSrc}
                alt={headshotAlt}
                width={224}
                height={224}
                loading="eager"
                decoding="async"
                className="size-40 rounded-2xl border border-cream-50/10 bg-navy-900 object-cover sm:size-56"
              />
            )}
          </div>
        </div>
      </div>

      {/*
        Mission — its own labelled region so it can be linked and skipped to.
        Uses `.reveal` (scroll-triggered) rather than `.rise` (load): it sits
        below the fold on most viewports, and animating it on load means the
        animation is over before anyone scrolls down to see it.
      */}
      <div
        role="region"
        aria-labelledby="mission-heading"
        className="reveal mt-24 border-t border-cream-50/10 pt-10"
      >
        <h2 id="mission-heading" className="eyebrow">
          Vision
        </h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-pretty text-slate-400 sm:text-lg">
          {mission}
        </p>
      </div>
    </section>
  );
}

export default Hero;
