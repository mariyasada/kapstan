import { Container, Box, Typography } from "@mui/material";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { containerStyle } from "././Styles/Styles.js";
import TopNav from "./components/TopNav/TopNav.jsx";
import DollorSign from "./assets/DollorSign.js";
import Security from "./assets/Security.js";
import { MdGridView } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { useEffect, useState } from "react";
import Landingpage from "./components/Landingpage/Landingpage.jsx";
import axios from "axios";

const navbarOptions = [
  {
    name: "Applications",
    path: "/",
    content: "tic-tac-toe",
    icon: <MdGridView size={16} />,
  },
  {
    name: "Connections",
    path: "/",
    content: "tic-tac-toe1",
    icon: <IoIosLink size={16} />,
  },
  { name: "Cost", path: "/", content: "tic-tac-toe2", icon: <DollorSign /> },
  {
    name: "Security",
    path: "/",
    content: "tic-tac-toe3",
    icon: <Security />,
  },
];

function App() {
  const [appData, setAppData] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedOption, setSelectedOption] = useState(navbarOptions[0]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://retoolapi.dev/71NNjB/applications"
        );
        setAppData(response.data);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ ...containerStyle }} disableGutters={true}>
      <Sidebar
        options={navbarOptions}
        selectedOpt={selectedOption}
        setSelectedOpt={setSelectedOption}
      />
      {dataFetched ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "#F8F8F8",
            width: "99vw",
          }}
        >
          <TopNav
            options={appData}
            selectedApp={selectedApp}
            setSelectedApp={setSelectedApp}
          />
          <Landingpage selectedOption={selectedApp} />
        </Box>
      ) : (
        <Box>
          <Typography variant={"h6"} color={"blue"}>
            Loading....
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default App;
