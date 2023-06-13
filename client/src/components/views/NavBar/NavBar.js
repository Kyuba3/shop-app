import { Navbar, Nav, NavbarBrand } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from "../../../redux/usersRedux";
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import CartCounter from "../../features/CartCounter/CartCounter";

const NavBar = () => {

  const user = useSelector(getUser);

  return (
    <Navbar bg="dark" variant='dark' expand="lg" className="mt-4 mb-4 rounded d-flex justify-content-between">
      <NavbarBrand className="justify-content-start px-3">
        <NavLink to="/" className={styles.nav_links}>
          ShopAPP
        </NavLink>
      </NavbarBrand>
        <Nav className="flex-sm-column flex-md-row px-3">
          <ul className={styles.nav_links}>
            <li>
              <NavLink
                className={({ isActive }) =>
                isActive ? styles.linkActive : undefined
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              {!user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.linkActive : undefined
                  }
                  to="/login"
                  >
                    Sign in
                </NavLink>
              )}
            </li>
            <li>
              {!user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.linkActive : undefined
                  }
                  to="/register"
                  >
                    Register
                </NavLink>
              )}
            </li>
            <li>
              {user && (
                <NavLink
                  className={({ isActive }) =>
                      isActive ? styles.linkActive : undefined
                  }
                  to="/logout"
                  >
                    Logout
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                className={({ isActive }) => 
                  isActive ? styles.linkActive : undefined
                }
                to="/cart"
                >
                <FontAwesomeIcon className={styles.icon} icon={faShoppingBasket} />
              </NavLink>
            </li>
            <li>
              <CartCounter />
            </li>
        </ul>    
      </Nav>
    </Navbar>
  )
}

export default NavBar;