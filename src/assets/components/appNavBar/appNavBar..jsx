import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import "./appNavBar.css";
import FetchCoin from "../FetchCoin/FetchCoin";
import Login from "../Login/Login";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect } from "react";
import Chart from "../../../pages/Show/Chart";
function AppNavBar() {
  const { currentUser, setCurrentUser } = useAuth();


useEffect(()=>{},[currentUser])
  return (
    <>
      <Login />
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src="../../public/pics/coinVerse-tag.png" alt="site-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink to={"/"}>HOME</NavLink>
              <NavLink to={"../../../pages/Show/Chart"}>REAL-TIME CHART</NavLink>
              {currentUser ? (
                <NavLink to={"../../../pages/UserProfile/UserProfile"}>
                  {currentUser.username}'s Portfolio
                </NavLink>
              ) : (
                <span className="disabled-link">Portfolio</span>
              )}
              <NavDropdown title="ADMIN" id="navbarScrollingDropdown">
                <NavLink to="../../../pages/Admin/Admin">
                  {currentUser?.isAdmin && (
                    <NavDropdown.Item href="../../../pages/Admin/Admin">
                      Admin Utilities
                    </NavDropdown.Item>
                  )}
                </NavLink>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <FetchCoin />
    </>
  );
}

export default AppNavBar;

{
  /* <Form className="d-flex">
              <Button variant="outline-success">REGISTER NOW</Button>
            </Form> */
}
