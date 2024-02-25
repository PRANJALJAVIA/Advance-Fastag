import React, { useState } from "react";
import "../style/Components.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  
  return (
    <>
      <div className="navbar__Heading">
        <div className="navbar__logo_Name">Travel Tracker</div>
        <div className="navbar__navigation">
          <div className="navbar__profile">
            <button className="navbar__profile_button">
              <AccountCircleIcon />
            </button>
          </div>

          <div className="navbar__icon">
            {/* {!isNavbarActive ? (
              <MenuIcon onClick={() => setIsNavbarActive(!isNavbarActive)} />
            ) : (
              <CloseIcon onClick={() => setIsNavbarActive(!isNavbarActive)} />
            )} */}
          </div>
        </div>
      </div>

      {/* {isNavbarActive && (
        <div className="navbar_home_screen">
          <div className="menu_items">
            <button onClick={() => navigate("/add-site")}>Add site</button>
            <button onClick={() => navigate("/add-contractor")}>
              Add contractor
            </button>
            <button onClick={() => navigate("/assign-contractor")}>
              Assign contractor
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Navbar;
