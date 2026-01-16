'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './AddDiaryEntryForm.module.css';

export type Emotion =
  | 'Натхнення'
  | 'Вдячність'
  | 'Тривога'
  | 'Радість'
  | 'Смуток'
  | 'Злість';

const EMOTIONS: Emotion[] = [
  'Натхнення',
  'Вдячність',
  'Тривога',
  'Радість',
  'Смуток',
  'Злість',
];

export interface DiaryFormValues {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  emotions: Emotion[];
}

function todayYYYYMMDD() {
  const d = new Date();
  const yyyy = String(d.getFullYear());
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const Schema = Yup.object({
  title: Yup.string().min(1).max(64).required('Заголовок обовʼязковий'),
  description: Yup.string()
    .min(1)
    .max(1000)
    .required('Текст запису обовʼязковий'),
  date: Yup.string().required(),
  emotions: Yup.array()
    .of(Yup.string())
    .min(1, 'Обери хоча б 1 емоцію')
    .max(12, 'Максимум 12 емоцій')
    .required('Емоції обовʼязкові'),
});

interface AddDiaryEntryFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<DiaryFormValues>;
  onCancel: () => void;
  onSuccess: (values: DiaryFormValues) => void;
  onSubmitToApi?: (values: DiaryFormValues) => Promise<void>;
}

export default function AddDiaryEntryForm({
  mode,
  initialValues,
  onCancel,
  onSuccess,
  onSubmitToApi,
}: AddDiaryEntryFormProps) {
  const startValues: DiaryFormValues = {
    title: initialValues?.title ?? '',
    description: initialValues?.description ?? '',
    date: initialValues?.date ?? todayYYYYMMDD(),
    emotions: (initialValues?.emotions as Emotion[]) ?? [],
  };

  const dropdownId = useId();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const onDocMouseDown = (e: MouseEvent) => {
      const node = dropdownRef.current;
      if (!node) return;
      if (!node.contains(e.target as Node)) setIsDropdownOpen(false);
    };

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };

    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onEsc);

    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onEsc);
    };
  }, [isDropdownOpen]);

  const handleSubmit = async (values: DiaryFormValues, actions: any) => {
    try {
      if (onSubmitToApi) {
        await onSubmitToApi(values);
      } else {
        console.log(mode.toUpperCase(), values);
      }

      onSuccess(values);
      actions.resetForm();
    } catch (e) {
      actions.setStatus('Помилка збереження. Спробуйте ще раз.');
      console.error(e);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const renderSelected = (selected: Emotion[]) => {
    if (!selected.length) {
      return <span className={css.placeholder}>Обрати категорії…</span>;
    }

    return (
      <span className={css.selectedChips}>
        {selected.map((e) => (
          <span key={e} className={css.chip}>
            {e}
          </span>
        ))}
      </span>
    );
  };

  return (
    <Formik
      initialValues={startValues}
      validationSchema={Schema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, isSubmitting, status }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Заголовок
            <Field
              name="title"
              type="text"
              className={css.input}
              placeholder="Введіть заголовок запису"
            />
            <ErrorMessage name="title" component="div" className={css.error} />
          </label>

          {/* ===== Dropdown (absolute) ===== */}
          <div className={css.label}>
            <span>Категорії</span>

            <div className={css.dropdownRoot} ref={dropdownRef}>
              <button
                type="button"
                className={css.dropdownField}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-controls={dropdownId}
                onClick={() => setIsDropdownOpen((v) => !v)}
              >
                <span className={css.dropdownValue}>
                  {renderSelected(values.emotions)}
                </span>

                <span
                  className={`${css.arrow} ${isDropdownOpen ? css.arrowOpen : ''}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {isDropdownOpen && (
                <div
                  className={css.dropdownPanel}
                  id={dropdownId}
                  role="listbox"
                >
                  {EMOTIONS.map((e) => {
                    const checked = values.emotions.includes(e);

                    return (
                      <label key={e} className={css.dropdownItem}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const next = checked
                              ? values.emotions.filter((x) => x !== e)
                              : [...values.emotions, e];

                            setFieldValue('emotions', next);
                          }}
                        />
                        <span>{e}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <ErrorMessage
              name="emotions"
              component="div"
              className={css.error}
            />
          </div>
          {/* ===== /Dropdown ===== */}

          <label className={css.label}>
            Запис
            <Field
              as="textarea"
              name="description"
              className={css.textarea}
              rows={7}
              placeholder="Запишіть, як ви себе відчуваєте"
            />
            <ErrorMessage
              name="description"
              component="div"
              className={css.error}
            />
          </label>

          <Field type="hidden" name="date" />

          {status ? <div className={css.status}>{status}</div> : null}

          <div className={css.actions}>
            <button
              type="button"
              className={css.secondaryBtn}
              onClick={onCancel}
            >
              Скасувати
            </button>

            <button
              type="submit"
              className={css.primaryBtn}
              disabled={isSubmitting}
            >
              {mode === 'create' ? 'Зберегти' : 'Оновити'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
