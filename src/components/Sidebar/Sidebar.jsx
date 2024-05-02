import React, { useState } from "react";

import KapstanLogo from "../../assets/KapstanLogo";
import { IoIosLink } from "react-icons/io";
import { Box, Divider, TextField, Typography } from "@mui/material";
import {
  SidebarStyle,
  optionStyle,
  selectedOption,
  collapsedSidebar,
  paddingClass,
  marginLeft,
} from "../../Styles/Styles";
import "./Sidebar.css";
import { LuUser2 } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { RxDoubleArrowLeft } from "react-icons/rx";

const adminOption = [
  {
    name: "Admin",
    icon: <LuUser2 />,
  },
  {
    name: "Docs",
    icon: <CiBookmark />,
  },
];
const Sidebar = ({ options, selectedOpt, setSelectedOpt }) => {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <Box sx={isCollapse ? { ...collapsedSidebar } : { ...SidebarStyle }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "11px",
          width: "220px",
          height: "44px",
          padding: isCollapse ? "18px" : "16px 16px 16px 24px",
        }}
        onClick={() => setIsCollapse((prev) => !prev)}
      >
        <KapstanLogo />
        {!isCollapse && (
          <Box sx={{}} onClick={() => setIsCollapse((prev) => !prev)}>
            <Typography variant="h6" sx={{ color: "white" }}>
              Kapstan
            </Typography>
          </Box>
        )}
      </Box>
      <Divider sx={{ height: "1px", background: "#4D1B95" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        {options?.map((option) => (
          <>
            <Box
              key={option?.name}
              sx={
                option?.name === selectedOpt?.name
                  ? isCollapse
                    ? { ...optionStyle, ...selectedOption, ...paddingClass }
                    : { ...optionStyle, ...selectedOption }
                  : isCollapse
                  ? { ...optionStyle, ...marginLeft }
                  : { ...optionStyle }
              }
              onClick={() => setSelectedOpt(option)}
            >
              {option?.icon}{" "}
              {!isCollapse && <p style={{ width: "57%" }}>{option?.name}</p>}
              {option?.name === "Security" && !isCollapse && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    background: "#6E27D5",
                    height: "22px",
                    width: "42px",
                    borderRadius: "2px",
                    padding: "2px 8px",
                    right: "20px",
                    top:
                      selectedOpt?.name === "Security" ? "18.2rem" : "18.8rem",
                  }}
                >
                  <Typography>Beta</Typography>
                </Box>
              )}
            </Box>
            {(option?.name === selectedOpt?.name ||
              option?.name === "Security") && (
              <Divider
                sx={{
                  height: "1px",
                  background: "#4D1B95",
                  marginTop: "4.5px",
                }}
              />
            )}
          </>
        ))}
      </Box>
      <Box sx={{ marginTop: "27rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          {adminOption?.map(({ name, icon }) => (
            <>
              <Box
                key={name}
                sx={
                  isCollapse
                    ? { ...optionStyle, ...marginLeft, ...paddingClass }
                    : { ...optionStyle }
                }
              >
                {icon} {!isCollapse && <p style={{ width: "57%" }}>{name}</p>}
              </Box>
              {name === "Docs" && (
                <Divider
                  sx={{
                    height: "1px",
                    background: "#4D1B95",
                    marginTop: "4.5px",
                  }}
                />
              )}
            </>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            paddingLeft: isCollapse ? "1.5rem" : "2.3rem",
            width: "100%",
            marginTop: "14px",
            cursor: "pointer",
          }}
        >
          <RxDoubleArrowLeft />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
