import styles from "../styles/HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles["main-container"]}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat
        magna sit amet nibh ornare, vitae efficitur lorem molestie. Duis
        sagittis mi risus, ut gravida mi placerat aliquet. Maecenas in
        pellentesque augue, elementum bibendum risus.
      </p>
      <div className={styles["gradient"]}></div>
    </div>
  );
}
