import { createContext, useContext, useState, type ReactNode } from 'react';

interface JobContactData {
  jobTitle: string;
  company: string;
}

interface JobContactContextType {
  jobData: JobContactData | null;
  setJobData: (data: JobContactData | null) => void;
  clearJobData: () => void;
}

const JobContactContext = createContext<JobContactContextType | undefined>(undefined);

export function JobContactProvider({ children }: { children: ReactNode }) {
  const [jobData, setJobData] = useState<JobContactData | null>(null);

  const clearJobData = () => setJobData(null);

  return (
    <JobContactContext.Provider value={{ jobData, setJobData, clearJobData }}>
      {children}
    </JobContactContext.Provider>
  );
}

export function useJobContact() {
  const context = useContext(JobContactContext);
  if (context === undefined) {
    throw new Error('useJobContact must be used within a JobContactProvider');
  }
  return context;
}
