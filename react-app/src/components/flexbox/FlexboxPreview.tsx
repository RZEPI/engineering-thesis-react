import { useContext } from "react";
import { FlexboxElement } from "../../models/flexbox-generator/FlexboxElement";
import {
  flexboxContent,
  flexboxStyles,
  FlexboxContext,
} from "../../store/flexboxContext";

import styles from "../../styles/flexbox/FlexboxPreview.module.css";

export default function FlexboxPreview() {
  const { state:flexboxState, removeElement } = useContext(FlexboxContext);
  const content = flexboxContent(flexboxState);
  const containerStyles = flexboxStyles(flexboxState);
  return (
    <div className={styles.preview} style={containerStyles}>
      {content.map((element: FlexboxElement) => {
        return (
          <div
            key={element.id}
            style={{ backgroundColor: element.color }}
            onClick={() => removeElement(element.id)}
          >
            <p>{element.id}</p>
          </div>
        );
      })}
    </div>
  );
}
