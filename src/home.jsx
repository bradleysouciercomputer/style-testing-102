import React from 'react';
import { createRoot } from 'react-dom/client';
import { SiteHeader } from './shared.jsx';
import './styles.css';

const base = import.meta.env.BASE_URL;

const systems = [
  {
    id: 'carbon',
    number: '01',
    name: 'Carbon',
    maker: 'IBM',
    subtitle: 'Enterprise clarity',
    description: 'A precise, functional system with strong hierarchy, disciplined spacing, and a distinctive industrial feel.',
    color: 'carbon-card',
    mark: 'C',
    href: base + 'carbon/',
    tags: ['IBM Plex Sans', 'Structured', 'Dense data']
  },
  {
    id: 'mui',
    number: '02',
    name: 'Material UI',
    maker: 'MUI',
    subtitle: 'Material expression',
    description: 'A flexible React implementation of Material Design, with familiar surfaces, expressive color, and adaptable components.',
    color: 'mui-card',
    mark: 'M',
    href: base + 'mui/',
    tags: ['Roboto', 'Elevation', 'Flexible']
  },
  {
    id: 'ant',
    number: '03',
    name: 'Ant Design',
    maker: 'Ant Group',
    subtitle: 'Productivity at scale',
    description: 'A cohesive enterprise toolkit focused on efficient workflows, clear controls, and information-rich interfaces.',
    color: 'ant-card',
    mark: 'A',
    href: base + 'ant/',
    tags: ['Inter', 'Workflow', 'Enterprise']
  }
];

function HomePage() {
  return (
    <>
      <SiteHeader active="home" />
      <main className="home-page">
        <section className="home-hero">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-dot" /> INTERACTIVE DESIGN SYSTEM COMPARISON</div>
            <h1>One interface.<br /><em>Three design languages.</em></h1>
            <p>Explore the same product workspace built with three of the web’s leading React component libraries. Compare the details, feel the differences, and decide what fits.</p>
            <div className="hero-actions">
              <a className="hero-button" href={base + 'carbon/'}>Explore the showcases <span aria-hidden="true">→</span></a>
              <span className="hero-caption">3 libraries <b>·</b> 3 pages <b>·</b> 1 shared scenario</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-window">
              <div className="window-top"><i /><i /><i /><span>workspace / overview</span></div>
              <div className="window-layout">
                <div className="window-rail"><b /><b /><b /><b /></div>
                <div className="window-main">
                  <div className="window-heading" />
                  <div className="window-metrics"><i /><i /><i /></div>
                  <div className="window-lines"><i /><i /><i /><i /></div>
                  <div className="window-bars"><i /><i /><i /></div>
                </div>
              </div>
            </div>
            <div className="floating-label label-top">COMPONENTS <b>↗</b></div>
            <div className="floating-label label-bottom"><span /> BUILT TO COMPARE</div>
          </div>
        </section>

        <section className="systems-section">
          <div className="section-heading">
            <div>
              <div className="section-kicker">CHOOSE A DESIGN SYSTEM</div>
              <h2>Three approaches to the same task.</h2>
            </div>
            <p>Each page contains a project dashboard, controls, status indicators, and data views styled with its official library.</p>
          </div>
          <div className="system-grid">
            {systems.map((system) => (
              <article className={'system-card ' + system.color} key={system.id}>
                <div className="system-card-top">
                  <span className="system-number">{system.number}</span>
                  <span className="system-mark">{system.mark}</span>
                </div>
                <div className="system-card-copy">
                  <div className="system-maker">{system.maker} <span>·</span> {system.subtitle}</div>
                  <h3>{system.name}</h3>
                  <p>{system.description}</p>
                  <div className="system-tags">
                    {system.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <a className="system-card-link" href={system.href}>
                  Open {system.name} page <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <footer className="home-footer">
          <span>STYLELAB <b>—</b> COMPONENT LIBRARY COMPARISON</span>
          <span>Built for exploration, not a production application.</span>
        </footer>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<HomePage />);
