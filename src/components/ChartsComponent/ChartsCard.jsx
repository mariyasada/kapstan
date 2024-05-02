import { Card, Container, Box } from "@mui/material";
import React from "react";
import ServiceCard from "./ServiceCard";
import SystemMetricCard from "./SystemMetricCard";
import HistoryCard from "./HistoryCard";

const ChartsCard = (props) => {
  const { desiredVersion, status, updatedAt, version, name } = props;
  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      maxWidth="xl"
    >
      <ServiceCard desiredVersion={desiredVersion} updatedAt={updatedAt} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <SystemMetricCard />
        <HistoryCard />
      </Box>
    </Container>
  );
};

export default ChartsCard;
