import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { HungryMeContext } from "../../Context";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LogIn from "../LogIn/LogIn";
import { useNavigate } from "react-router-dom";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import unknown from "../../img/unknown.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Header() {
  const { menu, setMenu, currentUser, setFiltered } =
    useContext(HungryMeContext);

  useEffect(() => {
    const getData = async (name) => {
      const response = await axios.get("/restaurant");
      console.log(response);
      setMenu(response.data);
      setFiltered(response.data);
    };
    getData();
  }, []);
  console.log(menu);
  const [inputValue, setInputValue] = useState("");

  //Search filter
  const handleChange = (e) => {
    setInputValue(e.target.value);
    const currentMenu = [...menu];
    if (inputValue.length !== 0) {
      const filteredMenu = currentMenu.filter((item) => {
        return item.name.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFiltered([...filteredMenu]);
    } else {
      setMenu([...menu]);
    }
    //console.log("filtered menu", filteredMenu);
  };
  /* MODAL----------------- */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /* MODAL----------------- */

  //NAVIGATOR
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authorizedUser");
    navigate("/");
    window.location.reload(true);
  };
  const showProfile = () => {
    navigate("/profile");
  };

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="danger"
        variant="dark"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="/">
            {" "}
            <LocalDiningIcon />
            HungryMe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button variant="light" onClick={handleChange}>
                Search
              </Button>
            </Form>

            <Nav className={currentUser.username ? "invisible" : "visible"}>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link onClick={handleOpen}>Log In</Nav.Link>
              <Modal
                open={open}
                onClose={currentUser.username ? handleClose : handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="logInModal" sx={style}>
                  <LogIn />
                </Box>
              </Modal>
            </Nav>
            <Nav className={currentUser.username ? "visible" : "invisible"}>
              <Image
                onClick={showProfile}
                src={currentUser.avatar ? currentUser.avatar : unknown}
                roundedCircle
                width={50}
                height={50}
                alt="profile"
                style={{ cursor: "pointer" }}
              />
              <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
