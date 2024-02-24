import {createBrowserRouter, RouterProvider} from "react-router-dom";
import DetailsPage from "~/pages/components/DetailsPage.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/details",
      element: <DetailsPage/>
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
