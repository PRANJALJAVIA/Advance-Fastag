import React from "react";
import "../style/Components.scss";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();

  return (
    <div className="card__container">
      <div className="image__container">
        <img src={"https://a0.muscache.com/im/pictures/miso/Hosting-13903824/original/82d996fb-d7c4-46a8-a713-febd281cd69f.jpeg?im_w=720"} alt="ddu" />
      </div>

      <div className="card__header">
        <h3>Romantic spot</h3>
      </div>

      <div className="card__description">
        <p>lasj fljoiteldkfj ljoijejlasjdf oiejlkjsdf ioejfjlksd foiajefodklfj aoiefjojaodslkf weo</p>
      </div>

      <div className="card__button">
        <button onClick={() => navigate(`/site`)}>Get Direction</button>
      </div>
    </div>
  );
};

export default Card;
