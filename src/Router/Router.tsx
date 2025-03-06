import { RouterProvider, createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import { routePaths, EAppRoutes } from "./config";
import News from "../News/News";
import ModalContextProvider from "../Context/Context";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: routePaths[EAppRoutes.MAIN],
      element: <Layout key="Layout" />,
      children: [
        {
          path: routePaths[EAppRoutes.NEWS],
          element: [
            <ModalContextProvider>
              <News key="News" />
            </ModalContextProvider>,
          ],
        },
      ],
    },
  ]);
  return (
    <div className="app">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};
