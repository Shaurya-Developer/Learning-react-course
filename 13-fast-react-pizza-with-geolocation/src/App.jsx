import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, // for error handling, if any error occurs then we show this element, if any children element gets error then that error will bubble up and will be catched from parent element and we show this error element
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader, // for fetching data we use loader
        errorElement: <Error />, // this child is loading data so error can occur, and if we only use the parent's errorElement then it will show error in the whole page but by specifying it here we will get error inside AppLayout, so every child error will bubble up to parent unless we specify errorElement in child component
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction, // so when form will be submitted in this path, this action will be called
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]); // we pass array of routes and each item(object) is a route, with createBrowserRouter we can enable data fetching and data loading with react-router only
// AppLayout is the parent component of the entire page and other are its children, AppLayout will not have any path and in react it is known as Layout component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
