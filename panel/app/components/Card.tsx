import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Card({ title, description, icon, href, onClick, className = '' }: CardProps) {
  const cardContent = (
    <div className={`tc-surface rounded-[var(--tc-radius-lg)] p-6 hover-lift cursor-pointer transition-all ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-[var(--tc-brand)] bg-opacity-10 rounded-[var(--tc-radius-md)] flex items-center justify-center">
          <div className="w-6 h-6 tc-brand">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="tc-text-muted text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full text-left">
        {cardContent}
      </button>
    );
  }

  return cardContent;
}

