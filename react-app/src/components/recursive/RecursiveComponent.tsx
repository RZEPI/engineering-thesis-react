import { RecursiveComponentProps } from "../../models/recursive/RecursiveComponentProps.ts";
import styles from "../../styles/recursive/RecursiveComponent.module.css";

const getColor = (depth: number): string => {
  const hue = (190 + depth * 3) % 255;
  const saturation = (96 + depth * 3) % 255;
  const lightness = 67;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
export default function RecursiveComponent({
  message,
  depth,
  maxDepth,
}: RecursiveComponentProps) {
  return (
    <div className={styles["recursive-component"]}>
      <p style={{ color: getColor(depth) }}>
        {message} {depth}
      </p>
      {depth < maxDepth && (
        <RecursiveComponent
          message={message}
          depth={depth + 1}
          maxDepth={maxDepth}
        />
      )}
    </div>
  );
}
