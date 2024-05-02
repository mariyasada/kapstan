import { Container, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CustomizedTabs } from "../Tabs/Tabs";
import { FiMonitor } from "react-icons/fi";
import { LuAlertTriangle, LuWrench } from "react-icons/lu";
import { FaClockRotateLeft } from "react-icons/fa6";
import { renderComponent } from "../../utils";

export const TabsOptions = [
  { name: "Overview", Icon: FiMonitor },
  { name: "Environment Variables", Icon: LuWrench },
  { name: "Alerts", Icon: LuAlertTriangle },
  { name: "Event History", Icon: FaClockRotateLeft },
];
const Landingpage = ({ selectedOption }) => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "auto",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        width: "98%",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", height: "26px" }}>
        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", lineHeight: "26px", fontSize: "1.5rem" }}
          >
            {selectedOption?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            width: "95px",
            alignItems: "center",
            marginRight: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              border:
                selectedOption?.status !== "deployed"
                  ? "1px solid gray"
                  : "1px solid #00B88C",
              fontSize: "14px",
              color:
                selectedOption?.status !== "deployed" ? " gray" : "#00B88C",
              borderRadius: "4px",
              padding: "3px 8px 3px 4px",
              background:
                selectedOption?.status !== "deployed" ? "white" : "#f0fcf9",
            }}
          >
            <GoDotFill
              color={selectedOption?.status !== "deployed" ? "gray" : "#00B88C"}
            />
            <Typography
              sx={{ margingLeft: "3px", textTransform: "capitalize" }}
            >
              {selectedOption?.status}
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: "10px",
            }}
          >
            <BsThreeDotsVertical color="black" />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginLeft: "-1rem",
          height: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <CustomizedTabs
          TabsOptions={TabsOptions}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <Box>
          {renderComponent(TabsOptions[currentTab]?.name, selectedOption)}
        </Box>
      </Box>
    </Container>
  );
};

export default Landingpage;
