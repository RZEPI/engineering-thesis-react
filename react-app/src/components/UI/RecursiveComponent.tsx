import { RecursiveProps } from "../../models/RecursiveProps.ts";
import styles from '../../styles/RecursiveComponent.module.css';

const getColor = (depth : number): string => {
  const hue = 190 + (depth * 3);
  const saturation = 96+ (depth * 3);
  const lightness = 67;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
export default function RecursiveComponent({ message, depth, maxDepth }: RecursiveProps) {
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
