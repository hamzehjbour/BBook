import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineUsers,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-7);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const NavBasedOnRole = {
  admin: [
    <li key="appointments">
      <StyledNavLink to="/appointments">
        <HiOutlineCalendarDays />
        <span>Appointments</span>
      </StyledNavLink>
    </li>,
    <li key="services">
      <StyledNavLink to="/services">
        <HiOutlineBriefcase />
        <span>Services</span>
      </StyledNavLink>
    </li>,
    <li key="users">
      <StyledNavLink to="/staff">
        <HiOutlineUsers />
        <span>Users</span>
      </StyledNavLink>
    </li>,
  ],

  receptionist: [
    <li key="appointments">
      <StyledNavLink to="/appointments">
        <HiOutlineCalendarDays />
        <span>Appointments</span>
      </StyledNavLink>
    </li>,
    <li key="services">
      <StyledNavLink to="/services">
        <HiOutlineBriefcase />
        <span>Services</span>
      </StyledNavLink>
    </li>,
  ],
};

function MainNav() {
  const [user] = useLocalStorageState({}, "user");

  const navItems = NavBasedOnRole[user?.user?.role] || [];

  return (
    <nav>
      <NavList>{navItems}</NavList>
    </nav>
  );
}

export default MainNav;
