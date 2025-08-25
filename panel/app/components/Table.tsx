import Badge from './Badge';

interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

interface TableRow {
  id: string;
  [key: string]: string | number | boolean;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
}

export default function Table({ columns, data, className = '' }: TableProps) {
  const renderCell = (row: TableRow, column: TableColumn) => {
    const value = row[column.key];
    
    // Special rendering for status column
    if (column.key === 'status') {
      const variant = value === 'Active' ? 'success' : value === 'Error' ? 'danger' : 'muted';
      return <Badge variant={variant}>{value}</Badge>;
    }
    
    // Special rendering for updated column (dates)
    if (column.key === 'updated') {
      return <span className="tc-text-muted text-sm">{value}</span>;
    }
    
    return value;
  };

  return (
    <div className={`tc-surface rounded-[var(--tc-radius-lg)] overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="tc-surface-2 border-b border-[var(--tc-border)]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--tc-border)]">
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`hover:bg-[var(--tc-surface-2)] transition-colors ${
                  index % 2 === 0 ? '' : 'bg-[var(--tc-surface-2)] bg-opacity-30'
                }`}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm">
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

