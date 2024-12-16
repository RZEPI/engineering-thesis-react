import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import GridPage from "./components/GridPage";
import FlexboxPage from "./pages/FlexboxPage";
import TablePage from "./pages/TablePage";
import RecursivePage from "./pages/RecursivePage";
import AnimationPage from "./pages/AnimationPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/grid", element: <GridPage /> },
      { path: "/flexbox", element: <FlexboxPage /> },
      { path: "/table", element: <TablePage /> },
      { path: "/recursive-rendering", element: <RecursivePage /> },
      { path: "/animation", element: <AnimationPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;