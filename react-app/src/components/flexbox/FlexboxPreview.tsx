import { useAppSelector } from "../../store/hooks";

import styles from '../../styles/flexbox/FlexboxPreview.module.css'

export default function FlexboxPreview() {
  const content = useAppSelector(state => state.flexbox.content);
  return (
    <div className={styles.preview}>
      {content.map((element) => {
        return (
          <div key={element.id}>
            <p>{element.id}</p>
          </div>
        );
      })}
    </div>
  );
}
