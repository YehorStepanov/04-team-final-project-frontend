'use client';

import css from './ProfilePage.module.css';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';


export default function ProfilePage() {
  return (
      

      <div className={css.container}>
        <Breadcrumbs />
        <ProfileAvatar />
        <ProfileEditForm />
      </div>
    
  );
}
