import { useContext } from "react";
import { HungryMeContext } from "../../Context";
import Card from "../Card/Card";
import Header from "../Header/Header";
import axios from "axios";
import CarouselHeader from "../Header/Carousel";

export default function Main() {
  const { setCurrentUser, currentUser, filtered } = useContext(HungryMeContext);

  const addToFav = async (item) => {
    //adding a new restaurant to favorite array
    currentUser.favorites?.push(item);

    //splitting request so we can pass a restaurant object
    // and currentUser Id to backend
    let request = {
      item: item,
      currentUserId: currentUser.id,
    };

    const response = await axios.post("/toggle_favorites", request);
    console.log("response from main is", response);

    //updating currentUser from backend
    setCurrentUser(response.data.client);
  };

  return (
    <div className="mainContainer">
      <h1>Restaurants</h1>
      <Header />
      <CarouselHeader />
      <div className="cardContainer">
        {filtered.map((item) => (
          <Card item={item} key={item.id} cb={() => addToFav(item)} />
        ))}
      </div>
    </div>
  );
}
