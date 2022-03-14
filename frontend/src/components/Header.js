import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <header>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            Ask It
          </Link>
          <Nav className="ml-auto" variant="dark">
            {userInfo && userInfo.token ? (
              <>
                <Link to="/my-questions" className="nav-link">
                  My Questions
                </Link>

                <Link to="/my-profile" className="nav-link">
                  My Profile
                </Link>

                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Log Out
                </Link>
              </>
            ) : (
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="mx-2"
                />
                Sign In
              </Link>
            )}
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
