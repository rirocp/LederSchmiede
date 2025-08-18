import { AdminLangProvider } from './components/AdminLangContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLangProvider>{children}</AdminLangProvider>;
} 