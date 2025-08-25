interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'muted' | 'brand';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'muted', size = 'sm', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variantClasses = {
    success: 'bg-[var(--tc-success)] bg-opacity-10 text-[var(--tc-success)]',
    danger: 'bg-[var(--tc-danger)] bg-opacity-10 text-[var(--tc-danger)]',
    muted: 'bg-[var(--tc-text-muted)] bg-opacity-10 text-[var(--tc-text-muted)]',
    brand: 'bg-[var(--tc-brand)] bg-opacity-10 text-[var(--tc-brand)]',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <span className={classes}>
      {children}
    </span>
  );
}

