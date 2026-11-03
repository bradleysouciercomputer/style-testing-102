import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Input,
  Layout,
  Menu,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Switch,
  Table,
  Tabs,
  Tag,
  Typography
} from 'antd';
import { SiteHeader, ShowcaseIntro, projectData } from './shared.jsx';
import 'antd/dist/reset.css';
import './styles.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function AntPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [digest, setDigest] = useState(true);
  const [mentions, setMentions] = useState(false);
  const [activeTab, setActiveTab] = useState('preferences');

  const filteredProjects = useMemo(() => projectData.filter((project) => {
    const matchesQuery = (project.name + ' ' + project.owner + ' ' + project.id).toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === 'All statuses' || project.status === status;
    return matchesQuery && matchesStatus;
  }), [query, status]);

  const columns = [
    {
      title: 'PROJECT',
      dataIndex: 'name',
      key: 'name',
      render: (_, project) => (
        <div className="ant-project-name">
          {project.name}
          <span className="ant-project-id">{project.id}</span>
        </div>
      )
    },
    {
      title: 'OWNER',
      dataIndex: 'owner',
      key: 'owner',
      render: (_, project) => (
        <Space size={8}>
          <Avatar size={26} style={{ backgroundColor: '#e8f1ff', color: '#245fbd', fontSize: 10 }}>{project.initials}</Avatar>
          <Text style={{ fontSize: 11 }}>{project.owner}</Text>
        </Space>
      )
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (value) => <Tag color={value === 'Complete' ? 'success' : value === 'Review' ? 'purple' : 'processing'}>{value}</Tag>
    },
    {
      title: 'PROGRESS',
      dataIndex: 'progress',
      key: 'progress',
      width: 120,
      render: (value) => (
        <div>
          <Text strong style={{ fontSize: 10 }}>{value}%</Text>
          <Progress percent={value} size="small" showInfo={false} />
        </div>
      )
    }
  ];

  const menuItems = [
    { key: 'overview', label: 'Overview' },
    { key: 'projects', label: 'Projects' },
    { key: 'activity', label: 'Activity' },
    { key: 'settings', label: 'Settings' }
  ];

  const moreItems = [
    { key: 'export', label: 'Export report' },
    { key: 'duplicate', label: 'Duplicate workspace' },
    { key: 'archive', label: 'Archive workspace' }
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 9,
          colorBgLayout: '#f5f7fa',
          fontFamily: 'Inter, Arial, sans-serif',
          fontSize: 12
        }
      }}
    >
      <SiteHeader active="ant" />
      <main className="library-page ant-page">
        <ShowcaseIntro
          number="03"
          name="Ant Design"
          description="An enterprise product workspace built with Ant Design’s official React components, emphasizing efficient navigation, compact controls, and information-dense layouts."
          docs="https://ant.design/"
        />

        <section className="ant-app" aria-label="Ant Design dashboard component showcase">
          <Layout>
            <Sider width={218} theme="light" breakpoint="lg" collapsedWidth={0}>
              <div className="ant-side-brand">
                <span className="ant-side-logo">A</span>
                <span><strong>Atlas workspace</strong><small>PROJECT CENTER</small></span>
              </div>
              <div className="ant-side-caption">WORKSPACE</div>
              <Menu className="ant-side-menu" mode="inline" selectedKeys={['overview']} items={menuItems} />
              <div className="ant-side-caption" style={{ marginTop: 20 }}>COLLECTIONS</div>
              <Menu
                className="ant-side-menu"
                mode="inline"
                selectable={false}
                items={[
                  { key: 'mine', label: 'My projects' },
                  { key: 'review', label: 'Needs review' },
                  { key: 'starred', label: 'Starred' }
                ]}
              />
              <div style={{ padding: '20px 17px' }}>
                <Card size="small" bordered style={{ background: '#f8fbff' }}>
                  <Text strong style={{ fontSize: 11 }}>Team capacity</Text>
                  <Progress percent={68} size="small" style={{ marginTop: 9 }} />
                  <Text type="secondary" style={{ fontSize: 9 }}>68% of planned capacity</Text>
                </Card>
              </div>
            </Sider>

            <Layout>
              <Header className="ant-main-header">
                <Space size={8}>
                  <Text type="secondary">Workspace</Text>
                  <Text type="secondary">/</Text>
                  <Text strong>Overview</Text>
                </Space>
                <Space size={12}>
                  <Badge dot color="#52c41a"><Avatar size={30} style={{ background: '#e8f1ff', color: '#2768c8' }}>JD</Avatar></Badge>
                  <Text strong style={{ fontSize: 11 }}>Jamie Davis</Text>
                  <Dropdown menu={{ items: moreItems }} trigger={['click']}>
                    <Button type="text">•••</Button>
                  </Dropdown>
                </Space>
              </Header>

              <Content className="ant-main-content">
                <div className="ant-main-title">
                  <div>
                    <Title level={4} style={{ margin: 0, letterSpacing: '-.04em' }}>Project overview</Title>
                    <Text type="secondary" style={{ fontSize: 11 }}>Monitor your team’s delivery and upcoming milestones.</Text>
                  </div>
                  <Space wrap>
                    <DatePicker placeholder="Select date" />
                    <Button type="primary">Create project</Button>
                  </Space>
                </div>

                <Row gutter={[12, 12]}>
                  <Col xs={12} sm={12} lg={6}>
                    <Card className="ant-stat-card"><Statistic title="Active projects" value={24} suffix={<Tag color="success">+12.5%</Tag>} /></Card>
                  </Col>
                  <Col xs={12} sm={12} lg={6}>
                    <Card className="ant-stat-card"><Statistic title="Awaiting review" value={8} suffix={<Tag color="warning">3 due soon</Tag>} /></Card>
                  </Col>
                  <Col xs={12} sm={12} lg={6}>
                    <Card className="ant-stat-card"><Statistic title="Completed" value={16} suffix={<Tag color="blue">This quarter</Tag>} /></Card>
                  </Col>
                  <Col xs={12} sm={12} lg={6}>
                    <Card className="ant-stat-card"><Statistic title="On-time delivery" value={94} suffix="%" /></Card>
                  </Col>
                </Row>

                <div className="ant-content-grid">
                  <Card
                    className="ant-project-card"
                    title="Projects"
                    extra={<Tag color="blue">{filteredProjects.length} results</Tag>}
                  >
                    <Space wrap style={{ width: '100%', marginBottom: 14 }}>
                      <Input.Search
                        allowClear
                        placeholder="Search projects or owners"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        style={{ width: 250 }}
                      />
                      <Select
                        value={status}
                        onChange={setStatus}
                        style={{ width: 150 }}
                        options={[
                          { value: 'All statuses', label: 'All statuses' },
                          { value: 'In progress', label: 'In progress' },
                          { value: 'Review', label: 'Review' },
                          { value: 'Complete', label: 'Complete' }
                        ]}
                      />
                    </Space>
                    <Table
                      columns={columns}
                      dataSource={filteredProjects}
                      rowKey="id"
                      size="small"
                      pagination={{ pageSize: 4, showSizeChanger: false, size: 'small' }}
                      scroll={{ x: 570 }}
                    />
                  </Card>

                  <Card className="ant-settings-card" title="Workspace settings" extra={<Button type="link" size="small">Manage</Button>}>
                    <Tabs
                      activeKey={activeTab}
                      onChange={setActiveTab}
                      size="small"
                      items={[
                        {
                          key: 'preferences',
                          label: 'Preferences',
                          children: (
                            <>
                              <div className="ant-settings-row">
                                <div className="ant-settings-label"><strong>Weekly digest</strong><small>Receive a Monday summary</small></div>
                                <Switch size="small" checked={digest} onChange={setDigest} />
                              </div>
                              <div className="ant-settings-row">
                                <div className="ant-settings-label"><strong>Project mentions</strong><small>Notify me when tagged</small></div>
                                <Switch size="small" checked={mentions} onChange={setMentions} />
                              </div>
                              <div className="ant-settings-row">
                                <div className="ant-settings-label"><strong>Keep me signed in</strong><small>Remember this device</small></div>
                                <Checkbox defaultChecked />
                              </div>
                            </>
                          )
                        },
                        {
                          key: 'progress',
                          label: 'Progress',
                          children: (
                            <div>
                              <Text strong>Quarterly delivery</Text>
                              <Progress percent={72} status="active" style={{ margin: '12px 0 5px' }} />
                              <Text type="secondary" style={{ fontSize: 10 }}>18 of 25 milestones complete</Text>
                              <Alert className="ant-insight" type="info" showIcon message="Your team is on track this quarter." />
                            </div>
                          )
                        }
                      ]}
                    />
                  </Card>
                </div>

                <div className="ant-footer">
                  <span>LAST SYNCED JUST NOW</span>
                  <span>Workspace updated Nov 3, 2026</span>
                </div>
              </Content>
            </Layout>
          </Layout>
        </section>
      </main>
    </ConfigProvider>
  );
}

createRoot(document.getElementById('root')).render(<AntPage />);
