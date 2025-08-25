import Navbar from '../components/Navbar';
import Badge from '../components/Badge';
import { GovernanceIcon, StatusIcon, ImportIcon, InsightsIcon } from '../components/Icons';

export default function SettingsPage() {
  const settingsCategories = [
    {
      title: 'System Configuration',
      description: 'Manage core system settings, integrations, and operational parameters.',
      icon: <GovernanceIcon />,
      href: '#',
      items: ['API Endpoints', 'Database Connections', 'Cache Settings', 'Logging Configuration'],
    },
    {
      title: 'User Management',
      description: 'Configure user roles, permissions, and access control policies.',
      icon: <ImportIcon />,
      href: '#',
      items: ['Role Definitions', 'Permission Matrix', 'SSO Integration', 'Session Management'],
    },
    {
      title: 'Monitoring & Alerts',
      description: 'Set up system monitoring, alerting rules, and notification channels.',
      icon: <StatusIcon />,
      href: '#',
      items: ['Alert Thresholds', 'Notification Rules', 'Health Checks', 'Performance Metrics'],
    },
    {
      title: 'Data & Analytics',
      description: 'Configure data retention, analytics pipelines, and reporting settings.',
      icon: <InsightsIcon />,
      href: '#',
      items: ['Data Retention', 'Analytics Config', 'Report Scheduling', 'Export Settings'],
    },
  ];

  const systemStatus = [
    { component: 'API Gateway', status: 'Operational', uptime: '99.9%' },
    { component: 'Database Cluster', status: 'Operational', uptime: '99.8%' },
    { component: 'Cache Layer', status: 'Operational', uptime: '99.9%' },
    { component: 'Message Queue', status: 'Maintenance', uptime: '98.5%' },
    { component: 'File Storage', status: 'Operational', uptime: '99.7%' },
    { component: 'Analytics Engine', status: 'Operational', uptime: '99.6%' },
  ];

  const recentChanges = [
    {
      setting: 'API Rate Limiting',
      changed: '2 hours ago',
      user: 'admin@techcorp.com',
      description: 'Updated rate limits for external API calls',
    },
    {
      setting: 'User Session Timeout',
      changed: '1 day ago',
      user: 'security@techcorp.com',
      description: 'Reduced session timeout to 4 hours for security',
    },
    {
      setting: 'Backup Schedule',
      changed: '3 days ago',
      user: 'ops@techcorp.com',
      description: 'Modified backup frequency to every 6 hours',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Settings</h1>
          <p className="tc-text-muted">
            Configure system parameters, manage integrations, and monitor operational status.
          </p>
        </div>

        {/* Settings Categories */}
        <div className="tc-grid tc-grid-2 mb-12">
          {settingsCategories.map((category, index) => (
            <div
              key={category.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="tc-surface rounded-[var(--tc-radius-lg)] p-6 hover-lift transition-all h-full">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--tc-brand)] bg-opacity-10 rounded-[var(--tc-radius-md)] flex items-center justify-center">
                    <div className="w-6 h-6 tc-brand">
                      {category.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <p className="tc-text-muted text-sm leading-relaxed mb-4">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {category.items.map(item => (
                    <div key={item} className="flex items-center justify-between py-1">
                      <span className="text-sm">{item}</span>
                      <Badge variant="muted" size="sm">Configure</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Status */}
        <div className="mb-12">
          <h2 className="mb-6">System Status</h2>
          <div className="tc-surface rounded-[var(--tc-radius-lg)] overflow-hidden">
            <div className="divide-y divide-[var(--tc-border)]">
              {systemStatus.map((item) => (
                <div
                  key={item.component}
                  className="p-4 flex items-center justify-between hover:bg-[var(--tc-surface-2)] transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'Operational' ? 'bg-[var(--tc-success)]' : 
                      item.status === 'Maintenance' ? 'bg-[var(--tc-brand)]' : 'bg-[var(--tc-danger)]'
                    }`} />
                    <span className="font-medium">{item.component}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant={
                        item.status === 'Operational' ? 'success' : 
                        item.status === 'Maintenance' ? 'brand' : 'danger'
                      }
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                    <span className="text-sm tc-text-muted">{item.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Changes */}
        <div>
          <h2 className="mb-6">Recent Configuration Changes</h2>
          <div className="space-y-4">
            {recentChanges.map((change) => (
              <div
                key={change.setting}
                className="tc-surface rounded-[var(--tc-radius-lg)] p-4 animate-fade-in-up"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-medium">{change.setting}</h4>
                      <Badge variant="muted" size="sm">{change.changed}</Badge>
                    </div>
                    <p className="text-sm tc-text-muted mb-2">{change.description}</p>
                    <p className="text-xs tc-text-muted">Modified by: {change.user}</p>
                  </div>
                  <button className="text-sm tc-brand hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-[var(--tc-brand)] text-white rounded-[var(--tc-radius-md)] hover:bg-[var(--tc-brand-2)] transition-colors">
            Export Configuration
          </button>
          <button className="px-4 py-2 tc-surface border border-[var(--tc-border)] rounded-[var(--tc-radius-md)] hover:border-[var(--tc-brand)] hover-brand transition-colors">
            Import Settings
          </button>
          <button className="px-4 py-2 tc-surface border border-[var(--tc-border)] rounded-[var(--tc-radius-md)] hover:border-[var(--tc-brand)] hover-brand transition-colors">
            Reset to Defaults
          </button>
        </div>
      </main>
    </div>
  );
}

