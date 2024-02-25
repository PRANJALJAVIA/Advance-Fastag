import React, { useEffect, useState } from "react";
import "../style/AddPlace.scss";
import { baseurl } from "../config";

const AddPlace = () => {
  const user_id = localStorage.getItem("userid");
  const [details, setDetails] = useState({
    user_id: user_id,
    coordinates: { latitude: 0, longitude: 0 },
    type: "",
    category: "",
    tag: "",
    description: "",
    place_name: "",
    img_url: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const coordinates = { latitude: latitude, longitude: longitude };
      setDetails((prevState) => {return {...prevState, coordinates:coordinates}});
    });
  }, []);

  const handleSelectOption = (event) => {
    setDetails((prevState) => {
      return { ...prevState, category: event.target.value };
    });
  };

  const handleChange = (e) => {
    setDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const HandleSubmit = async (e) => {
    console.log(details);
    e.preventDefault();

    const response = await fetch(`${baseurl}/api/addlocation`, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var msg;
    const json = await response.json();
    if (!response.ok) {
      msg = json.error;
    } 
    else {
      setDetails({
        user_id: user_id,
        coordinates: { latitude: 0, longitude: 0 },
        type: "",
        category: "",
        tag: "",
        description: "",
        place_name: "",
        img_url: "",
      });
      msg = json;
      if (msg !== "") {
        msg = "Location has been Added Successfully";
        alert(msg);
      }
    }
  };

  const handleOptionChange = (e) => {
    setDetails((prevState) => {
      return { ...prevState, type: e.target.value };
    });
  };

  const options = [
    "Food",
    "Monument",
    "Shopping",
    "Personal",
    "Miscellaneous",
  ];

  return (
    <div className="add_place__container">
      <div className="header">
        <h1>Add Place</h1>
      </div>

      <div className="form__container">
        <form method="post" onSubmit={HandleSubmit} >
          <div className="left__container">
            <input
              type="text"
              name="place_name"
              placeholder="Place name"
              onChange={handleChange}
              value={details.place_name}
            />
            <input
              type="text"
              name="tag"
              placeholder="Tagline"
              onChange={handleChange}
              value={details.tag}
            />

            <div className="radio-buttons">
              <div className="radio-button">
                <input
                  type="radio"
                  value="Public"
                  checked={details.type === "Public"}
                  onChange={handleOptionChange}
                />
                <label htmlFor="public">Public</label>
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  value="Private"
                  checked={details.type === "Private"}
                  onChange={handleOptionChange}
                />
                <label htmlFor="private">Private</label>
              </div>
            </div>

            <label htmlFor="options">Select a category:</label>
            <select
              id="options"
              value={details.category}
              name="category"
              onChange={handleSelectOption}
            >
              <option value="">--select--</option>
              {options.map((option, index) => {
                return <option value={option}>{option}</option>;
              })}
            </select>
           
            <textarea
              placeholder="Description..."
              name="description"
              onChange={handleChange}
              value={details.description}
            ></textarea>

            <button type="submit">Submit</button>
          </div>

          <div className="right__container">
            <div className="file_preview">
              <input
                name="img_url"
                type="file"
                value={details.img_url}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlace;
