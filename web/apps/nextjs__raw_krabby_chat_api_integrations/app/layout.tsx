import '@/app/styles/globals.css';
import type { Metadata } from 'next';
import { nunito_sans, poppins, lato } from './utils/font';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from '@/app/rtk-base/provider';
import GlobalModal from './(routes)/(chat)/components/GlobalModal';

export const metadata: Metadata = {
  title: 'Krach(Web) Demo',
  description: 'Krach(Web) Demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito_sans} ${poppins} ${lato}`}>
      <body suppressHydrationWarning>
        <AppProvider>
          <GlobalModal />
          {children}
          <Toaster position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
