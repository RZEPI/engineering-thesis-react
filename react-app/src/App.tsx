import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router.tsx";

const newRouter = router;

function App() {
  return <RouterProvider router={newRouter}></RouterProvider>;
}

export default App;
