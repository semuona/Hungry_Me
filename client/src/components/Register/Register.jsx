import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { HungryMeContext } from "../../Context";
import axios from "axios";
import "./Register.scss";
export default function Register() {
  const {
    businessUser,
    setBusinessUser,
    clientUser,
    setClientUser,
    setCurrentUser,
    currentUser,
  } = useContext(HungryMeContext);
  const [business, setBusiness] = useState(false);
  let history = useNavigate();
  const saveUserToLocal = (user) => {
    const stringUser = JSON.stringify(user);
    localStorage.setItem("authorizedUser", stringUser);
  };
  const handleClient = (e) => {
    e.preventDefault();
    console.log("response is");
    setClientUser({
      ...clientUser,
      id: uuidv4(),
      favorites: [],
      client: true,
      businessUser: business,
      [e.target.name]: e.target.value,
    });
  };
  const handleBusiness = (e) => {
    e.preventDefault();
    console.log("response is");
    setBusinessUser({
      ...businessUser,
      id: uuidv4(),
      favorites: [],
      client: true,
      businessUser: business,
      [e.target.name]: e.target.value,
    });
  };
  const submitClient = async (e) => {
    e.preventDefault();
    const data = clientUser;
    console.log("Submitting !!", data);
    const response = await axios.post("/register", data);
    console.log("response is", response);
    setCurrentUser(response?.data.user);
    saveUserToLocal(response?.data.user);
    history("/profile");
  };
  const submitBusiness = async (e) => {
    e.preventDefault();
    const data = businessUser;
    console.log("Submitting !!", data);
    const response = await axios.post("/register", data);
    console.log("response is", response);
    setCurrentUser(response?.data.user);
    saveUserToLocal(response?.data.user);
    history("/profile");
  };
  return (
    <div className="registerForm">
      <div>
        <h1>User Registration</h1>
      </div>
      <div className="radioContainer">
        <div>
          <label htmlFor="">Client</label>
          <input
            type="radio"
            value="client"
            name="gender"
            defaultChecked
            onChange={() => {
              setBusiness(false);
            }}
          />
        </div>
        <div className="owner">
          <label htmlFor="">Business owner</label>
          <input
            type="radio"
            value="business"
            name="gender"
            onChange={() => {
              setBusiness(true);
            }}
          />
        </div>
      </div>
      {!business ? (
        <form className="clientForm">
          <div>
            <label className="label">Name</label>
            <input
              onChange={handleClient}
              className="input"
              name="username"
              type="text"
              id="name"
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              onChange={handleClient}
              className="input"
              type="email"
              name="email"
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              onChange={handleClient}
              className="input"
              type="password"
              name="password"
            />
          </div>
          <button className="btn" type="submit" onClick={submitClient}>
            Submit
          </button>
        </form>
      ) : (
        <>
          <form className="businessForm">
            <div>
              <label className="label">First Name</label>
              <input
                onChange={handleBusiness}
                type="text"
                name="firstName"
                id="neighbor"
              />
            </div>
            <div>
              <label className="label">Last name</label>
              <input
                type="text"
                name="lastName"
                id="cuisine"
                onChange={handleBusiness}
              />
            </div>
            <div>
              <label className="label">User Name</label>
              <input
                onChange={handleBusiness}
                type="text"
                name="username"
                id="neighbor"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                onChange={handleBusiness}
                className="input"
                type="email"
                name="email"
              />
            </div>
            <div>
              <label className="label">City</label>
              <input
                onChange={handleBusiness}
                type="text"
                name="city"
                id="address"
              />
            </div>
            <div>
              <label className="label">Phone number</label>
              <input
                onChange={handleBusiness}
                type="text"
                name="phoneNumber"
                id="address"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                onChange={handleBusiness}
                className="input"
                type="password"
                name="password"
              />
            </div>
            <button className="btn" type="submit" onClick={submitBusiness}>
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
