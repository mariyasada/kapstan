import { Card, Modal, Typography, Box, Button, Input } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import React, { useState } from "react";
import { RiUploadLine } from "react-icons/ri";
import { readFile, parseEnvVariables } from "../../../commonFunction";
import uniqid from "uniqid";

const UploadFile = ({ open, setOpen, data, setData }) => {
  const [file, setFile] = useState(null);
  const [envData, setEnvData] = useState([]);
  const handleClose = () => {
    setOpen((prev) => ({ ...prev, uploadModal: false }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
    try {
      const { contents, isBelowThreshold } = await readFile(file);
      // if (isBelowThreshold) {
      //   console.log("File size is below 5KB threshold.");
      // } else {
      const variables = parseEnvVariables(contents);

      const variablesWithIds = variables.map((variable) => ({
        id: uniqid(),
        ...variable,
      }));

      setEnvData(variablesWithIds);
      // }
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };
  return (
    <Modal
      open={open?.uploadModal}
      onClose={handleClose}
      aria-labelledby="upload-modal"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card
        sx={{
          width: "696px",
          height: "90%",
          position: "relative",
          padding: "40px 32px 24px 32px",
          gap: "24px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: "1rem",
            top: "4px",
            cursor: "pointer",
          }}
        >
          <IoIosClose
            color="#333333"
            size={26}
            className="icon"
            onClick={handleClose}
          />
        </Box>
        <Box
          sx={{
            height: "186px",
            width: "632px",
            border: "1px solid #EBEBEB",
            padding: "12px",
            gap: "12px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              height: "102px",
              width: "608px",
              padding: "24px 8px 12px 8px",
              border: "1px dotted #BDBDBD",
              gap: "16px",
              borderRadius: "4px",
              background: "#F8F8F8",
            }}
          >
            <Box
              sx={{
                height: "44px",
                width: "592px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                component="label"
                variant="text"
                tabIndex={-1}
                startIcon={<RiUploadLine color="#6E27D5" />}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Button>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                  lineHeight: "20px",
                  color: "#333333",
                }}
              >
                {file
                  ? "One file selected"
                  : "Click or drag file(s) here to upload"}
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              lineHeight: "18px",
              color: "#595959",
            }}
          >
            Upload a .env file. It should not be greater than 5KB.
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "94%",
              gap: "12px",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "#333333",
                border: "1px solid #333333",
                fontWeight: "700",
                fontSize: "14px",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "76px",
                background: "#6E27D5",
                fontWeight: "700",
                fontSize: "14px",
              }}
              onClick={() => {
                setData(envData);
                handleClose();
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
};

export default UploadFile;
