import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
// while using we should not directly use className as string but instead name of styles module then dot followed by className
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
          {/* <Link to="/product">Product</Link> */}
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
// benifit of NavLink over Link is that with NavLink we get a class of active automatically to active page which we can use that later

export default PageNav;
