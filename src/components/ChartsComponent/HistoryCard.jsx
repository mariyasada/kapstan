import { Card } from "@mui/material";
import React from "react";

const HistoryCard = () => {
  return (
    <Card
      sx={{
        height: "396px",
        width: "570px",
        borderRadius: "8px",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    ></Card>
  );
};

export default HistoryCard;
