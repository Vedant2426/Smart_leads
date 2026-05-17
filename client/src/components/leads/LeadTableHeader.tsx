interface LeadTableHeaderProps {
  columns: { label: string; className?: string }[];
}

export const LeadTableHeader: React.FC<LeadTableHeaderProps> = ({ columns }) => (
  <thead>
    <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
      {columns.map((col) => (
        <th
          key={col.label}
          className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider text-left ${col.className ?? ''}`}
          style={{ color: 'var(--text-3)', letterSpacing: '0.06em' }}
        >
          {col.label}
        </th>
      ))}
    </tr>
  </thead>
);
