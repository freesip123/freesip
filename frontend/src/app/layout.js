import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'Freesip Software Solutions | Building Innovative Software',
  description: 'Transform your business with cutting-edge software solutions. We specialize in web development, mobile apps, SaaS products, and UI/UX design.',
  keywords: ['software development', 'web development', 'mobile apps', 'SaaS', 'UI/UX design', 'API development'],
  authors: [{ name: 'Freesip Software Solutions' }],
  openGraph: {
    title: 'Freesip Software Solutions | Building Innovative Software',
    description: 'Transform your business with cutting-edge software solutions.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Freesip Software Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freesip Software Solutions',
    description: 'Transform your business with cutting-edge software solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '14px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
