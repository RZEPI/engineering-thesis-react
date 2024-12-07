import { lazy, Suspense } from "react";
import { CodeListing } from "../components/CodeListing";
import FlexboxForm from "../components/flexbox/form/FlexboxForm";
import Layout from "../components/UI/Layout";
import { flexboxStyles } from "../store/flexbox";
import { useAppSelector } from "../store/hooks";

import styles from "../styles/flexbox/FlexboxPage.module.css";
import LoadingFallback from "../components/UI/LoadingFallback";

const FlexboxPreview = lazy(
  () => import("../components/flexbox/FlexboxPreview"),
);

export default function FlexboxPage() {
  const flexClasses = useAppSelector(flexboxStyles);

  return (
    <Layout title="Flexbox Testing">
      <div className={styles["main-container"]}>
        <Suspense fallback={<LoadingFallback />}>
          <FlexboxPreview />
        </Suspense>
        <FlexboxForm />
      </div>
      <CodeListing cssProps={flexClasses}></CodeListing>
    </Layout>
  );
}
