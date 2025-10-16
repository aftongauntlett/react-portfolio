import { createContext, useContext, useState, type ReactNode } from 'react';

interface DetailViewState {
  type: 'post-mortem';
  slug: string;
  title: string;
}

interface DetailViewContextType {
  detailView: DetailViewState | null;
  setDetailView: (view: DetailViewState | null) => void;
}

const DetailViewContext = createContext<DetailViewContextType | undefined>(undefined);

export function DetailViewProvider({ children }: { children: ReactNode }) {
  const [detailView, setDetailView] = useState<DetailViewState | null>(null);

  return (
    <DetailViewContext.Provider value={{ detailView, setDetailView }}>
      {children}
    </DetailViewContext.Provider>
  );
}

export function useDetailView() {
  const context = useContext(DetailViewContext);
  if (context === undefined) {
    throw new Error('useDetailView must be used within a DetailViewProvider');
  }
  return context;
}
