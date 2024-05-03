import { Card, Modal, Typography, Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import "./modal.css";
import uniqid from "uniqid";
import { MdOutlineDeleteOutline } from "react-icons/md";

const CreateVariables = ({ open, setOpen, data, setData, deletefun }) => {
  const [singleVariable, setSingleVariable] = useState(null);

  const handleClose = () => {
    setOpen((prev) => ({ ...prev, createModal: !prev.createModal }));
  };
  const addVariableHandler = (index) => {
    setData((prev) => [
      ...prev,
      {
        id: uniqid(),
        name: "",
        value: "",
      },
    ]);
  };

  const addHandler = () => {
    const newData = data.filter(
      (variable) => variable.name !== "" && variable.value !== ""
    );
    setData(newData);
    handleClose();
  };
  return (
    <Modal
      open={open.createModal}
      onClose={handleClose}
      aria-labelledby="upload-modal"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
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
            height: "auto",
            width: "632px",
            minHeight: "100px",
            border: "1px solid #EBEBEB",
            padding: "12px",
            gap: "24px",
            borderRadius: "8px",
          }}
        >
          {data?.map((variable, index) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <InputComponent
                key={variable?.id}
                variable={variable}
                setData={setData}
                data={data}
                setSingleVariable={setSingleVariable}
                singleVariable={singleVariable}
              />
              {variable?.name !== "" &&
              variable?.value !== "" &&
              index < data.length - 1 ? (
                <MdOutlineDeleteOutline
                  color="#333333"
                  size={20}
                  onClick={() => deletefun(variable.id)}
                />
              ) : (
                <IoIosAddCircleOutline
                  color="#333333"
                  size={20}
                  onClick={() => addVariableHandler(index)}
                />
              )}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "94%",
            gap: "12px",
            marginTop: "20px",
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
            onClick={addHandler}
          >
            Add
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default CreateVariables;

const InputComponent = ({ variable, setData, data }) => {
  const [envVariable, setenvVariable] = useState(variable);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setenvVariable((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === envVariable.id) {
          return {
            ...item,
            name: envVariable?.name,
            value: envVariable?.value,
          };
        }
        return item;
      });
    });
  }, [envVariable]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        height: "62px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Typography>Name</Typography>
        <TextField
          key="name"
          name="name"
          size="small"
          sx={{ width: "230px" }}
          value={envVariable.name}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Typography>Value</Typography>
        <TextField
          key="value"
          name="value"
          size="small"
          value={envVariable.value}
          sx={{ width: "230px" }}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};
