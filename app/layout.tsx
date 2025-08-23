export const metadata = {
  title: 'Upload Center',
  description: 'Simple file upload page (Next.js App Router)',
};

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
