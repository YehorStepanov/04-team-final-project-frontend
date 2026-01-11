import DiaryEntryDetails from './DiaryEntryDetails';

export default function DiaryEntryPage({
  params,
}: {
  params: { entryId: string };
}) {
  return <DiaryEntryDetails entryId={params.entryId} />;
}
