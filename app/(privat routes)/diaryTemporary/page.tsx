'use client';

import { useState } from 'react';
import AddDiaryEntryModal from '../../../components/AddDiaryEntryModal/AddDiaryEntryModal';
import type { DiaryFormValues } from '../../../components/AddDiaryEntryForm/AddDiaryEntryForm';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [initialValues, setInitialValues] = useState<
    Partial<DiaryFormValues> | undefined
  >(undefined);

  const openCreate = () => {
    setMode('create');
    setInitialValues(undefined);
    setIsOpen(true);
  };

  const openEdit = () => {
    setMode('edit');
    setInitialValues({
      title: 'Мій існуючий запис',
      description: 'Це приклад тексту для редагування.',
      emotions: ['Радість', 'Вдячність'],
      // date можна не передавати — форма підставить сьогодні
      // але для edit зазвичай передають дату запису:
      date: '2026-01-16',
    });
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <div style={{ padding: 24 }}>
      <h1>Diary page</h1>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={openCreate}>+ Новий запис</button>
        <button onClick={openEdit}>✎ Редагувати (демо)</button>
      </div>

      <AddDiaryEntryModal
        isOpen={isOpen}
        mode={mode}
        initialValues={initialValues}
        onClose={close}
      />
    </div>
  );
}
