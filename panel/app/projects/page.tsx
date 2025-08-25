import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { BacklogIcon, GovernanceIcon, InsightsIcon, StatusIcon } from '../components/Icons';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Customer Portal Redesign',
      description: 'Complete overhaul of customer-facing portal with modern UX patterns.',
      status: 'Active',
      progress: 75,
      team: 'Frontend Team',
      deadline: '2025-02-15',
    },
    {
      title: 'API Gateway Migration',
      description: 'Migration from legacy API infrastructure to cloud-native gateway.',
      status: 'Review',
      progress: 45,
      team: 'Backend Team',
      deadline: '2025-03-01',
    },
    {
      title: 'Security Audit Implementation',
      description: 'Implementation of security recommendations from Q4 audit.',
      status: 'Active',
      progress: 30,
      team: 'Security Team',
      deadline: '2025-01-30',
    },
    {
      title: 'Mobile App Beta',
      description: 'Development of companion mobile application for iOS and Android.',
      status: 'Planning',
      progress: 15,
      team: 'Mobile Team',
      deadline: '2025-04-15',
    },
  ];

  const quickActions = [
    {
      title: 'Create Project',
      description: 'Initialize new project with templates and workflows.',
      icon: <BacklogIcon />,
      href: '#',
    },
    {
      title: 'Project Analytics',
      description: 'View performance metrics and delivery insights.',
      icon: <InsightsIcon />,
      href: '#',
    },
    {
      title: 'Resource Planning',
      description: 'Manage team allocation and capacity planning.',
      icon: <GovernanceIcon />,
      href: '#',
    },
    {
      title: 'Status Reports',
      description: 'Generate automated status reports for stakeholders.',
      icon: <StatusIcon />,
      href: '#',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Projects</h1>
          <p className="tc-text-muted">
            Manage project portfolios, track delivery progress, and coordinate cross-functional teams.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="tc-grid tc-grid-2 mb-12">
          {quickActions.map((action, index) => (
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

        {/* Projects List */}
        <div className="mb-6">
          <h2 className="mb-4">Active Projects</h2>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="tc-surface rounded-[var(--tc-radius-lg)] p-6 hover-lift transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <Badge 
                      variant={
                        project.status === 'Active' ? 'success' : 
                        project.status === 'Review' ? 'brand' : 'muted'
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="tc-text-muted text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm tc-text-muted">
                    <span>Team: {project.team}</span>
                    <span>Deadline: {project.deadline}</span>
                  </div>
                </div>
                
                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <div className="text-right mb-2">
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-32 h-2 bg-[var(--tc-surface-2)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--tc-brand)] transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Stats */}
        <div className="mt-12 tc-grid tc-grid-3">
          <div className="tc-surface rounded-[var(--tc-radius-lg)] p-6 text-center">
            <div className="text-2xl font-bold tc-brand mb-2">12</div>
            <div className="text-sm tc-text-muted">Active Projects</div>
          </div>
          <div className="tc-surface rounded-[var(--tc-radius-lg)] p-6 text-center">
            <div className="text-2xl font-bold text-[var(--tc-success)] mb-2">8</div>
            <div className="text-sm tc-text-muted">On Schedule</div>
          </div>
          <div className="tc-surface rounded-[var(--tc-radius-lg)] p-6 text-center">
            <div className="text-2xl font-bold text-[var(--tc-danger)] mb-2">2</div>
            <div className="text-sm tc-text-muted">At Risk</div>
          </div>
        </div>
      </main>
    </div>
  );
}

