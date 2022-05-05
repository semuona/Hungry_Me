import "./App.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Register from "./components/Register/Register";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import BusinessUser from "./components/BusinessUser/BusinessUser"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/businessuser" element={<BusinessUser />}></Route>

      </Routes>
    </div>
  );
}

export default App;
