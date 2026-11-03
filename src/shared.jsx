import React from 'react';

const base = import.meta.env.BASE_URL;

const libraryLinks = [
  { id: 'carbon', label: 'Carbon', href: base + 'carbon/' },
  { id: 'mui', label: 'Material UI', href: base + 'mui/' },
  { id: 'ant', label: 'Ant Design', href: base + 'ant/' }
];

export function SiteHeader({ active = 'home' }) {
  return (
    <header className="site-header">
      <a className="site-brand" href={base} aria-label="StyleLab home">
        <span className="site-brand-mark">S</span>
        <span className="site-brand-copy">
          <strong>STYLELAB</strong>
          <small>DESIGN SYSTEM STUDY</small>
        </span>
      </a>
      <nav className="site-nav" aria-label="Design system pages">
        <a className={active === 'home' ? 'active' : ''} href={base}>Overview</a>
        {libraryLinks.map((item) => (
          <a key={item.id} className={active === item.id ? 'active' : ''} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="repo-link" href="https://github.com/bradleysouciercomputer/style-testing-102" target="_blank" rel="noreferrer">
        View repository <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export function ShowcaseIntro({ number, name, description, docs, tone }) {
  return (
    <section className={'showcase-intro ' + (tone || '')}>
      <div className="showcase-intro-copy">
        <div className="eyebrow">{number} / COMPONENT LIBRARY</div>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
      <a className="docs-link" href={docs} target="_blank" rel="noreferrer">
        Official documentation <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

export const projectData = [
  { id: 'PRJ-2048', name: 'Customer portal refresh', owner: 'Avery Chen', initials: 'AC', status: 'In progress', priority: 'High', progress: 78, updated: 'Today, 9:42 AM' },
  { id: 'PRJ-2047', name: 'Analytics workspace', owner: 'Jordan Lee', initials: 'JL', status: 'Review', priority: 'Medium', progress: 92, updated: 'Today, 8:16 AM' },
  { id: 'PRJ-2046', name: 'Mobile onboarding', owner: 'Morgan Patel', initials: 'MP', status: 'In progress', priority: 'High', progress: 54, updated: 'Yesterday' },
  { id: 'PRJ-2045', name: 'Design token migration', owner: 'Taylor Kim', initials: 'TK', status: 'Complete', priority: 'Low', progress: 100, updated: 'Oct 30, 2026' }
];
