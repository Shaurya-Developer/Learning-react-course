import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-4  uppercase sm:px-6">
      <Link className="tracking-[5px]" to={"/"}>
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;

//  To set own defined size of letter spacing , font size we can use escape hatch, eg for letter spacing we can do tracking-[5px]
