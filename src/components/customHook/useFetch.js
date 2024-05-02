import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url, tabName, names) => {
  console.log(tabName);
  const [cpuData, setCpuData] = useState([]);

  const getTimeDetails = (updatedAt) => {
    const updatedAtDate = new Date(updatedAt * 1000);
    const hours = updatedAtDate.getHours();
    const minutes = updatedAtDate.getMinutes();
    const Median = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const formattedTime = `${formattedHours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${Median}`;

    return formattedTime;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const newData = response?.data?.map((cData) => ({
          ...cData,
          timestamp: getTimeDetails(cData?.timestamp),
          name:
            names.find((obj) => obj?.id === cData?.applicationId)?.name ??
            "other",
        }));
        let processedData;

        if (tabName === 1) {
          processedData = newData?.map(
            ({ id, name, timestamp, memoryUtilization, ...rest }) => {
              const newDataObject = { id, name, timestamp };
              newDataObject[name] = memoryUtilization;

              return newDataObject;
            }
          );
        } else {
          processedData = newData?.map(
            ({ id, name, timestamp, cpuUtilization, ...rest }) => {
              const newDataObject = { id, name, timestamp };
              newDataObject[name] = cpuUtilization;

              return newDataObject;
            }
          );
        }

        setCpuData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url, tabName, names]);

  return { cpuData };
};
