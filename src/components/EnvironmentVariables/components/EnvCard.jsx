import { Card, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";
import UploadFile from "./Modals/UploadFile";
import CreateVariables from "./Modals/AddVariables";
import uniqid from "uniqid";
import { MdOutlineDeleteOutline } from "react-icons/md";

const EnvCard = () => {
  const [open, setOpen] = useState({ uploadModal: false, createModal: false });
  const [envVariablesData, setenvVariablesData] = useState([
    {
      id: uniqid(),
      name: "",
      value: "",
    },
  ]);
  const deleteVariableHandler = (id) => {
    setenvVariablesData((prev) =>
      prev.filter((variable) => variable.id !== id)
    );
  };
  return (
    <Card
      sx={{
        height: "363px",
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
            lineHeight: "24px",
          }}
        >
          {" "}
          Environment Variables
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "52px",
            gap: "7px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <FaPlus
            color="#333333"
            onClick={() => setOpen((prev) => ({ ...prev, createModal: true }))}
          />
          <GoDownload
            color="#333333"
            size={16}
            onClick={() => setOpen((prev) => ({ ...prev, uploadModal: true }))}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxHeight: "600px",
          overflowY: envVariablesData?.length > 7 ? "scroll" : "hidden",
        }}
      >
        {envVariablesData?.length > 0 &&
        envVariablesData[0].name !== "" &&
        envVariablesData[0].value !== "" ? (
          envVariablesData?.map((variable) => (
            <Box
              key={variable?.id}
              sx={{
                width: "474px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "12px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #EBEBEB",
              }}
            >
              <Typography
                sx={{
                  width: "160px",
                  color: "#333333",
                  fontWeight: "700",
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {variable.name}
              </Typography>
              <Typography
                sx={{
                  width: "242px",
                  color: "#595959",
                  fontWeight: "500",
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {variable.value}
              </Typography>
              <MdOutlineDeleteOutline
                color="#333333"
                size={20}
                onClick={() => deleteVariableHandler(variable.id)}
              />
            </Box>
          ))
        ) : (
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "20px",
              color: "#595959",
            }}
          >
            No environment variable created{" "}
          </Typography>
        )}
      </Box>
      {open?.uploadModal && (
        <UploadFile
          open={open}
          setOpen={setOpen}
          data={envVariablesData}
          setData={setenvVariablesData}
        />
      )}

      {open?.createModal && (
        <CreateVariables
          open={open}
          setOpen={setOpen}
          data={envVariablesData}
          setData={setenvVariablesData}
          deletefun={deleteVariableHandler}
        />
      )}
    </Card>
  );
};

export default EnvCard;
