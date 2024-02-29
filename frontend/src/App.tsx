import {createBrowserRouter, RouterProvider} from "react-router-dom";
import DigitalArtPage from "~/pages/components/DigitalArtPage.tsx";
import PhysicalArtPage from "~/pages/components/PhysicalArtPage.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/digital-art",
      element: <DigitalArtPage/>
    },
    {
      path: "/physical-art",
      element: <PhysicalArtPage/>
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
