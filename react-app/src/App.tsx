import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import FlexboxPage from "./pages/FlexboxPage";
import TablePage from "./pages/TablePage";
import RecursivePage from "./pages/RecursivePage.tsx";
import AnimationPage from "./pages/AnimationPage";
import GridPage from "./components/GridPage";
import CachePage from "./pages/CachePage";

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
      { path: "/cache", element: <CachePage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
