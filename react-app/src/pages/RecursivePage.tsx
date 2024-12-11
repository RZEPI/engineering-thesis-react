import { useState } from "react";
import styles from "../styles/recursive/RecursivePage.module.css";
import RecursiveComponent from "../components/recursive/RecursiveComponent.tsx";
import Layout from "../components/UI/Layout";

export default function RecursivePage() {
  const message = "This component was created recursively. It's depth is";
  const depth = 1;
  const [maxDepth, setMaxDepth] = useState(0);
  const [maxDepthInput, setMaxDepthInput] = useState(0);

  const handleGenerateComponents = () => {
    const validatedValue = maxDepthInput > 1408 ? 1408 : maxDepthInput;
    setMaxDepth(validatedValue);
    setMaxDepthInput(validatedValue);
  };

  return (
      <Layout title="Recursive Rendering">
        <div className={styles["recursive-page"]}>
          <div className={styles["input-container"]}>
            <input
              type="number"
              value={maxDepthInput}
              onChange={(e) => setMaxDepthInput(e.target.valueAsNumber)}
              placeholder="Amount of components"
              min="0"
            />
            <button onClick={handleGenerateComponents}>Generate Components</button>
          </div>
          <div>
            {maxDepth > 0 && (
              <RecursiveComponent
                message={message}
                depth={depth}
                maxDepth={maxDepth}
              />
            )}
          </div>
          <div className={styles["gradient"]}></div>
        </div>
      </Layout>
    );
  }
  