import Image from 'next/image';
import css from './UserBar.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
export default function UserBar() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();
  const avatarSrc = user?.avatar || '/img/avatar.jpg';

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      toast.success('Ви успішно вийшли з акаунту');
      router.replace('/sign-in');
    } catch (error) {
      toast.error('Помилка при виході з акаунту');
    }
  };

  return (
    <div className={css.cover}>
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
      <button onClick={handleLogout} className={css.logoutBtn}>
        <svg width="24" height="24">
          <use href="#icon-log-out"></use>
        </svg>
      </button>
    </div>
  );
}
