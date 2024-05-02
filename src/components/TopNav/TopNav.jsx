import React, { useEffect, useState } from "react";
import { topNav } from "../../Styles/Styles";
import {
  Typography,
  Box,
  MenuItem,
  Select,
  Menu,
  ImageList,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import "./topnav.css";

export const Users = [
  { firstName: "John", lastName: "Doe" },
  { firstName: "Mariya", lastName: "Sada" },
  { firstName: "Rahul", lastName: "Misra" },
];

const TopNav = ({ options, selectedApp, setSelectedApp }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(Users[0]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setSelectedApp(options[0]);
  }, [options]);

  const handleOpenMenu = (event, name) => {
    if (name === "menu") {
      setAnchorEl(event.currentTarget);
    } else {
      setUser(event.currentTarget);
    }
  };

  const handleCloseMenu = (name) => {
    if (name === "menu") {
      setAnchorEl(null);
    } else {
      setUser(null);
    }
  };

  const handleChange = (option) => {
    setSelectedApp(option);
    handleCloseMenu();
  };

  const handleUserChange = (option) => {
    console.log(option, "check");
    setSelectedUser(option);
    handleCloseMenu();
  };

  return (
    <Box sx={{ ...topNav }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        height="38px"
        width="173px"
        cursor="poineter"
        onClick={(e) => handleOpenMenu(e, "menu")}
      >
        <Typography variant="body1">{"Applications"}</Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          {selectedApp?.name}
          <IoIosArrowDown className={"icon"} />
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={(e) => handleCloseMenu("menu")}
        sx={{ marginTop: "10px" }}
      >
        {options?.length > 0 &&
          options?.map((option) => (
            <MenuItem key={option.name} onClick={() => handleChange(option)}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Typography variant="caption">{option.name}</Typography>
              </Box>
            </MenuItem>
          ))}
      </Menu>
      {/*  user menu with john doe */}
      <Box
        sx={{
          width: "940px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: "4rem",
          cursor: "pointer",
          gap: "8px",
        }}
      >
        <img
          src={`https://avatar.iran.liara.run/username?username=${selectedUser?.firstName.substring(
            0,
            1
          )}${selectedUser?.lastName.substring(0, 1)}`}
        />
        <Typography variant="body1">
          {selectedUser.firstName} {"  "}
          {selectedUser.lastName}
        </Typography>
        <IoIosArrowDown
          onClick={(e) => handleOpenMenu(e, "user")}
          className="icon"
        />
      </Box>
      <Menu
        anchorEl={user}
        open={Boolean(user)}
        onClose={(e) => handleCloseMenu("user")}
        sx={{ marginTop: "10px" }}
      >
        {Users?.length > 0 &&
          Users?.map((option) => (
            <MenuItem
              key={option.name}
              onClick={() => handleUserChange(option)}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Typography variant="body1">
                  {option.firstName} {option?.lastName}
                </Typography>
              </Box>
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default TopNav;
