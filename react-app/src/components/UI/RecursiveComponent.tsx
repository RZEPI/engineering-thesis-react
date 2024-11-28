import styles from '../../styles/RecursiveComponent.module.css';

export default function RecursiveComponent({ message, depth, maxDepth }: { message: string, depth: number, maxDepth: number }) {
    return (
        <div className={styles["recursive-component"]}>
            <p>{message} {depth}</p>
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
