import styles from "../../styles/LoadingFallback.module.css";

export default function LoadingFallback() {
  return (
    <div className={styles["loading-fallback"]}>
      <p>Loading...</p>
    </div>
  );
}
