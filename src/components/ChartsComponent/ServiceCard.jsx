import { Button, Card, Typography, Box } from "@mui/material";
import React from "react";
import { IoIosCheckmarkCircleOutline, IoIosArrowUp } from "react-icons/io";

const ServiceCard = ({ desiredVersion, updatedAt }) => {
  const getTime = (updatedAt) => {
    const updatedAtDate = new Date(updatedAt * 1000);
    const hours = updatedAtDate.getHours();
    return hours;
  };
  return (
    <Card
      sx={{
        height: "186px",
        width: "99%",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginLeft: "-1rem",
        gap: "12px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            lineHeight: "24px",
            width: "100%",
            fontWeight: "700",
            color: "#595959",
            fontSize: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {" "}
          Service info{" "}
        </Typography>
        <Box>
          <IoIosArrowUp color="black" />
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "66px",
          gap: "48px",
          padding: "0px 0px 20px 0px",
        }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: "500", color: "#595959", fontSize: "12px" }}
          >
            Current version
          </Typography>
          <Typography
            sx={{
              fontWeight: "600",
              color: "#333333",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <IoIosCheckmarkCircleOutline color="#00B88C" size={20} /> In sync
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontWeight: "500", color: "#595959", fontSize: "12px" }}
          >
            Desired version
          </Typography>
          <Typography
            sx={{ fontWeight: "600", color: "#333333", fontSize: "14px" }}
          >
            {desiredVersion}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "40px",
          gap: "48px",
          padding: "40px 0px 0px 0px",
        }}
      >
        <Button
          variant="contained"
          size="medium"
          sx={{ background: "#6E27D5" }}
        >
          Deploy
        </Button>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "12px",
            color: "#595959",
          }}
        >{`Last updated ${getTime(updatedAt)} hours ago`}</Typography>
      </Box>
    </Card>
  );
};

export default ServiceCard;
