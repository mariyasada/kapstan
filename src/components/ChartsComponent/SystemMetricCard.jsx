import { Card, Box, Typography, Tabs, Tab } from "@mui/material";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./tooltip.css";
import { useFetch } from "../customHook/useFetch";

const TabsOptions = ["CPU", "Memory"];
const names = [
  { name: "tic-tac-toc", id: "1" },
  { id: "2", name: "sudoku" },
  { id: "3", name: "chess" },
];

const SystemMetricCard = () => {
  const [currTab, setCurrTab] = useState(0);
  const { cpuData: memoryData } = useFetch(
    "https://retoolapi.dev/ybFVVH/memoryutilization",
    currTab,
    names
  );
  const { cpuData } = useFetch(
    "https://retoolapi.dev/Ymxfa2/cpuutilization",
    currTab,
    names
  );

  const handleChange = (event, newValue) => {
    setCurrTab(newValue);
  };

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
          System metrics
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Tabs
            value={currTab}
            onChange={handleChange}
            textColor="#595959"
            indicatorColor="secondary"
            aria-label="icon position tabs example"
            sx={{
              height: "36px",
              fontSize: "14px",
            }}
            selectionFollowsFocus={false}
          >
            {TabsOptions?.map((tabName, index) => {
              return (
                <Tab
                  label={tabName}
                  key={tabName}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "261px",
                    fontWeight: currTab === index ? "700" : "400",
                    color: "black",
                    fontSize: "14px",
                    textTransform: "capitalize",
                    height: "20px",
                    // borderBottom: "2px solid #6E27D5",
                  }}
                />
              );
            })}
          </Tabs>
          <Chart
            newData={currTab === 1 ? memoryData : cpuData}
            currTab={currTab}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default SystemMetricCard;

export const Chart = ({ newData, currTab }) => {
  const [hoveredData, setHoveredData] = useState(null);
  //    custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, date } = payload[0];
      return (
        <div className="custom-tooltip">
          <p>{`${name}: ${value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const handleMouseEnter = (data, index) => {
    setHoveredData(data);
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };
  return (
    <Box sx={{ width: "522px", height: "300px" }}>
      <Typography
        sx={{ color: "#333333", fontSize: "14px", fontWeight: "500" }}
      >
        {currTab === 0 ? "CPU Utilization(%)" : "Memory"}
      </Typography>
      <LineChart
        onMouseMove={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        width={500}
        height={250}
        maxBarSize={200}
        data={newData}
        margin={{
          top: 20,
          left: 0,
        }}
      >
        <CartesianGrid
          stroke={"#C0C0C0"}
          strokeDasharray="1 4"
          vertical={false}
          cursor={"none"}
        />
        <XAxis
          dataKey={"timestamp"}
          axisLine={false}
          tickLine={false}
          stroke={"#808080"}
          fontSize={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          stroke={"#808080"}
          dx={-10}
          fontSize={8}
        />
        <Tooltip
          formatter={(value, name, props) => [`${name}: ${value}%`, ""]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey={"tic-tac-toc"}
          stroke={"#6e27d5"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          strokeWidth={1.8}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey={"sudoku"}
          stroke={`#f39c12`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          strokeWidth={1.8}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey={"chess"}
          stroke={`#b88bfe`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          strokeWidth={1.8}
          dot={false}
        />
      </LineChart>
    </Box>
  );
};
