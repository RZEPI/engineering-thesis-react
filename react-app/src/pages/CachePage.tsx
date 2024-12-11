import { useState, useMemo, useRef } from "react";
import Layout from "../components/UI/Layout";

import styles from "../styles/cache/CachePage.module.css";

export default function CachePage() {
  const [calculate, setCalculate] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [iterations, setIterations] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const memoizedResult = useMemo(() => {
    return calculatePi(iterations * 1000000);
  }, [iterations]);

  function calculatePi(iterations: number) {
    let insideCircle = 0;
    for (let i = 0; i < iterations; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;

      if (x * x + y * y <= 1) {
        insideCircle++;
      }
    }
    const pi = (insideCircle / iterations) * 4;
    return pi;
  }

  function handleCalculate() {
    setCalculate(true);
    console.log(calculate); //czemy false? co to za jakies asynchroniczne, przez to Calculating sie nie wyświetla
    const value = inputRef.current?.value;
    if (value) {
      setIterations(Number(value));
    }
    setResult(memoizedResult); // wyswietla Nan mimo ze ustawiam na 100mln, o co cho w tym reactcie
  }

  function handleReset() {
    setCalculate(false);
    setResult(null);
  }

  return (
    <Layout title="Cache">
      <div className={styles["row-container"]}>
        <div className={styles["left-panel"]}>
          <h2>Pi Calculation</h2>
          <p>
            We are calculating the value of <b>π</b> using the Monte Carlo
            method with <b>{iterations}</b> million iterations:
          </p>
          <ol>
            <li>Generate random points (x, y) within a square from -1 to 1.</li>
            <li>
              Count how many points fall within the unit circle (x² + y² ≤ 1).
            </li>
            <li>
              Calculate Pi using the formula: Pi = 4 * (points inside the
              circle) / (total points).
            </li>
          </ol>
        </div>

        <div className={styles["right-panel"]}>
          <div className={styles["cache-control"]}>
            <h3>Iterations (in millions):</h3>
            <input ref={inputRef} type="number" defaultValue={100} min={1} />
            <button onClick={handleCalculate}>Calculate</button>
            <button onClick={handleReset}>Reset</button>
          </div>
          <div className={styles["cache-control"]}>
            <h3>Result:</h3>
            {result !== null ? (
              <p>Calculated value of Pi: {result}</p>
            ) : (
              <p>
                {calculate
                  ? "Calculating..."
                  : 'Click "Calculate" to see the result.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
