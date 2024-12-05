import { lazy, Suspense } from "react";
import CodeListing from "../components/flexbox/CodeListing";
import FlexboxForm from "../components/flexbox/form/FlexboxForm";
import Layout from "../components/UI/Layout";

import styles from "../styles/flexbox/FlexboxPage.module.css";
import LoadingFallback from "../components/UI/LoadingFallback";

const FlexboxPreview = lazy(
  () => import("../components/flexbox/FlexboxPreview"),
);

export default function FlexboxPage() {
  return (
    <Layout title="Flexbox Testing">
      <div className={styles["main-container"]}>
        <Suspense fallback={<LoadingFallback />}>
          <FlexboxPreview />
        </Suspense>
        <FlexboxForm />
      </div>
      <CodeListing />
    </Layout>
  );
}
