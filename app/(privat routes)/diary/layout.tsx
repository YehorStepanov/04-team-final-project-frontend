import DiaryShell from './DiaryShell.tsx';

export default function DiaryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { entryId?: string };
}) {
  const hasEntryId = Boolean(params?.entryId);

  return <DiaryShell hasEntryId={hasEntryId}>{children}</DiaryShell>;
}
