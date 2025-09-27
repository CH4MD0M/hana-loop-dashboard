import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'HanaLoop',
  description: 'HanaLoop dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
