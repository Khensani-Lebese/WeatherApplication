import styles from "./styles.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <img
          className={styles.loadingImg}
          src="https://th.bing.com/th/id/R.a6fdea9103b4cf10e920735e8a840a5c?rik=Mx0GLyAuTfiXVw&pid=ImgRaw&r=0"
          alt="...loading"
        />
      </div>
    </div>
  );
};
export default Loading;
