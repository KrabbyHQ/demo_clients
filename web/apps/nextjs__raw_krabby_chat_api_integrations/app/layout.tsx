import '@/app/styles/globals.css';
import type { Metadata } from 'next';
import { nunito_sans, poppins, lato } from './utils/font';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from '@/app/rtk-base/provider';
// import { GoogleAnalytics } from '@/app/components/Analytics';

export const metadata: Metadata = {
  title: 'Krach(Web) Demo',
  description: 'Krach(Web) Demo',
  // openGraph: {
  //   title: 'Andrew Okpainmo | Portfolio',
  //   description:
  //     'Product engineer specializing in blockchain research and development - delivering cutting-edge solutions at the intersection of product and engineering.',
  //   url: 'https://okpainmo.github.io',
  //   siteName: 'Andrew Okpainmo',
  //   images: [
  //     {
  //       url: 'https://avatars.githubusercontent.com/u/42122017',
  //       width: 800,
  //       height: 800
  //     }
  //   ],
  //   locale: 'en-US',
  //   type: 'website'
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Andrew Okpainmo | Portfolio',
  //   description:
  //     'Product engineer specializing in blockchain research and development - delivering cutting-edge solutions at the intersection of product and engineering.',
  //   creator: '@AJ_Okpainmo',
  //   images: ['https://avatars.githubusercontent.com/u/42122017']
  // },
  // icons: {
  //   icon: 'https://okpainmo.github.io/_/okpainmo__the-logo.png'
  // }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito_sans} ${poppins} ${lato}`}>
      <body suppressHydrationWarning>
        {/*<body>*/}
        <AppProvider>
          {/*<GoogleAnalytics />*/}
          {children}
          <Toaster position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
