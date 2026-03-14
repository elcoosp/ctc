import { headers } from 'next/headers';
import { auth } from '@/lib/auth/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const user = session.user;
  const initials = user.name?.charAt(0) || user.email?.charAt(0) || 'U';

  // Note: usageMonth and sandboxUsed are stored in the database but not in the session.
  // For now, we'll hardcode; later we'll fetch them from the database or add to session.
  const usageMonth = 0; // Replace with real data
  const sandboxUsed = 0; // Replace with real data

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold">AI Content Agent</h1>
      <div className="flex items-center gap-4">
        <Badge variant="outline">Free Plan · {usageMonth}/10 runs</Badge>
        <Avatar className="size-10">
          <AvatarImage src={user.image} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
