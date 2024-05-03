import ChartsCard from "./components/ChartsComponent/ChartsCard";
import EnvironmentVariables from "./components/EnvironmentVariables/EnvironmentVariables";

export const renderComponent = (tabname, props) => {
  switch (tabname) {
    case "Overview":
      return <ChartsCard {...props} />;

    case "Environment Variables":
      return <EnvironmentVariables {...props} />;

    default:
      <ChartsCard />;
  }
};
