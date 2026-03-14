'use client';

import { createContext, useContext, ReactNode } from 'react';

const SessionContext = createContext<any>(null);

export function AuthProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const useServerSession = () => useContext(SessionContext);
