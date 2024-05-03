import { Tabs, Tab, Box } from "@mui/material";
import { GoDotFill } from "react-icons/go";

export const CustomizedTabs = ({ TabsOptions, currentTab, setCurrentTab }) => {
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Tabs
      value={currentTab}
      onChange={handleChange}
      textColor="black"
      aria-label="icon position tabs example"
      sx={{
        height: "20px",
        marginTop: "6px",
        display: "flex",
        alignItems: "center",
        color: "black",
      }}
      selectionFollowsFocus={false}
    >
      {TabsOptions?.map(({ name, Icon }, index) => {
        return (
          <Tab
            icon={<Icon color="black" size={16} />}
            iconPosition="start"
            label={name}
            key={name}
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: currentTab === index ? "700" : "400",
              color: "black",
              fontSize: "14px",
              textTransform: "capitalize",
              height: "20px",
            }}
          />
        );
      })}
      <Box sx={{ position: "absolute", left: "25rem", top: "0.7rem" }}>
        <GoDotFill size={10} color="red" />
      </Box>
    </Tabs>
  );
};
