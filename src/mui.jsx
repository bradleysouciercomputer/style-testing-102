import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CssBaseline,
  Divider,
  FormControlLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  Switch,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SiteHeader, ShowcaseIntro, projectData } from './shared.jsx';
import './styles.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2468c9' },
    secondary: { main: '#6b72c8' },
    background: { default: '#f4f6fb', paper: '#ffffff' },
    success: { main: '#16845b' }
  },
  shape: { borderRadius: 13 },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: { textTransform: 'none', fontWeight: 700 }
  }
});

function MuiPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [tab, setTab] = useState(0);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [mentions, setMentions] = useState(false);

  const filteredProjects = useMemo(() => projectData.filter((project) => {
    const matchesQuery = (project.name + ' ' + project.owner + ' ' + project.id).toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === 'All statuses' || project.status === status;
    return matchesQuery && matchesStatus;
  }), [query, status]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SiteHeader active="mui" />
      <main className="library-page mui-page">
        <ShowcaseIntro
          number="02"
          name="Material UI"
          description="A Material Design workspace built with MUI’s official React components, using familiar app-bar patterns, rounded surfaces, chips, and clear elevation."
          docs="https://mui.com/material-ui/"
        />

        <section className="mui-app" aria-label="Material UI dashboard component showcase">
          <AppBar position="static" color="transparent" elevation={0} className="mui-appbar">
            <Toolbar>
              <Avatar className="mui-brand-avatar">M</Avatar>
              <Box className="mui-heading-copy">
                <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>Studio workspace</Typography>
                <Typography variant="subtitle2">PROJECT MANAGEMENT</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Chip label="Team plan" size="small" color="primary" variant="outlined" sx={{ mr: 1.5 }} />
              <Button variant="contained" disableElevation onClick={() => setTab(1)}>Create project</Button>
            </Toolbar>
          </AppBar>

          <Box className="mui-app-content">
            <Box className="mui-main-heading">
              <Box>
                <Typography variant="h5" fontWeight={700} letterSpacing="-0.04em">Project overview</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 12 }}>A snapshot of work across your organization.</Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" color="inherit" size="small">Share</Button>
                <Button variant="contained" size="small" disableElevation>New report</Button>
              </Stack>
            </Box>

            <div className="mui-metrics">
              <Card className="mui-metric-card" variant="outlined">
                <CardContent>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>Active projects</Typography>
                  <div className="mui-metric-number"><strong>24</strong><Chip color="success" size="small" label="+12.5%" /></div>
                  <Typography variant="caption" color="text.secondary">Compared with last month</Typography>
                </CardContent>
              </Card>
              <Card className="mui-metric-card" variant="outlined">
                <CardContent>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>Awaiting review</Typography>
                  <div className="mui-metric-number"><strong>08</strong><Chip color="warning" size="small" label="3 due soon" /></div>
                  <Typography variant="caption" color="text.secondary">Across all teams</Typography>
                </CardContent>
              </Card>
              <Card className="mui-metric-card" variant="outlined">
                <CardContent>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>Completed</Typography>
                  <div className="mui-metric-number"><strong>16</strong><Chip color="primary" size="small" label="This quarter" /></div>
                  <Typography variant="caption" color="text.secondary">Milestones delivered</Typography>
                </CardContent>
              </Card>
              <Card className="mui-metric-card" variant="outlined">
                <CardContent>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>On-time delivery</Typography>
                  <div className="mui-metric-number"><strong>94%</strong><Chip color="success" size="small" label="+4.2 pts" /></div>
                  <Typography variant="caption" color="text.secondary">Quarter to date</Typography>
                </CardContent>
              </Card>
            </div>

            <div className="mui-main-grid">
              <Paper className="mui-panel" variant="outlined">
                <div className="mui-panel-heading">
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>Projects</Typography>
                    <Typography variant="caption" color="text.secondary">Manage work and project status</Typography>
                  </Box>
                  <Chip label={filteredProjects.length + ' projects'} size="small" variant="outlined" />
                </div>
                <Box sx={{ px: 2.25, pb: 1.5, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 170px', gap: 1.25 }}>
                  <TextField size="small" label="Search projects" placeholder="Name, owner, or ID" value={query} onChange={(event) => setQuery(event.target.value)} />
                  <TextField select size="small" label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>
                    <MenuItem value="All statuses">All statuses</MenuItem>
                    <MenuItem value="In progress">In progress</MenuItem>
                    <MenuItem value="Review">Review</MenuItem>
                    <MenuItem value="Complete">Complete</MenuItem>
                  </TextField>
                </Box>
                <TableContainer>
                  <Table size="small" className="mui-project-table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Project</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Progress</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow hover key={project.id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight={700} fontSize={11}>{project.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{project.id}</Typography>
                          </TableCell>
                          <TableCell>
                            <div className="mui-owner">
                              <Avatar>{project.initials}</Avatar>
                              <span>{project.owner}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={project.status}
                              color={project.status === 'Complete' ? 'success' : project.status === 'Review' ? 'secondary' : 'primary'}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="caption" fontWeight={700}>{project.progress}%</Typography>
                            <LinearProgress variant="determinate" value={project.progress} sx={{ mt: 0.6, width: 75, ml: 'auto', height: 5, borderRadius: 8 }} />
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredProjects.length === 0 && <TableRow><TableCell colSpan={4}>No matching projects.</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
                <Box sx={{ px: 2.25, py: 1.25, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Showing {filteredProjects.length} of 24 projects</Typography>
                  <Button size="small">View all projects</Button>
                </Box>
              </Paper>

              <Paper className="mui-panel mui-side-panel" variant="outlined">
                <Typography variant="subtitle1" fontWeight={700}>Workspace settings</Typography>
                <Typography variant="caption" color="text.secondary">Personalize your updates</Typography>
                <div className="mui-bottom-tabs">
                  <Tabs value={tab} onChange={(event, value) => setTab(value)} variant="fullWidth" aria-label="Workspace settings tabs">
                    <Tab label="Preferences" />
                    <Tab label="Updates" />
                  </Tabs>
                </div>
                {tab === 0 ? (
                  <div className="mui-tab-panel">
                    <div className="mui-side-control">
                      <div className="mui-side-control-copy"><strong>Weekly digest</strong><span>A summary every Monday</span></div>
                      <Switch size="small" checked={weeklyDigest} onChange={(event) => setWeeklyDigest(event.target.checked)} />
                    </div>
                    <div className="mui-side-control">
                      <div className="mui-side-control-copy"><strong>Project mentions</strong><span>Notify me when tagged</span></div>
                      <Switch size="small" checked={mentions} onChange={(event) => setMentions(event.target.checked)} />
                    </div>
                    <FormControlLabel control={<Checkbox size="small" defaultChecked />} label={<Typography variant="caption">Keep me signed in</Typography>} />
                  </div>
                ) : (
                  <div className="mui-tab-panel">
                    <Typography variant="body2" fontWeight={700} color="text.primary">Quarterly delivery</Typography>
                    <Typography variant="caption" color="text.secondary">18 of 25 milestones complete</Typography>
                    <LinearProgress variant="determinate" value={72} sx={{ mt: 1.5, mb: 1, height: 7, borderRadius: 8 }} />
                    <Typography variant="caption" color="text.secondary">Next checkpoint: Nov 12, 2026</Typography>
                    <Alert severity="info" variant="outlined" sx={{ mt: 2, fontSize: 11 }}>Your team is on track this quarter.</Alert>
                  </div>
                )}
              </Paper>
            </div>
          </Box>
        </section>
      </main>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(<MuiPage />);
