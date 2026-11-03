import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Button,
  Checkbox,
  InlineNotification,
  ProgressBar,
  Search,
  Select,
  SelectItem,
  Tag,
  TextInput,
  Tile,
  Toggle
} from '@carbon/react';
import { SiteHeader, ShowcaseIntro, projectData } from './shared.jsx';
import '@carbon/react/css/styles.css';
import './styles.css';

function CarbonPage() {
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('All priorities');
  const [compact, setCompact] = useState(false);
  const [digest, setDigest] = useState(true);
  const [showNotice, setShowNotice] = useState(false);

  const filteredProjects = useMemo(() => projectData.filter((project) => {
    const matchesQuery = (project.name + ' ' + project.owner + ' ' + project.id).toLowerCase().includes(query.toLowerCase());
    const matchesPriority = priority === 'All priorities' || project.priority === priority;
    return matchesQuery && matchesPriority;
  }), [query, priority]);

  return (
    <>
      <SiteHeader active="carbon" />
      <main className="library-page carbon-page">
        <ShowcaseIntro
          number="01"
          name="Carbon Design System"
          description="A work-focused dashboard using IBM’s Carbon React components: crisp typography, purposeful color, square geometry, and a strong information hierarchy."
          docs="https://www.carbondesignsystem.com/"
          tone="carbon-intro"
        />

        <section className="carbon-app" aria-label="Carbon dashboard component showcase">
          <header className="carbon-app-head">
            <div className="carbon-app-brand">
              <span className="carbon-app-mark">C</span>
              <span><strong>Design operations</strong><small>Workspace / Projects</small></span>
            </div>
            <div className="carbon-app-actions">
              <Tag type="blue">Production workspace</Tag>
              <Button kind="primary" onClick={() => setShowNotice(true)}>Create project</Button>
            </div>
          </header>

          <div className="carbon-layout">
            <aside className="carbon-sidebar">
              <div className="carbon-sidebar-label">WORKSPACE</div>
              <a className="carbon-side-link active" href="#overview"><span className="carbon-side-icon">▦</span>Overview</a>
              <a className="carbon-side-link" href="#projects"><span className="carbon-side-icon">▤</span>Projects</a>
              <a className="carbon-side-link" href="#activity"><span className="carbon-side-icon">◷</span>Activity</a>
              <a className="carbon-side-link" href="#settings"><span className="carbon-side-icon">⚙</span>Settings</a>
              <div className="carbon-side-divider" />
              <div className="carbon-sidebar-label">SAVED VIEWS</div>
              <a className="carbon-side-link" href="#projects"><span className="carbon-side-icon">○</span>My projects</a>
              <a className="carbon-side-link" href="#projects"><span className="carbon-side-icon">◇</span>Needs review</a>
            </aside>

            <section className="carbon-main" id="overview">
              <div className="carbon-main-heading">
                <div><h2>Project overview</h2><p>Track delivery, ownership, and work in progress across your team.</p></div>
                <Button kind="tertiary" size="sm" onClick={() => setShowNotice(true)}>Export report</Button>
              </div>

              {showNotice && (
                <InlineNotification
                  kind="success"
                  title="Project draft created"
                  subtitle="Your new project is ready to configure."
                  lowContrast
                  hideCloseButton
                />
              )}

              <div className="carbon-metrics">
                <Tile className="carbon-metric">
                  <div className="carbon-metric-label">Active projects</div>
                  <div className="carbon-metric-value">24</div>
                  <div className="carbon-metric-foot">↑ 12.5% from last month</div>
                </Tile>
                <Tile className="carbon-metric">
                  <div className="carbon-metric-label">In review</div>
                  <div className="carbon-metric-value">08</div>
                  <div className="carbon-metric-foot">3 require your attention</div>
                </Tile>
                <Tile className="carbon-metric">
                  <div className="carbon-metric-label">Completed</div>
                  <div className="carbon-metric-value">16</div>
                  <div className="carbon-metric-foot">This quarter</div>
                </Tile>
                <Tile className="carbon-metric">
                  <div className="carbon-metric-label">On-time delivery</div>
                  <div className="carbon-metric-value">94%</div>
                  <div className="carbon-metric-foot">↑ 4.2 points this quarter</div>
                </Tile>
              </div>

              <section className="carbon-panel" id="projects">
                <div className="carbon-panel-heading">
                  <div><h3>Projects</h3><span className="carbon-project-sub">A live view of your team’s work</span></div>
                  <Tag type="cool-gray">{filteredProjects.length} results</Tag>
                </div>
                <div className="carbon-filters">
                  <Search
                    labelText="Search projects"
                    placeholder="Search by project, owner, or ID"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <Select
                    id="carbon-priority"
                    labelText="Priority"
                    size="md"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                  >
                    <SelectItem value="All priorities" text="All priorities" />
                    <SelectItem value="High" text="High" />
                    <SelectItem value="Medium" text="Medium" />
                    <SelectItem value="Low" text="Low" />
                  </Select>
                </div>
                <div className="carbon-project-list">
                  {filteredProjects.map((project) => (
                    <div className="carbon-project-row" key={project.id}>
                      <div>
                        <div className="carbon-project-title">{project.name}</div>
                        <div className="carbon-project-sub">{project.id} · Updated {project.updated}</div>
                      </div>
                      <div className="carbon-project-owner">{project.owner}</div>
                      <div>
                        <Tag type={project.status === 'Complete' ? 'green' : project.status === 'Review' ? 'purple' : 'blue'}>{project.status}</Tag>
                      </div>
                      <div>
                        <div className="carbon-project-progress">{project.progress}%</div>
                        <div className="carbon-progress"><span style={{ width: project.progress + '%' }} /></div>
                      </div>
                    </div>
                  ))}
                  {filteredProjects.length === 0 && <p className="carbon-project-sub">No projects match those filters.</p>}
                </div>
              </section>

              <div className="carbon-lower-grid" id="settings">
                <section className="carbon-lower-card">
                  <h3>Workspace preferences</h3>
                  <div className="carbon-setting-row">
                    <span>Compact project rows</span>
                    <Toggle id="carbon-compact" labelText="Compact mode" labelA="Off" labelB="On" toggled={compact} onToggle={setCompact} />
                  </div>
                  <div className="carbon-setting-row">
                    <span>Weekly email summary</span>
                    <Toggle id="carbon-digest" labelText="Email summary" labelA="Off" labelB="On" toggled={digest} onToggle={setDigest} />
                  </div>
                  <div className="carbon-setting-row">
                    <Checkbox id="carbon-mentions" labelText="Notify me when I am mentioned" defaultChecked />
                  </div>
                </section>
                <section className="carbon-lower-card" id="activity">
                  <h3>Quarterly delivery</h3>
                  <div className="carbon-project-sub">Overall milestone completion</div>
                  <div className="carbon-progress-large">
                    <ProgressBar label="Delivery progress" value={72} max={100} />
                  </div>
                  <div className="carbon-setting-row"><span>Completed milestones</span><strong>18 / 25</strong></div>
                  <div className="carbon-setting-row"><span>Next checkpoint</span><strong>Nov 12, 2026</strong></div>
                </section>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<CarbonPage />);
