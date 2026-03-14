import Link from 'next/link';
import { Home, Workflow, Play, Bot, Plug, Settings } from 'lucide-react';

export function Sidebar() {
  const links = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/dashboard/workflows', icon: Workflow, label: 'Workflows' },
    { href: '/dashboard/runs', icon: Play, label: 'Runs' },
    { href: '/dashboard/agents', icon: Bot, label: 'Agents' },
    { href: '/dashboard/connectors', icon: Plug, label: 'Connectors' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 border-r p-4">
      <nav className="flex flex-col gap-2">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 p-2 rounded hover:bg-muted"
          >
            <Icon className="size-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
