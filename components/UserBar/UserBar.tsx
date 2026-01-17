import Image from 'next/image';
import css from '@/components/UserBar/UserBar.module.css';
import { useAuthStore } from '@/lib/store/authStore';
export default function UserBar() {
  const { user, setUser } = useAuthStore();
  const avatarSrc = user?.avatar || '/img/avatar.jpg';
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
      <button>
        <svg width="24" height="24">
          <use href="#icon-log-out"></use>
        </svg>
      </button>
    </div>
  );
}
