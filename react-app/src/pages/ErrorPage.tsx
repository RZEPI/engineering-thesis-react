import { useRouteError, ErrorResponse, Link } from "react-router-dom";
import RootLayout from "./RootLayout";

import styles from "../styles/ErrorPage.module.css";

export default function ErrorPage() {
  const error: ErrorResponse = useRouteError() as ErrorResponse;
  const homePageLink = <Link to="/">home page</Link>;
  let content = (
    <div>
      <h1>Unknown Error</h1>
      <p>Unknown error occured, go to {homePageLink}.</p>
    </div>
  );

  if (error.status === 404)
    content = (
      <div>
        <h1>Not Found</h1>
        <p>Page was not found, go to {homePageLink}.</p>
      </div>
    );
  else if (error.status === 500)
    content = (
      <div>
        <h1>Internal Server Error</h1>
        <p>Internal server error occured, go to {homePageLink}.</p>
      </div>
    );

  return (
    <RootLayout>
      <main className={styles["error-container"]}>{content}</main>
    </RootLayout>
  );
}
