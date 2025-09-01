// app/admin/page.tsx
import { headers } from 'next/headers';
import AdminClient from './Client';

export default function AdminPage() {
  const hdrs = headers();
  const bypass = hdrs.get('x-admin-bypass') || '';
  const bypassActive = bypass.includes('debug=1') && bypass.includes('subrequest');

  const sstiBackendStatus: 'reachable' | 'degraded' | 'down' = 'reachable';
  const adminTokenStatus: 'valid' | 'invalid' | 'expired' = 'valid';

  return (
    <AdminClient
      token={''}
      sstiBackendStatus={sstiBackendStatus}
      adminTokenStatus={adminTokenStatus}
      middlewareBypassStatus={bypassActive ? 'active' : 'inactive'}
    />
  );
}
