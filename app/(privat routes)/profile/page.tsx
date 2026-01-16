'use client';

import css from './ProfilePage.module.css';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';

export default function ProfilePage() {
  return (
    <div className={css.container}>
      <ProfileAvatar />
      <ProfileEditForm />
    </div>
  );
}
