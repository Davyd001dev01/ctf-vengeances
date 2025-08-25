import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { BacklogIcon, GovernanceIcon, InsightsIcon, ImportIcon } from '../components/Icons';

export default function TeamsPage() {
  const teams = [
    {
      name: 'Frontend Engineering',
      lead: 'Sarah Chen',
      members: 8,
      projects: 3,
      utilization: 85,
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    },
    {
      name: 'Backend Engineering',
      lead: 'Marcus Rodriguez',
      members: 6,
      projects: 4,
      utilization: 92,
      skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
    },
    {
      name: 'Product Design',
      lead: 'Emily Watson',
      members: 4,
      projects: 2,
      utilization: 78,
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    },
    {
      name: 'DevOps & Infrastructure',
      lead: 'David Kim',
      members: 5,
      projects: 6,
      utilization: 95,
      skills: ['AWS', 'Kubernetes', 'Terraform', 'Monitoring'],
    },
  ];

  const teamActions = [
    {
      title: 'Team Analytics',
      description: 'View team performance metrics and productivity insights.',
      icon: <InsightsIcon />,
      href: '#',
    },
    {
      title: 'Resource Allocation',
      description: 'Manage team assignments and capacity planning.',
      icon: <GovernanceIcon />,
      href: '#',
    },
    {
      title: 'Skill Matrix',
      description: 'Track team competencies and identify skill gaps.',
      icon: <BacklogIcon />,
      href: '#',
    },
    {
      title: 'Onboarding',
      description: 'Streamline new team member integration process.',
      icon: <ImportIcon />,
      href: '#',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Teams</h1>
          <p className="tc-text-muted">
            Manage team structures, track performance, and optimize resource allocation across departments.
          </p>
        </div>

        {/* Team Actions */}
        <div className="tc-grid tc-grid-2 mb-12">
          {teamActions.map((action, index) => (
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

        {/* Teams Grid */}
        <div className="mb-6">
          <h2 className="mb-4">Department Teams</h2>
        </div>

        <div className="tc-grid tc-grid-2">
          {teams.map((team, index) => (
            <div
              key={team.name}
              className="tc-surface rounded-[var(--tc-radius-lg)] p-6 hover-lift transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-1">{team.name}</h3>
                  <p className="text-sm tc-text-muted">Lead: {team.lead}</p>
                </div>
                <Badge 
                  variant={team.utilization > 90 ? 'danger' : team.utilization > 80 ? 'brand' : 'success'}
                >
                  {team.utilization}% utilized
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-lg font-semibold tc-brand">{team.members}</div>
                  <div className="text-sm tc-text-muted">Members</div>
                </div>
                <div>
                  <div className="text-lg font-semibold tc-brand">{team.projects}</div>
                  <div className="text-sm tc-text-muted">Active Projects</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Key Skills</div>
                <div className="flex flex-wrap gap-1">
                  {team.skills.map(skill => (
                    <Badge key={skill} variant="muted" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--tc-border)]">
                <div className="flex justify-between items-center text-sm">
                  <span className="tc-text-muted">Capacity</span>
                  <span className="font-medium">{team.utilization}%</span>
                </div>
                <div className="mt-2 h-2 bg-[var(--tc-surface-2)] rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      team.utilization > 90 ? 'bg-[var(--tc-danger)]' : 
                      team.utilization > 80 ? 'bg-[var(--tc-brand)]' : 'bg-[var(--tc-success)]'
                    }`}
                    style={{ width: `${team.utilization}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Overview Stats */}
        <div className="mt-12 tc-grid tc-grid-3">
          <div className="tc-surface rounded-[var(--tc-radius-lg)] p-6 text-center">
            <div className="text-2xl font-bold tc-brand mb-2">23</div>
            <div className="text-sm tc-text-muted">Total Members</div>
          </div>
          <div className="tc-surface rounded-[var(--tc-radius-lg)] p-6 text-center">
            <div className="text-2xl font-bold text-[var(--tc-success)] mb-2">4</div>
            <div className="text-sm tc-text-muted">Active Teams</div>
          </div>
          <div className="tc-surface rounded-[var(--tc-radius-lg)] p-6 text-center">
            <div className="text-2xl font-bold tc-brand mb-2">87%</div>
            <div className="text-sm tc-text-muted">Avg Utilization</div>
          </div>
        </div>
      </main>
    </div>
  );
}

