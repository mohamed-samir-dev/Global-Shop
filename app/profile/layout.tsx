import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Profile - Account Settings',
  description: 'Manage your Global Shop profile, update personal information, and view account settings.',
  robots: { index: false, follow: false },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
