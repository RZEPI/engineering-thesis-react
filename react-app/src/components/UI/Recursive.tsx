import styles from '../../styles/Recursive.module.css'

export default function Recursive(props: {message: string, depth: number, maxDepth: number}) {
    return(
        <div className={styles["recursive-component"]}>
            <p> {props.message} {props.depth} </p>
            {props.depth < props.maxDepth && (
                <Recursive
                  message={props.message}
                  depth={props.depth + 1}
                  maxDepth={props.maxDepth}
                />
              )}
        </div>
    )
}