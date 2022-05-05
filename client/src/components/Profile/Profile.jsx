import { HungryMeContext } from "../../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.scss";
import CardMedia from "@mui/material/CardMedia";
import unknown from "../../img/unknown.png";
import { Link } from "react-router-dom";
export default function Profile() {
  const { currentUser } = useContext(HungryMeContext);
  const navigate = useNavigate();
  console.log(currentUser);
  if (!currentUser) navigate("/");
  return (
    <div className="profile-container">
      <div className="profileContainer">
        <h3>
          {currentUser?.businessUser
            ? currentUser.firstName
            : currentUser.username}
          , you have successfully logged in{" "}
        </h3>
        <img
          src={currentUser?.avatar ? currentUser?.avatar : unknown}
          alt="Profile"
        />
        <h2>
          Your name:{" "}
          {currentUser?.businessUser
            ? currentUser?.firstName
            : currentUser?.username}
        </h2>
        <h5>Your email: {currentUser?.email}</h5>
        <h5> {currentUser?.businessUser ? "You are business User !" : null}</h5>
      </div>
      {currentUser?.favorites.length === 0 ? (
        <div>
          <h1>Favorites:</h1> You don't have any favorites yet{" "}
        </div>
      ) : (
        <div className="favContainer">
          <>
            {currentUser?.favorites.map((item, idx) => (
              <div className="favorites" key={idx}>
                <h4>{item.name}</h4>
                <CardMedia
                  component="img"
                  height="50"
                  width="50"
                  image={item.imageURL}
                  alt="Paella dish"
                />
              </div>
            ))}
          </>
        </div>
      )}
    </div>
  );
}
