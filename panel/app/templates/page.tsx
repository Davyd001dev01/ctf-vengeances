'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchInput from '../components/SearchInput';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { TemplateIcon, BacklogIcon, GovernanceIcon, InsightsIcon } from '../components/Icons';

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const templates = [
    {
      id: 'tpl-001',
      title: 'Product Requirements Document',
      description: 'Comprehensive template for defining product features, user stories, and acceptance criteria.',
      tags: ['Product', 'Requirements', 'Documentation'],
      category: 'Product Management',
      icon: <TemplateIcon />,
    },
    {
      id: 'tpl-002',
      title: 'Sprint Planning Template',
      description: 'Structured approach to sprint planning with capacity estimation and goal setting.',
      tags: ['Agile', 'Sprint', 'Planning'],
      category: 'Project Management',
      icon: <BacklogIcon />,
    },
    {
      id: 'tpl-003',
      title: 'Technical Architecture Review',
      description: 'Framework for evaluating system architecture decisions and technical debt.',
      tags: ['Architecture', 'Technical', 'Review'],
      category: 'Engineering',
      icon: <GovernanceIcon />,
    },
    {
      id: 'tpl-004',
      title: 'User Research Report',
      description: 'Template for documenting user research findings and actionable insights.',
      tags: ['Research', 'UX', 'Analysis'],
      category: 'Design',
      icon: <InsightsIcon />,
    },
    {
      id: 'tpl-005',
      title: 'Risk Assessment Matrix',
      description: 'Systematic approach to identifying, evaluating, and mitigating project risks.',
      tags: ['Risk', 'Assessment', 'Management'],
      category: 'Governance',
      icon: <GovernanceIcon />,
    },
    {
      id: 'tpl-006',
      title: 'Performance Metrics Dashboard',
      description: 'KPI tracking template with automated reporting and trend analysis.',
      tags: ['Metrics', 'KPI', 'Analytics'],
      category: 'Analytics',
      icon: <InsightsIcon />,
    },
  ];

  const allTags = Array.from(new Set(templates.flatMap(t => t.tags)));

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => template.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Templates</h1>
          <p className="tc-text-muted">
            Curated templates for PM workflows, documentation, and governance processes.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <SearchInput
            placeholder="Search templates..."
            onSearch={setSearchQuery}
            className="max-w-md"
          />
          
          {/* Filter Tags */}
          <div>
            <h3 className="mb-3">Filter by tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-[var(--tc-brand)] bg-opacity-10 text-[var(--tc-brand)] border-[var(--tc-brand)]'
                      : 'tc-surface border-[var(--tc-border)] hover:border-[var(--tc-brand)] hover-brand'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {selectedTags.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm tc-text-muted">Active filters:</span>
              {selectedTags.map(tag => (
                <Badge key={tag} variant="brand">
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-1 hover:text-white"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <button
                onClick={() => setSelectedTags([])}
                className="text-sm tc-brand hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="tc-text-muted text-sm">
            Showing {filteredTemplates.length} of {templates.length} templates
          </p>
        </div>

        {/* Templates Grid */}
        <div className="tc-grid tc-grid-2">
          {filteredTemplates.map((template, index) => (
            <div
              key={template.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="tc-surface rounded-[var(--tc-radius-lg)] p-6 hover-lift transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[var(--tc-brand)] bg-opacity-10 rounded-[var(--tc-radius-md)] flex items-center justify-center">
                      <div className="w-6 h-6 tc-brand">
                        {template.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{template.title}</h3>
                      <Badge variant="muted" size="sm">{template.category}</Badge>
                    </div>
                  </div>
                </div>
                
                <p className="tc-text-muted text-sm mb-4 leading-relaxed">
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map(tag => (
                    <Badge key={tag} variant="muted" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  href={`/templates/${template.id}`}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Open Template
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--tc-surface-2)] rounded-full flex items-center justify-center">
              <TemplateIcon />
            </div>
            <h3 className="mb-2">No templates found</h3>
            <p className="tc-text-muted mb-4">
              Try adjusting your search terms or clearing the filters.
            </p>
            <Button onClick={() => { setSearchQuery(''); setSelectedTags([]); }}>
              Clear all filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

