import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rashi Bhartiya Innovation LLP | Human-Centred Digital Solutions',
  description:
    'Discover EaseTalk, Syllabus Synk, MAMAAI, SabSewa Local and MyLekhpal: research-led digital solutions for accessibility, education, family wellness, hyperlocal commerce, AI accounting and personal finance.',
  keywords: [
    'Rashi Bhartiya Innovation LLP',
    'MyLekhpal',
    'mylekhpal.com',
    'AI accounting India',
    'AI bookkeeping assistant',
    'small business accounting',
    'journal entry AI',
    'AI personal finance',
    'personal finance planning India',
    'AI tax planning support',
    'business accounting assistant',
    'personal financial planning',
  ],
  openGraph: {
    title: 'Rashi Bhartiya Innovation LLP',
    description:
      'Innovation rooted in real human needs, with five practical digital solutions from India for the world.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
