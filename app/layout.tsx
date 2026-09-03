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
    'Discover EaseTalk, Syllabus Synk, MAMAAI and SabSewa Local: research-led digital solutions for accessible communication, education, family wellness and hyperlocal services.',
  openGraph: {
    title: 'Rashi Bhartiya Innovation LLP',
    description:
      'Innovation rooted in real human needs, with four practical digital solutions from India for the world.',
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
