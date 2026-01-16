import css from './DiaryEmptyMessage.module.css';

function DiaryEmptyMessage() {
  return (
    <li className={css.container}>
      <p className={css.text}>Наразі записи у щоденнику відсутні</p>
    </li>
  );
}

export default DiaryEmptyMessage;
