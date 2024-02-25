import React, { useState } from "react";
import '../style/AddPlace.scss'


const AddPlace = () => {


  return (
    <div className="add_place__container">
      <div className="header">
        <h1>Add Place</h1>
      </div>

      <div className="form__container">
        <form>
          <div className="left__container">
            <input type="text" placeholder="Place name" />
            <input type="text" placeholder="Tagline" />

            <RadioButtons />

            <textarea placeholder="Description..."></textarea>
          </div>

          <div className="right__container">
            <div className="file_preview">
                <input type="file" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
const RadioButtons = () => {
    const [selectedOption, setSelectedOption] = useState("public");
  
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };
  
    return (
      <div className="radio-buttons">
        <div className="radio-button">
          <input
            type="radio"
            value="public"
            checked={selectedOption === "public"}
            onChange={handleOptionChange}
          />
          <label htmlFor="public">Public</label>
        </div>
        <div className="radio-button">
          <input
            type="radio"
            value="private"
            checked={selectedOption === "private"}
            onChange={handleOptionChange}
          />
          <label htmlFor="private">Private</label>
        </div>
      </div>
    );
  };
export default AddPlace;
