import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import css from './UserBar.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import Modal from '../Modal/Modal';
import { DiaryButton } from '../Diary/DiaryButton/DiaryButton';

export default function UserBar() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();
  const avatarSrc = user?.avatar || '/img/avatar.jpg';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      clearAuth();
      toast.success('Ви успішно вийшли з акаунту');
      router.replace('/sign-in');
    } catch (error) {
      toast.error('Помилка при виході з акаунту');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={css.cover}>
      <div className={css.avatarContainer}>
        <Image
          src={avatarSrc}
          width={40}
          height={40}
          className={css.avatar}
          alt="User's avatar"
        />
        <div className={css.details}>
          <h3 className={css.name}>{user?.name || "Ім'я"}</h3>
          <p className={css.email}>{user?.email || 'email@example.com'}</p>
        </div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className={css.logoutBtn}
        disabled={isLoggingOut}
      >
        <svg width="24" height="24">
          <use href="#icon-log-out"></use>
        </svg>
      </button>
      {isModalOpen && (
        <Modal handleClose={handleModalClose}>
          <p className={css.modalText}>Ви точно хочете вийти?</p>
          <div className={css.buttonsContainer}>
            <DiaryButton role="secondary" onClick={handleModalClose}>
              Ні
            </DiaryButton>
            <DiaryButton
              role="primary"
              onClick={() => {
                handleLogout();
                handleModalClose();
              }}
            >
              Так
            </DiaryButton>
          </div>
        </Modal>
      )}
    </div>
  );
}
