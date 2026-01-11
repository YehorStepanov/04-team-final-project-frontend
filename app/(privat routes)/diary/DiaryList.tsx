'use client';

import Link from 'next/link';

export default function DiaryList() {
  // тут ти дістаєш записи (React Query / server props — як у тебе)
  const entries = [
    { id: '1', title: 'Запис 1' },
    { id: '2', title: 'Запис 2' },
  ];

  return (
    <ul>
      {entries.map((e) => (
        <li key={e.id}>
          <Link href={`/diary/${e.id}`}>{e.title}</Link>
        </li>
      ))}
    </ul>
  );
}
