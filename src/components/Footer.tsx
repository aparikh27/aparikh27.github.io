import { site } from '../data/site';
import { GitHubIcon, LinkedInIcon } from './Icons';

/**
 * Minimalist footer: the email address in full (it's the actual call to
 * action, so it stays readable text rather than an icon), with GitHub and
 * LinkedIn reduced to icons beside it.
 */
export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pb-16">
      <div className="flex flex-col gap-6 border-t border-navy-950/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${site.links.email}`}
          className="font-mono text-sm text-navy-900 underline-offset-4 transition-colors hover:text-accent-700 hover:underline"
        >
          {site.links.email}
        </a>

        <div className="flex items-center gap-5">
          {/* Icon-only links carry an accessible name via aria-label. */}
          <a
            href={site.links.github}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="GitHub profile (opens in a new tab)"
            className="text-slate-600 transition-colors hover:text-navy-950"
          >
            <GitHubIcon width="18" height="18" />
          </a>
          <a
            href={site.links.linkedin}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="LinkedIn profile (opens in a new tab)"
            className="text-slate-600 transition-colors hover:text-navy-950"
          >
            <LinkedInIcon width="18" height="18" />
          </a>

          <span aria-hidden="true" className="h-4 w-px bg-navy-950/15" />

          <p className="font-mono text-xs text-slate-500">
            © <span data-numeric>{new Date().getFullYear()}</span> {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
