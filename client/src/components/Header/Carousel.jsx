import React from "react";
import { Carousel } from "react-bootstrap";
import "./header.scss";
import Bike from "../../img/bike.jpg";
import Burgers from "../../img/burgers.jpg";
import Delivery from "../../img/table.jpg";

export default function CarouselHeader(props) {
  let carImages = [
    "https://restaurantpassiflore.com/wp-content/uploads/2021/10/Apps-For-Food-Delivery0.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh4NEcHdwuMxtYAZqHH2VHr0NccAQQ0jvfSA&usqp=CAU",
    "https://www.trendlink.com/staticasset/TrendImage/Dim3to1/food-delivery.jpg",
    "https://www.morganstanley.com/content/dam/msdotcom/ideas/food-delivery-apps-investing/tw-food-delivery.jpg",
  ];

  return (
    <div className="carouselBlock">
      <Carousel fade>
        <Carousel.Item>
          <div
            className="d-block w-100"
            style={{
              backgroundImage: `url("${Bike}")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {" "}
          </div>
          <Carousel.Caption>
            <h3 style={{ color: "white" }}>HungryMe</h3>
            <p>So you never stay hungry!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-block w-100"
            style={{
              backgroundImage: `url("${Burgers}")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {" "}
          </div>

          <Carousel.Caption>
            <h3>This week get 10% off</h3>
            <p>Don't miss out!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-block w-100"
            style={{
              backgroundImage: `url("${Delivery}")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {" "}
          </div>

          <Carousel.Caption>
            <h3 style={{ color: "white", fontSize: "40px" }}>
              Safe and fast delivery to your home
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
