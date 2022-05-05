import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { HungryMeContext } from "../../Context";
import axios from "axios";
import "./business.scss";
import { useNavigate } from "react-router-dom";

export default function BusinessUser() {
    const navigate = useNavigate()

  const { menu, setMenu, imageURL, setImage } =
    useContext(HungryMeContext);
  const [name, setName] = useState("");
  const [neigborhood, setNeigborhood] = useState("");
  const [address, setAddress] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [id, setId] = useState(uuidv4());

 


  const submitMenu = async (e) => {
    e.preventDefault();

    setMenu({
        ...menu,
        id: uuidv4(),
        name: name,
        neigborhood: neigborhood,
        address: address,
        cuisine_type: cuisine,
        imageURL : imageURL
      });
      
    const data = {id,name, neigborhood,address,cuisine, imageURL };
    
    const response = await axios.post("/addMenu", data);
    console.log("response from menu", response);
    navigate("/")

  };
  return (
    <div className="RestaurantForm">
      <div className="title">
        <h1>New Restaurant Form</h1>
      </div>
      <div>
      <form className="form">
        <input
        value={name}
          onChange={(e)=>setName(e.target.value)}
          className="input"
          name="name"
          type="text"
          id="name"
          placeholder="Restaurant Name"
          required
          
        />
        <input
        value={neigborhood}
          onChange={(e)=>setNeigborhood(e.target.value)}
          className="input"
          name="Neighborhood"
          type="text"
          id="neighborhood"
          placeholder="Neigborhood"
          required
        />
        <input
        value={address}
          onChange={(e)=>setAddress(e.target.value)}
          className="input"
          type="address"
          name="address"
          placeholder="Address"
          required

        />
        <input
        value={cuisine}
          onChange={(e)=>setCuisine(e.target.value)}
          className="input"
          type="cuisine"
          name="cuisine"
        placeholder="Cuisine Type"
        required
        />
        <input
         onChange={(e)=>{setImage(URL.createObjectURL(e.target.files[0]))}}
        className="input"
          type="file"
          name="image"
          required
        />
       <button className="btn btn-danger" type="submit" onClick={submitMenu}>
              Submit
            </button>
      </form>
      </div>
    </div>
  );
}
