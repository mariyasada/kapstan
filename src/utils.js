import ChartsCard from "./components/ChartsComponent/ChartsCard";

export const renderComponent = (tabname, props) => {
  console.log(tabname, "cgeck", props);
  switch (tabname) {
    case "Overview":
      return <ChartsCard {...props} />;

    case "Environment variables":
      return <chartsCard />;

    default:
      <ChartsCard />;
  }
};
