import React from "react";
import "./logIn.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useContext, useState, useEffect } from "react";
import { HungryMeContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogIn() {
  const {
    clientUserArray,
    setClientUserArray,
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(HungryMeContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const clientUserResponse = await axios.get("/clientUsers");
      console.log("client array response is******", clientUserResponse);
      setClientUserArray(clientUserResponse.data);
    };
    getData();
  }, [setClientUserArray]);

  console.log(" all clients are:", clientUserArray);

  const authorizeUser = (username, password) => {
    return clientUserArray.find(
      (user) => user.username === username && user.password === password
    );
  };

  const saveUserToLocal = (user) => {
    const stringUser = JSON.stringify(user);
    localStorage.setItem("authorizedUser", stringUser);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = authorizeUser(username, password);
    if (user) {
      setCurrentUser(user);
      saveUserToLocal(user);
      setIsLoggedIn(true);
      console.log("is user logged in?", isLoggedIn);
      setIsInvalid(false);

      console.log("current user is ----------------", currentUser);
    } else {
      setIsInvalid(true);
      setIsLoggedIn(false);
    }
  };

  //prevent logIn component if user is authorized
  const navigate = useNavigate();
  if (currentUser.username) navigate("/profile");

  return (
    <Box
      className="logInModal"
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <span style={{ visibility: isInvalid ? "visible" : "hidden" }}>
          Username or Password are invalid!
        </span>
      </div>
      <Button variant="contained" onClick={handleSubmit}>
        Log In
      </Button>
    </Box>
  );
}
