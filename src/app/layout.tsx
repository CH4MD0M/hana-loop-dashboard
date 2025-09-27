import type { Metadata } from 'next';

import './globals.css';

import ToastProvider from '@/components/toast-provider';
import { ModalRenderer } from '@/components/modal/modal-renderer';

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
      <body>
        <ToastProvider>{children}</ToastProvider>
        <ModalRenderer />
      </body>
    </html>
  );
}
