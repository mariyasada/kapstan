import { Container } from "@mui/material";
import React, { useState } from "react";
import EnvCard from "./components/EnvCard";

const EnvironmentVariables = () => {
 
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
      <EnvCard />
    </Container>
  );
};

export default EnvironmentVariables;
