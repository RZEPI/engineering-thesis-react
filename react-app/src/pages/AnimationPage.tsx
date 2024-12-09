import { useState } from "react";
import AnimatedComponent from "../components/animation/AnimatedComponent";
import Layout from "../components/UI/Layout";

import styles from "../styles/animation/AnimatedPage.module.css";

export default function AnimationPage() {
  const [componentCount, setComponentCount] = useState<number>(5);
  const [tempComponentCount, setTempComponentCount] = useState<number>(5);
  const [isRight, setIsRight] = useState<boolean>(false);

  const toggleMovement = () => {
    setIsRight(!isRight);
  };

  const updateComponentCount = () => {
    setComponentCount(Math.max(1, tempComponentCount));
  };

  return (
    <Layout title="Animated Components">
      <div className={styles["animation-control"]}>
        <label htmlFor="component-count">Number of Components: </label>
        <input
          type="number"
          id="component-count"
          value={tempComponentCount}
          onChange={(e) => setTempComponentCount(Number(e.target.value))}
          onBlur={updateComponentCount}
        />

        <button onClick={toggleMovement}>Animate</button>
      </div>
      <div className={styles["component-list"]}>
        {Array.from({ length: componentCount }).map((_, index) => (
          <AnimatedComponent
            key={index}
            name={`Component ${index + 1}`}
            isRight={isRight}
          />
        ))}
      </div>
    </Layout>
  );
}
