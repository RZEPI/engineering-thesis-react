import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TablePage from "./pages/TablePage";
import { useEffect } from "react";
import { ResultTable } from "./static/RandomDataTables";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
    errorElement: <ErrorPage />,
  },
  {
    path: "/TablePage",
    element: <RootLayout />,
    children: [{ index: true, element: <TablePage /> }],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
