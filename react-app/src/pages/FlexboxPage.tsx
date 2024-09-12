import CodeListing from "../components/flexbox/CodeListing";
import FlexboxPreview from "../components/flexbox/FlexboxPreview";
import FlexboxForm from "../components/flexbox/form/FlexboxForm";
import Layout from "../components/UI/Layout";

import styles from "../styles/flexbox/FlexboxPage.module.css";

export default function FlexboxPage() {
  return (
    <Layout title="Flexbox Testing">
      <div className={styles["main-container"]}>
        <FlexboxPreview />
        <FlexboxForm />
      </div>
      <CodeListing />
    </Layout>
  );
}
