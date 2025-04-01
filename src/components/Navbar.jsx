import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #007bff;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h2`
  color: white;
  margin-left: 20px;
`;

const NavLinks = styled.div`
  margin-right: 20px;
  a {
    color: white;
    margin-left: 15px;
    text-decoration: none;
    font-weight: bold;
  }
`;

function Navbar() {
  return (
    <Nav>
      <Logo>Auth System</Logo>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </NavLinks>
    </Nav>
  );
}

export default Navbar;
