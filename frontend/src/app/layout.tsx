import type { Metadata } from 'next';
import './globals.css';

/**
 * Root layout — minimal, no external component dependencies.
 * Once everything else works, you can add <AuthBootstrap /> back inside <body>.
 * For now, simpler = fewer crash surfaces.
 */
export const metadata: Metadata = {
  title: 'Kiranawala',
  description:
    'A cloud-based platform connecting local Kirana stores with nearby customers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}