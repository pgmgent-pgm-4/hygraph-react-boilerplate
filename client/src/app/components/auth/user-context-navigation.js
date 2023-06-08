// Import external modules
import { NavLink as RRNavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, NavbarText, Nav, NavItem, NavLink, UncontrolledDropdown, Button} from 'reactstrap';

// Import custom modules
import * as routes from '../../routes';
import { useAuth } from '../../context/auth.context';

const UserContextNavigation = () => {
  const { currentUser, signOut } = useAuth();

  return (
    <>
      {!!currentUser
        ? (
          <UncontrolledDropdown
            inNavbar
            nav
          >
            <DropdownToggle
              caret
              nav
            >
              {!!currentUser && 
                <span className={`user`}>
                  <span className={`user__avatar`}></span>
                  <span className={`user__username`}>{currentUser.username}</span>
                </span>
              }
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink tag={RRNavLink} to={routes.USER}>Dashboard</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink tag={RRNavLink} to={routes.USER_PROFILE}>Profile</NavLink>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Button onClick={signOut}>Sign out</Button>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
        : (
          <>
            <NavItem>
              <NavLink tag={RRNavLink} to={routes.AUTH_SIGN_IN}>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to={routes.AUTH_SIGN_UP}>Sign Up</NavLink>
            </NavItem>
          </>
        )
      } 
    </>
  )
};

export default UserContextNavigation;
