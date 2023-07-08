import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation(); // useNavigation is used for knowing loading or submitting, this is for the entire router, if one page is loading anywhere then navigation is set to loading
  //   console.log(navigation); // {state: 'idle', location: undefined, formMethod: undefined, formAction: undefined, formEncType: undefined,…}, so when we make fetch request state will be set to loading
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* {true && <Loader />} */}
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
          {/* AppLayout is parent component so its child component will be rendered in the place Outlet is used  */}
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
// grid-rows-[auto_1fr_auto] means 3 rows 1. auto(based on content) 2. 1fr (take rest of height) 3. auto
