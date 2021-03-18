import React from "react";
import AuthDialogs from "../../authModal";
import { auth } from "../../firebase";
import { Menu, MenuItem } from "@material-ui/core";
import "./Header.css";
import Avatar from "@material-ui/core/Avatar";

function Header({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <span style={{ fontWeight: "bolder", letterSpacing: "0.3rem" }}>
        DINSTAGRAM
      </span>
      {user ? (
        <div className="header__Right">
          {/* <button className="button" onClick={() => auth.signOut()}>
            
          </button> */}

          <Avatar
            className="header__RightProfileImg"
            onClick={handleClick}
            style={{ height: "25px", width: "25px", textAlign: "center" }}
            src={user?.photoURL && user?.photoURL}
          >
            {!user?.photoURL && user?.displayName?.charAt(0)}
          </Avatar>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <AuthDialogs label="Get Started" />
      )}
    </div>
  );
}

export default Header;
