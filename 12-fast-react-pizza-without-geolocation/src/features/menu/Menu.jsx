import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
function Menu() {
  const menu = useLoaderData(); // custom hook for getting data from loader which is passed in routes, it is render as you fetch technique
  // React-Router will fetch the data in the same time as it start rendering the correct route
  // while using useEffect it was always Fetch on render, so we render the component first and then start fetching data, so it creates data loading waterfalls but not here
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  // This function can be placed anywhere, main thing is to provide this function in route where it will be used
  const menu = await getMenu();
  return menu;
} //fetch data and return it

export default Menu;
