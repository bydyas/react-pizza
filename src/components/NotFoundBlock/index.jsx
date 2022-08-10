import styles from './NotFoundBlock.module.scss';

console.log(styles);

function NotFoundBlock() {
  return (
    <h1 className={styles.root}>
      <span>😕</span>
      <br />
      Страница не найдена
    </h1>
  );
}

export default NotFoundBlock;
