import axios from "axios";
import { useEffect, useState } from "react";
import { getTimeDetails } from "../commonFunction";

export const useFetch = (url, tabName, names) => {
  const [cpuData, setCpuData] = useState([]);

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
