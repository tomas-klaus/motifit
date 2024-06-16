import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiLogout } from "@mdi/js";
import logoImage from "./logo.png";

function NaviBar() {
  const { userList, loggedInUser, userHandlerMap } = useContext(UserContext);

  return (
    <Navbar expand="md" bg="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoImage}
            alt="Logo"
            style={{ width: "50px", height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {" "}
            <Nav.Link as={Link} to="/activities">
              +
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          </Nav>
          <Nav>
            {" "}
            <NavDropdown
              title={loggedInUser ? loggedInUser.username : "Log in"}
              drop="start"
            >
              {getUserMenuList({ userList, loggedInUser, userHandlerMap })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function getUserMenuList({ userList, loggedInUser, userHandlerMap }) {
  const userMenuItemList = userList.map((user) => (
    <NavDropdown.Item key={user.id} onClick={() => userHandlerMap.login(user.id)}>
      {user.username}
    </NavDropdown.Item>
  ));

  if (loggedInUser) {
    userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
    userMenuItemList.push(
      <NavDropdown.Item
        key={"logout"}
        onClick={() => userHandlerMap.logout()}
        style={{ color: "red" }}
      >
        <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Log out"}
      </NavDropdown.Item>
    );
  }

  return userMenuItemList;
}

export default NaviBar;
