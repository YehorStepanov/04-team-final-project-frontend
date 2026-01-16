'use client';

import Modal from '@/components/Modal/Modal';
import AddDiaryEntryForm, {
  DiaryFormValues,
} from '@/components/AddDiaryEntryForm/AddDiaryEntryForm';
import css from './AddDiaryEntryModal.module.css';

interface AddDiaryEntryModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialValues?: Partial<DiaryFormValues>;
  onClose: () => void;

  onSubmitToApi?: (values: DiaryFormValues) => Promise<void>;
}

export default function AddDiaryEntryModal({
  isOpen,
  mode,
  initialValues,
  onClose,
  onSubmitToApi,
}: AddDiaryEntryModalProps) {
  const title = mode === 'create' ? 'Новий запис' : 'Редагувати запис';

  const handleSuccess = (values: DiaryFormValues) => {
    console.log('SUCCESS:', values);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="min(92vw, 720px)"
    >
      <div className={css.wrapper}>
        <AddDiaryEntryForm
          mode={mode}
          initialValues={initialValues}
          onCancel={onClose}
          onSuccess={handleSuccess}
          onSubmitToApi={onSubmitToApi}
        />
      </div>
    </Modal>
  );
}
