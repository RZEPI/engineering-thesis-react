import { FlexboxElement } from "../../models/flexbox-generator/FlexboxElement";
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
      {content.map((element: FlexboxElement) => {
        return (
          <div
            key={element.id}
            style={{ backgroundColor: element.color }}
            onClick={() => dispatch(flexboxActions.removeElement(element.id))}
          >
            <p>{element.id}</p>
          </div>
        );
      })}
    </div>
  );
}
