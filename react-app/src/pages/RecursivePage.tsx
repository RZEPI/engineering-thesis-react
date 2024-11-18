import { useState } from 'react';
import styles from "../styles/RecursivePage.module.css";
import Recursive from "../components/UI/Recursive.tsx";
export default function RecursivePage() {
    const message = "This component was created recursively. It's depth is";
    const depth = 1;
    const [maxDepth, setMaxDepth] = useState(0);
    const [inputValue, setInputValue] = useState(0);

    const content = (
        <div className={styles["main-container"]}>
            <p>Recursive Component Generation Test</p>
            <div className={styles["input-container"]}>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.valueAsNumber)}
                    placeholder="Amount of components"
                    min="1"
                />
                <button onClick={() => setMaxDepth(inputValue)}>Generate Components</button>
            </div>
            <div>
                {maxDepth > 0 && (
                <Recursive
                message={message}
                depth={depth}
                maxDepth={maxDepth}
                />
                )}
            </div>
            <div className={styles["gradient"]}></div>
        </div>
    );

    return (
          <main>{content}</main>
      );
}