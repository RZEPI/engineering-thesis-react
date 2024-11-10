import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TablePage from "./pages/TablePage";
import GridPage from "./components/GridPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "TablePage", element: <TablePage /> },
      { path: "GridPage", element: <GridPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
