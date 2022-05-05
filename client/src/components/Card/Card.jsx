import "./Card.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { HungryMeContext } from "../../Context";
import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CardItem({ item, cb }) {
  const { currentUser, imageURL, setImage } = useContext(HungryMeContext);
  let toggled = false;

  //--------------MODAL--------------------
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //--------------MODAL--------------------

  //for each favorite item of currentUser we set toggled = true, to set the color of heartIcon red
  currentUser.favorites?.forEach((favItem) => {
    if (item.id === favItem.id) {
      toggled = true;
    }
    return;
  });

  return (
    <Card sx={{ maxWidth: 345 }} className="cardContainer">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.name[0]}
          </Avatar>
        }
        title={item.name}
        subheader={item.cuisine_type}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.imageURL}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Address: {item.address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => cb(item)}
          className={toggled ? "text-danger" : ""}
        >
          <FavoriteIcon fontSize="large" />
        </IconButton>
      </CardActions>
      <>
        <Button className="modalButton" variant="danger" onClick={handleShow}>
          What's on the Menu? <RestaurantIcon />
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {item.name}{" "}
              <IconButton
                aria-label="add to favorites"
                onClick={() => cb(item)}
                className={toggled ? "text-danger" : ""}
              >
                <FavoriteIcon />
              </IconButton>
            </Modal.Title>
          </Modal.Header>{" "}
          <Modal.Body> </Modal.Body>
          {item.menu?.map((item) => (
            <div className="modalMenuContainer">
              <h5>
                {item.id}. {item.meal}
              </h5>
              <p>
                {item.price} <ShoppingCartIcon className="cartIcon" />
              </p>
            </div>
          ))}
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Card>
  );
}
