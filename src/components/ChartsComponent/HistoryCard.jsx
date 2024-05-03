import {
  Card,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getTime, getTimeDetails } from "../commonFunction";
import {
  rowStyle,
  InprogressStyle,
  failedStyle,
  successStyle,
  cellStyle,
} from "../../Styles/Styles";
import { GoDotFill } from "react-icons/go";

const HistoryCard = () => {
  const [tableData, setTableData] = useState([]);
  const [viewmore, setViewMore] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://retoolapi.dev/TYjDIe/eventhistory"
      );
      setTableData(response?.data);
    } catch (err) {
      console.log(err?.message, "something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card
      sx={{
        height: "396px",
        width: "570px",
        borderRadius: "8px",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
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
          Event History
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <MyTable data={tableData} viewmore={viewmore} />
      </Box>
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button
          variant="text"
          sx={{
            textDecoration: "underline",
            color: "#6E27D5",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "20px",
            textTransform: "capitalize",
          }}
          onClick={() => setViewMore((prev) => !prev)}
        >
          {viewmore ? "View less" : "View more"}
        </Button>
      </Box>
    </Card>
  );
};

export default HistoryCard;

export const MyTable = ({ data, viewmore }) => {
  return (
    <TableContainer
      style={{
        maxHeight: viewmore ? 300 : 300,
        overflowY: viewmore ? "auto" : "hidden",
      }}
    >
      <Table sx={{ height: "200px" }}>
        <TableHead>
          <TableRow
            sx={{
              height: "44px",
              border: "0px 0px 1px 0px",
              padding: "0px 16px",
            }}
          >
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: "700",
                fontSize: "14px",
                marginLeft: "20px",
                width: "180px",

                paddingLeft: "30px",
              }}
            >
              Event
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: "700",
                fontSize: "14px",
                marginLeft: "20px",
                width: "180px",
                paddingLeft: "30px",
              }}
            >
              Version
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: "700",
                fontSize: "14px",
                marginLeft: "20px",
                width: "180px",
                paddingLeft: "30px",
              }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell
                sx={{
                  height: "60px",
                  padding: "0px 16px",
                  paddingLeft: "30px",
                }}
              >
                <Box sx={{}}>
                  <Box
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#595959",
                    }}
                  >
                    {row.event}
                  </Box>
                  <Box
                    sx={{
                      fontWeight: "500",
                      fontSize: "12px",
                      lineHeight: "18px",
                      color: "#A5A5A5",
                    }}
                  >{`${getTime(row?.timestamp).hours} hours ago`}</Box>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  height: "60px",
                  padding: "0px 16px",
                  paddingLeft: "30px",
                  fontWeight: "500",
                  color: "#595959",
                }}
              >
                {row.version}
              </TableCell>
              <TableCell sx={{ ...rowStyle }}>
                <Box
                  sx={
                    row.status === "in_progress"
                      ? { ...cellStyle, ...InprogressStyle }
                      : row.status === "failed"
                      ? { ...cellStyle, ...failedStyle }
                      : { ...cellStyle, ...successStyle }
                  }
                >
                  <GoDotFill
                    color={
                      row.status === "successful"
                        ? "#00B88C"
                        : row.status === "failed"
                        ? "#E91F04"
                        : "#F39C12"
                    }
                  />
                  <Typography sx={{}}>
                    {row.status === "in_progress"
                      ? "In progress"
                      : row.status === "failed"
                      ? "Failed"
                      : "Successful"}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
