import { CodeListing } from "../components/CodeListing";
import FlexboxPreview from "../components/flexbox/FlexboxPreview";
import FlexboxForm from "../components/flexbox/form/FlexboxForm";
import Layout from "../components/UI/Layout";
import { flexboxStyles } from "../store/flexbox";
import { useAppSelector } from "../store/hooks";

import styles from "../styles/flexbox/FlexboxPage.module.css";

export default function FlexboxPage() {
  const flexClasses = useAppSelector(flexboxStyles);

  return (
    <Layout title="Flexbox Testing">
      <div className={styles["main-container"]}>
        <FlexboxPreview />
        <FlexboxForm />
      </div>
      <CodeListing cssProps={flexClasses}></CodeListing>
    </Layout>
  );
}
