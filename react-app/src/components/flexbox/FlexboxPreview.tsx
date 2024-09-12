import {
  flexboxContent,
  flexboxStyles,
  flexboxActions,
} from "../../store/flexbox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import styles from "../../styles/flexbox/FlexboxPreview.module.css";

export default function FlexboxPreview() {
  const content = useAppSelector(flexboxContent);
  const containerStyles = useAppSelector(flexboxStyles);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.preview} style={containerStyles}>
      {content.map((element) => {
        return (
          <div
            key={element.id}
            onClick={() => dispatch(flexboxActions.removeElement(element.id))}
          >
            <p>{element.id}</p>
          </div>
        );
      })}
    </div>
  );
}
