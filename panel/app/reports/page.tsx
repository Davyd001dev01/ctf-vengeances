import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { InsightsIcon, StatusIcon, GovernanceIcon, BacklogIcon } from '../components/Icons';

export default function ReportsPage() {
  const reports = [
    {
      title: 'Weekly Delivery Report',
      description: 'Comprehensive overview of project deliveries and milestones achieved.',
      type: 'Automated',
      frequency: 'Weekly',
      lastGenerated: '2 hours ago',
      status: 'Active',
    },
    {
      title: 'Team Performance Analytics',
      description: 'Detailed analysis of team productivity and resource utilization.',
      type: 'Manual',
      frequency: 'Monthly',
      lastGenerated: '3 days ago',
      status: 'Active',
    },
    {
      title: 'Security Compliance Audit',
      description: 'Security posture assessment and compliance verification report.',
      type: 'Automated',
      frequency: 'Quarterly',
      lastGenerated: '1 week ago',
      status: 'Review',
    },
    {
      title: 'Budget Allocation Summary',
      description: 'Financial overview of project budgets and resource costs.',
      type: 'Manual',
      frequency: 'Monthly',
      lastGenerated: '5 days ago',
      status: 'Active',
    },
  ];

  const reportActions = [
    {
      title: 'Generate Report',
      description: 'Create custom reports with flexible data sources and formats.',
      icon: <InsightsIcon />,
      href: '#',
    },
    {
      title: 'Report Templates',
      description: 'Access pre-configured report templates for common use cases.',
      icon: <BacklogIcon />,
      href: '#',
    },
    {
      title: 'Scheduled Reports',
      description: 'Manage automated report generation and distribution.',
      icon: <StatusIcon />,
      href: '#',
    },
    {
      title: 'Report Archive',
      description: 'Browse historical reports and export data for analysis.',
      icon: <GovernanceIcon />,
      href: '#',
    },
  ];

  const metrics = [
    { label: 'Reports Generated', value: '156', trend: '+12%' },
    { label: 'Automated Reports', value: '89', trend: '+8%' },
    { label: 'Active Subscriptions', value: '34', trend: '+15%' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Reports</h1>
          <p className="tc-text-muted">
            Generate insights, track performance metrics, and create comprehensive reports for stakeholders.
          </p>
        </div>

        {/* Report Actions */}
        <div className="tc-grid tc-grid-2 mb-12">
          {reportActions.map((action, index) => (
            <div
              key={action.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card
                title={action.title}
                description={action.description}
                icon={action.icon}
                href={action.href}
              />
            </div>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="mb-6">
          <h2 className="mb-4">Recent Reports</h2>
        </div>

        <div className="space-y-4 mb-12">
          {reports.map((report, index) => (
            <div
              key={report.title}
              className="tc-surface rounded-[var(--tc-radius-lg)] p-6 hover-lift transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{report.title}</h3>
                    <Badge variant={report.status === 'Active' ? 'success' : 'brand'}>
                      {report.status}
                    </Badge>
                    <Badge variant="muted" size="sm">
                      {report.type}
                    </Badge>
                  </div>
                  <p className="tc-text-muted text-sm mb-3">{report.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm tc-text-muted">
                    <span>Frequency: {report.frequency}</span>
                    <span>Last generated: {report.lastGenerated}</span>
                  </div>
                </div>
                
                <div className="mt-4 lg:mt-0 lg:ml-6 flex gap-2">
                  <button className="px-4 py-2 text-sm bg-[var(--tc-brand)] text-white rounded-[var(--tc-radius-sm)] hover:bg-[var(--tc-brand-2)] transition-colors">
                    View
                  </button>
                  <button className="px-4 py-2 text-sm tc-surface border border-[var(--tc-border)] rounded-[var(--tc-radius-sm)] hover:border-[var(--tc-brand)] hover-brand transition-colors">
                    Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Metrics */}
        <div className="tc-grid tc-grid-3">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="tc-surface rounded-[var(--tc-radius-lg)] p-6 text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl font-bold tc-brand mb-1">{metric.value}</div>
              <div className="text-sm tc-text-muted mb-2">{metric.label}</div>
              <div className="text-xs text-[var(--tc-success)]">{metric.trend} this month</div>
            </div>
          ))}
        </div>

        {/* Report Categories */}
        <div className="mt-12">
          <h2 className="mb-6">Report Categories</h2>
          <div className="tc-grid tc-grid-2">
            <div className="tc-surface rounded-[var(--tc-radius-lg)] p-6">
              <h3 className="font-semibold mb-3">Operational Reports</h3>
              <ul className="space-y-2 text-sm tc-text-muted">
                <li>• Project Status Summaries</li>
                <li>• Team Performance Metrics</li>
                <li>• Resource Utilization Analysis</li>
                <li>• Delivery Timeline Reports</li>
              </ul>
            </div>
            <div className="tc-surface rounded-[var(--tc-radius-lg)] p-6">
              <h3 className="font-semibold mb-3">Compliance Reports</h3>
              <ul className="space-y-2 text-sm tc-text-muted">
                <li>• Security Audit Results</li>
                <li>• Governance Policy Reviews</li>
                <li>• Risk Assessment Reports</li>
                <li>• Quality Assurance Metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

